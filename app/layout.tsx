import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// app/layout.tsx
import WalletContextProvider from '../components/WalletContextProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <WalletContextProvider>
                    {children}
                </WalletContextProvider>
            </body>
        </html>
    );
}



