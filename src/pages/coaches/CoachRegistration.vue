<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="addCoach"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue'

export default {
  components: {
    CoachForm
  },
  methods: {
    addCoach(formData){
      this.$store.dispatch('coaches/registerCoach', formData);
      this.$router.push('/coaches');
    }
  }
}
</script>

<style scoped>

</style>