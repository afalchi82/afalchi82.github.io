type question = {
    start: number,
    end?: number
};

type score = question[];

export default class Score {
    private score: score = [];

    public getScore(): string {
        const answerTimes: number = this.score.reduce((tot: number, curr: question) => {
            const answerTime = curr.end - curr.start;
            tot += answerTime;
            return tot;
        }, 0);

        return ((answerTimes / this.score.length) / 1000).toFixed(3) + "s";
    }

    public addResult(timeEnd: number): void {
        const lastIndex = this.score.length - 1;
        this.score[lastIndex].end = timeEnd;
    }

    public newQuestion(): void {
        this.score.push({
            start: Date.now()
        })
    }
}
