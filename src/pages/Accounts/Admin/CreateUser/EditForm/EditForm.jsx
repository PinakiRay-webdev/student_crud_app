import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoIosCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../../../../redux/slice/studentSlice";

const EditForm = ({ isEditOpen , setIsEditOpen , selectedUser}) => {

    const student = useSelector((state) => state.student.studentList);

    const currentStudent = student?.find((user) => user.id === selectedUser)
    const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    defaultValues: {
    },
  });

  const onSubmit = (data) => {

    const updatedUser = {
        id : selectedUser,
        FirstName : data.firstName,
        LastName : data.lastName,
        Class : data.class,
        Email : data.mail
    }

    dispatch(editUser(updatedUser))
    reset();
    closeForm();
  };

  useEffect(() =>{
    if(currentStudent){
        setValue('firstName' , currentStudent?.FirstName)
        setValue('lastName' , currentStudent?.LastName)
        setValue('class' , currentStudent?.Class)
        // setValue('gender' , currentStudent?.Gender)
        setValue('mail' , currentStudent?.Email)
    }
  },[currentStudent])

  const closeForm = () =>{
        setIsEditOpen("scale-0")
  }

  return (
    <div className={`py-4 px-2 rounded-lg bg-slate-200 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ${isEditOpen} transition-all duration-150 ease-in-out h-fit`} >
      <header className="flex justify-between items-center text-xl">
        <h1 className="text-lg font-semibold">Edit the student</h1>
        <p onClick={closeForm} className="text-red-600 cursor-pointer text-2xl">
          <IoIosCloseCircle />
        </p>
      </header>
      <form
        className="grid grid-cols-2 grid-rows-3 mt-5 "
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mx-1">
          <label className="text-sm">First name</label>
          <br />
          <input
            className="border py-2 px-3 w-full rounded-lg bg-slate-50 outline-none cursor-pointer"
            type="text"
            placeholder="Jon"
            {...register("firstName", {
              required: {
                value: true,
                message: "This feild is required",
              },
            })}
          />
          {errors.firstName && (
            <p className="text-red-600 text-xs">{errors.firstName.message}</p>
          )}
        </div>
        <div className="mx-1">
          <label className="text-sm">Last name</label>
          <br />
          <input
            className="border py-2 px-3 w-full rounded-lg bg-slate-50 outline-none cursor-pointer"
            type="text"
            placeholder="e.g. Snow"
            {...register("lastName", {
              required: {
                value: true,
                message: "This feild is required",
              },
            })}
          />
          {errors.lastName && (
            <p className="text-red-600 text-xs">{errors.lastName.message}</p>
          )}
        </div>
        <div className="col-span-2 mt-2">
          <label className="text-sm">Class</label>
          <br />
          <input
            className="border py-2 px-3 w-full rounded-lg bg-slate-50 outline-none cursor-pointer"
            type="number"
            placeholder="10th"
            {...register("class", {
              required: {
                value: true,
                message: "This feild is required",
              },
              min: {
                value: 10,
                message: "Enter a value from 10 to 12",
              },
              max: 12,
              message: "Enter a value from 10 to 12",
            })}
          />
          {errors.class && (
            <p className="text-red-600 text-xs">{errors.class.message}</p>
          )}
        </div>
        {/* <div className="col-span-2 mt-2">
          <label className="text-sm">Gender</label>
          <br />
          <select
            className="border py-2 px-3 w-full rounded-lg bg-slate-50 outline-none cursor-pointer"
            {...register("gender", {
              required: {
                value: true,
                message: "This feild is required",
              },
            })}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          {errors.gender && (
            <p className="text-red-600 text-xs">{errors.gender.message}</p>
          )}
        </div> */}
        <div className="col-span-2 mt-2">
          <label className="text-sm">Email id</label>
          <br />
          <input
            className="border py-2 px-3 w-full rounded-lg bg-slate-50 outline-none cursor-pointer"
            type="email"
            placeholder="john@student.com"
            {...register("mail", {
              required: {
                value: "true",
                message: "This feild is required",
              },
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid mail",
              },
            })}
          />
          {errors.mail && (
            <p className="text-red-600 text-xs">{errors.mail.message}</p>
          )}
        </div>
        <button className="w-full text-white bg-black col-span-2 py-2 mt-5">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditForm;
