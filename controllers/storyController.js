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

exports.getSingleStory = async(req, res) => {
    const {storyCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied."});
    }

    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const result = await storyCollections.findOne(query)

    res.send(result);
};

exports.deleteSingleImage = async (req, res) => {
    const {storyCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied."});
    }

    const {storyID, imageURL} = req.body;
    const query = {_id: new ObjectId(storyID)};

    const updatedDoc = {
        $pull: {images: imageURL}
    };

    const result = await storyCollections.updateOne(query, updatedDoc);

    res.send(result);
};

exports.uploadSingleImage = async (req, res) => {
    const {storyCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied."});
    }

    const {id, image} = req.body;
    const query = {_id: new ObjectId(id)};

    const updatedDoc = {
        $push: {images: image}
    };

    const result = await storyCollections.updateOne(query, updatedDoc);

    res.send(result);
};

exports.updateStory = async (req, res) => {
    const {storyCollections} = getCollections();

    if(req.user.email !== req.query.email){
        return res.status(403).json({message: "Access denied."});
    }

    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const {title, story} = req.body;

    const updatedDoc = {
        $set: {
            title, story 
        }
    };

    const result = await storyCollections.updateOne(query, updatedDoc);

    res.send(result);
};

exports.getFourStory = async (req, res) => {
    const {storyCollections} = getCollections();

    const random = {
        $sample : {
            size: 4
        }
    };

    const projection = {
        $project: {
            _id: 1,
            title: 1,
            images: 1,
            story: 1
        }
    };

    const result = await storyCollections.aggregate([random, projection]).toArray();

    res.send(result);
};

exports.getTourGuideStory = async (req, res) => {
    const {storyCollections} = getCollections();

    const email = req.params.email;
    const query = {authEmail: email};
    const result = await storyCollections.find(query).toArray();

    res.send(result);
};