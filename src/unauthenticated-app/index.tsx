import React from "react"
import { useState } from "react"
import { RegisterPage } from "./register"
import { LoginPage } from "./login"


export const UnauthenticatedApp = () => {
	const [isRegister, setIsRegister] = useState(false)
	return (
		<div>
			{isRegister ? <RegisterPage /> : <LoginPage />}
			<button onClick={()=>setIsRegister(!isRegister)}>切换到{isRegister ? '登录' : '注册'}</button>
		</div>
		
	)
}