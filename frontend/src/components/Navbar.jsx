import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header>
        <div className='container'>
        <Link to='/'>
           <h1>Workout Daily</h1>
        </Link>
    </div>
    </header>
  )
}

export default Navbar
