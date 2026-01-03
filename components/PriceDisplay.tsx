'use client';

import { useState, useEffect } from 'react';

interface PriceDisplayProps {
    price: number | string;
    className?: string;
}

export default function PriceDisplay({ price, className = '' }: PriceDisplayProps) {
    const [formattedPrice, setFormattedPrice] = useState<string>('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAndFormat() {
            try {
                const response = await fetch('/api/settings');
                const data = await response.json();
                const currency = data.currency || { code: 'USD', symbol: '$', position: 'before' };

                const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
                const formatted = numPrice.toLocaleString();

                const displayPrice = currency.position === 'before'
                    ? `${currency.symbol}${formatted}`
                    : `${formatted}${currency.symbol}`;

                setFormattedPrice(displayPrice);
            } catch (error) {
                // Fallback to USD
                const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
                setFormattedPrice(`$${numPrice.toLocaleString()}`);
            } finally {
                setLoading(false);
            }
        }

        fetchAndFormat();
    }, [price]);

    if (loading) {
        return <span className={className}>...</span>;
    }

    return <span className={className}>{formattedPrice}</span>;
}
