import { FilterType, SplToken } from '@solana-suite/spl-token';

const handleSuccess = (metadata: any) => {
  console.log('トークンメタデータが正常に取得されました。', metadata);
};

const handleError = (error: Error) => {
  console.error('エラーが発生しました: ', error);
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export const getTransactionHistory = async (mint, owner) => {
  const hist1 = await SplToken.findByOwner(owner, handleSuccess, handleError, {
    sortDirection: SortDirection.Desc,
    isHolder: true,
  });
  return hist1;
};
