<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
     
    
     <div class="row ">
        <div class="col col-lg-4"  v-for="cantidad in cantidades" :key="cantidad.id_producto">
         
          <card  >
           <h1>{{cantidad.Nombre}}</h1> 
            <h2>{{cantidad.Total}} kg.</h2> 
             <b-button size="sm" variant="success">Actualizar precio</b-button>
          </card>
        <br>
        </div>
        
       
      </div>
      </base-header>

    <b-container fluid class="mt--7">  
      <!--End tables-->
    </b-container>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      user_name: localStorage.name,
      cantidades: [],
    };
  },
    
    
    methods: {
    generateReport() {
      this.$refs.html2Pdf.generatePdf();
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
