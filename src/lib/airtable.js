// import Airtable from "airtable";

// new Airtable.configure({
//     endpointUrl: "https://api.airtable.com",
//     apiKey: process.env.AIRTABLE_API_KEY,
// });
// console.log({ key: process.env.AIRTABLE_BASE_KEY });
// console.log({ key: process.env.AIRTABLE_API_KEY });
// const base = Airtable.base(process.env.AIRTABLE_BASE_KEY);
const Airtable = require("airtable");
const base = new Airtable({
    apiKey: process.env.AIRTABLE_API_KEY,
    endpointUrl: "https://api.airtable.com",
}).base(process.env.AIRTABLE_BASE_KEY);

const table = base("coffee-stores");

const minifyRecord = (record) => {
    return {
        recordId: record.id,
        ...record.fields,
    };
};
const getMinifiedRecords = (records) =>
    records.map((record) => minifyRecord(record));

const findRecordByFilter = async (id) => {
    try {
        const findCoffeeStoreRecords = await table
            .select({
                filterByFormula: `id="${id}"`,
            })
            .firstPage();
        return getMinifiedRecords(findCoffeeStoreRecords);
    } catch (err) {
        console.error("Couldn't filter by id");
    }
};

// const validateRecord = async (id) => {
//     const record = await findRecordByFilter(id);
//     if (record.length !== 0) return true;
//     else return false;
// };

export { table, getMinifiedRecords, findRecordByFilter };
