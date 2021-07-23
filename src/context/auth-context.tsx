import React, { ReactNode } from 'react'
import * as auth from 'auth-provider'
import { User } from "types/User"
import { http } from 'utils/http'
import { useMount } from 'utils'
import { useAsync } from 'utils/use-async'
import { FullPageError, FullPageLoading } from 'components/lib'
import { useQueryClient } from 'react-query'

const Authcontext = React.createContext<{
	user: User | null,
	register: (form: AuthFormProps) => Promise<void>,
	login: (form: AuthFormProps) => Promise<void>,
	logout: () => Promise<void>,
} | undefined>(undefined)

Authcontext.displayName = 'AuthContext'

interface AuthFormProps {
	username: string,
	password: string
}

// 启动初始化user
const bootstrapUser = async() => {
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
	const { data: user, isError, error, isLoading, isIdle, run, setData: setUser} = useAsync<User | null>()
	const queryClient = useQueryClient()

	// point free
	const login = (form: AuthFormProps) => auth.login(form).then(setUser)
	const register = (form: AuthFormProps) => auth.register(form).then(setUser)
	const logout = () => auth.logout().then(() => {
			setUser(null)
			queryClient.clear()
	})

	// 页面加载时执行一次，调用bootstrapUser()
	useMount(() => [
		run(bootstrapUser())
	])

	// 如果页面第一次加载或者正在加载中是显示loading组件
	if (isIdle || isLoading) {
		return <FullPageLoading />
	}

	// 页面发生错误时
	if (isError) {
		return <FullPageError error={error} />
	}

	return <Authcontext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
	const context = React.useContext(Authcontext)
	if (!context) {
		throw new Error('useAuth必须在AuthPrvider中使用')
	}
	return context
}