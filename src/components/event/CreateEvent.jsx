import { useState} from 'react'
import './CreateEvent.css'
import { createEventApi } from '../../api/Api.jsx'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreateEvent = () => {

    const [formData, setFormData] = useState({
        name: '',
        date: '',
        location: '',
        description: '',
        image:null
    });

    const access = useSelector((state) => state.auth.user_access_token);

    const headers = {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${access}`
    }

    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name, value, files} = e.target;
        if (name === 'image') {
            setFormData({
                ...formData,
                image: files[0], 
        });
        } else {
            setFormData({
                ...formData,
                [name]: value,
      });
    }
    }

    
    const handleSubmit = async () =>{
        try {
        const response = await createEventApi(formData, headers);
        console.log("Event Created:", response.data);
        const id = response.data.id
        navigate('/event', {state: {id}})
        } catch (error) {
            console.error("Error creating event:", error);
            
        }


    }



    return (
        <div className="createeventpage">
            <div className="createeventcontainer">
                <h1>Create Event</h1>

                <input type="text" 
                placeholder="Event Name"
                name='name'
                onChange={handleChange}/>

                <input type="date"
                 placeholder="Event Date"
                 name='date'
                 onChange={handleChange}/>

                <input type='file' 
                placeholder='Upload Image'
                name='image'
                onChange={handleChange}/>

                <input type="text"
                 placeholder="Event Location"
                 name='location'
                 onChange={handleChange}/>

                <textarea placeholder="Event Description"
                name='description'
                onChange={handleChange}></textarea>
                <button onClick={handleSubmit}>Create Event</button>
            </div>
        </div>
    
  )
}

export default CreateEvent