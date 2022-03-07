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
  }
}