import { configureStore } from '@reduxjs/toolkit'
import chipSlice from './slices/chipSlice'


export default configureStore({
    reducer: {
        chip: chipSlice
    }
})