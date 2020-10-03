<template>
  <div class="container text-left">
    <h1>Product list</h1>
    <button class="btn btn-success">
      <i class="fas fa-plus"></i> Add a product
    </button>
    <div class="row pt-4">
      <div class="col col-12 col-md-6">
        <div class="form-group">
          <label>Search:</label>
          <input type="text" v-model="search" class="form-control">
        </div>
        
      </div>
      <div class="col col-12 col-md-6">
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item"><a class="page-link" href="#">Previous</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
}
</script>

<style scoped>
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
    color: #333 !important;
    font-weight: bold;
    margin-bottom: 0;
  }
  
  .form-group input {
    margin-left: 1em;
  }
</style>
