const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {

     await mongodb
    .getDataBase()
    .db('broker')
    .collection('users')
    .find()
    .toArray()
    .then((users) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(users);
    })
    .catch(err => {
      res.status(400).json({message: err});
    })

}

const getSingle = async (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid user id')
    }

    const userId = new ObjectId(req.params.id)

   await mongodb
      .getDataBase()
      .db('broker')
      .collection('users')
      .find({ _id: userId })
      .toArray()
      .then((users) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(users[0])
    })
    .catch(err => {
      res.status(400).json({message: err});
    })
}


const createUser = async (req, res) => {

    const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    birthday: req.body.birthday,
    location: req.body.location,
    available_amount: req.body.available_amount
  }

    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('users')
      .insertOne(user);
  
    if (response.acknowledged) {
      
      res.status(201).json({_id: response.insertedId});
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating the user');
    }
  }


  const updateUser = async (req, res) => {

    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid user id')
    }

    const userId = new ObjectId(req.params.id)

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        birthday: req.body.birthday,
        location: req.body.location,
        available_amount: req.body.available_amount
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
    
    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json('Must use a valid user id')
    }

    const userId = new ObjectId(req.params.id)
  
    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('users')
      .deleteOne({ _id: userId })
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error ocurred while deleting the user');
      }
  }



module.exports = {getAll, getSingle, createUser, updateUser, deleteUser};