import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import Transaction, { transactionsSchema } from './models/transactionModel';
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

// console.log(DB)

// mongoose.connect(DB).then(() => {
//   console.log('DB CONNECTION SUCCESFUL');
// }).catch(err => console.log('mongoo error', err));

export const conn:any =  mongoose.createConnection(DB).asPromise().then((con) => {
  con.model("Transaction",transactionsSchema)
  console.log('DB CONNECTION SUCCESFUL');
}).catch(err => console.log('mongoo error', err));


const conn2 = mongoose.createConnection('mongodb://accountAdmin01:123456789Sc+@localhost:1234/?authSource=admin').asPromise().then(() => {
  console.log('DB CONNECTION SUCcsxz 23122');
}).catch(err => console.log('mongoo error', err));;

// mongoose.connect(process.env.DATABASE_HOSTIGER!).then(() => {
//   console.log('DB CONNECTION suc 2121');
// }).catch(err => console.log('mongoo error', err));

const port = 3001;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}`);
});



