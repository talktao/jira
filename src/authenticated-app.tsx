import React from "react"
import { ProjectListPage } from "pages/projectList"
import { useAuth } from "context/auth-context"

export const AuthenticatedApp = () => {
	const { logout } = useAuth()
	return (
		<div>
			<button onClick={logout}>登出</button>
			<ProjectListPage />
		</div>
	)
}