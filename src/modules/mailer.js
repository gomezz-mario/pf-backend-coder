import nodemailer from 'nodemailer'
import {mailUser, mailPass} from '../config.js';

export default class Mail {
    constructor(){
        this.transport = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            auth: {
              user: mailUser,
              pass: mailPass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
    }

	sendEmailResetPassword = async(toEmail, code) => {
		const link = `http://localhost:8080/api/users/reset_password?email=${toEmail}&code=${code}`;
		return await this.transport.sendMail({
			from: mailUser,
			to: toEmail,
			subject: "Restablecer contraseña",
			html: `
				<h1>Restablecer contraseña</h1>
				<p>Si tu no has solicitado restablecer tu contraseña por favor ignora este mensaje.</p>
				<p>Para restablecer tu contraseña haz clic <a href="${link}">aquí</a>.</p>
				<p>Este link expirará en 1 hora.</p>
			`,
		});
	}
	sendEmailNewPassword = async(toEmail, newPassword) => {
		return await this.transport.sendMail({
			from: mailUser,
			to: toEmail,
			subject: "Nueva contraseña",
			html: `
				<h1>Nueva contraseña</h1>
				<p>Recupera tu cuenta ingresando con una nueva contraseña.</p>
				<p>Contraseña: <strong>${newPassword}.</strong></p>
				<p>Esta contraseña ha sido generada por el sistema. Por favor cambia la contraseña.</p>
				<p>Saludos.</p>
			`,
		});
	}
	sendEmailProductDeleted = async(toEmail, product) => {
		return await this.transport.sendMail({
			from: mailUser,
			to: toEmail,
			subject: "Publicación eliminada",
			html: `
				<h1>Publicación eliminada</h1>
				<p>Tu publicación ${product.title} ha sido eliminada por un administrador.</p>
			`
		});
	}
	sendEmailAccountDeleted = async(toEmail) => {
		return await this.transport.sendMail({
			from: mailUser,
			to: toEmail,
			subject: "Cuenta eliminada",
			html: `
				<h1>Cuenta eliminada</h1>
				<p>Tu cuenta ha sido eliminada por inactividad.</p>
			`
		});
	}
	sendEmailPurchaseCart = async(toEmail, ticket) => {
		return await this.transport.sendMail({
			from: mailUser,
			to: toEmail,
			subject: "Ticket de tu compra",
			html: `
				<h1>Ticket de tu compra</h1>
				<p>Tu código de compra es: ${ticket._id}</p>
				<p>El monto de la compra es: $${ticket.amount}</p>
			`
		});
	}
}

export const mailer = new Mail();