var ValPaymentObj = require('./validatePayment');
var ValTransactionObj = require('./validateTransaction');

function ValPlugin () { this.testObj = ''; }

ValPlugin.prototype.validateTransaction = function (transactionObj){
    var valObject;
    if (this.testObj == '') { valObject = new ValTransactionObj(); }
    else { valObject = this.testObj; }

    return valObject.valTransaction(transactionObj); };

ValPlugin.prototype.validatePayment = function (paymentObj){
    var valObject;
    if (this.testObj == '') { valObject = new ValPaymentObj(); }
    else { valObject = this.testObj; }

    return valObject.valPayment(paymentObj); };

module.exports = new ValPlugin();