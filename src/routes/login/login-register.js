import { useState } from "react"
import { } from "./login.css"
import { Register } from "./login-register/register"
import { Login } from "./login-register/login"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from "react-router-dom"

export const Login_register = () => {
    const [login, setLogin] = useState(true)
    return (
        <div className="row">
            <div className="col-lg-6 col-md-8 col-sm-12 container-login">
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
                    <GoogleOAuthProvider clientId="1001055247183-29hb4bg0ga12tq5656ftjdo31b3f3msv.apps.googleusercontent.com">

                        {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}
                    </GoogleOAuthProvider>
                </div>
                {/* <!-- Pills content --> */}
            </div>
        </div>

    )
}