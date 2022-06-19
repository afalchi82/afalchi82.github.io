type answer = {
    start: number,
    end?: number,
    correct?: boolean,
};

type answers = answer[];

type scoreObj = {
    score: string,
    correct: number,
    total: number,
};

export default class Score {
    private answers: answers = [];

    public getScore(): scoreObj {
        const answerTimes: number = this.answers.reduce((tot: number, curr: answer) => {
            if (!curr.end) return tot;

            tot += curr.end - curr.start;
            return tot;
        }, 0);

        const correctCount: number = this.answers.reduce((tot, curr) => {
            curr.correct ? tot += 1 : null;
            return tot;
        }, 0);

        return {
            score: ((answerTimes / this.answers.length) / 1000).toFixed(3) + "s",
            correct: correctCount,
            total: this.answers.length
        };
    }

    public addResult(timeEnd: number, correct: boolean): void {
        const lastIndex = this.answers.length - 1;
        this.answers[lastIndex].end = timeEnd;
        this.answers[lastIndex].correct = correct;
    }

    public newQuestion(): void {
        this.answers.push({
            start: Date.now()
        })
    }
}
