import { useContext } from 'react'
import { LabDataContext } from '../utils/labsystem'

const useLabData = () => {
    return useContext(LabDataContext)
} 

export default useLabData