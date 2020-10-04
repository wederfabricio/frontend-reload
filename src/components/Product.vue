<template>
  <div class="container">
    <router-link to="/">Back to list</router-link>
    <h1>{{ product.resume }}</h1>
    <div class="row">
        <div class="col col-12 col-md-9 segment">
            <div class="segment">
                <input type="file" class="d-none">
                <div class="files add-file">
                    <i class="fa fa-plus fa-lg"></i>
                </div>
                <div class="files" v-for="(file, i) in files" :key="i" :class="{ 'files no-file': file === '' }">
                    
                </div>
            </div>
            <h4>Resume</h4>
            <textarea class="form-control name" v-model="product.resume"></textarea>
            <h4>Description</h4>
            <div class="segment-title">
                WXYZYWIG EDITOR
            </div>
            <textarea class="form-control description" v-model="product.desc"></textarea>
        </div>
        <div class="col col-12 col-md-3 text-left">
            <h3>Reference</h3>
            <input type="text" class="form-control" v-model="product.ref">
            <h3>Quantity</h3>
            <input type="text" class="form-control" v-model="product.quantity">
            <h3>Price</h3>
            <div class="row">
                <div class="col col-12 col-lg-6">                    
                    <label>HT</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="product.price_ht">
                        <div class="input-group-append">
                            <span class="input-group-text">€</span>
                        </div>
                    </div>
                </div>
                <div class="col col-12 col-lg-6">
                    <label>TTC</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="product.price_ttc">
                        <div class="input-group-append">
                            <span class="input-group-text">€</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <h3>Categories</h3>
            <div class="segment">
                <div class="badge badge-light">
                    <span v-if="product.category">
                        {{ product.category.desc }} <i class="fa fa-times"></i>
                    </span>
                </div>
            </div>
            <div class="segment">
                <CategoryList v-for="(category, index) in categories" :key="index" :category="category" :selectedCategory="product.category" @categorySelected="categorySelected"></CategoryList>
            </div>
            <h3 class="pt-3">Active?</h3>
            <b-form-group label="">
            <b-form-radio-group
                class="container-fluid p-0"
                id="btn-radios-2"
                v-model="product.active"
                :options="options"
                buttons
                :button-variant="product.active === 1 ? 'outline-success' : 'outline-danger'"
                name="radio-btn-outline"
            ></b-form-radio-group>
            </b-form-group>
            <button @click="doAction" class="btn btn-success container-fluid p-1">Save</button>
        </div>
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue';

export default {
    name: 'Product',
    components: {
        CategoryList
    },
    data() {
        return {
            action: '',
            product: {},
            files: Array(3).fill(''),
            options: [
                { value: 1, text: 'YES' },
                { value: 0, text: 'NO' },
            ],
            categories: []
        }        
    },
    methods: {
        doAction() {
            let params;
            if(this.action === 'updateProduct') {
                params = {
                    data: this.product,
                    id: this.product.id
                };
            } else {
                params = this.product;
            }

            this.$store.dispatch(this.action, params).then(() => {
                this.$bvToast.toast('Saved!', {
                    title: `Success!`,
                    variant: 'success',
                    solid: true
                })
            }).catch((err) => {
                this.$bvToast.toast('Error to save!', {
                    title: `Error!`,
                    variant: 'danger',
                    solid: true
                })
            });
        },
        categorySelected(category) {
            this.$set(this.product, 'category', category);
            this.product.category_id = category.id;
        }
    },
    mounted() {
        this.$store.dispatch('getCategories').then(categories => this.categories = categories)

        let productId = this.$route.params.id;
        if (!productId) {
            this.action = 'saveProduct';
            return;
        }
        
        this.action = 'updateProduct';
        this.$store.dispatch('getProductDetail', productId).then(product => {
            this.product = product;
        });
        
    }
}
</script>

<style>
    .segment {
        border: 1px solid #ccc;
        padding: 1em;
        text-align: left;
    }
    .segment-title {
        border: 1px solid #ccc;
        padding: 1em;
        text-align: center;
    }
    .form-control {
        border-radius: 0;
    }
    .files {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 3em;
        margin-right: 0.5em;
        position: relative;
    }
    .segment h4 {
        margin: 0.5em 0;
    }
    .description {
        height: 300px !important;
    }
    .no-file {
        background-color: #ddd;
    }
    .files i {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -7px;
        margin-left: -7px;
        color: #ccc;
    }
    input.form-control, .input-group {
        margin-bottom: 1em;
    }
</style>