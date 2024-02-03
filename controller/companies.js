const mongodb = require('../db/connection')
const ObjectId = require('mongodb').ObjectId

const getAll = async (req, res) => {
  await mongodb
    .getDataBase()
    .db('broker')
    .collection('companies')
    .find()
    .toArray()
    .then((companies) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(companies)
    })
    .catch((err) => {
      res.status(400).json({ message: err })
    })
}

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id')
  }
  const companyId = new ObjectId(req.params.id)

  await mongodb
    .getDataBase()
    .db('broker')
    .collection('companies')
    .find({ _id: companyId })
    .toArray()
    .then((companies) => {
      res.setHeader('Content-Type', 'application/json')
      res.status(200).json(companies[0])
    })
    .catch((err) => {
      res.status(400).json({ message: err })
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
    stock_price: req.body.stock_price,
  }

  const response = await mongodb
    .getDataBase()
    .db('broker')
    .collection('companies')
    .insertOne(company)

  if (response.acknowledged) {
    res.status(201).json({ _id: response.insertedId })
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while creating the company')
  }
}

const updateCompany = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id')
  }

  const companyId = new ObjectId(req.params.id)

  const company = {
    name: req.body.name,
    symbol: req.body.symbol,
    industry: req.body.industry,
    founded: req.body.founded,
    ceo: req.body.ceo,
    annual_revenue: req.body.annual_revenue,
    employees: req.body.employees,
    stock_price: req.body.stock_price,
  }

  const response = await mongodb
    .getDataBase()
    .db('broker')
    .collection('companies')
    .replaceOne({ _id: companyId }, company)

  if (response.modifiedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while updating the company')
  }
}

const deleteCompany = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid company id')
  }

  const companyId = new ObjectId(req.params.id)

  const response = await mongodb
    .getDataBase()
    .db('broker')
    .collection('companies')
    .deleteOne({ _id: companyId })

  if (response.deletedCount > 0) {
    res.status(204).send()
  } else {
    res
      .status(500)
      .json(response.error || 'Some error ocurred while deleting the company')
  }
}

module.exports = {
  getAll,
  getSingle,
  createCompany,
  updateCompany,
  deleteCompany,
}
