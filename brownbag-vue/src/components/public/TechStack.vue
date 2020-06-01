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
import { PAGE_URL } from "@/service/blog.service";
export default {
  name: "TechStack",
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
      console.log(PAGE_URL.TECH_STACK);
      BlogService.getBlogPost(PAGE_URL.TECH_STACK).then(response => {
        this.blogpost = response.data;
      });
    }
  }
};
</script>

<style>
.google-page {
  padding-top: 4em;
}
</style>