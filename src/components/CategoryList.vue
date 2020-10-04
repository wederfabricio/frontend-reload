<template>
  <div>
      <span class="squad" :class="active ? 'active' : ''" @click="toggleActive()"></span> {{ category.desc }}
      <CategoryList v-for="(subcategory, index) in category.subcategories" :key="index" :category="subcategory" class="subcategory" :selectedCategory="selectedCategory" @categorySelected="categorySelected"></CategoryList>
  </div>
</template>

<script>
export default {
    name: 'CategoryList',
    data() {
        return {
            active: false
        }
    },
    props: {
        category: {
            type: Object
        },
        selectedCategory: {
            type: Object
        },
    },
    watch: {
        selectedCategory: {
            handler: function (val) {
                if(val === undefined || val.desc !== this.category.desc) this.active = false;
                else this.active = true;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        toggleActive() {
            this.active = !this.active;
            this.$emit('categorySelected', this.category);
        },
        categorySelected(category) {
            this.$emit('categorySelected', category);
        }
    }
}
</script>

<style>
    .squad {
        display: inline-block;
        margin-right: 0.5em;
        width: 12px;
        height: 12px;
        border: 1px solid #ddd;
    }
    .active {
        background-color: green;
    }
    .subcategory {
        padding-left: 1em;
    }
</style>