import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { ErrorBox } from "components/lib";
import useForm from "antd/lib/form/hooks/useForm";
import styled from "@emotion/styled";



export const ProjectModal = () => {
	const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
	const useMutateProject = editingProject ? useEditProject : useAddProject

	const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())
	const [form] = useForm()
	const onFinish = (values: any) => {
		mutateAsync({...editingProject, ...values}).then(() => {
			form.resetFields() // 重置表单
			close()
		})
	}

	const title = editingProject ? '编辑项目' : '创建项目'

	// 当editingProject编辑或者form表单改变时，重置表单
	useEffect(() => {
		form.setFieldsValue(editingProject)
	}, [editingProject, form])

	return (
		<Drawer forceRender={true} onClose={close} visible={projectModalOpen} width={'100%'}>
			<Container>
				{
					isLoading ? <Spin size={'large'} />
										: <>
												<h1>{title}</h1>
												<ErrorBox error={error} />
												<Form form={form} layout={'vertical'} style={{ width: '40rem' }} onFinish={onFinish}>
													<Form.Item label={'名称'} name={'name'} rules={[{required: true, message: '请输入项目名称'}]}>
														<Input placeholder={'请输入项目名称'} />
													</Form.Item>
													<Form.Item label={'部门'} name={'organization'} rules={[{required: true, message: '请输入部门名称'}]}>
														<Input placeholder={'请输入部门名称'} />
													</Form.Item>
													<Form.Item label={'负责人'} name={'personId'} >
														<UserSelect defaultOptionName={'负责人'}/>
													</Form.Item>
													<Form.Item style={{textAlign: 'right'}}>
														<Button loading={mutateLoading} type={'primary'} htmlType={'submit'}>提交</Button>
													</Form.Item>
												</Form>
											</>
				}
			</Container>
		</Drawer>
	)
}

const Container = styled.div`
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`