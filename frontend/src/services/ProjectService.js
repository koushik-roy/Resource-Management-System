import ProjectApi from "../apis/ProjectApi";
import Swal from "sweetalert2";
import axios from "axios";

const submitProject = async (data) => {
  await ProjectApi.post("/addProject", data).then((res) => {
    try {
      if (res.data === "project added successfully") {
        Swal.fire({
          title: "Success",
          text: "Submitted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          window.location.href = "/addProject";
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      }
    }
  });
};

const submitEditProject = async (data) => {
  await ProjectApi.put("/update", data).then((res) => {
    console.log(res);
    if (res.data === "project updated successfully") {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/viewProjects";
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
const submitDeleteProjectSkill = async (data) => {
  console.log(data);
  await axios
    .delete("http://localhost:9191/projectSkill/delete", { data })
    .then((res) => {
      console.log(res);
      if (res.data === "deleted successfully") {
        Swal.fire({
          title: "Success",
          text: "updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        }).then(function () {
          window.location.href = "/viewProjects";
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

export const projectService = {
  submitProject,
  submitEditProject,
  submitDeleteProjectSkill,
};
