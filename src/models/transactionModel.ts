import { Schema } from 'mongoose';
import { ITransactionDocument, ITransactionModel } from '../types/Transaction';


// Mongoose Şema (Schema) tanımı
export const transactionsSchema = new Schema<ITransactionDocument>(
  {
    Message: {
      type: String,
      required: true,
    },
    ErrorCode: {
      type: Number,
      required: true,
    },
    Errors: {
      type: String,
    },
    IsDone: {
      type: Boolean,
      required: true,
    },
    ElapsedTime: {
      type: Number,
      required: true,
    },
    CreatedAt: {
      type: String,
      required: true,
    },
    Amount: {
      type: String,
      required: true
    },
    Products: {
      type:String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Dökümanın sıralanması için Mongoose Hook'unu kullanın
// transactionsSchema.pre<ITransaction>('find', function (next) {
//   this.find().sort({ createdAt: -1 });
//   next();
// });

// Mongoose modelini tanımlayın
// const Transaction: ITransactionModel = conn.model<ITransactionDocument, ITransactionModel>(
//   'Transaction',
//   transactionsSchema
// );

// export default Transaction;