/* eslint-disable no-unused-vars */
import { saveKey, getInitChallenge, saveBuffer } from "../api/helper"
import { useState } from "react"
import publicKeyCredentialToJSON from "../components/utils/publicKeyCredentialToJSON"

// const nchallenge = require("crypto").randomBytes(16).toString("hex")

const getInfo = async () => {
  await navigator.credentials
    .get({
      publicKey: {
        challenge: new TextEncoder().encode(
          "randomchallengefromgenerateServerVerificationCredRequest"
        ),
        rpId: document.domain,
        allowCredentials: [
          {
            type: "public-key",
            id: new TextEncoder().encode("string"),
            transports: ["internal"],
          },
        ],
        userVerification: "required",
        // userVerification: "preferred",
        timeout: 60000,

        // authenticatorSelection: {
        //   authenticatorAttachment: "platform",
        //   userVerification: "required",
        // },
      },
    })
    .then((output) => {
      saveKey(output)
      const a = publicKeyCredentialToJSON(output)
      saveKey(a)
    })
    .catch((error) => {
      alert(`Catch an error in navigator.credentials get: ${error.message}`)
      console.log(error.message)
    })
}

const getInfoTwice = async () => {
  await navigator.credentials
    .get({
      publicKey: {
        challenge: new TextEncoder().encode(
          "randomchallengefromgenerateServerVerificationCredRequest"
        ),
        rpId: document.domain,
        allowCredentials: [
          {
            type: "public-key",
            id: new TextEncoder().encode("string"),
            // transports: ["internal"],
          },
        ],
        userVerification: "required",
        // userVerification: "preferred",
        timeout: 60000,

        // authenticatorSelection: {
        //   authenticatorAttachment: "platform",
        //   userVerification: "required",
        // },
      },
    })
    .then((output) => {
      saveKey(output)
      const a = publicKeyCredentialToJSON(output)
      saveKey(a)
    })
    .catch((error) => {
      alert(`Catch an error in navigator.credentials get: ${error.message}`)
      console.log(error.message)
    })
}

const getInfoThree = async () => {
  document.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
    .then(function (available) {
      alert(JSON.stringify(available))
    })
    .catch(function (err) {
      // Something went wrong
      alert(err.message)
    })
  await navigator.credentials
    .get({
      publicKey: {
        challenge: new TextEncoder().encode(
          "randomchallengefromgenerateServerVerificationCredRequest"
        ),
        rpId: document.domain,
        allowCredentials: [
          {
            type: "public-key",
            id: new TextEncoder().encode("string"),
            transports: ["internal"],
          },
        ],
        userVerification: "required",
        // userVerification: "preferred",

        // authenticatorSelection: {
        //   authenticatorAttachment: "platform",
        //   userVerification: "required",
        // },
      },
    })
    .then((output) => {
      saveKey(output)
      const a = publicKeyCredentialToJSON(output)
      saveKey(a)
    })
    .catch((error) => {
      alert(`Catch an error in navigator.credentials get: ${error.message}`)
      console.log(error.message)
    })
}

const Bio2 = ({ changeForm }) => {
  return (
    <div className="buttonBox">
      <button className="btn-bio" onClick={() => getInfo()}>
        internalreq
      </button>

      <button className="btn-bio" onClick={() => getInfoTwice()}>
        required
      </button>
      <button className="btn-bio" onClick={() => getInfoThree()}>
        internal
      </button>

      <button className="btn-sw" onClick={() => changeForm()}>
        switch
      </button>
    </div>
  )
}

export default Bio2
