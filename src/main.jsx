import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux"
import store from "./redux/store.js"

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/login/index.jsx'
import Users from './pages/users/index.jsx'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    name: 'login',
    element: <Login/>
  },
  {
    path: "/users",
    name: 'users',
    element: <Users/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)