import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Card from "../card/Card";
import "./HomePage.css";
import { getAllEventApi } from "../../api/Api";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [EventData, setEventData] = useState([]);
  const access = useSelector((state)=>state.auth.user_access_token)

  const headers = {
      Authorization: `Bearer ${access}`,
      "Content-Type": "application/json",
  }


  useEffect(()=>{
    const FetchAllEvent = async()=>{
      const response = await getAllEventApi(headers)
      setEventData(response.data)
      console.log(response.data)
    }
    FetchAllEvent()
  },[])

  return (
    <div className="homepagecontainer">
      <Header />
      <h1>Welcome to the Home Page</h1>

      <div className="cardsgrid">
        {EventData.map((card, index) => (
          <Card key={card.id || index}   
                id={card.id}
                image = {card.image}      
                title={card.name}                
                description={card.description}
                />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
