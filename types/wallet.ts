
export type TransactionType = "CREDIT" | "DEBIT";

export interface Wallet {
  id: string;
  userId: string;
  balance: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface WalletTransaction {
  id: string;

  walletId: string;

  amount: number;

  type: TransactionType;

  reason?: string | null;

  createdAt: Date;
}

export interface WalletBalance {
  userId: string;

  balance: number;
}

export interface CreditRequest {
  userId: string;

  amount: number;

  reason?: string;
}

export interface DebitRequest {
  userId: string;

  amount: number;

  reason?: string;
}
