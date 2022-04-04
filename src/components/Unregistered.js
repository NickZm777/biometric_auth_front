const Unregistered = ({ info }) => {
  console.log(info)
  return (
    <div className="auth_failure">
      <h1>Authentication failure</h1>
      {info.details !== "reCheck" && <h2>You have provided {info.details}</h2>}
      {info.details === "reCheck" && <h2>{info.message}</h2>}
      <h3> Try again !</h3>
    </div>
  )
}

export default Unregistered
