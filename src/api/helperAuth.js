import { BASE_URL, EXPRESS_URL } from "./helper"
// import { decode } from "base64url"
// import { encode } from "base64url"

// const base64urlDecode = decode.base64urlDecode
// const base64urlEncode = encode.base64urlEncode

const BIO_URL = `${BASE_URL}/${EXPRESS_URL}/save`

export const saveKey = async (requestData) => {
  const data = requestData
  try {
    const response = await fetch(BIO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    })
    const res = await response.json()
    return res
  } catch (e) {
    console.error(e)
  }
}

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

// const attestation = await navigator.credentials.create({
//   publicKey: {
//     authenticatorSelection: {
//       authenticatorAttachment: "platform",
//       userVerification: "required",
//     },
//     challenge: base64urlDecode(challenge),
//     rp: { id: document.domain, name: "My Acme Inc" },
//     user: {
//       id: base64urlDecode(user.id),
//       name: user.email,
//       displayName: user.fullName,
//     },
//     pubKeyCredParams: [
//       { type: "public-key", alg: -7 },
//       { type: "public-key", alg: -257 },
//     ],
//   },
// })
// navigator.credentials.preventSilentAccess()

// function publicKeyCredentialToJSON(pubKeyCred) {
//   if (pubKeyCred instanceof ArrayBuffer) {
//     return base64urlEncode(pubKeyCred)
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

// ----------------------------------------------------------------------------------------------------------------

// import { decode } from "base64url"
// import { encode } from "base64url"

// const base64urlDecode = decode.base64urlDecode
// const base64urlEncode = encode.base64urlEncode
// const attestation = await navigator.credentials.create({
//   publicKey: {
//     authenticatorSelection: {
//       authenticatorAttachment: "platform",
//       userVerification: "required",
//     },
//     challenge: base64urlDecode(challenge),
//     rp: { id: document.domain, name: "My Acme Inc" },
//     user: {
//       id: base64urlDecode(user.id),
//       name: user.email,
//       displayName: user.fullName,
//     },
//     pubKeyCredParams: [
//       { type: "public-key", alg: -7 },
//       { type: "public-key", alg: -257 },
//     ],
//   },
// })
// navigator.credentials.preventSilentAccess()

// function publicKeyCredentialToJSON(pubKeyCred) {
//   if (pubKeyCred instanceof ArrayBuffer) {
//     return base64urlEncode(pubKeyCred)
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
// fetch("example.com/save-public-key", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: webAuthnAttestation,
// })
