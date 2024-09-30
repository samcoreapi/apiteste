import { db } from "../database/database";

export class AppointmentsService {
  async createAppointment(appointmentData: any) {
    const database = await db;
    const { title, date, userId, option1, option2, option3, mult } = appointmentData;

    await database.run(`
            INSERT INTO appointments (title, date, userId, option1, option2, option3, mult)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `, [title, date, userId, option1, option2, option3, mult]);

    return { title, date, userId, option1, option2, option3, mult };
  }

  async getAppointments() {
    const database = await db;
    return await database.all('SELECT * FROM appointments');
  }
}
