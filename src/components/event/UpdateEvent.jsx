import { useState, useEffect } from "react";
import { getEventApi, updateEventApi } from "../../api/Api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import './UpdateEvent.css'
import { useNavigate } from "react-router-dom";
const UpdateEvent = () => {

    const [updateData, setUpdateData] = useState({
        name:'',
        date:'',
        location:'',
        description:'',
        image:''

    });


    const [updatedData, setUpdatedData] = useState({
        name:'',
        date:'',
        location:'',
        description:'',
        image:''

    });

    const navigate = useNavigate()





    const [selectImage, setSelectImage] = useState(null)
    const access = useSelector((state)=>state.auth.user_access_token)
    const location = useLocation()
    const {id} = location.state || {};

    const headers = {
        Authorization: `Bearer ${access}`,
        'Content-Type': 'multipart/form-data'
    }


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file" && files && files[0]) {
            const file = files[0];
            const previewUrl = URL.createObjectURL(file);
            setSelectImage(previewUrl);
            setUpdatedData({
                ...updatedData,
                image: files[0], 
            });
            setUpdateData
            ({
                ...updateData,
                image: files[0], 
            });
        } else {
            setUpdateData(({
            ...updateData,
            [name]: value,
            }));
            setUpdatedData(({
            ...updatedData,
            [name]: value,
            }));
        }
    };

    useEffect(()=>{
        const fetchEvent = async()=>{
            const response = await getEventApi(id, headers)

            setUpdateData({
                name: response.data.name || "",
                date: response.data.date || "",
                location: response.data.location || "",
                description: response.data.description || "",
                image:response.data.image || null
            });
            setSelectImage(response.data.image||null)
        }
        fetchEvent()
    }, [])


    const handleSubmit  = async()=>{
        try {

            const data = new FormData();
            if (updatedData.name) data.append("name", updatedData.name);
            if (updatedData.date) data.append("date", updatedData.date);
            if (updatedData.location) data.append("location", updatedData.location);
            if (updatedData.description) data.append("description", updatedData.description);
            if (updatedData.image) data.append("image", updatedData.image);
     
            const response = await updateEventApi(id, data, headers)
            if (response.status == 200){
                toast.success("Successfully updated the event")
                navigate('/event', {state: {id}})
            }
        } catch (error) {
            toast.error(error)
        }
        
        
    }




    

    return (
        <div className="createeventpage">
            <ToastContainer/>
            <div className="createeventcontainer">
                <h1>update Event</h1>

                <input type="text" 
                placeholder="Event Name"
                name='name'
                onChange={handleChange}
                value={updateData.name}
                />

                <img  src={selectImage} alt="Preview" className="preview-image" />

                <input placeholder="Upload Image"
                name='image'
                type="file"
                onChange={handleChange}
                />

                <input type="date"
                 placeholder="Event Date"
                 name='date'
                 value={updateData.date}
                 onChange={handleChange}/>

                <input type="text"
                 placeholder="Event Location"
                 name='location'
                 value={updateData.location}
                 onChange={handleChange}/>


                <textarea placeholder="Event Description"
                name='description'
                value={updateData.description}
                onChange={handleChange}></textarea>
                <button  onClick={handleSubmit}>Update Event</button>
            </div>
        </div>
    )
}

export default UpdateEvent