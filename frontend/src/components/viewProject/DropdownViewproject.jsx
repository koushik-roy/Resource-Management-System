import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
const DropdownViewprojects = () => {
  const [dropProject, setDropProjects] = useState([]);

  const getdatas = async () => {
    await axios
      .get("http://localhost:9191/project/projects")
      .then((res) => {
        console.log(res.data);
        setDropProjects(res.data);
        // setProject(res.data);
        // setSearchusers(res.data);
        // setSearchApiData(res.data);
        // setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdatas();
  }, []);
  return (
    <>
      {dropProject.map((pro) => (
        <option
          key={pro.project_id}
          value={pro.project_id}
        >{`${pro.business_unit_id}`}</option>
      ))}
    </>
  );
};
export default DropdownViewprojects;
