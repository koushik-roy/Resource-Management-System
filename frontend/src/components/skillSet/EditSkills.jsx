import React from "react";
import { SkillSetService } from "../../services/SkillSetService";
import axios from "axios";
import { useEffect, useState } from "react";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import Footer from "../Footer";
import Header from "../Header";
import "../../App.css";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

function Skills() {
  const params = useParams();
  console.log(params);
  const initialState = {
    code: "",
    description: "",
  };

  const [skill, setSkill] = useState(initialState);
  const onChangeCode = (e) => {
    setSkill({
      ...skill,
      ["code"]: e.target.value,
    });
  };
  const onChangeDescription = (e) => {
    setSkill({
      ...skill,
      ["description"]: e.target.value,
    });
  };

  function validateForm() {
    var x = document.forms["myForm"]["code"].value;
    if (x === "") {
      alert("Code must be filled out");
      return false;
    }
  }

  const getdata = async () => {
    await axios
      .get(`http://localhost:9191/skill/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setSkill(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  //validations
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  //handle submit
  const onSubmit = (data) => {
    console.log(skill);
    SkillSetService.submitEditSkill(skill);
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
              <h1 className="text">Edit Skill Set</h1>
            </div>
            <form
              name="myForm"
              className="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="form-group">
                <label
                  htmlFor="code"
                  style={{ marginLeft: "-32rem", marginTop: "12px" }}
                >
                  Skill Code
                </label>
                <br></br>
                <input
                  name="code"
                  type="text"
                  value={skill.code}
                  
                  style={{
                    border: "1px solid #ced4da",
                    width: "552px",
                    marginLeft: "14px",
                  }}
                  onInput={(e) => onChangeCode(e)}
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
                />
               
                <br />
                {errors.code && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.code.message}
                  </span>
                )}
              </div>
              <div className="form-group" style={{ marginTop: "-19px" }}>
                <label
                  htmlFor="description"
                  style={{ marginLeft: "-29rem", marginTop: "17px" }}
                >
                  Skill Description
                </label>
                <textarea
                  type="text"
                  style={{ width: "553px", marginLeft: "15px" }}
                  value={skill.description}
                  onInput={(e) => onChangeDescription(e)}
                  className={`form-control ${
                    errors.description &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("description", {
                    required: "description is required",
                  })}
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
}

export default Skills;
