import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

// Lee variables de entorno desde archivo .env
dotenv.config()

/**
 * Parámetros de configuración de IMAP
 */
const smtpConfig = {
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false,
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
	tls: {
		ciphers:'SSLv3'
	}
}

/**
 * Realiza envío del correo y devuelve un booleano indicando el estado del envío
 * 
 * @param {String} to E-mail de destino
 * @param {String} subject Asunto del correo
 * @param {String} template Texto HTML del cuerpo del correo
 * 
 * @returns {Boolean}
 */
const send = async ({to, subject, template}) => {
	try {
		const testAccount = await nodemailer.createTestAccount()
		const testSMTP = {
			host: "smtp.ethereal.email",
			port: 587,
			secure: false,
			auth: {
				user: testAccount.user,
				pass: testAccount.pass,
			},
		}
		
		const transporter = nodemailer.createTransport(testSMTP)

		const info = await transporter.sendMail({ from: process.env.SMTP_SENDER, to, subject, html: template })

		return info

	} catch (error) {
		console.log(error);
		return false
	}
}

export default {
	send,
}