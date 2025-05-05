import UserApi from "../apis/UserApi";
import Swal from "sweetalert2";

const submitUser = async (data) => {
  await UserApi.post("/register", data).then((res) => {
    console.log(res.data);
    if (res.data === "User Registered") {
      Swal.fire({
        title: "Success",
        text: "Registered Successfully",
        icon: "success",
        confirmButtonText: "OK",
      }).then(function () {
        window.location.href = "/";
      });
    } else {
      Swal.fire({
        title: "Failed",
        text: "User name already exists",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  });
};

export const RegisterService = {
  submitUser,
};
