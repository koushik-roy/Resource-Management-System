import React from "react";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import DropdownCustomer from "./DropdownCustomer";
import { useState } from "react";
import DropdownBusiness from "./DropdownBusiness";
import DropdownProjectStatus from "./DropdownProjectStatus";
import DropdownSkills from "../skills/DropdownSkills";
import { projectService } from "../../services/ProjectService";
import AddDeleteSkillRows from "../skills/AddDeleteSkillRows";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Project() {
  //declaring initial object for state
  const initialProjectState = {
    projectId: "",
    project_name: "",
    project_description: "",
    customer_id: "",
    business_unit_id: "",
    status: "",
    start_date: "",
    end_date: "",
    projectSkillList: [],
  };

  //declaring object for projectSkillList array
  const initialSkillState = {
    project_id: "",
    skill: "",
    required_number: "",
  };

  //declaring the state
  const [project, setProject] = useState(initialProjectState);
  const [projectSkill, setProjectSkill] = useState([]);

  //on Change function for the respective entities
  const onChangeHandleCustomer = (e) => {
    setProject({ ...project, ["customer_id"]: e.target.value });
  };
  const onChangeHandleBusiness = (e) => {
    setProject({ ...project, ["business_unit_id"]: e.target.value });
  };
  const onChangeHandleProjectId = (e) => {
    setProject({ ...project, ["projectId"]: e.target.value });
  };
  const onChangeHandleProjectName = (e) => {
    setProject({ ...project, ["project_name"]: e.target.value });
  };
  const onChangeHandleProjectStatus = (e) => {
    setProject({ ...project, ["status"]: e.target.value });
  };
  const onChangeHandleProjectDescription = (e) => {
    setProject({ ...project, ["project_description"]: e.target.value });
  };
  const onChangeHandleStartDate = (e) => {
    setProject({ ...project, ["start_date"]: e.target.value });
  };
  const onChangeHandleEndDate = (e) => {
    setProject({ ...project, ["end_date"]: e.target.value });
  };

  const onChangeHandleSkills = (e) => {
    setProjectSkill({
      ...projectSkill,
      ["skill_set"]: e.target.value,
      ["projectId"]: project.projectId,
    });
  };
  const onChangeHandleRequiredNumber = (e) => {
    setProjectSkill({
      ...projectSkill,
      ["required_number"]: e.target.value,
    });
  };

  //code related to adding/deleting rows in the skill entry

  const [rows, setRows] = useState([{}]);
  const columnsArray = ["projectId", "skill ", "required_number "];

  const [active, setActive] = useState(true);
  //adding a new row
  const addTableRows = (e) => {
    const item = [];
    setRows([...rows, item]);
    e.preventDefault();
    if (projectSkill != 0) {
      project.projectSkillList.push(projectSkill);
    }
    setActive(false);
  };

  const deleteTableRows = (idx) => {
    //delete an entry at specified index in parent's projectSkillList state variable
    const tempRows = [...rows];
    tempRows.splice(idx, 1);
    setRows(tempRows);
    project.projectSkillList.pop(projectSkill);
    idx.preventDefault();
  };
  function validateFormProjectID() {
    var x = document.forms["myForm"]["pid"].value;
    if (x === "") {
      alert("Project ID must be filled out");
      return false;
    }
  }
  function validateFormProjectName() {
    var x = document.forms["myForm"]["pname"].value;
    if (x === "") {
      alert("Project Name must be filled out");
      return false;
    }
  }
  function pushSkills(e) {
    let arr = [];
    project.projectSkillList.push(projectSkill);
    arr = project.projectSkillList;
    console.log(arr);
    const duplicates = new Set(arr.map((i) => i.skill));
    // if (arr.length > duplicates.size) {
    //   alert("multiple entities of the same entity");
    //   //e.preventDefault();
    // }
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function validateForm() {
    validateFormProjectID();
    validateFormProjectName();
  }
  const onSubmit = (e) => {
    pushSkills(e);
    console.log(project);
    projectService.submitProject(project);
  };

  const datetoday = project.start_date;
  const a = datetoday.toString().slice(0, 10);

  const endDate = project.end_date;
  const b = endDate.toString().slice(0, 10);
  return (
    <>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        Create Project
      </h4>
      <div
        className="container"
        style={{ border: "1px solid #ced4da", borderRadius: "5px",background: "rgb(241 241 241)", }}
      >
        <form name="myForm" className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row" style={{ marginTop: "1px" }}>
            <div className="col-md-6">
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="projectId">Project ID(*)</label>
                    <TextField
                      name="pid"
                      InputProps={{ disableUnderline: true }}
                      style={{ border: "1px solid #ced4da" }}
                      onInput={(e) => onChangeHandleProjectId(e)}
                      className={`form-control ${
                        errors.id &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("id", {
                        required: "project id is required",
                      })}
                    />
                    {errors.id && (
                      <span className="text-sm text-red-500 text-danger">
                        {errors.id.message}
                      </span>
                    )}
                  </div>
                  <div className="col-8">
                    <label htmlFor="projectName">Project Name(*)</label>
                    <TextField
                      name="pname"
                      InputProps={{ disableUnderline: true }}
                      style={{ border: "1px solid #ced4da" }}
                      onInput={(e) => onChangeHandleProjectName(e)}
                      className={`form-control ${
                        errors.name &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("name", {
                        required: "project name is required",
                      })}
                    />
                    {errors.name && (
                      <span className="text-sm text-red-500 text-danger">
                        {errors.name.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="project_description">
                  Project Description:
                </label>
                <textarea
                  type="text"
                  name="description"
                  onInput={(e) => onChangeHandleProjectDescription(e)}
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
              <div className="form-group">
                <label>Customer</label>
                <DropdownCustomer
                  type="text"
                  customerFunction={onChangeHandleCustomer}
                  required
                />
              </div>
              <label>Business Unit</label>
              <DropdownBusiness
                type="text"
                businessFunction={onChangeHandleBusiness}
                required
              />
            </div>

            <div className="col-md-6 col-md-offset-2">
              {/* <div className="form"> */}
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <label htmlFor="">Start Date(*)</label>
                    <div>
                      <input
                        style={{
                          float: "left",
                          border: "1px solid #ced4da",
                          borderRadius: "5px",
                        }}
                        defaultValue={a}
                        type="date"
                        onChange={(e) => onChangeHandleStartDate(e)}
                      />
                    </div>
                  </div>
                  <div className="col">
                    <label htmlFor=""> End Date(*)</label>
                    <div>
                      <input
                        style={{
                          float: "left",
                          border: "1px solid #ced4da",
                          borderRadius: "5px",
                        }}
                        type="date"
                        defaultValue={b}
                        min={
                          project.start_date
                            ? new Date(project.start_date)
                                .toISOString()
                                .split("T")[0]
                            : ""
                        }
                        onChange={(e) => onChangeHandleEndDate(e)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Project Status</label>
                <DropdownProjectStatus
                  type="text"
                  projectStatusFunction={onChangeHandleProjectStatus}
                />
              </div>
              <div className="form-group">
                <label>Skills Required</label>
                <table>
                  <tbody>
                    {rows.map((index) => (
                      <tr key={index}>
                        {/* <td>{idx + 1}</td> */}
                        <td style={{ width: "45%" }}>
                          <DropdownSkills
                            type="text"
                            skillFunction={onChangeHandleSkills}
                            //skillsFunction={onChangeHandleSkills}
                          />
                        </td>
                        <td>
                          <input
                            style={{
                              width: "100%",
                              borderRadius: "3px",
                              height: "38px",
                              border: "1px solid #ced4da",
                            }}
                            type="text"
                            name="allocation"
                            onChange={onChangeHandleRequiredNumber}
                            InputProps={{ disableUnderline: true }}
                          />
                        </td>
                        <td style={{ width: "20%" }}>
                          <button
                            className="btn btn-primary"
                            onClick={addTableRows}
                          >
                            +
                          </button>
                          <button
                            disabled={active}
                            className="btn btn-secondary"
                            onClick={(idx) => deleteTableRows(idx)}
                          >
                            -
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div
            className="form-group-button"
            style={{
              width: "310px",
              marginTop: "20px",
              marginLeft: "430px",
              marginBottom: "20px",
            }}
          >
            <button className="btn btn-primary" type="submit" value="Submit">
              Submit
            </button>
            <Link className="btn btn-secondary" to="/dashboard">
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Project;
