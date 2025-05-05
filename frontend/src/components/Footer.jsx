import React from "react";

import logo from "../images/teksystemsLogo.jpg";

function Footer() {

  const footerstyle = {

    position: "fixed",
    right:"0",
    bottom: "0",
     
  };

  return (

    <div className="footer">

      <img style={footerstyle} src={logo} />

    </div>

  );

}



export default Footer;