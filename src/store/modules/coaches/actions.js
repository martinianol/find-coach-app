export default {
  registerCoach(context, payload) {
    //const id = "c" + (context.getters.getAll.length+1)
    const newCoach = {
      id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      areas: payload.areas,
      description: payload.desc,
      hourlyRate: payload.rate
    }
    context.commit('addCoach', newCoach); 
  }
}