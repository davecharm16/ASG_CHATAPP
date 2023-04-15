import React, {useState , useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Logo from '../assets/logo copy.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';


const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username : '',
    password : '',
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
    if(password === ""){
      toast.error('Passwords is Required', toastOptions);
      return false;
    }
    else if(username.length === 0){
      toast.error('UUsername is Required', toastOptions);
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
      const {password, username} = values;
      try {
        const {data} = await axios.post(loginRoute, {
          username,
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
            <h1>Login to Chat App</h1>
          </div>
          <input 
          type='text' placeholder='Username' name='username' 
          onChange={(e)=>handleChange(e)} value={values.username}
          min={3} 
          />
          <input 
          type='password' placeholder='Password' name='password' 
          onChange={(e)=>handleChange(e)} value={values.password}/>
          <button type='submit'>Login</button>
          <span>Don't have an Account ? <Link to='/register'>Register Here</Link></span>
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

export default Login
