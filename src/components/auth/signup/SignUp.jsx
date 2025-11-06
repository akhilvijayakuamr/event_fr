import React, {useState} from 'react'
import './SignUp.css'
import { signUpApi } from '../../../api/Api.jsx'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';




const SignUp = () => {

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirmpassword: ''
    });

    const navigate = useNavigate()

    const handleSignIn = ()=>{
        navigate('/signin')
    }





    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const signUpHandler = async(e) =>{
        e.preventDefault();
        // Handle sign up logic here
        if (formData.password !== formData.confirmpassword) {
            toast.error("Passwords do not match!");
            return;
        }   
         
        try {
            const response =  await signUpApi(formData);
            if(response.status === 201){
                toast.success("Sign Up Successful! Please check your email for varification",);
            } else {
                toast.error("Sign Up Failed!");
            }
        } catch (error) {
            toast.error("Sign Up Failed! " + error.response.data.email);
        }

    }

    return (
        <div className='signupcontainer'>
        <ToastContainer/>
            <h1>Sign Up</h1>
            <form onSubmit={signUpHandler} className='signupform'>
                <input type="text" 
                placeholder='First Name'
                name='first_name'
                onChange={handleChange}/>

                <input type="text" 
                placeholder='Last Name'
                name='last_name'
                onChange={handleChange}/>

                <input type="email" 
                placeholder='Email'
                name='email'
                onChange={handleChange}/>

                <input type="password" 
                placeholder='Password'
                name='password'
                onChange={handleChange}/>

                <input type="password"
                 placeholder='Confirm Password'
                 name='confirmpassword'
                 onChange={handleChange}
                 />

                <button>Sign Up</button>
                <p><a onClick={handleSignIn}>Sign In</a></p>
            </form>
        </div>
    )
}

export default SignUp
