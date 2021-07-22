import React, { ReactNode } from "react";
import { AuthPrvider } from "context/auth-context"
import { QueryClient, QueryClientProvider } from "react-query"

export const AppProviders = ({ children }: { children: ReactNode }) => {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<AuthPrvider>{children}</AuthPrvider>
		</QueryClientProvider>
	 )
}