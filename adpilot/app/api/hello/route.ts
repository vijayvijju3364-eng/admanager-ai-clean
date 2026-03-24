// export async function GET() {
//   return new Response(JSON.stringify({ message: "HELLO WORKING" }), {
//     headers: { "Content-Type": "application/json" },
//   });
// }
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: "HELLO WORKING" });
}