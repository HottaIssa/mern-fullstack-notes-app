import { pool } from '../models/db.js'
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.status(401).send('Token requerido')

  jwt.verify(token, process.env.TOKEN_KEY, (err, user) => {
    if (err) return res.status(403).send('Token invalido')
    req.user = user
    next()
  })
}

export const login = async (req, res) => {
  const { username, password } = req.body
  const consult = 'SELECT * FROM users WHERE username = ? AND password = ?'
  try {
    const result = await pool.query(consult, [username, password])
    if (result[0].length > 0) {
      const datos = { user_id: result[0][0].id, username }
      const token = jwt.sign(datos, process.env.TOKEN_KEY, {
        expiresIn: '15m'
      })

      res.send({ ...datos, token })
    } else {
      console.log('wrong user')
      res.status(401).json({ error: 'Invalid username or password' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}

export const patchPassword = async (req, res) => {
  const { password, newPassword } = req.body
  const { id } = req.params
  const consult = 'UPDATE users SET password = ? WHERE id = ? AND password = ?'
  try {
    const [rows] = await pool.query(consult, [newPassword, id, password])
    if (rows.affectedRows <= 0)
      return res.status(404).json({
        message: 'User not found'
      })
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}
