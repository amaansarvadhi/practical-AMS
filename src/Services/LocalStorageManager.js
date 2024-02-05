export const Hospital = "hospital";
export const Department = "department";
export const Appointment = "appointment";
export const Users = "users";
export const Token = "token";

export const setItem = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = (key) => {
  localStorage.removeItem(key);
};
