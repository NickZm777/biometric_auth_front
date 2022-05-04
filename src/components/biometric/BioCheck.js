const BioCheck = () => {
  let isWebAuthAvailable = false
  let isPlatformAuthenticator = false

  if (window.PublicKeyCredential) {
    isWebAuthAvailable = true
    window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(
      (uvpaa) => {
        if (uvpaa) {
          isPlatformAuthenticator = true
        } else {
          isPlatformAuthenticator = false
        }
      }
    )
  } else {
    isPlatformAuthenticator = false
    isWebAuthAvailable = false
  }

  return (
    <div className="notificationBox">
      {isWebAuthAvailable ? (
        <div className="notification">
          WebAuth <span className="notification-awailable">доступен</span>
        </div>
      ) : (
        <div className="notification">
          WebAuth <span className="notification-unawailable">не доступен</span>
        </div>
      )}
      {isPlatformAuthenticator ? (
        <div className="notification">
          PlatformAuthenticator{" "}
          <span className="notification-awailable">доступен</span>
        </div>
      ) : (
        <div className="notification">
          PlatformAuthenticator{" "}
          <span className="notification-unawailable">недоступен</span>
        </div>
      )}
    </div>
  )
}

export default BioCheck
