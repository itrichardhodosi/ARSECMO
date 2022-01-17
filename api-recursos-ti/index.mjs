// Importa librerías necesarias para la ejecución del API
import express from 'express';
import morgan from 'morgan'
import cors from 'cors'
import url from 'url'
import path from 'path'
import router from './routes/index.js'
import dotenv from 'dotenv'
import errorHandler from './middlewares/errorHandler.js'
import helmet from 'helmet'

const __filename = url.fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Lee variables de entorno desde archivo .env
dotenv.config()

// Configura CORS e intérprete de peticiones HTTP
const app = express()
app.use(morgan('dev'))
app.use(cors())

// Configura middlewares de seguridad
app.use(helmet())
app.disable('x-powered-by')

// Configuraciones generales del servidor
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', router)
app.set('port', process.env.APP_PORT || 3001)

// Middleware de bad request
app.use(errorHandler.requestError)

// Levanta Servidor ExpressJS
app.listen(app.get('port'), () => {
    console.log(`server running on port ${ app.get('port') }`)
})