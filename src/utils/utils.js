//a wrapper to handle general function errors
function ErrHandleFn(fn, {errMsg = 'something went wrong please refresh and try again later'} = {}) {
    return async function(...args) {
      try {
        return await fn(...args);
      } catch (error) {
        throw new Error(errMsg);
      }
  };
}

//a function to parse forms without onChange or ref
const parseForm = (e) => {
  const formData = new FormData(e.target);
  
  let obj = {}
  for (const [name, value] of formData.entries()) {
      obj[name] = value
  }
  return obj
};

//get the errors of the yup validation
const getFormErrors = (err) => {
  let obj = {}
    err.inner.forEach((error) => {
      err.inner.forEach((error) => {
          obj[error.path] = error.message
      })
  })
  return obj
}

//calculate the average not using toFixed(2) since it rounds
const calcAvg = (obj) => {
  let sum = 0
  for(let i = 0; i < obj.length; i++) {
    sum += obj[i].cost
  }
  let avgStr = (sum / obj.length).toString()
  if(avgStr.includes('.')) avgStr = avgStr.slice(0, avgStr.indexOf('.') + 3)
  return avgStr
}


export {ErrHandleFn, parseForm, getFormErrors, calcAvg}