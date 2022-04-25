/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getCreateOptions } from "../../api/helpersBioAuth/getCreateOptions"
import preformatMakeCredReq from "../../utils/preformatMakeCredReq"
import callBrowserApiCreate from "../../utils/callBrowserApiCreate"

import saveCreatedCreds from "../../api/helpersBioAuth/saveCreatedCreds"

import { saveKey } from "../../api/helper"
import publicKeyCredentialToJSON from "../../utils/publicKeyCredentialToJSON"

const BioRegisterForm = () => {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [registerError, setRegisterError] = useState(false)

  const createBioKey = async () => {
    setRegisterSuccess(false)
    setRegisterError(false)
    const res = await getCreateOptions({
      userName: userName,
      name: name,
    })
    if (res.status === "success") {
      const publicKey = preformatMakeCredReq(res.data)
      console.log(publicKey)
      try {
        const browserKey = await callBrowserApiCreate(publicKey)
        // alert(JSON.stringify(generatedBrowserCreds))
        // console.log(generatedBrowserCreds)
        // saveKey(generatedBrowserCreds)
        const creds = {
          userInfoforSession: userName,
          data: browserKey,
        }
        const createdRes = await saveCreatedCreds(creds)
        if (createdRes.status === "success") {
          setRegisterSuccess(true)
        } else setRegisterError(createdRes.message)
      } catch (error) {
        alert(`catch in Bioform:  ${error.message}`)
        console.log(error)
        setRegisterError(`catch in Bioform:  ${error.message}`)
      }
    } else {
      alert(`else in getCreateOptions: ${res.message}`)
      setRegisterError(`else in getCreateOptions: ${res.message}`)
    }
  }

  return (
    <>
      {!registerSuccess && !registerError && (
        <div>
          <h1>Registration</h1>
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                console.log("username:", userName)
                console.log("name:", name)
                createBioKey()
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
      )}
      {registerSuccess && (
        <h1 className="loginSuccess">{`${userName}, you are successfully registered`}</h1>
      )}
      {registerError && (
        <>
          <h1 className="loginError">{`Login failure`}</h1>
          <div className="loginErrorMessage">{registerError}</div>
        </>
      )}
    </>
  )
}

export default BioRegisterForm

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
