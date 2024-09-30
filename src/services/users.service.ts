    import { db } from "../database/database";

    export class UsersService {
        async createUser(userData: any) {
            const database = await db;
            const { email, password, name } = userData;

            await database.run(`
                INSERT INTO users (email, password, name)
                VALUES (?, ?, ?)
            `, [email, password, name]);

            return { email, name };
        }

        async getUsers() {
            const database = await db;
            return await database.all('SELECT * FROM users');
        }
    }
