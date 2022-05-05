/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getVerificationOptions } from "../../api/helpersBioAuth/getVerificationOptions"
import preformatVerificationCredReq from "../../utils/preformatVerificationCredReq"
import callBrowserApiGet from "../../utils/callBrowserApiGet"
import sendCredsForVerification from "../../api/helpersBioAuth/sendCredsForVerification"
import AlphaSpinner from "../spinners/AlphaSpinner"
import RES from "../../api/constants"

const BioLoginForm = (props) => {
  const { userLogin } = props
  const [login, setLogin] = useState(userLogin)
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [userInfo, setUserInfo] = useState("")
  const [verificationCounter, setVerificationCounter] = useState("")
  const [loading, setLoading] = useState(false)
  const [pk, setPk] = useState(false)

  const userClicks = async (key) => {
    try {
      const generatedBrowserCreds = await callBrowserApiGet({ key })
      // console.log(publicKey)
      const creds = {
        sessionLogin: login,
        data: generatedBrowserCreds,
      }
      const verifiedRes = await sendCredsForVerification(creds)
      if (!verifiedRes) {
        setLoading(false)
        setLoginError("Error fetching CredsForVerification")
        return
      }

      if (verifiedRes.status === RES.ERROR) {
        setLoading(false)
        setLoginError(verifiedRes.message)
        return
      }
      if (verifiedRes.status === RES.SUCCESS) {
        setLoading(false)
        setLoginSuccess(true)
        setUserInfo(
          `${verifiedRes.info.firstName} ${verifiedRes.info.lastName}`
        )
        setVerificationCounter(verifiedRes.info.counter)
      } else {
        setLoading(false)
        setLoginError("Error fetching CredsForVerification")
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
      setLoginError(error.message)
    }
  }

  const verifyBioKey = async () => {
    setLoginSuccess(false)
    setLoginError(false)

    const res = await getVerificationOptions(login)

    if (!res) {
      setLoading(false)
      setLoginError("Error fetching options")
      return
    }

    if (res.status === RES.ERROR) {
      setLoading(false)
      setLoginError(res.message)
      return
    }

    if (res.status === RES.SUCCESS) {
      const publicKey = preformatVerificationCredReq(res.data, document.domain)
      setPk(publicKey)
      // try {
      //   const generatedBrowserCreds = await callBrowserApiGet({ publicKey })
      //   console.log(publicKey)
      //   const creds = {
      //     sessionLogin: login,
      //     data: generatedBrowserCreds,
      //   }
      //   const verifiedRes = await sendCredsForVerification(creds)
      //   if (!verifiedRes) {
      //     setLoading(false)
      //     setLoginError("Error fetching CredsForVerification")
      //     return
      //   }

      //   if (verifiedRes.status === RES.ERROR) {
      //     setLoading(false)
      //     setLoginError(verifiedRes.message)
      //     return
      //   }
      //   if (verifiedRes.status === RES.SUCCESS) {
      //     setLoading(false)
      //     setLoginSuccess(true)
      //     setUserInfo(
      //       `${verifiedRes.info.firstName} ${verifiedRes.info.lastName}`
      //     )
      //     setVerificationCounter(verifiedRes.info.counter)
      //   } else {
      //     setLoading(false)
      //     setLoginError("Error fetching CredsForVerification")
      //   }
      // } catch (error) {
      //   setLoading(false)
      //   console.log(error)
      //   setLoginError(error.message)
      // }
    } else {
      setLoading(false)
      setLoginError("Error fetching options")
    }
  }

  return (
    <>
      {loading ? (
        <AlphaSpinner />
      ) : (
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
                    setLoading(true)
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
          {pk && (
            <button className="form-submit" onClick={() => userClicks(pk)}>
              key
            </button>
          )}
          {loginSuccess && (
            <>
              <h1 className="loginSuccess">{`${userInfo}`}</h1>
              <h3>Вы успешно авторизованы</h3>
              <div>{`counter: ${verificationCounter}`}</div>
            </>
          )}
          {loginError && (
            <div className="loginErrorBox">
              <h1 className="loginError">{`Ошибка авторизации`}</h1>
              <div className="loginErrorMessage">{loginError}</div>
            </div>
          )}
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
