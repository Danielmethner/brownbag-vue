<template>
  <div id="content" class="row justify-content-md-center">
    <div class="col-md-6">
      <div class="row">
        <div class="col-md-12 text-center"></div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <div class="card p-4 bg-light">
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputName">Name</label>
                <input type="text" class="form-control" id="qty" v-model="newLegalPerson.name" />
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputLegalForm">Legal Form</label>
                <b-form-select v-model="newLegalPerson.legalForm" :options="legalFormList">
                  <option disabled value="null">{{legalFormDflt}}</option>
                </b-form-select>
              </div>
            </div>
            <div class="form-group row">
              <div class="form-group col">
                <label for="inputName">Share Capital</label>
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="qty"
                  placeholder="10000"
                  step="0.01"
                  v-model="newLegalPerson.shareCapital"
                />
              </div>
            </div>
            <div class="form-group row" v-if="isCorporation">
              <div class="form-group col">
                <label for="inputName">Number of Shares</label>
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  id="avblQty"
                  step="1"
                  v-model="newLegalPerson.assetShareQty"
                />
              </div>
              </div>
                          <div class="form-group row" v-if="isCorporation">
              <div class="form-group col">
                <label for="inputName">Nominal Value per Share</label>
                <label
                  readonly
                  type="number"
                  min="0"
                  step="0.01"
                  class="form-control"
                  id="qty"
                >{{nomVal}}</label>
              </div>
            </div>
            <div class="form-group row">
              <label type="text" class="submit-feedback">{{status}}</label>
            </div>
            <div class="form-group row">
              <div class="form-group col-6">
                <button @click="createBusiness()" class="btn btn-primary btn-block">Create Business</button>
              </div>
              <div class="form-group col-6">
                <button @click="clearForm()" class="btn btn-dark btn-block">Clear Form</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import AssetService from "@/service/asset.service";
import EnumService from "@/service/enum.service";
// import OrderService from "@/service/order.service";
import PartyService from "@/service/party.service";
export default {
  name: "NewLegalPerson",
  data() {
    return {
      legalFormList: [],
      status: null,
      newLegalPerson: {
        name: 'MyName',
        legalForm: 'CORP',
        shareCapital: 25000,
        assetShareQty: 1
      }
    };
  },
  computed: {
    isCorporation() {
      return this.newLegalPerson.legalForm == "CORP";
    },
    legalFormDflt() {
      return "Select Legal Form";
    },
    nomVal() {
      if (!this.newLegalPerson.assetShareQty > 0) {
        return null;
      }
      let nomVal = Math.round(
        this.newLegalPerson.shareCapital / this.newLegalPerson.assetShareQty,
        2
      );

      return nomVal;
    }
  },
  mounted() {
    EnumService.getLegalFormList().then(response => {
      response.data.forEach(legalForm => {
        let dropdownItem = { value: legalForm.key, text: legalForm.name };
        this.legalFormList.push(dropdownItem);
      });
    });
  },
  methods: {
    createBusiness() {
      this.status = " ";
      if (this.newLegalPerson.legalForm == null) {
        this.status = "Error: Legal Form must be set!";
        return;
      }
      if (this.newLegalPerson.name == null) {
        this.status = "Error: Name must be set";
        return;
      }
      if (this.newLegalPerson.shareCapital < 10000) {
        this.status = "Error: Share Capital must be at least 10,000";
        return;
      }
      PartyService.createParty(this.newLegalPerson).then(response => {
        this.status = response.data;
        this.clearForm();
        this.$emit('reloadParties');
      }).catch(error => {
        this.status = error;
      });
    },
    clearForm() {
      this.newLegalPerson.name = null;
      this.newLegalPerson.legalform = null;
      this.newLegalPerson.shareCapital = 10000;
      this.newLegalPerson.qtyShares = 1;
    }
  }
};
</script>

<style scoped>
input {
  margin-bottom: 8px !important;
}
#asset {
  text-align: left;
}
#content {
  /* max-width: 500px; */
  padding-bottom: 50px;
  text-align: center;
}
.button-dir {
  min-width: 100px;
  max-width: 50%;
}
.dd {
  text-align: left;
  vertical-align: top;
}
.form-group {
  margin: 0 auto;
  text-align: left;
  min-width: 50%;
  padding: 5px;
}
.submit-feedback {
  min-height: 19px;
  color: darkred;
}
</style>
