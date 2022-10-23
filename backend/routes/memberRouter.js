//"use strict";
const express = require('express');
const mongoose = require('mongoose');
const member = require('../models/member');
const router = express.Router();

//get all members
router.get('/getAllMembers', async (req, res) => {
  try{
        const allMembers = await member.find();
        res.json(allMembers);
        console.log(allMembers)
  }
  catch(err){
      res.send('Error ' + err)
  }

});

//get member by id 
router.get('/getMemberById/:id', async (req, res) => {
  try{
    const member1 = await member.find({id:req.params.id});
    res.json(member1);
    console.log(req.params.id + member1)
  }
  catch(err){
    res.send('Error ' + err)
  }
  
});

//create new member and check that id doesnt exist
router.post("/createNewMember", async (req, res) => {
  console.log("ora"+{id:req.body.id});
  // console.log(newMembercheck + "hjjjjjjjjjjjjjjgffgggggggggggggg");

  const newMember= await member.findOneAndUpdate({id:req.body.id},{
$set:{
  // ...req.body
  name:req.body.name,
  id:req.body.id,
  address:req.body.address,
  sickDate:req.body.sickDate,
  //wasSick:req.body.wasSick
  }
  },{upsert:true})
  
  res.json(newMember);
  console.log(newMember);
});

//update member
router.post('/updateMember', async(req,res) => {
  console.log(req.params.id)
  console.log(req.body.name)
  const result= await member.findOneAndUpdate({id:req.body.id},{
  $set:{
    //id:req.body.id,
    name:req.body.name,
    address:req.body.address
  }
  },{upsert:true})
  res.json(result);//show before the update
  console.log(result);


//update member`s name by id - not in use
router.post('/updateMemberById/:id', async(req,res) => {
  console.log(req.params.id)
  console.log(req.body.name)
  const result= await member.findOneAndUpdate({id:req.params.id},{
  $set:{
    name:req.body.name,
    address:req.body.address
  }
  },{upsert:true})
  res.json(result);//show before the update
  console.log(result);
});

})

//delete member by id - not in use 
router.post('/deleteMemberById/:id', async (req, res) => {
  try{
    const member1 = await member.deleteOne({id:req.params.id});
    res.json(member1);
    console.log(req.params.id + member1)
  }
  catch(err){
    res.send('Error ' + err)
  }
  
});

//new function after frontend changes
router.post('/deleteMember', async (req, res) => {
  try{
    const member1 = await member.deleteOne({id:req.body.id});
    res.json(member1);
    console.log(req.body.id + member1)
  }
  catch(err){
    res.send('Error ' + err)
  }
});

module.exports = router;