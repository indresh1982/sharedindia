module.exports = {
  user: {
    errors: {
      infoMissing: {
        code: 201,
        type: 'error',
        textMsg: 'Information Missing!!!'
      },
      emailNVerified: {
        code: 202,
        type: 'warn',
        textMsg: 'Email is register but not verified!!! Please go to verify user page and verify the user.'
      },
      emailVerified: {
        code: 203,
        type: 'warn',
        textMsg: 'Email is register and verified!!! Please go to forget password page and reset it.'
      },
      emailFail: {
        code: 204,
        type: 'warn',
        textMsg: 'Email is register but verification email is Failed!!! Please go to verify user page and request for resend the verification email.'
      },
      error: {
        code: 0,
        type: 'error',
        textMsg: 'Unknown Error'
      },
      emailNReg: {
        code: 205,
        type: 'warn',
        textMsg: 'Email is not register!!! Please go to add user page.'
      },
      emailPassword: {
        code: 206,
        type: 'warn',
        textMsg: 'Email and Password are not Matched!!!'
      },
      emailSamePassword: {
        code: 207,
        type: 'warn',
        textMsg: 'Old and New Password are matched!!!'
      }
    }
  }
};
