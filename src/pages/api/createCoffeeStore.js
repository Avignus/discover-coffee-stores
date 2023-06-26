import {
    findRecordByFilter,
    getMinifiedRecords,
    table,
} from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
    if (req.method === "POST") {
        const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

        try {
            if (id) {
                const records = await findRecordByFilter(id);
                if (records.length !== 0) {
                    res.json(records);
                } else {
                    if (name) {
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    address,
                                    neighbourhood,
                                    voting,
                                    imgUrl,
                                },
                            },
                        ]);
                        const createRecordsFormatted =
                            getMinifiedRecords(createRecords);
                        res.json({
                            message: "create a record",
                            createRecordsFormatted,
                        });
                    } else {
                        res.status(400);
                        res.json({ message: "name is missing" });
                    }
                }
            } else {
                res.status(400);
                res.json({ message: "id is missing" });
            }
        } catch (err) {
            console.error("Error creating or finding store", err);
            res.status(500);
            res.json({ message: "Error creating or finding store", err });
        }
    } else {
        res.json({ message: "method is get" });
    }
};
// const createCoffeeStore = async (req, res) => {
//     if (req.method === "POST") {
//         console.log("test");
//         const { id, name, neighbourhood, address, imgUrl, voting } = req.body;

//         try {
//             if (id) {
//                 const records = await findRecordByFilter(id);
//                 if (records.length !== 0) {
//                     res.json(records);
//                 } else {
//                     if (name) {
//                         const createRecords = await table.create([
//                             {
//                                 fields: {
//                                     id,
//                                     name,
//                                     address,
//                                     neighbourhood,
//                                     voting,
//                                     imgUrl,
//                                 },
//                             },
//                         ]);
//                         const createRecordsFormatted =
//                             getMinifiedRecords(createRecords);
//                         res.json({
//                             message: "create a record",
//                             createRecordsFormatted,
//                         });
//                     } else {
//                         res.status(400);
//                         res.json({ message: "name is missing" });
//                     }
//                 }
//             } else {
//                 res.status(400);
//                 res.json({ message: "id is missing" });
//             }
//         } catch (err) {
//             console.error("Error creating or finding store", err);
//             res.status(500);
//             res.json({ message: "Error creating or finding store", err });
//         }
//     } else {
//         res.json({ message: "method is get" });
//     }
// };

export default createCoffeeStore;
