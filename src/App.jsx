import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'
import TodoForm from './components/TodoForm'
import { Search } from './components/Search'
import Filtros from './components/Filtros'




function App() {
  const [todos, settodos] = useState([
    {
      id: 1,
      text: "Criar funcionadades no sistemas",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar react",
      category: "Estudos",
      isCompleted: false,
    }
  ]);

  const [search,setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [sort,setSort] = useState("ASC")

const addTodo = (text, category) =>{
  const newTodo = [...todos,{
    id:Math.floor(Math.random() * 1000000),
    text,
    category,
    isCompleted: false,
  },
];
settodos(newTodo);
};

  const removeTodo = (id) =>{
    const newTodos = [...todos]
    const filteredTodos = newTodos.filter((todo) =>todo.id !== id ? todo :null);
    settodos(filteredTodos)
  };
  const completeTodo = (id)=>{
    const newTodos =[...todos]
    newTodos.map((todo) => todo.id === id ? todo.isCompleted = !todo.isCompleted : todo)
    settodos(newTodos)
  }
  return (
    <>
      <div className='app'>
        <h1>Lista de Tarefas</h1>
        <Search search={search} setSearch={setSearch}/>
       <Filtros filter={filter} setFilter={setFilter} sort={sort} setSort={setSort}  />
       
        <div className='todo-list'>
          {todos
          .filter((todo)=>filter ==="All" ? true :
           filter === "Completed" ? todo.isCompleted :
            !todo.isCompleted )

          .filter((todo)=>todo.text.toLowerCase().includes(search.toLowerCase()))
          .sort((a,b)=> sort === "ASC"
           ? a.text.localeCompare(b.text) 
          : b.text.localeCompare(a.text)
          )
          .map((todo) => (
         <Todo key={todo.id} todo = {todo} removeTodo={removeTodo} completeTodo ={completeTodo} />
          ))}
        </div>
        <TodoForm addTodo= {addTodo}/>
      </div>
    </>
  )
}

export default App
