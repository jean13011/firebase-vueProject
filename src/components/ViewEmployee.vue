<template>
  <div id="view-employee">
    <ul class="collection with-header">
      <li class="collection-header"><h4>{{name}}</h4></li>
      <li class="collection-item">Employee ID#:{{employee_id}}</li>
      <li class="collection-item">Department: {{dept}}</li>
      <li class="collection-item">Position: {{position}}</li>
    </ul>
    <router-link to="/" class="btn grey">Back</router-link>
    <button to="/" v-on:click="deleteEmployee" class="btn red">Delete</button>
    <div class="fixed-action-btn">
      <router-link v-bind:to="{name: 'employee', params: {employee_id: employee_id}}" class="btn-floating btn-large red">
        <i class="fa fa-pencil green"></i>
      </router-link>
    </div>
  </div>
</template>

<script>

import db from './firebaseInit'
export default {
  name: "View-employee",
  data () {
    return {
      employee_id: null,
      name: null,
      dept: null,
      position: null,
    }
  },

  // called before the route that renders this component is confirmed.
  // does NOT have access to `this` component instance,
  // because it has not been created yet when this guard is called!
  beforeRouteEnter (to, from, next) {
      db.collection('employees').where('employee_id', '==', to.params.employee_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          next(vm => {
            vm.employee_id = doc.data().employee_id
            vm.name = doc.data().name
            vm.dept = doc.data().dept
            vm.position = doc.data().position
          })
        })
      })
  },

  watch: {
    '$route' : 'fetchData'
  },

  methods:{
    fetchData () {
      /*choisi l'utilisateur où employee_id est == a l'id mit en parametre dans la route*/
      db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.employee_id = doc.data().employee_id
          this.name = doc.data().name
          this.dept= doc.data().dept
          this.position = doc.data().position
        })
      })
    },

    /*supprime l'utilisateur apres confirmation grace à l'id mit en paramètre dans la route*/
    deleteEmployee () {
      if (confirm('Are you sure ?')) {
        db.collection('employees').where('employee_id', '==', this.$route.params.employee_id).get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            //supprime l'employés
            doc.ref.delete();
            //redirige vers l'index
            this.$router.push('/')
          })
        })
      }
    }
  }
}
</script>

<style scoped>

</style>