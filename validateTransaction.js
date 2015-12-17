var validator = require('validator');
var ValPaymentObj = require('./validatePayment');

function ValTransactionObj() {
    this.validator = validator;
    this.payload = {};
    this.message = {};
    this.payments = {};
    this.isValid = true;
}

ValTransactionObj.prototype.valTransactionID = function() {
    if (!this.validator.isAlphanumeric(this.payload.transactionID)) {
        this.message.transactionID = 'Invalid transaction ID';
        this.isValid = false; } };

ValTransactionObj.prototype.valMerchantID = function() {
    if (!this.validator.isAlphanumeric(this.payload.merchantID)) {
        this.message.merchantID = 'Invalid merchant ID';
        this.isValid = false; } };

ValTransactionObj.prototype.valTerminalID = function() {
    if (!this.validator.isAlphanumeric(this.payload.terminalID)) {
        this.message.terminalID = 'Invalid terminal ID';
        this.isValid = false; } };

ValTransactionObj.prototype.valCashierID = function() {
    if (!this.validator.isAlphanumeric(this.payload.cashierID)) {
        this.message.cashierID = 'Invalid cashier ID';
        this.isValid = false; } };

ValTransactionObj.prototype.valDate = function() {
    if (!this.validator.isDate(this.payload.transactionDateTime)) {
        this.message.dateTime = 'Invalid Date/Time';
        this.isValid = false; } };

ValTransactionObj.prototype.valTransPayments = function() {
    var messages = [];
    var valid = [];
    console.log(this.payments);
    this.payments.forEach(function (payment) {
        var valPayment = new ValPaymentObj();
        var eachPayment = valPayment.valPayment(payment);
        if (Object.keys(eachPayment.message).length > 0) {
            messages = eachPayment.message; }
        valid.push(eachPayment.isValid); });

    this.message.payments = messages;
    if (valid.indexOf(false) > -1){ this.isValid = false; } };

ValTransactionObj.prototype.valTransaction = function(transaction) {
    this.payload = transaction;
    this.payments = transaction.transactionPayments;

    this.valTransactionID();
    this.valMerchantID();
    this.valTerminalID();
    this.valCashierID();
    this.valDate();
    this.valTransPayments();

    return this;
};

module.exports = ValTransactionObj;