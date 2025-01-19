const { ObjectId } = require("mongodb");
const { getCollections } = require("../dbConfig/dbConfig")

exports.postBooking = async (req, res) => {
    const { bookingCollections } = getCollections();

    if (req.user.email !== req.query.email) {
        return res.status(403).json({ message: "Access denied. Tourist only." });
    }

    const newBooking = req.body;
    const result = await bookingCollections.insertOne(newBooking);
    res.send(result);
};

exports.getBookingDetails = async (req, res) => {
    const { bookingCollections } = getCollections();

    const touristEmail = req.query.touristEmail;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await bookingCollections.aggregate([
        {
            // Match bookings based on touristEmail
            $match: { touristEmail: touristEmail }
        },
        {
            // Convert packageID (string) to ObjectId
            $addFields: {
                packageObjectId: { $toObjectId: "$packageID" }
            }
        },
        {
            // Lookup the tour guide's name from the users collection
            $lookup: {
                from: "users",
                localField: "tourGuideEmail",
                foreignField: "email",
                as: "tourGuideDetails"
            }
        },
        {
            // Lookup the tour type from the packages collection
            $lookup: {
                from: "packages",
                localField: "packageObjectId",
                foreignField: "_id",
                as: "packageDetails"
            }
        },
        {
            // Unwind the arrays from the lookups
            $unwind: { path: "$tourGuideDetails" }
        },
        {
            $unwind: { path: "$packageDetails" }
        },
        {
            // Project only the required fields
            $project: {
                _id: 1, // Include booking ID
                tourType: "$packageDetails.tourType",
                tourGuideName: "$tourGuideDetails.name",
                tourDate: "$date",
                tourPrice: "$price",
                status: 1
            }
        },
        {
            // Skip documents based on the current page
            $skip: (page - 1) * limit
        },
        {
            // Limit the number of documents returned
            $limit: limit
        }
    ]).toArray();

    res.send(result);
};

exports.deleteBooking = async(req, res) => {
    const {bookingCollections} = getCollections();

    if (req.user.email !== req.query.email) {
        return res.status(403).json({ message: "Access denied. Tourist only." });
    }

    const bookingID = req.query.bookingID;
    const query = {_id: new ObjectId(bookingID)};
    const result = await bookingCollections.deleteOne(query);
    res.send(result);
};

exports.getBookingDetailsForTourGuide = async (req, res) => {
    const { bookingCollections } = getCollections();

    const tourGuideEmail = req.query.tourGuideEmail;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await bookingCollections.aggregate([
        {
            // Match bookings based on touristEmail
            $match: { tourGuideEmail: tourGuideEmail }
        },
        {
            // Convert packageID (string) to ObjectId
            $addFields: {
                packageObjectId: { $toObjectId: "$packageID" }
            }
        },
        {
            // Lookup the tour guide's name from the users collection
            $lookup: {
                from: "users",
                localField: "touristEmail",
                foreignField: "email",
                as: "touristDetails"
            }
        },
        {
            // Lookup the tour type from the packages collection
            $lookup: {
                from: "packages",
                localField: "packageObjectId",
                foreignField: "_id",
                as: "packageDetails"
            }
        },
        {
            // Unwind the arrays from the lookups
            $unwind: { path: "$touristDetails" }
        },
        {
            $unwind: { path: "$packageDetails" }
        },
        {
            // Project only the required fields
            $project: {
                _id: 1, // Include booking ID
                tourType: "$packageDetails.tourType",
                touristName: "$touristDetails.name",
                tourDate: "$date",
                tourPrice: "$price",
                status: 1
            }
        },
        {
            // Skip documents based on the current page
            $skip: (page - 1) * limit
        },
        {
            // Limit the number of documents returned
            $limit: limit
        }
    ]).toArray();

    res.send(result);
};