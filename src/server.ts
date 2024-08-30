import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { transactionsSchema } from './models/transactionModel';
import { allTransactionsSchema } from './models/AllTransactionModel';
import { IAllTransaction, IAllTransactionModel, ITransactionDocument, ITransactionModel } from './types/Transaction';
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

// mongoose.set("strictQuery", false);
// mongoose.set("strictPopulate", false);

// // console.log(DB)

// // mongoose.connect(DB).then(() => {
// //   console.log('DB CONNECTION SUCCESFUL');
// // }).catch(err => console.log('mongoo error', err));

// export const conn: any = mongoose.createConnection(DB).asPromise().then((con) => {
//   con.model("Transaction", transactionsSchema)
//   console.log('DB CONNECTION SUCCESFUL');
// }).catch(err => console.log('mongoo error', err));


// const conn2 = mongoose.createConnection('mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.0').asPromise().then((con) => {
//   con.model("Transaction", allTransactionsSchema)
//   console.log('DB CONNECTION SUCcsxz 23122');
// }).catch(err => console.log('mongoo error', err));;

// mongoose.connect(process.env.DATABASE_HOSTIGER!).then(() => {
//   console.log('DB CONNECTION suc 2121');
// }).catch(err => console.log('mongoo error', err));


// const conn = mongoose.createConnection(DB);
// export const Transaction: ITransactionModel = conn.model<ITransactionDocument, ITransactionModel>(
//   'Transaction',
//   transactionsSchema
// );
// Transaction.find().then((it)=>{
//   console.log("-----")
//   console.log(it)
//   console.log("-----")
// })

const conn2 = mongoose.createConnection('mongodb://myAdminUser:myAdminPassword@127.0.0.1:27017');
// console.log(conn2)
// console.log(conn2)
// conn2.listCollections().then((te)=>{
//   console.log(te)
// })
// if(conn2.listCollections){
//   if(conn2.listCollections.toArray){

//     conn2.listCollections().toArray(function(err, collInfos) {
//       // collInfos is an array of collection info objects that look like:
//       // { name: 'test', options: {} }
//     });
//   }
// }

export const AllTransaction: IAllTransactionModel = conn2.model<IAllTransaction, IAllTransactionModel>(
  'Transaction',
  allTransactionsSchema
);

AllTransaction.create({
  "Message": "DSA",
  "ErrorCode": 0,
  "Errors": null,
  "IsDone": true,
  "ElapsedTime": 1,
  "Content": "dasdsadxa",
  "CreatedAt": "dsadsadsa",
  "Amount": "dsadsadxza"
}).then((ds)=>{
  console.log('success')
  console.log(ds)
  console.log("---find-------")
  AllTransaction.find().then((it) => {
    console.log(it)
  })
}).catch((ef)=>{
  console.log('errrrrrrr')
  console.log(ef)
})



// const { MongoClient } = require('mongodb');

// // Connection URL with authentication
// console.log("1")

// const url = 'mongodb://myAdminUser:myAdminPassword@127.0.0.1:27017';
// const client = new MongoClient(url);
// console.log("2")
// // Database Name
// const dbName = 'myDatabase';

// async function main() {
//   try {

//     console.log("33")
//     console.log("33")
//     console.log("33")
//     console.log("33")

//     // Connect to the MongoDB cluster
//     await client.connect();
//     console.log('succfesssss ------')

//     console.log("Connected correctly to server");

//     // Access the specified database
//     const db = client.db(dbName);
    
//     console.log("4")

//     // Access or create a collection within the database
//     const collection = db.collection('testCollection');
//     console.log("5")

//     // Insert multiple test documents
//     const result = await collection.insertMany([
//       { name: "Test Document 1", value: 123 },
//       { name: "Test Document 2", value: 456 },
//       { name: "Test Document 3", value: 789 }
//     ]);
//     console.log("Inserted documents:", result.insertedIds);

//     // Retrieve and print all documents from the collection
//     const documents = await collection.find({}).toArray();
//     console.log("Documents in 'testCollection':", documents);

//   } catch (err) {
//     console.log('bir errorrrrr')
//     console.error(err);
//   } finally {
//     await client.close();
//   }
// }

// main().catch((err)=>{console.log("2 erorrrrrr");console.log(err)});




// const port = 3001;
// const server = app.listen(port, () => {
//   console.log(`app running on port ${port}`);
// });




