'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiSave, FiDollarSign } from 'react-icons/fi';

const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState({
        currency: {
            code: 'USD',
            symbol: '$',
            position: 'before' as 'before' | 'after',
        },
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await fetch('/api/settings');
            const data = await response.json();
            if (data.currency) {
                setSettings({ currency: data.currency });
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
            toast.error('Failed to load settings');
        } finally {
            setLoading(false);
        }
    };

    const handleCurrencyChange = (code: string) => {
        const currency = currencies.find(c => c.code === code);
        if (currency) {
            setSettings({
                currency: {
                    code: currency.code,
                    symbol: currency.symbol,
                    position: settings.currency.position,
                },
            });
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const response = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });

            if (response.ok) {
                toast.success('Settings saved successfully!');
            } else {
                toast.error('Failed to save settings');
            }
        } catch (error) {
            console.error('Error saving settings:', error);
            toast.error('Error saving settings');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-lg text-gray-600">Loading settings...</div>
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-brown mb-2">Settings</h1>
                <p className="text-gray-600">Manage site-wide settings and preferences</p>
            </div>

            {/* Settings Form */}
            <div className="max-w-3xl">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 space-y-8">
                    {/* Currency Settings */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 border-b-2 border-gold/20 pb-2">
                            <FiDollarSign className="text-gold" size={24} />
                            <h2 className="text-xl font-bold text-brown">Currency Settings</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Currency <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={settings.currency.code}
                                    onChange={(e) => handleCurrencyChange(e.target.value)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                >
                                    {currencies.map((currency) => (
                                        <option key={currency.code} value={currency.code}>
                                            {currency.symbol} - {currency.name} ({currency.code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Symbol Position <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={settings.currency.position}
                                    onChange={(e) =>
                                        setSettings({
                                            currency: {
                                                ...settings.currency,
                                                position: e.target.value as 'before' | 'after',
                                            },
                                        })
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-gold focus:outline-none transition"
                                >
                                    <option value="before">Before (e.g., $100)</option>
                                    <option value="after">After (e.g., 100$)</option>
                                </select>
                            </div>
                        </div>

                        {/* Preview */}
                        <div className="p-4 bg-gold/5 border-2 border-gold/30 rounded-xl">
                            <div className="text-sm text-gray-600 mb-1">Price Preview:</div>
                            <div className="text-2xl font-bold text-brown">
                                {settings.currency.position === 'before'
                                    ? `${settings.currency.symbol}1,500`
                                    : `1,500${settings.currency.symbol}`}
                            </div>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gold to-amber-500 text-dark font-semibold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <FiSave size={20} />
                            {saving ? 'Saving...' : 'Save Settings'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
