
import {
  PrismaClient,
  Prisma,
  TransactionType,
} from "@prisma/client";
import { prisma } from "@/lib/prisma";

type DBClient = PrismaClient | Prisma.TransactionClient;

export class WalletRepository {
  async findByUserId(
    userId: string,
    db: DBClient = prisma
  ) {
    return db.wallet.findUnique({
      where: {
        userId,
      },
    });
  }

  async create(
    userId: string,
    db: DBClient = prisma
  ) {
    return db.wallet.create({
      data: {
        userId,
      },
    });
  }

  async updateBalance(
    userId: string,
    balance: number,
    db: DBClient = prisma
  ) {
    return db.wallet.update({
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
    type: TransactionType,
    reason?: string,
    db: DBClient = prisma
  ) {
    return db.transaction.create({
      data: {
        walletId,
        amount,
        type,
        reason,
      },
    });
  }

  async getTransactions(
    walletId: string,
    db: DBClient = prisma
  ) {
    return db.transaction.findMany({
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
