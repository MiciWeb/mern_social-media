const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(200).send("ID unknown : " + req.params.id)
    }
    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else res.send("ID unknown" + err);
    }).select("-password");
}

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(200).send("ID unknown : " + req.params.id);
    }

    await UserModel.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                bio: req.body.bio
            }
        },
        { new: true, upsert: true, setDefaultsOnInsert: true },
        (err, docs) => {
            if (err) return res.status(500).send({ message: err });
            else return res.send(docs);
        }
    )
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(200).send("ID unknown : " + req.params.id)
    }
    try {
        await UserModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succesfully deleted." });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}

module.exports.follow = async (req, res) => {
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToFollow)
    )
        return res.status(200).send("ID unknown : " + req.params.id);

    try {
        // add to the follower list
        UserModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, docs) => {
                if (!err) res.status(201).json(docs);
                else return res.status(200).jsos(err);
            }
        );
        // add to following list
        UserModel.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { followers: req.params.id } },
            { new: true, upsert: true },
            (err, docs) => {
                // if (!err) res.status(201).json(docs);
                if (err) return res.status(200).jsos(err);
            }
        );
    } catch (err) {
        console.log(err);
    }
};

module.exports.unfollow = async (req, res) => {
    if (
        !ObjectID.isValid(req.params.id) ||
        !ObjectID.isValid(req.body.idToUnfollow)
    )
        return res.status(200).send("ID unknown : " + req.params.id);

    try {
     UserModel.findByIdAndUpdate(
        req.params.id,
        { $pull: { following: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, docs) => {
            if (!err) res.status(201).json(docs);
            else return res.status(200).jsos(err);
        }
    );
    // remove to following list
     UserModel.findByIdAndUpdate(
        req.body.idToUnfollow,
        { $pull: { followers: req.params.id } },
        { new: true, upsert: true },
        (err, docs) => {
            // if (!err) res.status(201).json(docs);
            if (err) return res.status(200).jsos(err);
        }
    );
    } catch (err) {
        console.log(err);
    }
};