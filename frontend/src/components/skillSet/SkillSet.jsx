import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import { SkillSetService } from "../../services/SkillSetService";
import Footer from "../Footer";
import Header from "../Header";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Skillset = () => {
  const intialState = {
    id: "",
    code: "",
    description: "",
  };
  const [skill, setSkill] = useState(intialState);

  const onChangeHandlecode = (e) => {
    setSkill({ ...skill, ["code"]: e.target.value });
  };
  const onChangeHandledesc = (e) => {
    setSkill({ ...skill, ["description"]: e.target.value });
  };
  function validateForm() {
    var x = document.forms["myForm"]["code"].value;
    if (x == "") {
      alert("code must be filled out");
      return false;
    }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    SkillSetService.submitSkill(skill);
  };

  return (
    <>
      <Header />
      <div className="col-mid-12">
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
              <h1 className="text">Create Skill Set</h1>
            </div>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label
                  htmlFor="Skill Code"
                  style={{ marginLeft: "-32rem", marginTop: "12px" }}
                >
                  Skill Code
                </label>
                <br></br>
                <input
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
                      value: 15,
                      message: "Maximum Required length is 15",
                    },
                  })}
                  name="code"
                 
                  style={{
                    border: "1px solid #ced4da",
                    width: "552px",
                    marginLeft: "14px",
                  }}
                  onInput={(e) => onChangeHandlecode(e)}
                />
                
                {errors.code && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.code.message}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label
                  htmlFor="Skill description"
                  style={{ marginLeft: "-29rem", marginTop: "17px" }}
                >
                  Skill Description
                </label>
                <textarea
                  type="text"
                  style={{ width: "553px", marginLeft: "15px" }}
                  name="description"
                  className={`form-control ${
                    errors.description &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("description", {
                    required: "description is required",
                  })}
                  onInput={(e) => onChangeHandledesc(e)}
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
                  {" "}
                  Submit
                </button>

                <Link className="btn btn-secondary" to="/viewSkills">
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
};

export default Skillset;
