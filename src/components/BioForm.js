import { useState } from "react"
import { getCredentialsChallenge } from "../api/helpersBioAuth/getCredentialsChallenge"

const BioForm = () => {
  const [name, setName] = useState("")
  const [userName, setUserName] = useState("")

  const getResult = async () => {
    const res = await getCredentialsChallenge({
      userName: userName,
      name: name,
    })
    alert(JSON.stringify(res))
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
