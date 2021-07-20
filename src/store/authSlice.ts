/**
 * auth的状态切片
 * login: 登录
 * register: 注册
 * logout: 登出
 * bootstrap: 初始化user
 */
import { createSlice } from "@reduxjs/toolkit";
import { User } from "pages/projectList/searchPanel";
import * as auth from 'auth-provider'
import { AuthFormProps, bootstrapUser } from "context/auth-context";
import { AppDispatch, RootState } from "store";

interface State {
	user: User | null
}

const initialState: State = {
	user: null
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser(state, action) {
			state.user = action.payload
		}
	}
})

const { setUser } = authSlice.actions

export const selectUser = (state: RootState) => state.auth.user

export const login = (form: AuthFormProps) => (dispatch: AppDispatch) => auth.login(form).then( user => dispatch(setUser(user)))
export const register = (form: AuthFormProps) => (dispatch: AppDispatch) => auth.register(form).then(user => dispatch(setUser(user)))
export const logout = () => (dispatch: AppDispatch) => auth.logout().then(() => dispatch(setUser(null)))
export const bootstrap = ()=>(dispatch: AppDispatch) => bootstrapUser().then(user=>dispatch(setUser(user)))