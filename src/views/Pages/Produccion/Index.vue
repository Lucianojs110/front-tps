<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

 <!-- Modal Ver datos -->
   <div class="modal" :class="{ mostrar: modalVista }" style="overflow-y: scroll">
      <div class="modal-dialog modal-md">
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
            Cantidad de {{finalizar.producto}} enviada a producción: {{finalizar.cantidad}}kg
            <hr>
            <div class="row">

            
            <div class="col-md-6" v-if="finalizar.acciones == 'Desactivar'">
                <label>Cantidad desactivada (kg.)</label>
                <input
                  v-model="finalizar.cantidad_desactivada"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en kilogramos"
                  :class="{
                    'is-invalid': isValid && $v.finalizar.cantidad_desactivada.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.finalizar.cantidad_desactivada.required"
                  class="invalid-feedback"
                >
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
                    'is-invalid': isValid && $v.finalizar.cantidad_expeler.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.finalizar.cantidad_expeler.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

                 <div class="col-md-6" v-if="finalizar.acciones == 'Procesar'">
                <label>Cantidad Aceite (lts.)</label>
                <input
                  v-model="finalizar.cantidad_aceite"
                  type="number"
                  class="form-control"
                  id="cantidad"
                  placeholder="Ingrese la cantidad en litros"
                  :class="{
                    'is-invalid': isValid && $v.finalizar.cantidad_aceite.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.finalizar.cantidad_aceite.required"
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
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="fin_prod()"
            >
              Agregar al Stock
            </button>
             <button
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
             
            >
              Crear una venta
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
                  <option value="Procesar">Procesar</option>
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
              
                 <template v-slot:cell(cantidad)="data">
                  {{ data.item.cantidad }} kg.
                </template>
                <template v-slot:cell(accion)="data">
                   
                      <button  v-if="data.item.estado != 'finalizado'"
                        @click="
                          modificar = true;
                          abrirModalVista(data.item);
                        "
                        class="btn btn-light btn-sm"
                      >
                        Finalizar
                      </button>
                     
                      <button v-if="data.item.estado != 'finalizado'"
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
import { required  } from "vuelidate/lib/validators";
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
      },

       finalizar: {
        cantidad_expeler: "",
        cantidad_aceite: "",
        cantidad_desactivada: "",
      },

      id: 0,
      modificar: true,
      modal: 0,
      modalVista: 0,
      tituloModal: "",
      isValid: false,
      
    };
  },

  validations: {
    produccion: {
      id_producto: {
        required,
      },
      cantidad: {
        required,
      },
      acciones: {
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
        })
        .then((res) => {
          this.items = res.data;
          console.table(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    },

  
    fin_prod() {
        console.log(this.id)
     
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
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
         
      
    },


    guardar() {
      console.log('guardar')
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
            this.$v.$reset();
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
        this.produccion.acciones= data.acciones;
        this.produccion.cantidad = data.cantidad;
      } else {
      this.id = 0;
        this.tituloModal = "Ingresar a Producción";
        this.produccion.id_producto = "";
        this.produccion.acciones= "";
        this.produccion.cantidad = "";
      }
      
    },

      abrirModalVista(data = {}) {
      this.modalVista = 1;
       this.id = data.id;
        this.tituloModal = "Finalizar proceso";
        this.finalizar.cantidad_expeler = "";
        this.finalizar.cantidad_aceite = "";
        this.finalizar.cantidad_desactivada = "";
        this.finalizar.id_producto = data.id_producto;
        this.finalizar.acciones= data.acciones;
        this.finalizar.cantidad = data.cantidad;
        if(data.id_producto==1){
          this.finalizar.producto = 'Soja';
        }
        if(data.id_producto==2){
          this.finalizar.producto = 'Girasol';
        }
        if(data.id_producto==3){
          this.finalizar.producto = 'Maíz';
        }
    },

    cerrarModalVista() {
      this.modalVista = 0;
    },
    cerrarModal() {
      this.modal = 0;
    },
  },

  created() {
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
