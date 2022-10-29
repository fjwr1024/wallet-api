// tokenAmountが1のものでフィルター
// この関数を通さないと、NFTではないトークン(通貨)や現在所持していないものがリストに含まれる
export const filterOwnToken = tokenInfoOwned => {
  const response = tokenInfoOwned.filter(v => v.tokenAmount === 1);
  return response;
};
