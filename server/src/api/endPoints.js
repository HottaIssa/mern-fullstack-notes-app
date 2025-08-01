import { Router } from 'express'
import { getPong } from '../controllers/pingController.js'
import {
  login,
  patchPassword,
  verifyToken
} from '../controllers/loginController.js'
import { register } from '../controllers/registerController.js'
import {
  getNotes,
  getNote,
  postNotes,
  patchNote,
  deleteNote
} from '../controllers/noteController.js'

const router = Router()

router.use('/ping', getPong)

router.post('/login', login)
router.post('/register', register)
router.patch('/update-pass/:id', verifyToken, patchPassword)
router.get('/notes', verifyToken, getNotes)
router.get('/notes/:id', verifyToken, getNote)
router.post('/notes', verifyToken, postNotes)
router.patch('/notes/:id', verifyToken, patchNote)
router.delete('/notes/:id', verifyToken, deleteNote)

export default router
