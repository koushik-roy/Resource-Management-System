import SkillSetApi from "../apis/SkillSetApi";
import Swal from "sweetalert2";

const submitSkill = async (data) => {
  await SkillSetApi.post("/addSkill", data).then((res) => {
    console.log(res);
    if (res.data === "Skill added successfully") {
      Swal.fire({
        title: "Success",
        text: "Submitted Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/addSkill";
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

const submitEditSkill = async (data) => {
  await SkillSetApi.put("/updateSkill", data).then((res) => {
    console.log(res);
    if (res.data === "Skill updated successfully") {
      Swal.fire({
        title: "Success",
        text: "Updated Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/viewSkills";
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

export const SkillSetService = {
  submitSkill,
  submitEditSkill,
};
