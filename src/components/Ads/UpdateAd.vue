<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Update Ad&nbsp;&nbsp;
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
        <img v-if="newimage == null" :src="image" height="200px" />
        <img id="selected-category-image" height="200px" />
        <br />
        <div class="custom-file mb-3 w-20">
          <input
            type="file"
            class="custom-file-input"
            name="ads_image"
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
  props: ["id"],
  data() {
    return {
      placeholder: "",
      image: null,
      newimage: null,
      status: "",
      busy: false,
      errors: new this.$ErrorsClass()
    };
  },

  created() {
    this.busy = true;
    this.$axios
      .get(`${this.$hostname}/api/admin/ads/${this.id}`)
      .then(res => {
        let data = res.data.ad;
        this.busy = false;
        this.placeholder = data.placeholder;
        this.image = data.ads_image;
        // this.image = `${this.$hostname}/images/ads/${data.ads_image}`;
        this.busy = false;
      })
      .catch(err => {
        console.log(err);
        this.busy = false;
      });
  },

  methods: {
    processImage(event) {
      this.newimage = event.target.files[0];
      document.getElementById(
        "selected-category-image"
      ).src = window.URL.createObjectURL(this.newimage);
    },

    cancel() {
      this.$router.push("/ads");
    },

    submit() {
      let formdata = new FormData();
      formdata.append("placeholder", this.placeholder);
      formdata.append("_method", "PUT");

      if (this.newimage) {
        formdata.append("ads_image", this.newimage);
      }

      this.busy = true;
      this.$axios
        .post(`${this.$hostname}/api/admin/ads/${this.id}`, formdata)
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
