// const adminOnly = async (req,res,next)=>{
//      try {
//          if(req.user && req.role === 'admin') {
//             next(); 
//          }else{
//             res.status(403).json({message:"This routes only accessible by Admin"})
//          }
//      } catch (err) {
//          res.json(err.message)
//      }
// }
// export default adminOnly
// 

//++++++++++++++++++++++++++
// const adminOnly = (req,res,next)=>{
//    req.user && req.role === 'admin' ?next() : res.status(403).json({message:'only admin can access this route'}) 
    
// };
// export default adminOnly; 


//uparnu sav easy chhe ke jo banne condition true thay to next otherwise else..
//+++++++++++++++++++++ 
const adminOnly = (req,res,next)=>{
   !req.user || req.role !== 'admin' ?res.status(403).json({message:'only admin can access this route'}) 
    :next();  
};
export default adminOnly; 
//!req.user || req.role !== 'admin' jyare banne false thay tyare j else valu etale ahi next() chale...jo user hashe to req.user true aave etale  first condition   !(req.user)=!(true) = false thay ane second jo admin hoy means req.role admin hoy 'admin' !== 'admin'  to aa pan false thay..aa condtiion ke chhe ke banne side nu same nathi..pan aato same chhe etale conditon false thay ane banne false etale else valu statement chale..




// vicahr ke   aa hot to shu that  (aa hatu tyare admin nato e pan  next kari shakto hto..kem bhai ?? ke)
//  !req.user && req.role !== 'admin' ?res.status(403).json({message:'only admin can access this route'}) 
//  :next();  