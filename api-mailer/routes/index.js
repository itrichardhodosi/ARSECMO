// Importa libreria de enrutamiento
import routerx from 'express-promise-router'

// Importa rutas
import MailRouter from './MailRouter.js'

// Crea instancia de enrutador
const router = routerx()

// Enlaza rutas
router.use('/email', MailRouter)

// Exporta enrutador
export default router