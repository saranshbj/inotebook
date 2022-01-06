const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'saransh';

//ROUTE 1: create a user using : POST "/api/auth/createuser". No login required

router.post('/createuser',[
    body('name','Enter a valid name').isLength({min: 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be atleast 5 characters').isLength({min: 5}),
],async(req, res)=>{

//if there are errors return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

// check whether the user with this email exists already

  try{
    let user = await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({error: "Sorry a user with this email already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

  //create new user

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user:{
          id: user.id
        }
      }

      const authtoken = jwt.sign(data, JWT_SECRET);

      res.json({authtoken})
    } catch (error){
      console.error(error.messgae);
      res.status(500).send("internal server error");
    }

})

//ROUTE 2: Authenticate a user : POST "/api/auth/login". No login required

router.post('/login',[
  body('email', 'Enter a valid email').isEmail(),
  body('password','Password cannot be blank').exists(),
], async (req, res)=> {
  const error = validationResult(req);
  if(!error.isEmpty()){
  return res.status(400).json({error: error.array()});
}

const {email, password} = req.body;
try{
  let user = await User.findOne({email});
  if(!user)
  return res.status(400).json({error:"Please try to login with correct credentials"});
  const passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    return res.status(400).json({error:"Please try to login with correct credentials"});
  }
  const data = {
    user:{
      id: user.id
  }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);
  res.json({authtoken})

}catch(error){
  console.error(error.messgae);
  res.status(500).send("Internal server error");
}
})

// ROUTE 3: get loggedin user details using POST "/api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res)=> {

try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
} catch (error) {
  console.error(error.messgae);
  res.status(500).send("Internal server error");
}
})
module.exports = router