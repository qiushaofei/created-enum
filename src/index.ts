import {
    CreatedEnumReulst,
    IObject,
    IValueType,
    OptionsArr,
} from './type'

/**
 * 根据配置信息创建枚举
 * @param {OptionsArr} options 配置信息
 */
export const createdEnum = <T extends OptionsArr>(options: T) => {
    /**
     * 枚举
     */
    const enums: IObject = {}

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
     * 根据value获取枚举label值
     */
    const getLabelByValue = (value?: IValueType) => _getItem(value)?.label

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

    const result = {
        enums,
        keys,
        values,
        labels,
        options,
        getHtml,
        getTagHtml,
        getLabelByValue,
        isEnumValue,
    }

    return result as CreatedEnumReulst<T>
}
