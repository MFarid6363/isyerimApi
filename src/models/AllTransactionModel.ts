import mongoose, { Schema } from 'mongoose';
// import { ITransactionDocument, ITransactionModel } from '../types/Transaction';
import { IAllTransaction } from '../types/Transaction';

// Mongoose Şema (Schema) tanımı
export const allTransactionsSchema = new Schema<IAllTransaction>(
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
    Amount:{
      type:String
    },
    Body:{
      type:Schema.Types.Mixed
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
// const AllTransaction: ITransactionModel = mongoose.model<ITransactionDocument, ITransactionModel>(
//   'AllTransactions',
//   allTransactionsSchema
// );

// export default AllTransaction;