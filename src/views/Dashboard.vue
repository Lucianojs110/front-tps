<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->

      <div class="row">
        <div
          class="col col-lg-4"
          v-for="cantidad in cantidades"
          :key="cantidad.id_producto"
        >
          <card>
            <div class="row">
              <div class="col-sm">
                <h1>{{ cantidad.Nombre }}</h1>
                <h3>Stock Actual</h3>
                <h2>{{ cantidad.Total }} kg.</h2>
            
              </div>
              <div class="col-sm">
                <h2>Precio Kg.</h2>
                <h1>${{ cantidad.precio_unitario }}</h1>
                    <b-button
                  size="sm"
                  variant="success"
                  @click="abrirModal(cantidad)"
                  >Actualizar precio</b-button
                >
              </div>
            </div>
          </card>
          <br />
        </div>
      </div>
    </base-header>

    <!-- Modal -->
    <div class="modal" :class="{ mostrar: modal }" style="overflow-y: scroll">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Actualizar Precio Unitario</h4>
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
              <div class="col-md-12">
                <label>Precio de venta (kg) de {{ productos.nombre }}</label>
                <input
                  v-model="productos.precio_unitario"
                  type="number"
                  class="form-control"
                  id="name"
                  placeholder="Nombre o razon social del cliente"
                  :class="{
                    'is-invalid':
                      isValid && $v.productos.precio_unitario.$error,
                  }"
                />
                <div
                  v-if="isValid && !$v.productos.precio_unitario.required"
                  class="invalid-feedback"
                >
                  El campo es requerido
                </div>
                 <div
                  v-if="isValid && !$v.productos.precio_unitario.decimal"
                  class="invalid-feedback"
                >
                  Ingrese numeros decimales
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
    <!-- Fin Modal -->

    <b-container fluid class="mt--7">
      <!--End tables-->
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
import { required, decimal } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      user_name: localStorage.name,
      cantidades: [],
      isValid: false,
      modal: 0,
      id: 0,
      productos: {
        precio_unitario: "",
      },
    };
  },

  validations: {
    productos: {
      precio_unitario: {
        required,
        decimal
      },
    },
  },

  methods: {
    guardar(id) {
      this.isValid = true;
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      axios
        .put(process.env.VUE_APP_RUTA_API + "productos/" + this.id, this.productos, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((res) => {
          this.cerrarModal();
          this.stock();
          swal("Exito!", "El precio se ha modificado!", "success");
        })
        .catch(function (error) {
          var array = Object.values(error.response.data.errors + "<br>");
          array.forEach(swal(String(array)));
        });
    },

    stock() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "cantidad", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          this.cantidades = res.data;
          console.log(this.cantidades);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    abrirModal(data = {}) {
      this.modal = 1;
      this.id = data.id;
      this.productos.precio_unitario = data.precio_unitario;
      this.productos.nombre = data.Nombre;
    },

    cerrarModal() {
      this.modal = 0;
    },
  },
  created() {
    this.stock();
  },
};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
</style>
