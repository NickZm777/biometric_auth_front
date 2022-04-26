const validator = (firstname, lastname, login) => {
  if (
    /^([a-zа-яё]+|\d+)$/i.test(firstname) &&
    /^([a-zа-яё]+|\d+)$/i.test(lastname)
  )
    return "имя и фамилия должны состоять только из букв"
  if (/^([a-zа-яё])$/i.test(login))
    return "имя и фамилия должны состоять только из букв, логин из букв и/или цифр"
  else return false
}

export default validator
