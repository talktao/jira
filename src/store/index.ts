import { configureStore } from "@reduxjs/toolkit"
import { projectListSlice } from "pages/projectList/projectListSlice"
import { authSlice } from "./authSlice"

export const rootReducer = {
	projectList: projectListSlice.reducer,
	auth: authSlice.reducer
}

export const store = configureStore({
	reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>