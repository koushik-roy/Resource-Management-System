import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { AiOutlineSearch } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import swal from "sweetalert2";
import Pagination from "./Pagination";

export default function ViewCustomer() {
  const [customer, setCustomer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [search, setSearch] = useState([]);

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

  //viewing customers
  const getdata = async () => {
    await axios
      .get("http://localhost:9191/customer/customers")
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
        setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //deleting the data

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
            .delete(`http://localhost:9191/customer/deleteCustomer/${id}`)
            .then(() => {
              getdata();
            });
        }
      });
  };

  //useEffect for displaying data
  useEffect(() => {
    getdata();
  }, []);

  //////paginate

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

  //filter functionality
  const handleFilter = (e) => {
    setCurrentPage(1);

    if (e.target.value !== "") {
      const filterTable = search.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setSearch(filterTable);
    } else {
      setSearch(customer);
    }
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
        View Customer
      </h4>
      <br />
      <div>
        <Link
          className="btn btn-primary btn-block col-lg-10"
          style={btnStyle}
          to="/addCustomer"
        >
          Add Customer
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
          style={{ width: "70%", marginLeft: "12rem", marginTop: "5px" }}
          class="table table-striped"
        >
          <thead style={{ backgroundColor: "dodgerblue" }}>
            <tr style={{ color: "white" }}>
              <th scope="col">ID</th>
              <th scope="col">NAME</th>
              <th scope="col">STATUS</th>
              <th scope="col">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.status}</td>
                <td>
                  <Link to={`/editCustomer/${item.id}`}>
                    <FaEdit />
                  </Link>{" "}
                  <Link style={deleteStyle} onClick={() => deleteData(item.id)}>
                    <RiDeleteBin5Line />
                  </Link>
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
          max={customer.length}
          style={postPerPageStyle}
          onInput={(e) => onChangeHandlePostsPerPage(e)}
        ></input>
        {customer != 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={customer.length}
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
