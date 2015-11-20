var ValPaymentObj = require('./validatePayment');
var ValTransactionObj = require('./validateTransaction');

function ValPlugin () {
    this.payment = ValPaymentObj;
    this.transaction = ValTransactionObj;
}

ValPlugin.prototype.validateTrans = function (transactionObj){
    var valObject =  new ValTransactionObj();
    return valObject.validateTransaction(transactionObj);
};

module.exports = new ValPlugin();