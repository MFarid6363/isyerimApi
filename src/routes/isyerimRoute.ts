import express from 'express'
import isyerimController from '../controllers/isyerimController'


var router = express.Router();


/* GET users listing. */
router.post('/createPaymentlink', isyerimController.createPaymentLink);
router.post('/getTransactions', isyerimController.getTrnasactionList);
router.post('/getTransactionDetail', isyerimController.getTransactionDetail);

export default  router;
