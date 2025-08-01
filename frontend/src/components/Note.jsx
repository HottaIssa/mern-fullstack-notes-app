import { useNavigate } from 'react-router'

function Note({ note, index, handleDelete }) {
  const navigate = useNavigate()

  return (
    <div className='flex justify-between border-b-2  rounded-xs w-full p-2 items-center'>
      <div
        className='flex flex-col truncate gap-1  w-full'
        onClick={() => navigate(`/note/${index + 1}`)}
      >
        <h3 className='text-lg font-bold'>{note.title}</h3>
        <p className='truncate flex-1'>{note.description}</p>
        <span className='text-xs text-gray-400'>{note.created_at}</span>
      </div>
      <button
        className='bg-[#D7263D] p-2 rounded-md ml-2 text-white hover:bg-[#B7161D] transition-colors duration-300'
        onClick={() => handleDelete(note.id_note)}
      >
        Delete
      </button>
    </div>
  )
}

export default Note
