# 描述

创建易于使用、并且有类型推导的枚举

# Install

#### yarn安装

```ts
yarn add created-enum -S
```

# Use

#### 创建基础枚举

```ts
import {createdEnum} from 'created-enum'

export const enumResult = createdEnum([
    {
        key: 'Success',
        value: 0,
        label: '成功',
        color: 'green',
    },{
        key: 'Error',
        value: 1,
        label: '失败',
        color: 'red',
    }
] as const)

// 1
enumResult.enums.Error

// 0
enumResult.enums.Success

// ("Success" | "Error")[]
enumResult.keys

// ("成功" | "失败")[]
enumResult.labels

// (0 | 1)[]
enumResult.values

//  readonly [{
//     readonly key: "Success";
//     readonly value: 0;
//     readonly label: "成功";
//     readonly color: "green";
// }, {
//     readonly key: "Error";
//     readonly value: 1;
//     readonly label: "失败";
//     readonly color: "red";
// }]
enumResult.options
```

#### 拓展枚举

```ts
import {createdEnum} from 'created-enum'

export const enumResult = (() => {
    const options = [
        {
            key: 'Success',
            value: 0,
            label: '成功',
            color: 'green',
            images: '/success.png',
        },
        {
            key: 'Error',
            value: 1,
            label: '失败',
            color: 'red',
            images: '/error.png',
        },
    ] as const

    const result = createdEnum(options)
    const images = options.map((o) => o.images)

    return {
        ...result,
        images,
    }
})()

// ("/success.png" | "/error.png")[]
enumResult.images

```

# 作为类型使用

#### 从枚举中提取类型

```ts
import {enumResult} from "// your enum file "

interface Itype {
    name:string
    // 0 | 1
    state:(typeof enumResult.values)[number]
}
```

# 方法

| 属性              | 类型                                           | 描述                        |
| :---------------- | :--------------------------------------------- | :-------------------------- |
| `getHtml`         | `(value?: IValueType) => string`               | 根据value值获取html代码     |
| `getTagHtml`      | `(value?: IValueType) => string`               | 根据value值获取tag html代码 |
| `getLabelByValue` | `(value?: IValueType) => string / undefined` | 根据value值获取label        |
| `isEnumValue`     | `(value?: IValueType) => boolean`              | 判断传入的值是否是枚举值    |