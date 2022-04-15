/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getCredentialsChallenge } from "../api/helpersBioAuth/getCredentialsChallenge"
import { getCredentialsChallengeforVerify } from "../api/helpersBioAuth/getCredentialsChallengeforVerify"
import preformatMakeCredReq from "./utils/preformatMakeCredReq"
import preformatVerificationCredReq from "./utils/preformatVerificationCredReq"
import createBioKey from "./utils/createBioKey"
import verifyBioKey from "./utils/verifyBioKey"
import saveCreatedCreds from "../api/helpersBioAuth/saveCreatedCreds"
import saveVerifiedCreds from "../api/helpersBioAuth/saveVerifiedCreds"
import { saveKey } from "../api/helper"

const BioForm = () => {
  const [tryVerify, setTryVerify] = useState(true)
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [userNameforVerify, setUserNameforVerify] = useState("")
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

  const getVerifyResult = async () => {
    const bioAwailable = window.PublicKeyCredential
    if (!bioAwailable) {
      alert("PublicKeyCredentials are disabled on your device")
      return
    }
    const res = await getCredentialsChallengeforVerify(userNameforVerify)
    if (res.status === "success" && bioAwailable) {
      const publicKey = preformatVerificationCredReq(res.data, document.domain)
      console.log(publicKey)
      try {
        const generatedBrowserCreds = await verifyBioKey(publicKey)
        // alert(JSON.stringify(generatedBrowserCreds))
        // console.log(generatedBrowserCreds)
        // saveKey(generatedBrowserCreds)
        const creds = {
          userInfoforSession: userNameforVerify,
          data: generatedBrowserCreds,
        }
        saveVerifiedCreds(creds)
      } catch (error) {
        alert(`catch in Bioform verifyBioKey:  ${error.message}`)
        console.log(error)
      }
    } else
      alert(`else in Bioform getCredentialsChallengeforVerify: ${res.message}`)
  }

  const getResult = async () => {
    const bioAwailable = window.PublicKeyCredential
    if (!bioAwailable) {
      alert("PublicKeyCredentials are disabled on your device")
      return
    }
    const res = await getCredentialsChallenge({
      userName: userName,
      name: name,
    })
    if (res.status === "success" && bioAwailable) {
      const publicKey = preformatMakeCredReq(res.data)
      console.log(publicKey)
      try {
        const generatedBrowserCreds = await createBioKey(publicKey)
        // alert(JSON.stringify(generatedBrowserCreds))
        // console.log(generatedBrowserCreds)
        // saveKey(generatedBrowserCreds)
        const creds = {
          userInfoforSession: userName,
          data: generatedBrowserCreds,
        }
        saveCreatedCreds(creds)
      } catch (error) {
        alert(`catch in Bioform:  ${error.message}`)
        console.log(error)
      }
    } else alert(`else in Bioform: ${res.message}`)
  }

  return (
    <>
      <button onClick={() => setTryVerify((flag) => !flag)}>
        {`Go to ${tryVerify ? "verify" : "register"}`}
      </button>
      {tryVerify ? (
        <>
          <div>
            <h1>Enter</h1>
            <div className="form">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  console.log("username:", userName)
                  console.log("name:", name)
                  getResult()
                }}
              >
                <label>Name</label>
                <input
                  className="form-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>User Name</label>
                <input
                  className="form-input"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input className="form-submit" type="submit" value="submit" />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1>Verify</h1>
            <div className="form">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  getVerifyResult()
                }}
              >
                <label>Enter user name for verify</label>
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
        </>
      )}
    </>
  )
}

export default BioForm
