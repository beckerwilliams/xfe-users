'use strict'
// TEST
import {readFileSync} from 'fs'

const {X509Certificate} = await import('crypto')
const arrayEqual = (a, b) => {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}


/*
    To Do
    * objectify
    *  subject
    * issuer
    * issuer certificate

 */
class X509CertificateInfo {
    /***
     * Flatten X509 Certificate
     *
     * Given a Certificate in PEM Format - Create a Flat Attribute Structure for Certificate Properties
     * `undefined` properties don't exist in source certificate: semantics: does not exist
     *
     * @param x509cert
     * @type X509Certificate
     * @encoding DER | PEM
     * @param filter
     * @type array
     */
    constructor(x509cert, filter) {

        let cert = new X509Certificate(x509cert)
        this.subject = cert.subject
        this.issuer = cert.issuer
        this.issuerCertificate = cert.issuerCertificate
        this.keyUsage = cert.keyUsage

        // Public Key Info, Flatten x509.keyObject
        this.publicKey = {}
        this.publicKey['asymmetricKeyType'] = cert.publicKey.asymmetricKeyType
        this.publicKey['asymmetricKeyDetails'] = cert.publicKey.asymmetricKeyDetails || null
        this.publicKey['type'] = cert.type

        // Symmetric Key Info
        this.symmetricKeySize = cert.symmetricKeySize

        // Validity Dates
        this.validFrom = cert.validFrom
        this.validTo = cert.validTo

        // Identifiers
        this.serialNumber = cert.serialNumber
        this.fingerprint = cert.fingerprint
        this.fingerprint256 = cert.fingerprint256

        // Extended Key Attributes
        this.ext_key_usage = cert.ext_key_usage
        this.subjectAltName = cert.subjectAltName
        this.infoAccess = cert.infoAccess
        this.modulus = cert.modulus
        this.bits = cert.bits
        this.exponent = cert.exponent
        this.asn1Curve = cert.asn1Curve
        this.nistCurve = cert.nistCurve

        // Methods and Method Enabled Propertie

        this.properties = (() => {
            let bc = {}
            Object.getOwnPropertyNames(this).forEach((prop) => {
                // Trim all String Values
                bc[prop] = typeof this[prop] === 'string' ? this[prop].trim() : this[prop]
            })
            return bc
        })()
        this.equals = that => {
            if (arrayEqual(this.properties, that.properties)) {
                // If we've the same properties, we may be the same
                // console.log('equals: Same Properities')
                for (let prop in this.properties) {
                    // todo SKIP PUBLIC KEY OBJECT Until decomposed here
                    if (prop === 'publicKey') continue
                    // Compare Array Properties
                    if (Array.isArray(this[prop])) {
                        if (!arrayEqual(this[prop].sort(), that[prop].sort())) {
                            // console.log('ARRAY UNEQUAL: ', this[prop].sort(), that[prop].sort())
                            return false
                        }
                    } else if (this[prop] !== that[prop]) {
                        // console.log('NON ARRAY UNEQUAL: ', this[prop], that[prop])
                        return false
                    }
                }
            } else {
                // console.log('equals: UNEQUAL Properties')
            }
            return true
        }
    }
}

export default X509CertificateInfo

// // Test Same Cert
let c_file = '/Users/ron/development/fs-artifact-scanner/test/example_certs/example.com-ca-cert.pem'
let c2_file = '/Users/ron/development/fs-artifact-scanner/test/example_certs/example.com-ca-cert.der'
let t_cert = new X509CertificateInfo(readFileSync(c_file))
let t2_cert = new X509CertificateInfo(readFileSync(c2_file))
// console.log('CERT1: properties: ', t_cert.properties)
console.log('CERT1 === CERT2', t_cert.equals(t2_cert))


const isg_x509_cert_template = {

    "cert": {
        "serial_number": "123456",
        "not_before": "659430394", // seconds since epoch
        "not_after": "6663039494", // seconds since epoch
        "issuer": "2.5.4.6=CA,2.5.4.10=InfoSec Global Inc.,2.5.4.3=AgileScan",
        "subject": "2.5.4.6=CA,2.5.4.10=InfoSec Global Inc.,2.5.4.3=AgileScan",
        "sig_alg": {
            "value": "1.2.840.10045.4.3.4",
            "display": "ecdsa-with-SHA512"
        },
        "pub_key_algorithm": {
            "value": "1.2.840.10045.2.1",
            "display": "id-ecPublicKey"
        },
        "pub_key_info": {
            "size": 521,
            "params": {}
        },
        "self_signed": true,
        "extension": {
            "list": ["key_usage", "extended_key_usage", "basic_constraints"],
            "key_usage": {
                "critical": true,
                "value": 3758096384, // 32-bit integer representing bit string with "bit string" bit 0 = bit 31, etc.
                "display": "Digital Signature, Non Repudiation, Key Encipherment"
            },
            "extended_key_usage": {
                "critical": false,
                "value": ["1.3.6.1.5.5.7.3.1", "1.3.6.1.5.5.7.3.2"],
                "display": "TLS Web Server Authentication, TLS Web Client Authentication"
            },
            "basic_constraints": {
                "critical": true,
                "is_ca": true,
                "path_len": 1
            }
        }
    },
    "policy": {
        "cert_type": "CA",
        "trusted": true,
        "severity": 1
    }
}
