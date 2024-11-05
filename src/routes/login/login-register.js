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
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZSM_8HBQhSDblbKyaZjx4WZqjL3hLvxo",
  authDomain: "test-1ad64.firebaseapp.com",
  projectId: "test-1ad64",
  storageBucket: "test-1ad64.appspot.com",
  messagingSenderId: "1062295605424",
  appId: "1:1062295605424:web:1cf678c60fb0e307156b75",
  measurementId: "G-5SV0PL6P39",
};

// Initialize Firebase
const BASEAPP = initializeApp(firebaseConfig);

export const Login_register = () => {
  const [login, setLogin] = useState(true);
  const [OuthKey, setOauthKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [otp, setOTP] = useState();
  const [verificationId, setverificationId] = useState();

  const fireAuth = getAuth(BASEAPP);
  const phone = "+919510533350";
  // Const phone = "+919099351585";

  useEffect(() => {
    getKeyOuth();
  }, []);
  async function getKeyOuth() {
    const outhkey = await axios.get(UserAuth.oauthclientkey);
    console.log("otuehkeu", outhkey.data.OAUTHCLIENTID);
    setOauthKey(outhkey.data.OAUTHCLIENTID);
    setIsLoading(false);
  }

  const SentOTp = async () => {
    try {
      console.log("StatedSEnd", fireAuth);
      const appVerifier12 = new RecaptchaVerifier(
        fireAuth,
        "Recapthc_verifies",
        { size: "invisible" }
      );
      console.log("ERERR");
      const result = await signInWithPhoneNumber(
        fireAuth,
        phone,
        appVerifier12
      );
      setverificationId(result.verificationId);
      console.log("REACHED WITH", result);
    } catch (err) {
      console.log("err", err);
    }
  };

  const VerifiesOtp = async () => {
    // 'recaptcha-container' is the ID of an element in the DOM.
    console.log("vverificationCode", otp);
    // Const applicationVerifier = new RecaptchaVerifier("Recapthc_verifies");
    // Console.log("applicationVerifier"), applicationVerifier;
    // Const provider = new PhoneAuthProvider(fireAuth);
    // Const verificationId = await provider.verifyPhoneNumber(
    //   Phone,
    //   ApplicationVerifier
    // );

    console.log("verifiactionOd", verificationId);
    // Obtain the verificationCode from the user.

    try {
      const phoneCredential = PhoneAuthProvider.credential(
        verificationId,
        parseInt(otp, 10)
      );
      console.log("phonecredeital", phoneCredential);
      console.log("phonecredtial", phoneCredential);
      const userCredential = await signInWithCredential(
        fireAuth,
        phoneCredential
      );
      console.log("USERCRENDTIEOA", userCredential);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="row">
      <div className="col-lg-6 col-md-8 border col-sm-12 container-login">
        {/* <!-- Pills navs --> */}
        <div id="Recapthc_verifies"></div>
        <button
          onClick={SentOTp}
          style={{ color: "white", backgroundColor: "black" }}
        >
          Send Otp
        </button>
        <input
          type="number"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
        />
        <button onClick={VerifiesOtp}>Verified</button>
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
