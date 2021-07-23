import React, {useEffect, useState} from "react";
import "./updateProfile.css";
import { useHistory } from "react-router-dom";
import ava from "../../assets/blank-avatar.png"
import { useSelector } from "react-redux";
import { updateAccount } from "../../../services/userService";

const UpdateProfile = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [phoneNums, setPhoneNumbs] = useState("")
    const [pin, setPin] = useState("")
    const [newPin, setNewPin] = useState("")
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const history = useHistory()
    const token = useSelector(state=>state.user.currentUser.token)

    const handleClose = () => {
        history.push("/dashboard")
    }

    const handleSubmit = (e) => {
    // console.log(data);
    history.push("/dashboard")
    updateAccount(firstname, lastname, email, password, newPassword, phoneNums, pin, newPin, token)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
      alert("Your profile is being updated")
  };
    
    const userAcc = useSelector((state) => state.profile.userDetail)

    return (
        <div className="update">
            <div className="update-wrapper">
                <div className="left-side">
                    {userAcc.map((data) => (
                    <div key="{data.item}" className="current">
                        <img src={data.image_url} alt="photo" width="100" height="100"></img>
                        <div className="nama-user">{data.first_name}</div>
                    </div> 
                    ))}    
                </div>
                <div className="right-side">
                    <div className="btn-tutup" onClick={handleClose}>X</div>
                    <div className="title-update">Update Your Profile</div>
                    <div className="update-list">
                    <div className="update-list1">
                        <div className="new-profile">
                            First Name
                            <input
                                value={firstname}
                                className="input-email"
                                type="text"
                                onChange={(e) => setFirstname(e.target.value)}></input>
                        </div>
                        <div className="new-profile">
                            Last Name
                            <input
                                value={lastname}
                                className="input-email"
                                type="text"
                                onChange={(e) => setLastname(e.target.value)}></input>
                        </div>
                        <div className="new-profile">
                            Email
                            <input
                                value={email}
                                className="input-email"
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <div className="new-profile">
                            Password
                            <input
                                value={password}
                                className="input-email"
                                type="text"
                                onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                    </div>
                    <div className="update-list1">
                        <div className="new-profile">
                            New Password
                            <input
                                value={newPassword}
                                className="input-email"
                                type="text"
                                onChange={(e) => setNewPassword(e.target.value)}></input>
                        </div>
                        <div className="new-profile">
                            Phone Number
                            <input
                                value={phoneNums}
                                className="input-email"
                                type="text"
                                onChange={(e) => setPhoneNumbs(e.target.value)}></input>
                        </div>
                        <div className="new-profile">
                            Pin
                            <input
                                value={pin}
                                className="input-email"
                                type="text"
                                onChange={(e) => setPin(e.target.value)}></input>
                        </div>
                        <div className="new-profile">
                            New Pin
                            <input
                                value={newPin}
                                className="input-email"
                                type="text"
                                onChange={(e) => setNewPin(e.target.value)}></input>
                        </div>
                    </div>
                    </div>
                    <div className="btn-profile" onClick={handleSubmit} disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Save</span>
                    </div>
                </div>
            </div>
            {/* <div className="batas-akhir"></div> */}
        </div>
    )
}
export default UpdateProfile;