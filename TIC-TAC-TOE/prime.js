        // Store game status element
        const statusDisplay = document.querySelector('.game--status');

        // Store score elements
        const scoreXDisplay = document.querySelector('.score--x');
        const scoreODisplay = document.querySelector('.score--o');

        // Initialize game variables
        let gameActive = true;
        let currentPlayer = "X";
        let gameState = ["", "", "", "", "", "", "", "", ""];
        let scoreX = 0;
        let scoreO = 0;

        // Winning message and draw message
        const winningMessage = () => `Player ${currentPlayer} has won!`;
        const drawMessage = () => `Game ended in a draw!`;
        const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

        // Set initial game message
        statusDisplay.innerHTML = currentPlayerTurn();

        // Winning conditions
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // Function to handle cell played
        function handleCellPlayed(clickedCell, clickedCellIndex) {
            gameState[clickedCellIndex] = currentPlayer;
            clickedCell.innerHTML = currentPlayer;
            clickedCell.classList.add(currentPlayer);
        }

        // Function to handle player change
        function handlePlayerChange() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusDisplay.innerHTML = currentPlayerTurn();
        }

        // Function to handle result validation
        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i < winningConditions.length; i++) {
                const winCondition = winningConditions[i];
                let a = gameState[winCondition[0]];
                let b = gameState[winCondition[1]];
                let c = gameState[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }

            if (roundWon) {
                statusDisplay.innerHTML = winningMessage();
                gameActive = false;
                updateScore();
                return;
            }

            let roundDraw = !gameState.includes("");
            if (roundDraw) {
                statusDisplay.innerHTML = drawMessage();
                gameActive = false;
                return;
            }

            handlePlayerChange();
        }

        // Function to update score
        function updateScore() {
            if (currentPlayer === "X") {
                scoreX++;
                scoreXDisplay.innerHTML = scoreX;
            } else {
                scoreO++;
                scoreODisplay.innerHTML = scoreO;
            }
        }

        // Function to handle cell click
        function handleCellClick(clickedCellEvent) {
            const clickedCell = clickedCellEvent.target;
            const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

            if (gameState[clickedCellIndex] !== "" || !gameActive) {
                return;
            }

            handleCellPlayed(clickedCell, clickedCellIndex);
            handleResultValidation();
        }

        // Function to handle game restart
        function handleRestartGame() {
            gameActive = true;
            currentPlayer = "X";
            gameState = ["", "", "", "", "", "", "", "", ""];
            statusDisplay.innerHTML = currentPlayerTurn();
            document.querySelectorAll('.cell').forEach(cell => {
                cell.innerHTML = "";
                cell.classList.remove('X', 'O');
            });
        }

        // Event listeners for cell clicks and game restart
        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
        document.querySelector('.game--restart').addEventListener('click', handleRestartGame);