import { useState, useEffect } from "react";
import "./Event.css"; 
import Header from "../header/header";
import { useLocation, useNavigate } from "react-router-dom";
import { getEventApi, getDeleteEventApi } from "../../api/Api";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const Event = () => {
  const [eventData, setEventData] = useState({});
  const access = useSelector((state)=>state.auth.user_access_token)
  const user_id = useSelector((state)=>state.auth.user_id)

  const location = useLocation()
  const {id} = location.state || {};
  const navigate = useNavigate()

  
const headers = {
        Authorization: `Bearer ${access}`,
        "Content-Type": "application/json",
    }
 


  useEffect(()=>{
   const fetchEvent = async () => {
        if (id) {
            try {
                const response = await getEventApi(id, headers);
                console.log(response.data)
                setEventData(response.data);                    
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        }
  };

  fetchEvent()

  },[id])

  const handleUpdate = ()=>{
    navigate('/updateevent', {state: {id}})
  }

  const handleDelete = async()=>{
        try {
            const response = await getDeleteEventApi(id, headers)
            console.log(response.data)
            toast.success("Deleted Successfully")
            navigate('/home')
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
  }



  return (
    <div>
    <Header/>
    <ToastContainer/>
    <div className="event-main-container">
      <div className="event-card">
        <div className="menu-container">
        {
            user_id === eventData.created_by && (
            <div className="menu-wrapper">
                <button className="menu-button">⋮</button>
                <div className="menu-dropdown">
                    <button onClick={handleUpdate}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
            )
        }
        
      </div>
        <img
          src={eventData.image}
          alt={eventData.name}
          className="event-image"
        />
        <div className="event-content">
          <h1 className="event-title">{eventData.title}</h1>
          <p className="event-date">
            📅 <strong>{eventData.date}</strong> | 📍 {eventData.location}
          </p>
          <p className="event-description">{eventData.description}</p>
          <button className="event-button">Register Now</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Event;
