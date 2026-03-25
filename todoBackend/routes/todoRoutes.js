import express from "express"
const router = express.Router();
import { getTodos, addTodo, deleteTodo, updateTodo } from "../controller/todoController.js";  //ahi fiel name ma .js extentio lagavvu nahi to error aavashe

router.get('/', getTodos);
router.post('/', addTodo);
router.delete('/:id',deleteTodo);
router.put('/:id', updateTodo);  //aa badha backend na route chhe to aa badha upar url ma no hoy..ahi je :id chhe to e id url ma nahi show kare ..url ma upar dekhay e routes chhe ane backend ma aa badha chhe e api chhe..routes nu kam route pramane webpage dekhadvu ane api nu kam to kahbar j chhe
                                //aapane jyare aa kam karva je button hit karvi to te function ni andar aa api call thato hoy ane te api ma aapane aa dynamic params add karta hoie
export default router; 


// 🔹 Rule yaad rakho (one-liner)

// 👉 Route define karte waqt :paramName 
// 👉 API call karte waqt sirf value

// ✅ Route definition     //ahi routes ma je name thi params nakho ej nam thi contoller ma req.params thi access kari shakay..
// router.get("/users/:userId/todos/:todoId", getTodo);

// ✅ API call    //api ma to only data j nakhvano hoy aa order ma je frontend thi hoy..pan controlelr ma aa order matter kare chhe...routes no order and api ma aavela data no order match thay
// GET /users/694254e922a182e7fadf113c/todos/6971b7058d97d4d520a1a2ce

// ✅ Controller
// const { userId, todoId } = req.params;
// console.log(userId); // 694254e922a182e7fadf113c
// console.log(todoId); // 6971b7058d97d4d520a1a2ce
//📌 Order matter karta hai, name nahi.





// PUT http://localhost:5000/api/todos/?id=69428f33e28624dfdcc28f1   ///aane query params kevay..url ma ?id && vagere vaparvi ane data melavvi emathi koi fieldno to 
// jo aavi rite request hoy to niche chhe em male id ane upar route define chhe tya /:id  em no lakhvu PannerNode...

// const id = req.query.id;  // "69428f33e28624dfdcc28f1"   aahi id aapane req.query thi laie chhie 
// router.put('/', auth, updateTodo);


// Use case: Jab extra filters ya optional data bhejna ho.
// Example: /todos/?id=69428f33e28624dfdcc28f1&completed=false
// Backend access: req.query.id
// Flexible for multiple filters, searches, pagination// ecommerce ma pagelimit, sort, color , brand aava filter ma use thay aa 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//REST API conventions me ye recommended hai for “update, delete, get single item”.je niche chhe e
// ane aama http://localhost:5000/api/todos/69428f33e28624dfdcc28f1a 
// router.put('/:id', updateTodo);   //to aam karvu jo url upar chhe evo hoy to ...tyare id melavava mate req.params.id thi id levi...aapame  url na parameter mathi j id laie chhie em...


// router.put('/users/:userId/todos/:todoId', updateTodo); //req.params thi niche rite aakha url mathi koi pan je change thai evo data lai shako chho..
// req.params.userId → "123"
// req.params.todoId → "69428f33e28624dfdcc28f1"