import { NextResponse } from "next/server";

export async function GET() {
  const accessToken = process.env.GOOGLE_ACCESS_TOKEN!;
  const developerToken = process.env.GOOGLE_DEVELOPER_TOKEN!;

  const res = await fetch(
    "https://googleads.googleapis.com/v14/customers:listAccessibleCustomers",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "developer-token": developerToken,
      },
    }
  );

  const data = await res.json();
  return NextResponse.json(data);
}
      