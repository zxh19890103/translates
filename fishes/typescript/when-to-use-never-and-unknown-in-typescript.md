<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/c36a90ad59f2e7472254f1e6d972a288156b5d89/68747470733a2f2f69322e77702e636f6d2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a5f776837502d6a6448326f39784867466931627162772e706e673f726573697a653d31383138253243313039302673736c3d31"><img src="https://camo.githubusercontent.com/c36a90ad59f2e7472254f1e6d972a288156b5d89/68747470733a2f2f69322e77702e636f6d2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a5f776837502d6a6448326f39784867466931627162772e706e673f726573697a653d31383138253243313039302673736c3d31" alt="Philadelphia's Magic Gardens. This place was so cool!" title="Philadelphia's Magic Gardens" data-canonical-src="https://i2.wp.com/cdn-images-1.medium.com/max/1600/1*_wh7P-jdH2o9xHgFi1bqbw.png?resize=1818%2C1090&amp;ssl=1" style="max-width:100%;"></a></p>
<p>TypeScript 在版本 2.0 和 3.0 分别引入了 “never” 和 “unknown” 两个基本类型。这完善了 TS 类型系统的基础性和全面性。TypeScript 严格遵循了类型设计原则；同时，它也是一门实用主义语言，它引入的每一个特性都有其实际用途，这包括 never 和 unknown。欲准确理解这些特性的用法，我们首先要问“究竟什么是类型？”。</p>
<h3><a id="user-content-以集合理论作解" class="anchor" aria-hidden="true" href="#以集合理论作解"></a>以集合理论作解</h3>
<p>当你深入去思考一下何为“类型”，你会发现，所谓之“类型”，乃不过为可能取得值之集合。举个例子，Typescript 中， 类型 string 乃全部字符串的集合。类型 Date 乃全部 Date 实例的集合，而类型 Iterable&lt;T&gt; 乃全部实现了接口 Iterable 并对迭代项目约束以指定类型 T 的对象的集合。</p>
<p>Typescript 对基本类型的设计执念于集合理论，此外，它还有并集（union）和 交集（intersection）等高级类型。类型 string | number 就是一个 “union” 类型，因为它表达的是全部字符串的集合与全部数值集合的合并。</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/53703ae4a59c0d54804468504f27f479a7187927/68747470733a2f2f69302e77702e636f6d2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a5a55534a704f4f537471545276435a384775637853772e706e673f7a6f6f6d3d3226726573697a653d3733302532433433362673736c3d31"><img src="https://camo.githubusercontent.com/53703ae4a59c0d54804468504f27f479a7187927/68747470733a2f2f69302e77702e636f6d2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a5a55534a704f4f537471545276435a384775637853772e706e673f7a6f6f6d3d3226726573697a653d3733302532433433362673736c3d31" alt="Philadelphia's Magic Gardens. This place was so cool!" title="Philadelphia's Magic Gardens" data-canonical-src="https://i0.wp.com/cdn-images-1.medium.com/max/1600/1*ZUSJpOOStqTRvCZ8GucxSw.png?zoom=2&amp;resize=730%2C436&amp;ssl=1" style="max-width:100%;"></a></p>
<p>因为 string | number 包含了全部的 string 和 全部的 number，故它是类型 string 和 number 的超级类型（supertype）。</p>
<p>unknown 是某些值的集合，任何值都能冠以类型 unknown。这意味着 unknown 是一切类型的超级类型（supertype）。这就是为什么 unknown 被称为顶端类型。</p>
<p><a target="_blank" rel="noopener noreferrer" href="https://camo.githubusercontent.com/dea95e0ecebe93e6492bb0e5c2e635d5841b9ec3/68747470733a2f2f69312e77702e636f6d2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a5330595a785f3064466541767032754232384d7468412e706e673f7a6f6f6d3d3226726573697a653d3733302532433533362673736c3d31"><img src="https://camo.githubusercontent.com/dea95e0ecebe93e6492bb0e5c2e635d5841b9ec3/68747470733a2f2f69312e77702e636f6d2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a5330595a785f3064466541767032754232384d7468412e706e673f7a6f6f6d3d3226726573697a653d3733302532433533362673736c3d31" alt="Philadelphia's Magic Gardens. This place was so cool!" title="Philadelphia's Magic Gardens" data-canonical-src="https://i1.wp.com/cdn-images-1.medium.com/max/1600/1*S0YZx_0dFeAvp2uB28MthA.png?zoom=2&amp;resize=730%2C536&amp;ssl=1" style="max-width:100%;"></a></p>
<p>集合（或曰类型，可视作同义词） unknown 包含了一切其它集合。</p>
<p>never 是一个空集合，任何值都不能冠以类型 never。实际上，如果你将某个值的类型解析为 never，系统将提出抗议，因为这么做存在矛盾之处。空集合可包含于任何非空集合，因此 never 是一切其它非空类型的子集合。这就是为什么 never 被称为底端集合。</p>
<p>底端和顶端集合可分别借助操作符 union（|） 和 intersection（&amp;）来识别，比如，给定类型 T，则：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-c1">T</span> <span class="pl-k">|</span> <span class="pl-v">never</span> <span class="pl-k">=&gt;</span> <span class="pl-c1">T</span>
<span class="pl-c1">T</span> <span class="pl-k">&amp;</span> <span class="pl-v">unknown</span> <span class="pl-k">=&gt;</span> <span class="pl-c1">T</span></pre></div>
<p>这可类比于，任何数加上 0 并不改变这个数，任何数乘以 1 亦如此。0 是可用加法来识别，而 1 则可以用乘法来识别。</p>
<p>任何集合与空集合作并运算，并不对该集合有所改变，因此 never 可以 unions 运算识别；而交集运算是取两个集合的相同部分，但是 unknown 包含了一切，因此 unknown 可以 intersection 运算识别。</p>
<p>因为只有类型 never 能够在类型 union 运算中得到识别，下面我们将看到它在一些情况下的不可或缺性。</p>
<h3><a id="user-content-never-用于那些永不可发生的情况" class="anchor" aria-hidden="true" href="#never-用于那些永不可发生的情况"></a>never 用于那些永不可发生的情况</h3>
<p>我们来写一段代码，它用于发出一个网络请求，但是因为花费时间过久而失败。我们可以使用 Promise.race 来将这个持有网络请求返回值的 promise 和另一个在给定时间之内就会被 reject 的 promise 合并起来。以下为第二个 promise 的构造函数：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">function</span> timeout(<span class="pl-v">ms</span><span class="pl-k">:</span> <span class="pl-c1">number</span>)<span class="pl-k">:</span> <span class="pl-en">Promise</span>&lt;<span class="pl-c1">never</span>&gt; {
  <span class="pl-k">return</span> <span class="pl-k">new</span> <span class="pl-en">Promise</span>((<span class="pl-v">_</span>, <span class="pl-v">reject</span>) <span class="pl-k">=&gt;</span> {
    <span class="pl-c1">setTimeout</span>(() <span class="pl-k">=&gt;</span> <span class="pl-en">reject</span>(<span class="pl-k">new</span> <span class="pl-en">Error</span>(<span class="pl-s"><span class="pl-pds">"</span>Timeout!<span class="pl-pds">"</span></span>)), <span class="pl-smi">ms</span>)
  })
}</pre></div>
<p>注意返回值 promise 的解析值类型，因为这个 promise 决不会调用 resolve，我们可以使用 any 作为其类型，这并无冲突。但是我们既然可以具体到类型 never，何不用之？</p>
<p>现在来看看对超时的操作：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">async</span> <span class="pl-k">function</span> fetchPriceWithTimeout(<span class="pl-v">tickerSymbol</span><span class="pl-k">:</span> <span class="pl-c1">string</span>)<span class="pl-k">:</span> <span class="pl-en">Promise</span>&lt;<span class="pl-c1">number</span>&gt; {
  <span class="pl-k"><span class="pl-k">const</span></span> stock <span class="pl-k">=</span> <span class="pl-k">await</span> <span class="pl-c1">Promise</span>.<span class="pl-c1">race</span>([
    <span class="pl-en">fetchStock</span>(<span class="pl-smi">tickerSymbol</span>),
    <span class="pl-en">timeout</span>(<span class="pl-c1">3000</span>)
  ])
  <span class="pl-k">return</span> <span class="pl-smi">stock</span>.<span class="pl-smi">price</span>
}
</pre></div>
<p>很完美！但是编译器如何推断 Promise.race 的返回值类型呢？race 取最先被 settled 的那个 promise，在这个例子中，Promise.race 的 签名应该像这样：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">function</span> race&lt;<span class="pl-en">A</span>, <span class="pl-en">B</span>&gt;(<span class="pl-v">inputs</span><span class="pl-k">:</span> [<span class="pl-en">Promise</span>&lt;<span class="pl-en">A</span>&gt;, <span class="pl-en">Promise</span>&lt;<span class="pl-en">B</span>&gt;])<span class="pl-k">:</span> <span class="pl-en">Promise</span>&lt;<span class="pl-en">A</span> <span class="pl-k">|</span> <span class="pl-en">B</span>&gt;</pre></div>
<p>返回的 promise 所解析值的类型是两个 promise 解析值类型的合集，上述例子中，fetchStock 和 timeout 为输入，因此它们的解析值的类型 A 为 { price: number }，而 B 为 never，因此，函数输出的 promise 解析值类型为 { price: number } | never。 因为 never 是 unions 运算的识别因子，故返回值可简化为 { price: number }，这正是我们希望的。</p>
<p>如果我们不使用 never 作为 timeout 的返回值类型，那么，我们不可能表达得如此干净利索。如果我们使用 any，那么我们将失去类型检查的好处，因为 { price: number } | any 和 any 等同。</p>
<p>如果我们使用 unknown，那么 stock 的类型将会是 { price: number } | unknown，也就是 unknown。如此，我们就不能访问到属性 price，因为，price 属性信息已经丢失。</p>
<h3><a id="user-content-用-never-来收敛条件类型-conditional-type" class="anchor" aria-hidden="true" href="#用-never-来收敛条件类型-conditional-type"></a>用 <code>never</code> 来收敛条件类型 （conditional type）</h3>
<p>你会经常看到，never 被用于条件类型，以排除掉不需要的情况。举个例子吧，下面这些条件类型从函数的类型定义中抽离出参数和返回值的类型：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">type</span> <span class="pl-en">Arguments</span>&lt;<span class="pl-en">T</span>&gt; <span class="pl-k">=</span> <span class="pl-en">T</span> <span class="pl-k">extends</span> (<span class="pl-k">...</span><span class="pl-v">args</span><span class="pl-k">:</span> <span class="pl-k">infer</span> <span class="pl-en">A</span>) <span class="pl-k">=&gt;</span> <span class="pl-c1">any</span> <span class="pl-k">?</span> <span class="pl-en">A</span> <span class="pl-k">:</span> <span class="pl-c1">never</span>
<span class="pl-k">type</span> <span class="pl-en">Return</span>&lt;<span class="pl-en">T</span>&gt; <span class="pl-k">=</span> <span class="pl-en">T</span> <span class="pl-k">extends</span> (<span class="pl-k">...</span><span class="pl-v">args</span><span class="pl-k">:</span> <span class="pl-c1">any</span>[]) <span class="pl-k">=&gt;</span> <span class="pl-k">infer</span> <span class="pl-en">R</span> <span class="pl-k">?</span> <span class="pl-en">R</span> <span class="pl-k">:</span> <span class="pl-c1">never</span>

<span class="pl-k">function</span> time&lt;<span class="pl-en">F</span> <span class="pl-k">extends</span> <span class="pl-en">Function</span>&gt;(<span class="pl-v">fn</span><span class="pl-k">:</span> <span class="pl-en">F</span>, <span class="pl-k">...</span><span class="pl-v">args</span><span class="pl-k">:</span> <span class="pl-en">Arguments</span>&lt;<span class="pl-en">F</span>&gt;)<span class="pl-k">:</span> <span class="pl-en">Reurn</span>&lt;<span class="pl-en">F</span>&gt; {
  <span class="pl-c1">console</span>.<span class="pl-c1">time</span>()
  <span class="pl-k"><span class="pl-k">const</span></span> result <span class="pl-k">=</span> <span class="pl-en">fn</span>(<span class="pl-k">...</span><span class="pl-smi">args</span>)
  <span class="pl-c1">console</span>.<span class="pl-c1">timeEnd</span>()
  <span class="pl-k">return</span> <span class="pl-smi">result</span>
}</pre></div>
<p>如 T 是函数类型，则编译器推断其参数类型和返回值类型。但如果 T 不是函数类型，那么 Argument 和 Return 返回者便无以感知。这里，我们使用的是 never 来约束，如此，我们可得编译时 error：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-c"><span class="pl-c">//</span> Error: Type '3' is not assignable to type 'never'</span>

<span class="pl-k"><span class="pl-k">const</span></span> x<span class="pl-k">:</span> <span class="pl-en">Return</span>&lt;<span class="pl-s"><span class="pl-pds">"</span>not a function type<span class="pl-pds">"</span></span>&gt; <span class="pl-k">=</span> <span class="pl-c1">3</span></pre></div>
<p>对于收敛（narrowing）联合类型（union type），条件类型堪为可用。在 TS 库中，NonNullable 类型即是例证，它将 null 和 undefined 类型从 T 中排除。其定义大概如此：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">type</span> <span class="pl-en">NonNullable</span>&lt;<span class="pl-en">T</span>&gt; <span class="pl-k">=</span> <span class="pl-en">T</span> <span class="pl-k">extends</span> <span class="pl-c1">null</span> <span class="pl-k">|</span> <span class="pl-c1">undefined</span> <span class="pl-k">?</span> <span class="pl-c1">never</span> <span class="pl-k">:</span> <span class="pl-en">T</span></pre></div>
<p>条件类型能对联合类型作分布处理，此所以上述代码可行。类似形为 T extends U ? X : Y  类型者，T 代表一未知集合，施以条件，则可对组成 T 的子集以此二元运算，然后将结果合并，以得结果。</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-c"><span class="pl-c">//</span> if T = A | B</span>
<span class="pl-c1">T</span> <span class="pl-smi">extends</span> <span class="pl-c1">U</span> <span class="pl-k">?</span> <span class="pl-c1">X</span> <span class="pl-k">:</span> <span class="pl-c1">T</span> <span class="pl-k">==</span> (<span class="pl-c1">A</span> <span class="pl-smi">extends</span> <span class="pl-c1">U</span> <span class="pl-k">?</span> <span class="pl-c1">X</span> <span class="pl-k">:</span> <span class="pl-c1">A</span>) <span class="pl-k">|</span> (<span class="pl-c1">B</span> <span class="pl-smi">extends</span> <span class="pl-c1">U</span> <span class="pl-k">?</span> <span class="pl-c1">X</span> <span class="pl-k">:</span> <span class="pl-c1">B</span>)</pre></div>
<p>可以看到，在每一个分支里，子集都按照二元运算或替换以新的类型、或维持原类型。</p>
<p>因而，类型 NonNullable&lt;string | null&gt; 可按照如下几步解析：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">type</span> <span class="pl-en">NullOrUndefined</span> <span class="pl-k">=</span> <span class="pl-c1">null</span> <span class="pl-k">|</span> <span class="pl-c1">undefined</span>
<span class="pl-k">type</span> <span class="pl-en">NonNullable</span>&lt;<span class="pl-c1">string</span> <span class="pl-k">|</span> <span class="pl-c1">null</span>&gt; 
  <span class="pl-c"><span class="pl-c">//</span> The conditional distributes over each branch in `string | null`</span>
  <span class="pl-k">=</span>= (<span class="pl-c1">string</span> <span class="pl-k">extends</span> <span class="pl-en">NullOrUndefined</span> <span class="pl-k">?</span> <span class="pl-c1">never</span> <span class="pl-k">:</span> <span class="pl-c1">string</span>) <span class="pl-k">|</span> (<span class="pl-c1">null</span> <span class="pl-k">extends</span>  <span class="pl-en">NullOrUndefined</span> <span class="pl-k">?</span> <span class="pl-c1">never</span> <span class="pl-k">:</span> <span class="pl-c1">null</span>)
  <span class="pl-c"><span class="pl-c">//</span> The conditional in each union branch is resolved</span>
  == <span class="pl-c1">string</span> <span class="pl-k">|</span> <span class="pl-c1">never</span>
  <span class="pl-c"><span class="pl-c">//</span> `never` factors out of the resulting union type</span>
  == <span class="pl-c1">string</span></pre></div>
<p>结果为，对于给定的集合（类型） T ，NonNullable 生成一个更小的集合，这里使用 never 将无需的类型排除掉。</p>
<h3><a id="user-content-使用-unknown-代表万物" class="anchor" aria-hidden="true" href="#使用-unknown-代表万物"></a>使用 <code>unknown</code> 代表万物</h3>
<p>任何值都能冠以 unknown 类型，因此，任何集合包含于 unknown 中。在不便更明确地指定类型时，可使用之。举个例子，pretty-printing 函数能接收一切类型的值：</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">function</span> prettyPrint(<span class="pl-v">x</span><span class="pl-k">:</span> <span class="pl-c1">unknown</span>)<span class="pl-k">:</span> <span class="pl-c1">string</span> {
  <span class="pl-k">if</span> (<span class="pl-c1">Array</span>.<span class="pl-en">isArray</span>(<span class="pl-smi">x</span>)) {
    <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">"</span>[<span class="pl-pds">"</span></span><span class="pl-k">+</span> <span class="pl-smi">x</span>.<span class="pl-en">map</span>(<span class="pl-smi">prettyPrint</span>).<span class="pl-c1">join</span>(<span class="pl-s"><span class="pl-pds">"</span>, <span class="pl-pds">"</span></span>) <span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">"</span>]<span class="pl-pds">"</span></span>
  }
  <span class="pl-k">if</span> (<span class="pl-k">typeof</span> <span class="pl-smi">x</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">"</span>string<span class="pl-pds">"</span></span>) {
    <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">`</span>"${<span class="pl-smi">x</span>}"<span class="pl-pds">`</span></span>
  }
  <span class="pl-k">if</span> (<span class="pl-k">typeof</span> <span class="pl-smi">x</span> <span class="pl-k">===</span> <span class="pl-s"><span class="pl-pds">"</span>number<span class="pl-pds">"</span></span>) {
    <span class="pl-k">return</span> <span class="pl-c1">String</span>(<span class="pl-smi">x</span>)
  }
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">"</span>etc.<span class="pl-pds">"</span></span>
}</pre></div>
<p>直接使用 unknown 没什么意义，但是你可借助“类型守卫”在块级作用域内收敛类型，并由此获得准确的类型检查。</p>
<p>TS 3.0 之前，定义 prettyPrint 函数参数 x 类型为 any 极为可取。类型收敛如 unknown 一样，可用于 any。在将 x 的类型收敛于 Array 类型的块级域中，类型检查允许我们访问到 x 的 map 和 join 方法。我们使用 unknown 类型好处之一就是类型检查会对任何成员访问施以错误提醒，而 any 无此提醒。</p>
<div class="highlight highlight-source-ts"><pre><span class="pl-k">import</span> <span class="pl-smi">isArray</span> <span class="pl-k">from</span>  <span class="pl-s"><span class="pl-pds">'</span>isarray<span class="pl-pds">'</span></span>

<span class="pl-k">function</span> prettyPrint(<span class="pl-v">x</span><span class="pl-k">:</span> <span class="pl-c1">any</span>)<span class="pl-k">:</span> <span class="pl-c1">string</span> {
  <span class="pl-k">if</span> (<span class="pl-en">isArray</span>(<span class="pl-smi">x</span>)) { <span class="pl-c"><span class="pl-c">//</span> isArray 非类型守卫</span>
    <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">"</span>[<span class="pl-pds">"</span></span> <span class="pl-k">+</span> <span class="pl-smi">x</span>.<span class="pl-en">map</span>(<span class="pl-smi">prettyPrint</span>).<span class="pl-c1">join</span>(<span class="pl-s"><span class="pl-pds">"</span>, <span class="pl-pds">"</span></span>)
  }
  <span class="pl-k">return</span> <span class="pl-s"><span class="pl-pds">"</span>ect.<span class="pl-pds">"</span></span>
}</pre></div>
<p>包 isarray 无类型定义，故而无法使函数 isArray 为<a href="http://www.typescriptlang.org/docs/handbook/advanced-types.html#user-defined-type-guards" rel="nofollow">类型守卫</a>。但我们很可能使用了 isarray 而未能发现问题，为什么呢？因为，isArray 非类型守卫，而我们将 x 限制于类型 any，因而在 if 块级域内，x 仍为 any。这导致 TS 编译器在此无法捕获到 x 的类型，而如果我们将 x 限制以 unknown 情况将有所不同：</p>
<p><em><span>Object is of type “unknown”</span></em></p>
<p>使用 unknown 更加安全！</p>
<h3><a id="user-content-如何在-neverunknownany-之间作出选择" class="anchor" aria-hidden="true" href="#如何在-neverunknownany-之间作出选择"></a>如何在 never、unknown、any 之间作出选择</h3>
<p>prettyPrint 函数的参数类型与上述函数 timeout 所返回promise 的解析值的类型都可冠以 any。不同之处是，timeout 的 promise 的解析值不是任意的，因为它根本不可能解析出任何值。</p>
<ul>
<li>在那些将或既不能取得任何值的地方，使用 never</li>
<li>在那些将或既取得任意值，但不知类型的地方，请使用 unknown</li>
<li>除非你有意忽略类型检查，不要使用 any</li>
</ul>
<p>总之，你应该尽量使用具体的类型。never 是最具体的类型，因为没有哪个集合比空集合更小了；而 unknown 是最弱的类型，因为它包含了全部可能的值。any 则不为集合，它破坏了类型检查，因此请尽量不要使用 any！</p>
