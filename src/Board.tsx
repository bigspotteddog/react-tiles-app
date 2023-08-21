import { useEffect, useRef, useState } from "react";
import Tile, { TileInterface } from "./Tile";

function Board() {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [tilesAdded, setTilesAdded] = useState<TileInterface[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(ev: KeyboardEvent) {
      console.log(ev);
      if (ev.key.length === 1) {
        const tile: TileInterface = {
          letters: ev.key,
        };
        setLeft((left) => {
          tile.left = left;
          return left + 50;
        });
        setTilesAdded((previous) => [...previous, tile]);
      } else {
        if (ev.key === "Backspace") {
          setTilesAdded((previous) => previous.slice(0, -1));
          setLeft((left) => left - 50);
        } else if (ev.key === "Enter") {
          console.log("increment top");
          setTop((top) => top + 50);
        }
      }
    }

    boardRef?.current?.addEventListener("keydown", onKeyDown);
    return () => {
      boardRef?.current?.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <>
      {console.log(tilesAdded)}
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div ref={boardRef} className="board" tabIndex={0}>
              {tilesAdded.map((member) => {
                return <Tile {...member}></Tile>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;
