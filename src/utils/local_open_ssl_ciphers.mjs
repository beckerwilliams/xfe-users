'use strict'
import openssl from 'openssl-nodejs-promise'
const openssl_ciphers = 'openssl ciphers'
const resp_buf =  await openssl(openssl_ciphers)
export default resp_buf.toString()

