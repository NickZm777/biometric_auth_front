/* eslint-disable no-unused-vars */
import { useState } from "react"
import { getCreateOptions } from "../../api/helpersBioAuth/getCreateOptions"
import preformatMakeCredReq from "../../utils/preformatMakeCredReq"
import callBrowserApiCreate from "../../utils/callBrowserApiCreate"
import saveCreatedCreds from "../../api/helpersBioAuth/saveCreatedCreds"
import BioLoginForm from "../biometric/BioLoginForm"
import AlphaSpinner from "../spinners/AlphaSpinner"
import checkIphone from "../../utils/checkIphone"
const isIphone = checkIphone()

const BioRegisterForm = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [userName, setUserName] = useState("")
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const [loading, setLoading] = useState(false)

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
        navigator.credentials.preventSilentAccess()
        const creds = {
          userInfoforSession: userName,
          data: browserKey,
        }
        const createdRes = await saveCreatedCreds(creds)
        if (createdRes.status === "success") {
          setLoading(false)
          setRegisterSuccess(true)
        } else {
          setLoading(false)
          setRegisterError(createdRes.message)
        }
      } catch (error) {
        setLoading(false)
        console.log(error)
        setRegisterError(error.message)
      }
    } else {
      setLoading(false)
      setRegisterError(res.message)
    }
  }

  return (
    <>
      {loading ? (
        <AlphaSpinner />
      ) : (
        <>
          {!registerError && !registerSuccess && (
            <div className="formContainer">
              <div className="form">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setLoading(true)
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
      )}
    </>
  )
}

export default BioRegisterForm
