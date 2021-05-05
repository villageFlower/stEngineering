import { db } from "../main";
import { toastController } from '@ionic/vue';

const getDocValues = async function (collectionName: string, docName: string) {
    console.log("start")
    let result: any;
    return db.collection(collectionName).doc(docName).get()
        .then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                result = doc.data();
                console.log(result);
                return result;
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                result = "No such document!";
                return result;
            }
        }).catch(function (err) {
            console.log('Error getting documents', err);
        });
}

const services = {
    async getAircraftRegNo() {
        const temp = await db.collection("aircraft_reg_no").get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async getAircraftType() {
        const temp = await db.collection("aircraft_type").get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async getInspectedBy() {
        const temp = await db.collection("inspected_by").get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async getChecklist() {
        const temp = await db.collection("checklist").get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async getEngineType() {
        const temp = await db.collection("engine_type").get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async getCustomer() {
        const temp = await db.collection("customer_program").get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async getLocation() {
        const temp = await db.collection("location").get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async getCheckItems(idArr: any) {
        const tempArr: any[] = []
        const alphArr = [" a", " b", " c", " d", " e", " f", " g", " h", " i", " j", " k", " l", " m", " n", " o", " p", " q", " r", " s", " t", " u", " v", " w", " x", " y", " z"]
        for (let i = 0; i < idArr.length; i++) {
            const temp = await getDocValues("check_item", idArr[i])
            for (let a = 0; a < temp.check_elements.length; a++) {
                temp.check_elements[a].checked = 0
                temp.check_elements[a].rejected = 0
                temp.check_elements[a].name = alphArr[a] + ") " +  temp.check_elements[a].name
            }
            temp.hasReject = false,
            temp.rejected = new Array(0)
            temp.finalRejected = new Array(0)
            tempArr.push(temp)
        }
        return tempArr
    },
    async openToast(msg: string) {
        const toast = await toastController
          .create({
            message: msg,
            duration: 2000,
            position:"middle"
          })
        return toast.present();
      },
}


export {
    services
}