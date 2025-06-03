import { FaPlus } from "react-icons/fa";

const Todos = () => {
  return (
    <div className=" bg-blue-200 ">
      <div>
        {/* inputs */}
        <input type="text" placeholder='Type Title Of Task' name='title' />
        <input type="text" placeholder='Details Of Your Task' />
        <button><FaPlus /></button>
      </div>
    </div>
  )
}

export default Todos
