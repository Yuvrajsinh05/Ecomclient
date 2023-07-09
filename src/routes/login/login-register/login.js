import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { logIn ,userState } from "../loginSlice";
import { UserAuth } from "../../../requests/adminreq";
import { Link } from "react-router-dom"

export const Login = ({ setLogin }) => {
  // const count = useSelector(state => state.counter.value)
  const dispatch = useDispatch()

  const [useremail, setUseremail] = useState("")
  const [userpwd, setUserPwd] = useState("")
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
      if (loginPostApiRes.status === 200) {
        localStorage.setItem("ecomtoken", jsonLoginPostApiRes.token);
        localStorage.setItem("user", jsonLoginPostApiRes.user.name);
        localStorage.setItem("ecomuserId", jsonLoginPostApiRes.user._id);
        dispatch(logIn(true))
        dispatch(userState(jsonLoginPostApiRes))
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



  return (
    <div className="tab-pane fade show active" id="pills-login">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="text-center mb-3">
          <p>Sign in with:</p>
          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-facebook-f"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-google"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-twitter"></i>
          </button>

          <button type="button" className="btn btn-link btn-floating mx-1">
            <i className="fab fa-github"></i>
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
              <input className="form-check-input" type="checkbox" value="" id="loginCheck"  defaultChecked={true} />
              <label className="form-check-label" htmlFor="loginCheck"> Remember me </label>
            </div>
          </div>

          <div className="col-md-6 d-flex justify-content-center">
            {/* <!-- Simple link --> */}
            <Link href="">Forgot password?</Link>
          </div>
        </div>

        {/* <!-- Submit button --> */}
        <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

        {/* <!-- Register buttons --> */}
        <div className="text-center">
          <p>Not a member? <Link href="" onClick={() => setLogin(false)}>Register</Link></p>
        </div>
      </form>
    </div>
  )
}