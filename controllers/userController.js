const { ObjectId } = require("mongodb");
const { getCollections } = require("../dbConfig/dbConfig");
const jwt = require("jsonwebtoken");

exports.postJWT = async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });

  res.send({ token });
};

exports.getUser = async (req, res) => {
  const { userCollections } = getCollections();

  const search = req.query.search || "";
  const filter = req.query.filter;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const skip = (page - 1) * limit;

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
};

exports.isAdmin = async (req, res) => {
  const { userCollections } = getCollections();

  const email = req.params.email;

  if (email !== req.user.email) {
    return res.status(403).send({ message: "Access denied. Admins only." });
  }

  const query = { email: email };
  const user = await userCollections.findOne(query);

  let admin = false;
  if (user) {
    admin = user?.role === "admin";
  }

  res.send({ admin });
};

exports.isTourGuide = async (req, res) => {
  const { userCollections } = getCollections();

  const email = req.params.email;

  if (email !== req.user.email) {
    return res.status(403).send({ message: "Access denied. Tour-guide only." });
  }

  const query = { email: email };
  const user = await userCollections.findOne(query);

  let tourGuide = false;
  if (user) {
    tourGuide = user?.role === "tour-guide";
  }

  res.send({ tourGuide });
};

exports.isTourist = async (req, res) => {
  const { userCollections } = getCollections();

  const email = req.params.email;

  if (email !== req.user.email) {
    return res.status(403).send({ message: "Access denied. Tourist only." });
  }

  const query = { email: email };
  const user = await userCollections.findOne(query);

  let tourist = false;
  if (user) {
    tourist = user?.role === "tourist";
  }

  res.send({ tourist });
};

exports.updateUser = async (req, res) => {
  const { userCollections } = getCollections();

  if (req.user.email !== req.query.email) {
    return res.status(403).json({ message: 'Access denied.' });
  }

  const email = req.query.email;
  const updatedUser = req.body;

  const updateDoc = {
    $set: updatedUser
  };

  const result = await userCollections.updateOne({ email: email }, updateDoc);

  res.send(result);
};

exports.updateUserRole = async (req, res) => {
  const { userCollections } = getCollections();

  if (req.user.email !== req.query.email) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  const email = req.params.email;
  const query = { email: email };
  const updatedDoc = {
    $set: {
      "role": "tour-guide"
    }
  };

  const result = await userCollections.updateOne(query, updatedDoc);
  res.send(result);
};

exports.randomTourGuides = async (req, res) => {
  const { userCollections } = getCollections();

  const query = {
    $match: {
      role: "tour-guide"
    }
  };

  const random = {
    $sample: {
      size: 6
    }
  };

  const result = await userCollections.aggregate([query, random]).toArray();

  res.send(result);
};

exports.getSingleUser = async (req, res) => {
  const { userCollections } = getCollections();

  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await userCollections.findOne(query);

  res.send(result);
};

exports.getAllTourGuide = async (req, res) => {
  const { userCollections } = getCollections();
  const result = await userCollections.find({ role: 'tour-guide' }).toArray();
  res.send(result);
};

exports.getStatistics = async (req, res) => {
  const { userCollections, packageCollections, storyCollections } = getCollections();

    const [userStats, packageStats, storyStats] = await Promise.all([
      userCollections.aggregate([
        {
          $group: {
            _id: "$role",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            role: "$_id",
            count: 1,
            _id: 0
          }
        }
      ]).toArray(),
      packageCollections.countDocuments(),
      storyCollections.countDocuments()
    ]);

    const touristStat = userStats.find(stat => stat.role === "tourist") || { count: 0 };
    const tourGuideStat = userStats.find(stat => stat.role === "tour-guide") || { count: 0 };

    const result = {
      totalTourist: touristStat.count,
      totalTourGuide: tourGuideStat.count,
      totalPackages: packageStats,
      totalStory: storyStats
    };

    res.send(result);

};
