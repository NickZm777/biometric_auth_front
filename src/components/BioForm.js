import { useState } from "react"
import { getCredentialsChallenge } from "../api/helpersBioAuth/getCredentialsChallenge"
import preformatMakeCredReq from "./utils/preformatMakeCredReq"

const BioForm = () => {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")

  const getResult = async () => {
    const res = await getCredentialsChallenge({
      userName: userName,
      name: name,
    })
    if (res.status === "success") {
      const publicKey = preformatMakeCredReq(res.data)
      console.log(publicKey)
      try {
        const generatedCreds = await navigator.credentials.create({ publicKey })
        alert(JSON.stringify(generatedCreds))
        console.log(generatedCreds)
      } catch (error) {
        alert(JSON.stringify(error))
        console.log(error)
      }
    } else alert(res.message)
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
