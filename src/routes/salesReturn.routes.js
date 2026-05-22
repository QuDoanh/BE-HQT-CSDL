import { Router } from 'express'
import * as ctrl from '../controllers/salesReturn.controller.js'
import { authenticate } from '../middleware/auth.js'
import { requireRole } from '../middleware/requireRole.js'

const router = Router()

// tra hang la nghiep vu nhay cam -> chi ADMIN duoc lam
router.use(authenticate, requireRole('ADMIN'))

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getById)
router.post('/', ctrl.create)

export default router
