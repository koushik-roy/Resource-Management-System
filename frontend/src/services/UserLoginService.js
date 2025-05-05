import UserApi from "../apis/UserApi";
import Swal from "sweetalert2";

const submitUser = async (data) => {
  await UserApi.post("/login", data)
    .then((res) => {
      console.log(res.data);
      if (res.data === "Login Successfully") {
        localStorage.setItem("login", true);
        window.location.href = "/dashboard";
      } else if (res.data === "invalid Password") {
        Swal.fire({
          title: "Failed",
          text: "Invalid Password",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Failed",
          text: "Invalid User",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    })
    .catch((err) => {
      console.log("error message", err);
    });
};

export const LoginService = {
  submitUser,
};
