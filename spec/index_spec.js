describe('Validation plugin', function() {

    var ValPlugin = require('../index');
    var testValObj;
    var testDTO = {};

    beforeEach(function(){
        testValObj = { valPayment: function(){}, valTransaction: function(){}};
        spyOn(testValObj, 'valPayment');
        spyOn(testValObj, 'valTransaction');

        ValPlugin.testObj = testValObj;
    });

    it('calls valPayment on payment DTO', function() {
        ValPlugin.validatePayment(testDTO);
        expect(testValObj.valPayment).toHaveBeenCalled();
    });

    it('call valTransaction on transaction DTO', function() {
        ValPlugin.validateTransaction(testDTO);
        expect(testValObj.valTransaction).toHaveBeenCalled();
    });

});