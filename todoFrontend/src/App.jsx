import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Router, Outlet } from "react-router-dom";
import TodoCompo from "./Pages/TodoCompo.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import LandingPage from "./Pages/LandingPage.jsx";
import Layout from "./Pages/Layout.jsx";
import NotFound from "./Pages/notFound.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes.jsx";
import RoleContext from '../src/contexts/RoleContext.jsx'
import AllUsers from "./Pages/admin/AllUsers.jsx";




function App() {
  //sauthi pela layout page ma jaine code ni nicheni taiwlidn css jovi pachhi landing page and badha page ne jova...

// const role = localStorage.getItem('role'); 
// console.log(role); 
// const  ram = 'hellow'

  const [role, setRole] = useState(() => { // jo aa return fun no aapelo hot to dar vakhte login ma bhale setrole ma ane set karta hta chhata pan reload samye aa role reset thai ne null thatu hatu...
    return localStorage.getItem("role");  //Isko kehte hain lazy initialization of state....State ki initial value ek function se nikalo...🧠 One-line yaad rakhna....useState(fn) = React, pehli baar hi call karna.....Ye function sirf FIRST render pe chalega.....Uska return value → role ban jaayega....Baad ke renders me kabhi nahi chalega
  });

  return (
    <>
      <div className=" space-y-10">
        <div className="absolute left-40">{role} hai </div>
        <RoleContext.Provider value={{role,setRole}} >   

        {/* <RoleContext.Provider value={{ram,role}} >
           <RoleContext.Provider value={[ram, role]}>  to pachhi aavi rite destructure karvu const [ram, role] = useContext(RoleContext);  */}

      
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<Layout><LandingPage/></Layout>}/> without outlet badha routes ma aavi rite manually layout ma wrap karine lakhvu padtu..pan ahi outlet route ma lakhi nakho etale badha teni andar aavta routes ma e chale layout */}
            <Route element={<Layout />}>
              <Route path="" element={<LandingPage />} />
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
              <Route path="todos" element={<TodoCompo />} />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoutes>
                    <AdminDashboard />
                   
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
          </RoleContext.Provider>
          
      </div>
    </>
  );
}

// aa karvu website ma
// Ah perfect! 😄 Tum “scroll reveal” effect chahte ho jahan content scroll karne par appear ho, na ki pehle se hi visible ho. Ye modern websites me kaafi sleek lagta hai. Main tumhe React + CSS/JS simple example bata deta hoon.

export default App;
