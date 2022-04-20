/* eslint-disable no-unused-vars */
import { saveKey, getInitChallenge, saveBuffer } from "../api/helper"
import { useEffect, useState } from "react"
import publicKeyCredentialToJSON from "../components/utils/publicKeyCredentialToJSON"

// const nchallenge = require("crypto").randomBytes(16).toString("hex")

const createCR = async () => {
  await navigator.credentials
    .create({
      publicKey: {
        challenge: new TextEncoder().encode("testChallenge"),

        rp: { name: "My test TouchID" },

        user: {
          id: new TextEncoder().encode("testID"),
          name: "test name",
          displayName: "test displayName",
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
      },
    })
    .then((output) => {
      const a = publicKeyCredentialToJSON(output)
      saveKey(a)
      alert(JSON.stringify(a))
    })
    .catch((error) => {
      alert(`testCreate: ${error.message}`)
      console.log(error.message)
    })
}

const getCR = async () => {
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
            id: new TextEncoder().encode("testID"),
            transports: ["internal"],
          },
        ],
        userVerification: "required",
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
  await navigator.credentials
    .get({
      publicKey: {
        // challenge: new TextEncoder().encode(
        //   "randomchallengefromgenerateServerVerificationCredRequest"
        // ),

        challenge: new TextEncoder().encode(
          "randomchallengefromgenerateServerVerificationCredRequest"
        ),

        rpId: document.domain,
        allowCredentials: [
          {
            type: "public-key",
            // id: new TextEncoder().encode("string"),
            id: "7TmwAXTpTKhuEaL6c3pttcGTIyg=",
            transports: ["internal"],
          },
        ],
        // userVerification: "required",
        // userVerification: "preferred",
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
  useEffect(() => {
    const element = document.getElementById("btn")
    element.addEventListener("click", getInfoThree)
  })
  return (
    <div className="buttonBox">
      <button className="btn-bio" onClick={() => createCR()}>
        Create
      </button>

      <button className="btn-bio" onClick={() => getCR()}>
        Get
      </button>
      <button className="btn-bio" id="btn">
        internal
      </button>

      <button className="btn-sw" onClick={() => changeForm()}>
        switch
      </button>
    </div>
  )
}

export default Bio2
