export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
    'payOut' : IDL.Func([], [IDL.Text], ['update']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], ['update'])
  });
};
export const init = ({ IDL }) => { return []; };
