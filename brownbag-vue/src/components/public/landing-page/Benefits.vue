<div>
	<div class="row align-center">
		<div class="col-1 col-md-3"></div>
		<div class="col-11 col-md-9">
			<div class="row">
				<h2 class="text-center padding-bottom-1em padding-top-1em">Financial education made easy!</h2>
			</div>
			<div class="row padding-bottom-1em" *ngFor="let benefit of benefitList">

				<span>
					<fa-icon class="checkmark" [icon]="faCheck" [styles]="{'stroke': 'green', 'color': 'green'}"></fa-icon> {{benefit.text}}
				</span>
			</div>
		</div>
	</div>
</div>

<template>
  <div>
    <div class="row align-center">
      <div class="col-1 col-md-3"></div>
      <div class="col-11 col-md-9">
        <div class="row">
          <h2 class="text-center padding-bottom-1em padding-top-1em">Financial education made easy!</h2>
        </div>
        <div class="row bullet-point-row" v-for="benefit in benefitList" v-bind:key="benefit.text">
          <span>
            <b-icon
              icon="check"
              font-scale="2"
              variant="success"
              class="font-weight-bold text-center"
              aria-hidden="false"
            ></b-icon>
            {{benefit.text}}
          </span>
        </div>
      </div>
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