var ValPaymentObj = require('./validatePayment');
var ValTransactionObj = require('./validateTransaction');

function ValPlugin () {
    this.payment = ValPaymentObj;
    this.transaction = ValTransactionObj;
}

module.exports = new ValPlugin();