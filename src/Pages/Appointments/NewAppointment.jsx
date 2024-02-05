import React, { useEffect, useState } from "react";
import { Button, DatePicker, Select, TimePicker } from "antd";
import {
  Appointment,
  Department,
  Hospital,
  Token,
  getItem,
  setItem,
} from "../../Services/LocalStorageManager";
import { useLocation, useNavigate } from "react-router-dom";

const NewAppointment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [formValues, setFormValues] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const handleSubmit = () => {
    const appointments = getItem(Appointment);

    if (
      !formValues?.Hospital_name ||
      !formValues?.Department_name ||
      !formValues?.Appointment_date ||
      !formValues?.Appointment_time
    ) {
      alert("Each field is required !");
      return;
    }

    const newAppointment = {
      ...formValues,
      key: appointments?.length ? appointments.length + 1 : 1,
      Appointment_id: appointments?.length ? appointments.length + 1 : 1,
      User_email: getItem(Token).email,
      Is_delete: false,
      Created_at: new Date(),
    };

    if (location.search) {
      const newList =
        appointments.filter(
          (ele, i) => ele.Appointment_id !== location.state.Appointment_id
        ) || [];
      setItem(Appointment, [...newList, newAppointment]);
    } else {
      const sameAppointment = appointments?.find(
        (ele, i) => ele.Appointment_date === formValues.Appointment_date
      );
      if (sameAppointment) {
        console.log(sameAppointment);
        alert(
          `but chief we have another appointment on this date at ${sameAppointment.Appointment_time}`
        );
        return;
      }

      setItem(
        Appointment,
        appointments?.length
          ? [...appointments, newAppointment]
          : [newAppointment]
      );
    }
    navigate("/");
  };

  useEffect(() => {
    const hospitalList = getItem(Hospital);
    if (!hospitalList) {
      alert("hospitals not found");
      return;
    }
    let temp = [];
    hospitalList?.forEach((item, i) => {
      !item.Is_delete &&
        temp.push({
          id: item?.Hospital_id,
          value: item.Hospital_name,
          label: item.Hospital_name,
        });
    });
    setHospitals(temp);

    if (location?.search && location.state) {
      setFormValues(location.state);
      setDisabled(true);
    }
  }, []);

  useEffect(() => {
    if (!formValues?.Hospital_name) {
      return;
    }
    const departmentsList = getItem(Department);
    if (!departmentsList) {
      alert("deparments not found");
      return;
    }
    let temp = [];

    const dept = departmentsList.filter(
      (ele, i) => ele?.Hospital_id === formValues?.Hospital_id
    );
    dept?.forEach((item, i) => {
      !item.Is_delete &&
        temp.push({
          id: item?.Department_id,
          value: item.Department_name,
          label: item.Department_name,
        });
    });
    setDepartments(temp);
  }, [formValues?.Hospital_name]);

  return (
    <>
      <div className="container">
        <div className="newAppointment_inside">
          <div>
            <label htmlFor="hospital_name">Hospital Name</label>
            <Select
              placeholder="Select Hospital"
              onChange={(e) => {
                const hid = hospitals.find((ele, i) => ele.value === e);
                setFormValues({
                  ...formValues,
                  Hospital_name: e,
                  Hospital_id: hid.id,
                  Department_name: "",
                  Department_id: "",
                });
              }}
              options={hospitals}
              value={formValues?.Hospital_name}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label htmlFor="department_name">Department Name</label>
            <Select
              placeholder="Select Hospital"
              onChange={(e) => {
                const did = departments.find((ele, i) => ele.value === e);
                setFormValues({
                  ...formValues,
                  Department_name: e,
                  Department_id: did.id,
                });
              }}
              options={departments}
              value={formValues?.Department_name}
              style={{ width: "100%" }}
            />
          </div>
          {location?.search && (
            <div>
              <label htmlFor="datetime"> Want to Change Date time ?</label>
              <input
                type="checkbox"
                id="datetime"
                onClick={() => setDisabled(false)}
              />
            </div>
          )}
          <div>
            <label htmlFor="appointment_date">Appointment Date</label>
            <br />
            <DatePicker
              onChange={(date, dateString) =>
                setFormValues({ ...formValues, Appointment_date: dateString })
              }
              id="appointment_date"
              style={{ width: "100%" }}
              disabled={disabled}
            />
          </div>

          <div>
            <label htmlFor="appointment_time">Appointment Time</label>
            <br />
            <TimePicker
              onChange={(time, timeString) =>
                setFormValues({ ...formValues, Appointment_time: timeString })
              }
              id="appointment_time"
              style={{ width: "100%" }}
              disabled={disabled}
            />
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewAppointment;
