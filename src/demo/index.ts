import { createdEnum } from "src/index";


const enumResult = createdEnum([
    {
        key: 'Success',
        value: 0,
        label: '成功',
        color: 'green',
    },
    {
        key: 'Error',
        value: 1,
        label: '失败',
        color: 'red',
    },
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