import httpErrors from '../httpErrors.js'
import apiKeySpec from '../apikey.js'

export default {
	'/email/email-send': {
		post: {
			tags: ['Email'],
			summary: 'Realiza envío de e-mail',
			description: `
			Recibe los datos para el envío de emails desde el API
			`,
			produces: ['application/json'],
			consumes: ['application/json'],
			parameters: [
				apiKeySpec,	
				{ 
					in: 'body', 
					name: 'from', 
					type: 'string', 
					description: 'Correo del remitente',
					required: true,
					example: '"Nombre Del remitente" <noreply@defensa.cl>'
				},
				{ 
					in: 'body', 
					name: 'to', 
					type: 'string', 
					description: 'Lista de correos de los destinatarios. Deben ir separados por coma (,)',
					required: true,
					example: 'persona1@defensa.cl, persona2@defensa.cl'
				},
				{ 
					in: 'body', 
					name: 'subject', 
					type: 'string', 
					description: 'Asunto del correo. Si no se especifica, tomará el valor "Sin Asunto" ',
					required: true,
					example: 'Asunto de este correo'
				},
				{ 
					in: 'body', 
					name: 'content', 
					type: 'string', 
					description: 'Cuerpo del correo. Puede incluir Texto HTML',
					required: true,
					example: 'Contenido de este correo'
				},
			],
			requestBody: {
				content: {
					'application/json': {
						required: true,
						schema: {
							properties: {
								from : {
									type: 'string', 
									description: 'Correo del remitente',
									required: true,
									example: '"Nombre Del remitente" <noreply@defensa.cl>'
								},
								to : {
									type: 'string', 
									description: 'Lista de correos de los destinatarios. Deben ir separados por coma (,)',
									required: true,
									example: 'persona1@defensa.cl, persona2@defensa.cl'
								},
								subject : {
									type: 'string', 
									description: 'Asunto del correo. Si no se especifica, tomará el valor "Sin Asunto" ',
									required: true,
									example: 'Asunto de este correo'
								},
								content : {
									type: 'string', 
									description: 'Cuerpo del correo. Puede incluir Texto HTML',
									required: true,
									example: 'Contenido de este correo'
								},
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'respuesta del servidor SMTP',
					content: {
						'application/json': {
							schema: {
								properties: {
									accepted: {
										type: 'array',
										items: {
											type: 'string'
										},
										example: 'hacia@defensa.cl'
									},
									rejected: {
										type: 'array',
										items: {
											type: 'string'
										},
										example: 'hacia@defensa.cl'
									},
									envelopeTime: {
										type: 'integer',
										example: 20
									},
									messageTime: {
										type: 'integer',
										example: 20
									},
									messageSize: {
										type: 'integer',
										example: 20
									},
									response: {
										type: 'string',
										example: '250 2.0.0 Ok: queued as 845094078603'
									},
									envelope: {
										type: 'object',
										properties: {
											from: {
												type: 'string',
												example: 'desde@defensa.cl'
											},
											to: {
												type: 'string',
												example: 'hacia@defensa.cl'
											}
											
										}
									},
									messageId: {
										type: 'string',
										example: '<da678f91-dd67-8f78-bc35-937b6ce68305@defensa.cl>'
									}
								}
							}
						}
					},
				},
				...httpErrors
			}
		}
	}
}