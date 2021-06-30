import React, { ReactNode, useState } from 'react'
import * as auth from 'auth-provider'
import { User } from 'pages/projectList/searchPanel'
import { http } from 'utils/http'
import { useMount } from 'utils'

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
	const [user, setUser] = useState<User | null>(null)

	// point free
	const login = (form: AuthFormProps) => auth.login(form).then(setUser)
	const register = (form: AuthFormProps) => auth.register(form).then(setUser)
	const logout = () => auth.logout().then(() => setUser(null))

	// 页面加载时执行一次，调用bootstrapUser()
	useMount(() => [
		bootstrapUser().then(setUser)
	])

	return <Authcontext.Provider children={children} value={{user, login, register, logout}} />
}

export const useAuth = () => {
	const context = React.useContext(Authcontext)
	if (!context) {
		throw new Error('useAuth必须在AuthPrvider中使用')
	}
	return context
}