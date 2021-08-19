'use strict';
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
 */


/**
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
 * PEM X.508 Classification Types
 *
 *
 *
 */
/*
    Encapsulates an X509 certificate and provides read-only access to its information.

const { X509Certificate } = await import('crypto');

const x509 = new X509Certificate('{... pem encoded cert ...}');

console.log(x509.subject);
 */
// Imports
// import {readFileSync} from 'fs'
// import readline from 'readline'

// FIle Read Interface

import {readFileSync} from 'fs';
// Local Constants
// export const X509CertificateTypes = {
//     X509_CERTIFICATE: "",
//     X509_CERTIFICATE_AUTHORITY: "",
//     X509_CERTIFICATE_SERVER: "",
//     X509_CERTIFICATE_CLIENT: "",
//     X509_CERTIFICATE_MIME: ""
// };
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
};

class PKIX_PEM_Classifiers {
    /**
     *
     */
    constructor() {
        // Create Regex Classifiers for All Supported PKIX PEM Types
        this.supported_types = []
        this.classifiers = {}
        this.accum = {}
        for (let p_type in PKIX_PEM_START_END_LABELS) {
            this.classifiers[p_type] = {
                name: p_type,
                type: "PEM_Tags",
                begin_tag: PKIX_PEM_START_END_LABELS[p_type].begin,
                end_tag: PKIX_PEM_START_END_LABELS[p_type].end
            };
            // this[p_type] = new RegExp("^".join(PKIX_PEM_Encoding_StartEnd_Labels[p_type].begin, "|", PKIX_PEM_Encoding_StartEnd_Labels[p_type].end, "$"), "i")
            this.supported_types.push(p_type)
        }
    }

    // /**
    //  *
    //  * @param p_type
    //  * @returns {*}
    //  */
    // getRgxClassifier = p_type => {
    //     return new RegExp(
    //         '^' + PKIX_PEM_START_END_LABELS[p_type].begin +
    //         '$|' + PKIX_PEM_START_END_LABELS[p_type].end + '$', 'i')
    // };
    /**
     * PEM Files may be bundles, Concatenated PEMS, Each Prefaced by '-----Begin' and appended with '-----End'
     *
     * @param f_path
     * @returns type: {p_type: count, ...} for all PEMS in file
     */
    generate_p_type_counts = (f_path, p_type) => {
        let accum = {}
        let f_lines = String(readFileSync(f_path)).split('\n')
        if (!p_type) {  // Search All Supported PEM Types
            this.supported_types.forEach(p_type => {
                let p_type_count = f_lines.filter(line => line === this.classifiers[p_type].begin_tag).length
                accum[p_type] = p_type_count
            });
        } else {  // Search the Specfic PEM Type
            accum[p_type] = f_lines.filter(line => line === this.classifiers[p_type].begin_tag).length
        }
        this.accum = accum
        // Now Process Files
        return this
    };

}

// /**
//  *
//  * @param f_path
//  * @returns p_type.name
//  */
//     get_pem_type = (f_path, p_type) => {
//         let lines = String(readFileSync(f_path)).split('\n');
//         let artifacts_in_file = lines.filter(line => line === '-----BEGIN CERTIFICATE-----').length;
//         console.log(`Certs in ${f_path}: ${artifacts_in_file}`);
//         for (let p_type in this.classifiers) {
//             if (lines[0].startsWith("-----BEGIN CERTIFICATE-----")) {
//                 return p_type.name;
//             }
//             // if (lines[0].search(p_type.classifier > -1)) {
//             //     console.debug(`line: ${lines[0]}, ${p_type.name}`)
//             //     return p_type.name
//             // }
//         }
//     }
// }
/**
 *
 }1 Readfile
 * 2 Testfile against regex, startswith, endswith - whatever's faster
 * 3 todo - disposition file
 */

let cert_path = "/usr/local/etc/openssl@1.1/cert.pem";
let pem_classifier = new PKIX_PEM_Classifiers();
// console.log(pem_classifier.generate_p_type_counts(cert_path))
console.log(pem_classifier.generate_p_type_counts(cert_path, pem_classifier.classifiers.x509_certificate.name).accum)
