/* eslint-disable no-unused-vars */

import encode from "../utils/encode"
import base64ToArrayBuffer from "../utils/base64ToArrayBuffer"
// const base64url = require("base64url")

const preformatVerificationCredReq = (verifyCredReq, domain) => {
  // makeCredReq.challenge = base64url.decode(makeCredReq.challenge);
  // makeCredReq.user.id = base64url.decode(makeCredReq.user.id);

  verifyCredReq.challenge = encode(verifyCredReq.challenge)
  verifyCredReq.allowCredentials[0].id = base64ToArrayBuffer(
    verifyCredReq.allowCredentials[0].id
  )
  verifyCredReq.rpId = domain

  return verifyCredReq
}

export default preformatVerificationCredReq
