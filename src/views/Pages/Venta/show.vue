<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <!-- Modal -->

    <!--Charts-->
    <b-container fluid class="mt--7">
      <!--Tables-->

      <VueHtml2pdf
        :show-layout="true"
        :float-layout="false"
        :enable-download="false"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="Factura"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        ref="html2Pdf"
      >
        <section slot="pdf-content">
          <b-row class="mt-1">
            <b-col xl="12" class="mb-5 mb-xl-0">
              <b-card body-class="p-3" header-class="border-0">
                <template v-slot:header>
                  <row align-v="center">
                    <div class="row gx-1 p-3">
                      <div class="col-md-4">
                        <h2>TPS Distribuciones</h2>
                       
                        Domicilio Comercial:  <br />
                        Condición frente al IVA: Responsable Inscripto<br />
                      </div>
                      <div class="col-md-2 text-center">
                        FACTURA
                        <h1>{{ venta.tipo_comprobante }}</h1>
                      </div>

                      <div class="col-md-6">
                        Factura N°:  {{ venta.num_comprobante }} <br />
                        Fecha de emision: {{ $moment(venta.fecha).format('DD-MM-YYYY') }} <br />
                        CUIT: 30-71660587-2 <br />
                        Ingresos Brutos: <br />
                        Fecha Inicio de Actividades:  <br />
                      </div>
                    </div>
                  </row>
                  <row align-v="center">
                    <div class="row gx-1 p-3">
                      <div class="col-md-6">
                        Cliente: {{ cliente.nombre }}<br />
                        Cuit: {{ cliente.num_doc }}<br />
                        Condicion Frente al Iva: {{ cliente.iva }}<br />
                      </div>
                      <div class="col-md-6">
                        Domicilio: {{ cliente.direccion }}, {{ cliente.ciudad }}
                        <br />
                      </div>
                    </div>
                  </row>
                  <row class="p-3">
                    <table style="border: 1px solid black; width: 100%">
                      <tr style="border: 1px solid black">
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>U. Medida</th>
                        <th>Precio. Unit.</th>
                        <th>Subtotal</th>
                      </tr>
                      <tr>
                        <td>{{ venta.producto }}</td>
                        <td>{{ venta.cantidad }}</td>
                        <td>Kg.</td>
                        <td>${{ venta.precio_unitario }}</td>
                        <td>${{ venta.neto }}</td>
                      </tr>
                    </table>
                  </row>
                  <br />

                  <row align-v="center">
                    <div class="row gx-1 p-3">
                      <div class="col-md-8"></div>
                      <div class="col-md-4" v-if="venta.tipo_comprobante=='A'">
                        Importe Neto Gravado: ${{ venta.neto }}<br />
                        IVA 21%: ${{ venta.iva }}<br />
                        Importe Otros Tributos: $0.00<br />
                        Importe Total: ${{ venta.total }}
                      </div>
                      <div class="col-md-4" v-if="venta.tipo_comprobante=='B'">
          
                        Importe Total: ${{ venta.total }}
                      </div>
                    </div>
                  </row>

                     <row align-v="center">
                    <div class="row gx-1 p-3">
                      <div class="col-md-3">
                         <img width="150" height="150" :src="'https://chart.googleapis.com/chart?chs=100x100&cht=qr&chl=' + venta.codigoQr ">
              
                      </div>
                      <div class="col-md-4">
                        <br><br>
                        CAE: {{ venta.cae }}<br>
                        Vto. CAE: {{ venta.vto_cae}}<br>
                      </div>
                    </div>
                  </row>
                </template>
              </b-card>
            </b-col>
          </b-row>
        </section>
      </VueHtml2pdf>
      <!--End tables-->

      <button
        @click="
        generateReport();
        "
        class="btn btn-light btn-sm"
      >
       Exportar en PDF
      </button>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import VueHtml2pdf from "vue-html2pdf";
import { required, minLength, between } from "vuelidate/lib/validators";

export default {
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      venta: {
        fecha: "",
        producto: "",
        cantidad: "",
      },

      cliente: {
        nombre: "",
        tipo_doc: "",
        direccion: "",
        ciudad: "",
        iva: "",
      },

      id: this.$route.params.id,
    };
  },

  methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
    },

    ver_venta() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "ventas/" + this.id, {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.cliente.nombre = res.data.cliente.nombre;
          this.cliente.tipo_doc = res.data.cliente.tipo_doc;
          this.cliente.num_doc = res.data.cliente.num_doc;
          this.cliente.ciudad = res.data.cliente.ciudad;
          this.cliente.direccion = res.data.cliente.direccion;
          this.cliente.iva = res.data.cliente.iva;

          this.venta.fecha = res.data.fecha;
          this.venta.producto = res.data.producto.nombre;
          this.venta.cantidad = res.data.cantidad;
          this.venta.total = res.data.total;
          this.venta.precio_unitario = res.data.precio_unitario;
          this.venta.iva = res.data.iva;
          this.venta.neto = res.data.neto;
          this.venta.tipo_comprobante = res.data.tipo_comprobante;
          this.venta.vto_cae = res.data.vto_cae;
          this.venta.cae = res.data.cae;
          this.venta.codigoQr = res.data.codigoQr;
          this.venta.num_comprobante = res.data.num_comprobante;
          this.venta.fecha_factura = res.data.fecha_factura;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },

  created() {
    this.ver_venta();
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