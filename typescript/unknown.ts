const a: unknown = 0

const isArray = (n) => Array.isArray(n)

if (isArray(a)) {
}

type G = { age: number }
type K = { name: string } & G

interface H {
    age: number
}

const age = {
    age: 90,
    name: "s"
}

type R = typeof age

"is H contains R?"

let y: R

interface J extends H {
    name: string
}

let j: J