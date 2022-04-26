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
          На Вашем устройстве{" "}
          <span className="notification-awailable">доступно</span> использование
          WebAuth
        </div>
      ) : (
        <div className="notification">
          На Вашем устройстве использование WebAuth{" "}
          <span className="notification-unawailable">недоступно</span>
        </div>
      )}
    </>
  )
}

export default BioCheck
