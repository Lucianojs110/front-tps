<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <!-- The Modal -->
    <div class="modal" :class="{ mostrar: modal }" style="overflow-y: scroll">
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
          <div class="modal-body">
            <div class="row">
              <div class="col-md-6">
                <label>Nombre</label>
                <input
                  v-model="usuarios.name"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Nombre del usuario"
                  :class="{ 'is-invalid': isValid && $v.usuarios.name.$error }"
                />
                <div v-if="isValid && !$v.usuarios.name.required" class="invalid-feedback">
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6">
                <label>Apellido</label>
                <input
                  v-model="usuarios.last_name"
                  type="text"
                  class="form-control"
                  id="last_name"
                  placeholder="Apellido del usuario"
                  :class="{ 'is-invalid': isValid && $v.usuarios.last_name.$error }"
                />
                  <div v-if="isValid && !$v.usuarios.last_name.required" class="invalid-feedback">
                  El campo es requerido
                 </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
                <input
                  v-model="usuarios.email"
                  type="text"
                  class="form-control"
                  id="email"
                  autocomplete="off"
                  placeholder="Ingrese una direccion de email"
                  :class="{ 'is-invalid': v_email || isValid && $v.usuarios.email.$error  }"
                />
                <div v-if="v_email" class="invalid-feedback">
                  El email ya ha sido usado
                 </div>
                  <div v-if="isValid && !$v.usuarios.email.required" class="invalid-feedback">
                  El campo es requerido
                 </div>
                  <div v-if="isValid && !$v.usuarios.email.email" class="invalid-feedback">
                  Se debe ingresar un email valido
                 </div>
              </div>
              <div class="col-md-6">
                <label>Rol</label>
                <select
                  id="rol"
                  @change="selectCategory($event)"
                  v-model="usuarios.rol"
                  class="form-control"
                  :class="{ 'is-invalid':  isValid && $v.usuarios.rol.$error  }"
                >
                  <option disabled value="">
                    Elige un rol para el usuario..
                  </option>
                  <option
                    selected
                    v-for="rol in roles"
                    :key="rol.id"
                    :value="rol.id"
                  >
                    {{ rol.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <label>Password</label>
                <input
                  v-model="usuarios.password"
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Ingrese una contraseña"
                  autocomplete="off"
                   :class="{ 'is-invalid':  isValid && $v.usuarios.password.$error  }"
                />
                <div v-if="isValid && !$v.usuarios.password.required" class="invalid-feedback">
                  El Password es requerido
                 </div>
                  <div v-if="isValid && !$v.usuarios.password.minLengt" class="invalid-feedback">
                  El Password debe tener al menos 4 caracteres
                 </div>
              </div>
              <div class="col-md-6">
                <label>Coonfirmar Password</label>
                <input
                  v-model="usuarios.cpassword"
                  type="password"
                  class="form-control"
                  id="cpassword"
                  autocomplete="off"
                  placeholder="Ingrese confirmación contraseña"
                  :class="{ 'is-invalid':  isValid && $v.usuarios.cpassword.$error  }"
                />
                 <div v-if="isValid && !$v.usuarios.cpassword.required" class="invalid-feedback">
                  La confirmación del password es requerida
                 </div>
                   <div v-if="usuarios.cpassword && !$v.usuarios.cpassword.sameAsPassword" class="invalid-feedback">
                 Password y la confirmación no coinciden
                 </div>
              </div>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              @click="cerrarModal()"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
              @click="guardar()"
            >
              Guardar
            </button>
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
                  <h3 class="mb-0">Listado de Usuarios</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Nuevo Usuario</base-button
                  >
                </b-col>
              </b-row>
            </template>
            <div class="table-responsive">
            <table class="table" id="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="users in user" :key="users.id">
                  <th scope="row">{{ users.id }}</th>
                  <td>{{ users.name }}</td>
                  <td>{{ users.last_name }}</td>
                  <td>{{ users.email }}</td>
                  <td>{{ users.role.name }}</td>

                  <td>
                    <button
                      @click="
                        modificar = true;
                        abrirModal(users);
                      "
                      class="btn btn-secondary btn-sm"
                    >
                      Editar
                    </button>
                    <button
                      @click="eliminar(users.id)"
                      class="btn btn-danger btn-sm"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <!--End tables-->
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import { required, minLength,  sameAs, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      usuarios: {
        name: "",
        last_name: "",
        email: "",
        password: "",
        cpassword: "",
        rol: "",
      },
      roles: [],
      selected: {
        role: "",
      },
      id: 0,
      modificar: true,
      modal: 0,
      tituloModal: "",
      user: [],
      isValid: false,
      v_email: false,
    };
  },

  validations: {
    usuarios: {
      name: {
        required,
        minLength: minLength(2),
      },
      last_name: {
        required,
      },
       email: {
        required,

      },
       rol: {
        required,

      },
      password: { 
        required, 
        minLength: minLength(4) 
      },
        cpassword: { 
          required, 
          sameAsPassword: sameAs('password') 
        }
    },
  },

  mounted() {
    this.getRoles();
  },
  methods: {
    selectCategory(event) {
      console.log(event.target.value);
    },

    listar_usuarios() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "users", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          this.user = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    guardar() {

      let self = this;

      if (this.modificar) {
        
        this.isValid = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }

        axios
          .put(
            process.env.VUE_APP_RUTA_API + "users/" + this.id,
            this.usuarios,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModal();
            this.listar_usuarios();
            swal("Exito!", "El Usuario se ha modificado!", "success");
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
      } else {
        
        this.isValid = true;
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }
        
        axios
          .post(process.env.VUE_APP_RUTA_API + "users", this.usuarios, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => {
            this.cerrarModal();
            this.listar_usuarios();
            swal("Exito!", "El Usuario se ha creado!", "success");
            
          })
          .catch(function (error) {
            if(error.response.data.errors.email){
              self.v_email = true;
            } 
          });
      }
    },

    eliminar(id) {
      swal({
        title: "¿ Esta seguro ?",
        text: "El Usuario será eliminado definitavemente!",
        icon: "warning",
        buttons: ["Cancelar", " Si "],
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(process.env.VUE_APP_RUTA_API + "users/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((res) => {
              this.cerrarModal();
              this.listar_usuarios();
              swal("Exito!", "El Usuario se ha eliminado!", "success");
            })
            .catch(function (error) {
              var array = Object.values(error.response.data.errors);
              array.forEach(swal(String(array)));
            });
        }
      });
    },

    abrirModal(data = {}) {
      this.modal = 1;
      if (this.modificar) {
        this.id = data.id;
        this.tituloModal = "Modificar Usuario";
        this.usuarios.name = data.name;
        this.usuarios.last_name = data.last_name;
        this.usuarios.email = data.email;
        this.usuarios.password = data.password;
        this.usuarios.rol = data.role.id;
        console.log("id_rol: " + data.role.id);
      } else {
        this.id = 0;
        this.tituloModal = "Crear Usuario";
        this.usuarios.name = "";
        this.usuarios.last_name = "";
        this.usuarios.email = "";
        this.usuarios.password = "";
        this.usuarios.rol = "";
      }
    },
    cerrarModal() {
      this.modal = 0;
    },

    getRoles() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "roles", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.roles = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  created() {
    this.listar_usuarios();
    /* console.log(localStorage.token); */
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

