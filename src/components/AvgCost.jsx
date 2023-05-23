import { useEffect, useState } from 'react'
import {setCodesApi, getAvgApi} from '../api/apis'
import { TextField, Box, Button, Typography, FormHelperText } from '@mui/material'
import {formHelperOverride, costOverride, TextFieldOverride, ButtonOverride} from '../styles/overrides'
import {parseForm, calcAvg, getFormErrors} from '../utils/utils'
import * as yup from 'yup'

function AvgCost({code}) {
  let [avg, setAvg] = useState([])
  let [err, setErr] = useState(null)
  let [submitted, setSubmitted] = useState(null)
  let [formErr, setFormErr] = useState(false)

  useEffect(() => {
      getAvgApi(code)
      .then((data) => calcAvg(data))
      .then((avgCost) => setAvg(avgCost))
      .catch((err) => setErr(err.message))
  }, [submitted, code])

  const saveData = (async (e) => {
    e.preventDefault()
    let obj = parseForm(e)
    let exit = 0

    const schema = yup.object().shape({
        cost: yup.number().typeError('Cost must be a number').min(0, 'Cost cannot be negative').test('maxDigits', 'Cost cannot exceed 5 characters', (value) => value.toString().length <= 5).required('Cost is required'),
        facilityType: yup.string().max(50, 'Facility Type cannot exceed 50 characters').required('Facility Type is required').strict(true),
        copay: yup.number().typeError('CoPay must be a number').min(0, 'Copay cannot be negative').test('maxDigits', 'Copay cannot exceed 5 characters', (value) => value.toString().length <= 5).required('Copay is required'),
    })

    exit = await schema.validate(obj, {abortEarly: false})
    .then((clean) => obj = clean)
    .then(() => 0)
    .catch((err) => {
      setSubmitted(null)
      setFormErr(getFormErrors(err))
      return 1
    })
    
    if(exit) return
    setFormErr('')

    exit = await setCodesApi(code, obj)
    .then(() => 0)
    .catch((err) => {
      setErr(err.message)
      return 1
    })

    if(exit) return
    setErr(null)
    e.target.reset()
    setSubmitted('successfully submitted form')
})

  return (
    <>
      <Typography sx={costOverride}>The current selected CPT code's Average Cost is: {avg}</Typography>
      <form onSubmit={saveData}>
          <Typography variant="h5" sx={{textDecoration: 'underline', marginTop: 5}}>Enter Cost Submission</Typography> 
          <Box  display="flex" flexDirection="column" alignItems="center" gap="30px" margin="20px auto"> 
              <TextField helperText={formErr.cost} error={Boolean(formErr.cost)} name="cost" id="cost" label="Cost" variant="outlined" sx={TextFieldOverride} />
              <TextField helperText={formErr.facilityType} error={Boolean(formErr.facilityType)} name="facilityType" id="type" label="Facility Type" variant="outlined" sx={TextFieldOverride} />
              <TextField helperText={formErr.copay} error={Boolean(formErr.copay)} name="copay" id="copay" label="Copay" variant="outlined" sx={TextFieldOverride} />
              <Button variant="contained"  sx={ButtonOverride} type="submit">Submit</Button>
          </Box>
      </form>
      <FormHelperText sx={formHelperOverride}>{formErr && 'There was some issues with your form'}</FormHelperText>
      <FormHelperText sx={formHelperOverride}>{submitted && 'Your form has been successfully submitted'}</FormHelperText>
    </>
  )
}

export default AvgCost
