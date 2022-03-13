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

    const expiresIn = + responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    })

  },
  tryLogin(context){
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    
    context.commit('setUser', {
      userId: null,
      token: null,
    })
  }
}