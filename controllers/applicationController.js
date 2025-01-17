const { getCollections } = require("../dbConfig/dbConfig");

exports.postApplication = async (req, res) => {
    const { applicationCollections } = getCollections();

    const application = req.body;
    const result = await applicationCollections.insertOne(application);

    res.send(result);
};

exports.getApplications = async (req, res) => {
    const { applicationCollections } = getCollections();



    if (req.user.email !== req.query.email) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;


    const result = await applicationCollections.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "email",
                foreignField: "email",
                as: "userDetails"
            }
        },
        {
            $unwind: {
                path: "$userDetails",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                _id: 1,
                name: "$userDetails.name",
                image: "$userDetails.image",
                email: "$email",
                role: "$userDetails.role",
                title: 1,
                reason: 1,
                cvLink: 1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ]).toArray();

    res.send(result);
};
