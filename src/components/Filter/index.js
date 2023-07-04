// Filter.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slice/homeSlice";
import { getAllCategory, getHomeByCategory } from "../../service/homeService";
import "./styles.css";

function Filter() {
    const dispatch = useDispatch();
    const [selectedFilter, setSelectedFilter] = useState("");
    const categoryList = useSelector(({categories}) =>  categories.categories );

    useEffect(() => {
        dispatch(getAllCategory());
    }, []);

    const handleChange = async (event, newValue) => {
        setSelectedFilter(newValue);
        dispatch(setFilter({ category: newValue }));
        await dispatch(getHomeByCategory(newValue));
    };

    return (
        <div className="filter-div">
            {console.log(categoryList, 111)}
            {categoryList && categoryList.length > 0 ? (
                categoryList.map((item) => (
                    <div
                        key={item.idCategory}
                        className={`links-box ${
                            item.idCategory === selectedFilter ? "selected-box" : ""
                        }`}
                        onClick={(event) => handleChange(event, item.idCategory)}
                    >
                        <img src={item.icon} style={{width: 40, height : 40}} alt="" />
                        <p
                            className={`links-label ${
                                item.idCategory === selectedFilter ? "selected-label" : ""
                            }`}
                        >
                            {item.nameCategory}
                        </p>
                    </div>
                ))
            ) : (
                <p>No categories available.</p>
            )}
        </div>

    );
}

export default Filter;