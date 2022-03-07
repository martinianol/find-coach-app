export default {
  registerCoach(context, data) {
    //const id = "c" + (context.getters.getAll.length+1)
    const newCoach = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    }
    context.commit('addCoach', newCoach); 
  }
}