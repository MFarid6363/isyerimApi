import express, { Request, Response, NextFunction, Application } from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import path from 'path';
import cors from 'cors';

// Importing custom modules with their types
import isyerimRoutes from './routes/isyerimRoute';
import AppError from './utils/appError';
import errorController from './controllers/errorController';

const app: Application = express();
app.use(cors());

// Set the static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Limit requests from the same API
const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000, // 1 hour
  message: 'Too many requests from this API, please try again in an hour',
});
app.use('/api', limiter);

// Development logging
app.use(morgan('dev'));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['duration'],
  })
);

// Serve static files
app.use(express.static(`${__dirname}/public`));

// Routes
app.use('/isyerim', isyerimRoutes);

// Check coupon route (dummy handler for now)
app.post('/checkCoupon', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'fail',
    message: 'Not found',
  });
});

// Handling all undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global error handling middleware
app.use(errorController);

// Export the app
export default app;
