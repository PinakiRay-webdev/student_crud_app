import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { createUser } from "../../../../../redux/slice/studentSlice";
const AddForm = ({ isAddFormOpen, setIsAddFormOpen }) => {

  const closeForm = () => {
    setIsAddFormOpen("scale-0");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues : {
      gender : "",
    }
  });

  const dispatch = useDispatch();

  const delay = () =>{
    return new Promise((resolve) =>{
      setTimeout(() => {
        resolve()
      }, 15000);
    })
  }

  const onSubmit = (data) => {
    const newUser = {
      FirstName : data.firstName,
      LastName : data.lastName,
      Class : data.class,
      Gender : data.gender,
      Email : data.mail,
      Password : data.password
    }

    

    dispatch(createUser(newUser))

    reset();
    closeForm()

  };

  return (
    <div
      className={`py-4 px-2 rounded-lg bg-slate-200 absolute top-[50%] left-[50%] ${isAddFormOpen} translate-x-[-50%] translate-y-[-50%] w-[25vw]  transition-all duration-150 ease-in-out`}
    >
      <header className="flex justify-between items-center text-xl">
        <h1 className="text-lg font-semibold">Add a new student</h1>
        <p onClick={closeForm} className="text-red-600 cursor-pointer text-2xl">
          <IoIosCloseCircle />
        </p>
      </header>
      <form
        className="grid grid-cols-2 grid-rows-5 mt-5 "
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
        <div className="col-span-2 mt-2">
          <label className="text-sm">Gender</label>
          <br />
          <select
            className="border py-2 px-3 w-full rounded-lg bg-slate-50 outline-none cursor-pointer"
            {...register("gender" , {
              required:{
                value : true,
                message : "This feild is required"
              }
            })}
          >
            <option>Male</option>
            <option>Female</option>
          </select>
          {errors.gender && <p className="text-red-600 text-xs" >{errors.gender.message}</p>}

        </div>
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
        <div className="col-span-2 mt-2">
          <label className="text-sm">Password</label>
          <br />
          <input
            className="border py-2 px-3 w-full rounded-lg bg-slate-50 outline-none cursor-pointer"
            type="email"
            placeholder="Atleast 8 characters"
            {...register("password", {
              required: {
                value: true,
                message: "This feild is required",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Enter a strong password",
              },
            })}
          />
          {errors.password && <p className="text-red-600 text-xs" >{errors.password.message}</p>}

        </div>

        <button className="w-full text-white bg-black col-span-2 py-2 mt-5">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddForm;
