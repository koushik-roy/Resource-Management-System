import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import { AiOutlineSearch } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import swal from "sweetalert2";

export default function ViewSkills() {
  const [skill, setSkill] = useState([]);
  const [search, setSearch] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const [project, setProject] = useState([]);

  const searchStyle = {
    border: "1px solid rgba(240, 240, 240)",

    background: "rgba(240, 240, 240)",
    outlineWidth: "0",
    width: "180px",
    marginLeft: "12rem",
    height: "29px",
  };

  const icnStyle = {
    background: "rgb(0,0,255)",

    border: "1px solid rgba(240, 240, 240)",
    outlineWidth: "0",

    height: "31px",
  };
  const btnStyle = {
    width: "187px",
    marginLeft: "947px",
    height: "30px",
    lineHeight: "15px",
    marginBottom: "-30px",
    outlineWidth: "0",
    backgroundColor: "blue",
  };
  const deleteStyle = {
    marginLeft: "23px",
    color: "red",
  };

  const disableDeleteStyle = {
    marginLeft: "23px",
    color: "grey",
  };

  const postPerPageStyle = {
    marginLeft: "3px",
    width: "80px",
  };

  //getting the data
  const getdata = async () => {
    await axios
      .get("http://localhost:9191/skill/skills")
      .then((res) => {
        console.log(res.data);
        setSkill(res.data);
        setSearch(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  ///////////////////
  //getting data of all the projects
  const getProjects = async () => {
    await axios
      .get("http://localhost:9191/project/projects")
      .then((res) => {
        setProject(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getdata();
    getProjects();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = search.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const back = (backPage) => {
    if (currentPage != 1) setCurrentPage(currentPage - 1);
  };
  const next = (nextPage) => {
    const totalPosts = search.length;
    if (currentPage != Math.ceil(totalPosts / postsPerPage))
      setCurrentPage(currentPage + 1);
  };

  const handleFilter = (e) => {
    setCurrentPage(1);
    console.log("from search  ");
    if (e.target.value !== "") {
      const filterTable = skill.filter(
        (item) =>
          item.code.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.description.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSearch(filterTable);
      //   console.log(filterTable.length);
    } else {
      setSearch(skill);
    }
  };

  //deleting the data
  const deleteData = (id) => {
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
          axios
            .delete(`http://localhost:9191/skill/deleteSkill/${id}`)
            .then(() => {
              getdata();
            });
        }
      });
  };

  ////////////////
  //delete logic

  let skillId = [];
  skill.map((i) => {
    skillId.push(i.id);
  });

  //array of skill Ids in project table
  let projectSkillId = [];

  project.map((p) => {
    p.projectSkillList.map((l) => {
      console.log(l.skill_set);
      projectSkillId.push(l.skill_set);
    });
  });

  console.log(skillId);
  console.log(projectSkillId);

  let deletable = [];
  deletable = skillId.filter((i) => !projectSkillId.includes(i));
  const isDeletable = (id) => {
    if (deletable.indexOf(id) !== -1) {
      //if the skill id is found in the project table
      return false;
    }
    return true;
  };

  const onChangeHandlePostsPerPage = (e) => {
    
    if (e.target.value && e.target.value!=0) {
      setPostsPerPage(e.target.value);
    } else {
      setPostsPerPage(8);
    }
  };

  return (
    <div>
      <Header />
      <h4 style={{ textAlign: "center", color: "blue", marginTop: "30px" }}>
        View Skills
      </h4>
      <div>
        <Link
          className="btn btn-primary btn-block col-lg-10"
          style={btnStyle}
          to="/addSkill"
        >
          Add Skill
        </Link>
        <input
          style={searchStyle}
          placeholder=" Search "
          onChange={(e) => handleFilter(e)}
        />

        <button style={icnStyle}>
          <AiOutlineSearch style={{ color: "white" }} />
        </button>
      </div>
      <table
        style={{ width: "70%", marginLeft: "12rem", marginTop: "16px" }}
        class="table table-striped"
      >
        <thead style={{ backgroundColor: "blue" }}>
          <tr style={{ color: "white" }}>
            <th scope="col">ID</th>
            <th scope="col">CODE</th>
            <th scope="col">DESCRIPTION</th>
            <th scope="col">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>

              <td>{item.code}</td>

              <td>{item.description}</td>

              <td>
                <Link to={`/editSkills/${item.id}`}>
                  <FaEdit />
                </Link>{" "}
                {!isDeletable(item.id) ? (
                  <Link style={deleteStyle} onClick={() => deleteData(item.id)}>
                    <RiDeleteBin5Line />
                  </Link>
                ) : (
                  <Link style={disableDeleteStyle}>
                    <RiDeleteBin5Line />
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
      <label style={{ marginLeft: "193px" }}>PostsPerPage</label>
        <input
          type="number"
          defaultValue={postsPerPage}
          max={skill.length}
          style={postPerPageStyle}
          onInput={(e) => onChangeHandlePostsPerPage(e)}
        ></input>
        {skill != 0 && (
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={skill.length}
            paginate={paginate}
            back={back}
            next={next}
          />
        )}
      </div>
      <Footer />
    </div>
  );
}
