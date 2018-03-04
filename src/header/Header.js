import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => (
    <header>
        <nav className="navbar navbar-light bg-faded">
            <div className="navbar-nav mra-navbar-nav">
                <Link className="nav-item nav-link" to="/">
                    Home
                </Link>
                <Link className="nav-item nav-link" to="/about">
                    About
                </Link>
                <Link className="nav-item nav-link" to="/undo-redo">
                    Undo/Redo
                </Link>
                <Link className="nav-item nav-link" to="/tasks">
                    Tasks
                </Link>
            </div>
        </nav>
    </header>
)

export default Header
