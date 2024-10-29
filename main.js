let student = [
    {
        name: "John",
        score: 50,
        grade: 'A'
    },
    {
        name: "Bob",
        score: 60,
        grade: 'B'
    },
    {
        name: "Nick",
        score: 70,
        grade: 'C'
    }
]

let st = student.find((s) => {
    if (s.name == 'Bob') {
        return true
    }
})

console.log(st)

let doubleScore = student.map((s) => {
    s.score = s.score * 2
    return s
})

console.log(doubleScore)

let highScore = student.filter((s) => {
    return s.score > 120
})
console.log(highScore)