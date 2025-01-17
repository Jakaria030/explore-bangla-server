const { getCollections } = require("../dbConfig/dbConfig");

exports.postApplication = async (req, res) => {
    const {applicationCollections} = getCollections();

    const application = req.body;
    const result = await applicationCollections.insertOne(application);

    res.send(result);
};