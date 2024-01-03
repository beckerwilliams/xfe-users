// noinspection ES6CheckImport
'esversion: 6'
'use strict'
import { Console } from 'console'
import { Agent, request } from 'https'
import path from 'path'

// Setup Process Console
const console = new Console({
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    colorMode: true
})
const TIME_LABEL = path.basename(process.argv[2], '.mjs')
console.time(TIME_LABEL)

/* Constants */
const ts = () => (new Date()).toISOString()

/**
 *
 * @type {{Accept: string, 'Content-Type': string}}
 */
export const default_headers = (() => {
    return {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
})()

const default_agent = new Agent({
    maxCachedSessions: 112
})

/**
 *
 * @param method
 * @param protocol
 * @param host
 * @param port
 * @param path
 * @param headers
 * @param auth
 * @returns {{rejectUnauthorized: boolean, path: string, headers: {Accept: string, 'Content-Type': string}, protocol: string, agent: module:https.Agent, method: string, port: number, auth: string, host: string}}
 */
export const default_options = (() => {
    return {
        method: 'GET',
        protocol: 'https:',
        host: 'localhost',
        port: 443,
        path: '/',
        agent: default_agent,
        headers: default_headers
    }
})()

/**
 *
 * @param method
 * @param protocol
 * @param host
 * @param port
 * @param path
 * @param headers
 * @param auth
 * @returns {{path: string, headers: {Accept: string, 'Content-Type': string}, protocol: string, agent: module:https.Agent, method: string, port: number, host: string}}
 */
const default_options_auth = (method, protocol, host, port, path, headers, auth) => {
    let def_opts = default_options
    def_opts["method"] = method || def_opts.method
    def_opts["protocol"] = protocol || def_opts.protocol
    def_opts["host"] = host || def_opts.host
    def_opts["port"] = port || def_opts.port
    def_opts["path"] = path || def_opts.path
    def_opts["headers"] = headers || def_opts.headers
    def_opts["agent"] = def_opts.agent
    def_opts["auth"] = auth || null
    def_opts["rejectUnauthorized"] = false
    return def_opts
}

/**
 *
 * @param method
 * @param protocol
 * @param host
 * @param port
 * @param path
 * @param headers
 * @param auth
 * @returns {Promise<{headers: *, body: any, statusMessage: *, statusCode: *}>}
 */
export const simple_client = async (method, protocol, host, port, path, headers, auth) => {

    let incoming_msg = await new Promise((resolve, reject) => {
        // console.timeLog(TIME_LABEL, 'New Request')
        try {
            // noinspection JSCheckFunctionSignatures
            request(default_options_auth(method, protocol, host, port, path, headers, auth), resolve)
                .end()
        } catch (err) {
            reject(err)
        }
        console.timeLog(TIME_LABEL, `${ts()}: Message Sent`)
    })
    let body = await new Promise((resolve, reject) => {
        let body = []
        incoming_msg.on('data', chunk => {
            body.push(chunk)
            // console.timeLog(TIME_LABEL, 'Processed DATA event')
        })
        incoming_msg.on('error', err => {
            // console.timeLog(TIME_LABEL, 'Processed DATA event')
            reject(err)
        })
        // Convert & and Resolve Body to MIME type of incoming headers['Content-Type']
        incoming_msg.on('end', () => {
            // console.timeLog(TIME_LABEL, 'Processed END event')
            body = Buffer.concat(body)
            if (incoming_msg.headers['content-type'] === 'application/json') body = JSON.parse(body)
            else body = body.toString()
            resolve(body)
        })
        console.timeLog(TIME_LABEL, `${ts()}: Body: resolved`)
    })
    console.timeLog(TIME_LABEL, `${ts()}: Message Received`)
    return {
        statusCode: incoming_msg.statusCode,
        statusMessage: incoming_msg.statusMessage,
        headers: incoming_msg.headers,
        body: body
    }
}
