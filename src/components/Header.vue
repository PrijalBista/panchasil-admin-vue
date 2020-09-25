<template>
  <nav class="navbar navbar-dark">
    <span class="navbar-brand mb-0 mr-auto">
      <!-- <i class="fas fa-bars"></i> -->
    </span>
<!--      <span class="navbar-brand mb-0 ml-auto">
      <i class="fas fa-envelope"></i>
      <sup>
        <span class="badge badge-danger">10</span>
      </sup>
    </span> -->
    <span class="text-white mr-1">{{userName}}</span>
    <img
      :src="`${$assetBaseurl}/dist/assets/avatar.png`"
      alt="avatar"
      class="dropdown-toggle"
      width="35px"
      role="button"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
      <!-- <router-link to="/accounts" class="dropdown-item">
        <i class="fas fa-cog"></i>
        <span>Settings</span>
      </router-link>
      <div class="dropdown-divider"></div>-->
      <a class="dropdown-item" href="#" @click="logout">
        <i class="fas fa-power-off"></i>
        <span>Logout</span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$axios.post(`${this.$hostname}/api/logout`)
      .then(res => {
        // if (res.status == 200) {
          localStorage.removeItem('authUser');
          this.$axios.defaults.headers.common = {'Accept': 'application/json'};
          // window.location.href = this.$hostname;
          this.$router.replace('/login');
        // }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
          localStorage.removeItem('authUser');
          this.$axios.defaults.headers.common = {'Accept': 'application/json'};
          // window.location.href = this.$hostname;
          this.$router.replace('/login');
      });
    }
  },
  computed: {
    userName() {
      const authUser = JSON.parse(localStorage.getItem('authUser'));
      return authUser ? authUser.userName : '';
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: #4b7af2;
}

.badge {
  border-radius: 100px;
  padding: 5px;
  font-size: 0.65rem;
}

.dropdown-menu {
  position: absolute;
  margin-left: auto;
  margin-right: 4px;
  width: fit-content;
  border-radius: 0;
  right: 0;
  span {
    margin-left: 8px;
  }
  .dropdown-item {
    display: flex;
  }
  a:active {
    background: #f8f9fa;
    color: #000;
  }
}
</style>
