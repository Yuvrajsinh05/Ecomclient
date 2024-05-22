import React from "react";
import { useEffect, useState } from "react";
import {} from "./login.css";
import { Register } from "./login-register/register";
import { Login } from "./login-register/login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserAuth } from "../../requests/adminreq";
import { Bars } from "react-loader-spinner";

export const Login_register = () => {
  const [login, setLogin] = useState(true);
  const [OuthKey, setOauthKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getKeyOuth();
  }, []);
  async function getKeyOuth() {
    const outhkey = await axios.get(UserAuth.oauthclientkey);
    console.log("otuehkeu", outhkey.data.OAUTHCLIENTID);
    setOauthKey(outhkey.data.OAUTHCLIENTID);
    setIsLoading(false);
  }
  return (
    <div className="row">
      <div className="col-lg-6 col-md-8 border col-sm-12 container-login">
        {/* <!-- Pills navs --> */}

        {isLoading && (
          <div className="loader-container">
            <Bars
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="bars-loading"
              wrapperClass=""
              visible={true}
            />
            <p>Connecting to server, please wait...</p>
          </div>
        )}

        {!isLoading && (
          <>
            {" "}
            <ul
              className="nav nav-pills nav-justified mb-3"
              id="ex1"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <Link
                  className={`nav-link ${login ? "active" : ""}`}
                  id="tab-login"
                  onClick={() => setLogin(true)}
                >
                  Login
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  className={`nav-link ${!login ? "active" : ""}`}
                  id="tab-register"
                  onClick={() => setLogin(false)}
                >
                  Register
                </Link>
              </li>
            </ul>
            {/* <!-- Pills navs --> */}
            {/* <!-- Pills content --> */}
            <div className="tab-content">
              {console.log("OuthKey", OuthKey)}

              {OuthKey && (
                <GoogleOAuthProvider clientId={OuthKey}>
                  {login ? (
                    <Login setLogin={setLogin} />
                  ) : (
                    <Register setLogin={setLogin} />
                  )}
                </GoogleOAuthProvider>
              )}
            </div>
            {/* <!-- Pills content --> */}
          </>
        )}
      </div>
    </div>
  );
};
