import { pool } from '../models/db.js'

export const getPong = async (req, res) => {
  const result = await pool.query('SELECT 1 + 1')
  res.json(result[0])
}
