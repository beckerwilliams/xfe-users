'use strict';
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

/**
 * creates REGEXP Classifier for Start and End of Pem Messages
 * @param p_type
 * @returns {RegExp}
 */
export const getRgxClassifier = p_type => {
    return new RegExp(
        '^' + PKIX_PEM_START_END_LABELS[p_type].begin +
        '$|' + PKIX_PEM_START_END_LABELS[p_type].end + '$', 'i');
}
