import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,  //aano matlab user:id aavashe....aama id hashe, koi text ke name evu nahi hoy..
        ref:"User",  //“Ye ObjectId User collection ka reference hai”// user namnu collection chhe ema aa id jene hoy te data ne access kari shako...populate() method mate aa upyogi thay...aa todo thi aapane je user nu todo chhe teno badho userdata aapane access kari shakvi
    },   //upar ref case-sensitive hoy chhe ...means tame  aa karyu hoy userschema ni andar mongoose.model("User", userSchema); to pachhi populate() method mate same tya je name hoy te j ahi aapvu pade..
  todo: {
    type: String,
    trim: true, //Trims whitespace from the beginning/end of the string
  },
  completed: {
    type: Boolean,
    default: false,
  }
},{
  timestamps:true   //ahi aa time stamp user, todo, compelted eni sathe no lakhvo karan ke aa ek special propertry chhe aane schema({ user,complete}, {timestamp}) aavi rite lakhvo new {} curly braces ni andar....to aanithi createdat and updatedat banne property automatic all data ma aavi jay
});        //createdAt ek field chhe ene upar todo , user eni jem e object ma  createdAt:{type:Date, default:Date.now } rakhi shako to aa direct date aape


export  default mongoose.model('Todo', todoSchema); 



//const todos = await Todo.find({ user: userId }).populate("user"); 
//.populate tyare lagavanu jyare  aaakha user object ne pan aa todos variabel chhe uapr tya access karvo hoy to ,...karan user na ref ma "user" chhe etale .popuulate thi e aakha user ne access kari shakay
