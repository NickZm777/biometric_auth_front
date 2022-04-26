/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getVerificationOptions } from "../../api/helpersBioAuth/getVerificationOptions"
import preformatVerificationCredReq from "../../utils/preformatVerificationCredReq"
import callBrowserApiGet from "../../utils/callBrowserApiGet"
import sendCredsForVerification from "../../api/helpersBioAuth/sendCredsForVerification"
import { saveKey } from "../../api/helper"

const BioLoginForm = (props) => {
  const { userLogin } = props
  const [login, setLogin] = useState(userLogin)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [userInfo, setUserInfo] = useState("")
  const [verificationCounter, setVerificationCounter] = useState("")

  const verifyBioKey = async () => {
    setLoginSuccess(false)
    setLoginError(false)
    const res = await getVerificationOptions(login)
    if (res.status === "success") {
      const publicKey = preformatVerificationCredReq(res.data, document.domain)
      try {
        const generatedBrowserCreds = await callBrowserApiGet({ publicKey })
        // alert(JSON.stringify(generatedBrowserCreds))
        // console.log(generatedBrowserCreds)
        // saveKey(generatedBrowserCreds)
        console.log(publicKey)
        const creds = {
          sessionLogin: login,
          data: generatedBrowserCreds,
        }
        const verifiedRes = await sendCredsForVerification(creds)
        // alert(JSON.stringify(verifiedRes))
        if (verifiedRes.status === "success") {
          setLoginSuccess(true)
          setUserInfo(
            `${verifiedRes.info.firstName} ${verifiedRes.info.lastName}`
          )
          setVerificationCounter(verifiedRes.info.counter)
        } else {
          setLoginError(verifiedRes.message)
        }
      } catch (error) {
        // alert(`catch in Bioform verifyBioKey:  ${error.message}`)
        console.log(error)
        setLoginError(error.message)
      }
    } else {
      // alert(`else in Bioform getVerificationOptions: ${res.message}`)
      setLoginError(res.message)
    }
  }

  return (
    <>
      {userLogin && !loginSuccess && !loginError && (
        <div className="successBox">
          <h3 className="loginSuccess">{`${userLogin}`}</h3>
          <div>{`Вы успешно зарегистрированы.\n Попробуйте авторизироваться`}</div>
        </div>
      )}

      {!loginSuccess && !loginError && (
        <div className="formContainer">
          <div className="form">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                verifyBioKey()
              }}
            >
              <label>Логин</label>
              <input
                required
                className="form-input"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <input className="form-submit" type="submit" value="Войти" />
            </form>
          </div>
        </div>
      )}
      {loginSuccess && (
        <>
          <h1 className="loginSuccess">{`${userInfo}`}</h1>
          <h3>Вы успешно авторизованы</h3>
          <div>{`counter: ${verificationCounter}`}</div>
        </>
      )}
      {loginError && (
        <>
          <h1 className="loginError">{`Ошибка авторизации`}</h1>
          <div className="loginErrorMessage">{loginError}</div>
        </>
      )}
    </>
  )
}

export default BioLoginForm

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
