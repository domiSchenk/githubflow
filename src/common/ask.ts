import { italic } from "chalk";
import { question } from "zx";

export const ask = async (query: string, options: { choices: any; matching: any; defaultAnswer?: any; maxRetries?: any; matchingFn?: any }) => {
    const choices = options?.choices ?? [] // Using ES2021: https://h3manth.com/ES2021/
    const matching = options?.matching ?? []
    const defaultAnswer = options?.defaultAnswer ?? ''
    const maxRetries = options?.maxRetries ?? 100

    if (process.env.CI) return defaultAnswer
    const defaultMatchingFn = (answer: string) =>
        [...new Set(matching.map((val: string) => val.toLowerCase()))]
            .includes(answer.toLowerCase())
    const matchingFn = options?.matchingFn ?? defaultMatchingFn

    let answer = ''
    let tries = 0
    let matches = false
    do {
        answer = await question(`${query}\n> `, { choices })
        matches = await matchingFn(answer)
        tries += 1
        if (answer?.length === 0 && defaultAnswer.length > 0) return defaultAnswer
        if (tries >= maxRetries) throw new Error(`Max retries for: ${italic(query)}`)
    } while (answer.length <= 0 || !matches)
    return answer;
}
