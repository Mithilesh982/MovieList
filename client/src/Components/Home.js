import React, { useEffect, useState } from "react";
import "./Style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [showdata, setShowData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => {
        setShowData(response.data);
        console.log(showdata);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const CardId = (id) => {
    const filteredData = showdata.filter((obj) => obj.show.id === id);
    if (filteredData) {
      // Now you can safely use localStorage
      localStorage.setItem("items", JSON.stringify(filteredData));
      navigate("/info");
    }
  };

  return (
    <>
      <div className="container-fluid main-container m-0 p-0 bg-dark overflow-hidden">
        <nav className="navbar navbar-expand-lg bg-dark p-5">
          <div className="container-fluid">
            <div className="col navbrand-col col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 d-flex justify-content-between align-items-center">
              <a className="navbar-brand text-light" href="/">
                <h2><span className="text-danger"> Movie</span>Shows</h2>
              </a>
              <button
                className="navbar-toggler py-1 px-1 border border-0"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon d-flex justify-content-center align-items-center text-light"><i className="fa-solid fa-bars  "></i></span>
              </button>
            </div>
            <div className="col col-xxl-9 col-xl-9 col-lg-9 col-md-12 col-sm-12">
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Watch List
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" href="/">
                      Favorites
                    </a>
                  </li>
                </ul>
                <form className="d-flex" role="search">
                  <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button className="btn btn-outline-danger" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </nav>
        <div className="row m-0 p-0 main-row">
          <div className="col col-xxl-3 col-xl-3 col-lg-12 col-md-12 col-sm-12 side_bar p-0 m-0">
            <div className="row px-5 py-5 d-lg-flex justify-content-evenly">
              <div className="col col-xxl-12 col-xl-12 col-lg-2 col-md-2 col-sm-3 options my-3 p-3 d-flex align-items-center ">
                <h5>Movies </h5>
              </div>
              <div className="col col-xxl-12 col-xl-12 col-lg-2 col-md-2 col-sm-3 options my-3 p-3 d-flex align-items-center ">
                <h5>WebSeries</h5>
              </div>
              <div className="col col-xxl-12 col-xl-12 col-lg-2 col-md-2 col-sm-3 options my-3 p-3 d-flex align-items-center ">
                <h5>Anime</h5>
              </div>
              <div className="col col-xxl-12 col-xl-12 col-lg-2 col-md-2 col-sm-4 options my-3 p-3 d-flex align-items-center ">
                <h5>Shorts</h5>
              </div>
              <div className="col col-xxl-12 col-xl-12 col-lg-2 col-md-2 col-sm-4 options my-3 p-3 d-flex align-items-center ">
                <h5>Documentary</h5>
              </div>
            </div>
          </div>
          <div className="col show-col col-xxl-9 col-xl-9 col-lg-12 col-md-12 col-sm-12 p-0 m-0">
            <div className="row  m-0 d-lg-flex justify-content-evenly">
              {showdata.length > 0 &&
                showdata.map((data) => (
                  <div className="col show-card-col col-xxl-4 col-xl-4 col-lg-4 col-md-5 col-sm-6 p-4" key={data.show.id}>
                    <div className="card" key={data.show.id}>
                      <img
                        src={data.show.image ? data.show.image.original : ""}
                        className="card-img-top position-relative"
                        height={"350"}
                        alt="..."
                      />
                      <div className="card-body position-absolute d-flex flex-column align-items-start justify-content-end">
                        <h5 className="card-title">
                          <h2>{data.show.name}</h2>{" "}
                        </h5>
                        <div className="card-text d-flex justify-content-between w-100">
                          <h6 className="">Audio: {data.show.language}</h6>

                          <h6 className="">
                            Duration: {data.show.runtime} mins
                          </h6>
                        </div>
                        <div className="card-text d-flex justify-content-start my-2 w-100">
                          {data.show.genres.map((gen) => (
                            <div className="btn btn-outline-danger mx-2">
                              {gen}
                            </div>
                          ))}
                        </div>
                        <div
                          className="btn btn-outline-light"
                          onClick={() => {
                            CardId(data.show.id);
                          }}
                        >
                          View More
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
