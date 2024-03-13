const gameBoard = (function () {
    function createCell() {
        return { mark: "", isCellAlreadyMarked: false }
    }

    function createRow() {
        // TODO update to for loop
        return [createCell(), createCell(), createCell()]
    }

    function createBoard() {
        // TODO update to for loop
        return [createRow(), createRow(), createRow()]
    }

    let board = createBoard()

    function getBoard() {
        return board
    }

    function playerInput(rowNumber, columnNumber, mark) {
        // Mark is X or O
        // X is Player 1 and O is Player 2
        const inputCell = getBoardCell(rowNumber, columnNumber)

        if (isCellAlreadyMarked(inputCell)) return "Cell Already Marked"

        updateBoardCell(inputCell, mark)

        if (isWinCondition(rowNumber, columnNumber)) return "Won"

        if (isDraw()) return "Draw"

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
        inputCell.mark = mark
        inputCell.isCellAlreadyMarked = true
    }

    function isDraw() {
        return areAllCellMarked()
    }

    function areAllCellMarked() {
        const board = getBoard()
        for (let row of board) {
            for (let cell of row) {
                if (!cell.isCellAlreadyMarked) {
                    return false
                }
            }
        }
        return true
    }

    function isWinCondition(rowNumber, columnNumber) {
        // We only need to check for matchs in the input row and column
        if (isRowHasSameMarks(rowNumber)) return true
        if (isColumnHasSameMarks(columnNumber)) return true
        if (isDiagonalHasSameMarks()) return true

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

    function isDiagonalHasSameMarks() {
        const board = getBoard()
        const topLeftDiagonalFlag = board[0][0].mark !== "" && board[0][0].mark === board[1][1].mark && board[1][1].mark === board[2][2].mark
        const topRightDiagonalFlag = board[0][2].mark !== "" && board[0][2].mark === board[1][1].mark && board[1][1].mark === board[2][0].mark

        if (topLeftDiagonalFlag) return true
        if (topRightDiagonalFlag) return true
        return false
    }

    function resetBoard() {
        board = createBoard()
    }


    return { getBoard, playerInput, resetBoard }

})()

const { player1, player2 } = (function () {
    function createPlayer(name = "", active = false, mark = "") {
        let score = 0
        const getName = () => name
        const setName = (newName) => name = newName
        const setActive = () => active = true
        const isActive = () => active
        const getMark = () => mark
        const getScore = () => score
        const setScore = (newScore) => score = newScore
        return { getName, setName, setActive, isActive, getMark, getScore, setScore }

    }
    const player1 = createPlayer("X", true, "X")
    const player2 = createPlayer("O", false, "O")

    return { player1, player2 }
})()

const gameMaster = (function () {
    const main = document.querySelector("main")
    const messageBox = document.querySelector("header").children[0]
    let gameEnded = false

    function start() {
        render()
    }

    function playerInput(rowNumber, columnNumber) {
        const mark = getActivePlayer().getMark()
        const result = gameBoard.playerInput(rowNumber, columnNumber, mark)

        if (gameEnded) {
            resetGame()
            return
        }

        if (result) {
            handleResult(result)
            return
        }

        toggleActivePlayer()
        re_render()

    }

    function handleResult(result) {
        switch (result) {
            case "Draw":
                handleDrawMessage()
                break;

            case "Won":
                handleWinMessage()
                break;

            case "Cell Already Marked":
                handleCellAlreadyMarkedMessage()
                break;

            default:
                break;
        }
    }

    function handleDrawMessage() {
        displayMessage("Draw")
        re_render()
        gameEnded = true
    }

    function handleWinMessage() {
        re_render()
        if (player1.isActive) {
            displayMessage(`${player1.getName()} Won`)
        } else {
            displayMessage(`${player2.getName()} Won`)
        }
        gameEnded = true
    }

    function handleCellAlreadyMarkedMessage() {
        displayMessage("Box Already Marked")
    }

    function render() {
        displayCurrentGameBoard()
    }

    function re_render() {
        render()
    }

    function resetGame() {
        gameBoard.resetBoard()
        toggleActivePlayer()
        re_render()
        gameEnded = false
    }

    function displayCurrentGameBoard() {
        const board = gameBoard.getBoard()
        main.innerHTML = ""

        let rowNumber = 0

        for (let row of board) {
            let columnNumber = 0

            for (let cell of row) {
                const div = document.createElement("div")

                div.innerText = cell.mark
                div.dataset.coordinate = `${rowNumber}${columnNumber++}`
                div.addEventListener("click", onCellClick)

                main.appendChild(div)
            }
            rowNumber++
        }
    }

    function onCellClick(e) {
        const [rowNumber, columnNumber] = e.target.dataset.coordinate.split("")
        playerInput(rowNumber, columnNumber)
    }

    function getActivePlayer() {
        if (player1.isActive) return player1
        return player2
    }

    function toggleActivePlayer() {
        if (player1.isActive) {
            player2.isActive = true
            player1.isActive = false
            displayMessage(`${player2.getName()} Turn`)
            return
        }
        player1.isActive = true
        player2.isActive = false
        displayMessage(`${player1.getName()} Turn`)
    }

    function displayMessage(message) {
        messageBox.innerText = message
    }

    return { start }
})()

gameMaster.start()


