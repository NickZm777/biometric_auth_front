/* eslint-disable no-unused-vars */
import { saveKey, saveBuffer } from "../api/helper"
import { useState } from "react"
// import { uuid } from "uuidv4"
const base64 = require("base64url")

const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer)
}

const url =
  "https://glowing-kringle-b3a3c5.netlify.app/.netlify/functions/api/keys"

const encode = (string) => {
  return new TextEncoder().encode(string)
}

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof ArrayBuffer) {
    return decode(pubKeyCred, "utf-8")
    // return base64.encode(pubKeyCred)
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

const Bio4 = () => {
  const [inf, setInf] = useState("")

  const getKeys = async () => {
    await fetch(url)
      .then((keys) => keys.json())
      .then((keys) => setInf(keys))
  }

  console.log(inf)

  const resparse = () => {
    const obj = inf[5].output
    console.log(publicKeyCredentialToJSON(obj))
  }

  const publicKey = {
    challenge: null,
    rp: { id: document.domain, name: "My test TouchID" },
    user: {
      id: new Uint8Array([21, 31, 105]),
      name: "jason.x@.pl",
      displayName: "Jason X",
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7,
      },
    ],
    authenticatorSelection: {
      authenticatorAttachment: "platform",
      userVerification: "required",
    },
  }

  const createKey = async () => {
    if (!window.PublicKeyCredential) {
      console.log("window.PublicKeyCredential is false")
      return
    }
    const challenge = "Bio4challenge"

    publicKey.challenge = encode(challenge)

    await navigator.credentials
      .create({ publicKey })
      .then((output) => {
        saveBuffer({
          buffertype: "base64url;",
          output: output.response.attestationObject,
        })
        // const keyres = publicKeyCredentialToJSON(output)
        // const keyres = convertBuffer(output)
        saveKey(output)
        setInf(output.response.attestationObject)
      })
      .catch((error) => {
        console.log("Catch an error in navigator.credentials create:")
        console.log(error.message)
        setInf(error.message)
      })
  }

  return (
    <div>
      <button className="btn-bio" onClick={() => createKey()}>
        Bio4
      </button>
      <div className="inf-bio">{JSON.stringify(inf)}</div>
      <button className="btn-bio" onClick={() => getKeys()}>
        get keys
      </button>
      <button className="btn-bio" onClick={() => resparse()}>
        parse keys
      </button>
    </div>
  )
}

// const encodedData = window.btoa("Hello, world")
// const decodedData = window.atob(encodedData)

export default Bio4
