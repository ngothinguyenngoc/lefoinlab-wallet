
import { walletRepository } from "@/repositories/wallet.repository";

export class WalletService {
  async getWallet(userId: string) {
    let wallet = await walletRepository.findByUserId(userId);

    if (!wallet) {
      wallet = await walletRepository.create(userId);
    }

    return wallet;
  }

  async getBalance(userId: string) {
    const wallet = await this.getWallet(userId);

    return {
      userId: wallet.userId,
      balance: wallet.balance,
    };
  }

  async credit(
    userId: string,
    amount: number,
    reason = "Credit"
  ) {
    const wallet = await this.getWallet(userId);

    const newBalance = wallet.balance + amount;

    const updatedWallet =
      await walletRepository.updateBalance(
        userId,
        newBalance
      );

    await walletRepository.createTransaction(
      wallet.id,
      amount,
      "CREDIT",
      reason
    );

    return updatedWallet;
  }

  async debit(
    userId: string,
    amount: number,
    reason = "Debit"
  ) {
    const wallet = await this.getWallet(userId);

    if (wallet.balance < amount) {
      throw new Error("Insufficient balance");
    }

    const newBalance = wallet.balance - amount;

    const updatedWallet =
      await walletRepository.updateBalance(
        userId,
        newBalance
      );

    await walletRepository.createTransaction(
      wallet.id,
      -amount,
      "DEBIT",
      reason
    );

    return updatedWallet;
  }

  async getTransactions(userId: string) {
    const wallet = await this.getWallet(userId);

    return walletRepository.getTransactions(
      wallet.id
    );
  }
}

export const walletService =
  new WalletService();
