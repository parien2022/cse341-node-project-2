const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

    const queryResult = await mongodb
    .getDataBase()
    .db('broker')
    .collection('users')
    .find();

    queryResult.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users);
    })

}

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id)

    const queryResult = await mongodb
      .getDataBase()
      .db('broker')
      .collection('users')
      .find({ _id: userId })

    queryResult.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(users[0])
    })
}


const createUser = async (req, res) => {

    const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    birthday: req.body.birthday,
    location: req.body.location,
    available_amount: req.bodyavailable_amount
  }

    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('users')
      .insertOne(user);
  
    if (response.acknowledged) {
      res
      .status(200).json({_id: response.insertedId})
      .send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating the user');
    }
  }


  const updateUser = async (req, res) => {

    const userId = new ObjectId(req.params.id)

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        birthday: req.body.birthday,
        location: req.body.location,
        available_amount: req.bodyavailable_amount
      }
  
    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('users')
      .replaceOne({ _id: userId }, user)
    
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user');
      }
  };


  const deleteUser = async (req, res) => {

    const userId = new ObjectId(req.params.id)
  
    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('users')
      .deleteOne({ _id: userId })
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the user');
      }
  }



module.exports = {getAll, getSingle, createUser, updateUser, deleteUser};