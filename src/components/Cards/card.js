// Cards/card.js
import React, { useState } from "react";
import "./styles.css";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Card({ card }) {
  const dispatch = useDispatch()
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false);

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
              <img onClick={()=>navigate(`/detailHome/${card.idHome}`)} src={src.image} className="card-img" alt="" />
            </SwiperSlide>
          ))}
        </Swiper>
        <div style={{padding: '5px 15px'}}>
          <div className="card-info-flex">
            <h4 className="card-title">{card.nameHome}</h4>
            <div className="edit">
              <div className="card-rating">
                <StarRateRoundedIcon />
              </div>
            </div>
          </div>
          <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.floorArea} m2</p>
          <p style={{ margin: 0, color: "var(--font-grey)" }}>{card.address}</p>
          <p style={{ margin: "0.2rem", fontSize: "1rem", color: "var(--black" }}>
            <span style={{ fontWeight: "600" }}>${card.price}</span> / night
          </p>
          {
              currentPath === "/owner" &&
              <div class="box" >
                <img onClick={()=>navigate(`/editHome/${card.idHome}`)} src="https://icons.iconarchive.com/icons/arturo-wibawa/akar/24/edit-icon.png" alt="" />
                <img src="https://icons.iconarchive.com/icons/pictogrammers/material/24/delete-forever-outline-icon.png" alt="" />
              </div>
          }
        </div>
      </div>

    </>
  );
}

export default Card;
