/* eslint-disable no-unused-vars */
import { saveKey, getInitChallenge, saveBuffer } from "../api/helper"
import { useState } from "react"
const base64 = require("base-64")

// import { uuid } from "uuidv4"
// import { base64urlEncode } from "base64url"

const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer)
}

const encode = (string) => {
  return new TextEncoder().encode(string)
}

const keyforCheck = async (credential) => {
  return await navigator.credentials.get({
    publicKey: {
      challenge: null,
      allowCredentials: [
        {
          id: credential.rawId,
          type: "public-key",
          transports: ["internal"],
        },
      ],
      rpId: domain,
      // attachment: "platform",
      userVerification: "required",
    },
  })
}

function arrayBufferToBase64(ab) {
  var dView = new Uint8Array(ab) //Get a byte view

  var arr = Array.prototype.slice.call(dView) //Create a normal array

  var arr1 = arr.map(function (item) {
    return String.fromCharCode(item) //Convert
  })

  return window.btoa(arr1.join("")) //Form a string
}

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof ArrayBuffer) {
    return arrayBufferToBase64(pubKeyCred)
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

const domain = document.domain

const iserID = new Uint8Array([21, 31, 105])

const Bio2 = () => {
  const [inf, setInf] = useState("")
  const [getinf, setGetInf] = useState("")
  const [getinff, setGetInff] = useState("")
  const [getinfff, setGetInfff] = useState("")
  // const [buffer, setBuffer] = useState("")
  const [initChallenge, setInitChallenge] = useState("")

  const publicKey = {
    challenge: null,
    rp: { id: domain, name: "My test TouchID" },
    user: {
      id: iserID,
      name: "jason.x@.pl",
      displayName: "Jason X",
    },
    pubKeyCredParams: [
      {
        type: "public-key",
        alg: -7,
      },
    ],
    // authenticatorSelection: {
    //   authenticatorAttachment: "platform",
    //   userVerification: "required",
    // },
    attestation: "direct",
  }

  const createKey = async () => {
    if (!window.PublicKeyCredential) {
      alert("window.PublicKeyCredential is false")
      return
    }
    const serverChallengeString = await getInitChallenge()
    publicKey.challenge = encode(serverChallengeString)

    await navigator.credentials
      .create({ publicKey })
      .then((output) => {
        const keyres = publicKeyCredentialToJSON(output)
        saveKey(keyres)
        setInf(keyres)
      })
      .catch((error) => {
        alert("Catch an error in navigator.credentials create:", error.message)
        setInf(error.message)
      })
  }
  const trykeyforCheck = (inf) => {
    keyforCheck(inf)
      .then((output) => {
        // const keyres = publicKeyCredentialToJSON(output)
        saveKey(output)
        setGetInf(output)
        setGetInff(typeof output)
      })
      .catch((error) => {
        alert("Catch an error in navigator.credentials create:", error.message)
      })
  }

  const getStartChallenge = () => {
    getInitChallenge()
      .then((res) => {
        setInitChallenge(res)
        // console.log(JSON.stringify(newChallenge) === JSON.stringify(res))
        return res
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  return (
    <div>
      <button className="btn-bio" onClick={() => createKey()}>
        Touch ID
      </button>
      <div className="inf-bio">{JSON.stringify(inf)}</div>
      <button className="btn-bio" onClick={() => trykeyforCheck(inf)}>
        check by Touch IDE
      </button>
      <button className="btn-bio" onClick={() => getStartChallenge()}>
        initChallenge
      </button>
      <div className="inf-bio">{JSON.stringify(getinf)}</div>
      <div className="inf-bio">{JSON.stringify(getinff)}</div>
      <div className="inf-bio">{JSON.stringify(getinfff)}</div>

      {/* <span>challenge:</span>
      <span>{JSON.stringify(initChallenge)}</span> */}
    </div>
  )
}

// const encodedData = window.btoa("Hello, world")
// const decodedData = window.atob(encodedData)

export default Bio2

// const igorid = {
//   rawId: {},
//   response: {
//     attestationObject: {},
//     getAuthenticatorData: {},
//     getPublicKey: {},
//     getPublicKeyAlgorithm: {},
//     getTransports: {},
//     clientDataJSON: {},
//   },
//   authenticatorAttachment: "platform",
//   getClientExtensionResults: {},
//   id: "AafxvzWERrz7_y0y0OZ4kHFOh8zLSDJNsloOAkkfK_AVX_2gSx5EgmNrqQxyDYW-MLVrWcy_2DjXm0OVvWYAYy4BTl5Z-yX4geLkh35hCg1b14gO_ruBYwRkON8KK-REausbjzYO2UU",
//   type: "public-key",
// }
