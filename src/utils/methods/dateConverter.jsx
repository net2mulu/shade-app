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
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const convertTime = (date) => {
  if (date) {
    return moment(date).format("h:mm a");
  }
};

export const formatDateToYYYYMMDD = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

export const generatePastMonths = (count) => {
  const months = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const start = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const end = new Date(today.getFullYear(), today.getMonth() - i + 1, 1);
    months.push({
      start_date: start.toISOString().slice(0, 10), // Format as YYYY-MM-DD
      end_date: end.toISOString().slice(0, 10),
      label: start.toLocaleString("default", {
        month: "short"
      }), 
    });
  }

  return months.reverse();
};
