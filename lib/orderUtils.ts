/**
 * Generate unique order reference
 * Format: BK{YYYYMMDD}{0001}
 * Example: BK202412100001
 */
export function generateOrderReference(orderCount: number): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const dateStr = `${year}${month}${day}`;
    const sequence = String(orderCount + 1).padStart(4, '0');

    return `BK${dateStr}${sequence}`;
}

/**
 * Calculate deposit and balance amounts
 */
export function calculatePaymentAmounts(
    totalAmount: number,
    depositPercentage: number = 50
): {
    depositAmount: number;
    balanceAmount: number;
} {
    const depositAmount = Math.round((totalAmount * depositPercentage) / 100);
    const balanceAmount = totalAmount - depositAmount;

    return {
        depositAmount,
        balanceAmount,
    };
}

/**
 * Get status display name
 */
export function getStatusDisplayName(status: string): string {
    const statusMap: Record<string, string> = {
        new: 'New Order',
        pending: 'Pending Review',
        confirmed: 'Confirmed',
        awaiting_deposit: 'Awaiting Deposit',
        deposit_received: 'Deposit Received',
        awaiting_balance: 'Awaiting Balance',
        paid: 'Fully Paid',
        ready_for_pickup: 'Ready for Pickup',
        in_transit: 'In Transit',
        delivered: 'Delivered',
        completed: 'Completed',
        cancelled: 'Cancelled',
    };

    return statusMap[status] || status;
}

/**
 * Get status color for UI
 */
export function getStatusColor(status: string): string {
    const colorMap: Record<string, string> = {
        new: 'blue',
        pending: 'yellow',
        confirmed: 'green',
        awaiting_deposit: 'orange',
        deposit_received: 'green',
        awaiting_balance: 'orange',
        paid: 'green',
        ready_for_pickup: 'purple',
        in_transit: 'blue',
        delivered: 'green',
        completed: 'gray',
        cancelled: 'red',
    };

    return colorMap[status] || 'gray';
}

/**
 * Format currency
 */
export function formatCurrency(amount: number, currency: { symbol: string; position: string }): string {
    const formatted = amount.toLocaleString();
    return currency.position === 'before'
        ? `${currency.symbol}${formatted}`
        : `${formatted}${currency.symbol}`;
}
