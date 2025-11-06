import {useState} from 'react'
import './SignIn.css'
import { signInApi } from '../../../api/Api.jsx'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../../redux/slice.jsx'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'




const SignIn = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSignUp = ()=>{
        navigate('/signup')
    }


    const signInHandler = async(e) =>{
        e.preventDefault();
        // Handle sign in logic here
        try {
            const response = await signInApi(formData);
            dispatch(setCredentials({
                userId: response.data.userId,
                access: response.data.access,
                refresh: response.data.refresh,
                email: formData.email,
            }));

            toast.success("Sign In Successful!");
            navigate('/home');

        } catch (error) {
            toast.error("Sign In Failed! " + error.response.data.detail);
        }
    }

    return (
        <div className='signincontainer'>
            <ToastContainer/>
            <h1>SignIn</h1>
            <form onSubmit={signInHandler} className='signinform'>
                <input type="email"
                 placeholder='Email'
                 name='email'
                 onChange={handleChange}/>

                <input type="password" 
                placeholder='Password'
                name='password'
                onChange={handleChange}/>

                <button>Sign In</button>
                <p><a onClick={handleSignUp}>Sign Up</a></p>
            </form>
        </div>
    )
}


export default SignIn
