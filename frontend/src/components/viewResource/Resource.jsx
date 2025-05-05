import React from "react";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import logos from "../../images/dummyimg.png";
import { ResourceService } from "../../services/ResourceService";
import swal from "sweetalert2";


import { RiDeleteBin5Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

const Resource = ({ user, role }) => {
  const divStyle = {
    marginLeft: "5rem",
    marginRight: "5rem",
  };
  const imgStyle = {
    width: "101px",
    marginLeft: "24px",
    borderRadius: "72%",
   
  };
  const handleDelete=(e)=>{
    console.log(e);
    swal
      .fire({
        title: "Are you sure?",
        text: "This can't be undone",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "YES",
      })
      .then((result) => {
        if (result.isConfirmed) {
    ResourceService.submitDeleteResource(e);
        }})
  }

  return (
    <div className="clearfix" style={divStyle}>
      <div className="row">
        {user.map((resources) => (
          <div className="col-md-3 animated fadeIn" key={resources.employee_id}>
            <Link style={{textDecoration: "none"}} to={`/viewResource/${resources.employee_id}`} >
            <div className="card" >
              <div className="card-body">
              <div style={{marginLeft:"11rem"}}><Link to={`/editresource/${resources.employee_id}`} ><FaEdit/></Link> <Link style={{color:"red"}} onClick={(e)=>handleDelete(resources.employee_id)}><RiDeleteBin5Line/></Link></div>
                <div className="avatar">
                  <img
                    src={logos}
                    className="card-img-top"
                    alt="name "
                    style={imgStyle}
                  />
                </div>

                <h5 className="card-title">
                  {resources.first_name + " " + resources.last_name}
                </h5>
                {role.map((rol) => (
                  <div key={rol.id}>
                    {rol.id == resources.role_id && (
                      <div style={{color:"black"}}>{rol.decsription}</div>
                    )}
                  </div>
                ))}
                <p className="card-text">
                  {resources.mail_id}
                  <br />
                  <span className="phone">{resources.employee_id}</span>
                </p>
              </div>
            </div>
            
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resource;
