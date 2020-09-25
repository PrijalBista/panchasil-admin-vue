<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Create Ad&nbsp;&nbsp;
      <span>Admin Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="name">
          <b>Place Holder</b>
        </label>
        <input
          required
          name="placeholder"
          type="text"
          v-model="placeholder"
          class="form-control"
          placeholder="Placeholder Text for Ad Image"
          :class="errors.get('placeholder') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get("placeholder") }}</div>
      </div>

      <div class="form-group mt-5">
        <img id="selected-category-image" :src="`${$assetBaseurl}/dist/assets/placeholder.png`" height="200px" />

        <div class="custom-file mb-3 w-20 mt-3">
          <input
            type="file"
            class="custom-file-input"
            name="ads_image"
            required
            @change="processImage($event)"
            :class="errors.get('ad_image') ? 'is-invalid' : ''"
          />
          <label class="custom-file-label" for="validatedCustomFile"
            >Choose Image ...</label
          >
          <div class="invalid-feedback">{{ errors.get("ad_image") }}</div>
        </div>
      </div>

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
      placeholder: "",
      image: null,
      status: "",
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
      this.$router.push("/ads");
    },

    submit() {
      let formdata = new FormData();
      formdata.append("placeholder", this.placeholder);
      formdata.append("ads_image", this.image);

      this.busy = true;
      this.$axios
        .post(`${this.$hostname}/api/admin/ads`, formdata)
        .then(res => {
          this.$router.push("/ads");
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
