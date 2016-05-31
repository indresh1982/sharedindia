module.exports = {
  global: {
    errors: {
      infoMissing: {
        code: 201,
        type: 'error',
        textMsg: 'Information Missing!!!'
      }
    }
  },
  user: {
    errors: {
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
      },
      searchEmailNReg: {
        code: 208,
        type: 'Error',
        textMsg: 'Search Email is not register!!! Please go to add user page.'
      },
      insufficientRight: {
        code: 401,
        type: 'error',
        textMsg: 'User Doesn\'t have sufficient right!!!'
      }
    }
  },
  location: {
    errors: {
      cityMissing: {
        code: 209,
        type: 'error',
        textMsg: 'City Missing!!!'
      },
      distMissing: {
        code: 210,
        type: 'error',
        textMsg: 'District Missing!!!'
      },
      stateMissing: {
        code: 211,
        type: 'error',
        textMsg: 'State Missing!!!'
      }
    }
  }
};
