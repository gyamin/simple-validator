# sinpuru-validator
JavaScript simple validation library.

## インストール(Install)

````
npm install sinpuru-validator
````

## インポート(Import Validator)
ライブラリ を利用するには、利用するJavaScriptプログラムで、sinpuru-validatorをインポートします。  
(Before use this library, import sinpuru-validator on your javascript file.)
```
import Validator from "sinpuru-validator"
```

## Validate samples

ライブラリの利用方法を説明します。
(Explain usage about library.)

まず、sinpuru-validatorを任意の名前でインポートします。ここでは、Validatorとしてインポートしたとして説明します。
(First, you need import sinpuru-validator with any name. Here we will explain you import it with Validator.)

### 利用方法
バリデーションは、validateValueメソッドに、ルールと値を指定して呼び出すことで実施します。

```
let result = Validator.validateValue(rule, value)
```

````
let result = validator.validateValue({"type": "string"}, 100)
result.isError => true
````

### 利用できるルール
利用できるルールを記載します。

#### required
required は値が設定されているか確認します。
```
validator.validateValue({"required": true}, "")
```

#### type
type は値が指定の型に合致するかを確認します。
string | number | date

`let result = validator.validateValue({"type": "string"}, 100)`     
`let result = validator.validateValue({"type": "number"}, 'abc')`   
`let result = validator.validateValue({"type": "date"}, 'abc')`     

#### regexp
regexp は値が正規表現に合致するか確認します。  
`let result = validator.validateValue({"regexp": "^123*"}, 'abc')`

#### max / min
max / min は値の文字数が指定値に合致するか確認します。    
`let result = validator.validateValue({"max": 6}, 'abcdefg')`