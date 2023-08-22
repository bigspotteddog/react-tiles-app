import "./Board.css";

import { useEffect, useRef, useState } from "react";
import Tile, { TileInterface } from "./Tile";

function Board() {
  const [tilesAdded, setTilesAdded] = useState<TileInterface[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let append = false;
    let current = {} as TileInterface;

    function onKeyDown(ev: KeyboardEvent) {
      ev.preventDefault();
      if (ev.key.length === 1) {
        if (ev.key === "[") {
          current = { letters: "" } as TileInterface;
          setTilesAdded((previous) => [...previous, current]);
          append = true;
        } else if (ev.key === "]") {
          append = false;
          current = {} as TileInterface;
        } else {
          if (append) {
            setTilesAdded((added) => {
              let addTo = added.slice(0, -1);
              current.letters += ev.key;
              addTo.push(current);
              return addTo;
            });
          } else {
            setTilesAdded((previous) => [...previous, { letters: ev.key }]);
          }
        }
      } else {
        if (ev.key === "Backspace") {
          setTilesAdded((previous) => previous.slice(0, -1));
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
