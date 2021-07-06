import React from 'react'
import { Select } from 'antd'
import { Raw } from 'type'

// 定义一个SelectProps类型，用于存储Antd下Select组件上的各属性类型
type SelectProps = React.ComponentProps<typeof Select>

// Omit<typeProps（类型），'需要删除当前类型下的属性'>
interface IdSelectProps extends Omit<SelectProps, 'value' | 'onChange' | 'options'> {
	value: Raw | null | undefined,
	// value值变化时的方法
	onChange: (value?: number) => void,
	// 默认值，空值
	defaultOptionName?: string,
	options?: {name: string, id: number}[]
}
/**
 * value 可传入多种类型的值
 * onChange只会回调number|undefined 类型
 * 当 isNaN(Number(value)) 为true的时候， 代表选择默认类型
 * 当选择默认类型的时候，onChange会回调undefined
 */
export const IdSelect = (props: IdSelectProps) => {
	// ...restProps代表用户传入的其他属性值
	const { value, onChange, defaultOptionName, options, ...restProps } = props
	return (
		<Select
			value={options?.length ? toNumber(value) : 0}
			onChange={value => onChange(toNumber(value) || undefined)} // 当value经过toNumber转换后不为零的话返回toNumber(value)，为零时返回undefined
			{...restProps}
		>
			{
				defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null
			}
			{
				options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
			}
			
		</Select>
	)
}

// 当Number转换值不为数值时显示默认值
const toNumber = (value: unknown) => isNaN(Number(value)) ? 0 : Number(value)