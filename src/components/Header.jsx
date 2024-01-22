import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div>
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand className='fw-bolder text-light'>
                        <Link style={{textDecoration:'none'}}>
                            <i class="fa-solid fa-people-group fa-lg me-3"></i>
                            EMS-APPLICATION
                        </Link>
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header