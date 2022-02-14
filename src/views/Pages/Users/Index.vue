<template>
  <div>
    <base-header class="pb-6 pb-8 pt-2 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>


    <!-- The Modal -->
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
              <input  v-model="usuarios.name" type="text" class="form-control" id="name" placeholder="Nombre del usuario">
              </div>
               <div class="col-md-6">
              <label>Apellido</label>
              <input  v-model="usuarios.last_name" type="text" class="form-control" id="last_name" placeholder="Apellido del usuario">
              </div>
            </div>
            <div class="row">
              <div class="col-md-6">
              <label>Email</label>
              <input v-model="usuarios.email" type="text" class="form-control" id="email" placeholder="Ingrese una direccion de email">
            </div>
            <div class="col-md-6">
              <label>Rol</label>
              <select @change="selectCategory($event)" v-model="roles.role" class="form-control">
                <option disabled value="">Elige un rol para el usuario..</option>
                  <option selected v-for="rol in roles" :key="rol.id">
                      {{ rol.id }} {{ rol.name }}
                  </option>
              </select>
                 <!-- <div v-if="usuarios.rol == '1'">
                    <select id="rol" v-model="usuarios.rol" class="form-control">
                         <option  value='1' selected>Administrador</option> 
                         <option  value='2'>Usuario</option> 
                    </select>
                </div>
                <div v-else-if="usuarios.rol == '2'">
                    <select id="rol" v-model="usuarios.rol" class="form-control">
                        <option  value='1'>Administrador</option> 
                        <option  value='2' selected>Usuario</option> 
                    </select>
                </div>
                <div v-else>
                    <select id="rol" v-model="usuarios.rol " class="form-control">
                        
                        <option value=1>Administrador</option> 
                        <option value=2>Usuario</option> 
                    </select>
                </div> -->              
            </div>
            
          </div>
         

            <div class="row">
               <div class="col-md-6">
              <label>Password</label>
              <input v-model="usuarios.password" type="password" class="form-control" id="password" placeholder="Ingrese una contraseña">
            </div>
             <div class="col-md-6">
              <label>Coonfirmar Password</label>
              <input v-model="usuarios.password" type="password" class="form-control" id="password" placeholder="Ingrese una contraseña">
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
                  <h3 class="mb-0">Usuarios</h3>
                </b-col>
                <b-col class="text-right">
                  <base-button @click="modificar=false; abrirModal();" size="sm" type="primary"
                    >Nuevo Usuario</base-button
                  >
                </b-col>
              </b-row>
            </template>

            <table class="table" id="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Rol</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="users in user" :key="users.id">
                  <th scope="row">{{ users.id }}</th>
                  <td>{{ users.name }}</td>
                  <td>{{ users.last_name }}</td>
                  <td>{{ users.email }}</td>
                  <td>{{ users.role.name }}</td>

                  <td>
                    <button @click="modificar=true; abrirModal(users);" class="btn btn-secondary btn-sm">Editar</button>
                    <button class="btn btn-danger btn-sm">Eliminar</button>
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
  data() {
    return {
      usuarios: {
        name: "",
        last_name: "",
        email: "",
        password: "",
        rol: "",
      },
      roles: [],
        selected:{
          role:''
        },
      id: 0,
      modificar: true,
      modal: 0,
      tituloModal: "",
      user: [],
    };
  },

  mounted() {
    this.getRoles();
    },
  methods: {
    selectCategory(event) {
      console.log(event.target.value);
    },
    listar_usuarios() {
      axios
        .get(process.env.VUE_APP_RUTA_API + "users", {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.user = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    guardar() {
        if(this.modificar){
          axios.put(process.env.VUE_APP_RUTA_API + "users/"+this.id, this.usuarios,{
                      headers: { 'Authorization' : 'Bearer '+ localStorage.token}})
                .then(res=>{ 
                  this.cerrarModal();
                  this.listar_usuarios();
                  swal("Exito!", "El Usuario se ha modificado!", "success");}).catch(function (error){
                      var array = Object.values(error.response.data.errors+'<br>')
                      array.forEach(swal(String(array)))
                  });
          
        }else{
          axios.post(process.env.VUE_APP_RUTA_API + "users", this.usuarios,{
                      headers: { 'Authorization' : 'Bearer '+ localStorage.token}})
                .then(res=>{ 
                  this.cerrarModal();
                  this.listar_usuarios();
                  swal("Exito!", "El Usuario se ha creado!", "success");}).catch(function (error){
                      var array = Object.values(error.response.data.errors)
                      array.forEach(swal(String(array)))
                  });   
          }
      
      },

    abrirModal(data={}){
      this.modal=1;
      if(this.modificar){
        this.id=data.id;
        this.tituloModal="Modificar Usuario";
        this.usuarios.name=data.name;
        this.usuarios.last_name=data.last_name;
        this.usuarios.email=data.email;
        this.usuarios.password=data.password;
        this.usuarios.rol=data.role.name;
        console.log('role: '+data.role.name)
      }else{
        this.id=0;
        this.tituloModal="Crear Usuario";
        this.usuarios.name='';
        this.usuarios.last_name='';
        this.usuarios.email='';
        this.usuarios.password='';
        this.usuarios.rol='';
      }
    },
    cerrarModal(){
      this.modal=0;
    },

    getRoles(){
      axios.get(process.env.VUE_APP_RUTA_API + "roles", {
                  headers: {
                    Authorization: `Bearer ${localStorage.token}`,
                },
              })
            .then((res) => {
                  console.log(res.data);
                  this.roles = res.data;
              })
            .catch((error) => {
                  console.error(error);
              })
        },
  },

  created() {
    this.listar_usuarios();
    console.log(localStorage.token);
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

