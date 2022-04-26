const isIphone = () => {
  if (["iPhone", "iPhone Simulator"].includes(navigator.platform)) {
    return true
  } else return false
}
export default isIphone
