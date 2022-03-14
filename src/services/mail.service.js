const sendGridMail = require('@sendgrid/mail');

class MailService {
    constructor(to, subject, text, html) {
        sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
        this.message = {
            to: to,
            from: process.env.SEND_GRID_FROM,
            subject: subject,
            text: text,
            html: html
        }
    }

    async sendMail() {
        try {
            await sendGridMail.send(this.message);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = MailService;