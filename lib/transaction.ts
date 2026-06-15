
import { prisma } from "@/lib/prisma";

export async function withTransaction<T>(
  callback: (tx: any) => Promise<T>
): Promise<T> {
  return prisma.$transaction(callback);
}
