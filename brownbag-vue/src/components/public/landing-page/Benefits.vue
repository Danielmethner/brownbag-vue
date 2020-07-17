<template>
  <div>
    <h3 class="text-center">
      <span>Financial education made easy!</span>
    </h3>
    <div class="row align-center">
      <div class="col"></div>
      <div class="col-md-10">
        <div class="row bullet-point-row" v-for="benefit in benefitList" v-bind:key="benefit.text">
          <div class="col-md">
            <b-icon
              icon="check"
              font-scale="2"
              variant="success"
              class="font-weight-bold text-center"
              aria-hidden="false"
            ></b-icon>
          </div>
          <div class="bullet-point-text col-md-10">
            <span>{{benefit.text}}</span>
          </div>
        </div>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Benefits",
  data() {
    return {
      benefitList: [
        { text: "Trade on your personal account or create companies" },
        { text: "Issue, buy & sell shares" },
        { text: "Issue bonds" },
        { text: "Take out loans" },
        {
          text: "Cost based balance sheet & income statement"
        }
      ]
    };
  }
};
</script>

<style scoped>
row {
	margin: 0 auto;
}
ul{
  list-style-type: none;
}
.bullet-point-row {
  padding-top: 1em;
  
}
.bullet-point-text {
  padding-top: 5px;
  padding-left: 2em;
}
</style>