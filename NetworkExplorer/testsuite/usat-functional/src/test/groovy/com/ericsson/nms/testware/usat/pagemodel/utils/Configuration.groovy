package com.ericsson.nms.testware.usat.pagemodel.utils

/**
 * Created by eeoicon on 02/02/2018.
 */
class Configuration {

    static def testERBSPartialNodeName = "*ERBS*"
    static def testERBSNodeName = "LTE02ERBS00002"
    static def testERBSLockedCellName = "LTE02ERBS00001-1"
    static def testERBSLockedCellFDN = "MeContext=LTE02ERBS00001,ManagedElement=1,ENodeBFunction=1,EUtranCellFDD=LTE02ERBS00001-1"
    static def defaultHeaders = ['Name','MO Type','Node Name','Sync Status','Parent MO']

    static def getTestERBSPartialNodeName() {
        return testERBSPartialNodeName
    }
    static def getTestERBSNodeName() {
        return testERBSNodeName
    }
    static def getTestERBSLockedCellFDN() {
        return testERBSLockedCellFDN
    }
    static  def getTestERBSLockedCellName() {
        return testERBSLockedCellName
    }
}
