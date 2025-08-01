import { pool } from '../models/db.js'

export const getNotes = async (req, res) => {
  const { user_id } = req.user
  const consult = 'SELECT * FROM notes WHERE user_id = ? ORDER BY id_note DESC'
  try {
    const result = await pool.query(consult, [user_id])
    res.json(result[0])
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}
export const getNote = async (req, res) => {
  const { id } = req.params
  const { user_id } = req.user
  const consult =
    'SELECT * FROM notes WHERE user_id = ? ORDER BY id_note DESC LIMIT ?, 1'

  try {
    const result = await pool.query(consult, [user_id, id - 1])
    res.json(result[0][0])
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}
export const postNotes = async (req, res) => {
  const { user_id } = req.user
  const { title, description } = req.body
  const consult =
    'INSERT INTO notes(user_id, title, description) VALUES (?, ?, ?)'

  try {
    const [rows] = await pool.query(consult, [user_id, title, description])
    res.json({
      id: rows.insertId,
      title,
      description
    })
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}
export const patchNote = async (req, res) => {
  const { id } = req.params

  const consult = 'UPDATE notes SET ? WHERE id_note = ?'

  try {
    const [rows] = await pool.query(consult, [req.body, id])
    if (rows.affectedRows <= 0)
      return res.status(404).json({
        message: 'Note not found'
      })
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}
export const deleteNote = async (req, res) => {
  const { id } = req.params
  const consult = 'DELETE FROM notes WHERE id_note = ?'

  try {
    const [rows] = await pool.query(consult, [id])

    if (rows.length <= 0)
      return res.status(404).json({
        message: 'Note not found'
      })
    res.sendStatus(204)
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' })
  }
}
