<template>
  <div class="container text-left">
    <h1>ProductList</h1>
    <router-link class="btn btn-success" to="/product">
      <i class="fa fa-plus"></i> Add a product
    </router-link>
    <div class="row pt-4">
      <div class="col col-12 col-md-6">
        <div class="form-group">
          <label>Search:</label>
          <input class="form-control" v-model="search">
        </div>
      </div>
      <div class="col col-12 col-md-6 text-right">
        <b-pagination
          v-model="page"
          :total-rows="total"
          :per-page="perPage"
          first-number
          last-number
        ></b-pagination>
      </div>
      <div class="col col-12">
        <b-table   
          :items="items"
          :fields="fields"
          hover 
        >
          <template v-slot:cell(image)="row">
              <img class="img-fluid" v-if="row.item.images.length > 0" :src="$storageApi + '/' + row.item.images[0].file_name" />
          </template>
          <template v-slot:cell(active)="row">
            <div class="flex text-center active-icons">
              <span v-if="row.item.active == 1" class="active"></span>
              <span v-else class="no-active"></span>
            </div>
          </template>
          <template v-slot:cell(actions)="row">
            <div class="flex text-center">
              <b-button v-b-modal.modal-1 variant="light" class="btn-action" @click="selectedProduct = row.item">
                <i class="fa fa-ellipsis-v"></i>
              </b-button>
            </div>
          </template>
        </b-table>
      </div>
      <div class="col col-12 col-md-6">
        <b-form-group
          label="Product / page:"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </div>
      <div class="col col-12 col-md-6 text-right">
        <b-pagination
          class="container-fluid"
          v-model="page"
          :total-rows="total"
          :per-page="perPage"
          first-number
          last-number
        ></b-pagination>
      </div>
    </div>
    <b-modal id="modal-1" title="More" hide-footer>
      <p>{{selectedProduct.resume}}</p>
      <div class="text-center">
        <router-link class="btn btn-primary" :to="'/product/' + selectedProduct.id">
          <i class="fa fa-table"></i> Details
        </router-link>
        <button class="btn btn-danger" @click="deleteProduct">
          <i class="fa fa-trash"></i> Delete
        </button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  data() {
    return {
      perPage: 20,
      selectedProduct: {},
      pageOptions: [5, 10, 15, 20, 50, 100],
      page: 1,
      total: 0,
      search: '',
      items: [],
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'image', label: 'Image' },
        { key: 'ref', label: 'Ref' },
        { key: 'resume', label: 'Name' },
        { key: 'category.desc', label: 'Category' },
        { key: 'price_ht', label: 'Price HT' },
        { key: 'quantity', label: 'Quantity' },
        { key: 'active', label: 'Active' },
        { key: 'actions', label: 'Actions' },
      ]
    }
  },
  methods: {
    doRequest() {
      this.$store.dispatch('getProducts', { 
        resume: this.search,
        page: this.page, 
        perPage: this.perPage
      }).then(pagination => {
        this.items = pagination.data;
        this.total = pagination.total;
      })
    },
    deleteProduct() {
      let id = this.selectedProduct.id;
      this.$bvModal.hide('modal-1');
      this.$store.dispatch('deleteProduct', id).then(() => {
          this.$bvToast.toast('Deleted!', {
              title: `Success!`,
              variant: 'success',
              solid: true
          })
          let index = this.items.findIndex(i => i.id === id);
          this.items.splice(index);
      }).catch((err) => {
          this.$bvToast.toast('Error to delete!', {
              title: `Error!`,
              variant: 'danger',
              solid: true
          })
      });
    }
  },
  watch: {
    search() {
      this.doRequest();
    },
    page() {
      this.doRequest();
    },
    perPage() {
      this.doRequest();
    }
  },
  mounted() {
    this.doRequest();
  }
}
</script>

<style>
  .flex {
    align-items: center;
  }
  .btn {
    padding: 0.5em 3em 0.5em 2em;
  }
  .btn i {
    padding-right: 1em;
  }
  .form-group {
    display: flex;
    align-items: center;
  }
  .form-group label {
    font-weight: bold;
    padding-right: 0.5em;
    margin-bottom: 0;
  }
  .btn-action {
    padding: 0.5em 1em;
    text-align: center;
    background-color: transparent;
  }
  .btn-action i {
    padding: 0;
  }
  .active-icons .active, .active-icons .no-active {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-top: 1em;
    border-radius: 100%;
  }
  .active-icons .active {
    background-color: green;
  }
  .active-icons .no-active {
    background-color: red;
  }
  .table th {
    color: white;
    background-color: #007bff;
  }
  .table th, .table td {
    border: 1px solid #777;
  }
</style>