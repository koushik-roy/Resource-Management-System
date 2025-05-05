import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import Pagination from "./Pagination";
import EditCustomerCategory from "./EditCustomerCategory";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import swal from "sweetalert2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { get } from "react-hook-form";

export default function ViewCustomerCategory() {
  const [customerCategory, setCustomerCategory] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [isDisabled, setIsDisabled] = useState(false);

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

  const disableDelete = {
    pointerEvents: "none",
  };
  const postPerPageStyle = {
    marginLeft: "3px",
    width: "80px",
  };

  //viewing the customers
  const getdata = async () => {
    await axios
      .get("http://localhost:9191/customerCategory/customerCategories")
      .then((res) => {
        console.log(res.data);
        setCustomerCategory(res.data);
        setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //getting the customer data
  const getCustomerData = async () => {
    await axios
      .get("http://localhost:9191/customer/customers")
      .then((res) => {
        //console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //deleting the data
  const deleteData = (id) => {
    // if (!isDeletable(id)) {
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
              `http://localhost:9191/customerCategory/deleteCustomerCategory/${id}`
            )
            .then(() => {
              getdata();
            });
        }
      });
    // } else {
    //   swal.fire({
    //     title: "Can't delete item",
    //     text: "Item mapped",
    //   });
    // }
  };
  useEffect(() => {
    getdata();
    getCustomerData();
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

    if (e.target.value !== "") {
      const filterTable = search.filter(
        (item) =>
          item.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.description.toLowerCase().includes(e.target.value.toLowerCase())
      );

      setSearch(filterTable);
    } else {
      setSearch(customerCategory);
    }
  };
  const edit = (id) => {
    console.log(id);
    return <EditCustomerCategory />;
  };

  // Approaches
  // loop all customers and try adding a key of isDisabled to the CustomerCategory object for every category

  /* customerCategory: {
  id: 1,
  name: "abc"
 ----> isDisabled: true
 }*/
  // maintain a separate array for all disabled categories by looping thru all customers and using array to disable each category

  // customer category ids
  let categoryId = [];
  customerCategory.map((i) => {
    categoryId.push(i.id);
  });

  //customer ids
  let customerCatId = [];
  customer.map((i) => {
    customerCatId.push(i.category);
  });

  console.log(categoryId);
  console.log(customerCatId);

  let deletable = [];
  deletable = categoryId.filter((i) => !customerCatId.includes(i));
  const isDeletable = (id) => {
    if (deletable.indexOf(id) !== -1) {
      // if the category is found in the customer table
      return false;
    } else return true;
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
        View Customer Category
      </h4>
      <br></br>
      <div>
        <Link
          className="btn btn-primary btn-block col-lg-10"
          style={btnStyle}
          to="/addCustomerCategory"
        >
          Add Category
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

                <td>{item.description}</td>

                <td>
                  <Link to={`/editCustomerCategory/${item.id}`}>
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
          max={customerCategory.length}
          style={postPerPageStyle}
          onInput={(e) => onChangeHandlePostsPerPage(e)}
        ></input>
        {customerCategory != 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={customerCategory.length}
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
