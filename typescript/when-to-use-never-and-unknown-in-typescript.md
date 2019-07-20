## TS中何时使用“never”与“unknown”类型

![Philadelphia's Magic Gardens. This place was so cool!](https://i2.wp.com/cdn-images-1.medium.com/max/1600/1*_wh7P-jdH2o9xHgFi1bqbw.png?resize=1818%2C1090&ssl=1 "Philadelphia's Magic Gardens")

TypeScript 在版本2.0和3.0分别引入了 “never” 和 “unknown” 两个原始类型。这体现了类型理论的基础性和全面性。TypeScript 严格遵循了这个原则而得以设计；但同时，它也是一门实用主义语言，它引入的每一个特性都有其实际用途，这包括 never 和 unknown。欲理解这些特性的用法，我们需要首先问“究竟什么是类型？”。

### 以集合理论作解

当你深入去思考一下何为“类型”，你会发现，所谓之“类型”，乃不过为可能取得值之集合。举个例子，Typescript 中， 类型 string 乃全部字符串的集合。类型 date 乃全部 Date 实例的集合，而类型 Iterable<T> 乃全部实现了接口 Iterable 并对迭代项目约束以指定类型 T 的的对象。
  
Typescript 对基本类型的设计执念于集合理论，此外，它还有并集（union）和 交集（intersection）等高级类型。类型 string | number 就是一个 “union” 类型，因为它表达的是全部字符串的集合与全部数值集合的合并。

![Philadelphia's Magic Gardens. This place was so cool!](https://i0.wp.com/cdn-images-1.medium.com/max/1600/1*ZUSJpOOStqTRvCZ8GucxSw.png?zoom=2&resize=730%2C436&ssl=1 "Philadelphia's Magic Gardens")

因为 string | number 包含了全部的 string 和 全部的number，故它是类型 string 和 number 的超级类型（supertype）。

unknown 是某些值的集合，任何值都能冠以类型 unknown。这意味着 unknown 是一切类型的超级类型（supertype）。这就是为什么 unknown 被称为顶端类型。

![Philadelphia's Magic Gardens. This place was so cool!]https://i1.wp.com/cdn-images-1.medium.com/max/1600/1*S0YZx_0dFeAvp2uB28MthA.png?zoom=2&resize=730%2C536&ssl=1 "Philadelphia's Magic Gardens")

集合（或曰类型，可视作同义词） unknown 包含了一切其它集合。

never 是一个空集合，任何值都不能冠以类型 never。实际上，如何你将某个值解析为 never，系统将提出抗议，因为这么做存在矛盾之处。空集合可包含于任何非空集合，因此 never 是一切其它非空类型的子集合。这就是为什么 never 被称为底端集合。

底端和顶端集合可分别借助操作符 union（|） 和 intersection（&）来识别，比如，给定类型 T，则
unknown 是某些值的集合，任何值都能冠以类型 unknown。这意味着 unknown 是一切类型的超级类型（supertype）。这就是为什么 unknown 被称为顶端类型。：

```
T | never => T
T & unknown => T
```

这可类比于，任何数加上 0 并不改变这个数，任何数乘以 1 亦如此。0 是可用加法来识别，而 1 则可以用乘法来识别。



