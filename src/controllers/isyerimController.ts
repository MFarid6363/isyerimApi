// var AppError = require("../utils/appError");


import AppError from "../utils/appError"
import catchAsync from "../utils/catchAsync";
import { AllTransaction } from "../server";
import { Transaction } from "../server";
// import Transaction from "../models/transactionModel";
import axios from 'axios'
import express, { Request, Response } from 'express';
import getRandomCombination from "../utils/getCombinationOfProducts";
import nodemailer from "nodemailer"
import { dailyProducts } from "./productList";
import { IIsyerimBody } from "../types/Transaction";
import { cloneDeep } from "lodash";

const products = dailyProducts;

let configOptions = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  tls: {
    rejectUnauthorized: true,
    minVersion: "TLSv1.2"
  },
  auth: {
    user: "scuti-support@honey-palace.com",
    pass: "2525Babo..",
  },
})


const sendEmail = async (recievMail: string, content: string) => {
  // send mail with defined transport object
  const info = await configOptions.sendMail({
    from: '"Shop"<scuti-support@honey-palace.com>', // sender address
    to: recievMail, // list of receivers
    subject: "Scutinatural payment link", // Subject line
    // text: "Hello world?", // plain text body
    html: `<b>Hello  here is the link to complete payment: ${content}</b>`, // html body
  });

  // console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// sendEmail().catch(console.error);


// console.log(getRandomCombination(products, 15))

const createPaymentLink = catchAsync(async (req, res: Response) => {
  if (req.headers.authorization == "XMaGnCwkJmyMs3F") {
    let productsComb: { basket: { Name: string; Count: number; UnitPrice: number; }[]; totalPrice: number; discount: number; } = getRandomCombination(products, req?.body?.Amount)
    const body: IIsyerimBody = {
      "Amount": req?.body?.Amount || "", //toplam işlem tutarı
      "ReturnUrl": "https://scutinatural.shop/", //bir eticaret sitesi üzerinden işlem yapılıyorsa, işlem sonucunun iletileceği adres
      "InstallmentActive": true, //taksit yapılıp yapılamayacağı
      "SendSms": false, //müşteri telefonuna sms gönderimi için
      "Description": "ecom", //işleme ait not
      "Customer": {
        "Name": req?.body?.Customer?.Name || "", //müşteri adı
        "Surname": req?.body?.Customer?.Surname || "", //müşteri soyadı
        "Phone": req?.body?.Customer?.Phone || "", //* müşteriye ait telefon numarası
        "Email": req?.body?.Customer?.Email || "", //müşteri eposta
        "City": req?.body?.Customer?.City || "", //müşteri ili
        "Address": req?.body?.Customer?.Address || "", //müşteri adresi
      },
      "Products": productsComb.basket,
    }
    axios.post('https://apitest.isyerimpos.com/v1/createPayLink', body, {
      headers: {
        "MerchantId": process.env.MERCHANT_ID_TEST,
        "UserId": process.env.USER_ID_TEST,
        "ApiKey": process.env.API_KEY_TEST,
      }
    }).then(async (isyerimresponse: any) => {
      var event = new Date();

      if (isyerimresponse.data.ErrorCode == 0) {
        let updatedResponse = cloneDeep(isyerimresponse.data)
        let updatedBody: any = cloneDeep(body)
        updatedBody.ProductsCombination = productsComb
        updatedResponse.Discount = 0
        updatedResponse.Amount = req.body.Amount
        updatedResponse.CreatedAt = event.toLocaleString('en-GB', { timeZone: 'Europe/London' })
        updatedResponse.Body = updatedBody
        console.log(updatedResponse)
        await AllTransaction.create(updatedResponse)
      }
      return res.status(200).json({
        data: isyerimresponse.data,
      });
    }).catch((err) => {
      console.log(err)
      return res.status(400).json({
        status: "Error",
        data: (err.data),
      });
    })
  }
  else {
    const body: IIsyerimBody = {
      "Amount": req?.body?.Amount,//toplam işlem tutarı
      "ReturnUrl": "https://scutinatural.shop/", //bir eticaret sitesi üzerinden işlem yapılıyorsa, işlem sonucunun iletileceği adres
      "InstallmentActive": true, //taksit yapılıp yapılamayacağı
      "SendSms": false, //müşteri telefonuna sms gönderimi için
      "Description": "ecom", //işleme ait not
      "Customer": {
        "Name": req?.body?.Customer?.Name, //müşteri adı
        "Surname": req?.body?.Customer?.Surname, //müşteri soyadı
        "Phone": req?.body?.Customer?.Phone, //* müşteriye ait telefon numarası
        "Email": req?.body?.Customer?.Email, //müşteri eposta
        "City": req?.body?.Customer?.City, //müşteri ili
        "Address": req?.body?.Customer?.Address, //müşteri adresi
      },
      "Products": req?.body?.Products,
    }
    // return res.status(200).json({
    //       status: "succes",
    //       data: "error occured",
    //     })
    axios.post('https://apitest.isyerimpos.com/v1/createPayLink', body, {
      headers: {
        "MerchantId": process.env.MERCHANT_ID_TEST,
        "UserId": process.env.USER_ID_TEST,
        "ApiKey": process.env.API_KEY_TEST,
      }
    }).then((isyerimresponse: any) => {
      var event = new Date();
      if (isyerimresponse.data.ErrorCode == 0) {
        sendEmail(req.body.Customer.Email, isyerimresponse.data.Content).then(async () => {
          let updatedResponse = cloneDeep(isyerimresponse.data)
          let updatedBody: any = cloneDeep(body)
          updatedResponse.Discount = 0
          updatedResponse.Amount = req.body.Amount
          updatedResponse.CreatedAt = event.toLocaleString('en-GB', { timeZone: 'Europe/London' })
          updatedResponse.Body = updatedBody
          console.log(updatedResponse)
          await Transaction.create(updatedResponse);
          updatedResponse.Description = "lazimli"
          await AllTransaction.create(updatedResponse)
          return res.status(200).json({
            status: "succes",
            data: {},
          });
        }).catch((err) => {
          console.log(err)
          return res.status(400).json({
            status: "Error",
            data: "error occured",
          });
        })
      }
    }
    ).catch((err) => {
      console.log(err)
      return res.status(400).json({
        status: "error",
        data: err,
      });
    })
  }
});

const getTrnasactionList = catchAsync(async (req, res: Response) => {
  // 2022-04-20

  axios.post(`https://apitest.isyerimpos.com/v1/payments?date=${req.query.date}`, {}, {
    headers: {
      "MerchantId": process.env.MERCHANT_ID_TEST,
      "UserId": process.env.USER_ID_TEST,
      "ApiKey": process.env.API_KEY_TEST,
    }
  }).then((isyerimres) => {
    return res.status(200).json({
      status: "succes",
      data: isyerimres.data,
    });
  }).catch((err) => {
    return res.status(400).json({
      status: "error",
      data: err.response.data,
    })
  })
})

const getAllTransactionFromDB = catchAsync(async (req, res: Response) => {
  if (req.headers.authorization == "ET4AezJkvcxFngYaZBPtqQCAXPCibB") {

    let updated = await AllTransaction.find()
    return res.status(200).json({
      status: "error",
      data: updated,
    })
  }
  else {
    return res.status(400).json({
      status: "error",
    })
  }
  // 2022-04-20
})

const getTransactionDetail = catchAsync(async (req, res: Response) => {
  axios.post(`https://apitest.isyerimpos.com/v1/paymentStatus?uid=${req.query.uid}`, {}, {
    headers: {
      "MerchantId": process.env.MERCHANT_ID_TEST,
      "UserId": process.env.USER_ID_TEST,
      "ApiKey": process.env.API_KEY_TEST,
    }
  }).then((isyerimresponse) => {
    return res.status(200).json({
      status: "succes",
      data: isyerimresponse,
    });
  }).catch((err) => {
    return res.status(400).json({
      status: "succes",
      data: err,
    });
  })
})

export default {
  createPaymentLink,
  getTrnasactionList,
  getTransactionDetail,
  getAllTransactionFromDB
}