<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <!-- The Modal -->
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
          <div class="modal-body">
            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Nombre o razon social</label>
                <input
                  v-model="proveedor.nombre"
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="Nombre o razon social del proveedor"
                  :class="{
                    'is-invalid': isValid && $v.proveedor.nombre.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.proveedor.nombre.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-2">
                <label>Tipo Doc</label>
                <select
                  v-model="proveedor.tipo_doc"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.proveedor.tipo_doc.$error,
                  }"
                >
                  <option selected disabled value="">
                    Seleccione...
                  </option>
                  <option>DNI</option>
                  <option>CUIT</option>
                </select>
                   <div
                  v-if="isValid && !$v.proveedor.tipo_doc.required"
                  class="invalid-feedback"
                   >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-4">
                <label>Numero Documento</label>
                <input
                  v-model="proveedor.num_doc"
                  type="text"
                  class="form-control"
                  id="num_doc"
                  placeholder="Numero de CUIT o DNI"
                  :class="{
                    'is-invalid': isValid && $v.proveedor.num_doc.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.proveedor.num_doc.required"
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
                  v-model="proveedor.email"
                  type="text"
                  class="form-control"
                  id="email"
                  placeholder="Ingrese una dirección de email"
                />
              </div>

              <div class="col-md-6">
                <label>Teléfono</label>
                <input
                  v-model="proveedor.telefono"
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
                  v-model="proveedor.direccion"
                  type="text"
                  class="form-control"
                  id="direccion"
                  placeholder="Ingrese una direccion"
                 
                />
              </div>
              <div class="col-md-6">
                <label>Localidad</label>
                <input
                  v-model="proveedor.ciudad"
                  type="text"
                  class="form-control"
                  id="last_name"
                  placeholder="Ingrese localidad del proveedor"
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
                  <h3 class="mb-0">Listado de Proveedores</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Nuevo Proveedor</base-button
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
                  <tr v-for="proveedor in proveedores" :key="proveedor.id">
                    <th scope="row">{{ proveedor.id }}</th>
                    <td>{{ proveedor.nombre }}</td>
                    <td>{{ proveedor.tipo_doc }} - {{ proveedor.num_doc }}</td>
                    <td>{{ proveedor.direccion }} - {{ proveedor.ciudad }}</td>
                    <td>{{ proveedor.telefono }}</td>
                    <td>{{ proveedor.email }}</td>
                    <td>
                      <button
                        @click="
                          modificar = true;
                          abrirModal(proveedor);
                        "
                        class="btn btn-secondary btn-sm"
                      >
                        Editar
                      </button>
                      <button
                        @click="eliminar(proveedor.id)"
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
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      proveedor: {
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
      tituloModal: "",
      proveedores: [],
      isValid: false,
    };
  },

  validations: {
    proveedor: {
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

    listar_proveedores() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "proveedores", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          this.proveedores = res.data;
          console.table(res.data);
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
            process.env.VUE_APP_RUTA_API + "proveedores/" + this.id,
            this.proveedor,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModal();
            this.listar_proveedores();
            swal("Exito!", "El Proveedor se ha modificado!", "success");
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
          .post(process.env.VUE_APP_RUTA_API + "proveedores", this.proveedor, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => {
            this.cerrarModal();
            this.listar_proveedores();
            swal("Exito!", "El Proveedor se ha creado!", "success");
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
        text: "El Proveedor será eliminado definitavemente!",
        icon: "warning",
        buttons: ["Cancelar", " Si "],
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(process.env.VUE_APP_RUTA_API + "proveedores/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((res) => {
              this.cerrarModal();
              this.listar_proveedores();
              swal("Exito!", "El Proveedor se ha eliminado!", "success");
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
        this.tituloModal = "Modificar Proveedor";
        this.proveedor.nombre = data.nombre;
        this.proveedor.tipo_doc = data.tipo_doc;
        this.proveedor.num_doc = data.num_doc;
        this.proveedor.ciudad = data.ciudad;
        this.proveedor.direccion = data.direccion;
        this.proveedor.email = data.email;
        this.proveedor.telefono = data.telefono;
      } else {
        this.id = 0;
        this.tituloModal = "Crear Proveedor";
        this.proveedor.nombre = data.nombre;
        this.proveedor.tipo_doc = data.tipo_doc;
        this.proveedor.num_doc = data.num_doc;
        this.proveedor.ciudad = data.ciudad;
        this.proveedor.direccion = data.direccion;
        this.proveedor.email = data.email;
        this.proveedor.telefono = data.telefono;
      }
    },
    cerrarModal() {
      this.modal = 0;
    },
  },

  created() {
    this.listar_proveedores();
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
