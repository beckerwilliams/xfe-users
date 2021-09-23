// noinspection JSUnusedGlobalSymbols

'use strict'

const {X509Certificate} = await import('crypto')
import  arrayEqual  from '../utils/simple_array_equal.mjs'

/*
    todo
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
                for (let prop in this.properties) {
                    // todo SKIP PUBLIC KEY OBJECT Until decomposed here
                    if (prop === 'publicKey') continue
                    // Compare Array Properties
                    if (Array.isArray(this[prop])) {
                        if (!arrayEqual(this[prop].sort(), that[prop].sort())) {
                            return false
                        }
                    } else if (this[prop] !== that[prop]) {
                        return false
                    }
                }
            }
            return true
        }
    }
}

export default X509CertificateInfo
