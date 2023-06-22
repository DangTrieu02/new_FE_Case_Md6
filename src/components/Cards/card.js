import React, { useState } from "react";
import "./styles.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";

function Card({card}) {
  const [openModal,setOpenModal]= useState(false);
  return (
    <>
    <div className="card-box">
      <Swiper
        slidesPerView={1}
        spaceBetween={15}
        loop={true}
        mousewheel={true}
        cssMode={true}
        pagination
        modules={[Pagination, Navigation]}
        className="swiper-container"
      >
        {card.image && card.image.map((src, i) => ( 
          <SwiperSlide key={i}>
            <img src={src.image} className="card-img" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="card-info-flex">
        <h3 className="card-title">{card.nameHome}</h3>
        <div className="edit">
          {/* <button component={Link} to="/owner/editHome"> Edit</button> */}
        <div className="card-rating">
          <StarRateRoundedIcon />
          <p>{card.status}</p>
        </div>
        </div>
      </div>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.floorArea} m2</p>
      <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.address}</p>
      <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black" }}>
        <span style={{ fontWeight: "600" }}>${card.price}</span> / night
      </p>

    </div>
    
    </>
  );
}

export default Card;
