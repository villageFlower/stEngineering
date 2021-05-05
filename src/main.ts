import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';




// Above the createApp() line
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

/* Theme variables */
import './theme/variables.css';
import firebase from 'firebase'






const firebaseConfig = {  
  apiKey: "AIzaSyChOAPVT9ArcaKmH0vwU8XnCV54VzEHHNQ",
  authDomain: "stedas-b5694.firebaseapp.com",
  projectId: "stedas-b5694",
  storageBucket: "stedas-b5694.appspot.com",
  messagingSenderId: "512883664793",
  appId: "1:512883664793:web:d3cff4c6ae5101b8aad508",
  measurementId: "G-C0VCW0T4TF"
};
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  

  
router.isReady().then(() => {
  app.mount('#app');
});