import { useCallback, useReducer, useState } from "react"

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
	past: T[],
	present: T,
	future: T[]
}

type Action<T> = {newPresent?: T, type: typeof UNDO | typeof REDO | typeof SET | typeof RESET} 

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
	const { past, present, future } = state
	const {  newPresent } = action
	
	switch (action.type) {
		case UNDO: {
			if (past.length === 0) return state
			
			const previous = past[past.length - 1] // 最新的动作
			const newPast = past.slice(0, past.length - 1) // 排除previous的新的past记录

			return {
				past: newPast,
				present: previous,
				future: [present, ...future]
			}
		}
		case REDO: {
			if(future.length === 0) return state
			
			const next = future[0]
			const newFuture = future.slice(1)
			
			return {
				past: [...past, present],
				present: next,
				future: newFuture
			}
		}
		case SET: {
			if (newPresent === present) return state
			return {
				past: [...past, present],
				present: newPresent,
				future: []
			}	
		}
		case RESET: {
			return {
				past: [],
				present: newPresent,
				future: []
			}
		}
	}
}

export const useUndo = <T>(initialPresent: T) => {
	const [state, dispatch] = useReducer(undoReducer, {
		past: [],
		present: initialPresent,
		future:[]
	 } as State<T>)

	// const [state, setState] = useState<{past: T[], present: T, future: T[]}>({   // 定义多个useState合并到一个state中
	// 	past: [],
	// 	present: initialPresent,
	// 	future:[]
	// })

	const canUndo = state.past.length !== 0  // 有历史记录, 往后跳，比如-
	const canRedo = state.future.length !== 0  // 有历史记录，往前跳，比如+

	const undo = useCallback(() => dispatch({type: UNDO}),[])

	const redo = useCallback(() => dispatch({type: REDO}),[])

	const set = useCallback((newPresent: T) => dispatch({type: SET, newPresent}),[])

	const reset = useCallback((newPresent: T) => dispatch({type: RESET, newPresent}),[])

	return [
		state,
		{set, reset, undo, redo, canUndo, canRedo}
	]
}