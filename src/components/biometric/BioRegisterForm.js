/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getCreateOptions } from "../../api/helpersBioAuth/getCreateOptions"
import preformatMakeCredReq from "../../utils/preformatMakeCredReq"
import callBrowserApiCreate from "../../utils/callBrowserApiCreate"
import saveCreatedCreds from "../../api/helpersBioAuth/saveCreatedCreds"
import BioLoginForm from "../biometric/BioLoginForm"
// import validator from "../../utils/validator"
// import { saveKey } from "../../api/helper"
// import publicKeyCredentialToJSON from "../../utils/publicKeyCredentialToJSON"

const BioRegisterForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [registerError, setRegisterError] = useState(false)

  // const [valid, setValid] = useState(true)

  const createBioKey = async () => {
    setRegisterSuccess(false)
    setRegisterError(false)
    // const isValid = validator(firstName, lastName, userName)
    // console.log(isValid)
    // if (isValid) {
    //   setValid(isValid)
    //   return
    // }

    const res = await getCreateOptions({
      userName: userName,
      firstName: firstName,
      lastName: lastName,
    })
    if (res.status === "success") {
      const publicKey = preformatMakeCredReq(res.data)
      console.log(publicKey)
      try {
        const browserKey = await callBrowserApiCreate(publicKey)
        // alert(JSON.stringify(generatedBrowserCreds))
        // console.log(generatedBrowserCreds)
        // saveKey(generatedBrowserCreds)
        const creds = {
          userInfoforSession: userName,
          data: browserKey,
        }
        const createdRes = await saveCreatedCreds(creds)
        if (createdRes.status === "success") {
          setRegisterSuccess(true)
        } else setRegisterError(createdRes.message)
      } catch (error) {
        // alert(`catch in Bioform:  ${error.message}`)
        console.log(error)
        setRegisterError(error.message)
      }
    } else {
      // alert(`else in getCreateOptions: ${res.message}`)
      setRegisterError(res.message)
    }
  }

  return (
    <>
      {!registerError && !registerSuccess && (
        <div className="formContainer">
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createBioKey()
              }}
            >
              <label>Имя</label>
              <input
                required
                className="form-input"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label>Фамилия</label>
              <input
                required
                className="form-input"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label>Логин</label>
              <input
                required
                className="form-input"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <input
                className="form-submit"
                type="submit"
                value="Подтвердить"
              />
            </form>
          </div>
        </div>
      )}
      {/* {!valid && <div className="validate">{valid}</div>} */}
      {/* {registerSuccess && (
        <>
          <h1 className="loginSuccess">{`${firstName} ${lastName}`}</h1>
          <div>{`Вы успешно зарегистрированы.\n Попробуйте авторизироваться`}</div>
          <BioLoginForm userLogin={userName} />
        </>
      )} */}
      {registerSuccess && <BioLoginForm userLogin={userName} />}
      {registerError && (
        <>
          <h1 className="loginError">{`Ошибка регистрации`}</h1>
          <div className="loginErrorMessage">{registerError}</div>
        </>
      )}
    </>
  )
}

export default BioRegisterForm

// const fakeRegisterCreds = {
//   userInfoforSession: userName,
//   data: {
//     rawId: "XtGy+6wkQM6cAl3OtQSJGyx3Dh0=",
//     response: {
//       attestationObject:
//         "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YViYNeLDO3AtFqklDPw3YMTxKfJjZ/9QJCVSkccHII6uWjZFAAAAAAAAAAAAAAAAAAAAAAAAAAAAFF7RsvusJEDOnAJdzrUEiRssdw4dpQECAyYgASFYIKK7R1HP9XvbESTWWy5GwkZbjCSQMC6pCU3C2s9Dl/LpIlggetvHRhnIHLL2v9nnGJ9NnLKeg70LslqlTuSxxBGc8kI=",
//       clientDataJSON:
//         "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiY21GdVpHOXRZMmhoYkd4bGJtZGxabkp2YldkbGJtVnlZWFJsVTJWeWRtVnlUV0ZyWlVOeVpXUlNaWEYxWlhOMCIsIm9yaWdpbiI6Imh0dHBzOi8vamFkZS1icmlvY2hlLTdjMzNmZC5uZXRsaWZ5LmFwcCJ9",
//     },
//     getClientExtensionResults: {},
//     id: "XtGy-6wkQM6cAl3OtQSJGyx3Dh0",
//     type: "public-key",
//   },
// }
