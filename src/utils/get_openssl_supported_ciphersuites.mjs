'use strict'
import openssl from 'openssl-nodejs-promise'
export default (await openssl('openssl ciphers')).toString().trim().split(':')
