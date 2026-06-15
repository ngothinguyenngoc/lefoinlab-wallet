
import { walletRepository } from "@/repositories/wallet.repository";
import { withTransaction } from "@/lib/transaction";

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
    return withTransaction(async (tx) => {
      let wallet =
        await walletRepository.findByUserId(
          userId,
          tx
        );

      if (!wallet) {
        wallet =
          await walletRepository.create(
            userId,
            tx
          );
      }

      const newBalance =
        wallet.balance + amount;

      const updatedWallet =
        await walletRepository.updateBalance(
          userId,
          newBalance,
          tx
        );

      await walletRepository.createTransaction(
        wallet.id,
        amount,
        "CREDIT",
        reason,
        tx
      );

      return {
        userId: updatedWallet.userId,
        balance: updatedWallet.balance,
      };
    });
  }

  async debit(
    userId: string,
    amount: number,
    reason = "Debit"
  ) {
    return withTransaction(async (tx) => {
      let wallet =
        await walletRepository.findByUserId(
          userId,
          tx
        );

      if (!wallet) {
        wallet =
          await walletRepository.create(
            userId,
            tx
          );
      }

      if (wallet.balance < amount) {
        throw new Error(
          "Insufficient balance"
        );
      }

      const newBalance =
        wallet.balance - amount;

      const updatedWallet =
        await walletRepository.updateBalance(
          userId,
          newBalance,
          tx
        );

      await walletRepository.createTransaction(
        wallet.id,
        -amount,
        "DEBIT",
        reason,
        tx
      );

      return {
        userId: updatedWallet.userId,
        balance: updatedWallet.balance,
      };
    });
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
