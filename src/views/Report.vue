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
            ></ion-datetime>
          </ion-col>
          <ion-col>
            <ion-datetime
              display-format="MM/DD/YYYY"
              placeholder="<<End Date>>"
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
              :value="finalDataSectionA.customerProgram"
              v-model="finalDataSectionA.customerProgram"
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
              :value="finalDataSectionA.inspectedBy"
              v-model="finalDataSectionA.inspectedBy"
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
            <ion-button expand="full" color="success">Display</ion-button>
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
          <ion-col size="6" class="hardcodecol">
            <ion-text>Checklists</ion-text>
          </ion-col>
          <ion-col size="3" class="hardcodecol" style="text-align: center">
            <ion-text>No. of Checks</ion-text>
          </ion-col>
          <ion-col size="3" class="hardcodecol" style="text-align: center">
            <ion-text>No. of Rejects</ion-text>
          </ion-col>
        </ion-row>
        <ion-row v-for="(item, item_index) in checkItems" :key="item_index">
          <ion-col size="1" style="text-align: center">
            <ion-text>{{ item_index + 1 }}</ion-text>
          </ion-col>
          <ion-col size="4">
            <ion-text>{{ item.check_item }}</ion-text>
          </ion-col>

          <ion-col size="7" style="--ion-grid-column-padding: 0px">
            <ion-grid
              style="
                --ion-grid-padding: 0px;
                --ion-grid-columns: 7;
                --ion-grid-column-padding: 0px;
              "
            >
              <ion-row
                style="height: 100%; border-width: 0px solid"
                v-for="(element, element_index) in item.check_elements"
                :key="element_index"
              >
                <ion-item-divider v-if="element_index != 0"></ion-item-divider>
                <ion-col size="3" class="col-in-col-1">
                  <ion-text>{{ element.name }}</ion-text>
                </ion-col>
                <ion-col
                  size="1"
                  class="col-in-col-2"
                  @click="clickChecked(item_index, element_index)"
                >
                  <ion-text class="col-in-col-2-item">Checked</ion-text>
                  <ion-checkbox
                    color="dark"
                    :checked="element.checked == 1"
                  ></ion-checkbox>
                </ion-col>
                <ion-col
                  size="1"
                  class="col-in-col-3"
                  @click="clickRejected(item_index, element_index)"
                >
                  <ion-text class="col-in-col-2-item">Reject</ion-text>
                  <ion-checkbox
                    color="dark"
                    :checked="element.rejected == 1"
                  ></ion-checkbox>
                </ion-col>
                <ion-col
                  size="1"
                  style="text-align: center"
                  class="col-in-col-4"
                >
                  <ion-text>{{ element.checked }}</ion-text>
                </ion-col>
                <ion-col
                  size="1"
                  style="text-align: center"
                  class="col-in-col-4"
                >
                  <ion-text>{{ element.rejected }}</ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>
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
  IonCheckbox,
  IonMenuButton,
  loadingController,
  IonList,
  IonButtons,
  IonItemDivider,
  IonButton,
  IonItem,
  IonDatetime,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { services } from "../scripts/service";
import { deepCopy } from "../scripts/deepCopy";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

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
    IonCheckbox,
    IonMenuButton,
    IonDatetime,
    IonButtons,
    IonItemDivider,
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
      initing: false,
      showSectionB: false,
      hasRejected: false,
      aircraftRegNos: new Array(0),
      aircraftTypes: new Array(0),
      inspectedBys: new Array(0),
      checklists: new Array(0),
      engineTypes: new Array(0),
      customers: new Array(0),
      locations: new Array(0),
      currentDate: null as any,
      loading: null as any,
      checkItems: null as any,
      finalDataSectionA: {
        aircraftRegNo: "",
        engineType: "",
        aircraftType: "",
        customerProgram: "",
        location: "",
        checklist: "",
      },
    };
  },
  methods: {
    clickSave() {
      const key = this.generateKey(15);

      const data = {
        sectionA: this.finalDataSectionA,
        sectionB: this.checkItems,
        date: this.currentDate,
      };
      localStorage.setItem(key, JSON.stringify(data));
      services.openToast("checklist Saved");
    },
    clickChecked(itemIndex: number, elementIndex: number) {
      if (
        this.checkItems[itemIndex].check_elements[elementIndex].checked == 1
      ) {
        this.checkItems[itemIndex].check_elements[elementIndex].checked = 0;
        this.checkItems[itemIndex].check_elements[elementIndex].rejected = 0;
        //for showing data
        this.checkItems[itemIndex]["rejected"].splice(
          this.findElementIndex(
            this.checkItems[itemIndex]["rejected"],
            this.checkItems[itemIndex].check_elements[elementIndex].name
          ),
          1
        );
        //for final data binding
        this.checkItems[itemIndex]["finalRejected"].splice(
          this.findElementIndex(
            this.checkItems[itemIndex]["finalRejected"],
            this.checkItems[itemIndex].check_elements[elementIndex].name
          ),
          1
        );
        return;
      }
      this.checkItems[itemIndex].check_elements[elementIndex].checked = 1;
    },
    clickRejected(itemIndex: number, elementIndex: number) {
      if (
        this.checkItems[itemIndex].check_elements[elementIndex].rejected == 0
      ) {
        this.checkItems[itemIndex].check_elements[elementIndex].rejected = 1;
        this.checkItems[itemIndex].check_elements[elementIndex].checked = 1;
        this.checkItems[itemIndex].hasReject = true;

        //for showing data
        this.checkItems[itemIndex].rejected.push(
          this.checkItems[itemIndex].check_elements[elementIndex]
        );
        //for final data binding
        this.checkItems[itemIndex].finalRejected.push({
          name: this.checkItems[itemIndex].check_elements[elementIndex].name,
          staffResponsibility: "",
          trade: "",
          subCategory: "",
          mostProbableCause: "",
        });
        return;
      }
      this.checkItems[itemIndex].check_elements[elementIndex].rejected = 0;
      //for showing data
      this.checkItems[itemIndex]["rejected"].splice(
        this.findElementIndex(
          this.checkItems[itemIndex]["rejected"],
          this.checkItems[itemIndex].check_elements[elementIndex].name
        ),
        1
      );
      //for final data binding
      this.checkItems[itemIndex]["finalRejected"].splice(
        this.findElementIndex(
          this.checkItems[itemIndex]["finalRejected"],
          this.checkItems[itemIndex].check_elements[elementIndex].name
        ),
        1
      );
      for (
        let i = 0;
        i < this.checkItems[itemIndex]["check_elements"].length;
        i++
      ) {
        if (this.checkItems[itemIndex]["check_elements"][i].rejected == 1) {
          return;
        }
      }
      this.checkItems[itemIndex].hasReject = false;
    },
    //selecting checklist change
    async selectChange() {
      const checklistId = deepCopy(this.finalDataSectionA.checklist);
      if (checklistId == "") {
        this.showSectionB == false;
        return;
      }
      this.presentLoading("Loading Checklist ...");
      console.log(this.getItemArrayById(checklistId));
      this.checkItems = await services.getCheckItems(
        this.getItemArrayById(checklistId)
      );
      console.log(this.checkItems);
      this.showSectionB = true;
      this.hideLoading();
    },
    getItemArrayById(id: any) {
      for (let i = 0; i < this.checklists.length; i++) {
        if (this.checklists[i].id == id) {
          return this.checklists[i].check_items;
        }
      }
      return;
    },
    findElementIndex(arr: any, element: any): number {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === element) {
          return i;
        }
      }
      return -1;
    },
    generateKey(len: number) {
      let text = "";
      const chars =
        "abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < len; i++) {
        text += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return "savedId " + text;
    },
    formatDate() {
      const d = new Date();
      let month = "" + (d.getMonth() + 1);
      let day = "" + d.getDate();
      const year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [year, month, day].join("-");
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
    async init() {
      this.initing = true;
      this.presentLoading("Loading...");
      this.aircraftRegNos = await services.getAircraftRegNo();
      this.aircraftTypes = await services.getAircraftType();
      this.inspectedBys = await services.getInspectedBy();
      this.checklists = await services.getChecklist();
      this.engineTypes = await services.getEngineType();
      this.customers = await services.getCustomer();
      this.locations = await services.getLocation();
      this.currentDate = this.formatDate();
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