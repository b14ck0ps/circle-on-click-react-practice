import { useState } from "react";
import "./App.css";
type TPoint = {
  x: number;
  y: number;
};
function App() {
  const [mousePoint, setMousePoint] = useState<TPoint[]>([]);
  const [poppedPoint, setPoppedPoint] = useState<TPoint[]>([]);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setMousePoint((prev) => [...prev, { x: clientX, y: clientY }]);
  };
  const handleClear = () => {
    setMousePoint([]);
    setPoppedPoint([]);
  };
  const handleUndo = () => {
    const newPoint = [...mousePoint];
    const popped = newPoint.pop();
    if (popped) {
      mousePoint.pop();
      setPoppedPoint((prev) => [...prev, popped]);
    }
  };
  const handleRedo = () => {
    const newPoint = [...poppedPoint];
    const popped = newPoint.pop();
    if (popped) {
      setMousePoint((prev) => [...prev, popped]);
      poppedPoint.pop();
    }
  };
  return (
    <>
      <div className="btn">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleRedo}>Redo</button>
        <button id="clear" onClick={handleClear}>
          Clear
        </button>
      </div>

      <div className="App" onClick={handleMouseMove}>
        <div className="mousePoint">
          {mousePoint.map((point, index) => (
            <div
              key={index}
              className="point"
              style={{ left: point.x - 10, top: point.y - 10 }}
            ></div>
          ))}
        </div>
      </div>
      <div className="footer">
        copyRight @ <a href="https://github.com/b14ck0ps">Ajran Hossain</a>
      </div>
    </>
  );
}

export default App;
