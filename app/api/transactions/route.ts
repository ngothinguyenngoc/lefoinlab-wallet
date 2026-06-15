import { NextRequest } from "next/server";

import { walletService } from "@/services/wallet.service";
import { success, fail, serverError } from "@/utils/response";

export async function GET(
    request: NextRequest
) {
    try {

        const userId =
            request.nextUrl.searchParams.get(
                "userId"
            );

        if (!userId) {
            return fail(
                "userId is required",
                400
            );
        }

        const transactions =
            await walletService.getTransactions(
                userId
            );

        return success(transactions);

    } catch (error) {

        return serverError(error);

    }
}