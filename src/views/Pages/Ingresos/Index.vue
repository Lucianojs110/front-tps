<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <!-- Modal Ver datos -->
    <div
      class="modal"
      :class="{ mostrar: modalVista }"
      style="overflow-y: scroll"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">{{ tituloModal }}</h4>
            <button
              @click="cerrarModalVista()"
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
                  disabled
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
              </div>

              <div class="col-md-6">
                <label>Tipo de Grano</label>

                <select
                  id="tipo_doc"
                  v-model="ingreso.id_producto"
                  class="form-control"
                  disabled
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="1">Soja</option>
                  <option value="2">Girasol</option>
                  <option value="3">Maíz</option>
                </select>
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Cantidad (kg.)</label>
                <input
                  v-model="ingreso.cantidad"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  disabled
                />
              </div>
              <div class="col-md-6">
                <label>Numero Carta Porte</label>
                <input
                  v-model="ingreso.num_carta_porte"
                  type="text"
                  class="form-control"
                  id="carta_porte"
                  placeholder="Ingrese carta porte"
                  disabled
                />
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Condición</label>
                <select
                  id="condicion"
                  v-model="ingreso.condicion"
                  class="form-control"
                  disabled
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="Sucia">Sucia</option>
                  <option value="Limpia">Limpia</option>
                  <option value="Partida">Partida</option>
                </select>
              </div>

              <div class="col-md-6">
                <label>Factor Humedad</label>
                <input
                  v-model="ingreso.humedad"
                  type="number"
                  class="form-control"
                  id="humedad"
                  placeholder="Ingrese la Humedad"
                  disabled
                />
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Factor de Densidad</label>
                <input
                  v-model="ingreso.densidad"
                  type="text"
                  class="form-control"
                  id="carta_porte"
                  placeholder="Ingrese factor densidad"
                  disabled
                />
              </div>
              <div class="col-md-6">
                <label>Patente Transporte</label>
                <input
                  v-model="ingreso.patente_transporte"
                  type="text"
                  class="form-control"
                  id="carta_porte"
                  placeholder="Ingrese patente transporte"
                  disabled
                />
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Fecha de cala</label>

                <b-datepicker
                  v-model="ingreso.fecha_entrada"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                  disabled
                >
                </b-datepicker>
              </div>

              <div class="col-md-3">
                <label>Hora de cala</label>

                <b-col md="auto">
                  <input
                    v-model="ingreso.hora_entrada"
                    type="text"
                    class="form-control"
                    id="carta_porte"
                    disabled
                  />
                </b-col>
              </div>

              <div class="col-md-3">
                <label>Rechazado</label>
                <select
                  id="rechazado"
                  v-model="ingreso.rechazado"
                  class="form-control"
                  disabled
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="No">No</option>
                  <option value="Si">Si</option>
                </select>
              </div>
            </div>
            <!-- Fin Fila -->
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              @click="cerrarModalVista()"
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin modal vista -->

    <!-- Modal Crear y Editar -->
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

              <div class="col-md-6">
                <label>Tipo de Grano</label>

                <select
                  id="tipo_doc"
                  v-model="ingreso.id_producto"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.id_producto.$error,
                  }"
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="1">Soja</option>
                  <option value="2">Girasol</option>
                  <option value="3">Maíz</option>
                </select>
                <div
                  v-if="isValid && !$v.ingreso.id_producto.required"
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
                <label>Cantidad (kg.)</label>
                <input
                  v-model="ingreso.cantidad"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.cantidad.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.ingreso.cantidad.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>
              <div class="col-md-6">
                <label>Numero Carta Porte</label>
                <input
                  v-model="ingreso.num_carta_porte"
                  type="text"
                  class="form-control"
                  id="carta_porte"
                  placeholder="Ingrese carta porte"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.num_carta_porte.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.ingreso.num_carta_porte.required"
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
                <label>Condición</label>
                <select
                  id="condicion"
                  v-model="ingreso.condicion"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.condicion.$error,
                  }"
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="Sucia">Sucia</option>
                  <option value="Limpia">Limpia</option>
                  <option value="Partida">Partida</option>
                </select>
                <div
                  v-if="isValid && !$v.ingreso.condicion.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6">
                <label>Factor Humedad</label>
                <input
                  v-model="ingreso.humedad"
                  type="number"
                  class="form-control"
                  id="humedad"
                  placeholder="Ingrese la Humedad"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.humedad.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.ingreso.humedad.required"
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
                <label>Factor de Densidad</label>
                <input
                  v-model="ingreso.densidad"
                  type="text"
                  class="form-control"
                  id="carta_porte"
                  placeholder="Ingrese factor densidad"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.densidad.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.ingreso.densidad.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>
              <div class="col-md-6">
                <label>Patente Transporte</label>
                <input
                  v-model="ingreso.patente_transporte"
                  type="text"
                  class="form-control"
                  id="carta_porte"
                  placeholder="Ingrese patente transporte"
                />
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Fecha de cala</label>

                <b-datepicker
                  v-model="ingreso.fecha_entrada"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                  :class="{
                    'is-invalid': isValid && $v.ingreso.fecha_entrada.$error,
                  }"
                >
                </b-datepicker>

                <div
                  v-if="isValid && !$v.ingreso.fecha_entrada.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-3">
                <label>Hora de cala</label>

                <b-form-timepicker
                  id="datepicker-valid"
                  :state="true"
                  v-model="ingreso.hora_entrada"
                  locale="es"
                  placeholder="hora"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.hora_entrada.$error,
                  }"
                >
                </b-form-timepicker>

                <div
                  v-if="isValid && !$v.ingreso.hora_entrada.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-3">
                <label>Rechazado</label>
                <select
                  id="rechazado"
                  v-model="ingreso.rechazado"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.ingreso.rechazado.$error,
                  }"
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="No">No</option>
                  <option value="Si">Si</option>
                </select>
                <div
                  v-if="isValid && !$v.ingreso.rechazado.required"
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
                <template v-slot:cell(producto)="data">
                  {{ data.item.producto.nombre }}
                </template>
                <template v-slot:cell(proveedor)="data">
                  {{ data.item.proveedor.nombre }}
                </template>
                <template v-slot:cell(cantidad)="data">
                  {{ data.item.cantidad }} kg.
                </template>
                <template v-slot:cell(acciones)="data">
                  <button
                    @click="
                      modificar = true;
                      abrirModalVista(data.item);
                    "
                    class="btn btn-light btn-sm"
                  >
                    Ver
                  </button>
                  <button
                    @click="
                      modificar = true;
                      abrirModal(data.item);
                    "
                    class="btn btn-secondary btn-sm"
                  >
                    Editar
                  </button>
                  <button
                    @click="eliminar(data.item.id)"
                    class="btn btn-danger btn-sm"
                  >
                    Eliminar
                  </button>
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

<script src="https://unpkg.com/vue@2.6.2/dist/vue.min.js"></script>
<script src="https://unpkg.com/bootstrap-vue@2.21.2/dist/bootstrap-vue.min.js"></script>

<script>
import axios from "axios";
import { required } from "vuelidate/lib/validators";
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
        "producto",
        "proveedor",
        "fecha_entrada",
        "cantidad",
        "condicion",
        "rechazado",
        "acciones",
      ],
      selected: new Date(),
      showWeekNumber: false,
      locale: "es-ES",
      perPage: 10,
      currentPage: 1,
      filter: "",

      ingreso: {
        id_proveedor: "",
        fecha_entrada: "",
        id_tipo_grano: "",
        cantidad: "",
        condicion: "",
        humedad: "",
        densidad: "",
        patente_transporte: "",
        rechazado: "",
        num_carta_porte: "",
      },

      id: 0,
      modificar: true,
      modal: 0,
      modalVista: 0,
      tituloModal: "",
      isValid: false,
      proveedores: [],
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
      id_producto: {
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
      num_carta_porte: {
        required,
      },
      densidad: {
        required,
      },
      rechazado: {
        required,
      },
    },
  },

  methods: {
    selectCategory(event) {
      console.log(event.target.value);
    },
    clearDate() {
      this.selected = null;
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
            this.ingreso,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModal();
            this.listar_ingresos();
            swal("Exito!", "El Ingreso se ha modificado!", "success");
            this.$v.$reset();
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
          .post(process.env.VUE_APP_RUTA_API + "ingreso", this.ingreso, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => {
            this.cerrarModal();
            this.listar_ingresos();
            swal("Exito!", "El Ingreso se ha creado con exito!", "success");
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
        text: "El Ingreso será eliminado definitavemente!",
        icon: "warning",
        buttons: ["Cancelar", " Si "],
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(process.env.VUE_APP_RUTA_API + "ingreso/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((res) => {
              this.cerrarModal();
              this.listar_ingresos();
              swal("Exito!", "El Ingreso se ha eliminado!", "success");
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
        this.ingreso.id_proveedor = data.id_proveedor;
        this.ingreso.fecha_entrada = data.fecha_entrada;
        this.ingreso.hora_entrada = data.hora_entrada;
        this.ingreso.id_producto = data.id_producto;
        this.ingreso.cantidad = data.cantidad;
        this.ingreso.num_carta_porte = data.num_carta_porte;
        this.ingreso.condicion = data.condicion;
        this.ingreso.humedad = data.humedad;
        this.ingreso.densidad = data.densidad;
        this.ingreso.patente_transporte = data.patente_transporte;
        this.ingreso.rechazado = data.rechazado;
      } else {
        this.id = 0;
        this.tituloModal = "Crear Ingreso";
        this.ingreso.id_proveedor = "";
        this.ingreso.fecha_entrada = "";
        this.ingreso.hora_entrada = "";
        this.ingreso.id_producto = "";
        this.ingreso.cantidad = "";
        this.ingreso.num_carta_porte = "";
        this.ingreso.condicion = "";
        this.ingreso.humedad = "";
        this.ingreso.densidad = "";
        this.ingreso.patente_transporte = "";
        this.ingreso.rechazado = "";
      }
    },

    abrirModalVista(data = {}) {
      this.modalVista = 1;
      this.id = data.id;
      this.tituloModal = "Ver datos Ingreso";
      this.ingreso.id_proveedor = data.id_proveedor;
      this.ingreso.fecha_entrada = data.fecha_entrada;
      this.ingreso.hora_entrada = data.hora_entrada;
      this.ingreso.id_tipo_grano = data.id_producto;
      this.ingreso.cantidad = data.cantidad;
      this.ingreso.num_carta_porte = data.num_carta_porte;
      this.ingreso.condicion = data.condicion;
      this.ingreso.humedad = data.humedad;
      this.ingreso.densidad = data.densidad;
      this.ingreso.patente_transporte = data.patente_transporte;
      this.ingreso.rechazado = data.rechazado;
    },

    cerrarModalVista() {
      this.modalVista = 0;
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
