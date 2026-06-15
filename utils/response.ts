
import { NextResponse } from "next/server";

export function success(
  data: unknown = null,
  message = "OK",
  status = 200
) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    {
      status,
    }
  );
}

export function fail(
  message = "Bad Request",
  status = 400,
  data: unknown = null
) {
  return NextResponse.json(
    {
      success: false,
      message,
      data,
    },
    {
      status,
    }
  );
}

export function serverError(error: unknown) {
  console.error(error);

  return NextResponse.json(
    {
      success: false,
      message: "Internal Server Error",
      data: null,
    },
    {
      status: 500,
    }
  );
}
