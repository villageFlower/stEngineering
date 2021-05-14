<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="custom"></ion-menu-button>
        </ion-buttons>

        <ion-title
          style="
            font-size: 3vw;
            font-weight: bold;
            text-align: center;
            color: black;
            padding-top: 20px;
            padding-bottom: 20px;
          "
          >STEDAS e-QSI - Summary Report</ion-title
        >
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col col-12 style="background-color: #ffc409">
            <ion-text style="font-weight: bold"
              >Section A : Search Criteria</ion-text
            >
          </ion-col>
        </ion-row>
        <ion-row class="sectionA_subcol">
          <ion-col size="6" class="hardcodecol">
            <ion-text>Date of Inspection(From/To):</ion-text>
          </ion-col>
          <ion-col>
            <ion-datetime
              display-format="MM/DD/YYYY"
              placeholder="<<Start Date>>"
              v-model="finalData.startDate"
            ></ion-datetime>
          </ion-col>
          <ion-col>
            <ion-datetime
              display-format="MM/DD/YYYY"
              placeholder="<<End Date>>"
              v-model="finalData.endDate"
            ></ion-datetime>
          </ion-col>
        </ion-row>
        <ion-row class="sectionA_subcol">
          <ion-col class="hardcodecol">
            <ion-text>Customer/Program:</ion-text>
          </ion-col>
          <ion-col>
            <ion-select
              interface="action-sheet"
              :value="finalData.customerProgram"
              v-model="finalData.customerProgram"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(customer, index) in customers"
                :key="index"
                :value="customer.id"
                >{{ customer.customer_program }}</ion-select-option
              >
            </ion-select>
          </ion-col>
        </ion-row>
        <ion-row class="sectionA_subcol">
          <ion-col class="hardcodecol">
            <ion-text>Inspected By :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select
              interface="action-sheet"
              :value="finalData.inspectedBy"
              v-model="finalData.inspectedBy"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(staff, index) in inspectedBys"
                :key="index"
                :value="staff.id"
                >{{ staff.inspected_by }}</ion-select-option
              >
            </ion-select>
          </ion-col>
        </ion-row>
        <ion-row style="padding-top: 10px">
          <ion-col offset="10" size="2" class="button-col">
            <ion-button expand="full" color="success" @click="clickDisplay"
              >Display</ion-button
            >
          </ion-col>
        </ion-row>
      </ion-grid>

      <!-- <ion-grid
        style="
          padding-top: 30px;
          --ion-grid-padding: 0px;
          --ion-grid-column-padding: 0px;
        "
        v-if="showSectionB"
      > -->
      <ion-grid style="padding-top: 30px">
        <ion-row>
          <ion-col style="background-color: #ffc409">
            <ion-text style="font-weight: bold">Section B : Results</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="6" class="hardcodecol" style="text-align: center">
            <ion-text>Checklists</ion-text>
          </ion-col>
          <ion-col size="3" class="hardcodecol" style="text-align: center">
            <ion-text>No. of Checks</ion-text>
          </ion-col>
          <ion-col size="3" class="hardcodecol" style="text-align: center">
            <ion-text>No. of Rejects</ion-text>
          </ion-col>
        </ion-row>
        <ion-row v-for="(checklist, index) in checklists" :key="index">
          <ion-grid
            style="
              --ion-grid-padding: 0px;
              --ion-grid-columns: 12;
              --ion-grid-column-padding: 0px;
            "
          >
            <ion-row>
              <ion-col size="6" class="itemname">
                <ion-text>{{ checklist.checklist }}</ion-text>
              </ion-col>
              <ion-col size="3" style="text-align: center">
                <ion-text></ion-text>
              </ion-col>
              <ion-col size="3" style="text-align: center">
                <ion-text></ion-text>
              </ion-col>
            </ion-row>
            <ion-row v-for="(checkitem, index) in checklist.check_items" :key="index">
              <ion-grid
                style="
                  --ion-grid-padding: 0px;
                  --ion-grid-columns: 12;
                  --ion-grid-column-padding: 0px;
                "
              >
                <ion-row>
                  <ion-col size="6" >
                    <ion-text>{{checkitem.name}}</ion-text>
                  </ion-col>
                  <ion-col size="3" style="text-align: center">
                    <ion-text>{{checkitem.checks}}</ion-text>
                  </ion-col>
                  <ion-col size="3" style="text-align: center">
                    <ion-text>{{checkitem.rejects}}</ion-text>
                  </ion-col>
                </ion-row>
              </ion-grid>
            </ion-row>
          </ion-grid>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSelect,
  IonText,
  IonCol,
  IonRow,
  IonGrid,
  IonSelectOption,
  IonMenuButton,
  loadingController,
  IonButtons,
  IonButton,
  IonDatetime,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { services } from "../scripts/service";
import { deepCopy } from "../scripts/deepCopy";

export default defineComponent({
  name: "Home",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonText,
    IonCol,
    IonRow,
    IonGrid,
    IonSelectOption,
    IonMenuButton,
    IonDatetime,
    IonButtons,
    IonButton,
  },
  setup() {
    const options: any = {
      cssClass: "my-custom-interface",
    };
    return { options };
  },
  data() {
    return {
      showSectionB: false,
      inspectedBys: new Array(0),
      checklists: new Array(0),
      customers: new Array(0),
      locations: new Array(0),
      loading: null as any,
      finalData: {
        startDate: "",
        endDate: "",
        customerProgram: "",
        inspectedBy: "",
      },
    };
  },
  methods: {
    clickSave() {
      console.log("save");
    },
    async clickDisplay() {
      this.finalData.startDate = new Date(
        this.formatDate(this.finalData.startDate)
      );
      this.finalData.endDate = new Date(
        this.formatDate(this.finalData.endDate)
      );
      console.log(this.finalData);
      this.checklists.forEach(async (list) => {
        list["check_items"].forEach(item => {
          item.checks = 0
          item.rejects = 0
        });
        const res = await services.getReportData(list.id, this.finalData);
        console.log(res);
        res.forEach((item) => {
          for (let i = 0; i < item["sectionB"].length; i++) {
            list.check_items[i].checks += item.sectionB[i].checks;
            list.check_items[i].rejects += item.sectionB[i].rejects;
          }
        });
      });
      console.log(this.checklists);
    },
    async presentLoading(msg: string) {
      this.loading = await loadingController.create({
        cssClass: "my-custom-class",
        message: msg,
      });
      await this.loading.present();
    },

    async hideLoading() {
      await this.loading.dismiss();
    },
    formatDate(date) {
      const d = new Date(date);
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
    },
    async init() {
      this.presentLoading("Loading...");
      this.inspectedBys = await services.getInspectedBy();
      this.checklists = await services.getChecklist();
      this.checklists.forEach((element) => {
        element.check_items.forEach((item) => {
          item.checks = 0;
          item.rejects = 0;
        });
      });
      this.customers = await services.getCustomer();
      this.hideLoading();
    },
  },
  ionViewDidEnter() {
    this.init();
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
.header-row {
  background: #7163aa;
  color: #fff;
  font-size: 18px;
}

.my-custom-interface .popover-content {
  --color: #5e3e2c;
  --color-hover: #362419;
}

ion-datetime {
  height: 20px;
}

ion-item-divider {
  --background: black;
  margin-top: 0px;
  min-height: 0.5px !important;
}

ion-col {
  border: 1px solid #eceeef;
  border-color: rgb(0, 0, 0);
}
.hardcodecol {
  background-color: #eef734;
}
.itemname {
  background-color: #edf73473;
}
ion-text {
  font-size: 1.6vw;
}
ion-select {
  height: 20px;
  padding-top: 11px;
  font-size: 1.5vw;
}
.select-pop {
  width: 800px;
}
.sectionA_subcol {
}
.col-in-col-1 {
  border-width: 0px 1px 0px 0px;
  align-items: center;
  padding-top: 5px;
}
.col-in-col-2 {
  border-width: 0px 1px 0px 0px;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
}
.col-in-col-3 {
  border-width: 0px 1px 0px 0px;
  padding-top: 5px;
}
.col-in-col-4 {
  border-width: 0px 0px 0px 1px;
  padding-top: 5px;
  align-items: center;
}
.col-in-col-2-item {
  padding-left: 3px;
  padding-right: 6px;
  font-size: 1.3vw;
}
ion-checkbox {
  --size: 13px;
}
ion-datetime {
  padding-top: 2px;
  font-size: 1.6vw;
  color: black;
}
.button-col {
  border-width: 0px 0px 0px 0px;
}
</style>