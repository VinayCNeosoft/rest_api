const express=require('express');
const { check, validationResult } = require('express-validator');
const {loginCheck,getdata,postdata,deletedata,putdata} = require("../controller/employeeController");
//we will use this dependency to convert the body of incoming requests into JavaScript objects.
const bodyparser = require('body-parser')
const urlencodedParser = bodyparser.urlencoded({extended:false})
const router = express.Router()
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz"


//The middleware checks the authorization in the header of the request that contains a JWT token.
const authenticateMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization && authorization.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
     });
};

router.post("/login",async (req,res)=>{
    loginCheck(req.body,req,res)
    res.send("Login and Token Created")
})

router.get("/getdata",authenticateMiddleware ,(req,res)=>{
    getdata();
    res.send("Data Fetched successfully...")
})

router.post("/postdata",[
    check('email', 'Email length should be 10 to 30 characters').isEmail().isLength({ min: 10, max: 30 }),
    check('password','password must be 8 character long').isLength({min:8,max:16}),
    check('name', 'Name length should be 10 to 20 characters').isLength({ min: 5, max: 20 }),
    check('address', 'Address length should be 10 to 20 characters').isLength({ min: 5, max: 20 })
    ],(req,res)=>{
    // validationResult function checks whether
    // any occurs or not and return an object
    const errors = validationResult(req);
    // console.log(req)
    console.log(req.body)

    // If some error occurs, then this block of code will run
    if (!errors.isEmpty()) {
        res.json(errors)
    }

    // If no error occurs, then this block of code will run
    else {
        postdata(req.body)
        console.log("Data Added")
        res.send("Successfully validated and Data Stored in DB....")
    }

});

router.delete("/deletedata/:email",(req,res)=>{
    let email = req.params.email
    deletedata(email)
    res.send("data deleted")
})

router.put("/putdata/:email",[
    check('email', 'Email length should be 10 to 30 characters').isEmail().isLength({ min: 10, max: 30 }),
    check('password','password must be 8 character long').isLength({min:8,max:16}),
    check('name', 'Name length should be 10 to 20 characters').isLength({ min: 5, max: 20 }),
    check('address', 'Address length should be 10 to 20 characters').isLength({ min: 5, max: 20 })
    ],(req,res)=>{
        const errors = validationResult(req);
        // console.log(req)
        console.log(req.body)

        // If some error occurs, then this block of code will run
        if (!errors.isEmpty()) {
            res.json(errors)
        }
        // If no error occurs, then this block of code will run
        else {
            let email = req.params.email
            putdata(email,req.body)
            res.send("Successfully validated & Data Updated....")
        }
})

module.exports=router




// extras
/* router.post("/postdata",(req,res)=>{
    postdata(req.body)
    console.log("Data Added")
    res.send("data Added")
}) */
