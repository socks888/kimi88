// components/FormComponent.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

interface FormData {
    title: string;
    description: string;
    imageUrl: string;
    amount: number;
}

const FormComponent = () => {
    const { connected, publicKey } = useWallet();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        imageUrl: '',
        amount: 0,
    });

    const [responseMessage, setResponseMessage] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'amount' ? Number(value) : value,
        });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!connected || !publicKey) {
            setResponseMessage('Please connect your wallet before submitting the form.');
            return;
        }

        const response = await fetch('/api/actions/blink', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, walletAddress: publicKey.toString() }),
        });

        const data = await response.json();

        if (response.ok) {
            setResponseMessage(`Success: ${JSON.stringify(data)}`);
        } else {
            setResponseMessage(`Error: ${data.error}`);
        }
    };

    return (
        <div>
            <div className="mb-4">
                <WalletMultiButton />
            </div>
            {connected ? (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 mb-2">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-gray-700 mb-2">Description:</label>
                        <input
                            type="text"
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="imageUrl" className="block text-gray-700 mb-2">Image URL:</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="amount" className="block text-gray-700 mb-2">Amount:</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">Submit</button>
                </form>
            ) : (
                <p>Please connect your wallet to complete the form.</p>
            )}
            {responseMessage && <p className="mt-4 text-center">{responseMessage}</p>}
        </div>
    );
};

export default FormComponent;


