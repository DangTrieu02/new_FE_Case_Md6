// Filter.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/slice/homeSlice";
import { getAllCategory, getHomeByCategory } from "../../service/homeService";
import "./styles.css";

function Filter() {
    const dispatch = useDispatch();
    const [selectedFilter, setSelectedFilter] = useState("");
    const categoryList = useSelector((state) => state.home.categoryList);

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
            {categoryList.map((category) => (
                <div
                    key={category.idCategory}
                    className={`links-box ${category.idCategory === selectedFilter && "selected-box"}`}
                    onClick={(event) => handleChange(event, category.idCategory)}
                >
                    <p className={`links-label ${category.idCategory === selectedFilter && "selected-label"}`}>
                        {category.nameCategory}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default Filter;
