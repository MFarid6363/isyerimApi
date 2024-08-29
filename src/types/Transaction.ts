import { Model } from "mongoose";

export interface ITransactionDocument extends Document {  
    Message: string,
    ErrorCode: number,
    Errors: Array<any>|null,
    IsDone: boolean,
    ElapsedTime: number,
    Content: string
    CreatedAt:string
}

export interface ITransactionModel extends Model<ITransactionDocument> {
   
}

export interface IApiTransaction {
    paymentId: string;
    date: string;
    senderAccount: string;
    senderAccountCurrency: string;
    paymentAmount: number;
    paymentFee: number;
    beneficiaryName: string;
    paymentDetails: string;
    paymentStatus: string;
    clientOrderId: string;
    hasLk?:boolean;
  }
  
  export interface IApiTransactionnDetail {
    paymentId: string;
    date: string;
    senderAccount: string;
    senderAccountCurrency: string;
    paymentAmount: number;
    paymentFee: number;
    transactionCurrency: string;
    transactionAmount: number;
    beneficiaryAccount: string;
    beneficiaryBankCode: string | null;
    beneficiaryBankName: string | null;
    beneficiaryType: string;
    beneficiaryName: string;
    beneficiaryLastName: string;
    beneficiaryCompanyName: string | null;
    beneficiaryIdNumber: string;
    paymentDetails: string;
    paymentStatus: string;
    paymentStatusDescription: string;
    clientOrderId: string;
  }