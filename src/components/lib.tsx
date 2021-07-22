import React from 'react';
import styled from "@emotion/styled";
import { Button, Spin, Typography } from 'antd';
import { DevTools } from 'jira-dev-tool';
// import { Typography } from "antd";

type RowProps = {
	gap?: number | boolean,
	between?: boolean,
	marginBottom?: number,
}

export const Row = styled.div<RowProps>`
	display: flex;
	align-items: center;
	justify-content: ${props => props.between ? 'space-between' : undefined};
	margin-bottom: ${props => props.marginBottom + 'rem'};
	> * {
		margin-top: 0 !important;
		margin-bottom: 0 !important;
		margin-right: ${props => typeof props.gap === 'number' ? props.gap + 'rem' : props.gap ? '2rem' : undefined};
	}
`
// 页面初次加载时的loading
export const FullPageLoading = () => <FullPage><Spin tip="Loading..." size={'large'}></Spin></FullPage>

// 页面发生错误时返回的错误信息
export const FullPageError = ({ error }: { error: Error | null }) => <FullPage>
	<DevTools />
	<ErrorBox error={error} />
</FullPage>

// 类型守卫, 解决error类型为unknown的场景
const isError = (value: any): value is Error => value?.message

// 自定义Error组件，给定任意类型，只有是在真正报错误信息的情况下才显示error.message
export const ErrorBox = ({ error }: { error: unknown }) => {
	if (isError(error)) {
		return <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
	}
	return null
}

const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const ButtonNoPadding = styled(Button)`
	padding: 0;
`