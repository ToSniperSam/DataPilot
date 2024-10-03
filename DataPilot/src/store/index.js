import {configureStore} from '@reduxjs/toolkit'
import TabReducer from './reducer/tab'

export default configureStore({
    reducer:{
        tab:TabReducer
    }
})