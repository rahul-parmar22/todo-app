// import Todo from "../models/Todo.js"

// const getTodos = async (req,res)=>{

//     const todos = await Todo.findOne({user:req.user});
//     res.json(todos);

// }

// const addTodo = async (req, res)=>{

//   const {text} = req.body;
//    if (!text) return res.status(400).json({ msg: "Text required" }); //debug mate chhe...jo ahi no karvu hoy aa to model ma todo field ma ke pachhi form ma jyathi data aave chhe tya requierd kari nakvu etale ena vina submit thay j nahi
//   const todo = new Todo({user:req.user,todo:text, completed:false});  //ahi aa new ek constrcuture chhe je new object banave chhe
//   await todo.save();   //ahi upar aapane user field aapvi jethi badha todo ma ek uesr field no data ahithi add thai jay...mate khabar pade ke kaya user nu chhe aa todo ....ane mate todo model ma je ref aapiye to aani madadthi e aakha user no data pan populate() method thi find kari shakay
//   res.json(todo);
// }

// const updateTodo = async (req, res)=>{

// const {id}= req.params;
// const {text, completed} = req.body;
//  const todo= await Todo.findOneAndUpdate(
//     {user:req.user, _id:id },
//     {todo:text, completed},
//     {new:true}
//  )
//  res.json(todo);

// }

// const deleteTodo =  async(req,res)=>{

//     const {id} = req.params;
//    await Todo.deleteOne({_id:id, user:req.user});
//     res.json({sucess:true});

// }

// export {getTodos, addTodo, deleteTodo, updateTodo};

import Todo from "../models/Todo.js"; //aa req.user, req.params, req.bdoy  ne e badha ne destructure karvama  khub khyal rakhvo

const getTodos = async (req, res) => {
  try {
const  page = Number(req.query.page) ||1;
const limit = Number(req.query.limit) ||5;
const skip =  (page-1)*limit
const {status, sort, search}  = req.query;

const filter = {user:req.user }; //filter ek object chhe ane niche alag alag filter aa obj ma add thata jay ane aa final obj find ma pass kari devano

if(status === "completed") filter.completed = true;    // filter.completed= true means filter obj je creatre karyo tema new key value add karo {user:req.user, complete:true} aavu bane filter ma em
if(status === "pending") filter.completed = false; 
 //if(sort === 'newest')  filter.createdAt = -1 ;   aavu no thay karan ke Tum createdAt ko filter ke andar daal rahe ho, jabki sorting filter ka part hoti hi nahi ❌// mongodb ma find(filter) → sirf match karta hai// sort() → order decide karta hai //  jo aavu karo ane query ma niche sort no lagavo only a filter basis par karo to mongodb samje ke  “createdAt field ka value -1 hona chahiye” 
//console.log(filter);  ✅✅✅//price low to high ke high to low aa j khali sort thi thai..baki max, min , above, below price aa badhu filter thi thay...ane hamesha yad rakhvu ke je fitler vadha vastu par lagavvanu hoy tena par indexing lagavvi to easily handle thay...like 1 lakh product hoy ane badha par fitler lagava besvi to time jay mate indexing best ... price field par indexing lagavvu schema ma..

if(search) filter.todo = {$regex: search, $options:"i" }

let sortOption = sort==='oldest'? {createdAt:1} : {createdAt:-1}
//console.log(sortOption); 

//console.log(filter); 
console.log(filter);

    const user = req.user; //auth ma je pan req.user ma aave e aakhu ahi aavi jay..jo tyathi aakho obj mokle to aakho obj male ane jo only id tya j destructure karine mokle  to e male....jo tyathi obj aavto hoy to {id, user} vagere karine destucture kari shako ane jo only value aavti hoy ek single ke pachhi req.user.value aavu karo to pachhi {} use no karvu left baju variable ma ...req.body ma pan same hoy...only obj handle karvani rito chhe only...
    console.log(req.user); //aa req.user, req.para ms, req.bdoy  ne e badha ne destructure karvama  khub khyal rakhvo
    //const todos = await Todo.find({ user }); //ahi to user ma direct id j aave chhe karan ke auth mathi aapane destucture karine only id mokalvi chhi
    const todos = await Todo.find(filter).sort(sortOption).skip(skip).limit(limit);  //aane hamesha aaj order ma lakhva karan ke ek pachhi biju execute thay hamesha... jo pela skip lavavelu hoy sort pela to random order ma skip kari nakhe pachhi sort kare data to  vadhela data no sort thaya ane pagination ma pan issue aave 
    const total = await Todo.countDocuments(filter); //await and kona documents count karva chhe e nakhvu
   
    res.status(200).json({ todos, message: "sucessfully getTodos...!", user,pages: Math.ceil(total/limit) });
  } catch (err) {         //upar res.jsonma je pan aapo e hamesha frontend ma res.data ma aave ahi je obj.array kai pan hoy..frontend ma res.data thi aane access kari shakay
    res.json(err.msg);
  }
};

const addTodo = async (req, res) => {
  try {
    const { todo } = req.body;
    const newTodo = new Todo({ todo, user: req.user });
    await newTodo.save();
    res.status(200).json({ newTodo, messsage: "Todo created successfully..!" });
  } catch (err) {
    res.json(err.msg);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params; //req.params ek object hoy chhe ...url ma je pan aapane :id, :user vagere aapvi e badhu ahi param ma hoy to oe obj mathi aapane id ne destructure karie chhie// mate khyal rakhvo ke jo ahi todoId= req.params.id  aavu karine destructure karo to have ahi left side todo.Id ma {} nahi lagavva  because alredy chhe destructured ...simple obj destucture ni method chhe
    const { updatedText, completed } = req.body; //req.body ek object hoy chhe hamesha to hamesha { } left side use karvu ane pachhi j tema kai pan pass karvu...
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id },
      { todo: updatedText, completed },
      { new: true },
    );
    res
      .status(200)
      .json({ updatedTodo, message: "todo update successfully..!" });
  } catch (err) {
    res.json(err.msg);
  }
};


const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id }); //jya jya pan await use karvi means e ek promise return kare cheh ke hu aa task kari nakhish ane mate aapane wait karie chheie to ahi aa  deletedTodo ma ek promise j return thatu hoy
    res.status(200).json(deletedTodo);
  } catch (err) {
    res.json(err.msg);
  }
};

export { getTodos, addTodo, deleteTodo, updateTodo };


//ABOUT AWAIT 

//  const deletedTodo = await Todo.findOneAndDelete({ _id: id });   
 
//  aa code ma jo await nahi hoy to error kai pan nahi aave pan response pan nahi aave ane e delet pan nahi thya
//  await no meaning khali ne khali ahi evo nathi ke aa task ne time lagshe to pachhi j nichena task karo 
//  express and node ma jyare ek var response aavi jay  etale je req,res cycle chhe e bandh thai jay..to await nathi to niche direct res chali jay ane aakhu req,res cycle bandh thay ane aa operation no execute thay
//findOneAndDelete() Promise create karta hai...Tumne await nahi lagaya...Response turant send ho jata hai....Express request lifecycle close ho jata hai...Node event loop us async task ko DROP kar deta hai ❌
