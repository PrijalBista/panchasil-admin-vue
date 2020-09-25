<template>
  <div class="content">
    <h4>
      Dashboard&nbsp;&nbsp;
      <span>Control Panel</span>
    </h4>
    <br />
    <div class="stats">
       <div class="panel">
        <i class="fas fa-th-list"></i>
        <span>
          <h4>{{categoryCount}}</h4>Categories
        </span>
      </div>

      <div class="panel">
        <i class="fas fa-newspaper"></i>
        <span>
          <h4>{{newsCount}}</h4>News
        </span>
      </div>

      <div class="panel">
        <i class="fas fa-tv"></i>
        <span>
          <h4>{{adsCount}}</h4>Ads
        </span>
      </div>

      <div class="panel">
        <i class="far fa-address-book"></i>
        <span>
          <h4>{{contactCount}}</h4>Contacts
        </span>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <div class="row items">
      <div class="col-12">
        <h3>
          Latest News
          <small>
            <button
              class="btn btn-success"
              @click="$router.push('/news')"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Goto News Section">
              <i class="fa fa-arrow-right"></i>
            </button>
          </small>
        </h3>
        <br />
        <div class="list-group">
          <a
            href="#"
            class="list-group-item list-group-item-action"
            v-for="news in latest_news.slice(0,5)"
            :key="news.id"
          >
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-1">{{ trimTitle(news.title, 60) }}</h5>
              <small class="text-muted">{{ convertDate(news.created_at) }}</small>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      categoryCount: 0,
      contactCount: 0,
      newsCount: 0,
      adsCount: 0,
      latest_news: [],
    };
  },

  methods: {

    trimTitle(title, length) {
      if(!title) return '';
      return title.length > length ? title.substr(0, length) + ' ...' : title;
    },

    convertDate(date) {
      if(!moment(date).isValid()) return '';
      return moment(date).format('ll');
    },
  },

  created() {
    this.$axios.get(`${this.$hostname}/api/admin/dashboard`)
      .then(res => {
        this.categoryCount = res.data.categoryCount || 0;
        this.contactCount = res.data.contactCount || 0;
        this.newsCount = res.data.newsCount || 0;
        this.adsCount = res.data.adsCount || 0;
      })
      .catch(err => {
        console.log(err);
      });

    // fetch latest news and show them.
    this.$axios.get(`${this.$hostname}/api/admin/news?sortBy=created_at&order=desc`)
      .then(res => {
        this.latest_news = res.data.data || [];
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1.25rem;

  .stats {
    display: flex;
    flex-wrap: wrap;
    color: #fff;
    .panel:nth-child(1),
    .panel:nth-child(4),
    .panel:nth-child(7) {
      background-color: #4b7af2;
    }

    .panel:nth-child(2),
    .panel:nth-child(5),
    .panel:nth-child(8) {
      background-color: #f63951;
    }
    .panel {
      margin-left: 0.2rem;
      margin-right: 0.2rem;
      margin-bottom: 0.4rem;
      background-color: #9b4fd7;
      padding: 1rem;
      border-radius: 0;
      display: flex;
      width: 160px;
      h4 {
        margin: 0;
      }
      i {
        padding-top: 4px;
        flex: 1;
        font-size: 2rem;
      }
      span {
        text-align: right;
        flex: 1;
      }
    }
  }

  .items {
    .col-12 {
      padding: 0;
    }
    .list-group-item {
      border-radius: 0 !important;
    }
  }
}
</style>