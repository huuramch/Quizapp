const fs = require('fs')
const FactModel = require("../database/schema/factSchema")

const createFacts = async (req, res) => {
    const body = req.body;
    console.log(body)
    try{
        const user = await FactModel.create(body);
        res.status(200).send({id:user._id})
    } catch {
        res.status(500).send("Internal Error")
    }
};

const getFacts = async (req, res) => {
    try{
        const data = await FactModel.find({})
        res.status(200).send(data)
    } catch {
        res.status(500).send("Internal Error")
    }
}

const getUserFacts = async (req, res) => {
    const userID = req.params.userID;
    const facts = await FactModel.find({userID:userID});
    if(!facts){
        res.status(404).send("Not found");
    } else {
        res.status(200).send(facts);
    }
}
const deleteFacts = async (req, res) => {
    const factId = req.params.factId
    try {
        const result = await FactModel.findByIdAndDelete(factId)
        res.status(200).send(`${result._id} amjilttai ustlaa`)
    } catch (error) { 
        res.status(500).send("Internal Error")
    }
}


const updateFact = async (req, res) => {
    const body = req.body;
    const factId = req.params.factId
    try{
        const update = await FactModel.findByIdAndUpdate(factId,{title: body.title, fact:body.fact},{new:true})
        res.status(200).send(update)
    } catch (error){
        res.status(500).send("internal error")
    }
}

const addLikes = async (req, res) => {
    const userID = req.params.userID;
    const factId = req.params.factId
    try{
        const fact = await FactModel.findById(factId)
        const updatedDislikes = fact.dislikes.filter((id) => id !== userID)
        const isAlreadyLiked = fact.likes.includes(userID)
        const updatedlikes = isAlreadyLiked ? fact.likes : [...fact.likes, userID]
        const updatedFact = await FactModel.findByIdAndUpdate(factId, {dislikes: updatedDislikes, likes: updatedlikes}, {new:true})
        res.status(200).send(updatedFact)
    } catch (err) {
        res.status(500).send("Internal Error")
    }
}

//const addDislikes = async (req, res) => {
//  const userID = req.params.userID;
//  const factId = req.params.factId
// try{
//   const fact = await FactModel.findById(factId)
//   const updatedLikes = fact.likes.filter((id) => id !== userID)
//   const isAlreadyDisliked = fact.dislikes.includes(userID)
//   const updatedDislikes = isAlreadyDisliked ? fact.dislikes : [...fact.dislikes, userID]
//   const updatedFact = await FactModel.findByIdAndUpdate (factId, {likes: updatedLikes, dislikes: updatedDislikes}, {new: true})
//  res.status(200).send(updatedFact)
// }catch {
//  res.status(500).send("Internal Error")
//   }
// }

// user id avna
// fact id avna
// idgaar ni haina
// likesin filterdene
// dislike darsan ugug ni include hiine
// updated dislikes
// findbyidandupdate


const addDislikes = async (req, res) => {
    const userID = req.params.userID
    const factId = req.params.factId
    try {
        const fact = await FactModel.findById(factId);
        const updatedLikes = fact.likes.filter((id) => id !== userID)
        const isAlreadyDisliked = fact.dislikes.includes(userID)
        const updatedDislikes = isAlreadyDisliked ? fact.dislikes : [...fact.dislikes, userID]
        const updatedFact = await FactModel.findByIdAndUpdate(factId, {likes: updatedLikes, dislikes: updatedDislikes}, {new: true})
        res.status(200).send(updatedFact)
    } catch (error){
        res.status(500).send("Internal Error")
    }
}

module.exports = {createFacts, getFacts, getUserFacts, deleteFacts, updateFact, addLikes, addDislikes}