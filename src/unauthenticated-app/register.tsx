import { useAuth } from 'context/auth-context'
import React, { FormEvent } from 'react'
export const RegisterPage = () => {

	const {register, user} = useAuth()
	
	// HTMLFormElement extends Element
	const handleSumbit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const username = (event.currentTarget.elements[0] as HTMLInputElement).value
		const password = (event.currentTarget.elements[1] as HTMLInputElement).value
		register({username, password})
	}
	return (
		<form onSubmit={handleSumbit}>
			<div>
				<label htmlFor="useName">用户名</label>
				<input type="text" id={'username'}/>
			</div>
			<div>
				<label htmlFor="password">密码</label>
				<input type="password" id={'password'}/>
			</div>
			<button type={"submit"}>注册</button>
		</form>
	)
}