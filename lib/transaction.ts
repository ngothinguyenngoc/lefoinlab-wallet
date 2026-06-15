
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

/**
 * Execute multiple database operations
 * in a single atomic transaction.
 */
export async function withTransaction<T>(
  callback: (tx: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
  return prisma.$transaction(async (tx) => {
    return callback(tx);
  });
}
