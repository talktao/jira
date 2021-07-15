import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
/* 	const [past, setPast] = useState<T[]>([]) // 历史记录
	const [present, setPresent] = useState(initialPresent)
	const [future, setFuture] = useState<T[]>([]) // 未来记录 */

	const [state, setState] = useState<{past: T[], present: T, future: T[]}>({
		past: [],
		present: initialPresent,
		future:[]
	})

	const canUndo = state.past.length !== 0  // 有历史记录, 往后跳，比如-
	const canRedo = state.future.length !== 0  // 有历史记录，往前跳，比如+

	const undo = useCallback(() => {
		setState(currentState => {
			const { past, present, future } = currentState
			
			if(past.length === 0) return currentState
			const previous = past[past.length - 1] // 最新的动作
			const newPast = past.slice(0, past.length - 1) // 排除previous的新的past记录

			return {
				past: newPast,
				present: previous,
				future: [present, ...future]
			}
		})
	},[])

	const redo = useCallback(() => {
		setState(currentState => {
			const {past, present, future } = currentState
			if(future.length === 0) return currentState
			
			const next = future[0]
			const newFuture = future.slice(1)
			
			return {
				past: [...past, present],
				present: next,
				future: newFuture
			}
		})
	},[])

	const set = useCallback((newPresent: T) => {
		setState(currentState => {
			const {past, present } = currentState
			if (newPresent === present) return currentState
			return {
				past: [...past, present],
				present: newPresent,
				future: []
			}
		})	
	},[])

	const reset = useCallback((newPresent: T) => {
		setState(() => {
			return {
				past: [],
				present: newPresent,
				future: []
			}
		})
	},[])

	return [
		state,
		{set, reset, undo, redo, canUndo, canRedo}
	]
}