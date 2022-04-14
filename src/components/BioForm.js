import { useState } from "react"
import { getCredentialsChallenge } from "../api/helpersBioAuth/getCredentialsChallenge"
import preformatMakeCredReq from "./utils/preformatMakeCredReq"
import createBioKey from "./utils/createBioKey"
import saveCreatedCreds from "../api/helpersBioAuth/saveCreatedCreds"
import { saveKey } from "../api/helper"

const BioForm = () => {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")

  const getResult = async () => {
    const bioAwailable = window.PublicKeyCredential
    console.log(bioAwailable)
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
        saveKey(generatedBrowserCreds)
        const creds = {
          userInfoforSession: userName,
          data: generatedBrowserCreds,
        }
        saveCreatedCreds(creds)
      } catch (error) {
        alert(JSON.stringify(error.message))
        console.log(error)
      }
    } else alert(JSON.stringify(res.message))
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
