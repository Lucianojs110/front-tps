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
            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-4">
                <label>Nombre</label>
                <input
                  v-model="transportista.nombre_transportista"
                  type="text"
                  class="form-control"
                  id="nombre_transportista"
                  placeholder="Nombre Transportista"
                  :class="{
                    'is-invalid': isValid && $v.transportista.nombre_transportista.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.transportista.nombre_transportista.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>


              <div class="col-md-4">
                <label>Dni</label>
                <input
                  v-model="transportista.dni_chofer"
                  type="text"
                  class="form-control"
                  id="dni_chofer"
                  placeholder="DNI"
                  :class="{
                    'is-invalid': isValid && $v.transportista.dni_chofer.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.transportista.dni_chofer.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

              <div class="col-md-4">
                <label>Cuit</label>
                <input
                  v-model="transportista.cuit_chofer"
                  type="text"
                  class="form-control"
                  id="cuit_chofer"
                  placeholder="CUIT"
                  :class="{
                    'is-invalid': isValid && $v.transportista.cuit_chofer.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.transportista.cuit_chofer.required"
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
                <label>Carnet Profesional</label>
                <input
                  v-model="transportista.carnet_prof"
                  type="text"
                  class="form-control"
                  id="carnet_prof"
                  placeholder="Carnet Profesional"
                  :class="{
                    'is-invalid': isValid && $v.transportista.carnet_prof.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.transportista.carnet_prof.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>


              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_cprof"
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
            </div>
            <!-- Fin Fila -->
            <!-- Inicio Fila -->
            <div class="row">
              <div class="col-md-6">
                <label>Carnet Cocátra</label>
                <input
                  v-model="transportista.carnet_cocatra"
                  type="text"
                  class="form-control"
                  id="carnet_cocatra"
                  placeholder="Carnet Cocátra"
                  :class="{
                    'is-invalid': isValid && $v.transportista.carnet_cocatra.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.transportista.carnet_cocatra.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
              </div>

            <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_ccocatra"
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
                  placeholder="Cedula Chasis"
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_cha"
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
            </div>
            <!-- Fin Fila -->

            <!-- Inicio Fila Cedula Semi -->
            <div class="row">

                <div class="col-md-6">
                <label>Cédula Semi</label>
                <input
                  v-model="transportista.cedula_sem"
                  type="text"
                  class="form-control"
                  id="cedula_sem"
                  placeholder="Cedula Semi"
                 
                />
              </div>

              <div class="col-md-6">
                <label>Fecha</label>

                <b-datepicker
                  v-model="transportista.fechav_sem"
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
            </div>
            <!-- Fin Fila Cedula Semi-->
            
        <!-- Inicio Fila VTV CHASIS-->
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
            </div>
        <!-- FIN VTV CHASIS -->

        <!-- Inicio Fila VTV SEMI-->
            <div class="row">
                    <div class="col-md-6">
                        <label>Vtv Semi</label>
                        <input
                            v-model="transportista.vtv_sem"
                            type="text"
                            class="form-control"
                            id="vtv_sem"
                            placeholder="Vtv Semi"
                        />
                    </div>
                    <div class="col-md-6">
                <label>Fecha</label>
                <b-datepicker
                  v-model="transportista.fechav_vtvsem"
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
            </div>
            <!-- FIN VTV SEMI-->
          </div>
          <!-- FIN Row -->
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
                </b-col>
              </b-row>
            </template>
            <div class="table-responsive">
              <table class="table" id="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Nº Carnet Prof.</th>
                    <th>Nº Carnet Cocatra</th>
                    <th>Cédula Chasis</th>
                    <th>Cédula Semi</th>
                    <th>Vtv Chasis</th>
                    <th>Vtv Semi</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="transportista in transportistas" :key="transportista.id">
                    <th scope="row">{{ transportista.id }}</th>
                    <td>{{ transportista.nombre_transportista }}</td>
                    <td>{{ transportista.carnet_prof }}</td>
                    <td>{{ transportista.carnet_cocatra }} <!-- - {{ proveedor.num_doc }} --></td>
                    <td>{{ transportista.cedula_cha }} <!-- - {{ proveedor.ciudad }} --></td>
                    <td>{{ transportista.cedula_sem }}</td>
                    <td>{{ transportista.vtv_cha }}</td>
                    <td>{{ transportista.vtv_sem }}</td>
                    <td>
                      <button
                        @click="
                          modificar = true;
                          abrirModal(transportista);
                        "
                        class="btn btn-secondary btn-sm"
                      >
                        Editar
                      </button>
                      <button
                        @click="eliminar(transportista.id)"
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
      nombre: {
        required,
        minLength: minLength(2),
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

    listar_transportistas() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "transportistas", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          this.transportistas = res.data;
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
        this.transportista.carnet_cocatra = data.carnet_cocatra;
        this.transportista.cedula_cha = data.cedula_cha;
        this.transportista.cedula_sem = data.cedula_sem;
        this.transportista.vtv_cha = data.vtv_cha;
        this.transportista.vtv_sem = data.vtv_sem;
        this.transportista.dni_chofer = data.dni_chofer;
        this.transportista.cuit_chofer = data.cuit_chofer;
      } else {
        this.id = 0;
        this.tituloModal = "Crear Transportista";
        this.transportista.nombre_transportista = "";
        this.transportista.carnet_prof = "";
        this.transportista.carnet_cocatra = "";
        this.transportista.cedula_cha = "";
        this.transportista.cedula_sem = "";
        this.transportista.vtv_cha = "";
        this.transportista.vtv_sem = "";
        this.transportista.dni_chofer = "";
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
</style>
