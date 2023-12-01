// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  name: string;
};

const func = async () => {
  const res = await fetch(
    'http://192.168.52.4/Playground/hs/PIXEL/getJournalInfo',
    {
      headers: {
        Authorization:
          'Basic QWRtaW5XZWI6NTU0NURKKiYlKChMREtTSkpGRGZkZ2RzZ2RmaGdk',
        'Content-Type': 'application/json',
      },
    }
  );
  return res.json();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await func();
  res.status(200).json(data);
}
