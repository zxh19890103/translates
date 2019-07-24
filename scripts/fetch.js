const path = require("path")
const https = require("https")
const fs = require("fs")


// const url = "https://github.com/zxh19890103/translates/blob/master/typescript/when-to-use-never-and-unknown-in-typescript.md"
// https.get(url, {
// }, (res) => {
//     // res.setEncoding("utf8")
//     // const filepath = path.resolve(__dirname, "../fishes/when-to-use-never-and-unknown-in-typescript.html")
//     // const ws = fs.createWriteStream(filepath)
//     let k = 0
//     let buffer = Buffer.alloc(0)
//     res.on("data", (d) => {
//         // ws.write(d)
//         buffer += d
//         console.log(k ++)
//     })
//     res.on("end", () => {
//         console.log(buffer.toString("uft8"))
//     })
// })

// <article> 3c 61 72 74 69 63 6c 65 3e
// </article> 3c 2f 61 72 74 69 63 6c 65 3e

// const buf = Buffer.from("</article>", "utf-8")
// let int = null
// let offset = 0
// let length = buf.byteLength
// while (offset < length) {
//     int = buf[offset]
//     console.log(int)
//     offset += 1
// }

let cursor = 0
const totalBuff = Buffer.from("dksmkmsdsa</article>sadasd", "utf-8")

function isBegin() {
    let size = comparsionBuff.byteLength
    const forwards = () => {
        const partial = totalBuff.slice(cursor, cursor + size)
        if (partial.toString() === "<article>") {
            return false
        } else {
            cursor += 1
            return true
        }
    }
}
