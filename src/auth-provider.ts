// 在真实环境中， 如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "pages/projectList/searchPanel"

const apiUrl = process.env.REACT_APP_API_URL;
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handelUserResponse = ({ user }: { user: User }) => {
	window.localStorage.setItem(localStorageKey, user.token || '')
	return user
}

// 登录
export const login = (data: { username: string, password: string }) => {
	return fetch(`${apiUrl}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(
		async (res) => {
			if (res.ok) {
				return handelUserResponse(await res.json())
			} else {
				return Promise.reject(data)
			}
		}
	)
}

// 注册
export const register = (data: { username: string, password: string }) => {
	return fetch(`${apiUrl}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	}).then(
		async (res) => {
			if (res.ok) {
				return handelUserResponse(await res.json())
			}else {
				return Promise.reject(data)
			}
		}
	)
}

export const logout = async () => window.localStorage.removeItem(localStorageKey)