import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux'
import { loginSuccess } from "../loginSlice";
import { UserAuth } from "../../../requests/adminreq";
import { Link } from "react-router-dom"
import { likeProductAsync } from "../../../fetures/likedProductsSlice";
const axios = require('axios');

export const Login = ({ setLogin }) => {
  const dispatch = useDispatch()

  const [useremail, setUseremail] = useState("")
  const [userpwd, setUserPwd] = useState("")
  const [anything, setAnything] = useState("")
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    loginPostApiCall(useremail, userpwd);
  }


  async function loginPostApiCall(email, pswd) {
    const loginPayload = {
      username: email,
      password: pswd,
    };

    const requestsType = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginPayload),
    };

    try {
      const loginPostApiRes = await fetch(UserAuth.login, requestsType);
      const jsonLoginPostApiRes = await loginPostApiRes.json();
      setAnything(jsonLoginPostApiRes)
      if (loginPostApiRes.status === 200) {
        console.log("user", jsonLoginPostApiRes)
        localStorage.setItem("ecomtoken", jsonLoginPostApiRes.token);
        localStorage.setItem("user", jsonLoginPostApiRes.user.name);
        localStorage.setItem("ecomuserId", jsonLoginPostApiRes.user._id);
        dispatch(loginSuccess(jsonLoginPostApiRes))
        dispatch(likeProductAsync(false, jsonLoginPostApiRes?.user?.savedProducts))
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
      if (loginPostApiRes.status == 401) {
        alert("Invalid authorization")
      }
    } catch (error) {
      alert("check you connection", error)
    }
  }


  const login = useGoogleLogin({

    onSuccess: tokenResponse => {
      console.log("token gettting  call-1", tokenResponse.access_token)
      fetchGoogleUserInfo(tokenResponse.access_token)
    },
  });

  async function fetchGoogleUserInfo(access_token) {
    console.log("fetchGoogleUserInfo access_token", access_token)
    const userinfoEndpoint = 'https://www.googleapis.com/oauth2/v3/userinfo';

    try {
      const response = await fetch(userinfoEndpoint, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      console.log("response", response)
      if (!response.ok) {
        throw new Error('Failed to fetch user information');
      }

      const userData = await response.json();
      const loginPayload = {
        email: userData.email,
        email_verified: userData.email_verified,
        name: userData.name,
        picture: userData.picture,
        sub: userData.sub
      };
      const requestsType = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginPayload),
      };
      try {
        const loginPostApiRes = await fetch(UserAuth.isGoogleLogin, requestsType);
        const jsonLoginPostApiRes = await loginPostApiRes.json();
        setAnything(jsonLoginPostApiRes)
        if (jsonLoginPostApiRes.status === 200) {
          localStorage.setItem("ecomtoken", jsonLoginPostApiRes.token);
          localStorage.setItem("user", jsonLoginPostApiRes.user.name);
          localStorage.setItem("ecomuserId", jsonLoginPostApiRes.user._id);
          dispatch(likeProductAsync(false, jsonLoginPostApiRes?.user?.savedProducts))
          dispatch(loginSuccess(jsonLoginPostApiRes))
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (err) {
        console.log("hola er", err)
      }
    } catch (error) {
      // console.error('Error fetching user information:', error);
      throw error;
    }
  }


  return (
    <div className="tab-pane fade show active" id="pills-login">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="text-center mb-3 ">
          <p>Sign in with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f  Faicon "></i>
          </button>

          <button type="button" onClick={() => login()} className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google Faicon"></i>
          </button>

          {/* <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap
          />;
 */}

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter Faicon"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github Faicon"></i>
          </button>
        </div>

        <p className="text-center">or:</p>

        {/* <!-- Email input --> */}
        <label className="form-label" htmlFor="loginName">Email or username</label>
        <div className="form-outline mb-4">
          <input type="email" id="loginName" onChange={(e) => setUseremail(e.target.value)} className="form-control" />
        </div>

        {/* <!-- Password input --> */}
        <label className="form-label" htmlFor="loginPassword">Password</label>
        <div className="form-outline mb-4">
          <input type="password" id="loginPassword" onChange={(e) => setUserPwd(e.target.value)} className="form-control" />

        </div>

        {/* <!-- 2 column grid layout --> */}
        <div className="row mb-4">
          <div className="col-md-6 d-flex justify-content-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check mb-3 mb-md-0">
              <input className="form-check-input" type="checkbox" value="" id="loginCheck" defaultChecked={true} />
              <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            <Link href="">Forgot password?</Link>
          </div>
        </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>
        <div className="text-center">
          <p>Not a member? <Link href="" onClick={() => setLogin(false)}>Register</Link></p>
        </div>
      </form>
    </div>
  )
}