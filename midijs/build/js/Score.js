export default class Score {
    answers = [];
    getScore() {
        const answerTimes = this.answers.reduce((tot, curr) => {
            if (!curr.end)
                return tot;
            tot += curr.end - curr.start;
            return tot;
        }, 0);
        const correctCount = this.answers.reduce((tot, curr) => {
            curr.correct ? tot += 1 : null;
            return tot;
        }, 0);
        return {
            score: ((answerTimes / this.answers.length) / 1000).toFixed(3) + "s",
            correct: correctCount,
            total: this.answers.length
        };
    }
    addResult(timeEnd, correct) {
        const lastIndex = this.answers.length - 1;
        this.answers[lastIndex].end = timeEnd;
        this.answers[lastIndex].correct = correct;
    }
    newQuestion() {
        this.answers.push({
            start: Date.now()
        });
    }
}
