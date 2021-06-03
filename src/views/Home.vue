<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="custom"></ion-menu-button>Menu
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="startNew">Start New</ion-button>
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

    <ion-content :fullscreen="true" ref="content">
      <ion-grid class="ion-background">
        <ion-row>
          <ion-col col-12 class="section-title">
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
            <ion-select
              interface="action-sheet"
              :value="finalDataSectionA.aircraftRegNo"
              v-model="finalDataSectionA.aircraftRegNo"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(no, index) in aircraftRegNos"
                :key="index"
                :value="no.name"
                >{{ no.name }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Engine Type :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select
              interface="action-sheet"
              :value="finalDataSectionA.engineType"
              v-model="finalDataSectionA.engineType"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(type, index) in engineTypes"
                :key="index"
                :value="type.name"
                >{{ type.name }}</ion-select-option
              >
            </ion-select>
          </ion-col>
        </ion-row>
        <ion-row class="sectionA_subcol">
          <ion-col class="hardcodecol">
            <ion-text>Aircraft Type :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select
              interface="action-sheet"
              :value="finalDataSectionA.aircraftType"
              v-model="finalDataSectionA.aircraftType"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(type, index) in aircraftTypes"
                :key="index"
                :value="type.name"
                >{{ type.name }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Customer/Program :</ion-text>
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
                :value="customer.name"
                >{{ customer.name }}</ion-select-option
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
                :value="staff.name"
                >{{ staff.name }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Location :</ion-text>
          </ion-col>
          <ion-col>
            <ion-select
              interface="action-sheet"
              :value="finalDataSectionA.location"
              v-model="finalDataSectionA.location"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(location, index) in locations"
                :key="index"
                :value="location.name"
                >{{ location.name }}</ion-select-option
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
              interface="action-sheet"
              :value="finalDataSectionA.checklist"
              v-model="finalDataSectionA.checklist"
              @ionChange="selectChange()"
            >
              <ion-select-option value="">Please Select</ion-select-option>
              <ion-select-option
                v-for="(checklist, index) in checklists"
                :key="index"
                :value="checklist.name"
                >{{ checklist.name }}</ion-select-option
              >
            </ion-select>
          </ion-col>
          <ion-col class="hardcodecol">
            <ion-text>Date of Inspection :</ion-text>
          </ion-col>
          <ion-col>
            <ion-text style="padding-left: 16px; font-size: 1.2vw">{{
              finalDataSectionA.date
            }}</ion-text>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid
        style="
          padding-top: 30px;
          --ion-grid-padding: 0px;
          --ion-grid-column-padding: 0px;
        "
        v-if="showSectionB"
      >
        <ion-row>
          <ion-col col-12 class="section-title">
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
            <ion-text>Qty Rejected</ion-text>
          </ion-col>
        </ion-row>
        <ion-row
          v-for="(item, item_index) in checklists[currentChecklist].check_items"
          :key="item_index"
        >
          <ion-col size="1" style="text-align: center">
            <ion-text>{{ item_index + 1 }}</ion-text>
          </ion-col>
          <ion-col size="4">
            <ion-text>{{ item.name }}</ion-text>
            <ion-button
              style="
                height: 50%;
                width: 20%;
                float: right;
                padding: 0px;
                font-size: 5px;
              "
              expand="full"
              color="success"
              @click="clickHideAll(item_index)"
              >Hide Reject
            </ion-button>

            <ion-button
              style="
                height: 50%;
                width: 20%;
                float: right;
                padding: 0px;
                font-size: 5px;
              "
              expand="full"
              color="success"
              @click="clickShowAll(item_index)"
              >Show Reject
            </ion-button>
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
                    :checked="element.check == 1"
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
                    :checked="element.reject == 1"
                  ></ion-checkbox>
                </ion-col>
                <ion-col
                  size="1"
                  style="text-align: center"
                  class="col-in-col-4"
                >
                  <ion-text>{{ element.check }}</ion-text>
                </ion-col>
                <ion-col
                  size="1"
                  style="text-align: center"
                  class="col-in-col-4"
                >
                  <ion-text>{{ element.reject }}</ion-text>
                </ion-col>
              </ion-row>
            </ion-grid>
          </ion-col>

          <div style="width: 100%" v-if="item.showRejection">
            <div
              v-for="(reject, reject_index) in item.check_elements"
              :key="reject_index"
            >
              <ion-row v-if="reject.reject == 1">
                <ion-col size="10" class="reject-box">
                  <ion-grid
                    style="
                      --ion-grid-columns: 10;
                      --ion-grid-column-padding: 1px;
                    "
                    class="ion-background2"
                  >
                    <ion-row class="reject-title">
                      <ion-col size="4" style="text-align: center">
                        <ion-text style="color: white">Rejected</ion-text>
                      </ion-col>
                      <ion-col size="2">
                        <ion-text style="color: white">Sub-category</ion-text>
                      </ion-col>
                      <ion-col size="4">
                        <ion-text style="color: white"
                          >Most Probable Cause</ion-text
                        >
                      </ion-col>
                    </ion-row>

                    <ion-row>
                      <ion-col size="4">
                        <ion-text>{{ reject.name }}</ion-text>
                      </ion-col>
                      <ion-col size="2">
                        <ion-select
                          interface="action-sheet"
                          :value="reject.rejection.sub_category"
                          v-model="reject.rejection.sub_category"
                        >
                          <ion-select-option value=""
                            >Please Select
                          </ion-select-option>
                          <ion-select-option
                            v-for="(subCate, index) in reject.sub_category"
                            :key="index"
                            :value="subCate"
                          >
                            {{ subCate }}
                          </ion-select-option>
                        </ion-select>
                      </ion-col>
                      <ion-col size="4">
                        <ion-select
                          interface="action-sheet"
                          :value="reject.rejection.most_probable_cause"
                          v-model="reject.rejection.most_probable_cause"
                        >
                          <ion-select-option value=""
                            >Please Select</ion-select-option
                          >
                          <ion-select-option
                            v-for="(cause, index) in reject.most_probable_cause"
                            :key="index"
                            :value="cause"
                          >
                            {{ cause }}
                          </ion-select-option>
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
                            <ion-col
                              size="5"
                              style="border-width: 0px 1px 1px 0px"
                            >
                              <ion-text style="padding-left: 1px"
                                >Staff Responsible</ion-text
                              >
                            </ion-col>
                            <ion-col
                              size="4"
                              style="border-width: 0px 0px 1px 1px"
                            >
                              <ion-input
                                style="padding-left: 1px"
                                :value="reject.rejection.staff_responsible"
                                v-model="reject.rejection.staff_responsible"
                              ></ion-input>
                            </ion-col>
                          </ion-row>
                          <ion-row style="border: 0px; height: 6vh">
                            <ion-col
                              size="5"
                              style="border-width: 1px 1px 0px 0px"
                            >
                              <ion-text style="padding-left: 1px"
                                >Trade</ion-text
                              >
                            </ion-col>
                            <ion-col
                              size="4"
                              style="border-width: 1px 0px 0px 1px"
                            >
                              <ion-select
                                interface="action-sheet"
                                :value="reject.rejection.trade"
                                v-model="reject.rejection.trade"
                                style="padding-left: 1px"
                              >
                                <ion-select-option value=""
                                  >Please Select</ion-select-option
                                >
                                <ion-select-option
                                  v-for="(trad, index) in reject.trade"
                                  :key="index"
                                  :value="trad"
                                >
                                  {{ trad }}
                                </ion-select-option>
                              </ion-select>
                            </ion-col>
                          </ion-row>
                        </ion-grid>
                      </ion-col>
                      <ion-col size="6" style="--ion-grid-column-padding: 0px">
                        <ion-grid
                          style="
                            --ion-grid-columns: 12;
                            --ion-grid-padding: 0px;
                          "
                        >
                          <ion-row>
                            <ion-text>Remarks:</ion-text>
                          </ion-row>
                          <ion-row>
                            <ion-col style="border: 0px" size="10"
                              ><ion-input
                                :value="reject.rejection.remark"
                                v-model="reject.rejection.remark"
                              ></ion-input
                            ></ion-col>
                            <ion-col style="border: 0px" size="2">
                              <ion-button
                                style="
                                  height: 30px;
                                  width: 90%;
                                  float: right;
                                  padding: 0px;
                                  font-size: 1vw;
                                "
                                expand="full"
                                color="success"
                                @click="takePhoto(item_index, reject_index)"
                              >
                                take photo
                              </ion-button>
                            </ion-col>
                          </ion-row>
                        </ion-grid>
                      </ion-col>
                    </ion-row>
                  </ion-grid>
                </ion-col>
                <ion-col class="reject-box" style="padding-top: 10px">
                  <ion-img
                    v-if="reject.rejection.photo"
                    :src="reject.rejection.photo"
                  ></ion-img>
                </ion-col>
              </ion-row>
            </div>
          </div>
        </ion-row>

        <ion-row style="padding-top: 3vh">
          <ion-col offset="10" size="1" class="button-col">
            <ion-button expand="full" color="primary" @click="clickSave"
              >Save</ion-button
            >
          </ion-col>
          <ion-col size="1" class="button-col">
            <ion-button expand="full" color="primary" @click="clickSubmit">
              Submit</ion-button
            >
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
  IonImg,
  IonIcon,
  IonInput,
} from "@ionic/vue";
import { defineComponent, ref } from "vue";
import { services } from "../scripts/service";
import { deepCopy } from "../scripts/deepCopy";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { camera, trash, close, images, square, triangle } from "ionicons/icons";
import { usePhotoGallery, Photo } from "@/composables/usePhotoGallery";
import {
  Plugins,
  CameraResultType,
  CameraSource,
} from "@capacitor/core";
import { isPlatform } from "@ionic/vue";
import { storageRef } from "@/main";



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
    IonInput,
    IonButtons,
    IonItemDivider,
    IonButton,
  },
  setup() {
    const options: any = {
      cssClass: "my-custom-interface",
    };
    const router = useRouter();
    const { Camera } = Plugins;
    const { photos } = usePhotoGallery();

    return {
      options,
      photos,
      camera,
      trash,
      close,
      router,
      Camera
    };
  },
  data() {
    return {
      savedId: null as any,
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
      currentChecklist: null as any,
      finalDataSectionA: {
        aircraftRegNo: "",
        engineType: "",
        aircraftType: "",
        customerProgram: "",
        location: "",
        checklist: "",
        date: "",
      },
      alertButtons: [
        {
          text: "OK",
          role: "cancel",
          cssClass: "primary",
          handler: () => {
            this.reset();
            console.log("quit");
          },
        },
      ],
    };
  },
  methods: {
    reset() {
      this.showSectionB = false;
      this.checkItems = [];
      this.finalDataSectionA = {
        aircraftRegNo: "",
        engineType: "",
        aircraftType: "",
        customerProgram: "",
        location: "",
        checklist: "",
        date: "",
      };
    },
    async takePhoto(itemIndex: any, rejectIndex: any) {
      const image = await this.Camera.getPhoto({
        source: CameraSource.Camera,
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.Uri,
      });
      const response = await fetch(image.webPath!);
      const blob = await response.blob();
      this.checklists[this.currentChecklist].check_items[
        itemIndex
      ].check_elements[
        rejectIndex
      ].rejection.photo = (await this.convertBlobToBase64(blob)) as string;
    },
    convertBlobToBase64(blob: Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          const base64data = reader.result;
          resolve(base64data);
        };
      });
    },
    clickSave() {
      const saveData = {
        sectionA: this.finalDataSectionA,
        selectedChecklist: this.currentChecklist,
        checklistData: this.checklists[this.currentChecklist],
        showSectionB: this.showSectionB,
      };
      if (this.savedId) {
        localStorage.setItem(this.savedId, JSON.stringify(saveData));
      } else {
        const key = this.generateKey(15);
        localStorage.setItem(key, JSON.stringify(saveData));
        this.savedId = key;
      }
      services.openToast("checklist saved");
      console.log(saveData);

      return;
    },
    async clickSubmit() {
      const key = this.savedId ? this.savedId : this.generateKey(15);
      this.finalDataSectionA.date = this.currentDate;
      const saveData = {
        sectionA: this.finalDataSectionA,
        checklistData: this.checklists[this.currentChecklist],
      };
      console.log(saveData);
      const res = await services.writeFile(saveData)
      this.startNew();
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
    startNew() {
      this.finalDataSectionA = {
        aircraftRegNo: "",
        engineType: "",
        aircraftType: "",
        customerProgram: "",
        location: "",
        checklist: "",
        date: "",
      };
      this.showSectionB = false;
      this.init();
    },
    clickChecked(itemIndex: number, elementIndex: number) {
      if (
        this.checklists[this.currentChecklist].check_items[itemIndex]
          .check_elements[elementIndex].reject == 1
      ) {
        this.checklists[this.currentChecklist].check_items[
          itemIndex
        ].check_elements[elementIndex].check = 0;
        this.checklists[this.currentChecklist].check_items[
          itemIndex
        ].check_elements[elementIndex].reject = 0;

        return;
      }
      this.checklists[this.currentChecklist].check_items[
        itemIndex
      ].check_elements[elementIndex].check = 1;
    },
    clickRejected(itemIndex: number, elementIndex: number) {
      if (
        this.checklists[this.currentChecklist].check_items[itemIndex]
          .check_elements[elementIndex].reject == 0
      ) {
        this.checklists[this.currentChecklist].check_items[
          itemIndex
        ].check_elements[elementIndex].reject = 1;
        this.checklists[this.currentChecklist].check_items[
          itemIndex
        ].check_elements[elementIndex].check = 1;
        return;
      }
      this.checklists[this.currentChecklist].check_items[
        itemIndex
      ].check_elements[elementIndex].reject = 0;
    },
    //selecting checklist change
    async selectChange() {
      const checklistId = deepCopy(this.finalDataSectionA.checklist);
      if (checklistId == "") {
        this.showSectionB == false;
        return;
      }
      this.currentChecklist = this.returnChecklistIndex(
        this.finalDataSectionA.checklist
      );
      this.showSectionB = true;
    },
    returnChecklistIndex(name) {
      for (let i = 0; i < this.checklists.length; i++) {
        if (this.checklists[i].name == name) {
          return i;
        }
      }
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
    async init() {
      this.initing = true;
      this.aircraftRegNos = require("../static/aircraft_reg.json");
      this.aircraftTypes = require("../static/aircraft_type.json");
      this.inspectedBys = require("../static/inspected_by.json");
      const checklists = await require("../static/checklist.json");
      this.checklists = deepCopy(checklists);
      this.engineTypes = require("../static/engine_type.json");
      this.customers = require("../static/customer_program.json");
      this.locations = require("../static/location.json");
      this.finalDataSectionA.date = this.formatDate();
      this.currentDate = new Date(this.finalDataSectionA.date);
    },
    clickHideAll(itemIndex) {
      this.checklists[this.currentChecklist].check_items[
        itemIndex
      ].showRejection = false;
    },

    clickShowAll(itemIndex) {
      this.checklists[this.currentChecklist].check_items[
        itemIndex
      ].showRejection = true;
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

ion-item-divider {
  --background: black;
  margin-top: 0px;
  min-height: 0.5px !important;
}
ion-content {
  --ion-background-color: #f1f0f0ea;
}
ion-img {
  height: 15vh;
  width: 100%;
}

ion-col {
  border: 1px solid #eceeef;
  border-color: rgba(88, 88, 88, 0.363);
}
.hardcodecol {
  background-color: #5c90ff5e;
}
.section-title {
  background-color: #2600ff91;
}
.reject-box {
  border-width: 0px 0px 0px 0px !important;
}
.reject-title {
  background-color: #fc4c4fda;
}
.reject-col {
  border-width: 1px 1px 1px 1px !important;
  border-color: rgb(88, 88, 88);
}
.reject-title-col {
  border-width: 1px 1px 1px 1px !important;
  border-color: rgb(88, 88, 88);
  background-color: #fc4c4f93;
}
ion-text {
  font-size: 1.3vw;
}
ion-select {
  height: 20px;
  padding-top: 11px;
  font-size: 1.3vw;
}
.select-pop {
  width: 800px;
}
.sectionA_subcol {
  width: 90vw;
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
  font-size: 1.3vw;
  color: black;
}
.button-col {
  border-width: 0px 0px 0px 0px;
}
.ion-background {
  background-color: #59a1ff52;
  border-radius: 10px;
  height: 210px;
  margin: 8px;
  width: 92vw !important;
  padding: 0;
}

.ion-background2 {
  background-color: #ff3a3d50;
  border-radius: 10px;
  margin: 8px;
}
</style>