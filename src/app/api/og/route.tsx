import { ImageResponse } from 'next/og';
// App router includes @vercel/og.
// No need to install it.
 
export const runtime = 'edge';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title')

  // Make sure the font exists in the specified path:
  const fontData = await fetch(
    new URL('./Mukta-Regular.ttf', import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          fontSize: 100,
          fontFamily: 'Mukta',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '50px',
          color: '#fff',
          backgroundColor: '#121212'
        }}
      >
        {title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Mukta',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  );
}