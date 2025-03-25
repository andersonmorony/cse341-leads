const { type } = require("@hapi/joi/lib/extend");
const mongodb = require("../data/database");
const ObbejctId = require("mongodb").ObjectId;
const dbName = process.env.DATABASE_NAME;
const { interationSchema } = require("../validation/validation_LeadsInterations");
const createError = require("http-errors");

const getInterations = async (req, res) => {
  try {
    const users = await mongodb
      .getDataBase()
      .db(dbName)
      .collection("LeadsInterations")
      .find()
      .toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getInterationById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("LeadsInterations")
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

const createInteration = async (req, res) => {
    try {
        await interationSchema.validateAsync(req.body);

        const interation = {
            type: req.body.type,
            description: req.body.description,
            interation_date: req.body.interation_date,
            owner: req.body.owner,
        }

        const result = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("LeadsInterations")
            .insertOne(interation);

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

const updateInteration = async (req, res) => {
    try {

        await interationSchema.validateAsync(req.body);

        const id = req.params.id;
        const interation = {
            type: req.body.type,
            description: req.body.description,
            interation_date: req.body.interation_date,
            owner: req.body.owner,
        }

        const result = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("LeadsInterations")
            .updateOne({ _id: new ObbejctId(id) }, { $set: interation });

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

const deleteInteration = async (req, res, next) => {
    try {
        const id = req.params.id;

        const result = await mongodb
            .getDataBase()
            .db(dbName)
            .collection("LeadsInterations")
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

module.exports = { getInterations, getInterationById, createInteration, updateInteration, deleteInteration };
