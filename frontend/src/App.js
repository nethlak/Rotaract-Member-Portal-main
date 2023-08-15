import React from 'react'
import { Route } from "react-router-dom"
import Login from './screens/LoginScreen/Login'
import SignUp from './screens/RegisterScreen/SignUp'
import "bootstrap/dist/css/bootstrap.css";
import ForgotPassword from './screens/ForgotPassword/Forgotpassword';
import Reset from './screens/ResetPassword/ResetPassword';
import Dashboard from './screens/Dashboard/Dashboard';


const App = () => {
    return (
      <div className='App'>
          <Route path="/" component={Login} exact />
          <Route path="/register" component={SignUp} exact />
          <Route path="/fogot" component={ForgotPassword} exact />
          <Route path="/reset/:resetToken" component={Reset} exact />
          <Route path="/home" component={Dashboard} exact />        
          
      </div>
    
  
    )
}

export default App
