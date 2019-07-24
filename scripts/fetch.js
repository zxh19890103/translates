const path = require("path")
const https = require("https")
const fs = require("fs")

const url = "https://github.com/zxh19890103/translates/blob/master/typescript/when-to-use-never-and-unknown-in-typescript.md"
https.get(url, {
}, (res) => {
    let k = 0
    let buffer = Buffer.alloc(0)
    res.on("data", (d) => {
        buffer += d
        console.log(k ++)
    })
    res.on("end", () => {       
        const filepath = path.resolve(__dirname, "../fishes/when-to-use-never-and-unknown-in-typescript.html")
        // const ws = fs.createWriteStream(filepath)        
        const str = buffer.toString("uft8")
        const want = /<article\>/.exec(str)
        console.log(want[0])
        // ws.write()
    })
})