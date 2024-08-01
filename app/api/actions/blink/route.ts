// app/api/actions/blink/route.ts
import { NextRequest, NextResponse } from 'next/server';
const { openDb } = require('../../../../db');

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { title, description, imageUrl, amount, walletAddress } = body;

        // Simple validation
        if (!title || !description || !imageUrl || !amount || !walletAddress) {
            return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
        }

        if (typeof amount !== 'number' || amount <= 0) {
            return NextResponse.json({ error: 'Amount must be a positive number' }, { status: 400 });
        }

        // Example: Processing data
        const processedData = {
            title: title.trim(),
            description: description.trim(),
            imageUrl: imageUrl.trim(),
            amount,
            walletAddress: walletAddress.trim(),
        };

        // Insert into database
        const db = await openDb();
        await db.run(`
            INSERT INTO form_data (title, description, imageUrl, amount, walletAddress)
            VALUES (?, ?, ?, ?, ?)`,
            processedData.title,
            processedData.description,
            processedData.imageUrl,
            processedData.amount,
            processedData.walletAddress
        );

        // Send the processed data in the response
        return NextResponse.json(processedData);
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}


