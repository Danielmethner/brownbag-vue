<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <b-table striped hover :items="vars" :fields="headers" head-variant="dark" sort-icon-left>
          <template v-slot:cell(val)="data">{{ data.item.val | formatDate}}</template>
          <template v-slot:cell(timestampModified)="data">{{ data.item.timestampModified | formatDate}}</template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
export default {
  name: "CtrlVars",
  data() {
    return {
      vars: [],
      headers: [
        { label: "ID", key: "id", sortable: true },
        { label: "Data Type", key: "dataType", sortable: true },
        { label: "Last Modified", key: "timestampModified", sortable: true },
        { label: "Name", key: "name", sortable: true },
        { label: "Value", key: "val", sortable: true }
      ]
    };
  },
  mounted() {
    this.getCtrlVars();
  },
  methods: {
    getCtrlVars() {
      SettingsService.getCtrlVars().then(response => {
        this.vars = [];
        response.data.forEach(ctrlVar => {
          let val;
          switch (ctrlVar.dataType) {
            case 'DATE':
              val = ctrlVar.valDate;
              break;
            case 'BOOL':
              val = ctrlVar.valBool;
              break;
            case 'STRING':
              val = ctrlVar.valString;
              break;
            case 'DOUBLE':
              val = ctrlVar.valDouble;
              break;
            default:
              val = null;
          }
          this.vars.push({
            id: ctrlVar.id,
            dataType: ctrlVar.dataType,
            timestampModified: ctrlVar.timestampModified,
            name: ctrlVar.name,
            val: val
          });
        });
      });
    }
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
