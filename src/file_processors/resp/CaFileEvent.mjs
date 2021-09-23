/**
 *
 */
import {readFileSync} from 'fs'

'use strict'

 export class CaEvent {
    constructor(url, dataRecord, type) {
        this.ts = new Date().toISOString()
        this.url = url || ""
        this.type = type || "" // Artifact Type
        if(dataRecord) {
            this.data = readFileSync(url)
        } else {
            this.data = null
        }
    }
}
export default class CaFileEvent extends CaEvent {
     constructor(path, getDataRecord) {
         super(path, getDataRecord)
     }
     // todo
    // 1. Get Data Record
    // 2. Add Filter (LATER)
    // 3. Try and aggregate records in a an object -}
    /***
     * to do
     *
     * 1) get data record
     */
}
