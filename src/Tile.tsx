import "./Tile.css";

const VOWELS: string = "aeiouy";

function Tile(tile: TileInterface) {
  let color: string = "blue";
  if (VOWELS.indexOf(tile.letters.toLowerCase()) > -1) {
    color = "orange";
  }

  let classes = `tile shape ${color}`;

  return (
    <>
      <div className={classes} style={{ left: tile.left, top: tile.top }}>
        <div className="content">{tile.letters}</div>
      </div>
    </>
  );
}

export interface TileInterface {
  left?: number;
  top?: number;
  letters: string;
}

export default Tile;
