// 排除value为0的情况
export const isFalsy = (value) => value === 0 ? false : !value

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
	if (!object) {
    return {};
  }
	const result = { ...object }
	Object.keys(result).forEach(key => {
		//将对象key所对应的值赋值给value
		const value = result[key]
		// 0
		if (isFalsy(value)) {
			delete result[key]
		}
	})
	return result
}