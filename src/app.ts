import express from 'express';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import path from 'path';

import isyerimRoutes from './routes/isyerimRoute'

import cors from "cors";
import AppError from './utils/appError';
import errorController from './controllers/errorController';
import generateRandomBasket from './utils/getCombinationOfProducts';
import { dailyProducts } from './controllers/productList';

const app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

const limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this api,please try again in an hour',
});
// 1)middlewares
app.use('/api', limiter);

app.use(morgan('dev'));

app.use(express.json({ limit: '10kb' }));

//data sanitization agaist noSql query injection
app.use(mongoSanitize());
// Data sanitization agaist XSS
//app.use(xss());

//prevent parameter polution
app.use(
  hpp({
    whitelist: ['duration'],
  })
);

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => next());

// app.get('/api/v1/tours',getAllTours )
// app.post('/api/v1/tours', createTour)
// app.get('/api/v1/tours/:id',getTour )
// app.patch('/api/v1/tours/:id', updatedTour)
// app.delete('/api/v1/tours/:id', deleteTour)

//routes
app.use('/isyerim', isyerimRoutes);
app.post('/checkCoupon',((req,res)=>{
  res.status(404).json({
        status: 'fail',
        message: `Not found`,
      });
}))
// app.use('/api/v1/transactionapi/transactions', transactionRoutes);
// app.use('/api/v1/transactionapi/companyTransactions', companyTransactionRoutes);
// app.use('/api/v1/transactionapi/subClientTransactions', subClientTransactionRoutes);
// app.use('/api/v1/transactionapi/masterAccounts', masterAccountsRoutes);
// app.use('/api/v1/transactionapi/subClients', subClientRoutes );
// app.use('/api/v1/transactionapi/webHook', webHookRoutes );
// app.use('/api/v1/transactionapi/healthcheck', healthCheck);
// app.use('/api/v1/transactionapi/yapily', yapilyRoutes);

console.log(generateRandomBasket(dailyProducts,5101.49))
app.all('*', (req, res, next) => {
  //   res.status(404).json({
  //     status: 'fail',
  //     message: `Can't find ${req.originalUrl} on this server`,
  //   });
  //   const err = new Error(`Can't find ${req.originalUrl} on this server`);
  //   err.statusCode = 404;
  //   err.status = 'fail';
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(errorController);
//start server

export default app;

