export default {
  getAll (state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  getCoachById(state, id) {
    return state.coaches.filter(coach => coach.id == id);
  },
  isCoach(state, getters, rootState, rootGetters) {
    const coaches = getters.getAll;
    const userId = rootGetters.userId;

    return coaches.some(coach => coach.id === userId);
  },
  shouldUpdate(state){
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }
    const currentTimestamp = new Date().getTime();

    return (lastFetch-currentTimestamp) / 1000 > 60; 
  }
};