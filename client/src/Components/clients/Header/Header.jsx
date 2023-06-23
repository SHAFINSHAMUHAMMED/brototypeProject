import React,{useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import {NavLink, useLocation, useNavigate } from "react-router-dom";
import { ClientLogout } from "../../../Redux/ClientAuth";
import userAxios from "../../../Axios/userAxios";


function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    // const [activeLink, setActiveLink] = useState(location.pathname);
    const [name, setName] = useState('')
    const token = useSelector((state) => state.Client.Token);
    const logout = () => {
        dispatch(ClientLogout());
        navigate("/login");
    };
    useEffect(() => {
        if (token) {
            userAxios.get("/getDetails", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }).then((res) => {
                    setName(res.data.name);
                });
        }else {
            console.log("no token");
        }
    }, [token]);

    const navlinkstyle=({isActive})=>{
        return {

          color: isActive? '#E89FF1' : "white"
        }
      }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand pe-5 ms-3">
                    <b>
                        <i>FullStack</i>
                    </b>
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <NavLink style={navlinkstyle}
                to="/"
                className='nav-link'
               
                aria-current="page"
              >
                <b>Home</b>
              </NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink style={navlinkstyle}
                to="/user_profile"
                className='nav-link'
              >
                <b>Profile</b>
              </NavLink>
                        </li>
                    </ul>
                    {/* {token ? (
                        <h6
                            className="text-white me-4"
                            onClick={() => {
                                navigate("/user_profile");
                            }}
                        >
                            {name}
                        </h6>
                    ) : null} */}
                    {token ? (
                        <h6 className="text-white me-4" onClick={logout}>
                            Logout
                        </h6>
                    ) : (
                        <h6 className="text-white me-4" onClick={logout}>
                            Login
                        </h6>
                    )}
                    {/* <h6 className="text-white me-4" onClick={logout}>
                        Logout
                    </h6> */}
                </div>
            </div>
        </nav>
    );
}

export default Header;
