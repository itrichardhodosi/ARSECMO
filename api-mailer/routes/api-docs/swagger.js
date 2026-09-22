// Importa libreria de enrutamiento
import routerx from 'express-promise-router'
import swaggerUi from 'swagger-ui-express'
import options from './options.js'
import conversoresHTML from './paths/conversoresHTML.js'
import email from './paths/email.js'
import conversoresJSON from './paths/conversoresJSON.js'

// Crea instancia de enrutador
const router = routerx()

const paths = {
	...conversoresHTML,
	...email,
	...conversoresJSON,
}

const specs = {
	openapi: '3.0.0',
	info: {
		version: '1.0',
		title: 'API Recursos TI',
		description: 'API de Recursos compartidos entre aplicaciones Desarrolladas por el Departamento TIC'
	},
	tags: [
		{ name: 'Conversores HTML' },
		{ name: 'Email' },
	],
}

// Configuración de Swagger
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup({
	...specs,
	paths
}, options));

// Exporta enrutador
export default router