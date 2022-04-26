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
                <label>Cliente</label>
                <select
                  id="tipo_doc"
                  v-model="venta.id_cliente"
                  class="form-control"
                  disabled
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
              </div>

              <div class="col-md-6">
                <label>Producto</label>

                <select
                  id="tipo_doc"
                  v-model="venta.id_producto"
                  class="form-control"
                  disabled
                >
                  <option selected disabled value="">Seleccione...</option>
                  <option value="1">Soja</option>
                  <option value="2">Girasol</option>
                  <option value="3">Maíz</option>
                  <option value="4">Soja Desactivada</option>
                  <option value="5">Girasol Desactivado</option>
                  <option value="6">Maíz Desactivado</option>
                  <option value="7">Aceite Soja</option>
                  <option value="8">Aceite Girasol</option>
                  <option value="9">Expeler Soja</option>
                  <option value="10">Expeler Girasol</option>
                </select>
              </div>
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Cantidad</label>
                <input
                  v-model="venta.cantidad"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  disabled
                />
              </div>

                 <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="venta.fecha"
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
                <label>Cliente</label>
                <select
                  id="tipo_doc"
                  v-model="venta.id_cliente"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.venta.id_cliente.$error,
                  }"
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
                <div
                  v-if="isValid && !$v.venta.id_cliente.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-6">
                <label>Producto</label>

                <select
                  id="tipo_doc"
                  v-model="venta.id_producto"
                  class="form-control"
                  :class="{
                    'is-invalid': isValid && $v.venta.id_producto.$error,
                  }"
                >
                  <option selected disabled value="">Seleccione...</option>
                   <option value="1">Soja</option>
                  <option value="2">Girasol</option>
                  <option value="3">Maíz</option>
                  <option value="4">Soja Desactivada</option>
                  <option value="5">Girasol Desactivado</option>
                  <option value="6">Maíz Desactivado</option>
                  <option value="7">Aceite Soja</option>
                  <option value="8">Aceite Girasol</option>
                  <option value="9">Expeler Soja</option>
                  <option value="10">Expeler Girasol</option>
                </select>
                <div
                  v-if="isValid && !$v.venta.id_producto.required"
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
                <label>Cantidad</label>
                <input
                  v-model="venta.cantidad"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  :class="{
                    'is-invalid': isValid && $v.venta.cantidad.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.venta.cantidad.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

                  <div class="col-md-6">
                <label>Fecha de cala</label>

                <b-datepicker
                  v-model="venta.fecha"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                  :class="{
                    'is-invalid': isValid && $v.venta.fecha.$error,
                  }"
                >
                </b-datepicker>

                <div
                  v-if="isValid && !$v.venta.fecha.required"
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
                  <h3 class="mb-0">Listado de Ventas</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Nueva Venta</base-button
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
                <template v-slot:cell(cliente)="data">
                  {{ data.item.cliente.nombre }}
                </template>
                <template v-slot:cell(fecha)="data">
                  {{ $moment(data.item.fecha).format('DD-MM-YYYY') }}
                </template>
                <template v-slot:cell(cantidad)="data">
                  {{ data.item.cantidad }}
                </template>
                
                <template v-slot:cell(acciones)="data">
                   
                  <RouterLink :to="`venta/${data.item.id}`" 
                  class="btn btn-success btn-sm"
                  v-if="data.item.cae"> 
                  Ver Factura
                  </RouterLink>
                  <button v-if="!data.item.cae"
                    @click="registrar(data.item.id)"
                    class="btn btn-success btn-sm"
                  >
                    Registrar Factura 
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
        "cliente",
        "fecha",
        "cantidad",
        "total",
        "acciones",
      ],
      selected: new Date(),
      showWeekNumber: false,
      locale: "es-ES",
      perPage: 10,
      currentPage: 1,
      filter: "",

      venta: {
        id_cliente: "",
        fecha: "",
        id_producto: "",
        cantidad: "",
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
    venta: {
      id_cliente: {
        required,
      },
      fecha: {
        required,
      },
    
      id_producto: {
        required,
      },
      cantidad: {
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

    listar_ventas() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "ventas", {
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

    listar_clientes() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "clientes", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          this.clientes = res.data;
          console.table(this.clientes);
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
            process.env.VUE_APP_RUTA_API + "ventas/" + this.id,
            this.venta,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModal();
            this.listar_ventas();
            swal("Exito!", "la venta se ha modificado!", "success");
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
          .post(process.env.VUE_APP_RUTA_API + "ventas", this.venta, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => {
            this.cerrarModal();
            this.listar_ventas();
            swal("Exito!", "La venta se ha creado con exito!", "success");
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
        text: "La venta será eliminada definitavemente!",
        icon: "warning",
        buttons: ["Cancelar", " Si "],
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(process.env.VUE_APP_RUTA_API + "ventas/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((res) => {
              this.cerrarModal();
              this.listar_ventas();
              swal("Exito!", "El Ingreso se ha eliminado!", "success");
            })
            .catch(function (error) {
              var array = Object.values(error.response.data.errors);
              array.forEach(swal(String(array)));
            });
        }
      });
    },

     registrar(id) {
        axios
          .post(
            process.env.VUE_APP_RUTA_API + "afip/" + id,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
      
            this.listar_ventas();
            swal("Exito!", "Se ha registrado la factura correctamente!", "success");
         
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
      
    },

    abrirModal(data = {}) {
      this.modal = 1;
      if (this.modificar) {
        this.id = data.id;
        this.tituloModal = "Modificar venta";
        this.venta.id_cliente = data.id_cliente;
        this.venta.fecha = data.fecha;
        this.venta.id_producto = data.id_producto;
        this.venta.cantidad = data.cantidad;
       
      } else {
        this.id = 0;
        this.tituloModal = "Crear Venta";
        this.venta.id_cliente = "";
        this.venta.fecha = "";
        this.venta.id_producto = "";
        this.venta.cantidad = "";
      }
    },

    abrirModalVista(data = {}) {
      this.modalVista = 1;
      this.id = data.id;
      this.tituloModal = "Ver datos Venta";
      this.venta.id_cliente = data.id_cliente;
      this.venta.fecha = data.fecha;
      this.venta.id_producto = data.id_producto;
      this.venta.cantidad = data.cantidad;
    },

    cerrarModalVista() {
      this.modalVista = 0;
    },
    cerrarModal() {
      this.modal = 0;
    },
  },

  created() {
    this.listar_ventas();
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
.pagination {
  display: flex;
  justify-content: center;
}
</style>
