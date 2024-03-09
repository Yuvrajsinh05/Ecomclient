import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from "../loginSlice";
import { UserAuth } from "../../../requests/adminreq";
import { Link } from "react-router-dom"
import { likeProductAsync } from "../../../fetures/likedProductsSlice";
import axios from 'axios';
import { getApiCall } from "../../../requests/requests";



export const Login = ({ setLogin }) => {
  const dispatch = useDispatch()
  const stateStore = useSelector(state => state)
  const CustomerId = useSelector(state => { return state?.login?.user?.Userdata?._id });
  const [useremail, setUseremail] = useState("")
  const [userpwd, setUserPwd] = useState("")
  const [anything, setAnything] = useState("")
  const [clientId, setCLientId] = useState("")
  const navigate = useNavigate();

  useEffect(() => {
    if (stateStore.login.isAuthenticated) {
      const fetchRoute = localStorage.getItem('lastRoute')
      navigate(fetchRoute)
    }
  }, [stateStore])
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
        localStorage.setItem("ecomtoken", jsonLoginPostApiRes.token);
        dispatch(loginSuccess(jsonLoginPostApiRes))
        dispatch(likeProductAsync(false, jsonLoginPostApiRes?.Userdata?.savedProducts, CustomerId))
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


  useEffect(()=>{
      fetchKey()
  },[])

  async function fetchKey(){
    const KeyId = await axios.get(UserAuth.clientKey)
    setCLientId(KeyId?.ClientKey)

  }


  const login = useGoogleLogin({
    clientId,
    onSuccess: tokenResponse => {
      fetchGoogleUserInfo(tokenResponse.access_token);
    },
  });

  const handleLogin = async () => {
    const response = await login();
  };




  async function fetchGoogleUserInfo(access_token) {
    console.log("Acces",access_token)
    const userinfoEndpoint = 'https://www.googleapis.com/oauth2/v3/userinfo';

    try {
      const response = await fetch(userinfoEndpoint, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
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
          localStorage.setItem("ecomuserId", jsonLoginPostApiRes.Userdata._id);
          dispatch(likeProductAsync(false, jsonLoginPostApiRes?.Userdata?.savedProducts, CustomerId))
          dispatch(loginSuccess(jsonLoginPostApiRes))
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        }
      } catch (err) {
        console.log("Login Err:137", err)
      }
    } catch (error) {
      // console.error('Error fetching user information:', error);
      throw error;
    }
  }



  useEffect(() => {
    validUrl()
  }, [])

  function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
  };

  function validUrl() {
    if (!window.location.search) return;
    var token = getUrlParameter('token');
    var name = getUrlParameter('name');
    var email = getUrlParameter('email');
    var UserId = getUrlParameter('_id');
    var savedProducts = getUrlParameter('savedProducts');

    const PayLoad = {
      token: token,
      user: {
        name: name,
        email: email,
        _id: UserId,
        savedProducts: savedProducts.split(',')
      }
    }
    if (token || name || email || UserId) {
      localStorage.setItem("ecomtoken", token);
      localStorage.setItem("user", name);

      dispatch(likeProductAsync(false, savedProducts.split(','), CustomerId))
      dispatch(loginSuccess(PayLoad))
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    }
  }
  async function handleGithubLogin() {
    const response = await axios.get(UserAuth.isGithubLogin)
    if (response.data.reDirect) {
      window.location.href = response.data.reDirect
    }
  }


  // async function
  return (
    <div className="tab-pane fade show active" id="pills-login">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="text-center mb-3 ">
          <p>Sign in with:</p>

          <button type="button" onClick={() => handleLogin()} className="btn btn-link btn-floating mx-1  text-center" style={{ display: 'contents' }}>
            <i className="fab fa-google Faicon"></i>
          </button>


          <button type="button" onClick={handleGithubLogin} className="btn btn-link btn-floating mx-1" style={{ display: 'contents' }}>
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

        <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>
        <div className="text-center">
          <p>Not a member? <Link href="" onClick={() => setLogin(false)}>Register</Link></p>
        </div>
      </form>
    </div>
  )
}