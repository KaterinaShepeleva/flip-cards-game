function RestartButton(props) {
    const { restart } = props;
    
    return (
        <button
            type="button"
            className="btn btn-restart"
            onClick={restart}
        >
            Restart Game
        </button>
    );
}

export default RestartButton;
