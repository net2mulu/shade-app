import moment from "moment";

export const convertDate = (date) => {
  // convert date timestamp to readable
  if (date) {
    const _newDate = moment(date).format("MMMM Do, YYYY"); //h:mm:ss A
    return _newDate;
  }
};

export const formatDateString = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}


export const convertTime = (date) => {
  if (date) {
    return moment(date).format("h:mm a");
  }
};

export const formatDateToYYYYMMDD = (dateString) => {
 
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Extract YYYY-MM-DD
};
