<template>
  <div style="background-color:#172b4d">
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
    <b-container class="mt--8 pb-2">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class="bg-secondary border-0 mb-0">
            <b-card-header class="bg-transparent pb-2"  >
              <div class="btn-wrapper text-center">
           <img src="@/assets/logo.png" id="icon" alt="User Icon"  height="250px" width="250px"/>
              </div>
            </b-card-header>
            <b-card-body class="px-lg-5 py-lg-5">
                <form v-on:submit.prevent="login">
                  <base-input alternative
                              class="mb-3"
                              name="Email"
                              :rules="{required: true, email: true}"
                              prepend-icon="ni ni-email-83"
                              placeholder="Email"
                              v-model="model.email">
                  </base-input>

                  <base-input alternative
                              class="mb-3"
                              name="Password"
                              :rules="{required: true, min: 6}"
                              prepend-icon="ni ni-lock-circle-open"
                              type="password"
                              placeholder="Password"
                              v-model="model.password">
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe">Recuerdame</b-form-checkbox>
                  <div class="text-center">
                    <base-button type="primary" native-type="submit" class="my-4">Ingresar</base-button>
                  </div>
                </form>

            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light"><small>Olvido su contraseña?</small></router-link>
            </b-col>
         
          
          </b-row>
        </b-col>
      </b-row>
    
    </b-container>
  </div>
</template>
<script>
import axios from 'axios';
import { mapActions} from 'vuex';
  export default {
    data() {
      return {
        model: {
          email: '',
          password: '',
          rememberMe: false,
        },
         error: false,
         error_msg: "",
      };
    },
     methods:{
    login(){
        let json = {
          "email" : this.model.email,
          "password": this.model.password
        };
        axios.post(process.env.VUE_APP_RUTA_API+'login', json)
        .then( data =>{
            console.log(data)
           if(data.data.access_token){
              this.$toastr.s("Ingreso Exitoso");
              this.inLogin()
              localStorage.token = data.data.access_token;
              localStorage.name = data.data.user.name;
              localStorage.last_name = data.data.user.last_name;
              this.$router.push('dashboard');
           }else{
             this.error = true;
             this.$toastr.e("Error", data.data.message);
           }
        })
    },
     ...mapActions([
    'inLogin',
  ])
  }
 
  };
</script>
