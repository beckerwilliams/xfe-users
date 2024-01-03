// noinspection JSUnusedGlobalSymbols

'use strict'
/**
 * PEM Processor
 *
 * @author Ron Williams
 * @email ron.williams@infosecglobal.com
 *
 * Given a PEM Encoded File
 *      1. Test For Certificate Type
 *         Start of Message Flag: -----BEGIN CERTIFICATE-----
 *         Endo of Message Flag : -----END CERTIFICATE-----
 *
 * Reference:   https://www.ssl.com/info/
 *              https://nodejs.org/dist/latest-v16.x/docs/api/crypto.html#crypto_class_x509certificate
 *
 *              RFC 989 https://datatracker.ietf.org/doc/html/rfc989
 *              RFC 989                                                    February 1987
 * In this approach, an outbound privacy-enhanced message is transformed between four forms, in sequence:
 *
 *   1.  (Local_Form) The message text is created (e.g., via an editor)
 *        in the system's native character set, with lines delimited in accordance with local convention.
 *
 *   2.   (Canonicalize) The message text is converted to the universal
 *         canonical form, equivalent to the inter-SMTP representation as
 *         defined in RFC822 [7] (ASCII character set, <CR><LF> line
 *         delimiters).  (The processing required to perform this
 *         conversion is relatively small, at least on systems whose
 *         native character set is ASCII.)
 *
 *    PEM Encoding
 *      http://www.herongyang.com/Cryptography/Certificate-Format-PEM-Privacy-Enhanced-Mail.
 *
 *    Certificate in PEM Format
 *          http://www.herongyang.com/Cryptography/Certificate-Format-PEM-on-Certificates.html
 *
 *    PKIX Textual Encodings IETF RFC 7468
 *      https://datatracker.ietf.org/doc/html/rfc7468
 *      https://datatracker.ietf.org/doc/html/rfc7468#section-5
 *
 *
 */


/**
 *
 * 1 Readfile
 * 2 Testfile against regex, startswith, endswith - whatever's faster
 * 3 todo - disposition file
 */

/**
 * PEM X.508 Classification Types
 *
 *
 *
 */
import {readFileSync} from 'fs'


/**
 * Start & End Tags For each of 8 PKIX Certificate Types
 * @type {{pkcs7: {end: string, begin: string}, public_key: {end: string, begin: string}, pkcs8_private_key: {end: string, begin: string}, x509_certificate: {end: string, begin: string}, cms: {end: string, begin: string}, attribute_certificate: {end: string, begin: string}, x509_crl: {end: string, begin: string}, pkcs8_private_key_encrypted: {end: string, begin: string}}}
 */
const PKIX_PEM_START_END_LABELS = {  // RFC 7468
    x509_certificate: {
        begin: "-----BEGIN CERTIFICATE-----",
        end: "-----END CERTIFICATE-----"
    },
    x509_crl: {
        begin: "-----BEGIN X509 CRL-----",
        end: "-----END X509 CRL-----"
    },
    pkcs7: {
        begin: "-----BEGIN PKCS7-----",
        end: "-----END PKCS7-----"
    },
    cms: {
        begin: "-----BEGIN CMS-----",
        end: "-----END CMS-----"
    },
    pkcs8_private_key: {
        begin: "-----BEGIN PRIVATE KEY-----",
        end: "-----END PRIVATE KEY-----"
    },
    pkcs8_private_key_encrypted: {
        begin: "-----BEGIN ENCRYPTED PRIVATE KEY-----",
        end: "-----END ENCRYPTED PRIVATE KEY-----"
    },
    attribute_certificate: {
        begin: "-----BEGIN ATTRIBUTE CERTIFICATE-----",
        end: "-----END ATTRIBUTE CERTIFICATE-----"
    },
    public_key: {
        begin: "-----BEGIN PUBLIC KEY-----",
        end: "-----END PUBLIC KEY-----"
    }
}
class PKIX_PEM_FILE_Classifiers extends Object {

    /**
     * Create PKIX/PEM File Classifier
     * @constructor
     */
    constructor() {
        super()
        // Create Regex Classifiers for All Supported PKIX PEM Types
        this.supported_types = []
        this.classifiers = {}
        for (let p_type in PKIX_PEM_START_END_LABELS) {
            this.classifiers[p_type] = {
                name: p_type,
                type: "PEM_Tags",
                begin_tag: PKIX_PEM_START_END_LABELS[p_type].begin,
                end_tag: PKIX_PEM_START_END_LABELS[p_type].end
            }
            this.supported_types.push(p_type)  // These are the supported X
        }
    }
    /**
     * #Get PKIX PEM File Format from Discovered File*
     * @param f_path
     * @param p_type
     * @returns {PKIX_PEM_FILE_Classifiers}
     */
    p_type_accum = (f_path, p_type) => {
        let accum = {}
        let f_lines = String(readFileSync(f_path)).split('\n')

        if (!p_type) {  // Search All Supported PEM Types
            this.supported_types.forEach(p_type => {
                accum[p_type] = f_lines.filter(line => line === this.classifiers[p_type].begin_tag).length
            })
        } else {  // Search the Specfic PEM Type
            accum[p_type] = f_lines.filter(line => line === this.classifiers[p_type].begin_tag).length
        }
        this.accum = accum
        return this
    }
}

/**
 * @exports
 */
export default PKIX_PEM_FILE_Classifiers
