import './App.css'
import SignIn from './components/auth/signin/SignIn'
import Frontpage from './components/frontpage/Frontpage' 
import HomePage from './components/homepage/HomePage'
import SignUp from './components/auth/signup/SignUp'
import Verify from './components/auth/verify/Verify'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import CreateEvent from './components/event/CreateEvent'
import UpdateEvent from './components/event/UpdateEvent'
import Event from './components/event/Event'





function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Frontpage/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/createevent' element={<CreateEvent/>}/>
        <Route path='/updateevent' element={<UpdateEvent/>}/>   
        <Route path='/event' element={<Event/>}/> 
      </Routes>
    </Router>
  )
}

export default App
