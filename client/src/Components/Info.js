import React, { useEffect, useState } from "react";
import "./Style.css";

function Info() {
  const [item, setItems] = useState([]);
  const [status, setStatus] = useState(false);
  const [summary, setSummary] = useState("");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
      setItems(storedItems);
      setStatus(true);
      let summary = storedItems[0].show.summary;
      //   console.log(typeof summary);
      //   console.log(summary);
      // Create a new DOMParser
      const parser = new DOMParser();

      // Parse the HTML string into a DOM document
      const doc = parser.parseFromString(summary, "text/html");

      // Access the text content inside the <p> element
      const textContent = doc.body.querySelector("p").textContent;
      setSummary(textContent);
    }
  }, [status]);

  return (
    <>
      <div className="container-fluid main-container m-0 p-0 bg-dark overflow-hidden">
        <nav className="navbar navbar-expand-lg bg-dark p-5">
          <div className="container-fluid">
            <div className="col navbrand-col col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 d-flex justify-content-between align-items-center">
              <a className="navbar-brand text-light" href="/">
                <h2>
                  <span className="text-danger"> Movie</span>Shows
                </h2>
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
                <span className="navbar-toggler-icon d-flex justify-content-center align-items-center text-light">
                  <i className="fa-solid fa-bars  "></i>
                </span>
              </button>
            </div>
            <div className="col col-xxl-9 col-xl-9 col-lg-9 col-md-12 col-sm-12">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
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
            <div className="row px-5 pt-5 d-lg-flex justify-content-evenly">
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
          <div className="col col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12 p-0 m-0">
            <div
              className="row  m-0 d-lg-flex justify-content-center align-items-center"
              style={{ height: "100%" }}
            >
              {item.map((data) => (
                <div
                  className="row d-flex justify-content-evenly align-items-center"
                  key={data.show.id}
                >
                  <div className="col text-center col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-8">
                    <img
                      src={data.show.image ? data.show.image.original : ""}
                      alt=""
                      height={450}
                    />
                  </div>
                  <div className="col col-xxl-7 col-xl-7 col-lg-7 col-md-8 col-sm-8 text-light py-3 d-flex flex-column ">
                    <h2>{data.show.name}</h2>
                    <div className="d-flex justify-content-start">
                      <h6 className="mx-1">Audio: {data.show.language}</h6>
                      <h6 className="mx-4">
                        Duration: {data.show.runtime} mins
                      </h6>
                    </div>
                    <div className="d-flex justify-content-start my-2 w-100">
                      {data.show.genres.map((gen) => (
                        <div className="btn btn-outline-danger mx-2">{gen}</div>
                      ))}
                    </div>
                    <h6 className=""> {summary} </h6>
                    <div className="">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          {item.map((data) => (
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  {data.show.name}
                </h1>
              </div>

              <div className="modal-body">
                {" "}
                <div className="d-flex justify-content-start">
                  <h6 className="mx-1">Audio: {data.show.language}</h6>
                  <h6 className="mx-4">Duration: {data.show.runtime} mins</h6>
                </div>
                <div className="d-flex justify-content-start">
                  {data.show.genres.map((gen) => (
                    <div className="btn btn-outline-danger">{gen}</div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Understood
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Info;
