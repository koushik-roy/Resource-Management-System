import ResourceApi from "../apis/ResourceApi";
import Swal from "sweetalert2";
import axios from "axios";

const submitResource = async (data) => {
  await ResourceApi.post("/addResource", data).then((res) => {
    console.log(res);
    Swal.fire({
      title: "Success",
      text: "Submitted Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.href = "/addResource";
    });
  });
};

const submitEditResource = async (data) => {
  console.log(data);
  await ResourceApi.put("/updateResource", data).then((res) => {
    console.log(res);
    Swal.fire({
      title: "Success",
      text: "Updated Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.href = "/viewResources";
    });
  });
};
const submitDeleteData = async (data) => {
  console.log(data);
  if (data) {
    await axios
      .delete("http://localhost:9191/EmployeeSkills/delete", { data })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          window.location.href = "/viewResources";
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }
};
const submitProjectDeleteData = async (data) => {
  console.log(data);

  await axios
    .put("http://localhost:9191/EmployeeProject/delete",  data )
    .then((res) => {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/viewResources";
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const submitProjectUpdateData = async (data) => {
  console.log(data);

  await axios
    .put("http://localhost:9191/EmployeeProject/updateExistingProject",  data )
    .then((res) => {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/viewResources";
      });
    })
    .catch((err) => {
      console.log(err.response);
    });
};

const submitDeleteResource = async (data) => {
  console.log(data);
  await ResourceApi.put(`/updateIsDelete/${data}`, data).then((res) => {
    console.log(res);
    Swal.fire({
      title: "Success",
      text: "Deleted Successfully",
      icon: "success",
      confirmButtonText: "OK",
    }).then(function () {
      window.location.href = "/viewResources";
    });
  });
};

export const ResourceService = {
  submitResource,
  submitEditResource,
  submitDeleteData,
  submitProjectDeleteData,
  submitDeleteResource,
  submitProjectUpdateData
};
