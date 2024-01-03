'use strict'
// System Imports
import {constants as cc} from 'crypto'
import {connect, createSecureContext} from 'tls'

// Local Imports
import all_cipher_suites from '../utils/get_openssl_supported_ciphersuites.mjs'
import X509CertificateInfo from './X509CertificateInfo.mjs'

// // test
// const c_file = readFileSync('../../data/exchange.xforce.ibmcloud.com-server-cert.der')
//
// // end test

// process.exit()
// RUN CONSTANTS - todo MOVE TO ARGS or CONFIG (Or Both!)
const HOST = 'www.manulife.ca'
const PORT = 443

// Do Not Touch \/ \/ \/
const tlsSecureContextOptions = {
    secureOptions: cc.SSL_OP_ALL | cc.ENGINE_METHOD_ALL | cc.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
    ciphers: all_cipher_suites
}

const no_server_validation = (server, cert) => {
    console.log(`called: no errors, we're good ${server}, ${cert}`)
    return true
}

all_cipher_suites.forEach((cipher_suite) => {
    console.log(`\n\b***** test cipher_suite: ${cipher_suite} *****\n`)
    try {
        let tlsSecureContextOptions = {
            secureOptions: cc.SSL_OP_ALL | cc.ENGINE_METHOD_ALL | cc.SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION,
            ciphers: cipher_suite
        }

        // CXonfigure Options
        let options = {
            host: HOST,
            port: PORT,
            rejectUnauthorized: false,
            tlsSecureContextOptions: createSecureContext(tlsSecureContextOptions)
        }

        let client = connect(options, () => {
            if (client.authorized) {
                console.log("Connection authorized by a Certificate Authority.")
            } else {
                console.log("Connection not authorized: " + client.authorizationError)
            }
            console.log(`Sessions ${client.encrypted ? 'is' : 'is not'} encrypted`)
        }).on('secureConnect', () => {
            let x509CertificateInfo = new X509CertificateInfo(client.getPeerX509Certificate())
            console.log(`X509CertificateInfo: ${x509CertificateInfo.toString()}`)

        }).on('keylog', data => {
            console.log(`keylog msg: ${data}`)
        }).on('error', err => {
            console.error(err.code)
        })

    } catch (err) {
        console.error(`${err.code}: ${cipher_suite}`)
    }
})

// TEST
