const BioCheck = () => {
  const isBiometricAwailable = window.PublicKeyCredential
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
