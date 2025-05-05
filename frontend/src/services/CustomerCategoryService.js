import api from "../apis/CustomerCategoryApi.js";
import Swal from "sweetalert2";

const submitCategory = async (data) => {
  await api.post("/addCustomerCategory", data).then((res) => {
    console.log(res);

    if (res.data === "Added Successfully") {
      
      Swal.fire({
        title: "Success",
        text: "Submitted Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function(){
        window.location.href="/addCustomerCategory";
      })
    } else {
      Swal.fire({
        title: "Failed",
        text: "alredy exists",
        icon: "error",
        confirmButtonText: "OK",
      })
    }
  });
};
const submitEditCategory = async (data) => {
  await api.put("/updateCustomerCategory", data).then((res) => {
    console.log(res);

    if (res.data === "success") {
      
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function(){
        window.location.href="/viewCustomerCategory";
      })
    } else {
      Swal.fire({
        title: "Failed",
        text: "alredy exists",
        icon: "error",
        confirmButtonText: "OK",
      })
    }
  });
};

export const CustomerCategoryService = {
  submitCategory,submitEditCategory
};
