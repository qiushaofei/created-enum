type Item = {
    readonly label: string
    readonly key: string
    readonly value: string | number
    readonly [key: string]: any
}

type OptionsArr = readonly Item[]

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
 * @param {T} 对象类型
 * @param {K} 属性key
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
type GetObjectEnumKeyValue<T extends Record<string | number, any>> =
    T['key'] extends string ? { readonly [k in T['key']]: T['value'] } : never

/**
 * 获取数组中的枚举键值对
 */
type GetArrayEnumKeyValue<T> = T extends readonly [infer First, ...infer Rest]
    ? GetObjectEnumKeyValue<First & {}> & GetArrayEnumKeyValue<Rest>
    : unknown

type IValueType = string | number
/**
 * 根据配置信息创建枚举
 * @param {OptionsArr} options 配置信息
 */
export const createdEnums = <T extends OptionsArr>(options: T) => {
    /**
     * 枚举
     */
    const enums: { [key: string]: string | number } = {}

    const keys: string[] = []
    const values: IValueType[] = []
    const labels: string[] = []

    options.forEach((o) => {
        enums[o.key] = o.value
        keys.push(o.key)
        values.push(o.value)
        labels.push(o.label)
    })

    /**
     * 判断传入的值是否为枚举值
     */
    const isEnumValue = (value?: IValueType) => {
        return options.some((o) => `${o.value}` === `${value}`)
    }

    /**
     * 根据value获取枚举配置信息
     */
    const _getItem = (value?: IValueType) => {
        return options.find((o) => `${o.value}` === `${value}`)
    }

    /**
     * 根据传入的value获取对应的 HtmlDom
     */
    const getHtml = (value?: IValueType) => {
        const item = _getItem(value)
        if (!item) {
            return ''
        }
        let html = `<span style='color:${item?.color};'>`
        html += item?.label
        html += '</span>'
        return html
    }

    /**
     * 根据传入的value获取对应的 TagHtmlDom
     */
    const getTagHtml = (value?: IValueType) => {
        const style =
            'color: #fff;padding: 2px 10px;border-radius: 10px;font-size: 10px;'
        const item = _getItem(value)
        if (!item) {
            return ''
        }
        let html = `<span style='background:${item?.color};${style}'>`
        html += item?.label
        html += '</span>'
        return html
    }

    return {
        /**
         * 枚举
         */
        enums: enums as GetArrayEnumKeyValue<T>,

        /**
         * key 集合
         */
        keys: keys as GetKeyValueArrayByOptionArray<T, 'key'>,
        /**
         * value 集合
         */
        values: values as GetKeyValueArrayByOptionArray<T, 'value'>,
        /**
         * label 集合
         */
        labels: labels as GetKeyValueArrayByOptionArray<T, 'label'>,

        /**
         * 配置信息
         */
        options,

        /**
         * 根据枚举 value 获取 html
         */
        getHtml,

        /**
         * 根据枚举 value 获取 taghtml
         */
        getTagHtml,

        /**
         * 判断传入的枚举值是否为当前枚举内的值
         * @returns {boolean}
         */
        isEnumValue,
    }
}
