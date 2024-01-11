const { Router } = require('express')
const router1 = Router()
const FactModel = require('../database/schema/factSchema.js')
const {createFacts, getFacts, getUserFacts, deleteFacts, updateFact, addLikes, addDislikes, } = require('../controller/factController.js')

router1.post('/facts', createFacts)
router1.get('/facts', getFacts)
router1.get('/facts/:userID', getUserFacts)
router1.delete('/facts/:factId', deleteFacts)
router1.put('/facts/:factId', updateFact )
router1.post('/addLikes/:factId/:userID', addLikes)
router1.post('/addDislikes/:factId/:userID', addDislikes)

module.exports = router1;