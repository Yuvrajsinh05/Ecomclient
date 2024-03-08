import { useEffect, useState } from "react"
import { UserAuth } from "../../../requests/adminreq"

export const Register = ({setLogin}) => {
    const [foundOtpMatch, setfoundOtpMatch] = useState(false)
    const [username, setUsername] = useState("")
    const [useremail, setUserEmail] = useState("")
    const [userphone, setUserPhone] = useState("")
    const [userotp, setUserOTP] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userReapetPassword, setUserReapetPassword] = useState("")

    function handleOtpMatch() {
        if (!username || !useremail || !userphone) {
            setfoundOtpMatch(false)
            alert("fill all details")
        } else (
            setfoundOtpMatch(true)
            // setfoundOtpMatch(false )
        )

    }
    const matchOtphandler = async () => {
        let bodyObj = {
            Name: username,
            email: useremail,
            phone: userphone
        }

        const requestsType = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObj),
        };
        try {
            const loginPostApiRes = await fetch(UserAuth.register, requestsType);
            const jsonLoginPostApiRes = await loginPostApiRes.json();
            if(jsonLoginPostApiRes?.status == 500){
                alert(jsonLoginPostApiRes.message)
            }
        } catch (error) {
            alert("something", error)
        }
    }


    const handleSubmitRegister = async (e) => {
        e.preventDefault();
        if (!userotp) {
            return alert("Enter OTP")
        }
        if (!userPassword) {
            return alert("Enter userPassword")
        }
        if (!userReapetPassword) {
            return alert("Enter userReapetPassword")
        }
        if (userPassword != userReapetPassword) {
            return alert("check your passwords ")
        }

        let bodyObj = {
            email: useremail,
            clientOtp: userotp,
            password: userPassword,
            repassword: userReapetPassword
        }
        const requestsType = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyObj),
        };

        try {
            const loginPostApiRes = await fetch(UserAuth.isVerifiedRegister, requestsType);
            const jsonLoginPostApiRes = await loginPostApiRes.json();
           if(jsonLoginPostApiRes.message=="Created successfully"){
            setLogin(true)
           }else{
            alert(jsonLoginPostApiRes.message || "created or notcreated")
           }
       
        } catch (error) {
            alert("something")
        }

    }
    useEffect(() => {
        if (foundOtpMatch) {
            matchOtphandler()
        }
    }, [foundOtpMatch])
    return (
        <>
            <div className="tab-panel" id="pills-register">
                <form onSubmit={(e) => handleSubmitRegister(e)}>
                    <div className="grid-container">
                        {!foundOtpMatch ? (<>
                            <div className="grid-item">
                                {/* <!-- Username input --> */}
                                <label className="form-label" htmlFor="registerUsername">Username</label>
                                <div className="form-outline">
                                    <input type="text" id="registerUsername" onChange={(e) => setUsername(e.target.value)} className="form-control" />

                                </div>
                            </div>
                            <div className="grid-item">
                                {/* <!-- Email input --> */}
                                <label className="form-label" htmlFor="registerEmail">Email</label>
                                <div className="form-outline">
                                    <input type="email" id="registerEmail" onChange={(e) => setUserEmail(e.target.value)} className="form-control" />
                                </div>
                            </div>

                            <div className="grid-item">
                                <label className="form-label" htmlFor="registerphone">Phone Number</label>
                                <div className="form-outline">
                                    <input type="text" minLength={10} maxLength={10} onChange={(e) => setUserPhone(e.target.value)} id="registerphone" className="form-control" />
                                </div>
                            </div>
                            <div className="grid-item">
                                {/* <label className="form-label" htmlFor="registerEmail">Email</label> */}
                                <div className="form-outline roundBorder">
                                    {/* <button type="button" className="btn btn-link" data-mdb-ripple-color="dark">Send Otp</button> */}
                                    <button type="button" className="btn btn-info roundBorder" onClick={handleOtpMatch}>Send Otp</button>
                                </div>
                            </div>

                        </>
                        ) : (
                            <>


                                <div className="grid-item">
                                    <label className="form-label" htmlFor="EmailOtp">Your OTP is send on {useremail}</label>
                                </div>
                                <div className="grid-item">
                                    <label className="form-label" htmlFor="OTPINPUT">EnterOTP :</label>
                                    <div className="form-outline">
                                        <input type="Number" id="OTPINPUT" className="form-control" onChange={(e) => setUserOTP(e.target.value)} />

                                    </div>
                                </div>

                                <div className="grid-item">
                                    <label className="form-label" htmlFor="registerPassword"
                                    >Password</label>
                                    <div className="form-outline">
                                        <input type="password" onChange={(e) => setUserPassword(e.target.value)} id="registerPassword" className="form-control" />
                                    </div>
                                </div>
                                <div className="grid-item">

                                    <label className="form-label" htmlFor="registerRepeatPassword">Repeat password</label>
                                    <div className="form-outline">
                                        <input type="password" id="registerRepeatPassword" onChange={(e) => setUserReapetPassword(e.target.value)} className="form-control" />
                                    </div>
                                </div>

                            </>
                        )}

                    </div>


                    {/* <!-- Checkbox --> */}


                    {/* <!-- Submit button --> */}

                    {foundOtpMatch ?
                        (
                            <>
                                <div className="form-check mt-4">
                                    <input type="checkbox" checked />
                                    <label >
                                        I have read and agree to the terms
                                    </label>
                                </div>
                                <button type="submit" onClick={handleSubmitRegister} className="btn btn-primary btn-block mb-3">Sign in</button>
                            </>

                        )
                        : null}

                </form>
            </div>
        </>
    )
}