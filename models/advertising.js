const getDb = require("../util/db").getDb;
const { ObjectId } = require("mongodb");

class Advertising {
    constructor(firma, type, image) {
        this.firma = firma;
        this.type = type;
        this.image = image;
        this.createdDate = new Date();
    }

    static getAdvertising() {
        const db = getDb();

        return db.collection("advertisings").find({}).toArray().then(advertisings => {
            return advertisings.map(advertising => {
                return {
                    _id: advertising._id,
                    firma: advertising.firma,
                    type: advertising.type,
                    image: advertising.image,
                    date: advertising.createdDate
                }
            })
        });
    };

    static getAdvertisingDetail(id) {
        const db = getDb();
        return db.collection("advertisings").findOne({ _id: ObjectId(id) }).then(advertising => advertising);
    };

    createAdvertising() {
        const db = getDb();
        return db.collection("advertisings").insertOne(this);
    }
};

module.exports = Advertising;
