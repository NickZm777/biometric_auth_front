import { saveKey, saveBuffer } from "../api/helper";
import { useState } from "react";
// import { uuid } from "uuidv4"
// import { base64urlEncode } from "base64url"

function publicKeyCredentialToJSON(pubKeyCred) {
  if (pubKeyCred instanceof ArrayBuffer) {
    return window.atob(pubKeyCred);
  } else if (pubKeyCred instanceof Array) {
    return pubKeyCred.map(publicKeyCredentialToJSON);
  } else if (pubKeyCred instanceof Object) {
    const obj = {};
    for (let key in pubKeyCred) {
      obj[key] = publicKeyCredentialToJSON(pubKeyCred[key]);
    }
    return obj;
  } else return pubKeyCred;
}

const Bio3 = () => {
  const [inf, setInf] = useState("");

  const publicKey = {
    challenge: null,
    rp: { id: document.domain, name: "My test TouchID" },
    user: {
      id: new Uint8Array([21, 31, 105]),
      name: "jason.x@.pl",
      displayName: "Jason X",
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
  };

  const createKey = async () => {
    if (!window.PublicKeyCredential) {
      console.log("window.PublicKeyCredential is false");
      return;
    }
    const challenge = "Bio2challenge";

    publicKey.challenge = window.btoa(challenge);

    await navigator.credentials
      .create({ publicKey })
      .then((output) => {
        saveBuffer({
          buffertype: "window.btoa(challenge)-Bio3;",
          output: output,
        });
        const keyres = publicKeyCredentialToJSON(output);
        // const keyres = convertBuffer(output)
        saveKey(keyres);
        setInf(keyres);
      })
      .catch((error) => {
        console.log("Catch an error in navigator.credentials create:");
        console.log(error.message);
        setInf(error.message);
      });
  };

  return (
    <div>
      <button className="btn-bio" onClick={() => createKey()}>
        Bio3
      </button>
      <div className="inf-bio">{JSON.stringify(inf)}</div>
    </div>
  );
};

// const encodedData = window.btoa("Hello, world")
// const decodedData = window.atob(encodedData)

export default Bio3;
