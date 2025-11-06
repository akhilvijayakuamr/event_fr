import React from "react";
import "./Card.css";
import { useNavigate } from "react-router-dom";

const Card = ({ id, image, title, description, imageUrl }) => {

  const navigate = useNavigate()


  const handleReadMore = ()=>{
    navigate('/event', {state: {id}})
  }

  return (
    <div className="card">
      <img
        src={image}
        alt={title}
      />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{description}</p>
        <button className="card-btn" onClick={handleReadMore}>Read More</button>
      </div>
    </div>
  );
};

export default Card;