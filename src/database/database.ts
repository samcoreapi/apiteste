import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const DATABASE_FILE = './database.sqlite';

export const db = open({
    filename: DATABASE_FILE,
    driver: sqlite3.Database,
});

export async function initializeDatabase() {
    const database = await db;

    // Remove as tabelas existentes antes de recriá-las
    await database.exec(`DROP TABLE IF EXISTS users;`);
    await database.exec(`DROP TABLE IF EXISTS appointments;`);

    await database.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            name TEXT NOT NULL
        );
    `);
    
    await database.exec(`
        CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            userId INTEGER NOT NULL,
            option1 TEXT,
            option2 TEXT,
            option3 TEXT,
            mult BOOLEAN NOT NULL,
            FOREIGN KEY (userId) REFERENCES users(id)
        );
    `);
}
