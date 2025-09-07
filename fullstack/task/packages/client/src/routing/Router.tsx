import {createBrowserRouter} from 'react-router'
import React from 'react'
import Dashboard from '../pages/Dashboard'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    }
])

export default router