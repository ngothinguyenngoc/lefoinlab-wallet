
import { NextRequest } from "next/server";

import { walletService } from "@/services/wallet.service";
import { success, fail, serverError } from "@/utils/response";

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get("userId");

    if (!userId) {
      return fail("userId is required", 400);
    }

    const balance = await walletService.getBalance(userId);

    return success(balance);
  } catch (error) {
    return serverError(error);
  }
}
