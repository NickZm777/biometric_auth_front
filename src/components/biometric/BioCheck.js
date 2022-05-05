import { useState, useEffect } from "react"

const BioCheck = () => {
  const [isWebAuthAvailable, setIsWebAuthAvailable] = useState(false)
  const [isPlatformAuthenticator, setIsPlatformAuthenticator] = useState(false)

  useEffect(() => {
    if (window.PublicKeyCredential) {
      setIsWebAuthAvailable(true)
      window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then(
        (available) => {
          if (available) setIsPlatformAuthenticator(true)
        }
      )
    }
  }, [])

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
