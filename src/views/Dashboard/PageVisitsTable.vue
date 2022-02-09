<template>

  <b-card body-class="p-0" header-class="border-0">
    <template v-slot:header>
      <b-row align-v="center">
        <b-col>
          <h3 class="mb-0">Bienvenido Administrador!</h3>
        </b-col>
       
      </b-row>
    </template>
  </b-card>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown} from 'element-ui'
  export default {
    name: 'page-visits-table',
    components: {
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        tableData: [
          {
            page: '/argon/',
            visitors: '4,569',
            unique: '340',
            bounceRate: '46,53%'
          },
          {
            page: '/argon/index.html',
            visitors: '3,985',
            unique: '319',
            bounceRate: '46,53%'
          },
          {
            page: '/argon/charts.html',
            visitors: '3,513',
            unique: '294',
            bounceRate: '36,49%'
          },
          {
            page: '/argon/tables.html',
            visitors: '2,050',
            unique: '147',
            bounceRate: '50,87%'
          },
          {
            page: '/argon/profile.html',
            visitors: '1,795',
            unique: '190',
            bounceRate: '46,53%'
          }
        ]
      }
    }
  }
</script>
<style>
</style>
