// Server-side currency formatter
export async function getCurrencySettings() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/settings`, {
            cache: 'no-store',
        });
        const data = await response.json();
        return data.currency || { code: 'NGN', symbol: '₦', position: 'before' };
    } catch (error) {
        return { code: 'NGN', symbol: '₦', position: 'before' };
    }
}

export function formatPrice(price: number | string, currency: { symbol: string; position: string }): string {
    const numPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.]/g, '')) : price;
    const formatted = numPrice.toLocaleString();

    return currency.position === 'before'
        ? `${currency.symbol}${formatted}`
        : `${formatted}${currency.symbol}`;
}
