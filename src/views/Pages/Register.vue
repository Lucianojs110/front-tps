<template>
  <div>
    <!-- Header -->
     <div class="header bg-gradient-success py-7 py-lg-3 pt-lg-9">
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1"
             xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt-5-8 pb-5">
      <!-- Table -->
      <b-row class="justify-content-center">
        <b-col lg="6" md="8" >
          <b-card no-body class="bg-secondary border-0">
            <b-card-header class="bg-transparent pb-2">
              <div class="text-muted text-center mt-2 mb-4">Registro</div>
            
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
              <router-link :to="{name: 'register_pyme'}">
              <button type="button" class="btn btn-primary btn-lg btn-block">Registrarme como Pyme</button>
              </router-link>
              <br>
              <button type="button" class="btn btn-primary btn-lg btn-block">Registrarme como EAE</button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

  export default {
    name: 'register',
    data() {
      return {
        model: {
          name: '',
          email: '',
          password: '',
          agree: false
        }
      }
    },
    methods: {
      onSubmit() {
        // this will be called only after form is valid. You can do an api call here to register users
      }
    }

  };
</script>
<style></style>
