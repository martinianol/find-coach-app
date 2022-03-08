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

    //const responseData = await response.json()

    if (!response.OK) {
      //We'll do somehting later with later
    }

    context.commit('addCoach', {
      ...newCoach,
      id: userId
    }); 
  }
}