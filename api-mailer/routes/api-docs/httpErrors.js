export default {
	400: {
		description: 'Error en los parámetros ingresados',
		content: {
			'application/json': {
				schema: {
					properties: {
						message: {
							type: 'string',
							example: 'Los parámetros ingresados son inválidos',
						}
					}
				}
			}
		}
	},
  403: {
		description: 'la configuración de la aplicación no permite consultas en este endpoint',
		content: {
			'application/json': {
				schema: {
					properties: {
						message: {
							type: 'string',
							example: 'La operación soliticada no está permitida',
						}
					}
				}
			}
		}
	},
  404: {
		description: 'No se especifica el API Key',
		content: {
			'application/json': {
				schema: {
					properties: {
						message: {
							type: 'string',
							example: 'No se encontraron registros que coincidan con los parámetros',
						}
					}
				}
			}
		}
	},
  500: {
		description: 'Error de servidor',
		content: {
			'application/json': {
				schema: {
					properties: {
						message: {
							type: 'string',
							example: 'Ha ocurrido un error. Inténtelo más tarde',
						}
					}
				}
			}
		}
	},
}