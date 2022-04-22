/* eslint-disable no-unused-vars */

import encode from "../utils/encode"
const base64url = require("base64url")

function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64)
  var len = binary_string.length
  var bytes = new Uint8Array(len)
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i)
  }
  return bytes.buffer
}

const preformatVerificationCredReq = (verifyCredReq, domain) => {
  // makeCredReq.challenge = base64url.decode(makeCredReq.challenge);
  // makeCredReq.user.id = base64url.decode(makeCredReq.user.id);

  verifyCredReq.challenge = encode(verifyCredReq.challenge)
  verifyCredReq.allowCredentials[0].id = encode(
    verifyCredReq.allowCredentials[0].id
  )
  verifyCredReq.rpId = domain

  return verifyCredReq
}

export default preformatVerificationCredReq
