/* eslint-disable no-unused-vars */
import { tryCheck } from "../api/helper"
import { useState } from "react"

const data = {
  userInfoforSession: "testUser",
  data: {
    rawId: "XtGy+6wkQM6cAl3OtQSJGyx3Dh0=",
    response: {
      attestationObject:
        "o2NmbXRkbm9uZWdhdHRTdG10oGhhdXRoRGF0YViYNeLDO3AtFqklDPw3YMTxKfJjZ/9QJCVSkccHII6uWjZFAAAAAAAAAAAAAAAAAAAAAAAAAAAAFF7RsvusJEDOnAJdzrUEiRssdw4dpQECAyYgASFYIKK7R1HP9XvbESTWWy5GwkZbjCSQMC6pCU3C2s9Dl/LpIlggetvHRhnIHLL2v9nnGJ9NnLKeg70LslqlTuSxxBGc8kI=",
      clientDataJSON:
        "eyJ0eXBlIjoid2ViYXV0aG4uY3JlYXRlIiwiY2hhbGxlbmdlIjoiY21GdVpHOXRZMmhoYkd4bGJtZGxabkp2YldkbGJtVnlZWFJsVTJWeWRtVnlUV0ZyWlVOeVpXUlNaWEYxWlhOMCIsIm9yaWdpbiI6Imh0dHBzOi8vamFkZS1icmlvY2hlLTdjMzNmZC5uZXRsaWZ5LmFwcCJ9",
    },
    getClientExtensionResults: {},
    id: "XtGy-6wkQM6cAl3OtQSJGyx3Dh0",
    type: "public-key",
  },
}

const Bio3 = () => {
  return (
    <div>
      <button className="btn-bio" onClick={() => tryCheck(data)}>
        TryCheck
      </button>
    </div>
  )
}

export default Bio3
