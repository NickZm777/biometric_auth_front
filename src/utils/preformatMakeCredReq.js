/* eslint-disable no-unused-vars */

import encode from "../utils/encode"
const base64url = require("base64url")

const preformatMakeCredReq = (makeCredReq) => {
  // makeCredReq.challenge = base64url.decode(makeCredReq.challenge);
  // makeCredReq.user.id = base64url.decode(makeCredReq.user.id);

  makeCredReq.challenge = encode(makeCredReq.challenge)
  makeCredReq.user.id = encode(makeCredReq.user.id)

  return makeCredReq
}

export default preformatMakeCredReq
