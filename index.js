var ValPaymentObj = require('./validatePayment');
var ValTransactionObj = require('./validateTransaction');

function ValPlugin () {}

ValPlugin.prototype.validateTrans = function (transactionObj){
    var valObject =  new ValTransactionObj();
    return valObject.validateTransaction(transactionObj);
};

ValPlugin.prototype.validatePay = function (paymentObj) {
    var valObject = new ValPaymentObj();
    return valObject.validatePayment(paymentObj);
};

module.exports = new ValPlugin();