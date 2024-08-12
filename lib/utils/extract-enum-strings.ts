import {
  TransferFromError,
  TransferError,
} from '@dfinity/ledger-icrc/dist/candid/icrc_ledger';

export function extractTransferErrorMessage(error: TransferFromError): string {
  if ('GenericError' in error) {
    return error.GenericError.message;
  } else if ('TemporarilyUnavailable' in error) {
    return 'The service is temporarily unavailable.';
  } else if ('InsufficientAllowance' in error) {
    return `Insufficient allowance: ${error.InsufficientAllowance.allowance}`;
  } else if ('BadBurn' in error) {
    return `Bad burn amount: ${error.BadBurn.min_burn_amount}`;
  } else if ('Duplicate' in error) {
    return `Duplicate transaction of: ${error.Duplicate.duplicate_of}`;
  } else if ('BadFee' in error) {
    return `Bad fee, expected: ${error.BadFee.expected_fee}`;
  } else if ('CreatedInFuture' in error) {
    return `Transaction created in future, ledger time: ${error.CreatedInFuture.ledger_time}`;
  } else if ('TooOld' in error) {
    return 'Transaction is too old.';
  } else if ('InsufficientFunds' in error) {
    return `Insufficient funds, balance: ${error.InsufficientFunds.balance}`;
  }
  return 'Unknown error';
}

export function extractTransferErrorMessage1(error: TransferError): string {
  if ('GenericError' in error) {
    return error.GenericError.message;
  } else if ('TemporarilyUnavailable' in error) {
    return 'The service is temporarily unavailable.';
  } else if ('BadBurn' in error) {
    return `Bad burn amount: ${error.BadBurn.min_burn_amount}`;
  } else if ('Duplicate' in error) {
    return `Duplicate transaction of: ${error.Duplicate.duplicate_of}`;
  } else if ('BadFee' in error) {
    return `Bad fee, expected: ${error.BadFee.expected_fee}`;
  } else if ('CreatedInFuture' in error) {
    return `Transaction created in future, ledger time: ${error.CreatedInFuture.ledger_time}`;
  } else if ('TooOld' in error) {
    return 'Transaction is too old.';
  } else if ('InsufficientFunds' in error) {
    return `Insufficient funds, balance: ${error.InsufficientFunds.balance}`;
  }
  return 'Unknown error';
}
