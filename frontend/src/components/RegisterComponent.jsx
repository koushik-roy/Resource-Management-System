import React from "react";
import { useState } from "react";
import logo from "../images/Teksystem.png";
import { FaUser, FaLock } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { RegisterService } from "../services/UserRegisterService";
import "../App.css";

export default function Register() {


    const intialState = {
  
      username: "",
  
      password: "",
  
    };
  
  
  
    const [user, setUser] = useState(intialState);
  

  
  
  
    const onChangeHandleRegisterUser = (e) => {
  
      setUser({ ...user, ["username"]: e.target.value });
  
    };
  
    const onChangeHandleRegisterPassword = (e) => {
  
      setUser({ ...user, ["password"]: e.target.value });
  
    };
  
  
  
    
  
   
  const styles = {
    border: "1px solid rgba(240, 240, 240)",
    background: "rgba(255, 255, 255)",
    marginTop: "10%",
    marginRight: "100px",
  };
  const section = {
    background: "rgba(251, 251, 251)",
  };
  const eye = {
    marginLeft: "-0rem",
    background: "rgba(255, 255, 255)",
    outline: "none",
  };
  const h4={
    marginLeft:"12rem",
    
  }
  const Signup={
    marginLeft:"5%",
  };
  const [state, setstate] = useState(false);
  const toggleBtn = (e) => {
    e.preventDefault();
    setstate((prevState) => !prevState);
  };
  const [state1, setstate1]=useState(false)
  const toggleBtn1 = (e) => {
    e.preventDefault();
    setstate1((prevState1) => !prevState1);
  };
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode:'onChange'
});
// handle submit 
const onSubmit = data =>{
  
  RegisterService.submitUser(user);


} 


//    check password event 
const password = watch('password')

  return (
    <>
      <section className="d-flex justify-content-between" style={section}>
        <div className="left_data " style={{ width: "100%" }}>
          <div className="sign_img ">
            <img src={logo} style={{ maxWidth: "100%" }} alt="" />
          </div>
        </div>
        <div className="right_data mt-3 p-1 " style={{ width: "100%" }}>
            
          <form style={styles} onSubmit={handleSubmit(onSubmit)}>
            <h4 style={h4}>REGISTER</h4>
            
            <div className="form-outline mb-4">
              <h6 className="col-lg-3 mt-2 "> Username</h6>
              <icon className="BtnStyle"><FaUser /> </icon>
               
              <input
                type="username"
                className={`col-lg-10 rounded-lg ${ errors.username &&
                  "focus:border-red-500 focus:ring-red-500 border-red-500"} `}
              {...register("username", { required: 'username is required',
              
              minLength:{
                  value:4,
                  message:'Minimum Required length is 4'
              },
              maxLength: {
                  value: 20,
                  message: "Maximum Required length is 20",
                },
              })}
                placeholder="Enter your username"
               
                onInput={(e) => onChangeHandleRegisterUser(e)}
                
              />
              <br></br>
              {errors.username && <span className="text-sm text-red-500 text-danger">{errors.username.message}</span>}
            </div>

            <div className="form-outline mb-4 relative">
              <h6 className="col-lg-3 mt-6 ">Password</h6>
              <icon className="BtnStyle"><FaLock />{" "}</icon>
              
              <input
                

                type={state ? "text" : "password"}
               
                placeholder="Enter your password"
               
                
                className={`col-lg-10 rounded-lg ${ errors.password &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"} `}
                {...register("password", { required: 'password is required',
                
                minLength:{
                    value:8,
                    message:'Minimum Required length is 8'
                },
                maxLength: {
                    value: 20,
                    message: "Maximum Required length is 20",
                  },
                })}
                onInput={(e) => onChangeHandleRegisterPassword(e)}
             
              />
              
              
              
              <button className="BtnStyle" onClick={toggleBtn} style={eye}>
                {state ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}{" "}
              </button>
              <br></br>
              {errors.password && <span className="text-sm text-red-500 text-danger">{errors.password.message}</span>}
            </div>
            <div className="form-outline mb-4">
              <h6 className="col-lg-4 mt-6 ">Confirm Password</h6>
              <icon className="BtnStyle"><FaLock />{" "}</icon>
              
              <input
                

                type={state1 ? "text" : "password"}
              
                placeholder="Confirm your password"
               
                onPaste={(e)=>{
                    e.preventDefault()
                    return false;
                  }}
                  onInput={(e) => onChangeHandleRegisterPassword(e)}
                  className={`col-lg-10 rounded-lg ${ errors.confirmPassword &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500 "} `}
                {...register("confirmPassword", { required : 'confirm password is required',
                validate: (value) =>
                value === password || "The passwords do not match",
             })}
             
              />
              
              <button className="BtnStyle" onClick={toggleBtn1} style={eye}>
                {state1 ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}{" "}
              </button>
              <br></br>

              {errors.confirmPassword && <span className="text-sm text-red-500 text-danger">{errors.confirmPassword.message}</span>}
            </div>

            <br></br>
            
            <div className="flex items-center justify-center mt-12">
                    <input
                    type='submit'
                    value='Sign Up'
                    className="btn btn-primary btn-block col-lg-10"
                    style={Signup}
                   
                    />
                      
                </div>

            <div className="text-center">
              <p>
                Already have an account? <Link to="/">Sign in</Link>
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
