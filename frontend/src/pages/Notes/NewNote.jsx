import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../api/apiNotes.js'

function NewNote() {
  const { id } = useParams()

  const navigate = useNavigate()
  const [idNote, setIdNote] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleNewNote = () => {
    api
      .post('/notes', {
        title,
        description
      })
      .then((res) => {
        res.data
      })
      .catch((err) => console.log(err))
    navigate('/')
  }

  const getNote = async (id) => {
    try {
      const res = await api.get(`/notes/${id}`)
      setTitle(res.data.title)
      setDescription(res.data.description)
      setIdNote(res.data.id_note)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (id) {
      getNote(id)
    }
  }, [id])

  const handleEditNote = (id) => {
    api
      .patch(`/notes/${id}`, {
        title: title,
        description: description
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => console.log(err))
    navigate('/')
  }

  return (
    <section className='flex flex-col items-center md:w-3/5 w-full px-2 gap-4 '>
      <h2 className='text-4xl font-bold'>New Note</h2>
      <form
        onSubmit={id ? () => handleEditNote(idNote) : handleNewNote}
        className='flex flex-col items-center gap-4 w-full'
      >
        <div className='flex w-full justify-between gap-4'>
          <input
            className='bg-[#928779] p-2 rounded-md text-white border-2 border-gray-700 min-w-2/4'
            type='text'
            value={title}
            placeholder='Titulo de la nota'
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className='bg-[#3A445D] p-2 rounded-md text-white hover:bg-[#1A2A3F] transition-colors duration-300 min-w-1/4'
            type='submit'
          >
            {id ? 'Actualizar' : 'Guardar'}
          </button>
        </div>
        <textarea
          className='bg-[#928779] p-2 rounded-md text-white border-2 border-gray-700 w-full'
          placeholder='Escribe lo que desees...'
          value={description}
          rows='16'
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </form>
    </section>
  )
}

export default NewNote
