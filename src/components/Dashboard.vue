<template>
  <div id="dashboard">
    <ul class="collection with-header">
      <li class="collection-header">
        <h4>Employees</h4>
      </li>
      <li v-for="employee in employees" v-bind:key="employee.id" class="collection-item">
       <div class="chip">{{employee.departement}}</div>
        {{employee.employee_id}}:{{employee.name}}
        <router-link class="secondary-content" v-bind:to="{name: 'view-employee', params: {employee_id: employee.employee_id}}">
          <i class="fa fa-eye"></i>
        </router-link>
      </li>
    </ul>
    <div class="fixed-action-btn">
      <router-link to="/new" class="btn-floating btn-large red">
        <i class="fa fa-plus"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
  import db from './firebaseInit'
  export default {
  name: "Dashboard",
    data () {
      return {
        /*initialise les employés dans un tableau vide avant de les mettres dedans*/
        employees : [],
      }
    },

    /*methode vue pour remplir notre objet employee avec les info d'une base de données firebase*/
    created () {
      db.collection('employees').orderBy('employee_id').get()
        .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          /*on met dans une constante le fetch de nos entités pour remplir l'objet employees'*/
          const data = {
            'id': doc.id,
            /*doc.data() est une fonction du doc recuperé précement, il permet de récuperer nos entités avec le nom des champs*/
            'employee_id' : doc.data().employee_id,
            'name': doc.data().name,
            'departement': doc.data().dept,
            'position': doc.data().position
          }
          /*on pousse les données de la constante data dans employee*/
          this.employees.push(data)
        })
      })
    }
  }
</script>

<style scoped>

</style>