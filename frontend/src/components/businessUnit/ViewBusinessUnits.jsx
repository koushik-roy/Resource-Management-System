import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { Link, useParams } from "react-router-dom";
import EditBusinessUnits from "./EditBusinessUnits";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "./Pagination";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Button } from "react-bootstrap";
import swal from "sweetalert2";
export default function ViewBusinessUnits() {
  const params = useParams();
  const [BusinessUnits, setBusinessUnits] = useState([]);
  const [resource, setResource] = useState([]);
  const [search, setSearch] = useState([]);
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

  //viewing data from business table
  const getdata = async () => {
    await axios
      .get("http://localhost:9191/businessUnit/businessUnits")
      .then((res) => {
        console.log(res.data);
        setBusinessUnits(res.data);
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

  //deleting data function
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
            .delete(
              `http://localhost:9191/businessUnit/deleteBusinessUnit/${id}`
            )
            .then(() => {
              getdata();
            });
        }
      });
  };

  //useEffect
  useEffect(() => {
    getdata();
    getResourcesData();
    // deleteData();
  }, []);

  const handleFilter = (e) => {
    setCurrentPage(1);
    console.log(search);
    if (e.target.value !== "") {
      const filterTable = search.filter(
        (item) =>
          item.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.unit_description
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
      );
      setSearch(filterTable);
    } else {
      setSearch(BusinessUnits);
    }
  };

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

  //conditions for deleting a not-mapped role

  //array of business id in  business table
  let businessId = [];
  BusinessUnits.map((i) => {
    businessId.push(i.id);
  });

  //array of business id in resource table
  let businessResource = [];
  resource.map((i) => {
    businessResource.push(i.business_unit_id);
  });

  console.log(businessId);
  console.log(businessResource);

  let deletable = [];
  deletable = businessId.filter((i) => !businessResource.includes(i));
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
        View Business Unit
      </h4>
      <div>
        <Link
          className="btn btn-primary btn-block col-lg-10"
          style={btnStyle}
          to="/addBusinessUnit"
        >
          Add Business Unit
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
      <div>
        <table
          style={{ width: "70%", marginLeft: "12rem" }}
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
                <td>{item.unit_description}</td>
                <td>
                  <Link to={`/editBusinessUnit/${item.id}`}>
                    <FaEdit />
                  </Link>{" "}
                  {!isDeletable(item.id) ? (
                    <Link
                      style={deleteStyle}
                      onClick={() => deleteData(item.id)}
                    >
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
      </div>
      <div>
      <label style={{ marginLeft: "193px" }}>PostsPerPage</label>
        <input
          type="number"
          defaultValue={postsPerPage}
          max={search.length}
          style={postPerPageStyle}
          onInput={(e) => onChangeHandlePostsPerPage(e)}
        ></input>
        {search != 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={search.length}
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
