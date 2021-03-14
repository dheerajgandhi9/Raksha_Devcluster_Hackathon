const router = require("express").Router();
let User = require("./../Models/user.model");
let Authority = require("./../Models/admin.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const saltRound = 8;
const nexo = require("nexmo");
const axios = require("axios");
const transporter = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "savishkargec@gmail.com",
		pass: "For@*Web123",
	},
});
const nexmo = new nexo({
	apiKey: "a6ed3eea",
	apiSecret: "m2gEhPVU24h7qm4Z",
});
router.route("/add").post((req, res) => {
	Authority.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			console.log(err);
		}
		if (!user) {
			console.log(req.body);
			if (req.body == null) {
				return;
			}

			const email = req.body.email;
			const password = req.body.password;
			const mobileno = req.body.number;
			const name = req.body.name;

			const resetToken = " ";
			const newUser = new User({
				email,
				password,
				mobileno,
				name,
				resetToken,
			});
			bcrypt.hash(newUser.password, saltRound, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save((err, user) => {
					if (err) {
						console.log(err);
					} else {
						let payload = { subject: user.Id };
						let token = jwt.sign(payload, process.env.SECRET_KEY);
						return res.status(200).send({ token, user });
					}
				});
			});

			/*.then(res=>{
                   console.log(res.email)
                   let payload={subject:res.email}
                   let token=jwt.sign(payload,process.env.SECRET_KEY)
                   res.status(200).send({token})
               })
               .catch(err=> res.status(400).json('Error:'+err))*/
		} else if (user) {
			return res.status(401).send("Authority Already exists");
		}
	});
});

router.post("/login", (req, res) => {
	console.log(req.body);
	User.findOne({ email: req.body.email }, (err, user) => {
		if (err) {
			console.log(err);
		} else {
			if (!user) {
				console.log(user);
				return res.status(401).send("invalid Email");
			} else {
				bcrypt.compare(req.body.password, user.password).then((isMatch) => {
					if (isMatch) {
						let payload = { subject: user._id };
						let token = jwt.sign(payload, process.env.SECRET_KEY);

						return res.status(200).send({ token });
					} else {
						return res.status(401).send("invalid Password");
					}
				});
			}
		}
	});
});
router.post("/sos", (req, res) => {
	const from = "Vonage APIs";
	const to = "919021932268";
	const text = `The women of the following number ${req.body.no} has Requested for help, here current location being latitude:${req.body.lat} and longitude:${req.body.long}`;
	nexmo.message.sendSms(from, to, text, (err, responseData) => {
		if (err) {
			console.log(err);
		} else {
			console.log(responseData.messages[0]);
			if (responseData.messages[0]["status"] === "0") {
				console.log("Message sent successfully.");
				return res.status(200).send("Sucess");
			} else {
				console.log(
					`Message failed with error: ${responseData.messages[0]["error-text"]}`
				);
				return res
					.status(401)
					.send(
						`Message failed with error: ${responseData.messages[0]["error-text"]}`
					);
			}
		}
	});
	// .then(response =>{
	//     res.status(200).send('Messege Send Successfully')
	// })
	// .catch(err =>{
	//     console.log(err)
	// })
	// let foundarea
	//     let foundcity
	//     const params={
	//         access_key:process.env.PositionStack,
	//         query:`${req.body.lat},${req.body.long}`,
	//         limit:1
	//     }
	// axios.get('http://api.positionstack.com/v1/reverse',{ params})
	// .then(response =>{
	//     response.data.data.map(location =>{
	//         if(location.confidence>0.4){
	//             foundarea=location.label,
	//             foundcity=location.county
	//             Authority.find({area:foundarea,city:foundcity})
	// .then(result=>{
	//     console.log(result)
	//     for(var i=0;i<result.length;i++){
	//         const from = 'OverWatch';
	//         const to = result[i].mobileNumber;
	//         const text = `The women of the following number ${req.body.no} has Requested for help, here current location being latitude:${req.body.lat} and longitude:${req.body.long}`;
	//         nexmo.message.sendSms(from, to, text)
	//         .then(response =>{
	//            return res.status(200).send('Messege Send Successfully')
	//         })
	//         .catch(err =>{
	//             console.log(err)
	//         })
	//     }
	// })
	// .catch(err=>{
	//   console.log(err)
	// })
	//         }
	//     })
	// })
});
router.put("/addComplain", (req, res) => {
	let foundarea;
	let foundcity;
	const params = {
		access_key: process.env.PositionStack,
		query: `${req.body.lat},${req.body.long}`,
		limit: 1,
	};
	axios
		.get("http://api.positionstack.com/v1/reverse", { params })
		.then((response) => {
			response.data.data.map((location) => {
				if (location.confidence > 0.4) {
					(foundarea = location.label), (foundcity = location.county);
					console.log(foundarea, foundcity);
					User.findOneAndUpdate(
						{ _id: req.body.id },
						{
							$push: {
								report: {
									problem: req.body.problem,
									time: new Date(),
									priority: req.body.priority,
									actionTaken: " ",
									lat: req.body.lat,
									long: req.body.long,
									area: foundarea,
								},
							},
						}
					).then((response) => {
						if (req.body.priority > 2 || req.body.priority === "high") {
							Authority.find({
								level: 2,
								area: foundarea,
								city: foundcity,
							})
								.then((admin) => {
									transporter.sendMail(
										{
											to: admin.email,
											from: "savishkargec@gmail.com",
											subject: "Complain Fired",
											html: `the women has registered a complain having email id ${response.email} and her problem is ${req.body.problem}
                              her locality being ${foundarea},${foundcity},latitude:${req.body.lat},longitude:${req.body.long}
                              `,
										},
										(err, result) => {
											if (err) {
												console.log(err);
											} else {
												return res.send("success");
											}
											transporter.close();
										}
									);

									res.send({
										message:
											"An email has been sent to the provided email with further instructions.",
									});
								})
								.catch((err) => {
									return res.status(400).json("Error:" + err);
								});
						} else {
							Authority.find({
								level: 1,
								area: foundarea,
								city: foundcity,
							})
								.then((admin) => {
									transporter.sendMail(
										{
											to: admin.email,
											from: "savishkargec@gmail.com",
											subject: "Complain Fired",
											html: `the women has registered a complain having email id ${response.email} and her problem is ${req.body.problem}
                  her locality being ${foundarea},${foundcity},latitude:${req.body.lat},longitude:${req.body.long}
                  `,
										},
										(err, result) => {
											if (err) {
												console.log(err);
											} else {
												return res.send("success");
											}
											transporter.close();
										}
									);

									res.send({
										message:
											"An email has been sent to the provided email with further instructions.",
									});
								})
								.catch((err) => {
									return res.status(400).json("Error:" + err);
								});
						}
						console.log(response);
						return res.status(200).send("Complain Register Successfully");
					});
				}
			});
		})

		.catch((error) => {
			console.log(error);
			return res.status(401).send("Error: " + error);
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
						return res.status(400).json("Error:" + err);
					});
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(400).json("oopsy doopsy sorry" + err);
		});
});
router.get("/showReport", (req, res) => {
	User.find()
		.then((result) => {
			return res.status(200).send(result);
		})
		.catch((err) => {
			res.status(401).send("Error: " + err.message);
		});
});
module.exports = router;
