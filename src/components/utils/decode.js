const decode = (buffer, utf) => {
  return new TextDecoder(utf).decode(buffer, { ignoreBOM: true })
}

export default decode
