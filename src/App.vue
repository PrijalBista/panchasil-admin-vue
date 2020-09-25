<template>
  <div id="app">
    <div class="container-fluid wrapper">
      <app-sidebar v-if="$route.name != 'Login'" ></app-sidebar>
      <div class="wrap">
        <app-header v-if="$route.name != 'Login'" ></app-header>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

export default {
  components: {
    appSidebar: Sidebar,
    appHeader: Header
  }
};

</script>

<style lang="scss">
* {
  font-family: "Montserrat", sans-serif;
  font-size: 0.9rem;
}
.wrapper {
  margin: 0;
  padding: 0;
  display: flex;
  .row {
    padding: 0;
    margin: 0;
  }
}

input,
button,
.input-group-text,
.btn {
  border-radius: 0 !important;
}

.form-control:focus {
  box-shadow: none !important;
}

.wrap {
  flex: auto;
}

.fas,
.far {
  font-size: 1.25rem;
}

.ck-editor__editable {
  min-height: 200px;
}
.ck-toolbar__items {
  display: flex !important;
  flex-wrap: wrap !important;
}
</style>
