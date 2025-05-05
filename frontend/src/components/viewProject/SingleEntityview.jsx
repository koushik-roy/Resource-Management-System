import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { MdArrowBack } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const SingleEntityview = () => {
  const params = useParams();
  // console.log(params);
  const [singleView, setSingleView] = useState([[]]);
  const [data, setData] = useState([[]]);
  const [skills, setSkills] = useState([]);
  const [project, setProject] = useState([]);

  // let arr = [];
  const getData = async () => {
    await Axios.get(`http://localhost:9191/project/${params.id}`)
      .then((res) => {
        console.log(res.data);
        setSingleView(res.data);
        setData(res.data.projectSkillList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProjects = async () => {
    await Axios.get(`http://localhost:9191/project/projects`)
      .then((res) => {
        // console.log(res.data);
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSkills = async () => {
    await Axios.get(`http://localhost:9191/skill/skills`)
      .then((res) => {
        console.log(res.data);
        setSkills(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
    getProjects();
    getSkills();
  }, []);

  const styling = {
    marginLeft: "469px",
    width: "141%",
    marginTop: "1rem",
  };
  const titleStyle = {
    marginTop: "-22px",
  };

  console.log(data);
  console.log(skills);
  return (
    <div>
      <Header />

      <div className="col-md-3 animated fadeIn"  style={{  marginTop: "40px" }} key={singleView.projectId}>
        <div className="card" style={styling}>
        <Link to={`/EditProject/${singleView.projectId}`}>
            <FaEdit />
          </Link>
          <Link
            to="/viewProjects"
            style={{ marginLeft: "395px", marginTop: "-24px" }}
          >
            <MdArrowBack />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{singleView.project_name}</h5>

            <p className="card-text" style={titleStyle}>
              <label>
                <b>Project Id : </b>
              </label>
              {singleView.projectId}
              <br />
            </p>

            <p className="card-text">
              <label>
                <b>Project description : </b>
              </label>
              <br />
              {singleView.project_description}
            </p>

            <p className="card-text">
              <label>
                <b>Start Date :</b>
              </label>{" "}
              {singleView.start_date}
            </p>

            <p className="card-text">
              {" "}
              <label>
                <b>End Date :</b>
              </label>{" "}
              {singleView.end_date}
            </p>

            <p className="card-text">
              <label>
                <b>Status:</b>
              </label>{" "}
              {singleView.status}
            </p>
            <p className="card-text" style={{ marginBottom: "-3px" }}>
              <label>
                <b>Skills:</b>
              </label>
            </p>
            <p className="card-text">
              {" "}
              {data.map((n) => (
                <div key={n.project_id}>
                  {skills.map(
                    (es) =>
                      n.skill_set == es.id && (
                        <div key={es.id}>{es.description}</div>
                      )
                  )}
                </div>
              ))}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SingleEntityview;
