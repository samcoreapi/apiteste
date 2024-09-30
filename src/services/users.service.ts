import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";

export class UsersService {
  private db: sqlite3.Database;
  private secretKey: string = "your_secret_key";

  constructor() {
    this.db = new sqlite3.Database(":memory:");
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL
            )`);
    });
  }

  public createUser(name: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (name) VALUES (?)`;
      this.db.run(sql, [name], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, name });
      });
    });
  }

  public login(name: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE name = ?`;
      this.db.get(sql, [name], (err, user: { id: number; name: string }) => {
        if (err || !user) {
          return reject(err || new Error("Usuário não encontrado"));
        }
        const token = jwt.sign(
          { id: user.id, name: user.name },
          this.secretKey
        );
        resolve(token);
      });
    });
  }
}
