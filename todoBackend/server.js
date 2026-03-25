import express from "express";
import cors from 'cors'
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv'  //aa dotenv je install karyu tyathi lidhelu chhe...file location nathi koi
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'
import  auth from './middleware/auth.js'
import adminOnly from "./middleware/adminOnly.js";
import adminRoutes from './routes/adminRoutes.js'


const app = express();
dotenv.config(); //upar je dotenv lidhu teni ek method chhe config jethi have aapane process.env. karine use kari shakie variable
const port = process.env.PORT   // 👉 Port ek number hota hai..server ka address number...👉 Jahan par server run karta hai...like aakha computer ma aa number ni jagya hashe jya server chaltu hashe...aavi rite ghani badhi jagya hoy like 3000 react mate , to tya react nu server hashe em 

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}
))


connectDB(); 

app.get('/', (req,res)=>{
    res.send("hellow world....!")
});



app.use(express.json());  //Express 4.x me body parsing ke liye middleware lagana padta hai....aa natu aapyu to aapane body ma je kai pan frontend thi aapta hta req.body ma e kai pan express vachi nati shakti..etale e badhu undefined aavtu...
//khas yad rakhvu ke ahi upar parse kare chhe json data ne to express ne kem khabar pade ke je data aave chhe e json data chhe??body ma je data nakho chho e json data chhe e expresss ne kahabr padva mate aapane header ma  "Content-Type: application/json" aapvu j pade...jo aa header ma nahi aapo to undefined aavshe ....postman ma practice karti vakhte pan header ma aa option select karvo
//to have khabar padi ke content-Type sha mate jaruri chhe??and alag alag contnent type select karvana jyare req ma alag alag data format aapta hoie like photo, documetn, text, string etc



app.use('/api/users',authRoutes);    //aakha badha routes ma kyay pan extra space no aapvi , nahito error aavshe "/" "/ "  aa banne route have alag alag bani gya
app.use('/api/todos',auth, todoRoutes); 
app.use('/api/admin', auth, adminOnly, adminRoutes )
   //ahi upar api ni aagal "/" lagavvu jaruri chhe../api hovu joi.
// 1️⃣ app.use() ka matlab
// Express me app.use(path, middleware) → ek middleware ya router mount karne ke liye use hota hai
// Matlab: path ke saath aane wale requests ko ye handle karega


app.listen(port, ()=>{  //.listen ka kam:👉 Iska kaam hota hai server start karna  .......“Server ko bolna → bhai ab requests sunna start kar de”
    console.log(`Example app listening on port ${port}`)  // aa port pachhi ek callback chhe 👉 Jab server successfully start ho jaye, tab ye function chalega
});