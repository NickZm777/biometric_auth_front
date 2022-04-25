const BioCheck = () => {
  const isBiometricAwailable = window.PublicKeyCredential
  return (
    <>
      {isBiometricAwailable ? (
        <div className="notification">
          На Вашем устройстве{" "}
          <span className="notification-awailable">доступно</span> использование
          биометрических ключей
        </div>
      ) : (
        <div className="notification">
          На Вашем устройстве использование биометрических ключей{" "}
          <span className="notification-unawailable">недоступно</span>
        </div>
      )}
    </>
  )
}

export default BioCheck
