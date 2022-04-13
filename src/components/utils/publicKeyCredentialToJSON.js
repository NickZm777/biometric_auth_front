function arrayBufferToBase64(ab) {
  var dView = new Uint8Array(ab) //Get a byte view
  var arr = Array.prototype.slice.call(dView) //Create a normal array
  var arr1 = arr.map(function (item) {
    return String.fromCharCode(item) //Convert
  })
  return window.btoa(arr1.join("")) //Form a string
}

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof ArrayBuffer) {
    return arrayBufferToBase64(pubKeyCred)
  } else if (pubKeyCred instanceof Array) {
    return pubKeyCred.map(publicKeyCredentialToJSON)
  } else if (pubKeyCred instanceof Object) {
    const obj = {}
    for (let key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key])
    }
    return obj
  } else return pubKeyCred
}

export default publicKeyCredentialToJSON
