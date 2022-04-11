/* eslint-disable no-unused-vars */
import { saveKey, saveBuffer } from "../api/helper"
import { useState } from "react"
// import { uuid } from "uuidv4"
const base64 = require("base64url")
var CBOR = require("cbor-sync")

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
    // const obj = inf[3].output
    // console.log(window.atob(obj))
  }

  // function parseAttestationObject(attestationObject) {
  //   const buffer = base64.toBuffer(attestationObject)
  //   return CBOR.decode(buffer)[0]
  // }
  // console.log(
  //   parseAttestationObject(
  //     "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YVjszHUM-fXe8fPTc7IQdAU8xhonRmZeDznRqJqecdVRcUNFYfOzo63OAAI1vMYKZIsLJfHwVQMAaAGnedEs8u2RW_H-8HXzJhTtnVHUAfErTK2AW4Saa0wiSClXWyIjLPXQAEyjr1KaCn5soeutmbDtSeT0FLIvcijbpg0fmQ-MHrw2GZ8Ka8rRn-a5-sncsUELQWD0sEvLttxXVQcQah2vpQECAyYgASFYIMG7Y3fOeGecLpfn7XF_sV4OTc41tsbEPSECGfCiK480IlggH9-qVehm6Gj25SyZau17mB5c0YoTWBZ8ngdEka4EqOY"
  //   )
  // )

  const publicKey = {
    challenge: null,
    rp: { id: document.domain, name: "My test TouchID" },
    user: {
      id: Uint8Array.from("UZSL85T9AFC", (c) => c.charCodeAt(0)),
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

    publicKey.challenge = Uint8Array.from(challenge, (c) => c.charCodeAt(0))

    const credential = await navigator.credentials.create({
      publicKey: publicKey,
    })

    saveKey(credential)
    saveBuffer(credential)

    //   await navigator.credentials
    //     .create({ publicKey })
    //     .then((output) => {
    //       saveBuffer({
    //         buffertype: "cbor;",
    //         output: output.response.attestationObject,
    //       })
    //       // const keyres = publicKeyCredentialToJSON(output)
    //       // const keyres = convertBuffer(output)
    //       saveKey(output)
    //       setInf(output.response.attestationObject)
    //     })
    //     .catch((error) => {
    //       console.log("Catch an error in navigator.credentials create:")
    //       console.log(error.message)
    //       setInf(error.message)
    //     })
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
