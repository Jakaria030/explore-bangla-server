const { getCollections } = require("../dbConfig/dbConfig")

exports.postPackages = async (req, res) => {
    const {packageCollections} = getCollections();

    const newPackage = req.body;
    const result = await packageCollections.insertOne(newPackage);

    res.send(result);
}