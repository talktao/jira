import React, { ReactNode, useCallback } from 'react'
import * as auth from 'auth-provider'
import { User } from 'pages/projectList/searchPanel'
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageError, FullPageLoading } from 'components/lib'
import * as authStore from 'store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { bootstrap, selectUser } from 'store/authSlice'

export interface AuthFormProps {
	username: string,
	password: string
}

// 启动初始化user
export const bootstrapUser = async() => {
	let user = null
	// 从localStorage中找到token
	const token = auth.getToken()
	if (token) {
		const data = await http('me', { token })
		user = data.user
	}
	return user
}

export const AuthPrvider = ({ children }: { children: ReactNode }) => {
	const { isError, error, isLoading, isIdle, run } = useAsync<User | null>()
	const dispatch:(...args: unknown[])=>Promise<User> = useDispatch()
	// const [user, setUser] = useState<User | null>(null)

	// 页面加载时执行一次，调用bootstrapUser()
	useMount(() => [
		run(dispatch(bootstrap()))
	])

	// 如果页面第一次加载或者正在加载中是显示loading组件
	if (isIdle || isLoading) {
		return <FullPageLoading />
	}

	// 页面发生错误时
	if (isError) {
		return <FullPageError error={error} />
	}

	return <>{children}</>
}

export const useAuth = () => {
	const dispatch: (...args: unknown[])=>Promise<User> = useDispatch()
	const user = useSelector(selectUser)
	const login = useCallback((form: AuthFormProps) => dispatch(authStore.login(form)),[dispatch])
	const register = useCallback((form: AuthFormProps) => dispatch(authStore.register(form)),[dispatch])
	const logout = useCallback(() => dispatch(authStore.logout()), [dispatch])
	return {
		user,
		login,
		register,
		logout
	}
}