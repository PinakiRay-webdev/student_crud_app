import React, { useEffect , useState } from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { deleteStudent, getUser } from '../../../../redux/slice/studentSlice'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import EditForm from '../CreateUser/EditForm/EditForm';


const StudentList = () => {

  const studentData = useSelector((state) => state.student.studentList)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUser())
  },[dispatch])

  const [isEditOpen , setIsEditOpen ] = useState("scale-0")
  const [selectedUser, setSelectedUser] = useState(null)

  const openEditForm = (userid) =>{
    setIsEditOpen("scale-100")
    setSelectedUser(userid)
  }

  return (
    <div className='w-full h-full py-8' >
      <div className='max-w-screen-xl mx-auto' >
        <h1 className='text-2xl border-b' >List of the students</h1>
        <div className='mt-2'>
          {studentData?.map((Element , id) => (
            <div key={id} className='flex items-center justify-between border pr-2' >
              <p className='bg-black text-white px-4 py-3' >#{Element.id}</p>
              <p>Name: {Element.FirstName} {Element.LastName}</p>
              <p>Class: {Element.Class}<sup>th</sup> </p>
              <p>Email ID: {Element.Email}</p>
              <p>Gender: {Element.Gender}</p>
              <div className='flex items-center gap-1' >

              <p onClick={() => dispatch(deleteStudent(Element.id))}  className='bg-red-600 text-white px-4 py-3' ><MdDelete/></p>
              <p onClick={() => openEditForm(Element.id)} className='bg-green-600 text-white px-4 py-3' ><FaEdit/></p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <EditForm isEditOpen = {isEditOpen} setIsEditOpen = {setIsEditOpen} selectedUser = {selectedUser} />
    </div>
  )
}

export default StudentList
