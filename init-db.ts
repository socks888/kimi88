// init-db.ts
const { openDb } = require('./db');

async function setup() {
    const db = await openDb();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS form_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            imageUrl TEXT,
            amount INTEGER,
            walletAddress TEXT
        )
    `);
    console.log("Database initialized successfully");
}

setup().catch((err) => {
    console.error("Error initializing database", err);
});



