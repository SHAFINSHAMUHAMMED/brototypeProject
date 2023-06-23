import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userAxios from "../../../Axios/userAxios";

function UserHome() {
  const [name, setName] = useState("");
  const token = useSelector((store) => store.Client.Token);

  useEffect(() => {
    if (token) {
      userAxios
        .get("/getDetails", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setName(res.data.name);
        });
    } else {
      console.log("no token");
    }
  }, [token]);

  return (
    <div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <img
          src="https://wallpapercave.com/wp/wp2827169.jpg"
          alt="...."
          style={{ width: "100%" }}
        />
        {name ? (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
            }}
          >
            <h1 style={{ margin: "0" }}>Welcome {name}</h1>
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              background: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
            }}
          >
            <h1 style={{ margin: "0" }}>Please Login</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;
