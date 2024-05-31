import {useState} from 'react'

const TodoForm = ({onAdd}) => {

    const [taskName,setTaskName] = useState('');

    function handleSubmit(e){
      e.preventDefault();
      if(!taskName.trim()) return;
      onAdd(taskName);
      setTaskName('');
    }


  return (
   <div>
    <form onSubmit={handleSubmit}>
        <input type="text"
        value={taskName}
        placeholder='Add your task...'
        onChange={e => setTaskName(e.target.value)}
        />
        <button>Add</button>
    </form>
   </div>
  )
}

export default TodoForm;