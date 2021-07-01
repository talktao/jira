import { useAuth } from 'context/auth-context'
import React from 'react'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
export const RegisterPage = () => {

	const { register } = useAuth()
	
	// HTMLFormElement extends Element
	const handleSumbit = (values: {username: string, password: string}) => {
		register(values)
	}
	return (
		<Form onFinish={handleSumbit}>
			<Form.Item name={'username'} rules={[{required: true, message:'请输入用户名'}]}>
				<Input placeholder={'用户名'} type="text" id={'username'}/>
			</Form.Item>
			<Form.Item name={'password'} rules={[{required: true, message:'请输入密码'}]}>
				<Input placeholder={'密码'} type="password" id={'password'}/>
			</Form.Item>
			<Form.Item>
				<LongButton htmlType={'submit'} type={"primary"}>注册</LongButton>
			</Form.Item>
			
		</Form>
	)
}
