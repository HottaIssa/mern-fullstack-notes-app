import { pool } from '../models/db.js'

export const register = async (req, res) => {
  const { username, email, password } = req.body
  const consult =
    'INSERT INTO users(username, email, password) VALUES (?, ?, ?)'

  try {
    const [rows] = await pool.query(consult, [username, email, password])
    res.send({ id: rows.insertId, username, email, password })
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}
