/**
 *  User Input Data : provides a centralized point where user related data is stored for use with
 *  Unit,Integration and Acceptance test
 *
 *  !!! Properties from this file should not be used directly if REST layer is involved in the test case!
 *  Instead use queryResponseMappings from /restMock/REST_landscape_scenario1.js.
 *  - this way tests will remain durable to REST layer changes.
 *
 *
 *  When editing this file consider:
 *      - Variable naming to be intuitive when using code completion by the developer.
 *      - Every property must be an object "{}" to allow extensibility.
 *      - This library is to be used with either Unit, Integration or Acceptance lvl tests.
 */

// use amdefine library to ensure nodejs can also use this module.
if (typeof define !== 'function') {
    var define = require('../acceptance/node_modules/amdefine')(module);
}

define([

],function() {

    /*
        DO NOT PUSH IF VALUES ARE CHANGED FOR ACCEPTANCE TESTS"
        MOCK DATA IS HARDCODED TO MATCH THESE VALUES.
        TODO: Make mock data driven from this file.
    */
    var user = {};
    user.user1 = {};

    user.user1.name = 'user01';
    user.user1.password = 'user01';

    user.user1.query = {} ;
    user.user1.query.ERBS1 = 'MeContext=ERBS1';

    user.user1.query.MeContext = {};
    user.user1.query.MeContext.value = 'MeContext';
    user.user1.query.MeContext.expectedType = 'MeContext';

    user.user1.query.ManagedElement = {};
    user.user1.query.ManagedElement.value = 'select all objects of type ManagedElement';
    user.user1.query.ManagedElement.expectedType = 'ManagedElement';

    user.user1.query.EUtranCellFDD = {};
    user.user1.query.EUtranCellFDD.value = 'EUtranCellFDD';
    user.user1.query.EUtranCellFDD.expectedType = 'EUtranCellFDD';

    user.user1.query.MkvContext = {};
    user.user1.query.MkvContext.value = 'select all objects of type MkvContext';

    user.user1.query.MeContextWithAttrs = {};
    user.user1.query.MeContextWithAttrs.value = 'MeContext where lostSynchronization=SYNC_ON_DEMAND and userLabel=null';

    user.user1.query.MeContextManagedElementWithAttrs = {};
    user.user1.query.MeContextManagedElementWithAttrs.value = 'select object type ManagedElement with all attr, object type MeContext with all attr';
    
    user.user1.collectionTestCollectionPos = [1,2,3,4,5];
    user.user1.collectionTestCollectionInfo = {
        name: 'TestCollection',
        type: 'collection'
    };

    user.user1.savedSearchTestCollectionInfo = {
        name: 'TestCollection',
        type: 'savedSearch'
    };
    return user;
});
