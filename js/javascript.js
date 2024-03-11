const gameBoard = (function () {
    function createBoard() {
        function createCell() {
            return { mark: "", isCellAlreadyMarked: false }
        }

        function createRow() {
            // TODO update to for loop
            return [createCell(), createCell(), createCell()]
        }

        function createBoard() {
            return [createRow(), createRow(), createRow()]
        }

        // TODO update to for loop
        const board = createBoard()

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
            inputCell.mark = mark
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


        return { getBoard, playerInput }
    }

    return createBoard()
})()

const { player1, player2 } = (function () {
    function createPlayer(name = "") {
        const getName = () => name
        const setName = (newName) => name = newName
        return { name, getName, setName }

    }
    const player1 = createPlayer()
    const player2 = createPlayer()

    return { player1, player2 }
})()

console.log(gameBoard.playerInput(1, 1, true))
console.log(gameBoard.playerInput(0, 1, true))
console.log(gameBoard.playerInput(1, 1, true))
console.log(gameBoard.playerInput(2, 1, true))

console.log(gameBoard.getBoard())