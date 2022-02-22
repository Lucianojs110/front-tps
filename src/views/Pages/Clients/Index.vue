<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <!-- Modal -->
    <div class="modal" :class="{ mostrar: modal }">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{ tituloModal }}</h4>
            <button
              @click="cerrarModal()"
              type="button"
              class="close"
              data-dismiss="modal"
            >
              &times;
            </button>
          </div>
          <!-- Modal body -->
        <div>
         
        <form @submit.prevent="onFormSubmit">
            <div class="form-group">
                <label>Name</label>
                <input type="text" v-model="cliente.name"  class="form-control"
                    :class="{ 'is-invalid': isValid && $v.cliente.name.$error }" />
                
                <div v-if="isValid && !$v.cliente.name.required" class="invalid-feedback">El nombre es requerido</div>
            </div>
               <div class="form-group">
                <button class="btn btn-primary btn-block">Submit</button>
            </div>
         </form>

        </div>
      </div>
       </div>
    </div>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <!--Tables-->
      <b-row class="mt-1">
        <b-col xl="12" class="mb-5 mb-xl-0">
          <b-card body-class="p-0" header-class="border-0">
            <template v-slot:header>
              <b-row align-v="center">
                <b-col>
                  <h3 class="mb-0">Roles</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Nuevo Rol</base-button
                  >
                </b-col>
              </b-row>
            </template>

          </b-card>
        </b-col>
      </b-row>
      <!--End tables-->
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  data() {
    return {
       cliente: {
        name: "",
      },
      id: 0,
      modificar: true,
      modal: 0,
      tituloModal: '',
      role: [],
      isValid: false
    };
  },

  validations: {
    cliente: {
        name: {
                required
        },
  }
  },

  methods: {
  

  onFormSubmit() {              
                this.isValid = true;

                this.$v.$touch();
                if (this.$v.$invalid) {
                    return;
                }

                this.axios.post('http://localhost:8888/contacts', this.contacts).then((response) => {
                    this.resetForm();
                    console.log(response.data);
                })
            },
            
    
    abrirModal(data = {}) {
      this.modal = 1;
      if (this.modificar) {
        this.id = data.id;
        this.tituloModal = "Modificar Rol";
        this.roles.name = data.name;
      } else {
        this.id = 0;
        this.tituloModal = "Crear Rol";
        this.roles.name = "";
      }
    },
    
    cerrarModal() {
      this.modal = 0;
    },
  },

 
};
</script>
<style>
.mostrar {
  display: list-item;
  opacity: 1;
  background: rgba(131, 145, 146, 0.705);
}
</style>