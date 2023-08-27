import "./Board.css";
import Tile from "./Tile.jsx"
import { useEffect, useRef, useState } from "react";

function Board() {
  const [tilesAdded, setTilesAdded] = useState([]);
  const boardRef = useRef(null);
  const tilesRef = useRef([]);

  useEffect(() => {
    let append = false;
    let current = {};

    function onKeyDown(ev) {
      ev.preventDefault();
      if (ev.key.length === 1) {
        if (ev.key === "[") {
          current = { letters: "" };
          setTilesAdded((previous) => [...previous, current]);
          append = true;
        } else if (ev.key === "]") {
          append = false;
          current = {};
        } else {
          if (append) {
            tilesRef.current.length && tilesRef.current[tilesRef.current.length-1].addLetters(ev.key);
          } else {
            setTilesAdded((previous) => [...previous, { letters: ev.key }]);
          }
        }
      } else {
        if (ev.key === "Backspace") {
          setTilesAdded((previous) => previous.slice(0, -1));
          tilesRef.current = tilesRef.current.slice(0, -1);
        } else if (ev.key === "Enter") {
          setTilesAdded((previous) => [...previous, { letters: ev.key }]);
        }
      }
    }

    boardRef?.current?.addEventListener("keydown", onKeyDown);
    return () => {
      boardRef?.current?.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  let left = 0;
  let top = 0;
  const margin = 4;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div ref={boardRef} className="board" tabIndex={0}>
              {tilesAdded.map((member, i) => {
                if (member.letters === "Enter") {
                  left = 0;
                  top += 50 + margin;
                } else if (member.letters === " ") {
                  left += 50 + margin;
                } else {
                  member.left = left;
                  member.top = top;
                  left += 50 + margin;

                  return <Tile
                    key={i}
                    ref={el => tilesRef.current[i] = el}
                    {...member}></Tile>;
                  }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
