import React, { ReactNode } from "react";
import { AuthPrvider } from "context/auth-context"
import { QueryClient, QueryClientProvider } from "react-query"

export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<QueryClientProvider client={new QueryClient()}>
			<AuthPrvider>{children}</AuthPrvider>
		</QueryClientProvider>
	 )
}