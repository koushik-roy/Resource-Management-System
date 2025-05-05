import RoleApi from "../apis/RoleApi";
import Swal from "sweetalert2";

const submitRole = async (data) => {
  await RoleApi.post("/addRole", data).then((res) => {
    console.log(res);
    if (res.data === "Successfully Added") {
      Swal.fire({
        title: "Success",
        text: "Submitted Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/addResourceRole";
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

const submitEditRole = async (data) => {
  await RoleApi.put("/updateResourceRole", data).then((res) => {
    console.log(res);
    if (res.data === "role updated successfully") {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/viewRoles";
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

export const roleService = {
  submitRole,
  submitEditRole,
};
