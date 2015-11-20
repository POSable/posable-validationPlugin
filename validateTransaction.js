var validator = require('validator');
var valPayment = require('./validatePayment');

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

ValTransactionObj.prototype.valTransPayments = function() {
    var messages = {};
    var valid = [];
    this.payments.forEach(function (payment) {
        var eachPayment = valPayment.validatePayment(payment);
        messages = eachPayment.message;
        valid.push(eachPayment.isValid); });

    this.message = messages;
    if (valid.indexOf(false) > -1){ this.isValid = false; } };

ValTransactionObj.prototype.validateTransaction = function(transactionDTO) {
    this.payload = transactionDTO.transaction;
    this.payments = transactionDTO.transaction.payments;

    this.valTransactionID();
    this.valMerchantID();
    this.valTerminalID();
    this.valCashierID();
    this.valTransPayments();

    return this;
};

module.exports = ValTransactionObj;