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
import UserPrivateRoute from './routers/UserPrivateRoute'
import UserPublicRoute from './routers/UserPublicRoute'





function App() {

  return (
    <Router>
      <Routes>

        {/* User Private Routes */}
        <Route element={<UserPrivateRoute/>}>
          <Route path='/home' element={<HomePage/>}/>
          <Route path='/createevent' element={<CreateEvent/>}/>
          <Route path='/updateevent' element={<UpdateEvent/>}/>   
          <Route path='/event' element={<Event/>}/> 
        </Route>

        {/* User Public Route */}
        <Route element={<UserPublicRoute/>}>
          <Route path='/' element={<Frontpage/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/verify' element={<Verify/>}/>
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
