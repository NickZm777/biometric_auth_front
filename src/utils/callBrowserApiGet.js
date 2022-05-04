/* eslint-disable no-unused-vars */
import publicKeyCredentialToJSON from "./publicKeyCredentialToJSON"

const callBrowserApiGet = async ({ publicKey }) => {
  const result = await navigator.credentials
    .get({ publicKey: publicKey })
    .then((output) => {
      const a = publicKeyCredentialToJSON(output)
      return publicKeyCredentialToJSON(a)
    })
    .catch((error) => {
      alert(error.message)
    })
  return result
}

export default callBrowserApiGet
