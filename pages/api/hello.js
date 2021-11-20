// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // get api key from environment variable
  const apiKey = process.env.API_KEY;
  //return apiKey
  res.statusCode = 200;
  res.json({ apiKey });
}
