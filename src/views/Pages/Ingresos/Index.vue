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
                <label>Proveedor</label>
                <select
                  id="tipo_doc"
                  v-model="ingreso.id_proveedor"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.id_proveedor.$error,
                  }"
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option
                    selected
                    v-for="proveedor in proveedores"
                    :key="proveedor.id"
                    :value="proveedor.id"
                  >
                    {{ proveedor.nombre }}
                  </option>
                </select>
                <div
                  v-if="isValid && !$v.ingreso.id_proveedor.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-3">
                <label>fecha</label>
                  <input
                  v-model="ingreso.fecha_entrada"
                  type="text"
                  class="form-control"
                  id="num_doc"
                  placeholder="Numero de CUIT o DNI"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.fecha_entrada.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.ingreso.fecha_entrada.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

           <div class="col-md-3">
                <label>Hora</label>
                  <input
                  v-model="ingreso.hora_entrada"
                  type="text"
                  class="form-control"
                  id="num_doc"
                  placeholder="Numero de CUIT o DNI"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.hora_entrada.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.ingreso.hora_entrada.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
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
                  <h3 class="mb-0">Listado de Cala</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Nuevo Ingreso</base-button
                  >
                  
                  <b-form-input 
                    v-model="filter"
                    type="search"
                    placeholder="Buscar"
                    class="mt-2"
                  >
                  </b-form-input>
                </b-col>
              </b-row>
            </template>

            <div class="table-responsive">
              <b-table
                striped
                hover
                :items="items"
                :fields="fields"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
              >
                <template v-slot:cell(grano)="data">
                  {{ data.item.tipo_grano.nombre }}
                </template>
                <template v-slot:cell(proveedor)="data">
                  {{ data.item.proveedor.nombre }}
                </template>
                <template v-slot:cell(acciones)="data">
                  <b-button
                    variant="danger btn-sm"
                    @clic="eliminar(data.item.id)"
                    >Eliminar</b-button
                  >
                </template>
              </b-table>
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
              >
              </b-pagination>
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
import { required, minLength } from "vuelidate/lib/validators";
export default {
  props: ["items"],
  computed: {
    rows() {
      return this.items.length;
    },
  },
  data() {
    return {
      fields: [
        "id",
        "grano",
        "proveedor",
        "fecha_entrada",
        "hora_entrada",
        "cantidad",
        "condicion",
        "humedad",
        "acciones",
      ],

      perPage: 4,
      currentPage: 1,
      filter: "",

      ingreso: {
        id_proveedor: "",
        fecha_entrada: "",
        id_tipo_grano: "",
        cantidad: "",
        condicion: "",
        humedad: "",
        num_carta_porte: "",
      },

      id: 0,
      modificar: true,
      modal: 0,
      tituloModal: "",
      isValid: false,
      proveedores:[]
    };
  },

  validations: {
    ingreso: {
      id_proveedor: {
        required,
      },
      fecha_entrada: {
        required,
      },
      hora_entrada: {
        required,
      },
      id_tipo_grano: {
        required,
      },
      cantidad: {
        required,
      },
      condicion: {
        required,
      },
      humedad: {
        required,
      },
    },
  },

  methods: {
    selectCategory(event) {
      console.log(event.target.value);
    },

    listar_ingresos() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "ingreso", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          this.items = res.data;
          console.table(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
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
          console.table(this.proveedores);
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
            process.env.VUE_APP_RUTA_API + "ingreso/" + this.id,
            this.proveedor,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModal();
            this.listar_proveedores();
            swal("Exito!", "El Ingreso se ha modificado!", "success");
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
        this.tituloModal = "Modificar Ingreso";
        this.ingreso.id_proveedor = items.id_proveedor;
        this.ingreso.fecha_entrada = items.fecha_entrada;
        this.ingreso.hora_entrada = items.hora_entrada;
        this.ingreso.id_tipo_grano = items.id_tipo_grano;
        this.ingreso.cantidad = items.cantidad;
        this.ingreso.condicion = items.condicion;
        this.ingreso.humedad = items.humedad;
     
      } else {
        this.id = 0;
        this.tituloModal = "Crear Ingreso";
    this.ingreso.id_proveedor = "";
        this.ingreso.fecha_entrada = "";
        this.ingreso.hora_entrada = "";
        this.ingreso.id_tipo_grano = "";
        this.ingreso.cantidad = "";
        this.ingreso.condicion = "";
        this.ingreso.humedad = "";
      }
    },
    cerrarModal() {
      this.modal = 0;
    },
  },

  created() {
    this.listar_ingresos();
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
.pagination {
  display: flex;
  justify-content: center;
}
</style>
