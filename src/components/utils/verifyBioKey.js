import publicKeyCredentialToJSON from "../utils/publicKeyCredentialToJSON"
import { saveKey } from "../../api/helper"

const verifyBioKey = async ({ publicKey }) => {
  // if (!window.PublicKeyCredential) {
  //   alert("window.PublicKeyCredential is disabled")
  //   console.log("window.PublicKeyCredential is disabled")
  //   return
  // }

  const result = await navigator.credentials
    .get({ publicKey: publicKey })
    .then((output) => {
      saveKey(output)

      const a = publicKeyCredentialToJSON(output)
      saveKey(a)

      //   return publicKeyCredentialToJSON(output)
    })
    .catch((error) => {
      // alert(`n.c.get: ${error.message}`)
      alert(JSON.stringify(error))
      console.log(error.message)
    })
  return result
}

export default verifyBioKey
