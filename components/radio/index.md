---
category: Components
type: Data Entry
chinese: 单选框
english: Radio
source: design
---

单选框

## API ( 适用平台：WEB、React-Native )

### Radio

| 成员        | 说明           | 类型          | 默认值       |
|------------|----------------|------------|--------------|
| name    |   name  | String |   无  |
| defaultChecked |   初始是否选中   | Boolean  | 无  |
| checked    |   指定当前是否选中  | Boolean  | 无  |
| disabled      |         | Boolean |  false  |
| onChange    | change 事件触发的回调函数,参数是 event 对象 | Function |   无  |

### Radio.RadioItem

基于`List.Item`对`Radio`进行封装,`List.Item`的`extra`属性固定传入`Radio`,其他属性和`List.Item`一致。
其他 API 和 Radio 相同。
