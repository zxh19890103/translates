## TS中何时使用“never”与“unknown”类型

![Philadelphia's Magic Gardens. This place was so cool!](https://i2.wp.com/cdn-images-1.medium.com/max/1600/1*_wh7P-jdH2o9xHgFi1bqbw.png?resize=1818%2C1090&ssl=1 "Philadelphia's Magic Gardens")

TypeScript 在版本2.0和3.0分别引入了 “never” 和 “unknown” 两个原始类型。这体现了类型理论的基础性和全面性。TypeScript 严格遵循了这个原则而得以设计；但同时，它也是一门实用主义语言，它引入的每一个特性都有其实际用途，这包括 never 和 unknown。欲理解这些特性的用法，我们需要首先问“究竟什么是类型？”。

### 以集合理论作解

当你深入去思考一下何为“类型”，你会发现，所谓之“类型”，乃不过为可能取得值之集合。举个例子，Typescript 中， 类型 string 乃全部字符串的集合。类型 date 乃全部 Date 实例的集合，而类型 Iterable<T> 乃全部实现了接口 Iterable 并对迭代项目约束以指定类型 T 的的对象。
  
Typescript 对基本类型的设计执念于集合理论，此外，它还有并集（union）和 交集（intersection）等高级类型。类型 string | number 就是一个 “union” 类型，因为它表达的是全部字符串的集合与全部数值集合的合并。

![Philadelphia's Magic Gardens. This place was so cool!](https://i0.wp.com/cdn-images-1.medium.com/max/1600/1*ZUSJpOOStqTRvCZ8GucxSw.png?zoom=2&resize=730%2C436&ssl=1 "Philadelphia's Magic Gardens")

因为 string | number 包含了全部的 string 和 全部的number，故它是类型 string 和 number 的超级类型（supertype）。

unknown 是某些值的集合，任何值都能冠以类型 unknown。这意味着 unknown 是一切类型的超级类型（supertype）。这就是为什么 unknown 被称为顶端类型。

![Philadelphia's Magic Gardens. This place was so cool!](https://i1.wp.com/cdn-images-1.medium.com/max/1600/1*S0YZx_0dFeAvp2uB28MthA.png?zoom=2&resize=730%2C536&ssl=1 "Philadelphia's Magic Gardens")

集合（或曰类型，可视作同义词） unknown 包含了一切其它集合。

never 是一个空集合，任何值都不能冠以类型 never。实际上，如何你将某个值解析为 never，系统将提出抗议，因为这么做存在矛盾之处。空集合可包含于任何非空集合，因此 never 是一切其它非空类型的子集合。这就是为什么 never 被称为底端集合。

底端和顶端集合可分别借助操作符 union（|） 和 intersection（&）来识别，比如，给定类型 T，则
unknown 是某些值的集合，任何值都能冠以类型 unknown。这意味着 unknown 是一切类型的超级类型（supertype）。这就是为什么 unknown 被称为顶端类型。：

```
T | never => T
T & unknown => T
```

这可类比于，任何数加上 0 并不改变这个数，任何数乘以 1 亦如此。0 是可用加法来识别，而 1 则可以用乘法来识别。

任何集合与空集合作并运算，并不对该集合有所改变，因此 never 可以 unions 运算识别；而交集运算是取两个集合的相同部分，但是 unknown 包含了一切，因此 unknown 可以 intersection 运算识别。

因为只有类型 never 能够在类型 union 运算中得到识别，下面我们将看到它在一些情况下的不可或缺性。


### never 用于那些永不可发生的情况

我们来写一段代码，它用于发出一个网络请求，但是因为花费时间过久而失败。我们可以使用 Promise.race 来将这个持有网络请求返回值的 promise 和 另一个在给定时间之内就会被 reject 的 promise 合并起来。以下为第二个 promise 的构造函数：

```
function timeout(ms: number): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Timeout!")), ms)
  })
}
```

注意返回值类型，因为这个 promise 决不会调用 resolve，我们可以使用任何类型作为返回值类型，这并无冲突。但是我们既然可以具体到类型 never，何不用之？

现在来看看对超时的操作：

```

async function fetchPriceWithTimeout(tickerSymbol: string): Promise<number> {
  const stock = await Promise.race([
    fetchStock(tickerSymbol),
    timeout(3000)
  ])
  return stock.price
}

```

很完美！但是编译器如何推断 Promise.race 的返回值类型呢？race 取最先被 settled 的那个 promise，在这个例子中，Promise.race 的 签名应该像这样：

```
function race<A, B>(inputs: [Promise<A>, Promise<B>]): Promise<A | B>
```

返回的promise所持有的值的类型是两个promise持有值类型的合集，上述例子中，fetchStock 和 timeout 为输入，因此它们的持有值的类型 A 为 { price: number }，而 B 为 never，因此，函数输出的 promise 所持类型为 { price: number } | never。 因为 never 是 unions 运算的识别因子，故返回值可简化为 { price: number }，这正是我们希望的。

如何我们不使用 never 作为 timeout 的返回值类型，那么，我们不可能表达得如此干净利索。如果我们使用 any，那么我们将失去类型检查的好处，因为 { price: number } | any 和 any 等同。

如果我们使用 unknown，那么 stock 的类型将会是 { price: number } | unknown，也就是 unknown。如此，我们就不能访问到属性 price，因为，price属性信息已经丢失。

### 用 `never` 来收缩条件类型 （conditional type）

你会经常看到，never 被用于条件类型，以排除掉不需要的情况。举个例子吧，下面这些条件类型从函数的类型中抽离出参数和返回值的类型：

```ts
type Arguments<T> = T extends (...args: infer A) => any ? A : never
type Return<T> = T extends (...args: any[]) => infer R ? R : never

function time<F extends Function>(fn: F, ...args: Arguments<F>): Reurn<F> {
  console.time()
  const result = fn(...args)
  console.timeEnd()
  return result
}
```
如 T 是函数类型，则编译器推断其参数类型和返回值类型。但如果 T 不是函数类型，那么 Argument<T> 和 Return<T> 返回者便无以感知。这里，我们使用的是 never 约束，如此，我们可得编译时 error：

```ts
// Error: Type '3' is not assignable to type 'never'

const x: Return<"not a function type"> = 3
```

对于精准化（narrowing）联合类型（union type），条件类型堪为可用。在 TS 库中，NonNullable<T> 类型即是例证，它将 null 和 undefined 类型从 T 中排除。其定义大概如此：

```ts
type NonNullable<T> = T extends null | undefined ? never : T
```
条件类型能对联合类型作分布处理，此所以上述代码可行。类似形为 T extends U ? X : Y  类型者，T 代表一未知集合，施以条件，则可对组成 T 的子集以此二元运算，然后将结果合并，以得结果。

```ts
// if T = A | B
T extends U ? X : T == (A extends U ? X : A) | (B extends U ? X : B)
```

可以看到，在每一个分支里，子集都按照二元运算或替换以新的类型、或维持原类型。

因而，类型 NonNullable<string | null> 可按照如下几步解析：

```ts
type NullOrUndefined = null | undefined
type NonNullable<string | null> 
  // The conditional distributes over each branch in `string | null`
  == (string extends NullOrUndefined ? never : string) | (null extends  NullOrUndefined ? never : null)
  // The conditional in each union branch is resolved
  == string | never
  // `never` factors out of the resulting union type
  == string
```
结果为，对于给定的集合（类型） T ，NonNullable<T> 生成一个更小的集合，这里使用 never 将无需的类型排除掉。

### 使用 `unknown` 代表万物

任何值都能冠以 unknown 类型，因此，任何集合包含于 unknown 中。在不便更明确地指定类型时，可使用之。举个例子，pretty-printing 函数能接收一切类型的值：

```ts
function prettyPrint(x: unknown): string {
  if (Array.isArray(x)) {
    return "["+ x.map(prettyPrint).join(", ") +"]"
  }
  if (typeof x === "string") {
    return `"${x}"`
  }
  if (typeof x === "number") {
    return String(x)
  }
  return "etc."
}
```



