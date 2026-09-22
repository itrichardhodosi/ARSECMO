import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import Messages from '../helpers/messages.js'

// Lee variables de entorno desde archivo .env
dotenv.config()

/**
 * Parámetros de configuración de IMAP
 */
const smtpConfig = {
    service: "Gmail",
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        ciphers: 'SSLv3'
    }
}

export default {
    send: async(req, res, next) => {
        try {
            const transporter = nodemailer.createTransport(smtpConfig)
            const info = await transporter.sendMail({
                from: req.body.from,
                to: req.body.to,
                subject: req.body.subject || 'Sin Asunto',
                html: req.body.content
            })

            return res.status(200).send(info)
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: Messages.error500 })
        }
    },
}