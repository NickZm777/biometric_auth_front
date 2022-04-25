/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getVerificationOptions } from "../../api/helpersBioAuth/getVerificationOptions"
import preformatVerificationCredReq from "../../utils/preformatVerificationCredReq"
import callBrowserApiGet from "../../utils/callBrowserApiGet"
import sendCredsForVerification from "../../api/helpersBioAuth/sendCredsForVerification"
import { saveKey } from "../../api/helper"

const BioLoginForm = () => {
  const [userNameforVerify, setUserNameforVerify] = useState("")
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginError, setLoginError] = useState(false)

  const verifyBioKey = async () => {
    setLoginSuccess(false)
    setLoginError(false)
    const res = await getVerificationOptions(userNameforVerify)
    if (res.status === "success") {
      const publicKey = preformatVerificationCredReq(res.data, document.domain)
      try {
        const generatedBrowserCreds = await callBrowserApiGet({ publicKey })
        // alert(JSON.stringify(generatedBrowserCreds))
        // console.log(generatedBrowserCreds)
        // saveKey(generatedBrowserCreds)
        console.log(publicKey)
        const creds = {
          userInfoforSession: userNameforVerify,
          data: generatedBrowserCreds,
        }
        const verifiedRes = await sendCredsForVerification(creds)
        alert(JSON.stringify(verifiedRes))
        if (verifiedRes.status === "success") {
          setLoginSuccess(true)
        } else {
          setLoginError(verifiedRes.message)
        }
      } catch (error) {
        alert(`catch in Bioform verifyBioKey:  ${error.message}`)
        console.log(error)
        setLoginError(`catch in Bioform verifyBioKey:  ${error.message}`)
      }
    } else {
      alert(`else in Bioform getVerificationOptions: ${res.message}`)
      setLoginError(`else in Bioform getVerificationOptions: ${res.message}`)
    }
  }

  return (
    <>
      {!loginSuccess && !loginError && (
        <div>
          <h1>Log in</h1>
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                verifyBioKey()
              }}
            >
              <label>Enter username</label>
              <input
                className="form-input"
                type="text"
                value={userNameforVerify}
                onChange={(e) => setUserNameforVerify(e.target.value)}
              />
              <input className="form-submit" type="submit" value="verify" />
            </form>
          </div>
        </div>
      )}
      {loginSuccess && (
        <h1 className="loginSuccess">{`${userNameforVerify}, you are successfully logined`}</h1>
      )}
      {loginError && (
        <>
          <h1 className="loginError">{`Login failure`}</h1>
          <div className="loginErrorMessage">{loginError}</div>
        </>
      )}
    </>
  )
}

export default BioLoginForm

// const fakeRegisterCreds = {
//   userInfoforSession: userName,
//   data: {
//     rawId: "XtGy+6wkQM6cAl3OtQSJGyx3Dh0=",
//     response: {
//       attestationObject:
//         "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YViYNeLDO3AtFqklDPw3YMTxKfJjZ/9QJCVSkccHII6uWjZFAAAAAAAAAAAAAAAAAAAAAAAAAAAAFF7RsvusJEDOnAJdzrUEiRssdw4dpQECAyYgASFYIKK7R1HP9XvbESTWWy5GwkZbjCSQMC6pCU3C2s9Dl/LpIlggetvHRhnIHLL2v9nnGJ9NnLKeg70LslqlTuSxxBGc8kI=",
//       clientDataJSON:
//         "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiY21GdVpHOXRZMmhoYkd4bGJtZGxabkp2YldkbGJtVnlZWFJsVTJWeWRtVnlUV0ZyWlVOeVpXUlNaWEYxWlhOMCIsIm9yaWdpbiI6Imh0dHBzOi8vamFkZS1icmlvY2hlLTdjMzNmZC5uZXRsaWZ5LmFwcCJ9",
//     },
//     getClientExtensionResults: {},
//     id: "XtGy-6wkQM6cAl3OtQSJGyx3Dh0",
//     type: "public-key",
//   },
// }
