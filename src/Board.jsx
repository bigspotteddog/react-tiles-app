import "./Board.css";
import Tile from "./Tile.jsx";
import { useEffect, useRef, useState } from "react";

let tilesAdded, setTilesAdded;
let boardRef, tilesRef;

function Board() {
  [tilesAdded, setTilesAdded] = useState([]);
  boardRef = useRef(null);
  tilesRef = useRef([]);

  useEffect(() => {
    boardRef?.current?.addEventListener("keydown", onKeyDown);
    return () => {
      boardRef?.current?.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  let left = 0;
  let top = 0;
  let width = 50;
  let height = 50;
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
                  member.width = width;
                  member.height = height;
                  left += 50 + margin;

                  return (
                    <Tile
                      key={i}
                      ref={(el) => (tilesRef.current[i] = el)}
                      {...member}
                    ></Tile>
                  );
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
        tilesRef.current.length &&
          tilesRef.current[tilesRef.current.length - 1].addLetters(ev.key);
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
