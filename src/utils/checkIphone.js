const checkIphone = () => {
  if (["iPhone", "iPhone Simulator"].includes(navigator.platform)) {
    return true;
  } else return false;
};
export default checkIphone;
