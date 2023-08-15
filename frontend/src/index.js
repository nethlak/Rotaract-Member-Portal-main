import React from 'react'
import ReactDOM from 'react-dom'
import {render} from 'react-dom'
// import "bootstrap/dist/css/bootstrap.css";
import {BrowserRouter} from 'react-router-dom'

import App from './App'

const rootElement = document.getElementById('root')

render(
    <BrowserRouter>
       <App />
    </BrowserRouter>, rootElement
    
) 
    
       
