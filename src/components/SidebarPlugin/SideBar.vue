<template>
    <nav class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white" id="sidenav-main">
        <div class="container-fluid">

            <!--Toggler-->
            <navbar-toggle-button @click.native="showSidebar">
                
            </navbar-toggle-button>
            <router-link class="navbar-brand" to="/">
                <img :src="logo" class="navbar-brand-img" alt="...">
            </router-link>

            <slot name="mobile-right">
                <ul class="nav align-items-center d-md-none">
       
                    <base-dropdown class="nav-item" menu-on-right tag="li" title-tag="a">
                        <a slot="title-container" class="nav-link" href="#" role="button">
                            <div class="media align-items-center">
                              <span class="avatar avatar-sm rounded-circle">
                                <img alt="Image placeholder" src="img/theme/team-1.jpg">
                              </span>
                            </div>
                        </a>

                        <div class=" dropdown-header noti-title">
                            <h6 class="text-overflow m-0">Bienvenido!</h6>
                        </div>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-single-02"></i>
                            <span>Mi perfil</span>
                        </router-link>
                        <router-link to="/profile" class="dropdown-item">
                            <i class="ni ni-settings-gear-65"></i>
                            <span>Opciones</span>
                        </router-link>
                       
                        <div class="dropdown-divider"></div>
                        <a href="#!" class="dropdown-item">
                            <i class="ni ni-user-run"></i>
                            <span @click="closeSession()">Salir</span>
                        </a>
                    </base-dropdown>
                </ul>
            </slot>
            <slot></slot>
            <div v-show="$sidebar.showSidebar" class="navbar-collapse collapse show" id="sidenav-collapse-main">

                <div class="navbar-collapse-header d-md-none">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <router-link to="/">
                                <img :src="logo">
                            </router-link>
                        </div>
                        <div class="col-6 collapse-close">
                            <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
                        </div>
                    </div>
                </div>

                <ul class="navbar-nav">
                    <slot name="links">
                    </slot>
                </ul>
                <!--Divider-->
                <hr class="my-3">
                <!--Heading-->
                <h6 class="navbar-heading text-muted">Personal</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/usuarios" @click.native="closeSidebar"><i class="ni ni-single-02"></i>Usuarios</router-link>
                    </li>
                    <li class="nav-item">
                         <router-link class="nav-link" to="/roles" @click.native="closeSidebar"><i class="ni ni-tag"></i>Roles</router-link>
                    </li>
                     <li class="nav-item">
                         <router-link class="nav-link" to="/clientes" @click.native="closeSidebar"><i class="ni ni-briefcase-24"></i>Clientes</router-link>
                    </li>
                     <li class="nav-item">
                         <router-link class="nav-link" to="/proveedores" @click.native="closeSidebar"><i class="ni ni-briefcase-24"></i>Proveedores</router-link>
                    </li>
                </ul>

                 <!--Heading-->
                <h6 class="navbar-heading text-muted">Gestión Planta</h6>
                <!--Navigation-->
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/ingresos"  @click.native="closeSidebar"><i class="ni ni-curved-next"></i>Cala</router-link>
                    </li>
                    <li class="nav-item">
                         <router-link class="nav-link" to="/produccion"><i class="ni ni-chart-bar-32"></i>Producción</router-link>
                    </li>
                     <li class="nav-item">
                         <router-link class="nav-link" to="/venta"><i class="ni ni-cart"></i>Venta</router-link>
                    </li>
                    
                      <li class="nav-item">
                         <router-link class="nav-link" to="/transportistas"><i class="ni ni-delivery-fast"></i>Transportistas</router-link>
                    </li>
                </ul>
            </div>
            </div>
    </nav>
</template>
<script>
  import NavbarToggleButton from '@/components/NavbarToggleButton';
  import { mapActions} from 'vuex';

  export default {
    name: 'sidebar',
    components: {
      NavbarToggleButton
    },
    props: {
      logo: {
        type: String,
        default: 'img/brand/green.png',
        description: 'Sidebar app logo'
      },
      autoClose: {
        type: Boolean,
        default: true,
        description: 'Whether sidebar should autoclose on mobile when clicking an item'
      }
    },
    provide() {
      return {
        autoClose: this.autoClose
      };
    },
    methods: {
      closeSidebar() {
        this.$sidebar.displaySidebar(false)
      },
      showSidebar() {
        this.$sidebar.displaySidebar(true)
      },
       closeSession(){
      this.outLogin()
      localStorage.clear();
      this.$router.push('/login');
    },
      ...mapActions([
    'outLogin',
    ])
    },
    beforeDestroy() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.showSidebar = false;
      }
    },
     
  };
</script>
