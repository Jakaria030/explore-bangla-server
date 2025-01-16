const { ObjectId } = require("mongodb");
const { getCollections } = require("../dbConfig/dbConfig")

exports.postPackages = async (req, res) => {
    const { packageCollections } = getCollections();

    const newPackage = req.body;
    const result = await packageCollections.insertOne(newPackage);

    res.send(result);
};

exports.randomPackages = async (req, res) => {
    const { packageCollections } = getCollections();

    const random = {
        $sample : {
            size: 3
        }
    };

    const projection = {
        $project: {
            _id: 1,
            placeName: 1,
            image: { $arrayElemAt: ["$images", 0] },
            tourType: 1,
            tripTitle: 1,
            duration: 1,
            members: 1,
            price: 1
        }
    };

    const result = await packageCollections.aggregate([random, projection]).toArray();

    res.send(result);
};

exports.singlePackage = async (req, res) => {
    const {packageCollections} = getCollections();

    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await packageCollections.findOne(query);

    res.send(result);
};

exports.getAllPackages = async (req, res) => {
    const {packageCollections} = getCollections();

    const projection = {
        $project: {
            _id: 1,
            placeName: 1,
            image: { $arrayElemAt: ["$images", 0] },
            tourType: 1,
            tripTitle: 1,
            duration: 1,
            members: 1,
            price: 1,
        }
    };

    const result = await packageCollections.aggregate([projection]).toArray();

    res.send(result);
};