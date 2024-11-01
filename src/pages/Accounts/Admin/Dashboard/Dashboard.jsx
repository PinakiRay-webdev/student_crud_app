import React from "react";
import CreateUser from "../CreateUser/CreateUser";
import StudentList from "../StudentList/StudentList";
import Chat from "../../../Chat/Chat";
const Dashboard = () => {
  return (
    <div className="w-full h-full py-4">
        <div className="max-w-screen-xl mx-auto h-[85vh]">
        <CreateUser />
        <StudentList/>
        <Chat/>
      </div>
    </div>
  );
};

export default Dashboard;
