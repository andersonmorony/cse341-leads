const mongodb = require("../data/database");
const ObbejctId = require("mongodb").ObjectId;
const dbName = process.env.DATABASE_NAME;
const { userSchema } = require("../validation/validation_user");
const createError = require("http-errors");

const getUsers = async (req, res) => {
  try {
    const users = await mongodb
      .getDataBase()
      .db(dbName)
      .collection("users")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("users")
            .findOne({ _id: new ObbejctId(id) });

        if (!user) {
            throw createError(404, "User not found");
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const createUser = async (req, res) => {
    try {
        await userSchema.validateAsync(req.body);

        const user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            city: req.body.city,
            isActive: req.body.isActive,
            createdAt: new Date(),
            roles: req.body.roles
        }

        const result = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("users")
            .insertOne(user);

        res.setHeader("Content-Type", "application/json");
        res.status(201).json(result);

    } catch (error) {
        console.log(error);
        if(error.isJoi === true) {
           return res.status(422).send(error.details[0].message);
        }
        return res.status(500).send("Internal Server Error");
    }
};

const updateUser = async (req, res) => {
    try {

        await userSchema.validateAsync(req.body);

        const id = req.params.id;
        const user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            city: req.body.city,
            isActive: req.body.isActive,
            roles: req.body.roles
        }

        const result = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("users")
            .updateOne({ _id: new ObbejctId(id) }, { $set: user });

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);

    } catch (error) {
        console.log(error);
        if(error.isJoi === true) {
           return res.status(422).send(error.details[0].message);
        }
        return res.status(500).send("Internal Server Error");
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("users")
            .deleteOne({ _id: new ObbejctId(id) });

        if(!result) {
            throw createError(404, "User not found");
        }

        res.setHeader("Content-Type", "application/json");
        res.status(204).json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
