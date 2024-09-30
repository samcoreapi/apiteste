import sqlite3 from "sqlite3";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class UsersService {
  private db: sqlite3.Database;
  private secretKey: string = "your_secret_key"; // Altere para uma chave secreta mais forte em produção

  constructor() {
    this.db = new sqlite3.Database("./database.sqlite"); // Usando SQLite em um arquivo
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                password TEXT NOT NULL
            )`);
    });
  }

  public async createUser(name: string, password: string): Promise<any> {
    const hashedPassword = await bcrypt.hash(password, 10); // Criptografando a senha
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (name, password) VALUES (?, ?)`;
      this.db.run(sql, [name, hashedPassword], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ id: this.lastID, name });
      });
    });
  }

  public async login(name: string, password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE name = ?`;
      this.db.get(sql, [name], async (err, user: { id: number, name: string, password: string }) => {
        if (err || !user) {
          return reject(err || new Error("Usuário não encontrado"));
        }
        const isMatch = await bcrypt.compare(password, user.password); // Comparando a senha
        if (!isMatch) {
          return reject(new Error("Senha incorreta"));
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
