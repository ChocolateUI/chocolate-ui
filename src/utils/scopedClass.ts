export function scopedClass(componentClass: string) {
  return function (c: object | string, className?: string) {
    const scArray = Object.entries(typeof c === 'object' ? c : { [c]: true })
      .filter(node => node[1])
      .map(
        node => [componentClass, typeof node[1] === 'boolean' ? node[0] : node[1]]
          .filter(Boolean).join('-')
      )
    return [...scArray, className].filter(Boolean).join(' ')
  }
}

export default scopedClass;