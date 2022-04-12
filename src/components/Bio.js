/* eslint-disable no-unused-vars */
import { saveKey, getInitChallenge, saveBuffer } from "../api/helper"
import { useState } from "react"
const base64 = require("base-64")

// import { uuid } from "uuidv4"
// import { base64urlEncode } from "base64url"

const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer, { ignoreBOM: true })
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

// function publicKeyCredentialToJSON(pubKeyCred) {
//   if (pubKeyCred instanceof ArrayBuffer) {
//     return window.atob(pubKeyCred)
//   } else if (pubKeyCred instanceof Array) {
//     return pubKeyCred.map(publicKeyCredentialToJSON)
//   } else if (pubKeyCred instanceof Object) {
//     const obj = {}
//     for (let key in pubKeyCred) {
//       obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
//     }
//     return obj
//   } else return pubKeyCred
// }

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof ArrayBuffer) {
    return base64.encode(pubKeyCred)
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

const Bio = () => {
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
    const serverChallengeString = await getInitChallenge()
    publicKey.challenge = encode(serverChallengeString)
    // publicKey.challenge = Uint8Array.from(serverChallengeString);

    await navigator.credentials
      .create({ publicKey })
      .then((output) => {
        saveBuffer(output)
        const keyres = publicKeyCredentialToJSON(output)
        // const keyres = convertBuffer(output)
        saveKey(keyres)
        setInf(keyres)
      })
      .catch((error) => {
        console.log("Catch an error in navigator.credentials create:")
        console.log(error.message)
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
        console.log("Catch an error in navigator.credentials create:")
        console.log(error.message)
        setGetInfff({
          message: "Catch an error in navigator.credentials create:",
          error: error,
        })
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

export default Bio

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
