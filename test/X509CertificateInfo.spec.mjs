'use strict'
import {readFileSync} from 'fs'
import X509CertificateInfo from '../src/network_processors/X509CertificateInfo.mjs'
import {expect} from 'chai'

/**
 * GOALS:
 *   1. Decompose Fields of X509 Certificate
 *   2. Consume PEM or DER Certificate Format
 *   3. Demonstrate Equality Despite Source Data Format
 */
suite('X509CertificateInfo.mjs', () => {
    let cert_file_der, cert_file_pem, x509_cert_pem, x509_cert_der

    suiteSetup(() => {
        cert_file_der = '/Users/ron/development/fs-artifact-scanner/test/example_certs/example.com-ca-cert.der'
        x509_cert_der = new X509CertificateInfo(readFileSync(cert_file_der))

        cert_file_pem = '/Users/ron/development/fs-artifact-scanner/test/example_certs/example.com-ca-cert.pem'
        x509_cert_pem = new X509CertificateInfo(readFileSync(cert_file_pem))
    })
    test("certDer equal to certPem", done => {
        expect(x509_cert_pem.equals(x509_cert_pem), done()).to.be.true
    })
    test("certDer equals certDer", done => {
        expect(x509_cert_der.equals(x509_cert_der), done()).to.be.true
    })
    test("certPem equals certPem", done => {
        expect(x509_cert_der.equals(x509_cert_der), done()).to.be.true
    })
})