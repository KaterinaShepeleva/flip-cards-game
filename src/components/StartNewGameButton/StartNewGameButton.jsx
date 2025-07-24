function StartNewGameButton(props) {
    const { startNewGame } = props;
    
    return (
        <button
            type="button"
            className="btn btn-start-new"
            onClick={startNewGame}
        >
            Start New Game
        </button>
    );
}

export default StartNewGameButton;
