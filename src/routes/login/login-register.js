import { useState } from "react"
import { } from "./login.css"
import { Register } from "./login-register/register"
import { Login } from "./login-register/login"
import { Link } from "react-router-dom"

export const Login_register = () => {
    const [login, setLogin] = useState(true)
    console.log("login component")
    return (
        <div className="container-login">
            {/* <!-- Pills navs --> */}
            <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                <li className="nav-item" role="presentation">
                    <Link className={`nav-link ${login ? 'active' : ''}`} id="tab-login" onClick={() => setLogin(true)}>Login</Link>
                </li>
                <li className="nav-item" role="presentation">
                    <Link className={`nav-link ${!login ? 'active' : ''}`} id="tab-register" onClick={() => setLogin(false)}>Register</Link>
                </li>
            </ul>
            {/* <!-- Pills navs --> */}

            {/* <!-- Pills content --> */}
            <div className="tab-content">
                {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
            </div>
            {/* <!-- Pills content --> */}
        </div>
    )
}