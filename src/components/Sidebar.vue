<template>
  <div class="menu">
    <h5>
      <img :src="`${$assetBaseurl}/dist/assets/logo-white.png`" width="25px" />
      &nbsp;
      <span>Panchasheel</span>
      | Admin
    </h5>

    <ul class="list-group list-group-flush">
      <router-link to="/" active-class="active" exact>
        <li class="list-group-item">
          <i class="fas fa-tachometer-alt"></i> &nbsp;&nbsp;Dashboard
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>

      <router-link to="/category" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-th-list"></i>&nbsp;&nbsp;Categories
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>

      <router-link to="/news" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-newspaper"></i>&nbsp;&nbsp;News
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>

      <router-link to="/ads" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-tv"></i>&nbsp;&nbsp;Ads
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>

      <router-link to="/contact" active-class="active">
        <li class="list-group-item">
          <i class="fas fa-address-book"></i>&nbsp;&nbsp;Contact
          <i class="fas fa-chevron-right ml-auto"></i>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.menu {
  background-color: #242933;
  position: relative;
  color: #fff;
  padding: 1rem;
  min-height: 100vh;
  min-width: 220px;
  h5 {
    text-align: center;
    padding-bottom: 1rem;
    span {
      font-size: 1.2rem;
      font-weight: 700;
    }
  }
  ul {
    a {
      text-decoration: none;
    }
    .active {
      li {
        color: #fff !important;
      }
    }
    li {
      font-size: 0.85rem;
      i {
        font-size: 1.15rem;
      }
      padding: 1rem 4px;
      background-color: #242933;
      color: #687384;
      display: flex;
      &:hover {
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>
