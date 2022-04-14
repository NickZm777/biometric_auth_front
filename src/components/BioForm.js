/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getCredentialsChallenge } from "../api/helpersBioAuth/getCredentialsChallenge"
import preformatMakeCredReq from "./utils/preformatMakeCredReq"
import createBioKey from "./utils/createBioKey"
import saveCreatedCreds from "../api/helpersBioAuth/saveCreatedCreds"
import { saveKey } from "../api/helper"

// const dataJ = {
//   userInfoforSession: "testUser",
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

const BioForm = () => {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")

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
            type="password"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input className="form-submit" type="submit" value="submit" />
        </form>
      </div>
    </div>
  )
}

export default BioForm
