import sqlite3 from "sqlite3";

export class AppointmentsService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database("./database.sqlite"); // Usando SQLite em um arquivo
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.db.serialize(() => {
      // Deletando a tabela se existir
      this.db.run(`DROP TABLE IF EXISTS appointments`);

      this.db.run(`CREATE TABLE IF NOT EXISTS appointments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            date TEXT NOT NULL,
            userId INTEGER NOT NULL,
            option1 TEXT,
            option2 TEXT,
            option3 TEXT,
            mult BOOLEAN,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            deletedAt DATETIME DEFAULT NULL,
            deleted BOOLEAN DEFAULT 0,
            FOREIGN KEY (userId) REFERENCES users (id) ON DELETE CASCADE
        )`);

      // Adicionando alguns dados de teste
      this.db.run(
        `INSERT INTO appointments (title, date, userId, option1, option2, option3, mult) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          "Consulta",
          "2024-10-01",
          1, // Exemplo de userId
          "Opção A",
          "Opção B",
          "Opção C",
          false,
        ]
      );
    });
  }

  public getAgendamentos(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM appointments WHERE deleted = 0`,
        (err, rows) => {
          if (err) {
            return reject(err);
          }
          resolve(rows);
        }
      );
    });
  }

  public createAgendamento(
    title: string, // title é obrigatório
    userId: number, // Agora é obrigatório o userId
    date?: string,
    option1?: string,
    option2?: string,
    option3?: string,
    mult?: boolean
  ): Promise<any> {
    const sql = `INSERT INTO appointments (title, date, userId, option1, option2, option3, mult) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      this.db.run(
        sql,
        [
          title,
          date || null,
          userId,
          option1 || null,
          option2 || null,
          option3 || null,
          mult || false,
        ],
        function (err) {
          if (err) {
            return reject(err);
          }
          resolve({
            id: this.lastID,
            title,
            date,
            userId,
            option1,
            option2,
            option3,
            mult,
          });
        }
      );
    });
  }

  public softDeleteAgendamento(id: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE appointments SET deleted = 1, deletedAt = CURRENT_TIMESTAMP WHERE id = ?`;
      this.db.run(sql, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve({ message: "Agendamento deletado com sucesso.", id });
      });
    });
  }
}
