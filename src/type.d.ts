export type IValueType = string | number
export type IObject = {
    [key: string]: IValueType
}
type Item = {
    readonly label: string
    readonly key: string
    readonly value: IValueType
    readonly [key: string]: any
}
export type OptionsArr = readonly Item[]

/**
 * 提取数组的对象类型
 */
type GetItemTypeByArray<Arr extends readonly any[]> = Arr extends readonly [
    infer First,
    ...infer Right
]
    ? First | GetItemTypeByArray<Right>
    : never

/**
 * 提取对象属性类型
 */
type GetObjectType<
    T extends Record<string, any>,
    K extends string
> = T extends {
    [key in K]: infer R
}
    ? R
    : never

/**
 * 根据配置数组获取某个key值的集合类型
 */
export type GetKeyValueArrayByOptionArray<
    T extends readonly any[],
    K extends string
> = GetObjectType<Omit<GetItemTypeByArray<T>, never>, K>
/**
 * 获取对象中的参数作为枚举键值对
 */
type GetObjectEnumKeyValue<T extends Record<IValueType, any>> =
    T['key'] extends string ? { readonly [k in T['key']]: T['value'] } : never

/**
 * 获取数组中的枚举键值对
 */
export type GetArrayEnumKeyValue<T> = T extends readonly [
    infer First,
    ...infer Rest
]
    ? GetObjectEnumKeyValue<First & {}> & GetArrayEnumKeyValue<Rest>
    : unknown

export type CreatedEnumReulst<T extends OptionsArr> = {
    enums: GetArrayEnumKeyValue<T>
    keys: GetKeyValueArrayByOptionArray<T, 'key'>[]
    values: GetKeyValueArrayByOptionArray<T, 'value'>[]
    labels: GetKeyValueArrayByOptionArray<T, 'label'>[]
    options: T
    getHtml: (v?: IValueType) => string
    getTagHtml: (v?: IValueType) => string
    getLabelByValue: (v?: IValueType) => string
    isEnumValue: (v?: IValueType) => boolean
}

declare module 'created-enum' {
    export const createdEnum: <T extends OptionsArr>(
        options: T
    ) => CreatedEnumReulst<T>
}