import React, { useEffect } from 'react'
import './css/detail.css'
import Header from '../../components/Header'
import { useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeById } from '../../service/homeService';
export default function DetailHome() {
    const dispatch = useDispatch();
    let { id } = useParams()
    const currentHome = useSelector(({ home }) => {
        return home.currentHome
    })
    useEffect(() => {
        dispatch(getHomeById(id))
    }, [])
    return (
        <>
            <Header />
            {currentHome
                &&
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
                            <div className="card border-0 shadow">
                                <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-indicators">
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                    </div>
                                    <div class="carousel-inner">
                                        {currentHome.image.length < 2 ?
                                            <div class="carousel-item active">
                                                <img src={currentHome.image[0].image} class="d-block w-100" alt="..." />
                                            </div>
                                            :
                                            <>
                                                <div class="carousel-item active">
                                                    <img src={currentHome.image[0].image} class="d-block w-100" alt="..." />
                                                </div>
                                                {
                                                    currentHome.image.map((item, index) => (
                                                        index !== 0 &&
                                                        <div class="carousel-item">
                                                            <img src={item.image} class="d-block w-100" alt="..." />
                                                        </div>
                                                    ))
                                                }
                                            </>
                                        }
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <div className="card-body p-1-9 p-xl-5">
                                    <div className="mb-4">
                                        <h3 className="h4 mb-0">{currentHome.user.fullName}</h3>
                                        <span className="text-primary">Owner</span>
                                    </div>
                                    <ul className="list-unstyled mb-4">
                                        <li className="mb-3">
                                            <a href="#!">
                                                <i className="fas fa-mobile-alt display-25 me-3 text-secondary" />
                                                {currentHome.user.phoneNumber}
                                            </a>
                                        </li>
                                    </ul>
                                    <ul className="social-icon-style2 ps-0">
                                        <li>
                                            <a href="#!" className="rounded-3">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="rounded-3">
                                                <i className="fab fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="rounded-3">
                                                <i className="fab fa-youtube" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" className="rounded-3">
                                                <i className="fab fa-linkedin-in" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="ps-lg-1-6 ps-xl-5">
                                <div className="mb-5 wow fadeIn">
                                    <div className="text-start mb-1-6 wow fadeIn">
                                        <h3 className="h1 mb-0 text-primary">#About home</h3>
                                    </div>
                                        <div style={{display: "flex", marginBottom: "20px", padding: "10px 10px"}}>
                                            <div style={{width: "50%",}}>
                                                <div style={{width: "50%", textAlign: "center", marginRight: 10,marginBottom: 10, padding: 10}}> 
                                               <img style={{padding: 10}} src='https://icons.iconarchive.com/icons/icons8/ios7/48/Household-Bed-icon.png' alt=''/>  { currentHome.bedrooms} 
                                            </div>
                                            <div style={{width: "50%", textAlign: "center", marginRight: 10, padding: 10}}>
                                                <img style={{width:50 , height:50}} src='https://cdn2.iconfinder.com/data/icons/real-estate-225/1000/Real_Estate-11-512.png' alt=''/>  { currentHome.floorArea} 
                                            </div>
                                            </div>
                                            
                                            <div style={{width: "50%",}}>
                                                <div style={{width: "50%", textAlign: "center", marginRight: 10,marginBottom: 10, padding: 10}}>
                                                <img style={{width:50 , height:50,padding: 10}} src='https://th.bing.com/th/id/OIP.jckLGyz9I3ZVIaeBDNDVdgHaHW?w=178&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7' alt=''/>  { currentHome.address}
                                            </div>
                                            <div style={{width: "50%", textAlign: "center", padding: 10}}>
                                                <img style={{width:50 , height:50,}} src='https://th.bing.com/th/id/OIP.OAkd_z4s0nggBrlorUFYXAHaHa?w=191&h=191&c=7&r=0&o=5&dpr=1.4&pid=1.7' alt=''/>   { currentHome.bathrooms}
                                            </div>
                                            </div>
                                            
                                            <div style={{width: "50%",}}>
                                               
                                            <div style={{width: "50%", textAlign: "center", padding: 10}}>
                                                <img style={{width:50 , height:50,}} src='https://th.bing.com/th?q=Money+Icon+Vector&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.4&pid=InlineBlock&mkt=en-WW&cc=VN&setlang=vi&adlt=moderate&t=1&mw=247' alt=''/>   {currentHome.price } 
                                            </div>
                                            </div>
                                        </div>

                                </div>
                                <div className="mb-5 wow fadeIn">
                                    <div className="text-start mb-1-6 wow fadeIn">
                                        <h4 className="mb-0 text-primary">#Description</h4>
                                        <p> - {currentHome.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            }
        </>

    )
}
