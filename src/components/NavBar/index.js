import './index.css'

const Navbar = props => {
  const {score, topScore, status} = props

  return (
    <nav className="nav-bar-container">
      <div className="inner-container">
        <div className="title-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="emoji logo"
            className="logo"
          />
          <h1 className="title">Emoji Game</h1>
        </div>
        {status && (
          <div className="scores-container">
            <p className="score">Score: {score}</p>
            <p className="score">Top Score: {topScore}</p>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
