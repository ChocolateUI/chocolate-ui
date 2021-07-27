import { Key } from "../interface"
import { DataEntity } from "../tree"

interface ConductReturnType {
	checkedKeys: Key[]
	halfCheckedKeys: Key[]
}

function removeFromCheckedKeys(
	halfCheckedKeys: Set<Key>,
	checkedKeys: Set<Key>
) {
	const filteredKeys = new Set<Key>()
	halfCheckedKeys.forEach((key) => {
		if (!checkedKeys.has(key)) {
			filteredKeys.add(key)
		}
	})
	return filteredKeys
}

const executeCheck = (
	keyList: Key[],
	checked: true | { checked: false; halfCheckedKeys: Key[] },
	keyEntities: Record<Key, DataEntity>,
	isLeaf?: boolean
) => {
	let result: ConductReturnType
	const warningMissKeys: Key[] = []

	// 只处理存在的 key
	const keys = new Set<Key>(
		keyList.filter((key) => {
			const hasEntity = !!keyEntities[key]
			if (!hasEntity) {
				warningMissKeys.push(key)
			}

			return hasEntity
		})
	)

	const levelEntities = new Map<number, Set<DataEntity>>()
	let maxLevel = 0

	// 按 level 转换实体进行计算
	Object.keys(keyEntities).forEach((key) => {
		const entity = keyEntities[key]
		const { level } = entity

		let levelSet: Set<DataEntity> = levelEntities.get(level)
		if (!levelSet) {
			levelSet = new Set()
			levelEntities.set(level, levelSet)
		}

		levelSet.add(entity)

		maxLevel = Math.max(maxLevel, level)
	})

	// 现状：选中的时候 fillExecuteCheck，取消选中 cleanExecuteCheck，fillExecuteCheck
	if (checked === true) {
		// 检查是否子节点全部选中，全选中则选中父节点
		result = fillExecuteCheck(keys, levelEntities, maxLevel)
	} else {
		result = cleanExecuteCheck(
			keys,
			checked.halfCheckedKeys,
			levelEntities,
			maxLevel,
		)
	}

	return result
}

// 删除无用的 key
function cleanExecuteCheck(
	keys: Set<Key>,
	halfKeys: Key[],
	levelEntities: Map<number, Set<DataEntity>>,
	maxLevel: number
): ConductReturnType {
	const checkedKeys = new Set<Key>(keys)
	let halfCheckedKeys = new Set<Key>(halfKeys)

	// 自顶向下删除选中的键，如果父节点没有，把子节点全部删除
	for (let level = 0; level <= maxLevel; level += 1) {
		const entities = levelEntities.get(level) || new Set()

		// eslint-disable-next-line no-loop-func
		entities.forEach((entity) => {
			const {
				node: { key = "", children = [] },
			} = entity
      // !halfCheckedKeys.has(key) 只删除自己父节点下的
			if (!checkedKeys.has(key) && !halfCheckedKeys.has(key)) {
				children.forEach((childEntity) => {
					checkedKeys.delete(childEntity.key)
				})
			}
		})
	}

	// 自底向上删除选中的键
	halfCheckedKeys = new Set<Key>()
	const visitedKeys = new Set<Key>()
	for (let level = maxLevel; level >= 0; level -= 1) {
		const entities = levelEntities.get(level) || new Set()

		entities.forEach((entity) => {
			const { parent } = entity

			if (!entity.parent || visitedKeys.has(parent.key)) {
				return
			}

			let allChecked = true
			let partialChecked = false
			;(parent.node.children || []).forEach(({ key }) => {
				const checked = checkedKeys.has(key)
				if (allChecked && !checked) {
					allChecked = false
				}
				if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
					partialChecked = true
				}
			})

			if (!allChecked) {
				checkedKeys.delete(parent.node.key)
			}
			if (partialChecked) {
				halfCheckedKeys.add(parent.key)
			}
			visitedKeys.add(parent.node.key)
		})
	}

	return {
		checkedKeys: Array.from(checkedKeys),
		halfCheckedKeys: Array.from(
			removeFromCheckedKeys(halfCheckedKeys, checkedKeys)
		),
	}
}

// 补充漏掉的 key
function fillExecuteCheck(
	keys: Set<Key>,
	levelEntities: Map<number, Set<DataEntity>>,
	maxLevel: number
): ConductReturnType {
	const checkedKeys = new Set<Key>(keys)
	const halfCheckedKeys = new Set<Key>()
	console.log("fillExecuteCheck")
	// 自上而下添加选中的键 , 把子节点都选中
	for (let level = 0; level <= maxLevel; level += 1) {
		const entities = levelEntities.get(level) || new Set()
		entities.forEach((entity) => {
			const {
				node: { key = "", children = [] },
			} = entity

			if (checkedKeys.has(key)) {
				children.forEach((childEntity) => {
					checkedKeys.add(childEntity.key)
				})
			}
		})
	}

	// 自下而上添加选中的键
	const visitedKeys = new Set<Key>()
	for (let level = maxLevel; level >= 0; level -= 1) {
		const entities = levelEntities.get(level) || new Set()

		entities.forEach((entity) => {
			const { parent } = entity

			// Skip if no need to check
			if (!entity.parent || visitedKeys.has(parent.key)) {
				return
			}

			let allChecked = true
			let partialChecked = false

			;(parent.node.children || []).forEach(({ key }) => {
				const checked = checkedKeys.has(key)
				if (allChecked && !checked) {
					allChecked = false
				}
				if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
					partialChecked = true
				}
			})

			if (allChecked) {
				checkedKeys.add(parent.node.key)
			}

			if (partialChecked) {
				halfCheckedKeys.add(parent.node.key)
			}

			visitedKeys.add(parent.node.key)
		})
	}

	return {
		checkedKeys: Array.from(checkedKeys),
		halfCheckedKeys: Array.from(
			removeFromCheckedKeys(halfCheckedKeys, checkedKeys)
		),
	}
}

export default executeCheck
