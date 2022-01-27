const empModel = require("../db/employeeSchema")
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdefghijklmnopqrstuvwxyz"
//const bcrypt = require("bcrypt");

const loginCheck=async(body,req,res)=>{
    const {email,password}= body;
    const user =  empModel.findOne({ email: email });
    if (user) {
      if (password==user.password) {
        let payload = {
          uid: email,
        };
        const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });
        console.log(`login Successfull and Token: ${token}`)
        res.json({ err: 0, msg: "login successfull",token });
      } else {
        console.log("Invalid Password")
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      console.log("User Does Not Exist")
      res.status(401).json({ error: "User does not exist" });
    }
}

const getdata = async (req, res) => {
    empModel.find({}, (err, data) => {
      if (err) throw err;
      else {
        console.log(data);
        return data;
        //   res.json({ err: 0, data: data });
      }
    });
}
const postdata=async (data)=>{
    let insert = await new empModel(data);
    insert.save((err)=>{
        if(err) throw err;
        else {
            console.log(data);
            return data;
            //   res.json({ err: 0, data: data });
        }
    })
}

const deletedata = async (email) =>{
    empModel.deleteOne({email:email},(err)=>{
        if(err) throw err;
        else{
          console.log("Data Deleted...")
        }
    })
}

const putdata = async (email,data)=>{
    console.log(data)
    console.log(email)
    empModel.updateOne({email:email},{ $set:{email:data.email, password:data.password,name:data.name, address:data.address}},(err)=>{
            if(err) throw err;
            else{
              console.log("Data Updated...")
            }
    })
}

module.exports = {loginCheck,getdata,postdata,deletedata,putdata};

/* const getData = async (req, res) => {
    empModel.find({}, (err, data) => {
      if (err) throw err;
      else {
        console.log(data);
        return data;
        //   res.json({ err: 0, data: data });
      }
    });
}; */

/* async function getdata(){
    await empModel.find({},(err,data)=>{
        if(err) throw err;
        return data;
    })
}
 */