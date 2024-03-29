const path = require("path")
const https = require("https")
const fs = require("fs")

// const pathname = "typescript/when-to-use-never-and-unknown-in-typescript.md"
// const pathname = "talks/we-programmers.md"
// const pathname = "talks/the-programmer's-oath.md"
const pathname = "talks/how-does-the-development-mode-work.md"

// const baseUrl = "https://github.com/zxh19890103/translates/blob/master/"

https.get(`https://github.com/zxh19890103/overreacted.io/blob/master/src/pages/how-does-the-development-mode-work/index.zh-hans.md`, {
}, (res) => {
    let k = 0
    let buffer = Buffer.alloc(0)
    res.on("data", (d) => {
        buffer = Buffer.concat([buffer, d])
        console.log(k ++, "chunk")
    })
    res.on("end", () => {
        const savepath = path.resolve(__dirname, `../fishes/${pathname}`)
        const ws = fs.createWriteStream(savepath)
        const str = buffer.toString("utf8")
        const matches = /<article.+?>([\s\S]+)<\/article>/.exec(str)
        const html = matches[1]
        ws.write(html.replace(/<svg.+?>.+?<\/svg>/g, "").replace(/<h2.+?>.+?<\/h2>/g, ""))
    })
})