import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAxios from "../../../Axios/userAxios";
import "./assets/material-icon/css/material-design-iconic-font.min.css";
import "./Login.css";

function UserRegister() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const navigate = useNavigate();

    const signUpForm = (event) => {
        event.preventDefault();

         // Validation
    if (!name || name.trim().length < 4) {
        setErrMsg("Enter Valid Name.");
        return;
    }

    if (!email || email.trim().length<5) {
        setErrMsg("Email is required.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        setErrMsg("Invalid email format.");
        return;
    }

    if (!phone || !/^\d{10}$/.test(phone.toString().trim())) {
        setErrMsg("Phone must be a 10-digit number.");
        return;
    }

    if (!password || password.toString().trim().length < 6) {
        setErrMsg("Password must be at least 6 characters long.");
        return;
    }

        userAxios.post("/register", { name, email, phone, password }).then((res) => {
            if (res.data.status) {
                navigate("/login");
            } else {
                setErrMsg("Something went wrong");
            }
        });
    };

    return (
        <div>
            <section className="signUp">
                <div className="container_login" style={{ marginTop: "100px" }}>
                    <div className="signUp-content">
                        <div className="signUp-form">
                            <h2 className="form-title">Sign up</h2>
                            <form method="POST" className="register-form" onSubmit={signUpForm} id="register-form">
                                <div className="form-group">
                                    <label for="name">
                                        <i className="zmdi zmdi-account material-icons-name ms-2"></i>
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
                                        <i className="zmdi zmdi-email ms-2"></i>
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
                                        <i className="fa-sharp fa-solid fa-address-book ms-2"></i>
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
                                        <i className="zmdi zmdi-lock-outline ms-2"></i>
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
                            {errMsg ? <div style={{ color: "red" }}>{errMsg}</div> : ""}
                        </div>
                        <div className="signUp-image">
                            <figure>
                                <img src={"/images/register (2).png"} alt="sing up image" />
                            </figure>
                            <a
                                onClick={() => {
                                    navigate("/login");
                                }}
                                className="signUp-image-link"
                            >
                                I am already member
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default UserRegister;
