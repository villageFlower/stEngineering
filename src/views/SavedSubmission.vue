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
          >Your Saved Checklist</ion-title
        >
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-card v-for="(submission, index) in submissions" :key="index" >
        <ion-card-header >
          <ion-card-subtitle>{{ submission.ref }}</ion-card-subtitle>
          <ion-card-title>Created at : {{ submission.date }}</ion-card-title>
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
  name: "SavedSubmission",
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
      submissions: new Array(0),
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
    async init() {
      await this.presentLoading("Loading...");
      const data =  localStorage.getItem("submitted")
      this.submissions = data ? JSON.parse(data) : [];
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