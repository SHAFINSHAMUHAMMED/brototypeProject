import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAxios from "../../../Axios/userAxios";
import "../../clients/Login/assets/material-icon/css/material-design-iconic-font.min.css";
import "./AddUser.css";
import Swal from "sweetalert2";


function AddUser() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const addUserForm = (event) => {
        event.preventDefault();
        if (name.trim().length<4) {
            setErrMsg("Please enter valid name");
            return;
        }
        if (!isValidEmail(email)) {
            setErrMsg("Please enter a valid email address");
            return;
        }
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone.trim())) {
            setErrMsg("Please enter a 10-digit phone number");
            return;
    }
        if (password.trim().length < 6) {
            setErrMsg("Password must be at least 5 characters long");
            return;
        }
    const Toast = Swal.mixin({
       toast: true,
       position: "top-right",
       showConfirmButton: false,
       timer: 1000,
       timerProgressBar: true,
      didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
         toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
        });    
        userAxios.post("/register", { name, email, phone, password }).then((res) => {
            if (res.data.status) {
                Toast.fire({
                    icon: "success",
                    title: "User Created",
                }).then(() => {
                    navigate("/admin/client_table");
                });
                
            } else {
                setErrMsg("Something went wrong");
            }
        });
    };
    const isValidEmail = (email) => {
        const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return emailPattern.test(email.trim());
    };

    return (
        <div>
            <section className="signUp">
                <div className="container_login" style={{ marginTop: "100px" }}>
                    <div className="signUp-content">
                        <div className="signUp-form">
                            <h2 className="form-title">Create User</h2>
                            <form method="POST" className="register-form" onSubmit={addUserForm} id="register-form">
                                <div className="form-group">
                                    <label for="name">
                                        <i className="zmdi zmdi-account material-icons-name"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value);
                                        }}
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="email">
                                        <i className="zmdi zmdi-email"></i>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="pass">
                                        <i className="fa-sharp fa-solid fa-address-book"></i>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        value={phone}
                                        onChange={(e) => {
                                            setPhone(e.target.value);
                                        }}
                                        placeholder="Your Dial number"
                                    />
                                </div>
                                <div className="form-group">
                                    <label for="re-pass">
                                        <i className="zmdi zmdi-lock-outline"></i>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        placeholder="Enter your Password"
                                    />
                                </div>
                                <div className="form-group form-button">
                                    <input
                                        type="submit"
                                        name="signUp"
                                        id="signUp"
                                        className="form-submit"
                                        value="Register"
                                    />
                                </div>
                            </form>
                            {errMsg ? <div className="mt-2" style={{ color: "red" }}>{errMsg}</div> : ""}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AddUser
