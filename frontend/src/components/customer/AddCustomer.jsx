/* eslint-disable no-restricted-globals */

import React, { useState } from "react";
import { CustomerService } from "../../services/CustomerService";
import DropdownCategory from "./DropdownCategory";
import "../../App.css";
import Footer from "../Footer";
import Header from "../Header";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import DropdownCustomerStatus from "./DropdownCustomerStatus";

const AddCustomer = () => {
  const initialState = {
    name: "",
    description: "",
    category: "",
    customerStatus: "",
  };

  const [customer, setCustomer] = useState(initialState);

  const onChangeHandleCustomerName = (e) => {
    setCustomer({ ...customer, ["name"]: e.target.value });
  };

  const onChangeHandleCustomerDesc = (e) => {
    setCustomer({ ...customer, ["description"]: e.target.value });
  };

  const onChangeHandleCustomerCategory = (e) => {
    setCustomer({ ...customer, ["category"]: e.target.value });
  };
  const onChangeHandleCustomerStatus = (e) => {
    setCustomer({ ...customer, ["status"]: e.target.value });
  };

  const conStyles = {
    width: "500px",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    CustomerService.submitCustomer(customer);
  };
  return (
    <>
      <Header />
      <div className="col-md-12" style={{
          background: "rgb(255 255 255)",
          height: "590px",
          marginTop: "-13px",
        }}>
        <div className="group" style={{ margin: "1% auto" }}>
        <div
            className="rounded-lg"
            style={{
              border: "1px solid #ced4da",
              textAlign: "center",
              height: "530px",
              background: "rgb(241 241 241)",
              marginTop: "30px",
              width: "690px",
              marginLeft: "-95px"
            }}
          >
          <div className="heading">
            <h1 className="text">Create Customer </h1>
          </div>

          <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name" style={{marginLeft:"-516px"}}>
                Customer Name
                </label>
                <input
                  type="text"
                  name="customerName"
                  style={{ width: "633px",
                    marginLeft: "18px" }}
                  className={`form-control ${
                    errors.customerName &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("customerName", {
                    required: "name is required",

                    minLength: {
                      value: 2,
                      message: "Minimum Required length is 2",
                    },
                    maxLength: {
                      value: 200,
                      message: "Maximum Required length is 200",
                    },
                  })}
                  onInput={(e) => onChangeHandleCustomerName(e)}
                />
                {errors.customerName && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.customerName.message}
                  </span>
                )}
              
            </div>

            <div className="form-group">
              <label htmlFor="description" style={{marginLeft:"-477px"}}>
                Customer Description
                </label>
                <textarea
                  type="text"
                  style={{ width: "633px",
                    marginLeft: "19px" }}
                  name="description"
                  className={`form-control ${
                    errors.description &&
                    "focus:border-red-500 focus:ring-red-500 border-red-500"
                  } `}
                  {...register("description", {
                    required: "description is required",
                  })}
                  onInput={(e) => onChangeHandleCustomerDesc(e)}
                />
                {errors.description && (
                  <span className="text-sm text-red-500 text-danger">
                    {errors.description.message}
                  </span>
                )}
              
            </div>
            <div className="form-group">
              <div
                className="dropdown"
                style={{
                  "margin-left": "-2px",
                  width: "1138px",
                  marginBottom: "-37px",
                }}
              >
                <label style={{marginLeft:"-934px"}}>Customer Category</label>
                <DropdownCategory
                  type="text"
                  categoryFunction={onChangeHandleCustomerCategory}
                />
              </div>
            </div>
            <div className="form-group">
              <div
                className="dropdown"
                style={{
                  "margin-left": "-2px",
                  width: "1138px",
                  marginBottom: "-30px",
                }}
              >
                <label style={{marginLeft:"-962px",marginTop:"19px"}}>Customer Status</label>
                <DropdownCustomerStatus
                  type="text"
                  customerStatusFunction={onChangeHandleCustomerStatus}
                />
              </div>
            </div>
            <div className="form-group-button" style={{marginTop:"55px"}}>
              <button type="submit" value="Submit" className="btn btn-primary" style={{marginLeft:"44px"}}>
                {" "}
                Submit
              </button>

              <Link className="btn btn-secondary" to="/viewCustomers">
                Cancel
              </Link>
            </div>
          </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddCustomer;
