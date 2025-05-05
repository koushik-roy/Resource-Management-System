import React from "react";
import axios from "axios";
import swal from "sweetalert2";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { AiOutlineSearch } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
export default function ViewRole() {
  const [role, setRole] = useState([]);
  const [search, setSearch] = useState([]);
  const [resource, setResource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  const searchStyle = {
    border: "1px solid rgba(240, 240, 240)",

    background: "rgba(240, 240, 240)",
    outlineWidth: "0",
    width: "180px",
    marginLeft: "12rem",
    height: "29px",
  };

  const icnStyle = {
    background: "rgb(0,0,255)",

    border: "1px solid rgba(240, 240, 240)",
    outlineWidth: "0",

    height: "31px",
  };
  const btnStyle = {
    width: "187px",
    marginLeft: "947px",
    height: "30px",
    lineHeight: "15px",
    marginBottom: "-30px",
    outlineWidth: "0",
    backgroundColor: "blue",
  };
  const deleteStyle = {
    marginLeft: "23px",
    color: "red",
  };

  const disableDeleteStyle = {
    marginLeft: "23px",
    color: "grey",
  };
  const postPerPageStyle = {
    marginLeft: "3px",
    width: "80px",
  };

  //getting the data of the roles
  const getdata = async () => {
    await axios
      .get("http://localhost:9191/role/roles")
      .then((res) => {
        console.log(res.data);
        setRole(res.data);
        setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getting the data of the resouces
  const getResourcesData = async () => {
    await axios
      .get("http://localhost:9191/Resource/resources")
      .then((res) => {
        setResource(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //deleting data
  const deleteData = (id) => {
    swal
      .fire({
        title: "Are you sure?",
        text: "This can't be undone",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:9191/role/deleteRole/${id}`)
            .then(() => {
              getdata();
            });
        }
      });
  };
  useEffect(() => {
    getdata();
    getResourcesData();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = search.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const back = (backPage) => {
    if (currentPage != 1) setCurrentPage(currentPage - 1);
  };
  const next = (nextPage) => {
    const totalPosts = search.length;
    if (currentPage != Math.ceil(totalPosts / postsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const handleFilter = (e) => {
    setCurrentPage(1);
    console.log("from search  ");
    if (e.target.value !== "") {
      const filterTable = role.filter(
        (item) =>
          item.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.decsription.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearch(filterTable);
      //   console.log(filterTable.length);
    } else {
      setSearch(role);
    }
  };

  //conditions for deleting a not-mapped role

  //array of role id in  role table
  let roleId = [];
  role.map((i) => {
    roleId.push(i.id);
  });

  //array of role id in resource table
  let resourceRoleId = [];
  resource.map((i) => {
    resourceRoleId.push(i.role_id);
  });

  console.log(roleId);
  console.log(resourceRoleId);

  let deletable = [];
  deletable = roleId.filter((i) => !resourceRoleId.includes(i));
  const isDeletable = (id) => {
    if (deletable.indexOf(id) !== -1) {
      //if the role id is found in the resource table
      return false;
    }
    return true;
  };
  const onChangeHandlePostsPerPage = (e) => {
    
    if (e.target.value && e.target.value!=0) {
      setPostsPerPage(e.target.value);
    } else {
      setPostsPerPage(8);
    }
  };

  return (
    <div>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        View Roles
      </h4>
      <div>
        <Link
          className="btn btn-primary btn-block col-lg-10"
          style={btnStyle}
          to="/addResourceRole"
        >
          Add Role
        </Link>
        <input
          style={searchStyle}
          placeholder=" Search "
          onChange={(e) => handleFilter(e)}
        />

        <button style={icnStyle}>
          <AiOutlineSearch style={{ color: "white" }} />
        </button>
      </div>
      <table
        style={{ width: "70%", marginLeft: "12rem", marginTop: "16px" }}
        class="table table-striped"
      >
        <thead style={{ backgroundColor: "blue" }}>
          <tr style={{ color: "white" }}>
            <th scope="col">ID</th>
            <th scope="col">CODE</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>{item.code}</td>

              <td>{item.decsription}</td>

              <td>
                <Link to={`/editRoles/${item.id}`}>
                  <FaEdit />
                </Link>{" "}
                {!isDeletable(item.id) ? (
                  <Link style={deleteStyle} onClick={() => deleteData(item.id)}>
                    <RiDeleteBin5Line />
                  </Link>
                ) : (
                  <Link style={disableDeleteStyle}>
                    <RiDeleteBin5Line />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
      <label style={{ marginLeft: "193px" }}>PostsPerPage</label>
        <input
          type="number"
          defaultValue={postsPerPage}
          max={role.length}
          style={postPerPageStyle}
          onInput={(e) => onChangeHandlePostsPerPage(e)}
        ></input>
        {role != 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={role.length}
            paginate={paginate}
            back={back}
            next={next}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
