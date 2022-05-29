export default class Score {
    score = [];
    getScore() {
        const answerTimes = this.score.reduce((tot, curr) => {
            const answerTime = curr.end - curr.start;
            tot += answerTime;
            return tot;
        }, 0);
        return ((answerTimes / this.score.length) / 1000).toFixed(3) + "s";
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
