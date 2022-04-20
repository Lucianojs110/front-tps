<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <!-- Modal -->
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
            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Nombre o razon social</label>
                <input
                  v-model="cliente.nombre"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Nombre o razon social del cliente"
                  :class="{
                    'is-invalid': isValid && $v.cliente.nombre.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.cliente.nombre.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-2">
                <label>Tipo Doc</label>
                <select
                  @change="selectCategory($event)"
                  v-model="cliente.tipo_doc"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.cliente.tipo_doc.$error,
                  }"
                >
                  <option disabled value="">
                    Seleccione...
                  </option>
                  <option
                    selected
                    v-for="item in items_tipo_doc"
                    :key="item"
                    :value="item"
                  >
                    {{ item }}
                  </option>
                </select>
                   <div
                  v-if="isValid && !$v.cliente.tipo_doc.required"
                  class="invalid-feedback"
                   >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-4">
                <label>Numero Documento</label>
                <input
                  v-model="cliente.num_doc"
                  type="text"
                  class="form-control"
                  id="num_doc"
                  placeholder="Numero de CUIT o DNI"
                  :class="{
                    'is-invalid': isValid && $v.cliente.num_doc.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.cliente.num_doc.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Email</label>
                <input
                  v-model="cliente.email"
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Ingrese una dirección de email"
                />
              </div>

              <div class="col-md-6">
                <label>Teléfono</label>
                <input
                  v-model="cliente.telefono"
                  type="text"
                  class="form-control"
                  id="last_name"
                  placeholder="Ingrese el numero de teléfono"
                 
                />
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Dirección</label>
                <input
                  v-model="cliente.direccion"
                  type="text"
                  class="form-control"
                  id="direccion"
                  placeholder="Ingrese una direccion"
                 
                />
              </div>
              <div class="col-md-6">
                <label>Localidad</label>
                <input
                  v-model="cliente.ciudad"
                  type="text"
                  class="form-control"
                  id="last_name"
                  placeholder="Ingrese localidad del Cliente"
                />
              </div>
            </div>
            <!-- Fin Fila -->
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
                  <h3 class="mb-0">Listado de Clientes</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Nuevo Cliente</base-button
                  >
                </b-col>
              </b-row>
            </template>
            <div class="table-responsive">
              <table class="table" id="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre/razon social</th>
                    <th>DNI/CUIT</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Email</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cliente in clientes" :key="cliente.id">
                    <th scope="row">{{ cliente.id }}</th>
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.tipo_doc }} - {{ cliente.num_doc }}</td>
                    <td>{{ cliente.direccion }} - {{ cliente.ciudad }}</td>
                    <td>{{ cliente.telefono }}</td>
                    <td>{{ cliente.email }}</td>
                    <td>
                      <button
                        @click="
                          modificar = true;
                          abrirModal(cliente);
                        "
                        class="btn btn-secondary btn-sm"
                      >
                        Editar
                      </button>
                      <button
                        @click="eliminar(cliente.id)"
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
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  data() {
    return {
       cliente: {
        nombre: "",
        tipo_doc: "",
        num_doc: "",
        ciudad: "",
        direccion: "",
        email: "",
        telefono: "",
      },

      id: 0,
      modificar: true,
      modal: 0,
      tituloModal: '',
      clientes: [],
      isValid: false,
      items_tipo_doc: ['DNI', 'CUIT'],
    };
  },

  validations: {
    cliente: {
        nombre: {
        required,
        minLength: minLength(2),
      },
       tipo_doc: {
        required,
      },
      num_doc: {
        required,
      },
    },
  },

  methods: {
  
    selectCategory(event) {
      console.log(event.target.value);
    },

    listar_clientes() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "clientes", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          this.clientes = res.data;
          /* console.table(res.data); */
        })
        .catch((error) => {
          console.error(error);
        });
    },

    guardar() {
  
      if (this.modificar) {
        this.isValid = true;
        this.$v.$touch();
        
        if (this.$v.$invalid) {
          return;
        }
        axios
          .put(
            process.env.VUE_APP_RUTA_API + "clientes/" + this.id,
            this.cliente,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModal();
            this.listar_clientes();
            swal("Exito!", "El Cliente se ha modificado!", "success");
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
        
        console.log('entro a CREAR')
        axios
          .post(process.env.VUE_APP_RUTA_API + "clientes", this.cliente, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => {
            this.cerrarModal();
            this.listar_clientes();
            swal("Exito!", "El Cliente se ha creado!", "success");
            this.$v.$reset();
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
      }
    },
 
    eliminar(id) {
      swal({
        title: "¿ Esta seguro ?",
        text: "El Cliente será eliminado definitavemente!",
        icon: "warning",
        buttons: ["Cancelar", " Si "],
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(process.env.VUE_APP_RUTA_API + "clientes/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((res) => {
              this.cerrarModal();
              this.listar_clientes();
              swal("Exito!", "El Cliente se ha eliminado!", "success");
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
        this.tituloModal = "Modificar Cliente";
        this.cliente.nombre = data.nombre;
        this.cliente.tipo_doc = data.tipo_doc;
        this.cliente.num_doc = data.num_doc;
        this.cliente.ciudad = data.ciudad;
        this.cliente.direccion = data.direccion;
        this.cliente.email = data.email;
        this.cliente.telefono = data.telefono;
      } else {
        this.id = 0;
        this.tituloModal = "Crear Cliente";
        this.cliente.nombre = "";
        this.cliente.tipo_doc = "";
        this.cliente.num_doc = "";
        this.cliente.ciudad = "";
        this.cliente.direccion = "";
        this.cliente.email = "";
        this.cliente.telefono = "";
      }
    },
    
    cerrarModal() {
      this.modal = 0;
    },
  },

  created() {
    this.listar_clientes();
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