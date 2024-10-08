// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

export default function shuffleArray<T>(array: T[]): T[] {
  const newArr = [...array]
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArr[i], newArr[j]] = [newArr[j], newArr[i]]
  }

  return newArr
}
