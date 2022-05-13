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


              <div class="col-md-6" v-if="crear_venta">
                <label>Cliente</label>
                <select

                  v-model="finalizar.id_cliente"
                  class="form-control"
                  
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option
                    selected
                    v-for="cliente in clientes"
                    :key="cliente.id"
                    :value="cliente.id"
                  >
                    {{ cliente.nombre }}
                  </option>
                </select>
                <div v-if="isValid_cant_des" class="invalid-feedback">
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6" v-if="finalizar.acciones == 'Desactivar'">
                <label>Cantidad desactivada (kg.)</label>
                <input
                  v-model="finalizar.cantidad_desactivada"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  :class="{
                    'is-invalid': isValid_cant_des,
                  }"
                />
                <div v-if="isValid_cant_des" class="invalid-feedback">
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6" v-if="finalizar.acciones == 'Procesar'">
                <label>Cantidad expeler (kg.)</label>
                <input
                  v-model="finalizar.cantidad_expeler"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  :class="{
                    'is-invalid': isValid_cant_expeler,
                  }"
                />
                <div v-if="isValid_cant_expeler" class="invalid-feedback">
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6" v-if="finalizar.acciones == 'Procesar'">
                <label>Cantidad Aceite (kg.)</label>
                <input
                  v-model="finalizar.cantidad_aceite"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en litros"
                  :class="{
                    'is-invalid': isValid_cant_aceite,
                  }"
                />
                <div v-if="isValid_cant_aceite" class="invalid-feedback">
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="finalizar.fecha"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                  :class="{
                    'is-invalid': isValid_fecha,
                  }"
                >
                </b-datepicker>
                <div v-if="isValid_fecha" class="invalid-feedback">
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6">
                <label for="timepicker-valid">Seleccione la Hora</label>
                <b-form-timepicker
                  id="datepicker-valid"
                  :state="true"
                  v-model="finalizar.hora"
                  locale="es"
                  placeholder="Ingrese la hora"
                  :class="{
                    'is-invalid': isValid_hora,
                  }"
                >
                </b-form-timepicker>
                <div v-if="isValid_hora" class="invalid-feedback">
                  El campo es requerido
                </div>
              </div>
            </div>

            <!-- Fin Fila -->
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              v-if="finalizar.acciones == 'Procesar'"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="fin_prod()"
            >
              Agregar al Stock
            </button>
            <button
              v-if="finalizar.acciones == 'Desactivar' && !crear_venta"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="fin_prod_desactivar()"
            >
              Agregar al Stock
            </button>

            <button
             @click="crearVenta()"
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
              v-if="finalizar.acciones == 'Desactivar' && !crear_venta"
             
            >
              Crear una venta
            </button>

             <button
             @click="fin_prod_venta()"
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
              v-if="crear_venta"
             
            >
              finalizar venta
            </button>
             
            <button
              @click="cerrarModalVista()"
              type="button"
              class="btn btn-light"
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
              <div class="col-md-4" v-if="!modificar">
                <label>Tipo de Grano</label>
                <select
                  id="tipo_doc"
                  v-model="produccion.id_producto"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.produccion.id_producto.$error,
                  }"
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="1">Soja</option>
                  <option value="2">Girasol</option>
                  <option value="3">Maíz</option>
                </select>
                <div
                  v-if="isValid && !$v.produccion.id_producto.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-4" v-if="!modificar">
                <label>Acción</label>
                <select
                  id="tipo_doc"
                  v-model="produccion.acciones"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.produccion.acciones.$error,
                  }"
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="Desactivar">Desactivar</option>
                  <option value="Procesar" v-if="produccion.id_producto!='3'">Procesar</option>
                </select>
                <div
                  v-if="isValid && !$v.produccion.acciones.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-4">
                <label>Cantidad (kg.)</label>
                <input
                  v-model="produccion.cantidad"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  :class="{
                    'is-invalid': isValid && $v.produccion.cantidad.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.produccion.cantidad.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
                 <div
                  v-if="isValid && !$v.produccion.cantidad.decimal"
                  class="invalid-feedback"
                >
                  Ingrese un numero valido
                </div>
              </div>

              <br />

              <div class="col-md-8">
                <label>Fecha</label>
                <b-datepicker
                  v-model="produccion.fecha"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                  :class="{
                    'is-invalid': isValid && $v.produccion.fecha.$error,
                  }"
                >
                </b-datepicker>
                <div
                  v-if="isValid && !$v.produccion.fecha.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-4">
                <label>Hora</label>
                <b-form-timepicker
                  id="datepicker-valid"
                  :state="true"
                  placeholder="seleccione la hora"
                  v-model="produccion.hora"
                  locale="es"
                  :class="{
                    'is-invalid': isValid && $v.produccion.hora.$error,
                  }"
                >
                </b-form-timepicker>

                <div
                  v-if="isValid && !$v.produccion.hora.required"
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
                  <h3 class="mb-0">Listado de productos en producción</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Ingresar a producción</base-button
                  >

               
                </b-col>
              </b-row>
            </template>

                        <div class="row p-2">
              <div class="col-md-3">
                <label>Fecha Inicio</label>

                <b-datepicker
                  v-model="filtro.fecha_entrada_inicio"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                >
                </b-datepicker>
              </div>

              <div class="col-md-3">
                <label>Fecha Final</label>

                <b-datepicker
                  v-model="filtro.fecha_entrada_fin"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  }"
                >
                </b-datepicker>
              </div>

              <div class="col-md-2">
                <label>Acción</label>
                <select
                  id="rechazado"
                  v-model="filtro.accion"
                  class="form-control"
                >
                  <option selected value="">Seleccione...</option>
                  <option value="">Todos</option>
                  <option value="Procesar">Procesar</option>
                  <option value="Desactivar">Desactivar</option>
                </select>
              </div>

                   <div class="col-md-2">
                <label>Estado</label>
                <select
                  id="rechazado"
                  v-model="filtro.estado"
                  class="form-control"
                >
                  <option selected value="">Seleccione...</option>
                  <option value="">Todos</option>
                  <option value="en proceso">En Proceso</option>
                  <option value="finalizado">Finalizado</option>
                </select>
              </div>

              <div class="col-md-2">
                <label>Tipo de Grano</label>

                <select v-model="filtro.id_producto" class="form-control">
                  <option selected disabled value="">Seleccione...</option>
                  <option value="">Todos</option>
                  <option value="1">Soja</option>
                  <option value="2">Girasol</option>
                  <option value="3">Maíz</option>
                </select>
              </div>

              <div class="col-md-1">
                <br />
                <base-button @click="listar_produccion" size="md" type="primary"
                  >Filtrar</base-button
                >

               
              </div>


                <div class="col-md-3">
                <br />
              

                 <base-button @click="downloadExl" size="md" type="primary"
                >Exportar en exel</base-button
              >
              </div>
            </div>

            
            <div class="table-responsive" >
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
                <template v-slot:cell(fecha)="data">
                  {{ $moment(data.item.fecha).format('DD-MM-YYYY') }}
                </template>
                <template v-slot:cell(cantidad)="data">
                  {{ data.item.cantidad }} kg.
                </template>
                <template v-slot:cell(accion)="data">
                  <button
                    v-if="data.item.estado != 'finalizado'"
                    @click="
                      modificar = true;
                      abrirModalVista(data.item);
                    "
                    class="btn btn-light btn-sm"
                  >
                    Finalizar
                  </button>

                  <button
                    v-if="data.item.estado != 'finalizado'"
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



            <div class="table-responsive" id="tableId" style="display:none">
              <b-table
                striped
                hover
                :items="items"
                :fields="fields2"
                :per-page="perPage"
                :current-page="currentPage"
                :filter="filter"
              >
                <template v-slot:cell(producto)="data">
                  {{ data.item.producto.nombre }}
                </template>
                <template v-slot:cell(fecha)="data">
                  {{ $moment(data.item.fecha).format('DD-MM-YYYY') }}
                </template>
                <template v-slot:cell(cantidad)="data">
                  {{ data.item.cantidad }} kg.
                </template>
           
              </b-table>
            
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
import { required, decimal } from "vuelidate/lib/validators";
var XLSX = require("xlsx");
var FileSaver = require("file-saver");
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
        "cantidad",
        "acciones",
        "estado",
        "fecha",
        "hora",
        "accion",
      ],

       fields2: [
        "id",
        "producto",
        "cantidad",
        "acciones",
        "estado",
        "fecha",
        "hora",
     
      ],
      selected: new Date(),
      showWeekNumber: false,
      locale: "es-ES",
      perPage: 10,
      currentPage: 1,
      filter: "",

      produccion: {
        id_producto: "",
        cantidad: "",
        acciones: "",
        fecha: "",
        hora: "",
      },

       filtro: {
        id_producto: "",
        fecha_entrada_fin: "",
        fecha_entrada_inicio: "",
        accion: "",
        estado: "",
      },

      finalizar: {
        cantidad_expeler: "",
        cantidad_aceite: "",
        cantidad_desactivada: "",
        hora: "",
        fecha: "",
      },

      id: 0,
      modificar: true,
      modal: 0,
      modalVista: 0,
      tituloModal: "",
      isValid: false,
      isValid_cant_des: false,
      isValid_cant_expeler: false,
      isValid_cant_aceite: false,
      isValid_fecha: false,
      isValid_hora: false,
      crear_venta: false,
      clientes: [],
      items_prod: ["Desactivar", "Procesar"],

    };
  },

  validations: {
    produccion: {
      id_producto: {
        required,
      },
      cantidad: {
        required,
        decimal
      },
      acciones: {
        required,
      },
      fecha: {
        required,
      },
      hora: {
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

   

    listar_produccion() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "produccion", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
           params: {
            id_producto: this.filtro.id_producto,
            accion: this.filtro.accion,
            fecha_entrada_inicio: this.filtro.fecha_entrada_inicio,
            fecha_entrada_fin: this.filtro.fecha_entrada_fin,
            estado: this.filtro.estado,
          },
        })
        .then((res) => {
          this.items = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
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
         
        })
        .catch((error) => {
          console.error(error);
        });
    },

    fin_prod() {
      if (
        this.finalizar.cantidad_aceite &&
        this.finalizar.cantidad_expeler &&
        this.finalizar.hora &&
        this.finalizar.fecha
      ) {
        axios
          .put(
            process.env.VUE_APP_RUTA_API + "finalizar/" + this.id,
            this.finalizar,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModalVista();
            this.listar_produccion();
            swal("Exito!", "El registro se ha modificado!", "success");
            this.$v.$reset();
            this.cerrarModal();
            this.isValid_cant_expeler = false;
            this.isValid_cant_aceite = false;
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
      } else {
        if (this.finalizar.hora == "") {
          this.isValid_hora = true;
        }
        if (this.finalizar.fecha == "") {
          this.isValid_fecha = true;
        }
        if (this.finalizar.cantidad_expeler == "") {
          this.isValid_cant_expeler = true;
        }
        if (this.finalizar.cantidad_aceite == "") {
          this.isValid_cant_aceite = true;
        }
      }
    },

    fin_prod_desactivar() {
      if (
        this.finalizar.cantidad_desactivada &&
        this.finalizar.hora &&
        this.finalizar.fecha
      ) {
        axios
          .put(
            process.env.VUE_APP_RUTA_API + "finalizar/" + this.id,
            this.finalizar,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModalVista();
            this.listar_produccion();
            swal("Exito!", "El registro se ha modificado!", "success");
            this.$v.$reset();
            this.cerrarModal();
            this.isValid_fecha = false;
            this.isValid_fecha = false;
            this.isValid_cant_des = false;
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
      } else {
        if (this.finalizar.hora == "") {
          this.isValid_hora = true;
        }
        if (this.finalizar.fecha == "") {
          this.isValid_fecha = true;
        }
        if (this.finalizar.cantidad_desactivada == "") {
          this.isValid_cant_des = true;
        }
      }
    },


    fin_prod_venta() {
      console.log(this.finalizar)
      if (
        this.finalizar.cantidad_desactivada &&
        this.finalizar.hora &&
        this.finalizar.fecha
      ) {
        axios
          .put(
            process.env.VUE_APP_RUTA_API + "vender/" + this.id,
            this.finalizar,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModalVista();
            this.listar_produccion();
            swal("Exito!", "El registro se ha modificado!", "success");
            this.$v.$reset();
            this.cerrarModal();
            this.isValid_fecha = false;
            this.isValid_hora = false;
            this.isValid_cant_des = false;
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
      } else {
        if (this.finalizar.hora == "") {
          this.isValid_hora = true;
        }
        if (this.finalizar.fecha == "") {
          this.isValid_fecha = true;
        }
        if (this.finalizar.cantidad_desactivada == "") {
          this.isValid_cant_des = true;
        }
      }
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
            process.env.VUE_APP_RUTA_API + "produccion/" + this.id,
            this.produccion,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.listar_produccion();
            swal("Exito!", "El registro se ha modificado!", "success");
            this.$v.$reset();
            this.cerrarModal();
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
          .post(process.env.VUE_APP_RUTA_API + "produccion", this.produccion, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => {
            this.listar_produccion();
            swal("Exito!", "El se ha ingresado con exito!", "success");
            //this.$v.$reset();
            this.cerrarModal();
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
        text: "El registro será eliminado definitavemente!",
        icon: "warning",
        buttons: ["Cancelar", " Si "],
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(process.env.VUE_APP_RUTA_API + "produccion/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((res) => {
              this.cerrarModal();
              this.listar_produccion();
              swal("Exito!", "El registro se ha eliminado!", "success");
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
        this.tituloModal = "Modificar produccion";
        this.produccion.id_producto = data.id_producto;
        this.produccion.acciones = data.acciones;
        this.produccion.cantidad = data.cantidad;
        this.produccion.fecha = data.fecha;
        this.produccion.hora = data.hora;
      } else {
        this.id = 0;
        this.tituloModal = "Ingresar a Producción";
        this.produccion.id_producto = "";
        this.produccion.acciones = "";
        this.produccion.cantidad = "";
        this.produccion.fecha = "";
        this.produccion.hora = "";
      }
    },

    abrirModalVista(data = {}) {
      this.modalVista = 1;
      this.id = data.id;
      this.tituloModal = "Finalizar proceso";
      this.finalizar.cantidad_expeler = "";
      this.finalizar.cantidad_aceite = "";
      this.finalizar.cantidad_desactivada = data.cantidad;
      this.finalizar.id_producto = data.id_producto;
      this.finalizar.acciones = data.acciones;
      this.finalizar.cantidad = data.cantidad;
      this.finalizar.fecha = "";
      this.finalizar.hora = "";
      this.finalizar.id_cliente = "";
      if (data.id_producto == 1) {
        this.finalizar.producto = "Soja";
      }
      if (data.id_producto == 2) {
        this.finalizar.producto = "Girasol";
      }
      if (data.id_producto == 3) {
        this.finalizar.producto = "Maíz";
      }
    },

    cerrarModalVista() {
      this.crear_venta = false;
      this.modalVista = 0;
      this.isValid_fecha = false;
      this.isValid_hora = false;
      this.isValid_cant_des = false;
      this.isValid_cant_expeler = false;
      this.isValid_cant_aceite = false;
    },
    cerrarModal() {
      this.modal = 0;
    },

     crearVenta() {
     
      this.crear_venta = true;
    },
    downloadExl() {
      let wb = XLSX.utils.table_to_book(document.getElementById("tableId")),
        wopts = {
          bookType: "xlsx",
          bookSST: false,
          type: "binary",
        },
        wbout = XLSX.write(wb, wopts);

      FileSaver.saveAs(
        new Blob([this.s2ab(wbout)], {
          type: "application/octet-stream;charset=utf-8",
        }),
        "Reporte produccion.xlsx"
      );
    },
    s2ab(s) {
      if (typeof ArrayBuffer !== "undefind") {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
      } else {
        var buf = new Array(s.length);
        for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
        return buf;
      }
    },
  
  },

  created() {
    this.listar_clientes();
    this.listar_produccion();
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
