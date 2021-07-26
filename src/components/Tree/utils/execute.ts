import { Key } from "../interface"
import { DataEntity } from "../tree"

interface ConductReturnType {
	checkedKeys: Key[]
}
const executeCheck = (
	keyList: Key[],
	checked: boolean,
	keyEntities: Record<Key, DataEntity>
) => {
	let result: ConductReturnType = { checkedKeys: [] }
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

	if (checked === true) {
		// 检查是否子节点全部选中，全选中则选中父节点
		result = fillExecuteCheck(keys, levelEntities, maxLevel)
	} else {
		result = cleanConductCheck(keys, levelEntities, maxLevel)
	}

	return result
}

// 删除无用的 key
function cleanConductCheck(
	keys: Set<Key>,
	levelEntities: Map<number, Set<DataEntity>>,
	maxLevel: number
): ConductReturnType {
	const checkedKeys = new Set<Key>(keys)
  console.log('cleanConductCheck')
	// 从上到下删除选中的键
	for (let level = 0; level <= maxLevel; level += 1) {
		const entities = levelEntities.get(level) || new Set()
		entities.forEach((entity) => {
			const { key, node, children = [] } = entity

			if (!checkedKeys.has(key)) {
				children.forEach((childEntity) => {
					checkedKeys.delete(childEntity.key)
				})
			}
		})
	}

	// 从下到上删除选中的键
	const visitedKeys = new Set<Key>()
	for (let level = maxLevel; level >= 0; level -= 1) {
		const entities = levelEntities.get(level) || new Set()

		entities.forEach((entity) => {
			const { parent, node } = entity

			// Skip if no need to check
			if (!entity.parent || visitedKeys.has(entity.parent.key)) {
				return
			}

			let allChecked = true;
			let partialChecked = false;

      (parent.node.children || []).forEach(({ key }) => {
				const checked = checkedKeys.has(key)
				if (allChecked && !checked) {
					allChecked = false
				}
				if (!partialChecked && checked) {
					partialChecked = true
				}
			})

			if (!allChecked) {
				checkedKeys.delete(parent.node.key)
			}

			visitedKeys.add(parent.key)
		})
	}

	return {
		checkedKeys: Array.from(checkedKeys),
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
  console.log('fillExecuteCheck')

	// 自上而下添加选中的键
	for (let level = 0; level <= maxLevel; level += 1) {
		const entities = levelEntities.get(level) || new Set()
		entities.forEach((entity) => {
			const { key, node, children = [] } = entity

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
			const { parent, node } = entity

			// Skip if no need to check
			if (!entity.parent || visitedKeys.has(entity.parent.key)) {
				return
			}

			let allChecked = true;
			let partialChecked = false;

			(parent.node.children || []).forEach(({ key }) => {
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

			visitedKeys.add(parent.key)
		})
	}

	return {
		checkedKeys: Array.from(checkedKeys),
	}
}

export default executeCheck
