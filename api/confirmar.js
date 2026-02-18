import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { error } = await supabase
      .from('confirmacoes')
      .insert([{}]);

    if (error) {
      return res.status(500).json({ error: 'Erro ao confirmar' });
    }

    const { count } = await supabase
      .from('confirmacoes')
      .select('*', { count: 'exact', head: true });

    return res.status(200).json({ total: count });
  }

  if (req.method === 'GET') {
    const { count } = await supabase
      .from('confirmacoes')
      .select('*', { count: 'exact', head: true });

    return res.status(200).json({ total: count });
  }

  res.status(405).end();
}
