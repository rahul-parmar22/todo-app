import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoMyself");
    console.log("Mongodb connect successfully...!")
  } catch (err) {
    console.log(err);
    process.exit(1); // aa main chhe jo mongodb no chaltu hoy , server no connect thatu hoy to  direct proceos exit kari nakhe...backend nu pan server nahi chale...
  }
};


//    await mongoose.connect("mongodb://localhost:27017/todoMyself");   //compass ma direct atyare sharuaatma database nahi dekhay....jyare tema model create karien jyare ema data aavshe tyare e dekhashe database compas ma
// 👉 Agar todoMyself database pehle se exist nahi karta,
// to MongoDB automatically create kar dega ❗

// ⚠️ Important condition (bahut log miss kar dete hain)
// MongoDB tabhi database create karta hai jab:
// aap koi collection banate ho
// ya koi document insert karte ho

// ❌ Sirf connect karne se database create nahi hota

 //aa uparnu check karvu hoy to direct mongoshell ma tame jaine ek  db ma colllection banavine data insert karo ek ane refres karo etale tya dekhay aa created database


 //ahi link ni jagyae direct process.env.MONGO_URI karine access lai levanu...