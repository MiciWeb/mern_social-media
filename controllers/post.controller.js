const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.readPost = (req, res) => {
    PostModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log("Error to get data : " + err);
    }).sort({ createdAt: -1 });
}

module.exports.createPost = async (req, res) => {
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: req.body.message,
        // picture: req.file !== null ? "./uploads/posts/" + fileName : "",
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
    } catch (err) {
        return res.status(400).send(err);
    }
}
module.exports.updatePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    PostModel.findOneAndUpdate(
        req.params.id,
        {
            $set: { message: req.body.message }
        },
        { new: true },
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error: " + err)
        }
    )
}

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    PostModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Delete error: " + err)
        }
    )
}

module.exports.likePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
                if (err) return res.status(400).send(err);
                else
                UserModel.findByIdAndUpdate(
                    req.body.id,
                    {
                        $addToSet: { likes: req.params.id },
                    },
                    { new: true },
                    (err, docs) => {
                        if (!err) res.send(docs);
                        else return res.status(400).send(err);
                    }
                );
            }
        );
        
    } catch (err) {
        console.log(err)
    }
};

module.exports.unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknown : " + req.params.id);
    }

    try {
        await PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { likers: req.body.id },
            },
            { new: true },
            (err, docs) => {
                if (err) return res.status(400).send(err);
                else
                    UserModel.findByIdAndUpdate(
                        req.body.id,
                        {
                            $pull: { likes: req.params.id },
                        },
                        { new: true },
                        (err, docs) => {
                            if (!err) res.send(docs);
                            else return res.status(400).send(err);
                        }
                    );
            }
        );
    } catch (err) {
        console.log(err)
    }
}