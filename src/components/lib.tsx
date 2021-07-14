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
	<Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>

const FullPage = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const ButtonNoPadding = styled(Button)`
	padding: 0;
`