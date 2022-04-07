import { saveKey } from "../api/helper"
import { useState } from "react"

const keyforCheck = async (credential) => {
  return await navigator.credentials.get({
    publicKey: {
      challenge: newChallenge,
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

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof ArrayBuffer) {
    return pubKeyCred
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
const newChallenge = new Uint8Array([21, 31, 105])
const iserID = new Uint8Array([21, 31, 105])

const publicKey = {
  challenge: newChallenge,

  rp: { id: domain, name: "My test TouchID" },

  user: {
    id: iserID,
    name: "alex.mueller@example.com",
    displayName: "Alex Müller",
  },

  pubKeyCredParams: [
    {
      type: "public-key",
      alg: -7,
    },
    // {
    //   type: "public-key",
    //   alg: -257,
    // },
  ],

  authenticatorSelection: {
    authenticatorAttachment: "platform",
    userVerification: "required",
  },

  // timeout: 36000,
  // excludeCredentials: [
  //   {
  //     id: Uint8Array.from(
  //       window.atob("ufJWp8YGlibm1Kd9XQBWN1WAw2jy5In2Xhon9HAqcXE="),
  //       (c) => c.charCodeAt(0)
  //     ),
  //     type: "public-key",
  //   },
  //   {
  //     id: Uint8Array.from(
  //       window.atob("E/e1dhZc++mIsz4f9hb6NifAzJpF1V4mEtRlIPBiWdY="),
  //       (c) => c.charCodeAt(0)
  //     ),
  //     type: "public-key",
  //   },
  // ],

  // extensions: { appidExclude: "https://acme.example.com" },
}

const Bio = () => {
  const [inf, setInf] = useState("")
  const [getinf, setGetInf] = useState("")
  const [getinff, setGetInff] = useState("")
  const [getinfff, setGetInfff] = useState("")
  // const [buffer, setBuffer] = useState("")

  const createKey = () => {
    if (!window.PublicKeyCredential) {
      console.log("window.PublicKeyCredential is false")
      return
    }
    console.log(document.domain)

    navigator.credentials
      .create({ publicKey })
      .then((output) => {
        const keyres = publicKeyCredentialToJSON(output)
        saveKey(keyres)
        setInf(keyres)
        // const buf = {

        // }
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

  return (
    <div>
      <button className="btn-bio" onClick={() => createKey()}>
        Touch ID
      </button>
      <div>{JSON.stringify(inf)}</div>
      <button className="btn-bio" onClick={() => trykeyforCheck(inf)}>
        check by Touch IDE
      </button>
      <div>{JSON.stringify(getinf)}</div>
      <div>{JSON.stringify(getinff)}</div>
      <div>{JSON.stringify(getinfff)}</div>
    </div>
  )
}

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
