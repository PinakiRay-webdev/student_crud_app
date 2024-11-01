import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import loginbg from "./Assets/loginbg.jpg";
import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slice/studentSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const delay = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1500);
    });
  };

  const user = useSelector((state) => state.student.studentList)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getUser())
  },[dispatch])




  const navigate = useNavigate();

  const onSubmit = (data) => {

    const validUser = user.find((e) => e.Email === data.usermail && e.Password === data.userpass)
    
    //checking authentication for admin
    if (
      data.usermail === import.meta.env.VITE_ADMIN_MAIL &&
      data.userpass === import.meta.env.VITE_ADMIN_PASS
    ) {
      toast.promise(
        delay,
        {
          pending: "Login to your account",
          success: "Admin logged in successfully",
          error: "Unable to login",
        },
        { theme: "dark" }
      );

      localStorage.setItem(
        "adminCredentials",
        JSON.stringify({
          mail: "sankar@admin.com",
          role: "admin",
        })
      );

      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2200);

      //checking for the student

    } else if(validUser){
      toast.promise(delay , {
        pending : "Logging...",
        success : "Student logged in successfully",
        error : "Invalid mail"
      } , {theme : "dark"})

      setTimeout(() => {
        navigate("/student/dashboard")
      }, 2200);

      localStorage.setItem("studentCredentials" , JSON.stringify({
        mail : data.usermail,
        role : "student"
      }))

    }
    else {
      toast.error("Login failed", { theme: "dark" });
    }
  };

  let date = new Date();
  let year = date.getFullYear();

  const [togglePass, setTogglePass] = useState(false);

  const handlePassView = () => {
    setTogglePass(!togglePass);
  };
  return (
    <div className="w-full h-fit px-5 flex justify-between items-center relative">
      {/* login form section  */}
      <div className="flex items-center justify-center w-[60vw]">
        <div>
          <h1 className="text-5xl font-semibold">Welcome back</h1>
          <p className="opacity-70 text-sm font-medium py-5">
            Today is the new day. It's your day. You shape it. <br /> Sign in to
            start managing your workflows
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="text-sm opacity-80">Email</label>
            <br />
            <input
              className="border py-2 px-3 w-full my-2 rounded-lg bg-slate-50 outline-none cursor-pointer"
              type="email"
              placeholder="Example@email.com"
              {...register("usermail", {
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
            {errors.usermail && (
              <p className="text-sm text-red-600">{errors.usermail.message}</p>
            )}
            <br />
            <label className="text-sm opacity-80">Password</label>
            <br />
            <div className="border py-2 px-3 w-full my-2 rounded-lg bg-slate-50 outline-none cursor-pointer focus:ring-1 flex items-center justify-between gap-3">
              <input
                className="w-full outline-none bg-transparent cursor-pointer"
                type={togglePass ? "text" : "password"}
                placeholder="Atleast 8 characters"
                {...register("userpass", {
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
              <br />
              <p onClick={handlePassView} className="text-xl cursor-pointer">
                {togglePass ? <RxEyeOpen /> : <RxEyeClosed />}
              </p>
            </div>
            {errors.userpass && (
              <p className="text-sm text-red-600">{errors.userpass.message}</p>
            )}
            <button className="w-full text-white bg-indigo-950 py-2 rounded-lg mt-8">
              Log in
            </button>
          </form>
        </div>
        <footer className="absolute bottom-7 opacity-60 text-xs font-bold">
          <p>{year} all rights reserved</p>
        </footer>
      </div>

      {/* login bg section  */}
      <div className="object-cover h-[100vh] py-4 w-[40vw]">
        <img className="w-full h-full rounded-md" src={loginbg} alt="" />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
