import { db, storageRef } from "../main";
import { alertController, modalController, toastController } from '@ionic/vue';
import Modal from '../components/modal.vue'
import { Plugins, Filesystem, FilesystemDirectory, FilesystemEncoding, Capacitor } from '@capacitor/core';




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


const getSQLText = function (finalData: any) {
    const sectionA = finalData.sectionA
    const checklistData = finalData.checklistData
    const dateStr = finalData.sectionA["date"]
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
    const submitted = `USE STEDAS;INSERT INTO submitted (aircraftRegNo, aircraftType, checklist,customerProgram, date, engineType, inspectedBy,location)VALUES ('${sectionA.aircraftRegNo}','${sectionA.aircraftType}','${sectionA.checklist}','${sectionA.customerProgram}','${dateStr}','${sectionA.engineType}','${sectionA.inspectedBy}','${sectionA.location}');SET @sub_id=LAST_INSERT_ID();`
    let sectionB = ``
    for (let i = 0; i < checklistData['check_items'].length; i++) {
        let checks = 0
        let rejects = 0
        for (let a = 0; a < checklistData['check_items'][i]['check_elements'].length; a++) {
            if (checklistData['check_items'][i]['check_elements'][a].check == 1) {
                checks += 1
            }
            if (checklistData['check_items'][i]['check_elements'][a].reject == 1) {
                rejects += 1
            }
        }
        sectionB += `INSERT INTO check_item (no_of_checks, no_of_rejects, name,submitted_id)VALUES (${checks},${rejects},'${checklistData['check_items'][i].name}',@sub_id);SET @item_id=LAST_INSERT_ID();`
        for (let a = 0; a < checklistData['check_items'][i]['check_elements'].length; a++) {
            const element = checklistData['check_items'][i]['check_elements'][a]

            if (element.reject == 1) {
                sectionB += `INSERT INTO rejections (check_element_name, sub_category, most_probable_cause,trade,staff_respnsible,remarks,pic)VALUES ('${element.name}','${element.rejection.sub_category}','${element.rejection.most_probable_cause}','${element.rejection.staff_responsible}','${element.rejection.trade}','${element.rejection.remark}','${element.rejection.photo}');SET @reject_id=LAST_INSERT_ID();INSERT INTO check_element (name, rejected, checked, rejection_id, check_item_id)VALUES ('${element.name}',${element.reject},${element.check},@reject_id,@item_id);`
            } else {
                sectionB += `INSERT INTO check_element (name, rejected, checked, rejection_id, check_item_id)VALUES ('${element.name}',${element.reject},${element.check},null,@item_id);`
            }

        }
    }
    return (submitted + sectionB);
}




const showReminder = async function (msg: string) {
    const toast = await toastController
        .create({
            message: msg,
            duration: 2000,
            position: "middle"
        })
    return toast.present();
}

const services = {
    async openToast(msg: string) {
        const toast = await toastController
            .create({
                message: msg,
                duration: 2000,
                position: "middle"
            })
        return toast.present();
    },
    async submitChecklist(data: any) {
        const res = await db.collection("submitted").add(data)
        if (res) { return res.id }
        return false
    },
    async openModal() {
        const modal = await modalController
            .create({
                component: Modal,
                cssClass: 'my-custom-class',
                componentProps: {
                    title: 'New Title'
                },
            })
        return modal.present();
    },
    async presentAlertConfirm(header: any, msg: any, buttons: any) {
        const alert = await alertController
            .create({
                cssClass: 'my-custom-class',
                header: header,
                message: msg,
                buttons: buttons,
            });
        return alert.present();
    },
    async getReportData(checklist: any, data: any) {
        const temp = await db.collection("submitted")
            .where("date", ">=", data.startDate)
            .where("date", "<=", data.endDate)
            .where("inspectedBy", "==", data.inspectedBy)
            .where("customerProgram", "==", data.customerProgram)
            .where("checklist", "==", checklist)
            .get();
        return temp.docs.map(doc => {
            const data = doc.data()
            data.id = doc.id
            return data
        });
    },
    async writeFile(data: any){
        const text = getSQLText(data)
        const res = await Filesystem.writeFile({
            data: text,
            path:"Downloadtest.sql",
            encoding:FilesystemEncoding.UTF8,
            directory:FilesystemDirectory.External
        })
        const res2 = await 
        showReminder(res2)
            
        return res
    },
    getSQLText(finalData: any){
        const sectionA = finalData.sectionA
        const checklistData = finalData.checklistData
        const dateStr = finalData.sectionA["date"]
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        const submitted = `USE STEDAS;INSERT INTO submitted (aircraftRegNo, aircraftType, checklist,customerProgram, date, engineType, inspectedBy,location)VALUES ('${sectionA.aircraftRegNo}','${sectionA.aircraftType}','${sectionA.checklist}','${sectionA.customerProgram}','${dateStr}','${sectionA.engineType}','${sectionA.inspectedBy}','${sectionA.location}');SET @sub_id=LAST_INSERT_ID();`
        let sectionB = ``
        for (let i = 0; i < checklistData['check_items'].length; i++) {
            let checks = 0
            let rejects = 0
            for (let a = 0; a < checklistData['check_items'][i]['check_elements'].length; a++) {
                if (checklistData['check_items'][i]['check_elements'][a].check == 1) {
                    checks += 1
                }
                if (checklistData['check_items'][i]['check_elements'][a].reject == 1) {
                    rejects += 1
                }
            }
            sectionB += `INSERT INTO check_item (no_of_checks, no_of_rejects, name,submitted_id)VALUES (${checks},${rejects},'${checklistData['check_items'][i].name}',@sub_id);SET @item_id=LAST_INSERT_ID();`
            for (let a = 0; a < checklistData['check_items'][i]['check_elements'].length; a++) {
                const element = checklistData['check_items'][i]['check_elements'][a]
    
                if (element.reject == 1) {
                    sectionB += `INSERT INTO rejections (check_element_name, sub_category, most_probable_cause,trade,staff_respnsible,remarks,pic)VALUES ('${element.name}','${element.rejection.sub_category}','${element.rejection.most_probable_cause}','${element.rejection.staff_responsible}','${element.rejection.trade}','${element.rejection.remark}','${element.rejection.photo}');SET @reject_id=LAST_INSERT_ID();INSERT INTO check_element (name, rejected, checked, rejection_id, check_item_id)VALUES ('${element.name}',${element.reject},${element.check},@reject_id,@item_id);`
                } else {
                    sectionB += `INSERT INTO check_element (name, rejected, checked, rejection_id, check_item_id)VALUES ('${element.name}',${element.reject},${element.check},null,@item_id);`
                }
    
            }
        }
        return (submitted + sectionB);
    }
}





export {
        services
    }
