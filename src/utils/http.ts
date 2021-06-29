import qs from "qs";
import * as auth from 'auth-provider'
import { rejects } from "assert";
import { useAuth } from "context/auth-context";

// 获取接口
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
	token?: string,
	data?: object
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
	const config = {
		method: 'GET',
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
			'Content-Type': data ? 'application/json' : ''
		},
		...customConfig
	}
	if (config.method.toUpperCase() === 'GET') {
		endpoint += `?${qs.stringify(data)}`
	} else {
		config.body = JSON.stringify(data || {})
	}


	// axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
	return window.fetch(`${apiUrl}/${endpoint}`, config)
		.then(async res => {
			if (res.status === 401) {
				await auth.logout()
				window.location.reload()
				return Promise.reject({message: '请重新登录'})
			}
			const data = await res.json()
			if (res.ok) {
				return data
			} else {
				return Promise.reject(data)
			}
	})
}

// 自动携带token的方法
export const useHttp = () => {
	const { user } = useAuth()
	// TODO ts操作符
	return (...[endpoint, config]: Parameters<typeof http>) => http(endpoint, { ...config, token: user?.token })
}