const { getCollections } = require("../dbConfig/dbConfig");

exports.postStory = async (req, res) => {
    const {storyCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied."});
    }

    const newStory = req.body;
    const result = await storyCollections.insertOne(newStory);
    
    res.send(result);
};