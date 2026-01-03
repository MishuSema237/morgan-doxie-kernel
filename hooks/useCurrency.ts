'use client';

import { useState, useEffect } from 'react';

interface CurrencySettings {
    code: string;
    symbol: string;
    position: 'before' | 'after';
}

export function useCurrency() {
    const [currency, setCurrency] = useState<CurrencySettings>({
        code: 'USD',
        symbol: '$',
        position: 'before',
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCurrency();
    }, []);

    const fetchCurrency = async () => {
        try {
            const response = await fetch('/api/settings');
            const data = await response.json();
            if (data.currency) {
                setCurrency(data.currency);
            }
        } catch (error) {
            console.error('Error fetching currency:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatPrice = (price: number | string): string => {
        const numPrice = typeof price === 'string' ? parseFloat(price) : price;
        const formatted = numPrice.toLocaleString();

        return currency.position === 'before'
            ? `${currency.symbol}${formatted}`
            : `${formatted}${currency.symbol}`;
    };

    return { currency, formatPrice, loading };
}
