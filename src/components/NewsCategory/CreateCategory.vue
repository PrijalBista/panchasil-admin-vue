<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Create News Category&nbsp;&nbsp;
      <span>Admin Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="name">
          <b>Category Name</b>
        </label>
        <input
          name="name"
          type="text"
          v-model="name"
          class="form-control"
          placeholder="Category Name"
          :class="errors.get('name') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get("name") }}</div>

        <br />
        <label for="status">
          <b>Status</b>
        </label>
        <select class="custom-select" v-model="status" :class="errors.get('status') ? 'is-invalid' : ''" >
          <option selected disabled>Open this select menu</option>
          <option value="pending">Pending</option>
          <option value="publish">Publish</option>
        </select>
        <div class="invalid-feedback">{{ errors.get("status") }}</div>
      </div>

      <div class="form-group mt-5">
        <img id="selected-category-image" :src="`${$assetBaseurl}/dist/assets/placeholder.png`" height="200px" />
        <br />
        <div class="custom-file mb-3 w-20">
          <input
            type="file"
            class="custom-file-input"
            name="category_image"
            required
            @change="processImage($event)"
            :class="errors.get('image') ? 'is-invalid' : ''"
          />
          <label class="custom-file-label" for="validatedCustomFile"
            >Choose Image ...</label
          >
          <div class="invalid-feedback">{{ errors.get("image") }}</div>
        </div>
      </div>

      <br />
      <br />

      <button type="submit" class="btn btn-primary" :disabled="busy">
        Save
      </button>
      <button class="btn btn-danger" @click="cancel">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      status: "",
      image: null,
      busy: false,
      errors: new this.$ErrorsClass()
    };
  },

  methods: {
    processImage(event) {
      this.image = event.target.files[0];
      document.getElementById(
        "selected-category-image"
      ).src = window.URL.createObjectURL(this.image);
    },

    cancel() {
      this.$router.push("/category");
    },

    submit() {
      let formdata = new FormData();
      formdata.append("name", this.name);
      formdata.append("status", this.status);
      formdata.append("image", this.image);

      this.busy = true;
      this.$axios
        .post(`${this.$hostname}/api/admin/news-category`, formdata)
        .then(res => {
          this.$router.push("/category");
        })
        .catch(err => {
          this.errors.record(err.response.data);
          this.busy = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.col-12 {
  padding: 0;
}
.content {
  padding: 1.25rem;
}

#preview {
  display: flex;
  flex-wrap: wrap;
  span {
    background-color: #000;
    color: #fff;
    font-weight: 700;
  }
  div {
    width: 200px;
    height: 100px;
    margin-right: 1rem;
    margin-bottom: 1rem;
    background-size: cover;
    background-position: center;
    background-color: #e3e3e3;
    i {
      color: #f63951;
      float: right;
      font-size: 2rem;
      margin-top: -0.7rem;
      margin-right: -0.5rem;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
