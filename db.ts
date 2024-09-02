import sqlite3 from 'sqlite3';
import { open as sqliteOpen, Database as SqliteDatabase } from 'sqlite';

// Function to open a connection to the SQLite database
async function connectToDatabase(): Promise<SqliteDatabase> {
    const db = await sqliteOpen({
        filename: './database.sqlite',
        driver: sqlite3.Database
    });
    return db;
}

// Function to create the table
async function createTable(db: SqliteDatabase) {
    await db.exec(`
        CREATE TABLE IF NOT EXISTS records (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            walletaddress TEXT,
            icon TEXT,
            title TEXT,
            description TEXT,
            date_created TEXT
        )
    `);
    console.log("Table created.");
}

// Function to insert records
async function insertRecords(db: SqliteDatabase) {
    const insertStatement = `
        INSERT INTO records (walletaddress, icon, title, description, date_created)
        VALUES (?, ?, ?, ?, ?)
    `;
    const dateCreated = new Date().toISOString();
    await db.run(insertStatement, ['wallet1', 'icon1.png', 'Title 1', 'Description 1', dateCreated]);
    await db.run(insertStatement, ['wallet2', 'icon2.png', 'Title 2', 'Description 2', dateCreated]);
    console.log("Records inserted.");
}

// Function to select records based on walletaddress
async function selectRecord(db: SqliteDatabase, walletaddress: string) {
    const selectStatement = `
        SELECT * FROM records
        WHERE walletaddress = ?
    `;
    const rows = await db.all(selectStatement, [walletaddress]);
    console.log("Selected records: ", rows);
}

// Example usage
async function main() {
    try {
        const db = await connectToDatabase();
        console.log("Connected to the SQLite database.");

        // Create table
        await createTable(db);

        // Insert records
        await insertRecords(db);

        // Select record with specific walletaddress
        await selectRecord(db, 'wallet1');

        // Close the database connection
        await db.close();
    } catch (error) {
        console.error("Error: ", error);
    }
}

main();
