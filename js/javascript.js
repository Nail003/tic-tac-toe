const GameBoard = (function () {
    function createBoard() {
        function createCell() {
            return { mark: "", lockMarkedCell: false }
        }

        function createRow() {
            // TODO update to for loop
            return [createCell(), createCell(), createCell()]
        }

        // TODO update to for loop
        const Board = [createRow(), createRow(), createRow()]

        function getBoard() {
            return Board
        }

        function playerInput(rowNumber, columnNumber, mark) {
            // Mark is true or false
            // True is tick and false is cross
            Board[rowNumber][columnNumber] = { mark, lockMarkedCell: true }
            return checkForWinCondition(rowNumber, columnNumber)
        }

        function checkForWinCondition(rowNumber, columnNumber) {
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
            const FirstCell = Board[rowNumber][0]
            for (cell of Board[rowNumber]) {
                // We don't need to check for first cell
                // But I'm lazy
                if (cell.mark !== FirstCell.mark) {
                    return false
                }
            }
            return true
        }

        function isColumnHasSameMarks(columnNumber) {
            const FirstCell = Board[0][columnNumber]
            for (row of Board) {
                if (row[columnNumber].mark !== FirstCell.mark) {
                    return false
                }
            }
            return true
        }


        return { getBoard, playerInput }
    }

    return createBoard()
})()

console.log(GameBoard.playerInput(0, 1, true))
console.log(GameBoard.playerInput(2, 1, true))
console.log(GameBoard.playerInput(1, 1, true))


console.log(GameBoard.getBoard())