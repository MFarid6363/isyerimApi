import express from 'express'
import isyerimController from '../controllers/isyerimController'


var router = express.Router();


/* GET users listing. */
router.post('/createPaymentlink', isyerimController.createPaymentLink);
router.get('/getTransactions', isyerimController.getTrnasactionList);
router.get('/getTransactionDetail', isyerimController.getTransactionDetail);

export default  router;
