// import mongoose, { Schema } from 'mongoose';
// import { IBlackListDocument, IBlackListModel } from '../types/BlackList';

// // Mongoose Şema (Schema) tanımı
// const errorListSchema = new Schema<IBlackListDocument>(
//   {    
//     subClientId: {
//       type: String,
//       default: '',
//     },  
//     url: {
//       type: String,
//       default: '',
//     },     
//     currency: {
//       type: String,
//       default: '',
//     }, 
//     statusCode: {
//       type: Number
//     },
//     statusMessage: {
//       type: String,
//     },   
//     createdDate:{
//       type: Date,
//       default: new Date(),
//     }
//   },
//   {
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );

// // Dökümanın sıralanması için Mongoose Hook'unu kullanın
// // transactionsSchema.pre<ITransaction>('find', function (next) {
// //   this.find().sort({ createdAt: -1 });
// //   next();
// // });

// // Mongoose modelini tanımlayın
// const BlackList : IBlackListModel = mongoose.model<IBlackListDocument,IBlackListModel>(
//   'BlackList',
//   errorListSchema
// );

// export default BlackList;