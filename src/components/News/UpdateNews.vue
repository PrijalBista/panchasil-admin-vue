<template>
  <div class="container-fluid content">
    <h4 class="d-flex">
      Update News&nbsp;&nbsp;
      <span>Admin Panel</span>
      <div class="spinner-border ml-auto text-danger" v-show="busy"></div>
    </h4>
    <br />
    <form @submit.prevent="submit()">
      <div class="form-group">
        <label for="title">
          <b>Title*</b>
        </label>
        <input
          required
          name="title"
          type="text"
          v-model="title"
          class="form-control"
          placeholder="News Title"
          :class="errors.get('title') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get("title") }}</div>
      </div>

      <div class="form-group">
        <label for="author">
          <b>Author*</b>
        </label>
        <input
          required
          name="author"
          type="text"
          v-model="author"
          class="form-control"
          placeholder="Author"
          :class="errors.get('author') ? 'is-invalid' : ''"
        />
        <div class="invalid-feedback">{{ errors.get("author") }}</div>
      </div>

      <div class="form-group mt-5">
        <img v-if="newimage == null" :src="image" height="200px" />
        <img id="selected-category-image" height="200px" />
        <br />
        <div class="custom-file mb-3 w-20">
          <input
            type="file"
            class="custom-file-input"
            name="category_image"
            @change="processImage($event)"
            :class="errors.get('image') ? 'is-invalid' : ''"
          />
          <label class="custom-file-label" for="validatedCustomFile"
            >Choose Image ...*</label
          >
          <div class="invalid-feedback">{{ errors.get("image") }}</div>
        </div>
      </div>


      <div class="form-group">
        <label for="type">
          <b>Type*</b>
        </label>

        <select class="custom-select" v-model="type" :class="errors.get('type') ? 'is-invalid' : ''">
          <option selected disabled>Open this select menu</option>
          <option value="default">Default</option>
          <option value="breaking_news">Breaking News</option>
          <option value="related">Related</option>
        </select>

        <div class="invalid-feedback">{{ errors.get("type") }}</div>
      </div>

      <br />
      <div class="description-container">
        <label for="description">
          <b>Description*</b>
        </label>
        <div class="row no-gutters">
          <div class="col-12">
            <textarea
              class="form-control"
              :class="errors.get('description') ? 'is-invalid' : ''"
              name="description"
              id="editor"
              ref="description"
            ></textarea>
            <div class="invalid-feedback">{{ errors.get("description") }}</div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="category">
          <b>Category*</b>
        </label>
        <select class="custom-select" v-model="category" required :class="errors.get('category_id') ? 'is-invalid' : ''">
          <option selected disabled>Open this select menu</option>
          <option
            v-for="category in categories"
            :value="category.id"
            :key="category.id"
            >{{ category.name }}</option
          >
        </select>
        <div class="invalid-feedback">{{ errors.get("category_id") }}</div>
      </div>

      <div class="form-group">
        <label for="status">
          <b>Status*</b>
        </label>
        <select class="custom-select" v-model="status" required :class="errors.get('status') ? 'is-invalid' : ''">
          <option selected disabled>Open this select menu</option>
          <option value="pending">Pending</option>
          <option value="publish">Publish</option>
        </select>
        <div class="invalid-feedback">{{ errors.get("status") }}</div>
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
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: ["id"],

  data() {
    return {
      categories: [],
      category: "",
      title: "",
      author: "",
      image: null,
      type: '',
      description: "",
      status: "",
      editor: null,
      newimage: null,
      busy: false,
      errors: new this.$ErrorsClass()
    };
  },

  mounted() {
    ClassicEditor.create(this.$refs.description).then(neweditor => {
      this.editor = neweditor;
    });
  },

  created() {
    this.busy = true;
    // fetch all categories for select dropdown
    this.$axios
      .get(`${this.$hostname}/api/admin/news-category?limit=1000`)
      .then(res => {
        this.categories = res.data.data ? res.data.data : [];
      })
      .catch(err => console.log(err));

    // get news data
    this.$axios
      .get(`${this.$hostname}/api/admin/news/${this.id}`)
      .then(res => {
        let news = res.data;
        this.category = news.category_id;
        this.title = news.title;
        this.author = news.author;
        this.image = news.image;
        this.type = news.type;

        if (this.editor) this.editor.setData(news.description);

        this.status = news.status.toLowerCase();
        this.busy = false;
      })
      .catch(err => console.log(err));
  },

  methods: {
    processImage(event) {
      this.newimage = event.target.files[0];
      document.getElementById(
        "selected-category-image"
      ).src = window.URL.createObjectURL(this.newimage);
    },

    cancel() {
      this.$router.push("/news");
    },

    submit() {
      let formdata = new FormData();
      formdata.append("_method", "PUT");
      formdata.append("category_id", this.category);
      formdata.append("title", this.title);
      formdata.append("author", this.author);

      if (this.newimage) {
        formdata.append("image", this.newimage);
      }

      formdata.append("type", this.type);

      formdata.append("description", this.editor.getData());
      formdata.append("status", this.status);

      this.busy = true;
      this.$axios
        .post(`${this.$hostname}/api/admin/news/${this.id}`, formdata)
        .then(res => {
          this.$router.push("/news");
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
