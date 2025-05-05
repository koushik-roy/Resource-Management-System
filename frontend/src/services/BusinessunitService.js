import BusinessUnitApi from "../apis/BusinessUnitApi";
import Swal from "sweetalert2";
import Axios from "axios";

const submitBusiness = async (data) => {
  await BusinessUnitApi.post("/addBusinessUnit", data).then((res) => {
    console.log(res);
    if (res.data === "Successfully Added") {
      Swal.fire({
        title: "Success",
        text: "Submitted Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/addBusinessUnit";
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

const submitEditBusiness = async (data) => {
  await BusinessUnitApi.put("/updateBusinessUnit", data).then((res) => {
    console.log(res);
    if (res.data === "Business updated successfully") {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/viewBusinessUnits";
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

// const deleteData=async(id)=>{
//   await BusinessUnitApi.delete("/deleteBusinessUnit",{
//     params:{id}
//   }).then(()=>)
// }
export const businessunitService = {
  submitBusiness,
  submitEditBusiness,
};
