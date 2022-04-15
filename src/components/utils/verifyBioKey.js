import publicKeyCredentialToJSON from "../utils/publicKeyCredentialToJSON"
import { saveKey } from "../../api/helper"

const verifyBioKey = async (publicKey) => {
  // if (!window.PublicKeyCredential) {
  //   alert("window.PublicKeyCredential is disabled")
  //   console.log("window.PublicKeyCredential is disabled")
  //   return
  // }
  const result = await navigator.credentials
    .get({ publicKey })
    .then((output) => {
      saveKey(output)
      try {
        const a = publicKeyCredentialToJSON(output)
        saveKey(a)
      } catch (e) {
        alert(`error in creds Get: ${e.message}`)
      }
      //   return publicKeyCredentialToJSON(output)
    })
    .catch((error) => {
      alert(`Catch an error in navigator.credentials create: ${error.message}`)
      console.log(error.message)
    })
  return result
}

export default verifyBioKey
