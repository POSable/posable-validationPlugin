var validator = require('validator');

//custom extensions
validator.extend('isAuthCode', function(str){
    return /[A-Za-z0-9]{6}/.test(str); });

validator.extend('isLast4', function(str){
    return /(\d{4})/.test(str); });

function ValPaymentObj() {
        this.validator = validator;
        this.payload = {};
        this.message = {};
        this.isValid = true;
}

ValPaymentObj.prototype.valDate = function() {
    if (!this.validator.isDate(this.payload.dateTime)) {
        this.message.dateTime = 'Invalid Date/Time';
        this.isValid = false; } };

ValPaymentObj.prototype.valAmount = function() {
    if (!this.validator.isCurrency(this.payload.amount)) {
        this.message.amount = 'Invalid amount';
        this.isValid = false; } };

ValPaymentObj.prototype.valTax = function() {
    if (!this.validator.isCurrency(this.payload.tax)) {
        this.message.tax = 'Invalid tax amount';
        this.isValid = false; } };

ValPaymentObj.prototype.valPaymentType = function() {
    if (!this.validator.isIn(this.payload.paymentType, ['cash', 'credit'])) {
        this.message.paymentType = 'Invalid payment type';
        this.isValid = false; } };

ValPaymentObj.prototype.valUID = function() {
    if (!this.validator.isAlphanumeric(this.payload.uid)) {
        this.message.uid = 'Invalid UID';
        this.isValid = false; } };

ValPaymentObj.prototype.valCardType = function() {
    if (!this.validator.isIn(this.payload.cardType, ['visa', 'mastercard', 'discover', 'amex'])) {
        this.message.cardType = 'Invalid card type';
        this.isValid = false; } };

ValPaymentObj.prototype.valLast4 = function() {
    if (!this.validator.isLast4(this.payload.last4)) {
        this.message.last4 = 'Last 4 of card invalid';
        this.isValid = false; } };

ValPaymentObj.prototype.valAuthCode = function() {
    if (!this.validator.isAuthCode(this.payload.authCode)) {
        this.message.authCode = 'Invalid authorization code';
        this.isValid = false; } };

ValPaymentObj.prototype.valPayment = function(paymentDTO) {
    this.payload = paymentDTO;

    this.valDate();
    this.valAmount();
    this.valPaymentType();
    this.valTax();
    this.valUID();

    if (this.payload.paymentType === 'credit') {
        this.valCardType();
        this.valLast4();
        this.valAuthCode(); }

    return this;
};

module.exports = ValPaymentObj;