var fs = require('fs')
var path = require('path')
const dataUtils = require('../utils/dataUtils')
const FILE_PATH = path.resolve('logs/data.txt')

let optionApp = process.env.OPTION_RUN

class Log {  
    #position = 0
    #message 
    #type
    #time

    debug(text) {
        if(optionApp==='debug') {
            this.updateData('DEBUG')
            console.debug(this.changeText(text))
        }
    }

    error(text) {
        this.updateData('ERROR')
        console.error(this.changeText(text))
    }

    info(text) {
        if(optionApp!=="warn" && optionApp !== "error") {
            this.updateData('INFO')
            console.info(this.changeText(text))
        }
    }

    warn(text) {
        if(optionApp !== "error") {
            this.updateData('WARN')
            console.warn(this.changeText(text))
        }
    }

    updateData(type) {
        this.#position++
        this.#time = new Date()
        this.#type = type
    } 

    async writeLogs(text) {
       await fs.appendFile(FILE_PATH, text, 'utf8', function(err) {
            if( err) {
                console.log(err)
            }
        })
    }

    changeText(text) {
         this.#message =  `${this.#type}: Index ${this.#position} \t Time ${dataUtils.dateToFormatLog(this.#time)} \t \nText: ${text}\n`
         this.#message += new Array(100).fill("-").join("")  + "\n"
         this.writeLogs(this.#message)
         return this.#message
    }
}

module.exports = new Log()