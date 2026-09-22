import routerx from 'express-promise-router'
import MailController from '../controllers/MailController.js'

const router = routerx()

router.post('/email-send', MailController.send)

export default router