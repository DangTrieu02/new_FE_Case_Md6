import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../service/userService";

function EditProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleExit = () => {
        navigate("/");
    };

    const user = useSelector((state) => {
        return state.user.currentUser;
    });

    const [state, setState] = useState({
        username: user.username,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        role: user.role,
    });

    const handleEdit = (event) => {
        const { name, value } = event.target;
        setState((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSave = () => {
        const updatedUser = {
            username: state.username,
            fullName: state.fullName,
            phoneNumber: state.phoneNumber,
            role: state.role,
        };
        dispatch(editUser(updatedUser));
    };

    return (
        <>
            <div>
                FullName
                <input onChange={handleEdit} value={state.fullName} name="fullName" />
            </div>
            <div>
                userName
                <input onChange={handleEdit} value={state.username} name="username" />
            </div>
            <div>
                phoneNumber
                <input onChange={handleEdit} value={state.phoneNumber} name="phoneNumber"/>
            </div>
            <div>
                Role
                <input onChange={handleEdit} value={state.role} name="role" />
            </div>
            <div>
                <button onClick={handleExit}>Exit</button>
                <button onClick={handleSave}>Save</button>
            </div>
        </>
    );
}

export default EditProfile;
