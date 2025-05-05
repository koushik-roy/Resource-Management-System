import React from "react";
import { useState } from "react";
import { roleService } from "../../services/RoleService";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import Footer from "../Footer";
import Header from "../Header";
import "../../App.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

function AddRole() {
  const initialState = {
    code: "",
    decsription: "",
  };

  const [role, setRole] = useState(initialState);

  const onChangeCode = (e) => {
    setRole({
      ...role,
      ["code"]: e.target.value,
    });
  };
  const onChangeDecsription = (e) => {
    setRole({
      ...role,
      ["decsription"]: e.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    roleService.submitRole(role);
  };
  return (
    <>
      <Header />
      <div className="col-md-12">
        <div className="group" style={{ margin: "1% auto" }}>
          <div
            className="rounded-lg"
            style={{
              border: "1px solid #ced4da",
              textAlign: "center",
              height: "450px",
              background: "rgb(241 241 241)",
              marginTop: "50px",
              width: "620px",
              marginLeft: "-53px",
            }}
          >
            <div className="heading" style={{ marginTop: "33px" }}>
              <h1 className="text">Create Resource Role</h1>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label
                  htmlFor="code"
                  style={{ marginLeft: "-32rem", marginTop: "12px" }}
                >
                  Role Code
                </label>
                <br></br>
                <input
                  name="code"
                  type="text"
                  className={`form-control ${
                    errors.code &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("code", {
                    required: "code is required",

                    minLength: {
                      value: 2,
                      message: "Minimum Required length is 2",
                    },
                    maxLength: {
                      value: 4,
                      message: "Maximum Required length is 4",
                    },
                  })}
                  style={{
                    border: "1px solid #ced4da",
                    width: "552px",
                    marginLeft: "14px",
                  }}
                  onInput={(e) => onChangeCode(e)}
                />

                {errors.code && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.code.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="decsription"
                  style={{ marginLeft: "-29rem", marginTop: "17px" }}
                >
                  Role Description
                </label>

                <textarea
                  type="text"
                  style={{ width: "553px", marginLeft: "15px" }}
                  className={`form-control ${
                    errors.description &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("description", {
                    required: "description is required",
                  })}
                  onInput={(e) => onChangeDecsription(e)}
                />
                {errors.description && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="form-group-button" style={{ marginTop: "38px" }}>
                <button
                  type="submit"
                  value="Submit"
                  className="btn btn-primary"
                  style={{ marginLeft: "30px" }}
                >
                  <span>Submit</span>
                </button>
                <Link className="btn btn-secondary" to="/viewRoles">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AddRole;
