import React, { useEffect, useState } from "react";
import pp from "../../../../assets/images/pp.png";
import logo from "../../../../assets/images/nav-logo.png";
import axios from "axios";
import { getToken, USERS_URLs } from "../../../../constans/END_POINTS";

export default function NavBar() {
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  const getCurrentUser = async () => {
    const response = await axios.get(USERS_URLs.currentUser, getToken());
    console.log(response);
    setUserName(response.data.userName);
    setUserEmail(response.data.email);
  };

  useEffect(() => {
    getCurrentUser();
  }, []);
  return (
    <>
      <div className="navBar-container">
        <nav className="navbar navbar-expand-lg bg-success">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent "
            >
              {/* -------------------------------------Left Section */}
              <div>
                <img className="w-100" src={logo} alt="" />
              </div>

              {/* --------------------------------------Right Section */}
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 pe-4 ">
                <li className="nav-item ms-3 m-auto">
                  <div className="position-relative ">
                    {" "}
                    <i className=" fa-solid fa-bell fs-3 me-5 text-warning"></i>
                    <h6 className="position-fixed top-0 ms-3  rounded-circle bg-warning m-1 p-1 rounded-circle">
                      5
                    </h6>
                  </div>
                </li>
                <li className="nav-item d-flex">
                  <img src={pp} alt="" />
                  <div className="d-flex flex-column m-0 p-0">
                    {" "}
                    <div>
                      <a className="nav-link mb-0 pb-0" href="#">
                        {userName}
                      </a>
                    </div>
                    <div>
                      {" "}
                      <a className="nav-link mt-0 pt-0 " href="#">
                        {userEmail}
                      </a>
                    </div>
                  </div>
                </li>
                {/*---------------------------------------------------- Drop Down List */}
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  ></a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
