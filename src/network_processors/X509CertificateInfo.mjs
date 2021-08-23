'use strict'
// TEST
import {readFileSync} from 'fs'

const {X509Certificate} = await import('crypto')

const arrayEqual = (a, b) => {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false
    }
    return true
}

class X509CertificateInfo {
    /***
     * Flatten X509 Certificate
     *
     * Given a Certificate in PEM Format - Create a Flat Attribute Structure for Certificate Properties
     *
     * @param x509cert
     * @type X509Certificate
     * @encoding DER
     * @param filter
     * @type array
     */
    constructor(x509cert, filter) {
        let cert = new X509Certificate(x509cert)
        this.subject = cert.subject
        this.issuer = cert.issuer
        this.issuerCertificate = cert.issuerCertificate
        this.keyUsage = cert.keyUsage
        this.publicKey = cert.publicKey

        // KEYINFO
        if (cert.asymmetricKeyDetails) {
            //   Asymmetric Key Info
            this.asymmetricKeyDetails = cert.asymmetricKeyDetails ? cert.asymmetricKeyDetails : ''
            this.modulusLength = cert.asymmetricKeyDetails ? cert.asymmetricKeyDetails.modulusLength : ''
            this.publicExponent = cert.asymmetricKeyDetails ? cert.asymmetricKeyDetails.publicExponent : ''
            this.divisorLength = cert.asymmetricKeyDetails ? cert.asymmetricKeyDetails.divisorLength : ''
            this.namedCurve = cert.asymmetricKeyDetails ? cert.asymmetricKeyDetails.namedCurve : ''
            this.asymmetricKeyType = cert.asymmetricKeyType
        } else if (cert.symmetricKeySize) {
            // Symmetric Key Info
            this.symmetricKeySize = cert.symmetricKeySize
            this.symmetricKeytype = cert.type
        }

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
//
// // Test Same Cert
// let c_file = '/Users/ron/development/fs-artifact-scanner/test/example_certs/example.com-ca-cert.der'
// let t_cert = new X509CertificateInfo(readFileSync(c_file))
// let t_cert2 = new X509CertificateInfo(readFileSync(c_file))
// // console.log('CERT1: properties: ', t_cert.properties)
// console.log('CERT1 === CERT2', t_cert.equals(t_cert2))
//
//
