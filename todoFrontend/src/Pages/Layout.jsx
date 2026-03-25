import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Components/Header.jsx'
import Footer from '../Components/Footer.jsx'


//without outlet..jo aa nicheno code karo to manually  app.jsx ma bdha route ma  <Route path='/login' element={<Layout><Login/></Layout>} />  aa karvu pade badha page ma ..50 page hoy to 50 ma aa karvanu
// const Layout = ({children}) => {  
//   return (
//            <div className='min-h-screen flex flex-col '> 
//             <Header/>
//             <main className='grow'>     
//                 {children}
//             </main>
//             <Footer/>
//            </div>    //📌 Footer problem ka hero = grow.. </main> aa main ni andar vadharani je pan space hoy te badhi emnam reva de ane ..👉 grow ka matlab: “Jo bhi extra khaali jagah bachi ho, main le lunga.”   and footer ne last ma dekhade 
//   )
// }

// export default Layout;


const Layout = () => {
  return (
           <div className='min-h-screen flex flex-col '> 
            <Header/>
            <main className='flex flex-col flex-1 h-full'> 
                  {/*ahi flex-1 means  upar header and niche footer potani jaruriyat ni height lai leshe ane ahi aa main ne flex-1 aapi chhe to e vacheni vadheli badhi jagya te lai leshe....have teni andar jetala pan koi pan element hoy to e bahda ek flex-item chhe karan ke ahi flex flex-col lakahlu chhe to e aani andar na badha outlet ni height bydefault aani jetali thay ..aa vadheli height jetali.. jo contetn vadhu hoy to kai problme nathi pan ochha content na samye footer ne niche rakhvama problme aave ..to tyare aa height te badha inner chidl lai le   */}
               <Outlet/>
            </main>
            <Footer/>  
           </div>    //📌 Footer problem ka hero = grow.. </main> aa main ni andar vadharani je pan space hoy te badhi emnam reva de ane ..👉 grow ka matlab: “Jo bhi extra khaali jagah bachi ho, main le lunga.”   and footer ne last ma dekhade 
  )
}

export default Layout;


 //📌📌📌📌grow thi moto hero flex-1 chhe... aama only footer niche jatu htu pan ...jyare evo case aavyo notfound page ma ke extra jetali pan sapce chhe e koik bijo element levo joie..grow ma to koi element extra space nato leto kahli space emnam rahti hati..pan have extra space koik element ne levi hoy to aapane te element ne vadhu hegiht aapine  flex-1 karvi etale te extra jagyama gothvay jay jagya pramane...notfound page ma chhe aanu example ..image extra space lai le chhe....
// 1️⃣ grow kya hota hai?

// Socho page ek vertical dabba hai.

// | navbar |
// |        |  ← yeh space
// | content|
// |        |
// | footer |


// Jab hum likhte hain:

// <div className="min-h-screen flex flex-col">
//   <main className="grow">...</main>
//   <footer>...</footer>
// </div>

// 👉 grow ka matlab:

// “Jo bhi extra khaali jagah bachi ho, main le lunga.”

// ❌ Agar grow NAHI lagaya:

// Content kam hua

// Footer upar aa jayega

// Page ke bottom tak nahi pahuchega 😬

// | content |
// | footer  |  ← beech me atak gaya

// ✅ grow lagaya:

// Content kam ho → main stretch karega

// Footer hamesha bottom pe

// | content |
// |         |
// |         |
// | footer  | ✅


// 📌 Footer problem ka hero = grow

// 2️⃣ inset-0 kya hota hai?

// Ye shortcut hai 👇

// top: 0;
// right: 0;
// bottom: 0;
// left: 0;


// Tailwind me:

// absolute inset-0

// Matlab:

// Element apne relative parent ko poori tarah cover kar lega

// Tumhare case me:
// <div className="relative h-[50vh]">
//   <img ... />

//   <div className="absolute inset-0">
//     text
//   </div>
// </div>


// Parent = relative

// Child = absolute inset-0

// Result → text poori image ke upar aa gaya 😎

// 3️⃣ BG diya lekin transparent jaisa kyun lag raha hai?

// Ye line dekho:

// bg-black/30

// Breakdown:

// bg-black → black color

// /30 → 30% opacity

// Matlab:

// Black + 30% → transparent black


// Isliye:

// Image dikh rahi hai

// Text clear hai

// Pro look ✨

// Agar full solid chahiye:
// bg-black

// Agar aur light chahiye:
// bg-black/10

// 4️⃣ BG poori image ke upar kaise aa raha hai?

// Combination magic 🔥

// absolute inset-0 bg-black/30

// Step by step:

// absolute → normal flow se bahar

// inset-0 → poori image cover

// bg-black/30 → transparent layer

// Text uske upar

// 📸 Exactly wahi jo Instagram / landing pages me hota hai

// 5️⃣ Short mental rule (yaad rakhna 🧠)
// 🟢 Layout

// Footer ke liye → grow

// Page height ke liye → min-h-screen

// 🟢 Image overlay

// Parent → relative

// Overlay → absolute inset-0

// Dark overlay → bg-black/20

