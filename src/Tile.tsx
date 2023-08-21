function Tile(tile: TileInterface) {
  return (
    <>
      <div
        className="tile shape blue"
        style={{ left: tile.left, top: tile.top }}
      >
        <div className="content">{tile.letters}</div>
      </div>
    </>
  );
}

export default Tile;

export interface TileInterface {
  left?: number;
  top?: number;
  letters: string;
}
