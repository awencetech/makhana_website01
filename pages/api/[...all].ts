import type { NextApiRequest, NextApiResponse } from 'next';
import app from '../../backend/server/server';

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  app(req, res);
}
