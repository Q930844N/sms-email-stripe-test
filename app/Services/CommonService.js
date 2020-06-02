'use strict'

class CommonService {

    async consoleError(controller_name, function_name, error_message, stack_traces){
            console.log('\x1b[31m%s\x1b[0m', '------------------------------ ERROR START ------------------------------------\n',
                '\x1b[32mController: \x1b[0m', controller_name, '\n',
                '\x1b[32mFunction: \x1b[0m', function_name.stack.split(/\r\n|\r|\n/g)[1].trim().split('.')[1].split(' ')[0], '\n',
                '\x1b[32mError: \x1b[0m', '\x1b[36m', error_message, '\x1b[0m\n',
                '------------------------------------------------------------------------------', '\n',
                '\x1b[32mStack Traces: \x1b[0m', stack_traces, '\n',
                '\n\x1b[33m', '------------------------------ ERROR END ------------------------------------\x1b[0m')

    }

    async getStopTypes(){
        return [
            { id: '1', name: 'Garage' },
            { id: '2', name: 'Bus Stop' },
            { id: '3', name: 'Corner' },
            { id: '4', name: 'School' }
        ]        
    }
}
const service =  new CommonService()
module.exports = service

