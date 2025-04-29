import express from 'express';
       import cors from 'cors';
       import sequelize from './config/database.js';
       import taskRoutes from './routes/taskRoutes.js';
       import errorHandler from './middleware/errorHandler.js';

       const app = express();
       const port = process.env.PORT || 3005;

       // Middleware
       app.use(cors());
       app.use(express.json());

       // Routes
       app.use('/api/tasks', taskRoutes);

       // Error handling middleware
       app.use(errorHandler);

       // Start server with error handling
       const startServer = async () => {
         try {
           await sequelize.sync({ force: false });
           console.log('Database synced');
           app.listen(port, () => {
             console.log(`Server running at: http://localhost:3005`);
           });
         } catch (err) {
           console.error('Failed to start server:', err);
           process.exit(1);
         }
       };

       startServer();