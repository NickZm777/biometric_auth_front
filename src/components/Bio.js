import { saveKey, getInitChallenge } from "../api/helper"
import { useState } from "react"
// import { uuid } from "uuidv4"
// import { base64urlEncode } from "base64url"

const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer)
}

const encode = (string) => {
  return new TextEncoder().encode(string)
}

const convertBuffer = (obj) => {
  const convObj = {
    id: obj.id,
    type: obj.type,
    rawIdAtob: window.atob(obj.rawId),
    rawIdBuffer8: decode(obj.rawId, "utf-8"),
    rawIdBuffer103: decode(obj.rawId, "utf-103"),
    response: {
      attestationObjectAtob: window.atob(obj.response.attestationObject),
      attestationObjectBuffer8: decode(obj.response.attestationObject, "utf-8"),
      attestationObjectBuffer265: decode(
        obj.response.attestationObject,
        "utf-265"
      ),
      clientDataJSONAtob: JSON.parse(window.atob(obj.response.clientDataJSON)),
      clientDataJSONBuffer: JSON.parse(
        decode(obj.response.clientDataJSON, "utf-266")
      ),
    },
  }
  return convObj
}

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
    return window.atob(pubKeyCred)
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

function pubJSON(obj) {
  if (obj instanceof ArrayBuffer) {
    return "ArrayBuffer"
  } else if (obj instanceof Array) {
    return obj.map(pubJSON)
  } else if (obj instanceof Object) {
    return "Object"
  } else return "else"
}

const domain = document.domain
const newChallenge = new Uint8Array([21, 31, 105])
const iserID = new Uint8Array([21, 31, 105])

const Bio = () => {
  const [inf, setInf] = useState("")
  const [getinf, setGetInf] = useState("")
  const [getinff, setGetInff] = useState("")
  const [getinfff, setGetInfff] = useState("")
  // const [buffer, setBuffer] = useState("")
  const [initChallenge, setInitChallenge] = useState("")
  const [dec, setDec] = useState("")
  const [jsonc, setJsonc] = useState("")
  const [tls, sc] = useState("")

  const publicKey = {
    challenge: initChallenge,
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
    console.log(publicKey.challenge)

    await navigator.credentials
      .create({ publicKey })
      .then((output) => {
        // const keyres = publicKeyCredentialToJSON(output)
        // const keyres = convertBuffer(output)
        // saveKey(keyres)
        // setInf(keyres)
        saveKey(output)
        setInf(output)
        // try {
        //   const convertedKeyRes = convertBuffer(keyres)
        //   saveKey("err in try")
        //   setInf({ err: "err in try" })
        //   setInf(convertedKeyRes)
        // } catch (e) {
        //   saveKey("err in try")
        //   setInf({ err: "err in try" })
        // }
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
      <div>{JSON.stringify(inf)}</div>
      <button className="btn-bio" onClick={() => trykeyforCheck(inf)}>
        check by Touch IDE
      </button>
      <button className="btn-bio" onClick={() => getStartChallenge()}>
        initChallenge
      </button>
      <div>{JSON.stringify(getinf)}</div>
      <div>{JSON.stringify(getinff)}</div>
      <div>{JSON.stringify(getinfff)}</div>

      <span>challenge:</span>
      <span>{JSON.stringify(initChallenge)}</span>
      <button className="btn-bio" onClick={() => setDec(convertBuffer(inf))}>
        dec
      </button>
      <div>{JSON.stringify(dec)}</div>

      <button
        className="btn-bio"
        onClick={() => setJsonc(publicKeyCredentialToJSON(inf))}
      >
        jsonc
      </button>
      <div>{JSON.stringify(jsonc)}</div>
      <button className="btn-bio" onClick={() => sc(pubJSON(inf))}>
        jsonc
      </button>
      <div>{JSON.stringify(tls)}</div>
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
