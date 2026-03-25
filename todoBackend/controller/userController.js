import User from "../models/User.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {

     console.log("requested body:", req.body);
    const { username, password } = req.body;
    const user = new User({ username, password }); //schema aavu expect karto hoy usrname and password etale e automatic set kari de..aa key ruep kam kare and aani value value ma set thai jay
    await user.save();
                        // ahi niche je  aa chhe { id: user._id } e aa object jyare token verify thay auth middleware ma tyare aa object tya male aakho..
    const token = jwt.sign({ id: user._id , role:user.role}, process.env.JWT_SECRET, {
      //const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
      expiresIn: "1h",
    });
    res.status(200).json({ token: token, user, message:"User register sucessfully..!" });
  } catch (err) {
    res.status(400).json({ err: err.message, message:"User already exists..!" });
  }
};

//  const { username, password } = req.body; //ahi tame form ma je field aapi hoy tene decode karo chho.

//  lekin me body me username ko only "name" and password ko "lock" ese bheju and yha const {name, lock} = req.body karu to fir kaise handle hoga?

//  Frontend/body me fields ka naam schema se match nahi kar raha
// Body me name aur lock aa rahe hain
// Lekin schema me username aur password hai
// Question: const { name, lock } = req.body → kaise map kare schema ke fields se?

// jyare aavu hoy tyare  const user = new User({ name, lock });  aam no thay..karan schema username and password evu expect kare chhe to pachhi nicheh chhe em karay
//Tumhe body ke variable ko schema field se map karna hoga:
// const user = new User({
//   username: name,   // map name -> username
//   password: lock    // map lock -> password
// });

//const user = new User({ username: username, password: password });  aa pan chale todo valama karvu hoy to

//good practice e chhe ke je name field expect karo , password ..ej badhu field schema ma pan rakhvi to easily understandabel code ane fast lakhai jay....

const login = async (req, res) => {
  try {  //try catch block scope hoy..jo aama andar haji 2-3 try catch use karya hoy e janva mate ke kya part ma error chhe to ema define variabel ne pachhi niche no use kari shako tame..block scope hoy e
    const { username, password } = req.body;
    const user = await User.findOne({ username});  //{ username }   // same as { username: username }  to ahi pan aavi rite kari kari shako..jo bahar alag field thi avti hoy key to aavi rite kari shakay..je uapr registseration ma joyu em
    
//ahi aa user chhe to have niche je user.compare(password) karo etale have e compare method aa ahi je user chhe tena mate chale ane ahi je kai pan field chhe have user ni tene access kari shake ....

// const isMatch = await bcrypt.compare(password,user.password);  direct aam pan kari shalo pan have compare method ne user model ma lakhvani jarur nahi ....

    if (!user || !(await user.compare(password))) {        //compare fun e ek async fun chhe e promise return kare mate true false aavta var lage direct no aavi jay mate ahi await lagavvu ..ke pela wait karo pachhi aagal code run karo..ane yad rakhvu ke ! kya lagavvo ..aakha bracate ni bahar ane tema await ne pan lai levo.. 
      res.status(400).json({error:"Invalid credentials"}); //status code badha postman ma pan batave to khabar pade ke kayo code chale chhe...postman nice tool for all backend routes.. 11100000%%%.....
    } //ahi upar status je pan aapvi koi pan response ma to e status network tab ma ane browser le aa status ane error tab ma show kare e number pramane error...Tum intentionally 400 bhej rahe ho, to browser bhi 400 hi show karega.....
      //means jo ahi tame .status aapo ane user no hoy ke compare passwrod no thay to error tab ma 400 ane error type ma show thay message ane jo status no aapo to only ahi je json ma response mokalyo chhe ej frontend na res ma male....aa lagavine ane lagavya vina try krine joi levu.khabar padi jashe 
     


    const token = jwt.sign({ id: user._id, role:user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({token:token, message:"user login", role:user.role, username:user.username});    //ahi mare messaeg and token banne mokalvu hoy to ek obj ma bane nakhi devana pan res.json ke pachhi kai pan res ek var send thai gyo etale puru...error nahi aave pan  warning aavshe ane first res hoy e send thay....      
    
    console.log("successful ho gya banda login")
  } catch (err) {
    res.status(400).json({err:err.message});
  }
};

export { register, login };


// Express/Node.js me ek route handler me ek hi baar hi response bhej sakte ho.
// Agar tum ek hi route me do ya usse zyada res.send() / res.json() / res.status().send() call karoge → error aa jayega:

// Error: Can't set headers after they are sent.



// router.post('/register', (req, res) => {
//     res.send("First response");
//     res.send("Second response"); // ❌ Error: Can't set headers after they are sent.
// });


// Agar tumhe multiple info bhejna hai:
// Ek hi response object me sab data pack karo:

// res.json({
//     msg: "User registered",
//     token: token,
//     userId: user._id
// });

