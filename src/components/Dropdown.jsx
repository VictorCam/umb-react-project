import {useEffect, useState} from 'react'
import {getCodesApi} from '../api/apis'
import ApiError from '../components/ApiError'
import AvgCost from '../components/AvgCost'
import { FormControl, InputLabel, MenuItem, Select, ThemeProvider } from '@mui/material'
import {MenuItemOverride, SelectOverride} from '../styles/overrides'
import {theme} from '../styles/theme'

function DropDown() {
    let [codes, setCodes] = useState([])
    let [err, setErr] = useState(null)
    const [openModal, setOpenModal] = useState(true);
    let [selected, setSelected] = useState('')

    useEffect(() => {
        getCodesApi()
        .then((data) => setCodes(data))
        .catch((err) => setErr(err.message))
    }, [])

  
return (
    <ThemeProvider theme={theme}>
        {err && (<ApiError message={err} open={openModal} onClose={() => setOpenModal(false)} />)}

        <form>
            <FormControl variant="standard">
                <InputLabel id="code-label">Choose CPT code</InputLabel>
                <Select sx={SelectOverride} labelId="code-label" value={selected} onChange={(e) => setSelected(e.target.value)}>
                <MenuItem sx={MenuItemOverride} value={''} disabled>Select an option</MenuItem>
                {!err ? (
                    codes.map((item) => (
                    <MenuItem sx={MenuItemOverride} key={item.id} value={item.id} aria-details={item.description}>{item.code} - {item.description}</MenuItem>
                ))) : (<MenuItem style={MenuItemOverride} disabled>Error: {err}</MenuItem>)}
                </Select>
            </FormControl>
        </form>

        {selected && (<AvgCost code={selected}></AvgCost>)}
    </ThemeProvider>
)
}

export default DropDown