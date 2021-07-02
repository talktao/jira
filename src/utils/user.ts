import { User } from "pages/projectList/searchPanel";
import { useEffect } from "react";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUsers = (param?: Partial<User>) => {
	const client = useHttp()
	const { run, ...result} = useAsync<User[]>()

	// 当param改变时获取列表
	useEffect(() => {
		run(client('users', { data: cleanObject(param || {})}))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [param])
	return result
}