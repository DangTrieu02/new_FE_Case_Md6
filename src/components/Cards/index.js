import React, { useState } from "react";
import Card from "./card";
import "./styles.css";
function Cards({ list }) {
  const [openModal,setOpenModal]= useState(false);
  return (
    <>
    <div className="cards-flex">
      {list.map((card, i) => (
        <Card card={card}  key={i} />
      ))}
    </div>
    </>
  );
}

export default Cards;
