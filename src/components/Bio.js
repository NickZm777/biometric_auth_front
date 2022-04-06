import { saveKey } from "../api/helper"
import { useState } from "react"

// import { decode } from "base64url"
// import { encode } from "base64url"
// import { saveKey } from "../api/helperAuth"

// // const base64urlDecode = decode.base64urlDecode
// // const base64urlEncode = encode.base64urlEncode

// const device = {
//   _id: "1111",
//   challenge: "asdfasjdfh;asdhg",
//   counter: 1,
//   publicKey: "",
//   attestationObject: "",
//   clientDataJSON: "",
//   userAgent: "",
//   user: {
//     id: "345235423542354",
//     email: "lasdf@sdfg.dsf",
//     fullName: "KIUHdfsf",
//   },
// }

// const challenge = device.challenge
// const user = device.user

// const createAttestation = async () => {
//   const attestation = await navigator.credentials.create({
//     publicKey: {
//       authenticatorSelection: {
//         authenticatorAttachment: "platform",
//         userVerification: "required",
//       },
//       challenge: challenge,
//       rp: { id: document.domain, name: "My Acme Inc" },
//       user: {
//         id: user.id,
//         name: user.email,
//         displayName: user.fullName,
//       },
//       pubKeyCredParams: [
//         { type: "public-key", alg: -7 },
//         { type: "public-key", alg: -257 },
//       ],
//     },
//   })
//   navigator.credentials.preventSilentAccess()
//   return attestation
// }

// const attestation = createAttestation()

// function publicKeyCredentialToJSON(pubKeyCred) {
//   if (pubKeyCred instanceof ArrayBuffer) {
//     return pubKeyCred
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
// const webAuthnAttestation = publicKeyCredentialToJSON(attestation)

const Bio = () => {
  const [inf, setInf] = useState("")
  const createKey = (att) => {
    if (!window.PublicKeyCredential) {
      console.log("window.PublicKeyCredential is false")
      return
    }
    console.log(document.domain)

    var publicKey = {
      challenge: new Uint8Array([21, 31, 105]),

      rp: { id: document.domain, name: "My Acme Inc" },

      user: {
        id: Uint8Array.from(
          window.atob("MIIBkzCCATigAwIBAjCCAZMwggE4oAMCAQIwggGTMII="),
          (c) => c.charCodeAt(0)
        ),
        name: "alex.mueller@example.com",
        displayName: "Alex Müller",
      },

      pubKeyCredParams: [
        {
          type: "public-key",
          alg: -7,
        },
        {
          type: "public-key",
          alg: -257,
        },
      ],

      // authenticatorSelection: {
      //   userVerification: "preferred",
      // },
      authenticatorSelection: {
        authenticatorAttachment: "platform",
        userVerification: "required",
      },

      timeout: 36000,
      excludeCredentials: [
        {
          id: Uint8Array.from(
            window.atob("ufJWp8YGlibm1Kd9XQBWN1WAw2jy5In2Xhon9HAqcXE="),
            (c) => c.charCodeAt(0)
          ),
          type: "public-key",
        },
        {
          id: Uint8Array.from(
            window.atob("E/e1dhZc++mIsz4f9hb6NifAzJpF1V4mEtRlIPBiWdY="),
            (c) => c.charCodeAt(0)
          ),
          type: "public-key",
        },
      ],

      // extensions: { appidExclude: "https://acme.example.com" },
    }

    navigator.credentials
      .create({ publicKey })
      .then(function (newCredentialInfo) {
        saveKey(newCredentialInfo)
        setInf(newCredentialInfo)
      })
      .catch(function (err) {
        console.log("Catch an error in navigator.credentials create:")
        console.log(err.message)
      })
  }
  return (
    <div>
      <button className="btn-bio" onClick={() => createKey()}>
        Touch ID
      </button>
      <div>{JSON.stringify(inf)}</div>
    </div>
  )
}

export default Bio
