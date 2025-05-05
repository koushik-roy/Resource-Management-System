import CustomerApi from "../apis/CustomerApi";
import Swal from "sweetalert2";

const submitCustomer = async (data) => {
  await CustomerApi.post("/addCustomer", data).then((res) => {
    console.log(res);
    Swal.fire({
      title: "Success",
      text: "Submitted Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.href = "/addCustomer";
    });
  });
};

//service for updating the customer
const submitEditCustomer = async (data) => {
  await CustomerApi.put("/updateCustomer", data).then((res) => {
    console.log(res);
    if (res.data === "updated successfully") {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/viewCustomers";
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: "already exists",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });
};

export const CustomerService = {
  submitCustomer,
  submitEditCustomer,
};
