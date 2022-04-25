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
      alert(`n.c.get: ${error.message}`)
      // alert(JSON.stringify(error))
      // console.log(error.message)
    })
  return result
}

export default callBrowserApiGet
