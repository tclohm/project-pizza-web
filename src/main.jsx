import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Detail from './Detail'

import { DateProvider } from "./context/DateContext"

import { 
  createBrowserRouter,
  RouterProvider,
 } from 'react-router-dom'

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <App />,
        },
        { 
            path: "detail/:pizzaId",
            element: <Detail />,
        },
    ]
 )


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DateProvider>
      <RouterProvider router={router} />
    </DateProvider>
  </React.StrictMode>
)
