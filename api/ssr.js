import { render } from '../src/pages/index.page.jsx';

export default async function handler(req, res) {
  try {
    const html = await render({ Page: render.Page, props: {} });

    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
