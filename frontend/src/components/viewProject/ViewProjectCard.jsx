import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Header from "../Header";
import ViewProject from "./ViewProjects";
import Pagination from "./Pagination";
import { AiOutlineSearch } from "react-icons/ai";
import { TbFilter } from "react-icons/tb";

function ViewProjectCard() {
  const [project, setProject] = useState([]);
  const [searchApiData, setSearchApiData] = useState([]);
  const [searchusers, setSearchusers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(4);
  const [allBusiness, setAllBusiness] = useState([]);
  const [temp, setTemp] = useState([]);
  const [temp1, setTemp1] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [custProject, setCustProject] = useState([]);
  const [temporary, setTemporary] = useState([]);
  const [selected, setSelected] = useState(["default"]);
  const getdata = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:9191/project/projects")
      .then((res) => {
        console.log(res.data);
        setProject(res.data);
        setSearchusers(res.data);
        setSearchApiData(res.data);
        setTemporary(res.data);
        setLoading(false);
        setCustProject(res.data);
        // setBusinesstemp(res.data);
        setTemp(res.data);
        setTemp1(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getBusinessdata = async () => {
    await axios
      .get("http://localhost:9191/businessUnit/businessUnits")
      .then((response) => {
        // console.log(response.data);
        setAllBusiness(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCustomerdata = async () => {
    await axios
      .get("http://localhost:9191/customer/customers")
      .then((response) => {
        // console.log(response.data);
        setCustomer(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata();
    getBusinessdata();
    getCustomerdata();
  }, []);

  const initialState = {
    p_id: "",
    b_id: "",
    c_id: "",
  };
  const [search, setSearch] = useState(initialState);
  const onChangeHandleProject = (e) => {
    setSearch({ ...search, ["p_id"]: e.target.value });
  };
  const onChangeHandleBusiness = (e) => {
    setSearch({ ...search, ["b_id"]: e.target.value });
  };
  const onChangeHandleCustomer = (e) => {
    setSearch({ ...search, ["c_id"]: e.target.value });
  };

  const dropDownFilter = {
    marginLeft: "2px",
    border: "1px solid rgb(240, 240, 240)",
    background: "rgb(240, 240, 240)",
    outlineWidth: "0",
    width: "164px",
    height: "29px",
  };
  const searchStyle = {
    marginLeft: "8rem",
    border: "1px solid rgba(240, 240, 240)",
    background: "rgba(240, 240, 240)",
    outlineWidth: "0",
    height: "29px",
  };

  const icnStyle = {
    background: "rgb(0,0,255)",
    border: "1px solid rgba(240, 240, 240)",
    marginLeft: "-2px",
    outlineWidth: "0",
    height: "31px",
  };
  const postPerPageStyle = {
    marginLeft: "3px",
    width: "80px",
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = temporary.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const back = (backPage) => {
    if (currentPage != 1) setCurrentPage(currentPage - 1);
  };
  const next = (nextPage) => {
    const totalPosts = temp.length;
    if (currentPage != Math.ceil(totalPosts / postsPerPage))
      setCurrentPage(currentPage + 1);
  };

  console.log(temporary);

  const handleData = (e) => {
    console.log(search);
    const p_id = search.p_id;
    console.log(typeof p_id);

    const b_id = search.b_id;
    const c_id = search.c_id;

    let filterProject = temp;
    let filterBusiness = temp;
    if (p_id == "") {
      setTemporary(filterProject);
    }
    if (p_id !== "") {
      setCurrentPage(1);
      filterProject = project.filter(
        (item) =>
          item.project_id.toString().toLowerCase() ==
          p_id.toString().toLowerCase()
      );
      setTemporary(filterProject);
    }
    if (b_id === "Business Units") {
      setTemporary(filterProject);
    }
    if (b_id !== "" && b_id !== "Business Units") {
      setCurrentPage(1);
      filterBusiness = filterProject.filter(
        (item) => item.business_unit_id.toString().toLowerCase() == b_id
      );
      setTemporary(filterBusiness);
    }
    if (c_id === "Customers") {
      setTemporary(filterProject);
    }
    if (c_id !== "" && c_id !== "Customers") {
      setCurrentPage(1);

      filterProject = filterBusiness.filter(
        (item) => item.customer_id.toString().toLowerCase() == c_id
      );
      setTemporary(filterProject);
    }
  };

  const generateCustomerOptions = () => {
    if (search.b_id == "" || search.b_id == "Business Units") {
      return customer.map((pro) => (
        <option key={pro.id} value={pro.id} id="id">
          {`${pro.name}`}
        </option>
      ));
    } else {
      const businessCustomer = [];
      project.filter((pro) => {
        if (search.b_id == pro.business_unit_id) {
          customer.filter((cust) => {
            if (cust.id == pro.customer_id) {
              businessCustomer.push(cust);
              console.log(cust.name);
            }
          });
        }
      });
      console.log(businessCustomer);
      const uniquevalues = Array.from(new Set(businessCustomer));
      console.log(uniquevalues);
      return uniquevalues.map((bS) => {
        return (
          <option key={bS.id} value={bS.id} id="id">
            {bS.name}
          </option>
        );
      });
    }
  };
  const generateBusinessOptions = () => {
    if (search.c_id == "" || search.c_id == "Customers") {
      return allBusiness.map((pro) => (
        <option key={pro.id} value={pro.id} id="id">
          {`${pro.unit_code}`}
        </option>
      ));
    } else {
      const customerBusiness = [];
      project.filter((pro) => {
        if (search.c_id == pro.customer_id) {
          allBusiness.filter((cust) => {
            if (cust.id == pro.business_unit_id) {
              customerBusiness.push(cust);
            }
            console.log(customerBusiness);
          });
        }
      });
      const uniqueBusinessvalues = Array.from(new Set(customerBusiness));
      return uniqueBusinessvalues.map((bS) => {
        return (
          <option key={bS.id} value={bS.id} id="id">
            {bS.unit_code}
          </option>
        );
      });
    }
  };

  const onChangeHandlePostsPerPage = (e) => {
    if (e.target.value && e.target.value != 0) {
      setPostsPerPage(e.target.value);
    } else {
      setPostsPerPage(4);
    }
  };

  return (
    <>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        View Projects
      </h4>
      <br></br>
      <div>
        <input
          className="rounded-lg"
          style={searchStyle}
          placeholder="Project ID ... "
          onChange={(e) => onChangeHandleProject(e)}
        />
        <button style={icnStyle}>
          <AiOutlineSearch style={{ color: "white" }} />
        </button>
        <label style={{ marginLeft: "35px" }}>
          <b>Business:</b>
        </label>
        <select
          defaultValue={selected}
          className="rounded-lg"
          style={dropDownFilter}
          onChange={(e) => onChangeHandleBusiness(e)}
        >
          <option onChange={onChangeHandleBusiness}>Business Units</option>
          <>{generateBusinessOptions()}</>
        </select>
        <button style={icnStyle}>
          <TbFilter style={{ color: "white" }} />
        </button>
        <label style={{ marginLeft: "30px" }}>
          <b>Customers:</b>
        </label>
        <select
          className="rounded-lg"
          style={dropDownFilter}
          onChange={(e) => onChangeHandleCustomer(e)}
        >
          <option onChange={onChangeHandleCustomer}>Customers</option>
          <>{generateCustomerOptions()}</>
        </select>

        <button style={icnStyle}>
          <TbFilter style={{ color: "white" }} />
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-block col-lg-10"
          onClick={handleData}
          style={{
            width: "87px",
            marginLeft: "66rem",
            marginTop: "-34px",
            height: "30px",
            lineHeight: "15px",
          }}
        >
          Search
        </button>
        <a
          type="submit"
          className="btn btn-warning btn-block col-lg-10"
          href="/viewProjects"
          style={{
            width: "87px",
            marginLeft: "73rem",
            marginTop: "-29px",
            height: "30px",
            lineHeight: "15px",
          }}
        >
          Reset
        </a>
      </div>

      <div style={{ marginTop: "20px" }}>
        <ViewProject
          // project={filter ? businessfilter && customerFilter : currentPosts}
          project={currentPosts}
          loading={loading}
        />
      </div>
      {temporary == 0 && <h2 style={{ textAlign: "center" }}>NOT FOUND ...</h2>}
      <br></br>
      <div>
        <label style={{ marginLeft: "131px" }}>PostsPerPage</label>
        <input
          type="number"
          defaultValue={postsPerPage}
          max={temporary.length}
          style={postPerPageStyle}
          onInput={(e) => onChangeHandlePostsPerPage(e)}
        ></input>
        {temporary != 0 && (
          <Pagination
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPosts={temporary.length}
            // totalPosts={filter ? businessfilter.length : project.length}
            paginate={paginate}
            back={back}
            next={next}
          />
        )}
      </div>
      <Footer />
    </>
  );
}

export default ViewProjectCard;
