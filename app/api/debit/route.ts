
import { NextRequest } from "next/server";

import { walletService } from "@/services/wallet.service";
import {
  success,
  fail,
  serverError,
} from "@/utils/response";

export async function POST(
  request: NextRequest
) {
  try {
    const body = await request.json();

    const {
      userId,
      amount,
      reason,
    } = body;

    if (!userId) {
      return fail(
        "userId is required",
        400
      );
    }

    if (
      typeof amount !== "number" ||
      amount <= 0
    ) {
      return fail(
        "amount must be greater than 0",
        400
      );
    }

    const wallet =
      await walletService.debit(
        userId,
        amount,
        reason
      );

    return success(
      wallet,
      "Wallet debited successfully"
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message ===
        "Insufficient balance"
    ) {
      return fail(
        "Insufficient balance",
        400
      );
    }

    return serverError(error);
  }
}
