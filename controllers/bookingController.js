const { getCollections } = require("../dbConfig/dbConfig")

exports.postBooking = async(req, res) => {
    const {bookingCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied. Tourist only."});
    }

    const newBooking = req.body;
    const result = await bookingCollections.insertOne(newBooking);
    res.send(result);
}