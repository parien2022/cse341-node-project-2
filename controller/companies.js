const mongodb = require('../db/connection');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {

    mongodb
    .getDataBase()
    .db('broker')
    .collection('companies')
    .find()
    .toArray((err, companies) => {
        if(err){
            res.status(400).json({message: err})
        }
        res.setHeader('Content-Type', 'application/json')
        res.status(200).json(companies);
    })

}

const getSingle = (req, res) => {
    const companyId = new ObjectId(req.params.id)

    mongodb
      .getDataBase()
      .db('broker')
      .collection('companies')
      .find({ _id: companyId })
      .toArray((err, companies) => {
        if(err){
            res.status(400).json({message: err})
        }
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(companies[0])
    })
}


const createCompany = async (req, res) => {

    const company = {
    name: req.body.name,
    symbol: req.body.symbol,
    industry: req.body.industry,
    founded: req.body.founded,
    ceo: req.body.ceo,
    annual_revenue: req.body.annual_revenue,
    employees: req.body.employees,
    stock_price: req.body.stock_price
  }

    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('companies')
      .insertOne(company);
  
    if (response.acknowledged) {
      res
      .status(200).json({_id: response.insertedId})
      .send();
    } else {
      res.status(500).json(response.error || 'Some error ocurred while creating the company');
    }
  }


  const updateCompany = async (req, res) => {

    const companyId = new ObjectId(req.params.id)

    const company = {
        name: req.body.name,
        symbol: req.body.symbol,
        industry: req.body.industry,
        founded: req.body.founded,
        ceo: req.body.ceo,
        annual_revenue: req.body.annual_revenue,
        employees: req.body.employees,
        stock_price: req.body.stock_price
      }
  
    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('companies')
      .replaceOne({ _id: companyId }, company)
    
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the company');
      }
  };


  const deleteCompany = async (req, res) => {

    const companyId = new ObjectId(req.params.id)
  
    const response = await mongodb
      .getDataBase()
      .db('broker')
      .collection('companies')
      .deleteOne({ _id: companyId })
  
      if (response.deletedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error ocurred while updating the company');
      }
  }



module.exports = {getAll, getSingle, createCompany, updateCompany, deleteCompany};