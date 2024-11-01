import React , {useState} from 'react'
import { LuUserPlus2 } from "react-icons/lu";
import AddForm from './AddForm/AddForm';

const CreateUser = () => {

    const [isAddFormOpen, setIsAddFormOpen] = useState("scale-0")

    const toggleAddForm = () =>{
        setIsAddFormOpen("scale-100")
    }

  return (
    <div className='grid grid-cols-5' >
      <div onClick={toggleAddForm} className='h-[20vh] bg-slate-100 rounded-md border flex items-center justify-center cursor-pointer' >
        <p className='p-3 rounded-full text-5xl bg-white' ><LuUserPlus2/></p>
      </div>

      <AddForm isAddFormOpen = {isAddFormOpen} setIsAddFormOpen = {setIsAddFormOpen} />
    </div>
  )
}

export default CreateUser
