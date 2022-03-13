require('dotenv').config()

export default {
  async login(context, payload) {
    //const apiKey = process.env.COACH_APP_API_KEY

    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzn9J72IL6HIGCIGEKC3hfUHnmcRIyzAs`, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
    })
    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      const error = new Error(response.message || 'Failed to authenticate. Check your login details');
      throw error;
    }
    console.log(responseData)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })

  },
  async signup(context, payload) {
    const apiKey = process.env.COACH_APP_API_KEY
    console.log(apiKey)
    console.log(payload.password)
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzn9J72IL6HIGCIGEKC3hfUHnmcRIyzAs`, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
    })

    const responseData = await response.json();

    if (!response.ok) {
      console.log(responseData)
      const error = new Error(response.message || 'Failed to authenticate');
      throw error;
    }
    
    console.log(responseData)

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  
  },
  logout(context) {
    context.commit('setUser', {
      userId: null,
      token: null,
      tokenExpiration: null
    })
  }
}