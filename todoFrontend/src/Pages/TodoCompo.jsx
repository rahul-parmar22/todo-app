import React, { useEffect, useState } from "react";
import instance from "../axios.js";
import debounce from "lodash/debounce"


const TodoCompo = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState("");
  const [page, setPage] = useState(1);
  const [pages,setPages] =  useState(1);
  const limit = 3 //jo limit ni value badlvi hoy to j aane state banavu nahito varible j rakhvu
 const [status, setStatus] = useState("")
 const [sort,setSort] = useState("");
 const [search,setSearch] = useState("");

 const buildQuery = () =>{
   
  const params = new URLSearchParams();
   if(status) params.append('status', status);
   if(sort) params.append('sort', sort);
   if(search) params.append("search",search); 

return params.toString(); 

 }

  const fetchTodo = async () => {
    try {         
      const query = buildQuery();                                  
      const res = await instance.get(`/todos/?page=${page}&limit=${limit}&${query}`);//ahi aa page direct state thi aave chhe... jo tame ahi aavu karta hot ke useeffect ma fetchuser(page)  to pachhi aa page chhe e aa url ma state thi no aave e pachhi function parameter thi aave .. .karan fun ma parameter pas karo e ane state banne alag hoy bhale tame same name aapelu hoy ...
      setTodos(res.data.todos || []); //aa || rakhvu karan ke jo backend ma koi todo nahi hoy to e error occur karshe
      setPages(res.data.pages)
    } catch (err) {
      console.error(err.message);
    }
  };

const handleSearch = debounce((value)=>{
  setSearch(value); 
},500); 

useEffect(()=>{
     if(search.trim() !== ""){
      fetchTodo(); 
     }
},[search])

  useEffect(() => {
    fetchTodo();
    //console.log("TODOS =>", todos); //aa old console karshe je shruaat ma empty array chhe e ..
  }, [page,status,sort]);
  //console.log("TODOS =>", todos); // aa set karela todos print karshe

  // const createTodo = async () => {
  //   if (!text.trim()) return;

  //   const res = await instance.post("/todos", { todo: text });
  //   console.log(res);
  //   setText("");
  //   setEditId("");
  //   fetchTodo();
  // };

  // const editTodoHandler = async (id, todoText) => {
  //   setText(todoText);
  //   setEditId(id);
  //   console.log(editId);
  // };

  // const editTodo = async () => {
  //   const res = await instance.put(`/todos/${editId}`, { updatedText: text });
  //   setEditId("");
  //   setText("");
  //   fetchTodo();
  // };
// const handleSearch = useCallback(
//   debounce((value) => {
//     setSearch(value);
//     setPage(1); // search change pe page reset karna optional
//   }, 500),
//   []
// );
  const handleSubmit = async () => {
    //me code upar chhe em lakhyo hato ..pan jovo ahi niche chhe e kevo clear code chhe..to hamesha best practice code lakhvo...
    //edit mode
    if (!text.trim()) return;

    if (editId) {
      await instance.put(`/todos/${editId}`, { updatedText: text });
      setEditId(null);
      setText("");
    } else {
      //add mode
      await instance.post("/todos", { todo: text });
      setText("");
    }
    fetchTodo();
  };

  const editTodo = (todo) => {
    setText(todo.todo);
    setEditId(todo._id);
  };

  const toggleTodo = async (todo) => {
    await instance.put(`/todos/${todo._id}`, { completed: !todo.completed });
    fetchTodo();
  };

  const deleteTodo = async (id) => {
    await instance.delete(`/todos/${id}`);
    fetchTodo();
  };

  return (
    <div className="p-1">
      <h1 className="uppercase font-bold text-3xl mb-4 text-center ">
        todo list
      </h1>
      <div className="border-1 border-gray-300 w-[90vw] "></div>
      <div className="flex flex-col space-y-1">
        <input
          type="text"
          className="border-1 border-gray-300 rounded-sm mt-3 px-2 py-1 "
          placeholder="add item..."
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />

        <button
          onClick={handleSubmit}
          className=" text-xs uppercase bg-black text-white px-2 py-1 rounded-sm cursor-pointer w-12 "
        >
          {editId ? "EDIT" : "ADD"}
        </button>
      </div>
 <input
  type="text"
  value={search}
  onChange={(e)=>handleSearch(e.target.value)}
   placeholder="Search Todoo.."
   className="bg-gray-200 border border-gray-500 mt-1 " />

      <div className="flex items-center p-1 gap-1 bg-gray-200 m-1 rounded-xs ">
  <select name="" id="" value={status} onChange={(e)=> { setPage(1); setStatus(e.target.value);}}   className="bg-gray-300 mt-1 w-1/4 rounded-xs cursor-pointer">
    <option value="">All</option>
    <option value="completed">Completed</option>
    <option value="pending" >Pending</option>
  </select>

  <select name="" id="" value={sort} onChange={(e)=>{ setPage(1);  setSort(e.target.value); } }  className="bg-gray-300 mt-1 w-1/4 rounded-xs cursor-pointer">
       <option value="">Sort</option>
       <option value="newest">Newest</option>
       <option value="oldest">Oldest</option>
  </select>
</div>

      {todos.length == 0 ? (
        <div className=" bg-gray-300 text-white font-medium p-4 mt-3 rounded-sm">
          OOps..! You have no task to Do{" "}
        </div>
      ) :
      
    <div>
      <div className=" flex flex-col divide-y-1 divide-gray-500 rounded-sm mt-3">
            
        {todos.map((todo, i) => {
          return (
            <div
              key={i}
              className="flex bg-gray-300 px-2 py-1 items-center justify-between text-xs rounded-sm"
            >
              <div className="flex gap-1 w-1/2">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                />
                <div
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.todo}
                </div>
              </div>
              <div className="flex items-center justify-center gap-1 w-1/2">
                <button
                  disabled={editId} // jo todo edit mode ma hoy to delete no thay
                  onClick={() => {
                    deleteTodo(todo._id);
                  }}
                  className="bg-gray-100 rounded-sm px-2 py-1 font-medium text-xs"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    editTodo(todo);
                  }}
                  className="bg-gray-100 rounded-sm px-2 py-1 font-medium text-sx"
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2 mt-5 justify-center">
<button disabled= {page===1} onClick={()=>setPage(page-1)} className="bg-gray-300 rounded-full cursor-pointer">&#60; </button>

        {Array.from({ length: pages }, (_, i) => i + 1).map((item) => (
          <button
          key={item}
            onClick={() =>setPage(item)
            }
            disabled={item=== page}
            // style={{backgroundColor:item===page? "gray":""}} // aa rite pan style thai shake pan nicheni method good chhe ej vaparvi
            className= {`${item===page? "cursor-default bg-gray-500 text-white":"cursor-pointer" }    bg-gray-300 p-1 rounded-xs ` }
          > 
            {item}
          </button>
        ))}

        <button  disabled= {page===pages} onClick={()=>setPage(page+1)} className="bg-gray-300 cursor-pointer rounded-full  "> &gt; </button>
      </div>
      </div>

      }



    </div>
  );
};

export default TodoCompo;
