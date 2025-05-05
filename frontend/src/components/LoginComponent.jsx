import React from "react";
import { useState ,useEffect} from "react";

import { FaUser, FaLock } from "react-icons/fa";
import logo from "../images/Teksystem.png";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { LoginService } from "../services/UserLoginService";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import "../App.css";

export default function Login() {

  const intialState = {
  
    username: "",

    password: "",

  };



  const [user, setUser] = useState(intialState);





  const onChangeHandleLoginUser = (e) => {

    setUser({ ...user, ["username"]: e.target.value });

  };

  const onChangeHandleLoginPassword = (e) => {

    setUser({ ...user, ["password"]: e.target.value });

  };
  
  const styles = {
    border: "1px solid rgba(240, 240, 240)",
    background: "rgba(255, 255, 255)",
    marginTop: "15%",
    marginRight: "120px",
  };
  const section = {
    background: "rgba(251, 251, 251)",
  };
  const Signin={
    marginLeft:"6%",
  };
  const eye = {
    marginLeft: "-0rem",
    background: "rgba(255, 255, 255)",
    outline: "none",
  };
  const h4={
    marginLeft:"12rem",
    
  }
  
  
  const [state, setstate] = useState(false);
  const toggleBtn = (e) => {
    e.preventDefault();
    setstate((prevState) => !prevState);
  };
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode:'onChange'
});
const onSubmit = data =>{
  
 

    console.log(user);

    LoginService.submitUser(user);


}
let history = useHistory();
    useEffect(()=>{
        let login=localStorage.getItem('login');
       
        
        if(login){
            history.push("/dashboard");
        }
    });

  return (
    <>
      <section className="d-flex justify-content-between" style={section}>
        <div className="right_data " style={{ width: "100%" }}>
          <div className="sign_img ">
            <img src={logo} style={{ maxWidth: "100%" }} alt="" />
          </div>
        </div>
        <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
          <form style={styles} onSubmit={handleSubmit(onSubmit)} >
          <h4 style={h4}>LOGIN</h4>
            <div className="form-outline mb-4">
              <h6 className="col-lg-2 mt-2 "> Username</h6>
              <button className="BtnStyle" >
                <FaUser />
              </button>
              <input
                type="username"
                className={`col-lg-10 rounded-lg ${ errors.username &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"} `}
              {...register("username", { required: 'username is required',
              })}
                
                
                placeholder="Enter your username"
                onInput={(e) => onChangeHandleLoginUser(e)}
                
              />
               <br></br>
              {errors.username && <span className="text-sm text-red-500 text-danger">{errors.username.message}</span>}
            </div>

            <div className="form-outline mb-4">
              <h6 className="col-lg-2 mt-6 ">Password</h6>
              <button className="BtnStyle">
                <FaLock />
              </button>
              <input
                type={state ? "text" : "password"}
                className={`col-lg-10 rounded-lg ${ errors.password &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"} `}
              {...register("password", { required: 'password is required',
              })}
                placeholder="Enter your password"
                onInput={(e) => onChangeHandleLoginPassword(e)}
              />
              <button className="BtnStyle" onClick={toggleBtn} style={eye}>
                {state ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}{" "}
              </button>
              <br></br>
              {errors.password && <span className="text-sm text-red-500 text-danger">{errors.password.message}</span>}
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" />
                  <label className="form-check-label"> Remember me </label>
                </div>
              </div>

              <div className="col">
                <Link to="/forgotPassword">Forgot password?</Link>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block col-lg-10"
              
              
              
              style={Signin}
            >
              Sign in
            </button>

            <div className="text-center">
              <p>
                Don't have an account? <Link to="/register">Sign Up</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
