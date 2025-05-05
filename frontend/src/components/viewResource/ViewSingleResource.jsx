import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logos from "../../images/dummyimg.png";
import Footer from "../Footer";
import Header from "../Header";
import { MdArrowBack } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function ViewSingleResource() {
  const [employee, setEmployee] = useState([]);
  const [role, setRole] = useState([]);
  const [project, setProject] = useState([]);
  const [businessUnit, setBusinessUnit] = useState([]);
  const [resource, setResource] = useState([]);
  const [allProjects, setAllProjects] = useState([]);

  const params = useParams();

  const divStyle = {
    marginLeft: "5rem",
    marginRight: "5rem",
  };
  const imgStyle = {
    width: "101px",
    marginLeft: "24px",
    borderRadius: "72%",
  };
  const cardStyle = {
    width: "100%",
    marginLeft: "30rem",
    marginTop:"33px"
  };

  const getdata = async () => {
    await axios
      .get(`http://localhost:9191/Resource/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setEmployee(res.data);
        const data = [res.data.employee_projects];
        console.log(data);
        setProject(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getResourceData = async () => {
    await axios
      .get("http://localhost:9191/Resource/resources")
      .then((res) => {
        setResource(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRoleData = async () => {
    await axios
      .get("http://localhost:9191/role/roles")
      .then((res) => {
        setRole(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBusinessUnitData = async () => {
    await axios
      .get("http://localhost:9191/businessUnit/businessUnits")
      .then((res) => {
        console.log(res.data);
        setBusinessUnit(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProtectsData = async () => {
    await axios
      .get("http://localhost:9191/project/projects")
      .then((res) => {
        console.log(res.data);
        setAllProjects(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata();
    getRoleData();
    getResourceData();
    getBusinessUnitData();
    getProtectsData();
  }, []);

  let arr = [];
  let arrpro = [];
  console.log(project);
  console.log(allProjects);
  // const filtered=allProject.filter((ap)=>{
  //   projects.filter(p)=>
  //     p.project_id==ap.project_id

  //     })

  let result = [];
  // allProjects.map(
  //   (o1) => project.map((o2) => {o1.project_id === o2.project_id)
  //     result.push(01)}

  // );
  allProjects.map((ap) => {
    project.map((p) => {
      console.log(ap);
      console.log(p);
      if (ap.projectId == p.project_id) {
        result.push(ap + p);
      }
    });
  });

  console.log(result);

  return (
    <>
      <Header />

      <div className="col-md-3 animated fadeIn"  key={employee.employee_id}>
        <div className="card" style={cardStyle}>
          <Link to={`/editresource/${employee.employee_id}`}>
            <FaEdit />
          </Link>

          <Link
            to="/viewResources"
            style={{ marginLeft: "271px", marginTop: "-25px" }}
          >
            <MdArrowBack />
          </Link>
          <div className="card-body" style={{ marginLeft: "8px" }}>
            <div className="avatar" style={{ marginLeft: "32px" }}>
              <img
                src={logos}
                className="card-img-top"
                alt="name "
                style={imgStyle}
              />
            </div>

            <h5 className="card-title">
              {employee.first_name + " " + employee.last_name}
            </h5>
            {role.map((rol) => (
              <p key={rol.id}>
                {rol.id == employee.role_id && (
                  <p className="card-text">
                    <label>
                      <b>Designation:</b>
                    </label>
                    <span>{rol.decsription}</span>
                  </p>
                )}
              </p>
            ))}
            {businessUnit.map((bu) => (
              <p key={bu.id}>
                {bu.id == employee.business_unit_id && (
                  <p className="card-text" style={{ marginTop: "-17px" }}>
                    <label>
                      <b>Sub Practice:</b>
                    </label>
                    <span>{bu.unit_description}</span>
                  </p>
                )}
              </p>
            ))}
            <p className="card-text" style={{ marginTop: "-17px" }}>
              <label>
                <b>Email:</b>
              </label>
              {employee.mail_id}
              <br />
              <label>
                <b>EmployeeId:</b>
              </label>
              <span className="phone">{employee.employee_id}</span>
              <br />
              <label>
                <b>PeoplesoftId:</b>
              </label>
              <span className="phone">{employee.peoplesoft_id}</span>
            </p>

            <label>
              <b>Projects:</b>
            </label>

            {result == 0 && <h6>No Projects Assigned</h6>}
            {/* {result.map((i) => (
              
              <p key={i.projectId}>
                {
                  <p className="card-text">
                    <span>{i.project_name}</span>
                  </p>
                }
              </p>
              
            ))} */}

            {allProjects.map((ap) => {
              return project.map((p) => {
                if (ap.projectId == p.project_id) {
                  return (
                    <p>
                      {
                        <p className="card-text">
                          <span>{ap.project_name} </span>
                          <span>:-{p.allocation_percentage}%</span>
                        </p>
                      }
                    </p>
                  );
                }
              });
            })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ViewSingleResource;
