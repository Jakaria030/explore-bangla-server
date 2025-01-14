const { getCollections } = require("../dbConfig/dbConfig");

exports.postUser = async (req, res) => {
    const {userCollections} = getCollections();

    const newUser = req.body;
    const result = await userCollections.insertOne(newUser);

    res.send(result);
};