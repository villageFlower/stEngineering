<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button menu="custom"></ion-menu-button>
        </ion-buttons>

        <ion-title
          style="
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            color: black;
            padding-top: 20px;
            padding-bottom: 20px;
          "
          >Your Saved Checklist</ion-title
        >
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card v-for="(checklist, index) in checklists" :key="index">
        <ion-card-header  @click="router.push('/savedDetail/'+checklist.id)">
          <ion-card-subtitle>{{ checklist.id }}</ion-card-subtitle>
          <ion-card-title>Created at : {{ checklist.sectionA.date }}</ion-card-title>
          <ion-card-content style="color:black;font-size:16px;">
            <div v-for="(key, key_index) in Object.keys(checklist['sectionA'])" :key="key_index">
            <ion-text>{{key}} : {{ checklist.sectionA[key] }}</ion-text>
            </div>
          </ion-card-content>
        </ion-card-header>
      </ion-card>
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
  IonMenuButton,
  loadingController,
  IonButtons,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "SavedChecklist",
  components: {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonMenuButton,
    IonButtons,
  },
  setup() {
      const router = useRouter();
      return { router };
  },
  data() {
    return {
      loading: null as any,
      checklists: new Array(0),
    };
  },
  methods: {
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
    getAll() {
      const values = [],
        keys = Object.keys(localStorage);
      let i = keys.length;

      while (i--) {
        if (keys[i].includes("savedId")) {
          const data = localStorage.getItem(keys[i]);
          const dataObj = data !== null ? JSON.parse(data) : Object;
          dataObj.id = keys[i];
          values.push(dataObj);
        }
      }

      return values;
    },
    async init() {
      await this.presentLoading("Loading...");
      this.checklists = this.getAll();
      this.hideLoading();
    },
  },
  ionViewWillEnter() {
    this.init();
  },
});
</script>

<style scoped>
</style>