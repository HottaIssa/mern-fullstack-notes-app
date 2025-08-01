import { Routes, Route } from 'react-router'
import Notes from '../pages/Notes/Notes.jsx'
import NewNote from '../pages/Notes/NewNote.jsx'
import Main from '../pages/Main/Main.jsx'
import NavBar from '../components/NavBar.jsx'
import Profile from '../pages/Profile/Profile'

function RouterApp() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<Main />}>
          <Route index element={<Notes />} />
        </Route>
        <Route element={<Main />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<Main />}>
          <Route path='/new-note' element={<NewNote />} />
        </Route>
        <Route element={<Main />}>
          <Route path='/note/:id' element={<NewNote />} />
        </Route>
        <Route element={<Main />}>
          <Route path='/*' element={<Notes />} />
        </Route>
      </Routes>
    </>
  )
}

export default RouterApp
