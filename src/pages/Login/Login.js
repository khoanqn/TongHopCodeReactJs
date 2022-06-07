import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    password: "",
    status: false,
  });
  console.log(userLogin);
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };
    let valid = true;
    for (let key in newUserLogin) {
      if (key !== "status") {
        if (newUserLogin[key].trim() === "") {
          valid = false;
        }
      }
    }
    if (!valid) {
      newUserLogin.status = true;
    } else {
      newUserLogin.status = false;
    }
    console.log(userLogin);
    setUserLogin(newUserLogin);
  };
  const handleLogin = (e) => {
    //chặn sự kiện load lại trang
    e.preventDefault();
    if (
      userLogin.userName === "cyberlearn" &&
      userLogin.password === "cyberlearn"
    ) {
      //Chuyển đến trang trước đó
      props.history.goBack();
      //Chuyễn đến trang chỉ định
      //props.history.push("/");
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Fail");
      return;
    }
  };
  return (
    <form className="container" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <label htmlFor="userName">Username</label>
        <input
          name="userName"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="text"
          className="form-control"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success">Login</button>
      </div>
      <Prompt
        when={userLogin.status}
        message={(location) => {
          return "Bạn có chắc muốn rời khỏi trang?";
        }}
      />
    </form>
  );
}
