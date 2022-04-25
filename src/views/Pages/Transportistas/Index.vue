<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

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
                <label>Nombre</label>
                <input
                  v-model="transportista.nombre_transportista"
                  type="text"
                  class="form-control"
                  id="nombre_transportista"
                  placeholder="Nombre Transportista"
                />
              </div>

              <div class="col-md-6">
                <label>Cuit</label>
                <input
                  v-model="transportista.cuit_chofer"
                  type="text"
                  class="form-control"
                  id="cuit_chofer"
                  placeholder="CUIT"
                />
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Carnet Profesional</label>
                <input
                  v-model="transportista.carnet_prof"
                  type="text"
                  class="form-control"
                  id="carnet_prof"
                  placeholder="Carnet Profesional"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_cprof"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Carnet Cocatra</label>
                <input
                  v-model="transportista.carnet_cocatra"
                  type="text"
                  class="form-control"
                  id="carnet_cocatra"
                  placeholder="Carnet Cocatra"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_ccocatra"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Cédula Chasis</label>
                <input
                  v-model="transportista.cedula_cha"
                  type="text"
                  class="form-control"
                  id="cedula_cha"
                  placeholder="Cédula Chasis"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_cha"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Cédula SemiAcoplado</label>
                <input
                  v-model="transportista.cedula_sem"
                  type="text"
                  class="form-control"
                  id="cedula_sem"
                  placeholder="Cédula SemiAcoplado"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_sem"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

             <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Vtv Chasis</label>
                <input
                  v-model="transportista.vtv_cha"
                  type="text"
                  class="form-control"
                  id="vtv_cha"
                  placeholder="Vtv Chasis"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_vtvcha"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Vtv Semiacoplado</label>
                <input
                  v-model="transportista.vtv_sem"
                  type="text"
                  class="form-control"
                  id="vtv_sem"
                  placeholder="Vtv Semiacoplado"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_vtvsem"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Constancia Ruta</label>
                <input
                  v-model="transportista.constancia_ruta"
                  type="text"
                  class="form-control"
                  id="constancia_ruta"
                  placeholder="Constancia Ruta"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_construt"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Constancia Senasa</label>
                <input
                  v-model="transportista.constancia_senasa"
                  type="text"
                  class="form-control"
                  id="constancia_senasa"
                  placeholder="Constancia Senasa"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_senasa"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Seguro Chasis</label>
                <input
                  v-model="transportista.seguro_cha"
                  type="text"
                  class="form-control"
                  id="seguro_cha"
                  placeholder="Seguro Chasis"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_segurocha"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Seguro Semiacoplado</label>
                <input
                  v-model="transportista.seguro_semi"
                  type="text"
                  class="form-control"
                  id="seguro_semi"
                  placeholder="Seguro Semiacoplado"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_segsemi"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
              </div>
           
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>RT Chofer</label>
                <input
                  v-model="transportista.rt_chofer"
                  type="text"
                  class="form-control"
                  id="rt_chofer"
                  placeholder="RT Chofer"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_rt"
                  :show-week-number="showWeekNumber"
                  :locale="locale"
                  placeholder="Seleccione la fecha..."
                  icon="calendar-today"
                  :icon-right="selected ? 'close-circle' : ''"
                  icon-right-clickable
                  @icon-right-click="clearDate"
                  trap-focus
                >
                </b-datepicker>
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
                  <h3 class="mb-0">Listado de Transportistas</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button
                    @click="
                      modificar = false;
                      abrirModal();
                    "
                    size="sm"
                    type="primary"
                    >Nuevo Transportista</base-button
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
                <template v-slot:cell(carnet_prof)="data">
                  {{ data.item.carnet_prof }}
                </template>
                <!-- <template v-slot:cell(cliente)="data">
                  {{ data.item.cliente.nombre }}
                </template>
                <template v-slot:cell(cantidad)="data">
                  {{ data.item.cantidad }}
                </template> -->
                <template v-slot:cell(acciones)="data">
                   
                  <!-- <RouterLink :to="`venta/${data.item.id}`" 
                  class="btn btn-secondary btn-sm"> 
                  Ver 
                  </RouterLink> -->

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
        "nombre_transportista",
        "carnet_prof",
        "carnet_cocatra",
        "cedula_cha",
        "cedula_sem",
        "vtv_cha",
        "acciones",
      ],
      selected: new Date(),
      showWeekNumber: false,
      locale: "es-ES",
      perPage: 10,
      currentPage: 1,
      filter: "",

      transportista: {
        carnet_prof: "",
        fechav_cprof: "",
        carnet_cocatra: "",
        fechav_ccocatra: "",
        cedula_cha: "",
        fechav_cha: "",
        cedula_sem: "",
        fechav_sem: "",
        vtv_cha: "",
        fechav_vtvcha: "",
        vtv_sem: "",
        fechav_vtvsem: "",
        constancia_ruta: "",
        fechav_construt: "",
        constancia_senasa: "",
        fechav_senasa: "",
        seguro_cha: "",
        fechav_segurocha: "",
        seguro_semi: "",
        fechav_segsemi: "",
        rt_chofer: "",
        fechav_rt: "",
        nombre_transportista:"",
        dni_chofer:"",
        cuit_chofer:"",
      },

      id: 0,
      modificar: true,
      modal: 0,
      tituloModal: "",
      transportistas: [],
      isValid: false,
    };
  },


   validations: {
    transportista: {
      nombre_transportista: {
        required,
      },
      carnet_prof: {
        required,
      },

       fechav_cprof: {
        required,
      },
       carnet_cocatra: {
        required,
      },
       fechav_ccocatra: {
        required,
      },
       cedula_cha: {
        required,
      },
       fechav_cha: {
        required,
      },
       cedula_sem: {
        required,
      },
       fechav_sem: {
        required,
      },
       vtv_cha: {
        required,
      },
       fechav_vtvcha: {
        required,
      },
       constancia_ruta: {
        required,
      },
       fechav_construt: {
        required,
      },
       constancia_senasa: {
        required,
      },
       fechav_senasa: {
        required,
      },
       seguro_cha: {
        required,
      },
      fechav_segurocha: {
        required,
      },
       seguro_semi: {
        required,
      },
      fechav_segsemi: {
        required,
      },
       rt_chofer: {
        required,
      },
      fechav_rt: {
        required,
      },

      cuit_chofer: {
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

    listar_transportistas() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "transportistas", {
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

    guardar() {
      /* console.log('entro a guardar',this.modificar) */
      if (this.modificar) {
        this.isValid = true;
        this.$v.$touch();

        if (this.$v.$invalid) {
          return;
        }
        console.log('edited' , this.id,this.transportista)
        axios
          .put(
            process.env.VUE_APP_RUTA_API + "transportistas/" + this.id,
            this.transportista,
            {
              headers: { Authorization: "Bearer " + localStorage.token },
            }
          )
          .then((res) => {
            this.cerrarModal();
            this.listar_transportistas();
            swal("Exito!", "El Transportista se ha modificado!", "success");
          })
          .catch(function (error) {
            var array = Object.values(error.response.data.errors + "<br>");
            array.forEach(swal(String(array)));
          });
      } else {
        console.log('entro al POST')
        this.isValid = true;
        this.$v.$touch();

        if (this.$v.$invalid) {
          return;
        }

        axios
          .post(process.env.VUE_APP_RUTA_API + "transportistas", this.transportista, {
            headers: { Authorization: "Bearer " + localStorage.token },
          })
          .then((res) => {
            this.cerrarModal();
            this.listar_transportistas();
            swal("Exito!", "El Transportista se ha creado!", "success");
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
        text: "El Transportista será eliminado definitavemente!",
        icon: "warning",
        buttons: ["Cancelar", " Si "],
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .delete(process.env.VUE_APP_RUTA_API + "transportistas/" + id, {
              headers: { Authorization: "Bearer " + localStorage.token },
            })
            .then((res) => {
              this.cerrarModal();
              this.listar_transportistas();
              swal("Exito!", "El Transportista se ha eliminado!", "success");
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
        this.tituloModal = "Modificar Transportista";
        this.transportista.nombre_transportista = data.nombre_transportista;
        this.transportista.carnet_prof = data.carnet_prof;
        this.transportista.fechav_cprof = data.fechav_cprof;
        this.transportista.carnet_cocatra = data.carnet_cocatra;
        this.transportista.fechav_ccocatra = data.fechav_ccocatra;
        this.transportista.cedula_cha = data.cedula_cha;
        this.transportista.fechav_cha = data.fechav_cha;
        this.transportista.cedula_sem = data.cedula_sem;
        this.transportista.fechav_sem = data.fechav_sem;
        this.transportista.vtv_cha = data.vtv_cha;
        this.transportista.fechav_vtvcha = data.fechav_vtvcha;
        this.transportista.vtv_sem = data.vtv_sem;
        this.transportista.fechav_vtvsem = data.fechav_vtvsem;
        this.transportista.constancia_ruta = data.constancia_ruta;
        this.transportista.fechav_construt = data.fechav_construt;
        this.transportista.constancia_senasa = data.constancia_senasa;
        this.transportista.fechav_senasa = data.fechav_senasa;
        this.transportista.seguro_cha = data.seguro_cha;
        this.transportista.fechav_segurocha = data.fechav_segurocha;
        this.transportista.seguro_semi = data.seguro_semi;
        this.transportista.fechav_segsemi = data.fechav_segsemi;
        this.transportista.rt_chofer = data.rt_chofer;
        this.transportista.fechav_rt = data.fechav_rt;
        /* this.transportista.dni_chofer = data.dni_chofer; */
        this.transportista.cuit_chofer = data.cuit_chofer;

      } else {
        this.id = 0;
        this.tituloModal = "Crear Transportista";
        this.transportista.nombre_transportista = "";
        this.transportista.carnet_prof = "";
        this.transportista.fechav_cprof = "";
        this.transportista.carnet_cocatra = "";
        this.transportista.fechav_ccocatra = "";
        this.transportista.cedula_cha = "";
        this.transportista.fechav_cha = "";
        this.transportista.cedula_sem = "";
        this.transportista.fechav_sem = "";
        this.transportista.vtv_cha = "";
        this.transportista.fechav_vtvcha = "";
        this.transportista.vtv_sem = "";
        this.transportista.fechav_vtvsem = "";
        this.transportista.constancia_ruta = "";
        this.transportista.fechav_construt = "";
        this.transportista.constancia_senasa = "";
        this.transportista.fechav_senasa = "";
        this.transportista.seguro_cha = "";
        this.transportista.fechav_segurocha = "";
        this.transportista.seguro_semi = "";
        this.transportista.fechav_segsemi = "";
        this.transportista.rt_chofer = "";
        this.transportista.fechav_rt = "";
        /* this.transportista.dni_chofer = ""; */
        this.transportista.cuit_chofer = "";
      }
    },

    cerrarModal() {
      this.modal = 0;
    },
  },

  created() {
    this.listar_transportistas();
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