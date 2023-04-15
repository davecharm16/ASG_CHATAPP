import React, {useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo copy.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from '../utils/APIRoutes';


const Register = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username : '',
    email : '',
    password : '',
    confirm_password : ''
  });

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')){
      navigate('/')
    }
  }, [])

  const handleValidation = () =>{
    const {password, confirm_password, email, username} = values;
    if(password != confirm_password){
      toast.error('Passwords Do Not Match!', toastOptions);
      return false;
    }
    else if(username.length < 3){
      toast.error('Username should be greater than 3!', toastOptions);
      return false;
    }
    else if(password.length < 8){
      toast.error('Password should be greater than 8 characters', toastOptions);
      return false;
    }
    else if(email === ""){
      toast.error('Email is required', toastOptions);
      return false;
    }
    return true;
  }


  const handleSubmit = async(e) =>{
    e.preventDefault();
    if(handleValidation()){
      const {password, email, username} = values;
      try {
        const {data} = await axios.post(registerRoute, {
          username,
          email,
          password,
        });

        if(data.status === false){
          toast.error(data.msg, toastOptions);
        }
        if(data.status === true){
          localStorage.setItem('chat-app-user', JSON.stringify(data.user))
          navigate('/');
        }
      } catch (error) {
        console.log('Register Error: ' + error);
      }
    }
  }

  const handleChange = (e) =>{
    setValues((prev) => ({...prev, [e.target.name] : e.target.value}))
  }

  return (
    <>
      <FormContainer>
        <form onSubmit={(e)=>handleSubmit(e)}>
          <div className='brand'>
            <img src={Logo} alt="Logo"/>
            <h1>Register to Chat App</h1>
          </div>
          <input 
          type='text' placeholder='Username' name='username' 
          onChange={(e)=>handleChange(e)} value={values.username}/>
          <input 
          type='email' placeholder='Email' name='email' 
          onChange={(e)=>handleChange(e)} value={values.email}/>
          <input 
          type='password' placeholder='Password' name='password' 
          onChange={(e)=>handleChange(e)} value={values.password}/>
          <input 
          type='password' placeholder='Confirm Password' name='confirm_password' 
          onChange={(e)=>handleChange(e)} value={values.confirm_password}/>
          <button type='submit'>Register</button>
          <span>Already have an Account ? <Link to='/login'>Login Here</Link></span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height : 100vh;
  width : 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display : flex;
    flex-direction: column;
    background-color : #000076;
    gap: 2rem;
    border-radius : 20px;
    padding: 3rem 5rem;

    input{
      background-color : transparent;
      padding: 1rem;
      border: 0.1rem solid #fff;
      border-radius : 5px;
      color: white;
      width: 100%;
      font-size : 1rem;
      &:focus {
        border : 0.1rem solid #ff0000;
        outline: none;
      }
    }
    button {
      padding: 20px 5px;
      border-radius : 20px;
      border : 1px solid #ffb703;
      font-size : 1rem;
      background-color : #ffb703;
      cursor : pointer;
      font-weight : bold;
      color : #023047;
      text-transform : uppercase;
    }
    span {
      color : white;
    }
    a {
      color : #ffb703;
      text-decoration : none;
    }
  }
  
`;

export default Register
