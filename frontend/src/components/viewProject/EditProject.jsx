import React from "react";
import "../../App.css";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import DropdownBusiness from "../project/DropdownBusiness";
import DropdownCustomer from "../project/DropdownCustomer";
import DropdownProjectStatus from "../project/DropdownProjectStatus";
import DropdownSkills from "./DropdownSkills";
import { projectService } from "../../services/ProjectService";
import AddDeleteSkillRows from "../skills/AddDeleteSkillRows";
import Header from "../Header";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditProject = () => {
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
  // const [Project, setViewProject] = useState([]);
  const params = useParams();
  const [skillTemp, setSkillTemp] = useState([]);
  const [deleteTemp, setDeleteTemp] = useState([]);
  const [deletingSkills, setDeletingSkills] = useState([]);

  const getData = async () => {
    await Axios.get(`http://localhost:9191/project/${params.id}`)
      .then((res) => {
        // console.log(res.data);
        setProject(res.data);
        setSkillTemp(res.data.projectSkillList);
        // setDeleteTemp(res.data)
        for (let i = 0; i < res.data.projectSkillList.length - 1; i++) {
          // console.log(i);
          const item = {};
          arr.push(item);
          // console.log(arr);
        }
        setRows([...rows, arr]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProjectData = async () => {
    await Axios.get(`http://localhost:9191/project/${params.id}`)
      .then((res) => {
        setDeleteTemp(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Displaying Date

  useEffect(() => {
    getData();
    getProjectData();
  }, []);

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
    // console.log(e.target.value);

    setProject({ ...project, ["start_date"]: e.target.value });
  };
  const onChangeHandleEndDate = (e) => {
    // if (new Date(a) > new Date(b) || new Date(a) < new Date(b)) {
    //   alert("date");
    // } else {
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

  const [rows, setRows] = useState([]);
  let arr = rows;
  const columnsArray = ["project_id", "skill ", "required_number "];

  const [active, setActive] = useState(true);
  //adding a new row
  const addTableRows = (e) => {
    e.preventDefault();

    const item = {};
    if (projectSkill != 0) {
      project.projectSkillList.pop(item);
      project.projectSkillList.push(projectSkill);
      setProjectSkill("");
    }
    const addData = project.projectSkillList;
    addData.push(item);
    setProject({ ...project, projectSkillList: addData });
  };
  console.log(rows);
  const deleteTableRows = (e, idx) => {
    console.log(idx);
    //setDeletingSkills(idx);
    deletingSkills.push(idx);
    console.log(project.projectSkillList);
    //delete an entry at specified index in parent's projectSkillList state variable
    e.preventDefault();
    let updatesProjectSkills = project.projectSkillList;
    if (idx.skill_set) {
      const filteredProjectSkills = project.projectSkillList.filter(
        (i) => i.skill_set !== idx.skill_set
      );
      console.log(filteredProjectSkills);
      setProject({ ...project, projectSkillList: filteredProjectSkills });
      updatesProjectSkills = filteredProjectSkills;
    } else {
      const deleteSkill = project.projectSkillList;
      deleteSkill.pop();
      setProject({ ...project, projectSkillList: deleteSkill });
      updatesProjectSkills = deleteSkill;
    }
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
    let arr = {};
    // project.projectSkillList.push(projectSkill);
    // console.log(projectSkill);
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

  console.log(deleteTemp);

  const onSubmit = (e) => {
    if (project.projectSkillList.length > deleteTemp.projectSkillList.length) {
      project.projectSkillList.pop();
    }
    if (projectSkill != 0) {
      project.projectSkillList.push(projectSkill);
    }
    console.log(deletingSkills);
    deletingSkills.map((s) => {
      projectService.submitDeleteProjectSkill(s);
    });
    projectService.submitEditProject(project);
  };

  // console.log(project);
  // console.log(skillTemp);
  let arr1 = skillTemp;
  let arr2 = [];
  arr1.map((e) => {
    arr2.push(e.required_number);
  });
  // console.log(arr2);

  // const date = new Date();
  // const futureDate = date.getDate() + 3;
  // date.setDate(futureDate);
  // const defaultValue = date.toLocaleDateString("en-CA");
  const datetoday = project.start_date;
  const a = datetoday.toString().slice(0, 10);
  // console.log(a);
  const endDate = project.end_date;
  const b = endDate.toString().slice(0, 10);

  // console.log(deletingSkills);
  console.log(project);

  // {
  //   rows.map((index, i) => {
  //     console.log(i);
  //   });
  // }

  return (
    <>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        Edit Project
      </h4>
      <div
        className="container"
        style={{ border: "1px solid #ced4da", borderRadius: "5px",background: "rgb(241 241 241)" }}
      >
        <div
          style={{ textAlign: "left", marginBottom: "-30px", fontSize: "150%" }}
        >
          <b>Edit Project</b>
        </div>
        <br />
        <form name="myForm" className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    <label htmlFor="projectId">Project ID(*)</label>
                    <input
                      name="pid"
                      value={project.projectId}
                      //InputProps={{ disableUnderline: true }}
                      style={{ border: "1px solid #ced4da" }}
                      // type="text"
                      onInput={(e) => onChangeHandleProjectId(e)}
                      className="form-control"
                      disabled={true}
                      // className={`form-control ${
                      //   errors.id &&
                      //   "focus:border-red-500 focus:ring-red-500 border-red-500"
                      // } `}
                      // {...register("id", {
                      //   required: "project id is required",
                      // })}
                    />
                    {errors.id && (
                      <span className="text-sm text-red-500 text-danger">
                        {errors.id.message}
                      </span>
                    )}
                  </div>
                  <div className="col-8">
                    <label htmlFor="projectName">Project Name(*)</label>
                    <input
                      name="pname"
                      type="text"
                      value={project.project_name}
                      // InputProps={{ disableUnderline: true }}
                      style={{ border: "1px solid #ced4da" }}
                      onInput={(e) => onChangeHandleProjectName(e)}
                      className="form-control"
                      // className={`form-control ${
                      //   errors.name &&
                      //   "focus:border-red-500 focus:ring-red-500 border-red-500"
                      // } `}
                      // {...register("name", {
                      //   required: "project name is required",
                      // })}
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
                  value={project.project_description}
                  onInput={(e) => onChangeHandleProjectDescription(e)}
                  className="form-control"
                  // className={`form-control ${
                  //   errors.description &&
                  //   "focus:border-red-500 focus:ring-red-500 border-red-500"
                  // } `}
                  // {...register("description", {
                  //   required: "description is required",
                  // })}
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
                  customerid={project.customer_id}
                  customerFunction={onChangeHandleCustomer}
                  project={project}
                  required
                />
              </div>
              <label>Business Unit</label>
              <DropdownBusiness
                type="text"
                businessid={project.business_unit_id}
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
                        // type="Datetime-local"
                        // placeholder="ad"
                        type="date"
                        onChange={(e) => onChangeHandleStartDate(e)}
                      />
                      {/* <input value={project.start_date} /> */}
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
                        // minDate={a}
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
                  projectStatus={project.status}
                  projectStatusFunction={onChangeHandleProjectStatus}
                />
              </div>
              <div className="form-group">
                <label>Skills Required</label>
                <table>
                  <tbody>
                    {project.projectSkillList.map((item) => (
                      <tr>
                        {/* <td>{idx + 1}</td> */}
                        <td style={{ width: "45%" }}>
                          <DropdownSkills
                            type="text"
                            allSkills={item}
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
                            value={item.required_number}
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
                            // disabled={active}
                            className="btn btn-secondary"
                            onClick={(e, idx) => deleteTableRows(e, item)}
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
};

export default EditProject;
