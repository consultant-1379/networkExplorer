define([
    'networkexplorer/utils/customError'
], function(customError) {

    describe('utils/customError', function() {
        var sandbox, classUnderTest;

        beforeEach(function() {
            sandbox = sinon.sandbox.create();

            classUnderTest = customError;
        });

        afterEach(function() {
            sandbox.restore();
        });

        describe('getError', function() {
            it('should return MemoryProtectionErrorDataRetrievalError', function() {
                var error = classUnderTest.getError(10106);
                expect(error).to.be.an.instanceof(customError.MemoryProtectionErrorDataRetrievalError);
            });

            it('should return UnknownServerError', function() {
                var error = classUnderTest.getError(-1);
                expect(error).to.be.an.instanceof(customError.UnknownServerError);
            });

            it('should return Timeout Error', function() {
                var error = classUnderTest.getError(-2);
                expect(error).to.be.an.instanceof(customError.Timeout);
            });

            it('should return SaveTimeout Error', function() {
                var error = classUnderTest.getError(-3);
                expect(error).to.be.an.instanceof(customError.SaveTimeout);
            });

            it('should return PersistentObjectNotFound Error', function() {
                var error = classUnderTest.getError(10025);
                expect(error).to.be.an.instanceof(customError.PersistentObjectNotFound);
            });

            it('should return serviceUnavailable Error', function() {
                var error = classUnderTest.getError(10027);
                expect(error).to.be.an.instanceof(customError.ServiceUnavailable);
            });

            it('should return NetworkObjectNotFound', function() {
                var error = classUnderTest.getError(1000);
                expect(error).to.be.an.instanceof(customError.NetworkObjectNotFound);
            });

            it('should return DatabaseUnavailable', function() {
                var error = classUnderTest.getError(10014);
                expect(error).to.be.an.instanceof(customError.DatabaseUnavailable);
            });

            it('should return AccessDenied', function() {
                var error = classUnderTest.getError(10015);
                expect(error).to.be.an.instanceof(customError.AccessDenied);
            });

            it('should return Unauthorized', function() {
                var error = classUnderTest.getError(10019);
                expect(error).to.be.an.instanceof(customError.Unauthorized);
            });

            it('should return TBACPermissionDenied', function() {
                var error = classUnderTest.getError(10023);
                expect(error).to.be.an.instanceof(customError.TBACPermissionDenied);
            });

            it('should return NodeBusy', function() {
                var error = classUnderTest.getError(10017);
                expect(error).to.be.an.instanceof(customError.NodeBusy);
            });

            it('should return collectionNotFound', function() {
                var error = classUnderTest.getError(10007);
                expect(error).to.be.an.instanceof(customError.CollectionNotFound);
            });

            it('should return SyncErrorFound', function() {
                var error = classUnderTest.getError(10021);
                expect(error).to.be.an.instanceof(customError.SyncErrorFound);
            });

            it('should return TransactionError', function() {
                var error = classUnderTest.getError(1004);
                expect(error).to.be.an.instanceof(customError.TransactionError);
            });

            it('should have correct properties', function() {
                var error = classUnderTest.getError(-1);
                expect(error).to.have.property('code').that.is.a('number');
                expect(error).to.have.property('title').that.is.a('string');
                expect(error).to.have.property('message').that.is.a('string');
                expect(error).to.have.property('body').that.is.a('string');
                expect(error).to.have.property('extra').that.is.an('object');
                expect(error.message).to.equal(error.body);
            });

            it('should overwrite title', function() {
                var title = 'My title';
                var error = classUnderTest.getError(-1, title);
                expect(error.title).to.equal(title);
            });

            it('should have extra information', function() {
                var extra = { id: 1 };
                var error = classUnderTest.getError(-1, null, extra);
                expect(error.title).to.exists;
                expect(error.extra).to.equal(extra);
            });
        });
    });
});
