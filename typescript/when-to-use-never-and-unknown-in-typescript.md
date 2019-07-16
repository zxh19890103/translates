## TS中何时使用“never”与“unknown”类型

![Philadelphia's Magic Gardens. This place was so cool!](https://i2.wp.com/cdn-images-1.medium.com/max/1600/1*_wh7P-jdH2o9xHgFi1bqbw.png?resize=1818%2C1090&ssl=1 "Philadelphia's Magic Gardens")

TypeScript 在版本2.0和3.0分别引入了 “never” 和 “unknown” 两个原始类型。这体现了类型理论的基础性和全面性。TypeScript 严格遵循了这个原则而得以设计；但同时，它也是一门实用主义语言，它引入的每一个特性都有其实际用途，这包括 never 和 unknown。欲理解这些特性的用法，我们需要首先问“究竟什么是类型？”。

### 以集合理论作解