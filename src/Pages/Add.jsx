import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Select from 'react-select';
import LoadingSpinner from '../components/LoadingSpinner';
import { addUser } from '../servieces/AllApi';
import { registerContext } from './Contextshare';
import { useNavigate } from 'react-router-dom';


function Add() {

  const { registerData, setregisterData } = useContext(registerContext)
  const navigate = useNavigate()

  const [showspin, setshowspin] = useState(true)
  const [normalInputs, setNormalUserInput] = useState({

    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""

  })

  // to hold status

  const [status, setStatus] = useState("")
  const [profile, setProfile] = useState("")

  const [preview, setpreview] = useState("")

  // define normal user input function

  const getandsetuserNormalInputs = (e) => {
    const { name, value } = e.target
    setNormalUserInput({ ...normalInputs, [name]: value })
  }


  const handlefile = (e) => {
    setProfile(e.target.files[0])
  }


  // console.log(normalInputs);
  // console.log(status);
  // console.log(profile);


  useEffect(() => {

    if (profile) {
      URL.createObjectURL(profile)
      setpreview(URL.createObjectURL(profile))
    }

    setTimeout(() => {
      setshowspin(false)
    }, 1000)
  }, [profile])

  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
  ];


  // define submit function 

  const handlesubmit = async (e) => {
    e.preventDefault()

    const { fname, lname, email, mobile, gender, location } = normalInputs

    if (!fname || !lname || !email || !mobile || !gender || !status || !profile || !location) {

      alert('please fill the form completely')
    }
    else {

      // alert('form filled completely')

      const data = new FormData()
      data.append("fname", fname)
      data.append("lname", lname)
      data.append("email", email)
      data.append("mobile", mobile)
      data.append("gender", gender)
      data.append("status", status)
      data.append("profile", profile)
      data.append("location", location)


      const headers = {
        "content-type": "multipart/form-data"
      }

      // api call

      const response = await addUser(data, headers)

      console.log(response);

      if (response.status == 200) {

        setNormalUserInput({
          ...normalInputs,

          fname: "",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""

        })

        setStatus("")
        setProfile("")
        setregisterData(response.data)
        navigate('/')

      }
      else{
        alert('request failed')
      }


    }
  }
  return (
    <>
      {showspin ?
        <LoadingSpinner /> :
        <div className='container mt-5'>

          <h1 className='text-center fw-bolder'>Add New Employee Details</h1>

          <div className='mt-3 shadow border rounded p-3'>

            <div className='text-center'>

              <img style={{ width: '90px', height: '90px', borderRadius: '50%' }} src={preview ? preview : "https://cliply.co/wp-content/uploads/2020/08/442008112_GLANCING_AVATAR_3D_400px.gif"} alt="no image" />

            </div>

            <Form className='mt-4'>
              <Row>

                {/* first name */}
                <FloatingLabel className='mb-3 col-lg-6' controlId="floatinginputfname" label=" First Name">
                  <Form.Control type="text" name='fname' placeholder=" First Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                </FloatingLabel>

                {/* last name */}
                <FloatingLabel className='mb-3 col-lg-6' controlId="floatinginputlname" label="Last Name">
                  <Form.Control type="text" name='lname' placeholder="Last Name" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                </FloatingLabel>

                {/* E mail id */}
                <FloatingLabel className='mb-3 col-lg-6' controlId="floatinginputEmail" label="Email">
                  <Form.Control type="Email" name='email' placeholder="Email" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                </FloatingLabel>

                {/* Mobile */}
                <FloatingLabel className='mb-3 col-lg-6' controlId="floatinginputmobile" label="Mobile">
                  <Form.Control type="text" name='mobile' placeholder="Mobile" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                </FloatingLabel>

                {/* gender */}

                <Form.Group className='mb-3 col-lg-6'>

                  <Form.Label>Select Gender</Form.Label>
                  <Form.Check type={"radio"} name='gender' value={"Male"} onChange={e => getandsetuserNormalInputs(e)} label={"Male"} />
                  <Form.Check type={"radio"} name='gender' value={"FeMale"} onChange={e => getandsetuserNormalInputs(e)} label={"FeMale"} />

                </Form.Group>

                {/* status */}

                <Form.Group className='mb-3 col-lg-6'>

                  <Form.Label>Select Employee Status</Form.Label>

                  <Select onChange={e => setStatus(e.value)} options={options} />


                </Form.Group>

                {/* File Upload */}
                <Form.Group className='mb-3 col-lg-6'>

                  <Form.Label>Choose a profile picture</Form.Label>

                  <Form.Control type="file" name='profile' onChange={e => handlefile(e)} />

                </Form.Group>

                {/* location */}
                <FloatingLabel className='mb-3 col-lg-6 mt-3' controlId="floatinginputlocation" label="Location">
                  <Form.Control type="text" name='location' placeholder="Location" onChange={e => getandsetuserNormalInputs(e)} value={normalInputs.value} />
                </FloatingLabel>

                <Button onClick={e => handlesubmit(e)} type='submit' variant='primary'> Submit </Button>

              </Row>


            </Form>

          </div>

        </div>
      }
    </>
  )
}

export default Add