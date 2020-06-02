<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <b-table striped hover :items="vars" :fields="headers" head-variant="dark" sort-icon-left>
          <template v-slot:cell(val)="data">{{ data.item.val | toLocalDate}}</template>
          <template
            v-slot:cell(timestampModified)="data"
          >{{ data.item.timestampModified | toTimestamp}}</template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsService from "@/service/settings.service";
import CtrlVar from "@/model/CtrlVar";
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
        { label: "Key", key: "key", sortable: true },
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
        response.data.forEach(jsonCtrlVar => {
          let val;
          switch (jsonCtrlVar.dataType) {
            case "DATE":
              val = jsonCtrlVar.valDate;
              break;
            case "BOOL":
              val = jsonCtrlVar.valBool;
              break;
            case "STRING":
              val = jsonCtrlVar.valString;
              break;
            case "DOUBLE":
              val = jsonCtrlVar.valDouble;
              break;
            default:
              val = null;
          }
          let ctrlVar = new CtrlVar(
            jsonCtrlVar.id,
            jsonCtrlVar.dataType,
            jsonCtrlVar.timestampModified,
            jsonCtrlVar.name,
            jsonCtrlVar.key,
            val,
            jsonCtrlVar.editable
          );
          this.vars.push(ctrlVar);
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
