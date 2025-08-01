import { useEffect, useState } from 'react'
import api from '../../api/apiNotes.js'
import { Link } from 'react-router'
import Select from 'react-select'
import Note from '../../components/Note'

function Notes() {
  const [notes, setNotes] = useState([])
  const [filterNotes, setFilterNotes] = useState([])

  const options = [
    { value: 'recent', label: 'Reciente' },
    { value: 'title', label: 'Titulo' }
  ]

  const handleDelete = async (id) => {
    try {
      const res = await api.delete(`/notes/${id}`)
      setNotes(notes.filter((note) => note.id_note != id))
      console.log(res.data)
    } catch (e) {
      console.error(e)
    }
  }

  const getNotes = async () => {
    try {
      const res = await api.get('/notes')
      const note = res.data
      setNotes(
        note.map((note) => ({
          ...note,
          created_at: formatTime(note.created_at)
        }))
      )
    } catch (err) {
      console.log(err)
    }
  }

  const searchNotes = (search) => {
    const newNotes = search
      ? notes.filter((note) =>
          note.title.toLowerCase().includes(search.toLowerCase())
        )
      : notes
    setFilterNotes(newNotes)
  }

  const formatTime = (time) => {
    const fecha = new Date(time)

    const formato = fecha.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })

    return formato
  }

  const filterFormat = (opcion) => {
    let formatFilter = notes
    if (opcion.value == 'title') {
      formatFilter = [...filterNotes].sort((a, b) =>
        a.title.toLowerCase().localeCompare(b.title.toLowerCase())
      )
      setFilterNotes(formatFilter)
    } else {
      setFilterNotes(notes)
    }
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: '#928779', // fondo oscuro
      borderColor: '#5E5768', // borde más claro
      borderRadius: '0.5rem', // bordes redondeados (tailwind: rounded)
      padding: '0.25rem 0.5rem',
      width: '9rem',
      boxShadow: state.isFocused ? '0 0 0 1px #64748b' : 'none',
      '&:hover': {
        borderColor: '#64748b'
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#FFF' // texto claro
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#928779', // fondo del menú
      borderRadius: '0.5rem'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? '#A2A7A9' : '#928779',
      color: '#fff',
      borderRadius: '0.5rem',
      '&:hover': {
        backgroundColor: '#A2A7A9',
        borderRadius: '0.5rem'
      }
    })
  }

  useEffect(() => {
    getNotes()
  }, [])

  useEffect(() => {
    setFilterNotes(notes)
  }, [notes])

  return (
    <section className='flex flex-col items-center md:w-3/5 w-full px-2 gap-4 mt-8'>
      <h2 className='text-4xl font-bold'>Notes</h2>
      <div className='flex w-full justify-between gap-4'>
        <input
          className='bg-[#928779] p-2 rounded-md text-white border-2 border-[#5E5768] min-w-2/4'
          type='text'
          onChange={(e) => searchNotes(e.target.value)}
          placeholder='Busca tu nota'
        />
        <Select
          defaultValue={options[0]}
          options={options}
          onChange={filterFormat}
          styles={customStyles}
          isClearable={false}
          isSearchable={false}
        />
      </div>
      <div className='flex flex-col items-center gap-2 w-full bg-[#D4D2A5] p-2 rounded-md h-96 overflow-y-auto border-2 border-[#5E5768] shadow-lg'>
        {filterNotes.length ? (
          filterNotes.map((note, index) => (
            <Note
              note={note}
              index={index}
              handleDelete={handleDelete}
              key={note.id_note}
            />
          ))
        ) : (
          <div className='m-auto text-[#3A445D]'>
            Crea una nueva nota para mostrar
          </div>
        )}
      </div>
      <Link
        className='bg-[#3A445D] p-2 rounded-md text-white hover:bg-[#1A2A3F] transition-colors duration-300'
        to='/new-note'
      >
        New Note
      </Link>
    </section>
  )
}

export default Notes
