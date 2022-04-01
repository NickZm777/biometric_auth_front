const Unregistered = ({ info }) => {
  return (
    <div className="auth_failure">
      <h1>Authentication failure</h1>
      <h2>You have provided {info}</h2>
      <h3> Try again !</h3>
    </div>
  )
}

export default Unregistered
