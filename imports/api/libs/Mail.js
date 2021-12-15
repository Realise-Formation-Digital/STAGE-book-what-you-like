import nodemailer from 'nodemailer';
import MailTime from 'mail-time';

/**
 * @class
 * @classdesc Handle NodeMailer Library
 * @author Lionel
 */
class Mail {

    static mailInstance

    static startSMTPServer() {
        console.log("[Mail][startServer] Starting email server");
        const transports = [];
        const smtpOptions = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: 'testemail.realise@gmail.com',
                pass: 'Test.1234',
            },
            from: 'testemail.realise@gmail.com\'',
        };
        transports.push(nodemailer.createTransport(smtpOptions))
        this.mailInstance = new MailTime({
            db: new Mongo.Collection('__mailTimeQueue__').rawDatabase(),
            type: 'server',
            strategy: 'balancer', // Transports will be used in round robin chain
            transports: transports,
            concatEmails: false, // Concatenate emails to the same addressee
            interval: 60,
            debug: true
        });

    }

    static sendEmail(message) {
        this.mailInstance.send({
            to: 'marco.tribuz@gmail.com',
            from: 'testemail.realise@gmail.com',
            subject: 'Reservation',
            text: message,
        })
    }

}

export default Mail