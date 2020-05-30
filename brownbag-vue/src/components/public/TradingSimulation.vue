<template>
  <div>
    <div class="row google-page">
      <div class="col"></div>
      <div class="col-md-6">
        <span v-html="blogpost"></span>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import BlogService from "@/service/blog.service";
export default {
  name: "TradingSimulation",
  data() {
    return {
      blogpost: null
    };
  },
  mounted() {
    this.getBlogPosts();
  },
  methods: {
    getBlogPosts() {
      BlogService.getBlogPost('TRADE_SIMULATION').then(response => {
        console.log(response.data);
        this.blogpost = response.data;
      });
    }
  }
};
</script>

<style>
.google-page { 
  padding-top: 4em;;
}
</style>