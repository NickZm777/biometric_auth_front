const BioCheck = () => {
  let isBiometricAwailable = false

  if (window.PublicKeyCredential) {
    window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(
      (uvpaa) => {
        if (uvpaa) {
          isBiometricAwailable = true
        } else {
          isBiometricAwailable = false
        }
      }
    )
  } else {
    isBiometricAwailable = false
  }

  return (
    <>
      {isBiometricAwailable ? (
        <div className="notification">
          В Вашем браузере{" "}
          <span className="notification-awailable">доступно</span> использование
          платформенных WebAuth ключей
        </div>
      ) : (
        <div className="notification">
          В Вашем браузере использование платформенных WebAuth ключей{" "}
          <span className="notification-unawailable">недоступно</span>
        </div>
      )}
    </>
  )
}

export default BioCheck
