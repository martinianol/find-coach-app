export default {
  async registerCoach(context, payload) {
    //const id = "c" + (context.getters.getAll.length+1)
    const userId = context.rootGetters.userId;

    const newCoach = {
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate
    };

    const response = await fetch(`https://vue-coach-app-4a323-default-rtdb.firebaseio.com/coache/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(newCoach)
    });

    if (!response.ok) {
     
      //We'll do somehting later with later
    }

    context.commit('addCoach', {
      ...newCoach,
      id: userId
    }); 
  },

  async loadCoaches(context, payload) {
    if(!context.getters.shouldUpdate && !payload.forceRefresh) {
      return;
    }
    const response = await fetch(`https://vue-coach-app-4a323-default-rtdb.firebaseio.com/coache.json`);
    const responseData = await response.json();

    if (!response.ok) {
      //We'll do somehting later with later
      const error = new Error(responseData.message || 'Failed to fetch!')
      throw error; 
    }    

    const coaches = []

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        areas: responseData[key].areas,
        description: responseData[key].desc,
        hourlyRate: responseData[key].hourlyRate
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
}