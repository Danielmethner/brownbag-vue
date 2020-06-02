<template>
  <div>
    <header class="jumbotron">
      <h1>Business Management</h1>
    </header>
    <div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <b-form-select
              v-model="businessId"
              :options="businessList"
              @change="changeParty()"
              value-field="id"
              text-field="name"
            >
              <option disabled value="0">Please Select a Business</option>
            </b-form-select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <b-tabs content-class="mt-3" v-model="selectedTab">
            <div v-if="businessId">
              <b-tab title="Overview" @click="getOverview()">
                <Overview ref="overview"></Overview>
              </b-tab>
              <b-tab title="Portfolio" @click="getPortfolio()">
                <Portfolio ref="portfolio"></Portfolio>
              </b-tab>
              <b-tab title="Orders" @click="getMyOrders()">
                <MyOrders ref="myOrders"></MyOrders>
              </b-tab>
              <b-tab title="Balance Sheet" @click="getBalSheet()">
                <BalSheet ref="balSheet"></BalSheet>
              </b-tab>
              <b-tab title="Income Statement" @click="getIncomeStmt()">
                <IncomeStatement ref="incomeStmt"></IncomeStatement>
              </b-tab>
              <b-tab title="New Order" @click="genNewOrder()">
                <NewOrder ref="newOrder"></NewOrder>
              </b-tab>
            </div>
            <div>
              <b-tab title="Create Business" @click="newLegalPerson()">
                <NewLegalPerson ref="newlegalperson" @reloadParties="getParties()"></NewLegalPerson>
              </b-tab>
            </div>
          </b-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyOrders from "@/components/entities/order/MyOrders";
import NewOrder from "@/components/entities/order/NewOrder";
import Portfolio from "@/components/entities/pos/Portfolio";
import BalSheet from "@/components/entities/party/BalanceSheet";
import Overview from "@/components/entities/party/Overview";
import IncomeStatement from "@/components/entities/party/IncomeStatement";
import NewLegalPerson from "@/components/entities/party/NewLegalPerson";
import PartyService from "@/service/party.service";
import Party from "@/model/Party";
export default {
  name: "BusinessBase",
  data() {
    return {
      businessId: 0,
      businessList: [],
      selectedTab: null,
      prevBus: null,
      changeTab: false,
      business: new Party(),
      selectBusinessDflt: "Loading businesses"
    };
  },
  mounted() {
    this.getParties();
    this.business = this.$store.state.party.business;
    if (this.business.id != null) {
      this.businessId = this.business.id;
      this.prevBus = 0;
    }
  },
  updated() {
    // SET DEFAULT TAB TO 0 WHEN SELECTING A BUSINESS FOR FIRST TIME
    if (this.selectedTab > 0 && this.prevBus == null) {
      this.selectedTab = 0;
      this.prevBus = this.businessId;
    }
  },
  computed: {},
  methods: {
    newLegalPerson() {},
    changeParty() {
      this.business = this.$store.getters["party/businessById"](
        this.businessId
      );
      this.$store.commit("party/business", this.business);
      this.getPortfolio();
      this.getMyOrders();
      this.genNewOrder();
      this.getBalSheet();
      this.getOverview();
    },
    getParties() {
      PartyService.getLegalPersonByOwnerUser().then(
        response => {
          this.$store.commit("party/businessList", response.data);
          this.businessList = [];

          response.data.forEach(business => {
            let businessCache = new Party(
              business.id,
              business.name,
              business.technicalName,
              business.partyType,
              business.partyTypeName,
              business.legalForm,
              business.legalFormName,
              business.userId,
              business.userName,
              business.ownerPartyId,
              business.ownerPartyName,
              business.assetId,
              business.assetName,
              business.assetShareQty,
              business.shareCapital
            );
            this.businessList.push(businessCache);
          });
          this.$store.commit("party/businessList", this.businessList);

          if (this.businessList.length == 0) {
            this.selectBusinessDflt = "Please create business";
          } else {
            this.selectBusinessDflt = "Please select business";
          }
        },
        error => {
          this.selectBusinessDflt = "No Business could be found: " + error;
        }
      );
    },
    genNewOrder() {
      if (this.business != null) {
        this.$refs.newOrder.genNewOrder(this.business);
      }
    },
    getMyOrders() {
      if (this.businessId) {
        this.$refs.myOrders.getMyOrders(this.businessId);
      }
    },
    getPortfolio() {
      if (this.businessId) {
        this.$refs.portfolio.getPortfolio(this.businessId);
      }
    },
    getBalSheet() {
      this.$refs.balSheet.getFinStmt(this.businessId);
    },
    getIncomeStmt() {
      this.$refs.incomeStmt.getFinStmt(this.businessId);
    },
    getOverview() {
      this.$refs.overview.getOverview(this.business);
    }
  },
  components: {
    Overview,
    NewLegalPerson,
    MyOrders,
    NewOrder,
    Portfolio,
    BalSheet,
    IncomeStatement
  }
};
</script>
<style>
.jumbotron {
  padding: 2em;
}

.amtPositive {
  color: green;
}

.amtNegative {
  color: red;
}
</style>
