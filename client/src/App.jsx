import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import AboutUs from './pages/AboutUs'
import Header from './Components/Header'
import AddProperty from './pages/AddProperty.jsx'
import Profile from './pages/Profile.jsx'
import PrivateRoute from './Components/PrivateRoute.jsx'

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sign-in" element={<SignIn/>} />
      <Route path="/sign-up" element={<SignUp/>} />
      <Route path="/about-us" element={<AboutUs/>} />
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/add-property' element={<AddProperty/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App