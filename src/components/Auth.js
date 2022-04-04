const Auth = ({ info }) => {
  const firstName = info.firstName
  const lastName = info.lastName

  return (
    <div className="auth">
      <h1>{`${firstName} ${lastName}`}</h1>
      <h2>You are authenticated</h2>
    </div>
  )
}

export default Auth
