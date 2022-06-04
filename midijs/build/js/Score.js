export default class Score {
    score = [];
    getScore() {
        const answerTimes = this.score.reduce((tot, curr) => {
            const answerTime = curr.end - curr.start;
            tot += answerTime;
            return tot;
        }, 0);
        return {
            score: ((answerTimes / this.score.length) / 1000).toFixed(3) + "s",
            questions: this.score.length
        };
    }
    addResult(timeEnd) {
        const lastIndex = this.score.length - 1;
        this.score[lastIndex].end = timeEnd;
    }
    newQuestion() {
        this.score.push({
            start: Date.now()
        });
    }
}
