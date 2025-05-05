import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useForm } from "react-hook-form";
import { ResourceService } from "../../services/ResourceService";
import { useState, useEffect } from "react";
import DropdownRoleId from "../resource/DropdownRoleId";
import DropdownBusinessunitId from "../resource/DropdownBusinessunitId";
import DropdownSkill from "./DropdownSkill";
import DropdownProjectId from "./DropdownProjectId";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function EditResource() {
  const params = useParams();

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
  const columnsArray = ["employee_id ", "Project Name ", "Allocation % "];
  const [rows, setRows] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [skill, setSkill] = useState();

  const [skillDeleteData, setSkillDeleteData] = useState();
  const [projectDeleteData, setProjectDeleteData] = useState([]);
  const [projectData, setProjectData] = useState([]);

  const [active, setActive] = useState(false);
  const [allocationSum, setallocationSum] = useState();
  const [allocationDisplay, setallocationDisplay] = useState();

  let sum = 0;

  const getdata = async () => {
    await axios
      .get(`http://localhost:9191/Resource/${params.id}`)
      .then((res) => {
        setResource(res.data);

        setSkill(res.data.employee_skills);
        setAllocations(res.data.employee_projects);

        res.data.employee_projects.map((i) => {
          sum += parseInt(i.allocation_percentage);
        });
        sum = sum;
        setallocationSum(sum);
        setallocationDisplay(sum);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProjectData = async () => {
    await axios
      .get(`http://localhost:9191/Resource/${params.id}`)
      .then((res) => {
        setProjectData(res.data.employee_projects);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata();
    getProjectData();
  }, []);

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
    console.log(addData);

    addData.push(item);

    console.log(addData);
    setResource({ ...resource, employee_projects: addData });
  };

  const deleteTableRows = (e, idx) => {
    console.log(idx);
    projectDeleteData.push(idx);

    e.preventDefault();
    let updatedProjects = resource.employee_projects;
    if (idx) {
      if (idx.project_id) {
        const filteredProject = resource.employee_projects.filter(
          (i) => i.project_id !== idx.project_id
        );
        console.log(filteredProject);
        let arr = 0;
        filteredProject.map((fp) => {
          console.log(fp);
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

  const onChangeHandleProjectId = (e) => {
    setEmployeeProject({
      ...employeeProject,
      ["project_id"]: e.target.value,
      ["employee_id"]: resource.employee_id,
    });
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

  const onValueChange = (data) => {
    let skillDeleteArr = [];

    if (data.length < skill.length) {
      let result = skill.filter(
        (o1) => !data.some((o2) => o1.skill_id === o2.value)
      );
      console.log(result);
      result.map((r) => {
        skillDeleteArr.push(r);
      });
    }

    setSkillDeleteData(skillDeleteArr);

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

  const onSubmit = (e) => {
    if (allocationDisplay > 100) {
      Swal.fire({
        title: "Failed",
        text: "Allocation % is greater than 100%",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      if (resource.employee_projects.length > projectData.length) {
        resource.employee_projects.pop();
      }

      if (employeeProject.project_id && employeeProject != 0) {
        resource.employee_projects.push(employeeProject);
      }
      if (skillDeleteData) {
        skillDeleteData.map((s) => {
          ResourceService.submitDeleteData(s);
        });
      }

      if (projectDeleteData) {
        projectDeleteData.map((p) => {
          ResourceService.submitProjectDeleteData(p);
        });
      }
      resource.employee_projects.map((u) => {
        ResourceService.submitProjectUpdateData(u);
      });

      console.log(resource);
      ResourceService.submitEditResource(resource);
    }
  };
  let arr1 = allocations;
  let arr2 = [];
  arr1.map((e) => {
    arr2.push(e.allocation_percentage);
  });

  return (
    <>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        Edit Resource
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
                      value={resource.first_name}
                      className="form-control"
                      onChange={(e) => onChangeHandleFirstName(e)}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      value={resource.last_name}
                      className="form-control"
                      onChange={(e) => onChangeHandleLastName(e)}
                    />
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
                      value={resource.employee_id}
                      disabled
                      className="form-control"
                      onChange={(e) => onChangeHandleEmployeeId(e)}
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="mail_id">Email Id</label>
                    <input
                      type="text"
                      value={resource.mail_id}
                      className="form-control"
                      onChange={(e) => onChangeHandleMailId(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="peoplesoft_id">Peoplesoft Id</label>
                <input
                  name="pid"
                  type="text"
                  value={resource.peoplesoft_id}
                  disabled
                  className="form-control"
                  onChange={(e) => onChangeHandlePeoplesoftId(e)}
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <DropdownRoleId
                  type="text"
                  required
                  resource_id={resource.role_id}
                  roleFunction={onChangeHandleRoleId}
                />
              </div>
              <div className="form-group">
                <label>Business Unit </label>
                <DropdownBusinessunitId
                  type="text"
                  required
                  business_id={resource.business_unit_id}
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
                    skills={resource.employee_skills}
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
                                  onInput={onChangeHandleAllocationPercentage}
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
                                  defaultValue={item.allocation_percentage}
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

export default EditResource;
