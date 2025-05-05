import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Resource from "./Resource";
import Header from "../Header";
import Footer from "../Footer";
import { AiOutlineSearch } from "react-icons/ai";
import { TbFilter } from "react-icons/tb";
import { BiRefresh } from "react-icons/bi";
import Pagination from "./Pagination";

const Cards = () => {
  const [user, setUser] = useState([]);
  const [searchusers, setSearchusers] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [filterVal, setFilterVal] = useState([]);
  const [filterTable, setTableFilter] = useState(1);
  const [role, setRole] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [resourcerole, setResourcerole] = useState([]);
  const [temperory, setTemperory] = useState([]);
  const [temp, setTemp] = useState([]);
  const [temp1, setTemp1] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const imgStyle = {
    width: "101px",
    marginLeft: "24px",
    borderRadius: "72%",
  };
  const searchStyle = {
    marginLeft: "0rem",

    border: "1px solid rgba(240, 240, 240)",

    background: "rgba(240, 240, 240)",
    outlineWidth: "0",
    width: "147px",
    height: "29px",
  };
  const dropDownFilter = {
    marginLeft: "2px",
    border: "1px solid rgb(240, 240, 240)",
    background: "rgb(240, 240, 240)",
    outlineWidth: "0",
    width: "180px",
    height: "29px",
  };
  const dropDownProjectFilter = {
    marginLeft: "2px",
    border: "1px solid rgb(240, 240, 240)",
    background: "rgb(240, 240, 240)",
    outlineWidth: "0",
    width: "167px",
    height: "29px",
  };

  const icnStyle = {
    background: "rgb(0,0,255)",

    border: "1px solid rgba(240, 240, 240)",
    outlineWidth: "0",
    marginLeft: "-2px",
    height: "31px",
  };
  const projectIdStyle = {
    marginLeft: "50px",
  };
  const icnRefreshStyle = {
    border: "1px solid rgba(254, 254, 254)",
    outlineWidth: "0",
    marginLeft: "5px",
  };
  const subBtnStyle = {
    width: "87px",
    marginLeft: "63rem",
    marginTop: "-34px",
    height: "30px",
    textAlign: "center",
    lineHeight: "15px",
  };
  const OnBenchBtnStyle = {
    width: "87px",
    marginLeft: "70rem",
    marginTop: "-30px",
    height: "30px",
    textAlign: "center",
    lineHeight: "15px",
  };

  const postPerPageStyle = {
    marginLeft: "3px",
    width: "80px",
  };
  const getdata = async () => {
    await axios
      .get("http://localhost:9191/Resource/resources")
      .then((res) => {
        setUser(res.data);
        console.log(res.data);
        setSearchusers(res.data);
        setSearchApiData(res.data);
        setLoading(true);
        setTemperory(res.data);
        setTemp(res.data);
        setTemp1(res.data);
        setFilteredData(res.data);
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
        setResourcerole(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const initialState = {
    emp_id: "",

    r_id: "",

    p_id: "",
  };

  const [search, setSearch] = useState(initialState);
  const onChangeHandleEmployee = (e) => {
    setSearch({ ...search, ["emp_id"]: e.target.value });
  };
  const onChangeHandleRole = (e) => {
    setSearch({ ...search, ["r_id"]: e.target.value });
    console.log(e.target.value);
    if (e.target.value === "Roles") {
      setTemp1(user);
    }
    if (e.target.value !== "" && e.target.value !== "Roles") {
      const filterRole = user.filter(
        (item) => item.role_id?.toString() === e.target.value.toLowerCase()
      );
      setTemp1(filterRole);
    }
  };
  const onChangeHandleProject = (e) => {
    setSearch({ ...search, ["p_id"]: e.target.value });
  };

  let arr = [];

  temp1.map((user) => {
    user.employee_projects.map((emp_project) => {
      arr.push(emp_project.project_id);
    });
  });

  const uniqueProjectIds = Array.from(new Set(arr));

  let arrEmp = [];

  user.map((user) => {
    user.employee_projects.map((emp_project) => {
      arrEmp.push(emp_project.employee_id);
    });
  });
  const uniqueEmployeeIds = Array.from(new Set(arrEmp));

  console.log(uniqueEmployeeIds);

  useEffect(() => {
    getdata();
    getRoleData();
  }, []);

  const handleData = (e) => {
    console.log(search);
    const emp_id = search.emp_id;
    const r_id = search.r_id;
    const p_id = search.p_id;
    console.log(emp_id);
    console.log(r_id);
    console.log(p_id);

    let filterEmp = temp;
    let filterRoles = temp;

    if (emp_id == "") {
      setTemperory(filterEmp);
    }

    if (emp_id !== "") {
      setCurrentPage(1);

      filterEmp = user.filter(
        (item) => item.employee_id.toString().toLowerCase() == emp_id
      );

      setTemperory(filterEmp);
    }
    if (r_id === "Roles") {
      setTemperory(filterEmp);
    }
    if (r_id !== "" && r_id !== "Roles") {
      setCurrentPage(1);

      filterRoles = filterEmp.filter(
        (item) => item.role_id.toString().toLowerCase() == r_id
      );
      setTemperory(filterRoles);
    }
    if (p_id === "Projects") {
      setTemperory(filterRoles);
    }
    if (p_id !== "" && p_id !== "Projects") {
      setCurrentPage(1);

      const filterProject = [];
      filterRoles.filter((item) => {
        item.employee_projects.filter((projects) => {
          if (projects.project_id.toString() == p_id) filterProject.push(item);
        });
      });
      setTemperory(filterProject);
    }
  };
  const generateRoleOptions = () => {
    if (search.p_id == "" || search.p_id == "Projects") {
      return resourcerole.map((pro) => (
        <option key={pro.id} value={pro.id} id="id">
          {`${pro.code}`}
        </option>
      ));
    } else {
      const roles = [];
      user.filter((pro) => {
        pro.employee_projects.filter((projects) => {
          if (search.p_id == projects.project_id) {
            resourcerole.filter((cust) => {
              if (cust.id == pro.role_id) {
                roles.push(cust);
              }
            });
          }
        });
      });

      console.log(roles);

      return roles.map((bS) => {
        return (
          <option key={bS.id} value={bS.id} id="id">
            {bS.name}
          </option>
        );
      });
    }
  };
  const handleEmployeeData = (e) => {
    console.log(uniqueEmployeeIds);
    const Employees = [];
    var res = user.filter(function (o) {
      return uniqueEmployeeIds.indexOf(o.employee_id) == -1;
    });

    setTemperory(res);
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = temperory.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const back = (backPage) => {
    if (currentPage != 1) setCurrentPage(currentPage - 1);
  };
  const next = (nextPage) => {
    const totalPosts = temperory.length;
    if (currentPage != Math.ceil(totalPosts / postsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const onChangeHandlePostsPerPage = (e) => {
    
    if (e.target.value && e.target.value!=0) {
      setPostsPerPage(e.target.value);
    } else {
      setPostsPerPage(8);
    }
  };

  return (
    <>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        View Resources
      </h4>
      <br></br>

      <div>
        <label style={{ marginLeft: "90px" }}>
          <b>EmployeeId:</b>
        </label>
        <input
          className="rounded-lg"
          style={searchStyle}
          placeholder="Employee ID ... "
          onChange={(e) => onChangeHandleEmployee(e)}
        />
        <button style={icnStyle}>
          <AiOutlineSearch style={{ color: "white" }} />
        </button>
        <label style={{ marginLeft: "37px" }}>
          <b>Role:</b>
        </label>
        <select
          className="rounded-lg"
          onChange={onChangeHandleRole}
          style={dropDownFilter}
        >
          <option onChange={onChangeHandleRole}>Roles</option>

          <>{generateRoleOptions()}</>
        </select>
        <button style={icnStyle}>
          <TbFilter style={{ color: "white" }} />
        </button>
        <label style={projectIdStyle}>
          <b>ProjectId:</b>
        </label>
        <select
          className="rounded-lg"
          onChange={onChangeHandleProject}
          style={dropDownProjectFilter}
        >
          <option onChange={onChangeHandleProject}>Projects</option>

          {uniqueProjectIds.map((p) => (
            <option key={p} value={p} id="id">
              {p}
            </option>
          ))}
        </select>
        <button style={icnStyle}>
          <TbFilter style={{ color: "white" }} />
        </button>

        <button
          type="submit"
          className="btn btn-primary btn-block col-lg-10"
          onClick={handleData}
          style={subBtnStyle}
        >
          <label> Search</label>
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-block col-lg-10"
          onClick={handleEmployeeData}
          style={OnBenchBtnStyle}
        >
          <label>Bench</label>
        </button>
        <a
          type="submit"
          className="btn btn-warning btn-block col-lg-10"
          href="/viewResources"
          style={{
            width: "87px",
            marginLeft: "77rem",
            marginTop: "-29px",
            height: "30px",
            lineHeight: "15px",
          }}
        >
          Reset
        </a>
      </div>

      <div>
        <Resource user={currentPosts} role={role}></Resource>
        {temperory == 0 && (
          <h2
            style={{
              textAlign: "center",
            }}
          >
            NOT FOUND ...
          </h2>
        )}
      </div>
      <br />
      <div>
      <label style={{ marginLeft: "81px" }}>PostsPerPage</label>
        <input
          type="number"
          defaultValue={postsPerPage}
          max={temperory.length}
          style={postPerPageStyle}
          onInput={(e) => onChangeHandlePostsPerPage(e)}
        ></input>
        {temperory != 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={temperory.length}
            paginate={paginate}
            back={back}
            next={next}
          />
        )}
      </div>

      <br></br>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Cards;
