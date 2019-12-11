class Game {
    constructor(playgroundQueue) {
        this.playgroundQueue = playgroundQueue;
        this.sideControler = false;
        this.winCombinations = [
            [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
        ]
        this.playerOneMoves = [];
        this.playerTwoMoves = [];
        this.counter = 0;
    }

    setQueue(playgroundQueue, sideControler) {
        if (!sideControler) {
            playgroundQueue.innerHTML = `your move: <i
            class="far fa-circle"></i>`
        }
        else {
            playgroundQueue.innerHTML = `your move: <i class="fas fa-times"></i>`
        }
    }

    setMark(field) {
        if (field.innerHTML == '') {
            if (!this.sideControler) {
                field.innerHTML = '<i class="far fa-circle"></i>';
                this.sideControler = !this.sideControler;
                this.playerOneMoves.push(parseInt(field.dataset.key));
            }
            else if (this.sideControler) {
                field.innerHTML = '<i class="fas fa-times"></i>';
                this.sideControler = !this.sideControler;
                this.playerTwoMoves.push(parseInt(field.dataset.key));
            }
        }

        this.setQueue(this.playgroundQueue, this.sideControler);
    }

    getWinner() {
        if (this.sideControler) {
            this.winCombinations.forEach(combination => {
                let winChecker = combination.every(element => this.playerOneMoves.indexOf(element) > -1);
                if (winChecker) {
                    return 'player1';
                }
                else {
                    return 'draw';
                }
            })
        }

        if (!this.sideControler) {
            this.winCombinations.forEach(combination => {
                let winChecker = combination.every(element => this.playerTwoMoves.indexOf(element) > -1);
                if (winChecker) {
                    return 'player2';
                }
                else {
                    return 'draw';
                }
            })
        }
    }

    gameControler(field) {
        this.setMark(field);
        this.setQueue(this.playgroundQueue, this.sideControler);
        this.getWinner();
    }
}