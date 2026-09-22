import httpErrors from '../httpErrors.js'
import apiKeySpec from '../apikey.js'

export default {
	'/files/convert/json-to-csv': {
		post: {
			tags: ['Conversores JSON'],
			summary: 'Recibe datos en formatos JSON y los convierte en CSV',
			description: `
			Recibe datos en formatos JSON y los convierte en CSV
			`,
			produces: ['text/csv'],
			consumes: ['application/json'],
			parameters: [
				apiKeySpec,	
				{ 
					in: 'body', 
					name: 'header', 
					type: 'boolean', 
					description: 'Incluye una fila con los encabezados si se especifica true. Estos provendrán de los nombres de campos del JSON proporcionado',
					required: true,
					example: 'true'
				},
				{ 
					in: 'body', 
					name: 'quotes', 
					type: 'boolean', 
					description: 'Si se espeficifa en True, los valores de campos de tipo String y los encabezados seran encerrados entre comllias dobles (")',
					required: false,
					example: 'true'
				},
				{ 
					in: 'body', 
					name: 'file_name', 
					type: 'string', 
					description: 'Indica el nombre del archivo que será generado. Si no se especifica, el nombre del archivo será untitled.csv',
					required: false,
					example: 'mi-archivo.csv'
				},
				{ 
					in: 'body', 
					name: 'records', 
					type: 'array', 
					description: 'Arreglo de objetos JSON con el contenido que debe transformarse en CSV',
					required: true,
					example: "[{ id: 1, nombre: 'John Doe' }]"
				},
			],
			requestBody: {
				content: {
					'application/json': {
						required: true,
						schema: {
							properties: {
								header : {
									type: 'boolean', 
									example: 'true'
								},
								quotes : {
									type: 'boolean', 
									example: 'true'
								},
								file_name : {
									type: 'string', 
									example: 'true'
								},
								records : {
									type: 'array', 
									example: [{ id: 1, nombre: 'John Doe' },{ id: 2, nombre: 'John Doe' }]
								},
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'archivo CSV generado',
					content: {
						'text/csv': {
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
	},
	'/files/convert/json-to-xlsx': {
		post: {
			tags: ['Conversores JSON'],
			summary: 'Recibe datos en formatos JSON y los convierte en XLSX',
			description: `
			Genera libros Excel con la posibilidad de añadir más de una hoja por libro y especificar si el formato requerido es plano o tabla
			`,
			consumes: ['application/json'],
			produces: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
			parameters: [
				apiKeySpec,	
				{ 
					in: 'body',
					name: 'file_name',
					type: 'string',
					description: 'Nombre del archivo Excel a generar, no debe incluir extensión',
					required: true,
					example: 'mi-archivo-excel'
				},
				{ 
					in: 'body',
					name: 'sheets',
					type: 'array',
					description: 'Array de hojas de trabajo a generar',
					required: true,
					example: '[{"name": "Sheet1 API", "content_type": "table", "headers": ["col 1", "col 2"], "data": [["val 1.1", "val 1.2"]]}]'
				},
			],
			requestBody: {
				content: {
					'application/json': {
						required: true,
						schema: {
							properties: {
								file_name : {
									type: 'string', 
									example: 'mi-archivo-excel'
								},
								sheets : {
									type: 'array',
									items: {
										properties: {
											name : {
												type: 'string', 
												example: 'Sheet1'
											},
											content_type : {
												type: 'string', 
												example: 'table'
											},
											headers : {
												type: 'array', 
												example: ["col 1", "col 2"]
											},
											data : {
												type: 'array', 
												example: [
													["val 1.1", "val 1.2"],
													["val 2.1", "val 2.2"]
												]
											},
										}
									}
								},
							}
						}
					}
				}
			},
			responses: {
				200: {
					description: 'archivo CSV generado',
					content: {
						'text/csv': {
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