import jwt from "jsonwebtoken";

const auth = (req, res, next) => {         //auth middleware oafter login, ke register par j lage..login,register routes par aane no lagadvu karan ke tyare te samaye token hoy j nahi 
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: "invalid token aa gya hai ji" });

  
  const token = header.split(" ")[1]; //ahi aa chhe to frontend ma must chhe ke (authorization: Bearer token) nakhvu...  frontnd thi bearer aavshe ... Bearer ek authentication scheme hai....means "Jo bhi is token ko bear karta hai, wahi authenticated user hai"  ...jo backend aa aaya split(" ") hoy to bearer lakhvu and ahi aavi space no aapi hou to ena vina pan chale pan ahi e pramane change karvo pade.....JWT 99% cases me Authorization: Bearer token me hi jaata hai...OAuth, Google login, GitHub login → sab Bearer hi use karte hain

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {  //jwt.verify method pase potana badha fun hoy,,..e automatic token ne secret key and payload thi verify krai le ane ek callback run kare je third parameter chhe ahi,...ane jo error hoy to e pan callback ma aape ane successful hoy to decoded e pan callback ma aape
    if (error) return res.status(401).json({ error: "Invalid Token " });
    req.user = decoded.id;  // aa decoded register ke login samaye je token generate thayo tyare je userdata no object nakhyo e aakho object aahi male...have ahi aapane direct e object mathi id ne destructure kari ne direct req.user ma only id pass karvi chhi...ahi aakho obj pan pass kari shako req.user ma...jyare id thi vadhu data pass karta hoe ane tene aagal use karvano hoy req mathi to aa aakho pass karvo ane aane destructure tyare kartu javu ane je  value joie ene destrcture karine access kari levi
    req.role = decoded.role; //ahi req.user=decoded pan rakhi shako pan ahi aam rakhyu che alag alag..to pachhi aagal badhey jya pan user ne find karvano hoy tya pachhi req.user.id ke pachhi req.user.role evi rite destructure karvu padshe...
    next();  //middleware ma kyarey success thay to tyare next aapvu..kyarey res.json aapvu nahi karane ke e res mokli de ane next() pan call kare to next ma main controller pachho res mokle to response collapse thay and error aave...
  });
};

export default auth;

//aakha code ma nani nani vato khyal rakhvi ...upar headers chhe tya header nahi lakhvu...bov savdhani purvak lakhvu... nani nani mistake thai shake chhe
//game tya issue aave to odebug mate hamesha console karvu j farajiyat to khaabar pade ke kya sudhi aapano code sacho chhe ane kyathi khoto aave chhe em


              

// aama upar  jo token na hoy to aam pan kari shakvi
// if (!header) {
//   res.send("NO Token");
// }
// pan aama bhavishyama vandho aave bahu

// Problems with res.send("NO Token")
// ❌ 1. Status code missing

// Default status = 200 OK ❌
// Client ko lagega request successful thi

// ❌ 2. Middleware stop nahi hota
// res.send("NO Token");
// // yahan next() call ho sakta hai

// ➡️ Server crash / “Headers already sent” error aa sakta hai

// ❌ 3. Frontend / API client ke liye confusing

// Frontend usually check karta hai:

// if (res.status === 401) {
//   logoutUser();
// }

// Agar status 200 aaya:

// Frontend break ho sakta hai

// Security logic fail

//and response hamesha json ma mokalvo....je niche explain karelu chhe...
//+++++++++++++++++++++++++++++++++++++++++++++++++++++
//🧠 Final summary (yaad rakhne ke liye)
// | Side   | Method            | Kaam                 |
// | ------ | ----------------- | -------------------- |
// | Server | `res.json()`      | Object → JSON (send) |
// | Client | `response.json()` | JSON → Object (read) |
//same .json() method banne jagyae alag alga kam kare chhe frtonend and backend ma ...
//frontend ma je json  chhe e server thi aavti string ne means json data ne object ma convert kare jethi user access kari shake..aa fetch ni method chhe
//ane aa servber side ni json o...response ma js object mokalavi tene json ma convert kare ...
//Server: res.json({ message: "No Token" }); Actually network me ye jaata hai:  {"message":"No Token"}


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//what is decoded
// jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

//     👉 decoded JWT library khud deta hai
// Jab token successfully verify ho jaata hai, tab:

// JWT token ke payload ko decode karke

// callback ke 2nd argument me de deta hai → decoded

// ⚠️ Ye koi variable aap nahi bhejte, JWT internally banata hai.


//7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣7️⃣
//apane agal joyu ke token kai rite bane ane ketali vastuthi bane to aa jwt verify e token mathi payload etale jema userni id, ane bijo data pass karelo hoy ane expite kyare thashe e pan pass karelu hoy to aakha token mathi jwt verify  token mathi badhi info  abstract kari le ane tene decdoed ma aapanane aape ane expire pan check kari le 

// 7️⃣ Flow ko ek line me samjho

// User login karta hai

// Server token banata hai (user id inside)

// Client har request me token bhejta hai

// Middleware:

// token verify karta hai

// decoded payload nikalta hai

// req.user = userId attach karta hai

// Next route ko pata hota hai:

// “kaunsa user request kar raha hai”