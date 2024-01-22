import React from 'react'
import { Button } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


function LoadingSpinner() {
    return (
        <>

            <div className='d-flex justify-content-center align-items-center m-5'>
                <Button variant="primary" disabled>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                    Loading...
                </Button>            </div>

        </>
    )
}

export default LoadingSpinner