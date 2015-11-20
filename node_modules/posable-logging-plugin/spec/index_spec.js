describe('Log plugin -', function() {
    var logPlugin = require('../index');
    var testMessage = {};

    describe('info logs', function() {
        beforeEach(function() {
            logPlugin.level = 30;
            logPlugin.fileLogger.level = 30;
            logPlugin.fileLogger.info = function() {};
            logPlugin.msgLogger.addLogEntry = function() {};

            spyOn(logPlugin.fileLogger, 'info');
            spyOn(logPlugin.msgLogger, 'addLogEntry');
        });

        it('should be written to disk', function() {
            logPlugin.info(testMessage);
            expect(logPlugin.fileLogger.info).toHaveBeenCalled(); });

        it('should be sent to wascally wrapper', function() {
            logPlugin.sendMsg(testMessage);
            expect(logPlugin.msgLogger.addLogEntry).toHaveBeenCalled(); });
    });

    describe('lower priority logs', function() {
        beforeEach(function() {
            logPlugin.fileLogger.debug = function() {};
            logPlugin.sendMsg = function() {};

            spyOn(logPlugin.fileLogger, 'debug');
            spyOn(logPlugin, 'sendMsg');
        });

        it('should NOT be sent to wascally wrapper', function() {
            logPlugin.level = 40;
            logPlugin.debug(testMessage);
            expect(logPlugin.sendMsg).not.toHaveBeenCalled();
        });

    });

});