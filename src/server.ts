import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
// import schedule from 'node-schedule';
// import authController from './controllers/authController';
// import subClientTransactionStatusSceduler from './scedulers/subClientTransactionStatusSceduler';
// import subClientTransactionSceduler from './scedulers/subClientTransactionSceduler';
// import subClientTransactionGlobalSceduler from './scedulers/subClientTransactionGlobalSceduler';
// import transactionSceduler from './scedulers/transactionSceduler';
// import clientTransactionStatusSceduler from './scedulers/clientTransactionStatusSceduler';

dotenv.config({ path: '.env' });


process.on('uncaughtException', (err) => {
  console.log('Uncaught exception Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
let DB = process.env.DATABASE!

// if (process.env.DATABASE && process.env.DATABASE_PASSWORD) {
//   DB = process.env.DATABASE.replace(
//     '<PASSWORD>',
//     process.env.DATABASE_PASSWORD
//   );
// }

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);

console.log(DB)

mongoose.connect(DB).then(() => {
  console.log('DB CONNECTION SUCCESFUL');
}).catch(err => console.log('mongoo error', err));

const port = 3001;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

