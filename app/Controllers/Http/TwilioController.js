'use strict'
const commonService = use('App/Services/CommonService')


class TwilioController {
    async sendMessage({ response, request, auth, session, view }) {
        try {
            const request_body = request.body
            const TWILIO_ACCOUNT_SID = request_body.twilio_account_sid
            const TWILIO_AUTH_TOKEN = request_body.twilio_auth_token
            const TWILIO_FROM = request_body.twilio_from_number
            const TO_NUMBER = request_body.to_number
            const MESSAGE_BODY = request_body.message_body

            const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

            const message = await client.messages
                .create({
                    body: MESSAGE_BODY,
                    from: TWILIO_FROM,
                    to: TO_NUMBER
                })
            console.log(message.sid)

            return response.json(message)


        } catch (err) {
            await commonService.consoleError(this.constructor.name, new Error(), err.message, err)
            return response.json(err.message)
        }
    }
}

module.exports = TwilioController
