import sqlite3 from "sqlite3";

export class AppointmentsService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(":memory:");
    this.initializeDatabase();
  }

  private initializeDatabase() {
    this.db.serialize(() => {
      this.db.run(`CREATE TABLE IF NOT EXISTS appointments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                date TEXT NOT NULL,
                name TEXT NOT NULL,
                option1 TEXT,
                option2 TEXT,
                option3 TEXT,
                mult BOOLEAN,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                deletedAt DATETIME DEFAULT NULL,
                deleted BOOLEAN DEFAULT 0
            )`);

      // Adicionando alguns dados de teste
      this.db.run(
        `INSERT INTO appointments (title, date, name, option1, option2, option3, mult) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          "Consulta",
          "2024-10-01",
          "João",
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
    title: string,
    date: string,
    name: string,
    option1?: string,
    option2?: string,
    option3?: string,
    mult?: boolean
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!title || !date || !name) {
        return reject(
          new Error("Os campos title, date e name são obrigatórios.")
        );
      }

      const sql = `INSERT INTO appointments (title, date, name, option1, option2, option3, mult) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      this.db.run(
        sql,
        [
          title,
          date,
          name,
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
            name,
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
