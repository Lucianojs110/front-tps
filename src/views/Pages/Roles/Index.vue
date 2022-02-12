<template>
    <div>
        <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
        <!-- Card stats -->
        </base-header>
        <!-- Modal -->
        <div class="modal" :class="{mostrar: modal}">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <!-- Modal Header -->
                    <div class="modal-header">
                        <h4 class="modal-title">{{tituloModal}}</h4>
                        <button @click="cerrarModal();"  type="button" class="close" data-dismiss="modal">
                        &times;
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <label>Nombre</label>
                                <input  v-model="roles.name" type="text" class="form-control" id="name" placeholder="Nombre del Rol">
                            </div>
                        </div>
                    </div>
                    <!-- Modal footer -->
                    <div class="modal-footer">
                        <button @click="cerrarModal();" type="button" class="btn btn-secondary" data-dismiss="modal">
                        Cancelar
                        </button>
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="guardar()">
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
                    <h3 class="mb-0">Roles</h3>
                    </b-col>
                    <b-col class="text-right">
                    <base-button @click="modificar=false; abrirModal();" size="sm" type="primary"
                        >Nuevo Rol</base-button
                    >
                    </b-col>
                </b-row>
                </template>

                <table class="table" id="table">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="roles in role" :key="roles.id">
                    <th scope="row">{{ roles.id }}</th>
                    <td>{{ roles.name }}</td>

                    <td>
                        <button @click="modificar=true; abrirModal(roles);" class="btn btn-secondary btn-sm">Editar</button>
                        <button @click="eliminar(roles.id)" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                    </tr>
                </tbody>
                </table>
            </b-card>
            </b-col>
        </b-row>
      <!--End tables-->
    </b-container>
    </div>
</template>

<script>
import axios from "axios";
export default {
  data(){
      return{
        roles:{
            name:'',
          },
            id: 0,
            modificar: true,
            modal: 0,
            tituloModal: '',
            role: []
           
      };
  },

  methods:{
      listar_roles(){
          axios.get(process.env.VUE_APP_RUTA_API + "roles", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.role = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    
      },
      guardar() {
        if(this.modificar){
          axios.put(process.env.VUE_APP_RUTA_API + "roles/"+this.id, this.roles,{
                      headers: { 'Authorization' : 'Bearer '+ localStorage.token}})
                .then(res=>{ 
                  this.cerrarModal();
                  this.listar_roles();
                  swal("Exito!", "El Rol se ha modificado!", "success");}).catch(function (error){
                      var array = Object.values(error.response.data.errors+'<br>')
                      array.forEach(swal(String(array)))
                  });
          
        }else{
          axios.post(process.env.VUE_APP_RUTA_API + "roles", this.roles,{
                      headers: { 'Authorization' : 'Bearer '+ localStorage.token}})
                .then(res=>{ 
                  this.cerrarModal();
                  this.listar_roles();
                  swal("Exito!", "El Rol se ha creado!", "success");}).catch(function (error){
                      var array = Object.values(error.response.data.errors)
                      array.forEach(swal(String(array)))
                  });   
        }
      
      },
      eliminar(id){
          swal({
          title: '¿ Esta seguro ?',
          text: 'El Rol será eliminado definitavemente!',
          icon: 'warning',
          buttons: ["Cancelar", " Si "],
          }).then((willDelete)=> {
          if (willDelete) {
                  axios.delete(process.env.VUE_APP_RUTA_API + "roles/"+id,{
                      headers: { 'Authorization' : 'Bearer '+ localStorage.token}})
                  .then(res=>{
                    this.cerrarModal();
                    this.listar_roles();
                    swal("Exito!", "El Rol se ha eliminado!", "success");
                  }).catch(function (error){
                      var array = Object.values(error.response.data.errors)
                      array.forEach(swal(String(array)))    
                  });        
          } 
        });
      },
      abrirModal(data={}){
          this.modal=1;
          if(this.modificar){
            this.id = data.id;
            this.tituloModal="Modificar Rol";
            this.roles.name = data.name;
          }else{
            this.id=0;
            this.tituloModal="Crear Rol";
            this.roles.name='';
          }
      },
      cerrarModal(){
          this.modal=0;
      },
  },

  created(){
    this.listar_roles();
  }, 
};
</script>
<style>
  .mostrar{
    display: list-item;
    opacity: 1;
    background: rgba(131, 145, 146, 0.705);
  }
</style>