<template>
  <div class="footer">
    <div class="row">
      <div class="col-md-2" />
      <div class="col-md-3" v-for="navBlock in navBlocks" v-bind:key="navBlock.title">
        <div class="row footer-title">{{navBlock.title}}</div>
        <div class="row footer-menu-item" v-for="item in navBlock.items" v-bind:key="item.title">
          <router-link class="footer-menu-item-link" v-bind:to="item.destination">{{item.title}}</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottom",
  data: function() {
    return {
      navBlocks: [
        {
          title: "ABOUT US",
          items: [
            { title: "Overview", destination: { name: "WebPageAboutUs" } },
            {
              title: "Our Team",
              destination: { name: "WebPageAboutUsOurTeam" }
            }
          ]
        },
        {
          title: "WHAT WE DO",
          items: [
            { title: "Overview", destination: { name: "WebPageWhatWeDo" } },
            {
              title: "Securities Analysis",
              destination: { name: "WebPageWhatWeDoSecuritiesAnalysis" }
            },
            { title: "CRM", destination: { name: "WebPageWhatWeDoCRM" } },
            {
              title: "IT Training",
              destination: { name: "WebPageWhatWeDoTraining" }
            }
          ]
        },
        {
          title: "IMPRINT",
          items: [
            { title: "Overview", destination: { name: "WebPageImprint" } },
            { title: "Contact", destination: { name: "WebPageContact" } },
            {
              title: "Data Privacy",
              destination: { name: "WebPageImprintDataPrivacy" }
            }
          ]
        }
      ]
    };
  }
};
</script>

<style>
.footer {
  background-color: black;
  color: white;
  text-align: center;
}

.footer-title {
  color: #728a9b;
  font-weight: bold;
  font-size: 14px;
  padding-bottom: 1em;
  padding-top: 2em;
}

.footer-menu-item-link {
  color: white;
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.footer-menu-item-link:hover {
  color: white;
  font-size: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  font-weight: bold;
}
.row {
  margin: 0 !important;
}
</style>