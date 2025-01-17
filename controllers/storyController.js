const { ObjectId } = require("mongodb");
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

exports.getStories = async (req, res) => {
    const {storyCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied."});
    }

    const query = {authEmail: req.query.email};
    const result = await storyCollections.find(query).toArray();

    res.send(result);
};

exports.deleteStory = async (req, res) => {
    const {storyCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied."});
    }

    const id = req.params.id;
    const query = {_id: new ObjectId(id)};

    const result = await storyCollections.deleteOne(query);

    res.send(result);
}