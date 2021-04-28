<template>
  <ion-app>
  <ion-menu side="start" menuId="custom" contentId="main" class="my-custom-menu">
    <ion-header>
      <ion-toolbar>
            <ion-title style="text-align: center; font-weight:bold; font-size:1.6vw;">
      STEDAS
    </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
          <ion-item>
            <ion-button expand="full"  fill="clear">e-QSI</ion-button>
          </ion-item>
          <ion-item>
            <ion-button expand="full"  fill="clear">Report</ion-button>
          </ion-item>
          <ion-item>
            <ion-button expand="full"  fill="clear">Saved checklist</ion-button>
          </ion-item>
      </ion-list>
    </ion-content>
  </ion-menu>
  <ion-router-outlet id="main"></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet, IonMenu } from '@ionic/vue';
import { defineComponent } from 'vue';


export default defineComponent({
  name: 'App',
  components: {
    IonApp,
    IonRouterOutlet,
    IonMenu,
  }
});
</script>
<style>
ion-button{
  color:black;font-size:1.3vw
}
</style>