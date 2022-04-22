/* eslint-disable no-unused-vars */
import { saveKey, getInitChallenge, saveBuffer } from "../api/helper"
import { useEffect, useState } from "react"
import publicKeyCredentialToJSON from "../components/utils/publicKeyCredentialToJSON"
import saveVerifiedCreds from "../api/helpersBioAuth/saveVerifiedCreds"

// const nchallenge = require("crypto").randomBytes(16).toString("hex")
let superID
let rawID

function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64)
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

const createCR = async () => {
  await navigator.credentials
    .create({
      // publicKey: {
      //   challenge: new TextEncoder().encode("testChallenge").buffer,

      //   rp: { name: "My test TouchID", id: document.domain },

      //   user: {
      //     id: new TextEncoder().encode("testID").buffer,
      //     name: "yuame",
      //     displayName: "test displaysdfsdfdsfdsName",
      //   },

      //   pubKeyCredParams: [
      //     {
      //       type: "public-key",
      //       alg: -7,
      //     },
      //   ],
      //   authenticatorSelectionCriteria: {
      //     attachment: "platform",
      //     userVerification: "required",
      //   },
      //   attestation: "direct",
      // },
      publicKey: {
        challenge: new TextEncoder().encode("testChasdfllenge").buffer,

        rp: { name: "My test TossuchID" },

        user: {
          id: new TextEncoder().encode("tesstID").buffer,
          name: "Radamel Tisco",
          displayName: "test displaysdfsdfdsfdsName",
        },

        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
        ],
        authenticatorSelectionCriteria: {
          attachment: "platform",
          userVerification: "required",
        },
        attestation: "direct",
      },
    })
    .then((output) => {
      const a = publicKeyCredentialToJSON(output)
      superID = base64ToArrayBuffer(a.rawId)
      // rawID = a.rawId
      // alert(rawID)
      // alert(JSON.stringify(a))
      // saveKey(a)
    })
    .catch((error) => {
      alert(`testCreate: ${error.message}`)
      console.log(error.message)
    })
}

const createCRI = async () => {
  await navigator.credentials
    .create({
      // publicKey: {
      //   challenge: new TextEncoder().encode("testChallenge").buffer,

      //   rp: { name: "My test fTouchID" },

      //   user: {
      //     id: new TextEncoder().encode("testID").buffer,
      //     name: "test name",
      //     displayName: "test displayName",
      //   },

      //   pubKeyCredParams: [
      //     {
      //       type: "public-key",
      //       alg: -7,
      //     },
      //   ],
      //   authenticatorSelectionCriteria: {
      //     attachment: "platform",
      //     userVerification: "required",
      //   },
      //   // attestation: "direct",
      // },
      publicKey: {
        challenge: new TextEncoder().encode("testChasdfllenge").buffer,

        rp: { name: "My test TossuchID", id: document.domain },

        user: {
          id: new TextEncoder().encode("tessdftID").buffer,
          name: "Radamel Gallardo",
          displayName: "test displaysdfsdfdsfdsName",
        },

        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
        ],
        authenticatorSelectionCriteria: {
          attachment: "platform",
          userVerification: "required",
        },
        attestation: "direct",
      },
    })
    .then((output) => {
      rawID = output.rawId
      const a = publicKeyCredentialToJSON(output)
      superID = a.id
      //   navigator.credentials
      //     .get({
      //       publicKey: {
      //         challenge: new TextEncoder().encode(
      //           "randomchallengefromgenerateServerVerificationCredRequest"
      //         ).buffer,
      //         rpId: document.domain,
      //         allowCredentials: [
      //           {
      //             type: "public-key",
      //             // id: new TextEncoder().encode().buffer,
      //             id: rawID,
      //             transports: ["internal"],
      //           },
      //         ],
      //         userVerification: "required",
      //         attestation: "direct",
      //       },
      //     })
      //     .then((output) => {
      //       alert(JSON.stringify(output));
      //       const a = publicKeyCredentialToJSON(output);
      //       alert(JSON.stringify(a));
      //     })
      //     .catch((error) => {
      //       alert(
      //         `Catch an error in navigator.credentials get: ${error.message}`
      //       );
      //       console.log(error.message);
      //     });
      //   saveKey(a);
    })
    .catch((error) => {
      alert(`testCreate: ${error.message}`)
      console.log(error.message)
    })
}

async function getCR(id) {
  // navigator.credentials
  //   .get({
  //     publicKey: {
  //       challenge: new TextEncoder().encode(
  //         "randomchallengefromgenerateServerVerificationCredRequest"
  //       ).buffer,
  //       rpId: document.domain,
  //       allowCredentials: [
  //         {
  //           type: "public-key",
  //           id: new TextEncoder().encode(id).buffer,
  //           transports: ["internal"],
  //         },
  //       ],
  //       userVerification: "required",
  //       attestation: "direct",
  //     },
  //   })
  //   .then((output) => {
  //     alert(JSON.stringify(output))
  //     const a = publicKeyCredentialToJSON(output)
  //     alert(JSON.stringify(a))
  //   })
  //   .catch((error) => {
  //     alert(`Catch an error in navigator.credentials get: ${error.message}`)
  //     console.log(error.message)
  //   })
  navigator.credentials
    .get({
      publicKey: {
        challenge: new TextEncoder().encode(
          "randomchallengefromgenerateServerVerificnCredRequest"
        ).buffer,
        rpId: document.domain,
        allowCredentials: [
          {
            type: "public-key",
            // id: new TextEncoder().encode().buffer,
            id: superID,
            transports: ["internal"],
          },
        ],
        userVerification: "required",
        attestation: "direct",
        // timeout: 60000,
      },
    })
    .then((res) => {
      alert(JSON.stringify(res))
      console.log(res)
      const a = publicKeyCredentialToJSON(res)
      alert(JSON.stringify(a))
      saveVerifiedCreds(a)
      console.log(a)
    })
    .catch((error) => {
      alert(`Catch an error in navigator.credentials get: ${error.message}`)
      console.log(error.message)
    })
}

const getCR2 = async () => {
  try {
    const rees = await navigator.credentials.get({
      publicKey: {
        challenge: new TextEncoder().encode(
          "randomchallengefromgenerateServerVerificationCredRequest"
        ).buffer,
        rpId: document.domain,
        allowCredentials: [
          {
            type: "public-key",
            // id: new TextEncoder().encode(id).buffer,
            id: rawID,
            transports: ["internal"],
          },
        ],
        userVerification: "required",
      },
    })
    // .then((output) => {
    //   alert(JSON.stringify(output));
    //   const a = publicKeyCredentialToJSON(output);
    //   alert(JSON.stringify(a));
    // })
    // .catch((error) => {
    //   alert(`Catch an error in navigator.credentials get: ${error.message}`);
    //   console.log(error.message);
    // });
    // saveVerifiedCreds(rees)
    const a = publicKeyCredentialToJSON(rees)
    alert(JSON.stringify(a))
    saveVerifiedCreds(a)
  } catch (err) {
    alert(err.message)
  }
}

const Bio2 = ({ changeForm }) => {
  // useEffect(() => {
  //   const element = document.getElementById("btn")
  //   element.addEventListener("click", getCR)
  // })
  return (
    <div className="buttonBox">
      <button className="btn-bio" onClick={() => createCR()}>
        Create CR
      </button>

      <button className="btn-bio" onClick={() => createCRI()}>
        Create CRI
      </button>

      <button className="btn-bio" onClick={() => getCR(superID)}>
        Get
      </button>
      <button className="btn-bio" onClick={() => getCR2()}>
        Get 2f
      </button>

      <button className="btn-sw" onClick={() => changeForm()}>
        switch
      </button>
    </div>
  )
}

export default Bio2
