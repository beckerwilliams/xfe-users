import {Agent} from 'https'

// const https = new Agent()
import {Collector} from '../conf/conf.mjs'

const https_options = Collector.agent.options

export default class Couchdb3_agent {
    options = https_options
    couchdb3_api = () => {
    }
}
