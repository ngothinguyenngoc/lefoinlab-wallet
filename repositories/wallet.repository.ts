
import { prisma } from "@/lib/prisma";

export class WalletRepository {
  async findByUserId(userId: string) {
    return prisma.wallet.findUnique({
      where: {
        userId,
      },
    });
  }

  async create(userId: string) {
    return prisma.wallet.create({
      data: {
        userId,
      },
    });
  }

  async updateBalance(userId: string, balance: number) {
    return prisma.wallet.update({
      where: {
        userId,
      },
      data: {
        balance,
      },
    });
  }

  async createTransaction(
    walletId: string,
    amount: number,
    type: string,
    reason?: string
  ) {
    return prisma.transaction.create({
      data: {
        walletId,
        amount,
        type,
        reason,
      },
    });
  }

  async getTransactions(walletId: string) {
    return prisma.transaction.findMany({
      where: {
        walletId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }
}

export const walletRepository = new WalletRepository();
