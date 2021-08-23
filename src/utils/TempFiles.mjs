'use strict'
import {randomUUID} from 'crypto'
import {mkdtempSync} from 'fs'
import {tmpdir} from 'os'
import path from 'path'

class TempFiles {
    constructor() {
        try {
            this.t_dir = mkdtempSync(path.join(tmpdir(), 'isg_'))
        } catch (err) {
            console.error(err)
        }
    }
    getTempFile = () => {
        return path.join(this.t_dir, rand.push(randomUUID()))
    }
}
export default TempFiles

