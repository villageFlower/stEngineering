import { db } from "../main";

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
}


export {
    services
}