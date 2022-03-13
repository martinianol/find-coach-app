require('dotenv').config()

export default {
  async auth (context, payload){
    const mode = payload.mode;
    let url = ''
    if (mode === 'login') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBzn9J72IL6HIGCIGEKC3hfUHnmcRIyzAs`
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBzn9J72IL6HIGCIGEKC3hfUHnmcRIyzAs`
    } 

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
    })
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(response.message || 'Failed to authenticate. Check your details');
      throw error;
    }

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

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