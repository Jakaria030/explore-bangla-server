const { getCollections } = require("../dbConfig/dbConfig");
const jwt = require('jsonwebtoken');

exports.postJWT = async (req, res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.send({ token });
};

exports.getUser = async (req, res) => {
    const { userCollections } = getCollections();

    const search = req.query.search || "";
    const filter = req.query.filter;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page-1)*limit;

    const query = {};

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } }, 
            { email: { $regex: search, $options: "i" } },
        ];
    }

    if (filter) {
        query.role = filter;
    }

    const result = await userCollections.find(query).skip(skip).limit(limit).toArray();

    res.send(result);
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

exports.userRole = async (req, res) => {
    const { userCollections } = getCollections();

    const email = req.query.email;
    const query = { email: email };
    const options = {
        projection: { role: 1, _id: 0 }
    };

    const result = await userCollections.findOne(query, options);

    res.send(result);
}

exports.isAdmin = async (req, res) => {
    const {userCollections} = getCollections();

    const email = req.params.email;
      
      if(email !== req.user.email){
        return res.status(403).send({message: "Access denied. Admins only."});
      }

      const query = {email: email};
      const user = await userCollections.findOne(query);
      
      let admin = false;
      if(user){
        admin = user?.role === 'admin';
      }

      res.send({admin}); 
}