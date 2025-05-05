import React from "react";
import "../../App.css";
import { useState } from "react";
import { ResourceService } from "../../services/ResourceService";
import DropdownRoleId from "./DropdownRoleId";
import DropdownBusinessunitId from "./DropdownBusinessunitId";
import Footer from "../Footer";
import Header from "../Header";
import DropdownSkill from "./DropdownSkill";
import DropdownProjectId from "../viewResource/DropdownProjectId";
import { useForm } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AddResource() {
  const initialResourceState = {
    first_name: "",
    last_name: "",
    employee_id: "",
    mail_id: "",
    peoplesoft_id: "",
    role_id: "",
    business_unit_id: "",
    employee_projects: [],
    employee_skills: [],
  };

  const [resource, setResource] = useState(initialResourceState);
  const [employeeProject, setEmployeeProject] = useState([]);
  const [allocationDisplay, setallocationDisplay] = useState(0);
  const [allocationSum, setallocationSum] = useState(0);
  const [rows, setRows] = useState([{}]);
  const columnsArray = ["employee_id ", "Project Name ", "Allocation % "];

  const [active, setActive] = useState(false);

  const addTableRows = (e) => {
    e.preventDefault();
    const item = {};
    if (employeeProject != 0) {
      let newSum =
        parseInt(allocationSum) +
        parseInt(employeeProject.allocation_percentage);
      console.log(newSum);

      setallocationSum(newSum);
      resource.employee_projects.pop(item);
      resource.employee_projects.push(employeeProject);

      setEmployeeProject("");
    }

    const addData = resource.employee_projects;

    addData.push(item);

    setResource({ ...resource, employee_projects: addData });
  };

  const deleteTableRows = (e, idx) => {
    console.log(idx);

    e.preventDefault();
    let updatedProjects = resource.employee_projects;
    if (idx) {
      if (idx.project_id) {
        const filteredProject = resource.employee_projects.filter(
          (i) => i.project_id !== idx.project_id
        );
        let arr = 0;
        filteredProject.map((fp) => {
          arr += parseInt(fp.allocation_percentage);
        });
        setallocationDisplay(arr);
        setResource({ ...resource, employee_projects: filteredProject });
        updatedProjects = filteredProject;
      } else {
        console.log("else");
        const deleteEmpty = resource.employee_projects;
        deleteEmpty.pop();
        console.log(deleteEmpty);
        setResource({ ...resource, employee_projects: deleteEmpty });
        updatedProjects = deleteEmpty;
      }
    }
  };

  const onValueChange = (data) => {
    console.log(data);
    let values = [];
    data.forEach((element) => {
      const employeeSkillsState = {
        employee_id: resource.employee_id,
        skill_id: element.value,
      };
      values.push(employeeSkillsState);
    });
    setResource({ ...resource, employee_skills: values });
  };

  const onChangeHandleFirstName = (e) => {
    setResource({ ...resource, ["first_name"]: e.target.value });
  };
  const onChangeHandleLastName = (e) => {
    setResource({ ...resource, ["last_name"]: e.target.value });
  };
  const onChangeHandleEmployeeId = (e) => {
    setResource({ ...resource, ["employee_id"]: e.target.value });
  };
  const onChangeHandleMailId = (e) => {
    setResource({ ...resource, ["mail_id"]: e.target.value });
  };
  const onChangeHandlePeoplesoftId = (e) => {
    setResource({ ...resource, ["peoplesoft_id"]: e.target.value });
  };
  const onChangeHandleRoleId = (e) => {
    setResource({ ...resource, ["role_id"]: e.target.value });
  };
  const onChangeHandleBusinessunitId = (e) => {
    setResource({ ...resource, ["business_unit_id"]: e.target.value });
  };

  const onChangeHandleProjectId = (e) => {
    setEmployeeProject({
      ...employeeProject,
      ["project_id"]: e.target.value,
      ["employee_id"]: resource.employee_id,
    });
    console.log(employeeProject);
  };

  const onChangeHandleAllocationPercentage = (e) => {
    setEmployeeProject({
      ...employeeProject,
      ["allocation_percentage"]: e.target.value,
    });
    let sumOfAllocation = parseInt(allocationSum);
    sumOfAllocation += parseInt(e.target.value);

    setallocationDisplay(sumOfAllocation);
    if (sumOfAllocation > 100) {
      alert("Alloation can't be greater than 100%");
    }
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (e) => {
    console.log(resource);
    if (allocationDisplay > 100) {
      Swal.fire({
        title: "Failed",
        text: "Allocation % is greater than 100%",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      if (employeeProject != 0) {
        resource.employee_projects.pop();
        resource.employee_projects.push(employeeProject);
      }

      ResourceService.submitResource(resource);
    }
  };
  console.log(resource);
  return (
    <>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        Create Resource
      </h4>
      <div
        className="container"
        style={{
          border: "1px solid #ced4da",
          background: "rgb(241 241 241)",
          height: "512px",
        }}
      >
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="row" style={{ marginTop: "1px" }}>
            <div className="col">
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      className={`form-control ${
                        errors.first_name &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("first_name", {
                        required: "first name is required",

                        minLength: {
                          value: 3,
                          message: "Minimum Required length is 3",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum Required length is 20",
                        },
                      })}
                      onChange={(e) => onChangeHandleFirstName(e)}
                    />
                    {errors.first_name && (
                      <span className="text-sm text-red-500 text-danger">
                        {errors.first_name.message}
                      </span>
                    )}
                  </div>
                  <div className="col-6">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      className={`form-control ${
                        errors.last_name &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("last_name", {
                        required: "last name is required",

                        minLength: {
                          value: 3,
                          message: "Minimum Required length is 3",
                        },
                        maxLength: {
                          value: 20,
                          message: "Maximum Required length is 20",
                        },
                      })}
                      onChange={(e) => onChangeHandleLastName(e)}
                    />
                    {errors.last_name && (
                      <span className="text-sm text-red-500 text-danger">
                        {errors.last_name.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="employee_id">Employee Id</label>
                    <input
                      name="eid"
                      type="text"
                      className={`form-control ${
                        errors.employee_id &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("employee_id", {
                        required: "employee id is required",
                      })}
                      onChange={(e) => onChangeHandleEmployeeId(e)}
                    />
                    {errors.employee_id && (
                      <span className="text-sm text-red-500 text-danger">
                        {errors.employee_id.message}
                      </span>
                    )}
                  </div>
                  <div className="col-6">
                    <label htmlFor="mail_id">Email Id</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.mail_id &&
                        "focus:border-red-500 focus:ring-red-500 border-red-500"
                      } `}
                      {...register("mail_id", {
                        required: "email id is required",

                        pattern: {
                          value:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "enter valid email",
                        },
                      })}
                      onChange={(e) => onChangeHandleMailId(e)}
                    />
                    {errors.mail_id && (
                      <span className="text-sm text-red-500 text-danger">
                        {errors.mail_id.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="peoplesoft_id">Peoplesoft Id</label>
                <input
                  name="pid"
                  type="text"
                  className={`form-control ${
                    errors.peoplesoft_id &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("peoplesoft_id", {
                    required: "peoplesoft id is required",
                  })}
                  onChange={(e) => onChangeHandlePeoplesoftId(e)}
                />
                {errors.peoplesoft_id && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.peoplesoft_id.message}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label>Role</label>
                <DropdownRoleId
                  type="text"
                  required
                  roleFunction={onChangeHandleRoleId}
                />
              </div>
              <div className="form-group">
                <label>Business Unit </label>
                <DropdownBusinessunitId
                  type="text"
                  required
                  businessFunction={onChangeHandleBusinessunitId}
                />
              </div>
            </div>
            <div className="col">
              <div className="form-group">
                <div className="dropdown" style={{ "margin-right": "-2px" }}>
                  <label style={{ marginTop: "24px" }}>Skill Set</label>
                  <DropdownSkill
                    type="text"
                    required
                    onValueChange={onValueChange}
                  />
                </div>
              </div>
              <br />
              <br />
              <div className="form-group">
                <div className="container">
                  <div className="row-clearfix">
                    <div className="col-md-12" style={{ marginTop: "-49px" }}>
                      <table>
                        <thead>
                          <tr>
                            {columnsArray.slice(1).map((column, index) => (
                              <th style={{ textAlign: "initial" }} key={index}>
                                {column}
                              </th>
                            ))}
                            <th>Allocated:{allocationDisplay}%</th>
                          </tr>
                        </thead>
                        <tbody>
                          {resource.employee_projects.length == 0 && (
                            <tr>
                              <td>
                                <DropdownProjectId
                                  type="text"
                                  required
                                  projectFunction={onChangeHandleProjectId}
                                />
                              </td>
                              <td>
                                <input
                                  style={{
                                    width: "100%",
                                    marginLeft: "-10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "3px",
                                    height: "38px",
                                  }}
                                  InputProps={{ disableUnderline: true }}
                                  name="allocation"
                                  type="number"
                                  onChange={onChangeHandleAllocationPercentage}
                                />

                                {errors.allocation && (
                                  <span className="text-sm text-red-500 text-danger">
                                    {errors.allocation.message}
                                  </span>
                                )}
                              </td>
                              <td style={{ width: "20%" }}>
                                <button
                                  className="btn btn-primary"
                                  onClick={(e) => addTableRows(e)}
                                >
                                  +
                                </button>
                                <button
                                  disabled={active}
                                  className="btn btn-secondary"
                                  onClick={(e) => deleteTableRows(e)}
                                >
                                  -
                                </button>
                              </td>
                            </tr>
                          )}
                          {resource.employee_projects.map((item) => (
                            <tr>
                              <td>
                                <DropdownProjectId
                                  type="text"
                                  required
                                  allprojects={item}
                                  projectFunction={onChangeHandleProjectId}
                                />
                              </td>
                              <td>
                                <input
                                  style={{
                                    width: "100%",
                                    marginLeft: "-10px",
                                    border: "1px solid #ced4da",
                                    borderRadius: "3px",
                                    height: "38px",
                                  }}
                                  InputProps={{ disableUnderline: true }}
                                  name="allocation"
                                  type="number"
                                  value={item.allocation_percentage}
                                  onChange={onChangeHandleAllocationPercentage}
                                />

                                {errors.allocation && (
                                  <span className="text-sm text-red-500 text-danger">
                                    {errors.allocation.message}
                                  </span>
                                )}
                              </td>
                              <td style={{ width: "20%" }}>
                                <button
                                  className="btn btn-primary"
                                  onClick={(e) => addTableRows(e)}
                                >
                                  +
                                </button>
                                <button
                                  disabled={active}
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
              </div>
            </div>
          </div>
          <div
            className="form-group-button"
            style={{
              width: "310px",

              marginLeft: "430px",
            }}
          >
            <button className="btn btn-primary" type="submit" value="Submit">
              <span> Submit</span>
            </button>
            <Link className="btn btn-secondary" to="/viewResources">
              <span>Cancel</span>
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default AddResource;
