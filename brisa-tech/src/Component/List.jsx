import React, { useEffect, useState } from "react";
import "./list.css";
import { BiMessageAlt } from "react-icons/bi";
import { TbCircleDot } from "react-icons/tb";
import Pagination from "./Pagination";
const List = () => {
  const [issues, setIssues] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(10);
  const [isClicked, setIsClicked] = useState(true);
  const fetchdata = async () => {
    try {
      const res = await fetch(
        "https://api.github.com/repos/okd-project/okd/issues"
      );
      const data = await res.json();
      console.log(data);
      setIssues(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchdata();
  }, []);

  // Calculate the indexes of the first and last issues to be displayed on the current page
  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

  // Change the page
  const paginate = (pageNumber) => {
    setIsClicked(true);
    setCurrentPage(pageNumber)
    
  };
  return (
   
    <div>
      <h1 style={{ color: "#24292f" }} >
        GitHub Issues
      </h1>
      <div>
        {currentIssues.map((issue) => (
          <div
            className="issue-container"
            style={{
              width: "90%",
              textAlign: "left",
              marginLeft: "5%",
              padding: "-20px",
              fontFamily: "inherit",
              display: "flex",
              height: "auto",
              borderTop: "0.5px solid #d0d7de",
              borderLeft: "0.5px solid #d0d7de",
              borderRight: "0.5px solid #d0d7de",
              marginBottom: "0px",
              hover: { backgroundColor: "blue" },
            }}
            key={issue.id}
          >
            <div style={{ paddingTop: "5px" }}>
              <TbCircleDot
                style={{
                  color: "green",
                  fontSize: "18px",
                  marginLeft: "14px",
                  paddingRight: "5px",
                }}
              />
            </div>
            <div
              style={{
                color: "#8c959f",
                paddingTop: "5px ",
                paddingBottom: "7px",
                width: "100%",
              }}
            >
              <a
                className="title"
                style={{ fontSize: "16px", fontWeight: "600 " }}
              >
                {issue.title}
              </a>
              <div
                style={{
                  margin: "4px 0px 0px",
                  color: "#656D76",
                  fontSize: "13px",
                  marginTop: "-1px",
                }}
              >
                #{issue.number} {issue.updated_at} by{" "}
                <span className="user">{issue.user.login}</span>
              </div>{" "}
            </div>
            <div
              id="last"
              style={{
                display: "flex",
                width: "20%",
                justifyContent: "space-evenly",
              }}
            >
              <span style={{}}></span>
              <span style={{}}></span>
              <span style={{ color: "#656D76", display: "flex" }}>
                <BiMessageAlt style={{ fontSize: "17px", marginTop: "10px" }} />
                <p style={{ marginTop: "8px" }}>{issue.comments}</p>
              </span>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        issuesPerPage={issuesPerPage}
        totalIssues={issues.length}
        paginate={paginate}
        currentPage={currentPage}
        isClicked={isClicked}
      />
    </div>
  );
};

export default List;
