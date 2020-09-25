<template>
  <div class="content">
    <div class="row">
      <h4>
        Contacts &nbsp;&nbsp;
        <span>Admin Panel</span>
      </h4>
    </div>
    <br />

    <!-- Datatable component -->
    <datatable
      :endpoint="tableData.endpoint"
      :columns="tableData.columns"
      :actions="tableData.actions"
      @deleteEvent="submit"
      @editEvent="$router.push(`/ads/${$event.id}/edit`)"
      :parameters="tableData.params"
      :refresh="tableData.refresh"
    ></datatable>

    <div
      class="modal fade"
      id="warning"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Delete {{ contact.name }}</h5>
            <small>{{ contact.subject }}</small>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-danger" @click="destroy">
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import datatable from "../Includes/datatable.vue";
import moment from 'moment';

export default {
  components: {
    datatable
  },

  data() {
    return {
      contact: {},
      tableData: {
        params: { sortBy: "created_at" },
        refresh: true,
        endpoint: `${this.$hostname}/api/admin/contact`,
        //no get params needed to pass here
        columns: [
          {
            field: "name",
            column: "Name",
            render: function(field) {
              return !field ? "NAN" : field;
            }
          },
          {
            field: "email",
            column: "Email",
            render: function(field) {
              return !field ? "NAN" : field;
            }
          },
          {
            field: "subject",
            column: "Subject",
            render: function(field) {
              return !field ? "NAN" : field;
            }
          },
          {
            field: "message",
            column: "Message",
            render: function(field) {
              return !field ? "NAN" : field;
            }
          },
          {
            field: "created_at",
            column: "Created At",
            render: (field) => {
              return moment(field).format('ll');
            }
          },
        ],
        actions: [
          {
            event: "deleteEvent",
            class: "is-white has-text-danger px-2 py-0 mx-0 my-0",
            value: `<i class="fas fa-trash-alt"></i>`
          }
        ]
      }
    };
  },

  methods: {
    submit(event) {
      this.contact = event.item;
      $("#warning").modal("show");
    },

    destroy() {
      this.$axios
        .delete(`${this.$hostname}/api/admin/contact/${this.contact.id}`)
        .then(res => {
          if (res.status == 200) {
            this.tableData.refresh = !this.tableData.refresh;
            $("#warning").modal("hide");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  padding: 1.25rem;

  a {
    text-decoration: none;
  }
  .actions {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  form {
    button {
      border: 0;
      background: none;
    }
  }
  .fa-trash-alt {
    color: #dc3545;
  }
  .modal-content,
  .input-group-prepend {
    border-radius: 0;
  }
}
</style>
