/**
 * Created by eianmur on 16/07/2014.
 */
if (typeof define !== 'function') {
    var define = function(callback) {
        module.exports = callback();
    };
}

define(function() {

    return [
        {
            'moName': 'E-Name',
            'mibRootName': 'B-Node',
            'moType': 'C-Type',
            'parentRDN': 'A-Type',
            'poId': '281474976734219',
            'fdn': 'MeContext=ERBS1',
            'attributes': { 'dlTransNwBandwidth': '0' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'

        },
        {
            'moName': 'E-Name',
            'mibRootName': 'A-Node',
            'moType': 'C-Type',
            'parentRDN': 'A-Type',
            'poId': '281474976734219',
            'fdn': 'MeContext=ERBS1',
            'attributes': { 'dlTransNwBandwidth': '0' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'

        },
        {
            'moName': 'F-Name',
            'mibRootName': 'D-Node',
            'moType': 'C-Type',
            'parentRDN': 'A-Type',
            'poId': '281474976734219',
            'fdn': 'MeContext=ERBS1',
            'attributes': { 'dlTransNwBandwidth': '0' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'

        },
        {
            'moName': 'F-Name',
            'mibRootName': 'C-Node',
            'moType': 'C-Type',
            'parentRDN': 'A-Type',
            'poId': '281474976734219',
            'fdn': 'MeContext=ERBS1',
            'attributes': { 'dlTransNwBandwidth': '0' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'

        },
        {
            'moName': 'A-Name',
            'mibRootName': 'F-Node',
            'moType': 'B-Type',
            'parentRDN': 'B-Type',
            'poId': '281474976734223',
            'fdn': 'MeContext=ERBS2',
            'attributes': { 'dlTransNwBandwidth': '0' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        },
        {
            'moName': 'A-Name',
            'mibRootName': 'E-Node',
            'moType': 'B-Type',
            'parentRDN': 'B-Type',
            'poId': '281474976734227',
            'fdn': 'MeContext=ERBS3',
            'attributes': { 'dlTransNwBandwidth': '0' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        },
        {
            'moName': 'B-Name',
            'mibRootName': 'H-Node',
            'moType': 'B-Type',
            'parentRDN': 'A-Type',
            'poId': '281474976734231',
            'fdn': 'MeContext=ERBS4',
            'attributes': { 'dlTransNwBandwidth': '1' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        },
        {
            'moName': 'B-Name',
            'mibRootName': 'G-Node',
            'moType': 'B-Type',
            'parentRDN': 'A-Type',
            'poId': '281474976734235',
            'fdn': 'MeContext=ERBS5',
            'attributes': { 'dlTransNwBandwidth': '1' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        },
        {
            'moName': 'C-Name',
            'mibRootName': 'J-Node',
            'moType': 'A-Type',
            'parentRDN': 'B-Type',
            'poId': '281474976734239',
            'fdn': 'MeContext=ERBS6',
            'attributes': { 'dlTransNwBandwidth': '1' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        },
        {
            'moName': 'C-Name',
            'mibRootName': 'I-Node',
            'moType': 'A-Type',
            'parentRDN': 'B-Type',
            'poId': '281474976734243',
            'fdn': 'MeContext=ERBS7',
            'attributes': { 'dlTransNwBandwidth': '1' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        },
        {
            'moName': 'D-Name',
            'mibRootName': 'L-Node',
            'moType': 'A-Type',
            'parentRDN': 'B-Type',
            'poId': '281474976734247',
            'fdn': 'MeContext=ERBS8',
            'attributes': { 'dlTransNwBandwidth': '1' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        },
        {
            'moName': 'D-Name',
            'mibRootName': 'K-Node',
            'moType': 'A-Type',
            'parentRDN': 'B-Type',
            'poId': '281474976734251',
            'fdn': 'MeContext=ERBS9',
            'attributes': { 'dlTransNwBandwidth': '1' },
            'namespace': 'OSS_TOP',
            'namespaceVersion': '1.0.1'
        }
    ];
});
