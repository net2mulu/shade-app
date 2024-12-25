export const transformObject = (input) => {
    const result = {};
  
    for (const key in input) {
      if (typeof input[key] === "object" && input[key] !== null && "value" in input[key]) {
        result[key] = input[key].value; 
      } else {
        result[key] = input[key]; 
      }
    }
  
    return result;
  }