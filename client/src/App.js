import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './Login'
import WineList from './WineList'
import AddWine from './AddWine'
import EditWine from './EditWine'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' exact element={<WineList />} />
        <Route path='/add-wine' element={<AddWine />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edit-wine' element={<EditWine />} />
      </Routes>
    </Router>
  )
}

export default App
