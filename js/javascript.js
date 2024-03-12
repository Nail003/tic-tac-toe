const gameBoard = (function () {
    function createCell() {
        return { mark: ".", isCellAlreadyMarked: false }
    }

    function createRow() {
        // TODO update to for loop
        return [createCell(), createCell(), createCell()]
    }

    function createBoard() {
        return [createRow(), createRow(), createRow()]
    }

    // TODO update to for loop
    let board = createBoard()

    function getBoard() {
        return board
    }

    function playerInput(rowNumber, columnNumber, mark) {
        // Mark is true or false
        // True is tick and false is cross
        const inputCell = getBoardCell(rowNumber, columnNumber)

        if (isCellAlreadyMarked(inputCell)) return "Input Error: Cell Already Marked"
        updateBoardCell(inputCell, mark)
        if (isWinCondition(rowNumber, columnNumber)) return true

        return false
    }

    function getBoardCell(rowNumber, columnNumber) {
        const board = getBoard()
        return board[rowNumber][columnNumber]
    }

    function isCellAlreadyMarked(inputCell) {
        return inputCell.isCellAlreadyMarked
    }

    function updateBoardCell(inputCell, mark) {
        inputCell.mark = mark ? "X" : "T"
        inputCell.isCellAlreadyMarked = true
    }

    function isWinCondition(rowNumber, columnNumber) {
        // We only need to check for matchs in the input row and column
        if (isRowHasSameMarks(rowNumber)) {
            return true
        }

        if (isColumnHasSameMarks(columnNumber)) {
            return true
        }

        return false
    }

    function isRowHasSameMarks(rowNumber) {
        const board = getBoard()
        const firstCell = board[rowNumber][0]

        for (cell of board[rowNumber]) {
            // We don't need to check for first cell
            // But I'm lazy
            if (cell.mark !== firstCell.mark) {
                return false
            }
        }
        return true
    }

    function isColumnHasSameMarks(columnNumber) {
        const board = getBoard()
        const firstCell = board[0][columnNumber]

        for (row of board) {
            if (row[columnNumber].mark !== firstCell.mark) {
                return false
            }
        }
        return true
    }

    function resetBoard() {
        board = createBoard()
    }


    return { getBoard, playerInput, resetBoard }

})()

const { player1, player2 } = (function () {
    function createPlayer(name = "", active = false) {
        const getName = () => name
        const setName = (newName) => name = newName
        const setActive = () => active = true
        const isActive = () => active
        return { getName, setName, setActive, isActive }

    }
    const player1 = createPlayer("Player 1", true)
    const player2 = createPlayer("Player 2")

    return { player1, player2 }
})()

const gameMaster = (function () {
    function start() {
        render()
    }

    function playerInput(rowNumber, columnNumber, mark) {
        const result = gameBoard.playerInput(rowNumber, columnNumber, mark)
        if (typeof result === "string") {
            console.log("Cell Already Marked")
            return
        }

        if (result) {
            re_render()
            if (player1.isActive) {
                console.log("Player 1 Won")
            } else {
                console.log("Player 2 Won")
            }
            gameBoard.resetBoard()
        }

        toggleActivePlayer()

        re_render()

    }

    function render() {
        // promptForPlayerNames()
        welcomePlayer()
        displayGameBoard()
    }

    function re_render() {
        displayGameBoard()
    }

    function promptForPlayerNames() {
        const player1Name = prompt("Player 1 Name?")
        const player2Name = prompt("Player 2 Name?")
        player1.setName(player1Name)
        player2.setName(player2Name)
    }

    function welcomePlayer() {
        console.log(`Welcome ${player1.getName()} and ${player2.getName()}`)
    }

    function displayGameBoard() {
        const board = gameBoard.getBoard()
        let displayBoardString = ""

        console.log("---------")
        for (let row of board) {
            for (let cell of row) {
                displayBoardString += ` ${cell.mark} `
            }
            displayBoardString += "\n"
        }
        console.log(displayBoardString)
    }

    function toggleActivePlayer() {
        if (player1.isActive) {
            player2.isActive = true
            player1.isActive = false
            return
        }
        player1.isActive = true
        player2.isActive = false
    }

    return { start, playerInput }
})()

gameMaster.start()


