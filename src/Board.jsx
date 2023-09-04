import "./Board.css";
import Tile from "./Tile.jsx";
import Cursor from "./Cursor.jsx";
import { useEffect, useRef, useState } from "react";

let tiles, setTiles, translate, setTranslate;
let boardRef, tilesRef, moveRef;

let append = false;
let current = {};

const Board = function () {
  [tiles, setTiles] = useState([]);
  boardRef = useRef(null);
  tilesRef = useRef([]);
  moveRef = useRef(null);
  [translate, setTranslate] = useState([]);

  const boardLeft = boardRef.current?.getBoundingClientRect().left;
  const boardTop = boardRef.current?.getBoundingClientRect().top;

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
            <div
              ref={boardRef}
              className="board"
              tabIndex={0}
              onPointerMove={(ev) => {
                if (ev.buttons === 1) {
                  if (
                    tiles &&
                    moveRef.current?.target.getAttribute("data-id")
                  ) {
                    const id = +moveRef.current.target.getAttribute("data-id");
                    let x =
                      ev.clientX -
                      (boardLeft + tiles[id].left) +
                      moveRef.current.offsetX -
                      5;

                    x = x - (x % 3);

                    let y =
                      ev.clientY -
                      (boardTop + tiles[id].top) +
                      moveRef.current.offsetY -
                      5;

                    y = y - (y % 3);

                    setTranslate((t) => {
                      const copy = t.splice();
                      copy[id] = { x: x, y: y };
                      return copy;
                    });
                  }
                }
              }}
              onPointerDown={(ev) => {
                let target = getTarget(ev);
                const targetRect = target.getBoundingClientRect();
                const targetX = targetRect.left;
                const targetY = targetRect.top;
                const offsetX = targetX - ev.clientX;
                const offsetY = targetY - ev.clientY;

                moveRef.current = {
                  target: target,
                  offsetX: offsetX,
                  offsetY: offsetY,
                };
              }}
              onPointerUp={(ev) => {
                if (moveRef.current) {
                  moveRef.current = null;
                }
              }}
            >
              {tiles.map((member, i) => {
                member.id = i;
                if (member.letters === "Enter") {
                  left = 0;
                  top += height + margin;
                } else if (member.letters === " ") {
                  left += width + margin;
                } else {
                  member.left = left;
                  member.top = top;
                  member.width = width;
                  member.height = height;
                  left += width + margin;

                  return (
                    <Tile
                      key={i}
                      ref={(el) => (tilesRef.current[i] = el)}
                      {...member}
                      translate={translate[i]}
                    ></Tile>
                  );
                }
              })}
              <Cursor top={top + margin} left={left + 2}></Cursor>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;

const onKeyDown = function (ev) {
  ev.preventDefault();
  if (ev.key.length === 1) {
    if (ev.key === "[") {
      current = { letters: "" };
      setTiles((previous) => [...previous, current]);
      append = true;
    } else if (ev.key === "]") {
      append = false;
      current = {};
    } else {
      if (append) {
        tilesRef.current.length &&
          tilesRef.current[tilesRef.current.length - 1].addLetters(ev.key);
      } else {
        setTiles((previous) => [...previous, { letters: ev.key }]);
      }
    }
  } else {
    if (ev.key === "Backspace") {
      setTiles((previous) => previous.slice(0, -1));
      tilesRef.current = tilesRef.current.slice(0, -1);
    } else if (ev.key === "Enter") {
      setTiles((previous) => [...previous, { letters: ev.key }]);
    }
  }
};

function getTarget(ev) {
  let target = ev.target;
  if (target.className === "tile-content") {
    target = target.parentElement;
  }
  return target;
}
