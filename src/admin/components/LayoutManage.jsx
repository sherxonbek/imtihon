import React from 'react'
import { Outlet } from 'react-router-dom'
import Buttons from './Buttons'

function LayoutManage() {
    return (
        <div>
            <Buttons />
            <div className='flex-grow p-6'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutManage