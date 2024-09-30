import app from './app';
import { initializeDatabase } from './database/database';
const PORT: number = Number(process.env.PORT) || 3000;

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error('Error initializing database:', error);
  });