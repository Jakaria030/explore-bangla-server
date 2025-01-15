const { getCollections } = require("../dbConfig/dbConfig");
const jwt = require('jsonwebtoken');

exports.postJWT = async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
    
    res.send({ token });
};

exports.postUser = async (req, res) => {
    const { userCollections } = getCollections();

    const newUser = req.body;
    const result = await userCollections.insertOne(newUser);

    res.send(result);
};

exports.isExistUser = async (req, res) => {
    const { userCollections } = getCollections();

    const email = req.query.email;
    const query = { email: email };
    const result = await userCollections.countDocuments(query);

    res.send({ count: result });
};