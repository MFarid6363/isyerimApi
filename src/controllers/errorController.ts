import AppError from "../utils/appError";
import { Error as MongooseError } from 'mongoose';

const sendErrorDev = (err: { statusCode: any; status: any; name?: string; code?: number; message?: any; stack?: any; }, res: { status: (arg0: any) => { (): any; new(): any; json: { (arg0: { status: any; message: any; stack: any; error: any; }): void; new(): any; }; }; }) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const handleCastErrorDb = (err: { statusCode?: number; status?: string; name?: string; code?: number; path?: any; value?: any; }) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const handleDublicateFieldsDb = (err: { statusCode?: number; status?: string; name?: string; code?: number; keyValue?: any; }) => {
  const value = err.keyValue[Object.keys(err.keyValue)[0]];
  const message = `Dublicate field value:${value} Please use another value `;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: { statusCode?: number; status?: string; name?: string; errors?: any; }) => {
  const errors = Object.values(err.errors).map((el:any) => el.message);
  const message = `Invalid data input ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJwtError = () =>
  new AppError('Invalid token please login again', 401);
const handleJwtExpiredError = () =>
  new AppError('Your token has expitrf! please login again', 401);

const sendErrorProd = (err: { statusCode: any; status: any; name?: string; code?: number; isOperational?: any; message?: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: any; message: any; }): void; new(): any; }; }; }) => {
  //operational trusted error send message ot use
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // programming or other problem
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong',
    });
  }
};

export default (err: { statusCode: number; status: string; name: string;  }, req: any, res: any) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (err.name === 'CastError') error = handleCastErrorDb(error);
    // if (err.code === 11000) error = handleDublicateFieldsDb(error);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(error);
    if (err.name === 'JsonWebTokenError') error = handleJwtError();
    if (err.name === 'TokenExpiredError') error = handleJwtExpiredError();
    sendErrorProd(error, res);
  }
};
