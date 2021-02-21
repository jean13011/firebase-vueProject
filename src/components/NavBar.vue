<template>
  <nav>
      <div class="nav-wrapper green">
        <div class="container">
          <router-link to="/" class="brand-logo">Employee manager</router-link>
          <ul class="right">
            <li>
              <router-link to="/">Dashboard</router-link>
            </li>
            <li>
              <router-link to="/login">Login</router-link>
            </li>
            <li>
              <router-link to="/register">Register</router-link>
            </li>
          </ul>
        </div>
      </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

</style>