import {
    table,
    findRecordByFilter,
    getMinifiedRecords,
} from "../../lib/airtable";

const favouriteCoffeeStoreById = async (req, res) => {
    if (req.method === "PUT") {
        const { id } = req.body;
        try {
            const records = await findRecordByFilter(id);
            if (records.length !== 0) {
                const record = records[0];
                const calculateVoting = parseInt(record.voting) + 1;
                const updateRecord = await table.update([
                    {
                        id: record.recordId,
                        fields: {
                            voting: calculateVoting,
                        },
                    },
                ]);
                if (updateRecord) {
                    const minifiedRecords = getMinifiedRecords(updateRecord);
                    res.json(minifiedRecords);
                }
            } else {
                res.json({ message: "coffee store could be not found" });
            }
        } catch (err) {
            console.error("Something went wrong", err);
            res.json({ message: "Something went wrong", err });
        }
    }
};

export default favouriteCoffeeStoreById;
