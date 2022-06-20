const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

const API_BASE_URL = process.env.API_BASE_URL
const API_MAGIC_KEY = process.env.API_MAGIC_KEY
const API_MAGIC_NAME = process.env.API_MAGIC_NAME
const API_SINGLE_NAME = process.env.API_SINGLE_NAME
const API_SINGLE_LINE = process.env.API_SINGLE_LINE
const API_TEST_URL = encodeURI(process.env.API_TEST_URL)
const FORMAT_NAME = process.env.FORMAT_NAME
const FORMAT_VALUE = process.env.FORMAT_VALUE

router.get('/', async (req, res) => {
  try {
    const params = new URLSearchParams({
      ...url.parse(req.url, true).query,
      [FORMAT_NAME]: FORMAT_VALUE,
    })

    const apiResp = await needle('get', `${API_TEST_URL}?${params}`)
    const data = apiResp.body

    res.status(200).json(data)
    //console.log(data)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
