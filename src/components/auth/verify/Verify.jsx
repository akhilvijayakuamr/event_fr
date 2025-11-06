import React, { useEffect, useState } from "react"
import "./Verify.css"
import { verifyEmailApi } from "../../../api/Api.jsx"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Verify = () => {

  const [formData, setFormData] = useState({
    email: '',
    otp: ''
  });

  const navigate = useNavigate();


  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const emailFromParams = urlParams.get('email');
    const otpFromParams = urlParams.get('otp');

    if (emailFromParams && otpFromParams) {
      setFormData((prevData) => ({
        ...prevData,
        email: emailFromParams,
        otp: otpFromParams
      }));
    }
  },[])


  const verifyHandler = async () => {
    // Handle verify logic here
    const response = await verifyEmailApi(formData);
    console.log(response);
    if(response.status === 200){
      toast.success("Verification Successful!");
      navigate('/signin');
    } else {
      toast.error("Verification Failed!");
    }


  }

   
  return (
    <div className="verify-container">
      <ToastContainer/>
      <button className="verify-button"  onClick={verifyHandler}>Verify Your Account</button>
    </div>
  )
}

export default Verify