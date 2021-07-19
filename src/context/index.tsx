import React, { ReactNode } from "react";
import { AuthPrvider } from "context/auth-context"
import { QueryClient, QueryClientProvider } from "react-query"
import { Provider } from "react-redux";
import { store } from "store";

export const AppProviders = ({ children }: { children: ReactNode }) => {
	return (
		<Provider store={store}>
			<QueryClientProvider client={new QueryClient()}>
				<AuthPrvider>{children}</AuthPrvider>
			</QueryClientProvider>
		</Provider>
	 )
}