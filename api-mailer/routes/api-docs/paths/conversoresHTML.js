import httpErrors from '../httpErrors.js'
import apiKeySpec from '../apikey.js'

export default {
	'/files/convert/html-to-pdf': {
		post: {
			tags: ['Conversores HTML'],
			summary: 'Convierte texto HTML en PDF',
			description: `
			Recibe texto HTML y devuelve un PDF en formato Streaming. Para su generación se considera lo siguiente: 
			- Si el contenido del PDF sobrepasa el alto máximo de la página
			- En el pié de página se incluirá tanto el número de página actual como el total de páginas
			`,
			produces: ['application/pdf', 'application/json'],
			consumes: ['application/json'],
			parameters: [
				apiKeySpec,	
				{ 
					in: 'body', 
					name: 'nombre', 
					type: 'string', 
					description: 'Titulo del documento PDF que será generado (No debe contener la extensión)',
					required: true,
					example: 'nombre-archivo-a-generar'
				},
				{ 
					in: 'body', 
					name: 'titulo_documento', 
					type: 'string', 
					description: 'Titulo del contenido',
					required: true,
					example: 'titulo-contenido-pdf'
				},
				{ 
					in: 'body', 
					name: 'subtitulo_documento', 
					type: 'string', 
					description: 'Subtitulo del contenido',
					required: true,
					example: 'subtitulo-contenido-pdf'
				},
				{ 
					in: 'body', 
					name: 'html', 
					type: 'string', 
					description: 'Cuerpo del PDF que será generado',
					required: true,
					example: '<h1>Esto es un ejemplo</h1>'
				},
				{ 
					in: 'body', 
					name: 'color', 
					type: 'boolean', 
					description: 'Indica si el logo a utilizar debe ser en blanco y negro (true) o a color (false). Default false',
					required: false,
					example: 'false'
				},
			],
			requestBody: {
				content: {
					'application/json': {
						reuqired: true,
						schema: {
							properties: {
								color: {
									name: 'color', 
									type: 'boolean', 
									description: 'Indica si el logo a utilizar debe ser en blanco y negro (true) o a color (false). Default false',
									required: false,
									example: 'false'
								},
								nombre: { 
									type: 'string', 
									description: 'Titulo del documento PDF que será generado (No debe contener la extensión)',
									required: true,
									example: 'nombre-archivo-a-generar'
								},
								titulo_documento: {
									type: 'string', 
									description: 'Titulo del contenido',
									required: true,
									example: 'titulo-contenido-pdf'
								},
								subtitulo_documento: {
									type: 'string', 
									description: 'Subtitulo del contenido',
									required: true,
									example: 'subtitulo-contenido-pdf'
								},
								html: {
									type: 'string', 
									description: 'Cuerpo del PDF que será generado',
									required: true,
									example: '<h1>Esto es un ejemplo</h1>'
								},
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'PDF generado',
					content: {
						'application/pdf': {
							schema: {
								type: 'file',
								format: 'binary'
							}
						}
					},
				},
				...httpErrors
			}
		}
	}
}