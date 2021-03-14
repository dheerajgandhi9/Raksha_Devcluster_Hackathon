const Authority=require('./../Models/admin.model')
const express=require('express')
const router=express.Router()
const bcrypt=require('bcryptjs')
const saltRound = 8;
const axios=require('axios')
const jwt = require("jsonwebtoken");
const orderid = require("order-id")("mysecret");
const nodemailer=require('nodemailer')
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "savishkargec@gmail.com",
    pass: "For@*Web123",
  }
});
router.post("/add",(req, res) => {
    Authority.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        console.log(err);
      }
      if (!user) {
        console.log(req.body);
        if (req.body == null) {
            res.status(401).status('pls send a required variable')

          return;
        }
        let foundarea
        let foundcity
    const params={
        access_key:"da846e0f2370a558807d6eb9bf459898",
        query:`${req.body.lat},${req.body.long}`,
        limit:1
    }
    axios.get('http://api.positionstack.com/v1/reverse',{ params})
    .then(response =>{
        response.data.data.map(location =>{
          console.log('in location',location)
            if(location.confidence>0.4){
                foundarea=location.label,
                foundcity=location.county
                console.log('in location',location)
                console.log(req.bdy,foundcity,foundarea)
        const email = req.body.email
        const password=req.body.password
        const mobileNumber=req.body.number
        const specialId=orderid.generate();
      
         const policestation = req.body.policestation
        
        const level=req.body.level
        var dangerZone=1
        const city = foundcity
        const area=foundarea
       
        const lat=req.body.lat
        const long=req.body.long
        const resetToken=' '
        const NewUser=new Authority({
            email,
            password,
            specialId,
            mobileNumber,
            level,
            policestation,
            dangerZone,
            area,
            city,
            lat,
            long,
            resetToken
        })
        bcrypt.hash(NewUser.password, saltRound, (err, hash) => {
            if (err){
              console.log(err)
  
            };
            console.log(NewUser)
            NewUser.password = hash;
            NewUser.save((err, user) => {
              if (err) {
            
                console.log(err)
              } else {
                let payload = { admin: user.Id };
                let token = jwt.sign(payload, process.env.SECRET_KEY);
                return res.send({ token, user });
              }
            });
          });

            }
        })
    })
    .catch(err =>{
      console.log('Error:'+err.message)
    })
        
        } else if (user) {
         return res.send("Authority Already exists");
        }

    })
})
router.post("/login", (req, res) => {
    // console.log(req.body);
    if(req.body==null){
        return res.status(401).send('no body recieved')
    }
    Authority.findOne({ specialId: req.body.specialId }, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        if (!user) {
          res.status(401).send("invalid ID");
        } else {
          bcrypt.compare(req.body.password, user.password).then((isMatch) => {
            if (isMatch) {
              let payload = { subject: user._id };
              let token = jwt.sign(payload, process.env.SECRET_KEY);
  
              res.status(200).send({ id: user._id, token,area:user.area });
            } else {
              res.status(401).send("invalid Password");
            }
          });
        }
      }
    });
  });

  router.post("/forgot-password", (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) {
        console.log(err);
      } else {
        const token = buffer.toString("hex");
        Authority.findOne({ email: req.body.email }, (err, user) => {
          if (err || !user) {
            res.status(422).send("No user with this email id available");
          } else {
            user.resetToken = token;
            //user.expiresToken=Date.now()+3600000
            user
              .save()
              .then((user) => {
                console.log("hello");
                transporter.sendMail(
                  {
                    to: req.body.email,
                    from: "savishkargec@gmail.com",
                    subject: "password reset",
                    html: `
                          <p>Hi ${user.firstname}, forgot your password.<br/> Don't worry we got you covered</p>
                          <h5><a href="https://womenHelper.com/update-password/${token}">click here</a></h5>
                          <p>link expires in one hour, thank you</p>
                          `,
                  },
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    } else {
                      res.send("success");
                    }
                    transporter.close();
                  }
                );
  
                res.send({
                  message:
                    "An email has been sent to the provided email with further instructions.",
                });
              })
              .catch((err) => res.status(400).json("Error:" + err));
          }
        });
      }
    });
  });
  router.post("/new-password", (req, res) => {
    console.log(req.body);
    const password = req.body.password;
    const sentToken = req.body.token;
    console.log(sentToken);
    Authority.findOneAndUpdate({ resetToken: req.body.token })
      .then((user) => {
        console.log("in here");
        bcrypt.hash(password, saltRound, (err, hash) => {
          if (err) throw err;
          console.log(hash);
          user.password = hash;
          user.resetToken = " ";
          //user.expiresToken=' ';
          user
            .save()
            .then((result) => res.status(200).json("success"))
            .catch((err) => {
              console.log(err);
              res.status(400).json("Error:" + err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json("oopsy doopsy sorry" + err);
      });
  });
router.post('/add-complain',(req,res)=>{

    if(req.body==null){
        return res.status(401).send('no body recieved')
    }
    let foundarea
    let foundcity
    const params={
        access_key:process.env.PositionStack,
        query:`${req.body.lat},${req.body.long}`,
        limit:1
    }
    axios.get('http://api.positionstack.com/v1/reverse',{ params})
    .then(response =>{
        response.data.data.map(location =>{
            if(location.confidence>0.4){
                foundarea=location.label
                foundcity=location.region
                Authority.findOneAndUpdate(
                  {_id:req.body.id},
                  {
                      $push:{
                          complain:{
                              type:req.body.type,
                              discription:req.body.discription,
                              date:new Date,
                              lat:req.body.lat,
                              long:req.body.long,
                              area:foundarea,
                              city:foundcity
          
                          }
                      }
                  }
              )
              .then(result => {
                 console.log(result)
                //  for(var i = 0; i < result.complain.length;i++){
                     if(result.complain.includes(foundarea) && result.complain.includes(foundcity)){
                      result.dangerzone+=1
                     }
                // }
                 result.save()
                 .then(response=>{
                     return res.send('Success')
                 })
                 .catch(err=>{
                     return res.send('Error: ' + err.message)
                 })
                  
              })
              .catch(err=>{
                console.log(err)
              })
            }
        })
    })

    
   
})

router.get('/get-complain/:id',(req,res)=>{
  console.log(req.params)
    Authority.findOne({_id:req.params.id})
    .then(result=>{
      console.log(result)
      const data=result.complain
      res.status(200).send(data)
    })
    .catch(err=>{
      console.log(err)
      res.status(401).send('Error: ' + err.message)
    })
})

module.exports = router