// src/components/Navbar.tsx

'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import {usePathname} from "next/navigation";

function Navbar() {
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isLinkActive = (href: string) => {
        return pathname === href;
    }

    const getLinktextColor = (href: string) => {
        return isLinkActive(href) ? 'text-blue-500' : '';
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light
                        bg-light shadow top-0 mb-4">
            <div className="container">
                <a className="navbar-brand" href="#">
                    DocManager
                </a>
                <ul className="hidden sm:flex">
                    <li className="nav-item mr-4">
                        <Link
                            className={`nav-link ${getLinktextColor('/')} hover:underline`}
                            href="/"
                            style={{color: isLinkActive('/') ? 'blue' : 'black'}}
                        >Documents
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${getLinktextColor('/add-document')} hover:underline`}
                              href="/add-document">Add New Document
                        </Link>
                    </li>
                </ul>
                <button className="navbar-toggler sm:hidden"
                        type="button"
                        aria-controls="navbarNav"
                        aria-label="Toggle navigation"
                        onClick={toggleMenu}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`${isMenuOpen ? '' : 'hidden'} sm:hidden`}>
                    <ul>
                        <li className="nav-item mb-4">
                            <Link className={`nav-link ${getLinktextColor('/')} hover:underline`}
                                  href="/">Documents
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${getLinktextColor('/add-document')} hover:underline`}
                                  href="/add-document">Add New Document
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
