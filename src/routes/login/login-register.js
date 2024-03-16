import { useEffect, useState } from "react"
import { } from "./login.css"
import { Register } from "./login-register/register"
import { Login } from "./login-register/login"
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Link } from "react-router-dom"
import axios from "axios";
import { UserAuth } from "../../requests/adminreq";

export const Login_register = () => {
    const [login, setLogin] = useState(true)
    const [OuthKey, setOauthKey] = useState("")

    useEffect(() => {
        getKeyOuth()
    }, [])

    async function getKeyOuth() {
        console.log("eventFuknccall")
        try {
            const outhkey = await axios.get(UserAuth.oauthclientkey)
            console.log("outhkeycolacola", outhkey)
            console.log("otuehkeu", outhkey.data.OAUTHCLIENTID)
            setOauthKey(outhkey.data.OAUTHCLIENTID)
        } catch (err) {
            console.log("Err", err)
        }


    }

    console.log("OuthKey", OuthKey)
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
                    {OuthKey ? <GoogleOAuthProvider clientId={OuthKey}>
                        {login ? <Login setLogin={setLogin} /> : <Register setLogin={setLogin} />}

                    </GoogleOAuthProvider> :
                        <>
                            <h4>Wait a while Backend server is restarting it's stop in Inactivity....</h4>
                            <p><b>{"RenderFreeServices"}</b> 😕</p>
                            <p><b>{"Can check pending api calls in network-manager"}</b> 🕵️‍♂️</p>

                        </>
                    }

                </div>
                {/* <!-- Pills content --> */}
            </div>
        </div>

    )
}