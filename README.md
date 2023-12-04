#### 完成点

- 除框架提供的库，未使用其他第三方库
- 使用原生 form 验证表单的输入检查
- 自定义 useProfileInfo 封装创建和更新操作
- 网络请求设置延时，方便 loading 状态的展示
- 后端入参格式检查
- 使用 prisma orm 存储，prisma 会自动转义和绑定参数，不需要额外处理 sql 注入
- 转义输出的 json，防止 xss 攻击

#### 用法

```shell
git clone git@github.com:ccwwbb0/coding-test.git
cd coding-test
npm i --legacy-peer-deps
npx prisma migrate dev --name init
blocklet dev
```

#### 发现几个小问题

- express + react + typescript 脚手架代码有一个编译错误
- eslint rule 有些严格，一些习惯写法，在这里会报警告，特别是跟 typescript 结合在在一起
