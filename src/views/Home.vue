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
          >STEDAS e-QSI</ion-title
        >
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col col-12 style="background-color: #ffc409">
            <ion-text style="font-weight: bold"
              >Section A : Surveillance Details</ion-text
            >
          </ion-col>
        </ion-row>
        <ion-row class="sectionA_subcol">
          <ion-col class="hardcodecol">
            <ion-text>Aircraft Reg. No :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select interface="popover" value="">
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(no, index) in aircraftRegNos"
                :key="index"
                :value="no.id"
                >{{ no.aircraft_reg_no }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Engine Type :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select interface="popover" value="">
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(type, index) in engineTypes"
                :key="index"
                :value="type.id"
                >{{ type.engine_type }}</ion-select-option
              >
            </ion-select>
          </ion-col>
        </ion-row>
        <ion-row class="sectionA_subcol">
          <ion-col class="hardcodecol">
            <ion-text>Aircraft Type :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select interface="popover" value="">
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(type, index) in aircraftTypes"
                :key="index"
                :value="type.id"
                >{{ type.aircraft_type }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Customer/Program :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select interface="popover" value="">
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
            <ion-select interface="popover" value="">
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(staff, index) in inspectedBys"
                :key="index"
                :value="staff.id"
                >{{ staff.inspected_by }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Location :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select interface="popover" value="">
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(location, index) in locations"
                :key="index"
                :value="location.id"
                >{{ location.location }}</ion-select-option
              >
            </ion-select>
          </ion-col>
        </ion-row>
        <ion-row class="sectionA_subcol">
          <ion-col class="hardcodecol">
            <ion-text>Checklist :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select
              interface="popover"
              :value="selected"
              v-model="selected"
              @ionChange="selectChange('checklist')"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(checklist, index) in checklists"
                :key="index"
                :value="checklist.id"
                >{{ checklist.checklist }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Date of Inspection :</ion-text>
          </ion-col>
          <ion-col>
            <ion-text style="padding-left:16px;">{{ currentDate }}</ion-text>
            <!-- <ion-datetime
              style="height: 10px"
              display-format="MM/DD/YYYY"
              v-model="currentDate"
            ></ion-datetime> -->
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid style="padding-top: 30px" v-if="selected != ''">
        <ion-row>
          <ion-col col-12 style="background-color: #ffc409">
            <ion-text style="font-weight: bold">Section B : Checklist</ion-text>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="1" class="hardcodecol" style="text-align: center">
            <ion-text>S/N</ion-text>
          </ion-col>
          <ion-col size="4" class="hardcodecol">
            <ion-text>Check Item</ion-text>
          </ion-col>
          <ion-col size="5" class="hardcodecol">
            <ion-text>Check Elements</ion-text>
          </ion-col>
          <ion-col size="1" class="hardcodecol" style="text-align: center">
            <ion-text>Qty Inspected</ion-text>
          </ion-col>
          <ion-col size="1" class="hardcodecol" style="text-align: center">
            <ion-text>Qty Inspected</ion-text>
          </ion-col>
        </ion-row>
        <ion-row v-for="(item, item_index) in items" :key="item_index">
          <ion-col size="1" style="text-align: center">
            <ion-text>1</ion-text>
          </ion-col>
          <ion-col size="4">
            <ion-text>{{ item.name }}</ion-text>
          </ion-col>

          <ion-col size="7" style="--ion-grid-column-padding: 0px">
            <ion-grid style="--ion-grid-padding: 0px; --ion-grid-columns: 7">
              <ion-row
                style="height: 100%"
                v-for="(element, element_index) in item.elements"
                :key="element_index"
              >
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
          <div v-if="item.hasReject == true" style="width: 100%">
            <ion-grid
              v-for="(reject, reject_index) in item.rejected"
              :key="reject_index"
              style="
                padding-left: 8.3vw;
                padding-right: 8.3vw;
                --ion-grid-columns: 10;
                --ion-grid-column-padding: 1px;
                padding-top: 3vh;
                padding-bottom: 3vh;
              "
            >
              <ion-row style="background-color: red">
                <ion-col size="4" style="text-align: center">
                  <ion-text style="color: white">Rejected</ion-text>
                </ion-col>
                <ion-col size="2">
                  <ion-text style="color: white">Sub-category</ion-text>
                </ion-col>
                <ion-col size="4">
                  <ion-text style="color: white">Most Probable Cause</ion-text>
                </ion-col>
              </ion-row>

              <ion-row>
                <ion-col size="4">
                  <ion-text>{{ reject.name }}</ion-text>
                </ion-col>
                <ion-col size="2">
                  <ion-select interface="popover" value="">
                    <ion-select-option value=""
                      >Please Select</ion-select-option
                    >
                  </ion-select>
                </ion-col>
                <ion-col size="4">
                  <ion-select interface="popover" value="">
                    <ion-select-option value=""
                      >Please Select</ion-select-option
                    >
                  </ion-select>
                </ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="4" style="--ion-grid-column-padding: 0px">
                  <ion-grid
                    style="
                      --ion-grid-padding: 1px;
                      --ion-grid-columns: 9;
                      width: 100%;
                    "
                  >
                    <ion-row style="border: 0px">
                      <ion-col size="5" style="border-width: 0px 1px 1px 0px">
                        <ion-text style="padding-left: 1px"
                          >Staff Responsible</ion-text
                        >
                      </ion-col>
                      <ion-col size="4" style="border-width: 0px 0px 1px 1px">
                        <ion-text style="padding-left: 1px">[XXXX]</ion-text>
                      </ion-col>
                    </ion-row>
                    <ion-row style="border: 0px; height: 6vh">
                      <ion-col size="5" style="border-width: 1px 1px 0px 0px">
                        <ion-text style="padding-left: 1px">Trade</ion-text>
                      </ion-col>
                      <ion-col size="4" style="border-width: 1px 0px 0px 1px">
                        <ion-select
                          interface="popover"
                          value=""
                          style="padding-left: 1px"
                        >
                          <ion-select-option value=""
                            >Please Select</ion-select-option
                          >
                        </ion-select>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-col>
                <ion-col size="6" style="--ion-grid-column-padding: 0px">
                  <ion-grid
                    style="--ion-grid-columns: 12; --ion-grid-padding: 0px"
                  >
                    <ion-row>
                      <ion-text>Remarks:</ion-text>
                    </ion-row>
                    <ion-row>
                      <ion-col style="border: 0px" size="10"
                        ><ion-input></ion-input
                      ></ion-col>
                      <ion-col style="border: 0px" size="2">
                        <ion-button
                          style="
                            height: 60%;
                            width: 90%;
                            float: right;
                            padding: 0px;
                            font-size: 1vw;
                          "
                          expand="full"
                          color="success"
                        >
                          Continue
                        </ion-button>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-col>
              </ion-row>
            </ion-grid>
          </div>
        </ion-row>

        <ion-row style="padding-top: 3vh">
          <ion-col offset="9" size="1" class="button-col">
            <ion-button expand="full" color="success">Edit</ion-button>
          </ion-col>
          <ion-col size="1" class="button-col">
            <ion-button expand="full" color="success">Save</ion-button>
          </ion-col>
          <ion-col size="1" class="button-col">
            <ion-button expand="full" color="success">Submit</ion-button>
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
  IonButton,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { services } from "../scripts/service";

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
  },
  data() {
    return {
      selected: "",
      values: [
        {
          name: "facility",
          value: "facilities",
        },
      ],
      items: [
        {
          name: "Fire Protection System",
          elements: [
            {
              name: " a) Fire Extinguisher",
              checked: 0,
              rejected: 0,
            },
            {
              name: " b) Fire Hose Reel",
              checked: 0,
              rejected: 0,
            },
          ],
          hasReject: false,
          rejected: new Array(0),
        },
      ],
      rejected: [],
      hasRejected: false,
      rejecting: [],
      aircraftRegNos: new Array(0),
      aircraftTypes: new Array(0),
      inspectedBys: new Array(0),
      checklists: new Array(0),
      engineTypes: new Array(0),
      customers: new Array(0),
      locations: new Array(0),
      currentDate: "",
    };
  },
  methods: {
    clickChecked(itemIndex: number, elementIndex: number) {
      if (this.items[itemIndex].elements[elementIndex].checked == 1) {
        this.items[itemIndex].elements[elementIndex].checked = 0;
        this.items[itemIndex].elements[elementIndex].rejected = 0;
        return;
      }
      this.items[itemIndex].elements[elementIndex].checked = 1;
    },
    clickRejected(itemIndex: number, elementIndex: number) {
      if (this.items[itemIndex].elements[elementIndex].rejected == 0) {
        this.items[itemIndex].elements[elementIndex].rejected = 1;
        this.items[itemIndex].elements[elementIndex].checked = 1;
        this.items[itemIndex].hasReject = true;
        this.items[itemIndex].rejected.push(
          this.items[itemIndex].elements[elementIndex]
        );
        return;
      }
      this.items[itemIndex].elements[elementIndex].rejected = 0;
      this.items[itemIndex]["rejected"].splice(
        this.findElementIndex(
          this.items[itemIndex]["rejected"],
          this.items[itemIndex].elements[elementIndex].name
        ),
        1
      );
      for (let i = 0; i < this.items[itemIndex]["elements"].length; i++) {
        if (this.items[itemIndex]["elements"][i].rejected == 1) {
          return;
        }
      }
      this.items[itemIndex].hasReject = false;
    },
    selectChange(type: string) {
      console.log(this.selected);
    },
    findElementIndex(arr: any, element: any): number {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === element) {
          return i;
        }
      }
      return -1;
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
    async init() {
      this.aircraftRegNos = await services.getAircraftRegNo();
      this.aircraftTypes = await services.getAircraftType();
      this.inspectedBys = await services.getInspectedBy();
      this.checklists = await services.getChecklist();
      this.engineTypes = await services.getEngineType();
      this.customers = await services.getCustomer();
      this.locations = await services.getLocation();
      this.currentDate = this.formatDate();
      console.log(this.engineTypes);
    },
  },
  ionViewWillEnter() {
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

ion-col {
  border: 1px solid #eceeef;
  border-color: black;
}
.hardcodecol {
  background-color: #eef734;
}
ion-select {
  height: 2vh;
}
ion-text {
  font-size: 1.6vw;
}
ion-select {
  font-size: 1.6vw;
}
.sectionA_subcol {
  width: 90vw;
}
.col-in-col-1 {
  border-width: 0px 1px 1px 0px;
  padding-top: 5px;
}
.col-in-col-2 {
  border-width: 0px 1px 1px 0px;
  padding-top: 5px;
  align-items: center;
  justify-content: center;
}
.col-in-col-3 {
  border-width: 0px 0px 1px 0px;
  padding-top: 5px;
}
.col-in-col-4 {
  border-width: 0px 0px 1px 2px;
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