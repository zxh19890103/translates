const http = require("http")

const options = {
    protocol: 'http:',
    method: "POST",
    host: "www.zhangxinghai.cn",
    path: "/ajax/post",
    headers: {
        'Postman-Token': 'f667092b-3878-4600-8baf-7350719c89e5',
        'cache-control': 'no-cache',
        'Content-Type': `application/x-www-form-urlencoded; charset=UTF-8`,
        'Cookie': `_csrf=9e0e9c173c2ca681d09f06a7fad7a18213299c11ccb351cd4ecc4759d6f788b8a%3A2%3A%7Bi%3A0%3Bs%3A5%3A%22_csrf%22%3Bi%3A1%3Bs%3A32%3A%22%F1%E6Y%81%8F%2C%27%21J%96%93%9B%B4ue%1B%82z%94%AB%5D%8D%D1%CA%27%B4%F8%5C%D4%CC%89-%22%3B%7D; PHPSESSID=4a0vhgc33vbt7ldkd05ka8erh7`,
        'X-Requested-With': 'XMLHttpRequest',
    }
}
const req = http.request(options, (res) => {
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
    res.on("error", (e) => {
        console.error(`problem with response: ${e.message}`);
    })
})

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
})

const payload = new URLSearchParams({
    content: `<p>测试用的 + mod kk kkkk oopop klklkl</p>`,
    _csrf: `LNNvufzM5ZwPUq56mKRv-pOOxzPoBcYRwsdLQquLxlrdNTY4c-DCvUXEPeEs0QrhEfRTmLWIF9vlc7Mef0dPdw==`,
    id: 72,
}).toString()
const payload2 = `content=%3Cp%3E%E6%B5%8B%E8%AF%95%E7%94%A8%E7%9A%84+%2B+mod+kk+kkkk+oopop+klklkl%3C%2Fp%3E_csrf=LNNvufzM5ZwPUq56mKRv-pOOxzPoBcYRwsdLQquLxlrdNTY4c-DCvUXEPeEs0QrhEfRTmLWIF9vlc7Mef0dPdw%3D%3Did=72`
console.log(payload === payload2)
req.write(payload2)
req.end()