import { Model } from "mongoose";

export interface ITransactionDocument extends Document {
  Message: string,
  ErrorCode: number,
  Errors: Array<any> | null,
  IsDone: boolean,
  ElapsedTime: number,
  CreatedAt: string
  Amount: string | number,
  Products: String,
  Discount: number
}
export interface IAllTransaction extends Document {
  Message: string,
  ErrorCode: number,
  Errors: Array<any> | null,
  IsDone: boolean,
  ElapsedTime: number,
  CreatedAt: string
  Amount: string | number,
  Discount: number

}

export interface ITransactionModel extends Model<ITransactionDocument> {

}
export interface IAllTransactionModel extends Model<IAllTransaction> {

}

export interface IIsyerimBody {
  Amount: any;
  ReturnUrl: string;
  InstallmentActive: boolean;
  SendSms: boolean;
  Description: string;
  Customer:
  {
    Name: any;
    Surname: any;
    Phone: any;
    Email: any;
    City: any;
    Address:
    any;
  };
  Products: {
    Name: string;
    Count: number;
    UnitPrice: number;
  }[];
  Discount?:number;
  CreatedAt?:string
}

