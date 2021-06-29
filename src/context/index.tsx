import React, { ReactNode } from "react";
import { AuthPrvider } from "context/auth-context"

export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<AuthPrvider>
			{children}
		</AuthPrvider>
	 )
}