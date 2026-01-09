'use client';

import { useState } from 'react';

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const FORM_ID = '8957581';
        const URL = `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`;

        try {
            // We use a simple form POST to Kit's public endpoint
            const data = new FormData();
            data.append('email_address', email);

            const response = await fetch(URL, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            // Kit returns a 200 OK even if already subscribed, which is good for privacy
            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    if (status === 'success') {
        return (
            <div className="p-4 bg-green-50 text-green-700 rounded-lg text-center border border-green-200">
                <p className="font-bold">🎉 Check your email!</p>
                <p className="text-sm mt-1">I've sent you a confirmation link.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none w-full text-slate-900"
                required
                disabled={status === 'loading'}
            />
            <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors w-full sm:w-auto disabled:opacity-50 whitespace-nowrap"
            >
                {status === 'loading' ? 'Joining...' : 'Get Updates'}
            </button>

            {status === 'error' && (
                <p className="text-red-500 text-xs mt-2 w-full text-center">
                    Oops! Something went wrong. Please try again.
                </p>
            )}
        </form>
    );
}