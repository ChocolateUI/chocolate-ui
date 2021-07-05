var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
/* eslint-disable import/no-anonymous-default-export */
export function scopedClass(componentClass) {
    return function (c, className) {
        var _a;
        var scArray = Object.entries(typeof c === 'object' ? c : (_a = {}, _a[c] = true, _a))
            .filter(function (node) { return node[1]; })
            .map(function (node) { return [componentClass, typeof node[1] === 'boolean' ? node[0] : node[1]]
            .filter(Boolean).join('-'); });
        return __spreadArrays(scArray, [className]).filter(Boolean).join(' ');
    };
}
export default scopedClass;
