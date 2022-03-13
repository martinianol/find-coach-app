<template>
<div>
  <base-dialog :show="!!error" title="An error ocurred" @close="handleError">
    <p>{{error}}</p>
  </base-dialog>
  <base-dialog :show="isLoading" title="Authenticating..." fixed>
    <base-spinner></base-spinner>
  </base-dialog>
  <base-card>
    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label for="email">E-mail</label>
        <input type="email" id="email" v-model.trim="email"/>
      </div>
      <div class="form-control">
        <label for="password">Password</label>
        <input type="password" id="password" v-model.trim="password"/>
      </div>
      <p class="errors" v-if="!formIsValid">{{ error }}</p>
      <base-button>{{submitButtonCaption}}</base-button>
      <base-button type="button" mode="flat" @click="switchAuthMode">{{switchModeButtonCaption}}</base-button>
    </form>
  </base-card>
</div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password:'',
      formIsValid: true,
      mode: 'login',
      error: null,
      isLoading: false
    }
  },
  computed: {
    submitButtonCaption() {
      return this.mode === 'login' ? 'Login' : 'Signup'
    },
    switchModeButtonCaption(){
      this.switchAuthMode
      return this.mode === 'login' ? 'Signup instead' : 'Login instead'
    }
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (this.email === '' || !this.email.includes('@') || this.password.length < 6 ){
        this.formIsValid = false;
        this.error = 'Please fill the fields correctly'
        return
      }

      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
        mode: this.mode
      }
      try {
        await this.$store.dispatch('auth', actionPayload);
        const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
        this.$router.replace(redirectUrl)     
      } catch (error) {
        this.error = error.message || 'Failed to authenticate, try later.';
      }
      this.isLoading = false;

    },
    switchAuthMode() {
      this.mode === 'login' ? this.mode='signup' : this.mode='login';
    },
    handleError() {
      this.error = null;
    }
  }
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>