/* eslint-disable no-unused-vars */
import { saveKey, saveBuffer } from "../api/helper"
import { useState } from "react"
// import { uuid } from "uuidv4"
// import { base64urlEncode } from "base64url"

const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer)
}

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof ArrayBuffer) {
    return decode(pubKeyCred, "utf-8")
  } else if (pubKeyCred instanceof Array) {
    return pubKeyCred.map(publicKeyCredentialToJSON)
  } else if (pubKeyCred instanceof Object) {
    const obj = {}
    for (let key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
    }
    return obj
  } else return pubKeyCred
}

const Bio3 = () => {
  const [inf, setInf] = useState("")

  const createKey = async () => {
    if (!window.PublicKeyCredential) {
      console.log("window.PublicKeyCredential is false")
      return
    }
    const challenge = "Bio2challenge"

    var randomChallengeBuffer = new Uint8Array(32)
    window.crypto.getRandomValues(randomChallengeBuffer)

    var base64id = "MIIBkzCCATigAwIBAjCCAZMwggE4oAMCAQIwggGTMII="
    var idBuffer = Uint8Array.from(window.atob(base64id), (c) =>
      c.charCodeAt(0)
    )

    var publicKey = {
      challenge: randomChallengeBuffer,

      rp: { name: "FIDO Example Corporation" },

      user: {
        id: idBuffer,
        name: "alice@example.com",
        displayName: "Alice von Wunderland",
      },

      attestation: "direct",

      pubKeyCredParams: [
        { type: "public-key", alg: -7 }, // ES256
        { type: "public-key", alg: -257 }, // RS256
      ],
    }

    navigator.credentials
      .create({ publicKey })
      .then((newCredentialInfo) => {
        console.log("SUCCESS", newCredentialInfo)
        // saveBuffer({
        //   buffertype: "window.btoa(challenge)-Bio3;",
        //   output: newCredentialInfo,
        // })
        const cccc = publicKeyCredentialToJSON(newCredentialInfo)
        saveKey(cccc)
        setInf(cccc)
      })
      .catch((error) => {
        console.log("FAIL", error)
        setInf(error.message)
      })
  }

  return (
    <div>
      <button className="btn-bio" onClick={() => createKey()}>
        Bio3
      </button>
      <div className="inf-bio">{JSON.stringify(inf)}</div>
    </div>
  )
}

// const encodedData = window.btoa("Hello, world")
// const decodedData = window.atob(encodedData)

export default Bio3
