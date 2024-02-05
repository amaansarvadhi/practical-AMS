import { Button, Table } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Appointment, Token, deleteItem, getItem, setItem } from "../../Services/LocalStorageManager";

const Appointments = () => {
  const [data, setdata] = useState([])
  const navigate = useNavigate()

  const handleDelete=(record)=>{
    const updatedData = data.filter((ele,i)=>ele.Appointment_id !== record.Appointment_id);
    setItem(Appointment,updatedData )
    setdata(updatedData)
  }
  
  const columns = [
    {
      title: "Hospital Name",
      dataIndex: "Hospital_name",
      sorter: (a, b) => a.Hospital_name.localeCompare(b.Hospital_name),
    },
    {
      title: "Department Name",
      dataIndex: "Department_name",
      sorter: (a, b) => a.Department_name.localeCompare(b.Department_name),
    },
    {
      title: "Appointment Date",
      dataIndex: "Appointment_date",
      sorter: (a, b) =>new Date(a.Appointment_date) - new Date(b.Appointment_date),
    },
    {
      title: "Appointment Time",
      dataIndex: "Appointment_time",
    },
    {
      title:"Action",
      render: (data)=>{
        return(
          <>
          <Button type="link" onClick={()=>handleDelete(data)} >Delete</Button>
          <Button type="link" onClick={()=>navigate('/newAppointment?edit=true', {state:data})} >Edit</Button>
          </>
        )
      }
    }
  ];

  
  useState(()=>{
    setdata(getItem(Appointment))
  },[])

  const handleLogout=()=>{
    deleteItem(Token)
    window.location.reload()
  }

  return (
    <>
    <div className="appointments_container">
      <h1>Hello Chief, check out your appointments !</h1>
      <div>
      <Button type="primary" danger onClick={handleLogout}>
        Logout
      </Button><br/><br/>
      <Button type="primary" onClick={()=> navigate("/newAppointment") }>
        Add New Appointment
      </Button>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
    </>
  );
};

export default Appointments;
