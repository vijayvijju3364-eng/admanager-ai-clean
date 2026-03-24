export async function GET() {
  const accessToken = "ya29.a0ATkoCc4kiSL-Q6nIm9srpXvfqcUWRWM8ho-KiM1V41yJyWBx7Hwq4GjFiviUIOfHvhdDUBeyef-07tWIYrzgSuLVc7tSxBBt9LMVTMyADKhaXzFKKJJUSP9f24m4lds_HoIUoJ2ZruLdX_NbgsvKLLAAyX5HWNEAe5JT2sR06Yt5rV4JhZTkYnhdWngL_mkYMnuUIngaCgYKAVcSARASFQHGX2Mi24jqy9ogL9HWUylUPKgrrw0206";
  const developerToken = "nYNzF3xlik8NkOAjCf9zYw";

  const res = await fetch(
    "https://googleads.googleapis.com/v14/customers:listAccessibleCustomers",
    {
      method: "GET",
      headers: {
        Authorization: 'Bearer ${accessToken}',
        "developer-token": developerToken,
      },
    }
  );

  const data = await res.json();

  return Response.json(data);
}