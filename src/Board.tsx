import "./Board.css";

import { useEffect, useRef, useState } from "react";
import Tile, { TileInterface } from "./Tile";

function Board() {
  const [tilesAdded, setTilesAdded] = useState<TileInterface[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onMouseUp() {
      boardRef?.current?.focus();
    }

    function onKeyDown(ev: KeyboardEvent) {
      ev.preventDefault();
      if (ev.key.length === 1) {
        const tile = { letters: ev.key };
        setTilesAdded((previous) => [...previous, tile]);
      } else {
        if (ev.key === "Backspace") {
          setTilesAdded((previous) => previous.slice(0, -1));
        } else if (ev.key === "Enter") {
          const tile = { letters: ev.key };
          setTilesAdded((previous) => [...previous, tile]);
        }
      }
    }

    boardRef?.current?.addEventListener("keydown", onKeyDown);
    boardRef?.current?.addEventListener("mouseup", onMouseUp);
    return () => {
      boardRef?.current?.removeEventListener("keydown", onKeyDown);
      boardRef?.current?.removeEventListener("mouseup", onMouseUp);
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
              {tilesAdded.map((member) => {
                if (member.letters === "Enter") {
                  left = 0;
                  top += 50 + margin;
                } else if (member.letters === " ") {
                  left += 50 + margin;
                } else {
                  member.left = left;
                  member.top = top;
                  left += 50 + margin;
                  return <Tile {...member}></Tile>;
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
