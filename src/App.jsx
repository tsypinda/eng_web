import { useState, useEffect, useRef } from 'react';



function Player({playerX, setPlayerX}) {
  const buttonStyle = {
    width: '100px',      // Фиксированная ширина
    padding: '10px 0',   // Отступы сверху/снизу, по бокам 0 (так как ширина фиксирована)
    fontSize: '16px',    // Размер текста
    cursor: 'pointer'    // Курсор в виде руки при наведении
  };
  return (
    <div style={{
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100vh', 
      pointerEvents: 'none'}}>
        <div style={{
          position: 'absolute', 
          left: `${playerX}%`, 
          top: '80%', 
          transition: 'left 0.2s', 
          fontSize: '50px', 
          transform: 'translateX(-50%)'}}>
          {playerX/10}
        </div>

      <div style={{
        position: 'absolute', 
        bottom: '20px', 
        width: '100%', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '50px',
        pointerEvents: 'auto'
        }}>
        <button onClick={() => setPlayerX(20)} style={buttonStyle}>
        LEFT
        </button>
        <button onClick={() => setPlayerX(50)} style={buttonStyle}>
        MIDDLE
        </button>
        <button onClick={() => setPlayerX(80)} style={buttonStyle}>
        RIGHT
        </button>
      </div>
    </div>
  );
}

function Gates( {yPos}) {
  const boxStyle = {
    backgroundColor: '#555',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '100px',
    fontSize: '20px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
    position: 'absolute',
    transform: 'translateX(-50%)',
    
  };

  return (
    <div style={{
      position: 'absolute', 
      width: '100%',
      height: '100%',
      top: 0,
      left: '0%',
      pointerEvents: 'none'
      }}>
      <div style={{...boxStyle, left: '20%', top: `${yPos}%`}}>Яблоко</div>
      <div style={{...boxStyle, left: '50%', top: `${yPos}%`}}>Окно</div>
      <div style={{...boxStyle, left: '80%', top: `${yPos}%`}}>Арбуз</div>
    </div>
  );
}
function App() {
  const [status, setStatus] = useState("NOT PUT");
  const [gateY, setY] = useState(20);
  const [playerX, setPlayerX] = useState(50);
  const [score, setScore] = useState(0);
  const isCollisionHandled = useRef(false);
  const handleShowWord = () => {
    setStatus("PUT");     // Ставим на паузу
    setScore(0);          // Сбрасываем счет
    setY(20);             // Сбрасываем ворота наверх
    setPlayerX(50);       // Возвращаем игрока в центр
    isCollisionHandled.current = false;
  };
  const handleHideWord = () => {
    setStatus("NOT PUT");
    isCollisionHandled.current = false;
  };

    useEffect(() => {
    if (status === "PUT") return; 

    const timer = setInterval(() => {
      setY((prevY) => {
        if (prevY < 80) isCollisionHandled.current=false;
        if (prevY >= 80) {
          if (!isCollisionHandled.current) {
            if (playerX === 20) setScore((prevScore) => prevScore + 1);
            else setScore(0);  
            isCollisionHandled.current=true;
          }
          return 25;
        }
        return prevY + 1;
      });
    }, 50);
    
      
      return () => clearInterval(timer);
    }, [status, playerX]);
  if (status=="NOT PUT") {

    return (
      <div>
        <h1>Apple</h1>
        <button onClick={handleShowWord}>
          Показать слово
        </button>
        <p>Score: {score}</p>
        <Gates yPos={gateY}/>
        <Player playerX={playerX} setPlayerX={setPlayerX}/>
      </div>
    );
  }
  else {
    return (
      <div>
        <h1>Apple</h1>
        
        <button onClick={handleHideWord}>
          Скрыть слово
        </button>
        <p>Яблоко</p>
      </div>
    );
  }
}


export default App;