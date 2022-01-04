import React, { useState } from "react";
import LeftNav from "../LeftNav";
import { useDispatch, useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { updateBio } from "../../actions/user.actions";
// import { dateParser } from "../Utils";
// import FollowHandler from "./FollowHandler";

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className="profil-container">
            <LeftNav />
            <h1> Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="photo-de-profil"/>
                    <UploadImg/>
                </div>
            </div>
        </div>
    )
}

export default UpdateProfil;