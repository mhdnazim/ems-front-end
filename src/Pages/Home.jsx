import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Hometable from '../components/Hometable'
import LoadingSpinner from '../components/LoadingSpinner'
import { registerContext } from './Contextshare'
import Alert from 'react-bootstrap/Alert';
import { allusers, deleteUser } from '../servieces/AllApi'


function Home() {

  const [allusersData, setAllUserData] = useState([])

  const { registerData, setregisterData } = useContext(registerContext)

  const [showspin, setshowspin] = useState(true)

  const [search, setSearch] = useState("")


  useEffect(() => {

    // call getAllEmployees fn

    getAllEmployees()

    setTimeout(() => {
      setshowspin(false)
    }, 1000)
  }, [search])


  // function definition for get all data

  const getAllEmployees = async () => {
    const response = await allusers(search)
    console.log(response);
    setAllUserData(response.data)

  }

  // delete user

  const removeUser = async (id) => {

    const response = await deleteUser(id)
    console.log(id);

    if (response.status === 200) {
      getAllEmployees()
    } else {

      alert("operation failed !!! please try after some time ")
    }

  }

  return (
    <>


      {
        registerData && <Alert variant='success' onClose={() => setregisterData("")} dismissible>

          {registerData.fname.toUpperCase()}Registered successfullly............
        </Alert>
      }

      {
        showspin ?
          <LoadingSpinner /> :
          <div className='container'>

            <div className='search-all d-flex align-items-center'>
              <div className='search d-flex align-items-center mt-4'>
                <span className='fw-bolder'>
                  Search
                </span>
                <input type="text" onChange={e => setSearch(e.target.value)} placeholder='Search by Employee Name...' className='form-control ms-3' style={{ width: '400px' }} />
              </div>
              <Link to={'/add'} className='btn btn-success ms-auto mt-4 '>
                Add<i class="fa-solid fa-user-plus"></i>
              </Link>
            </div>

            <div className='table mt-5'>

              <h1 className='fw-bolder'>List of All Employees !!!</h1>
              <Hometable displayData={allusersData} removeuser={removeUser} />

            </div>

          </div>
      }
    </>
  )
}

export default Home