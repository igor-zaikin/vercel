/* src/app/api/og/route.tsx */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

// подтягиваем локальный шрифт (бандлится в edge-функцию)
const interBold = fetch(
    new URL('../../fonts/Inter-Bold.ttf', import.meta.url)
).then(res => res.arrayBuffer());

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const text = (searchParams.get('text') ?? 'Ну-с, вроде вайбкодицо').slice(0, 240);

    const inter = await interBold;

    return new ImageResponse(
        (
            <div style={{
                width:'100%',height:'100%',display:'flex',
                background:'linear-gradient(135deg,#0f172a,#111827 50%,#1f2937)',
                padding:'64px',justifyContent:'center',alignItems:'center'
            }}>
                <div style={{
                    width:'100%',height:'100%',borderRadius:24,
                    border:'1px solid rgba(255,255,255,0.12)',
                    background:'radial-gradient(1200px 600px at 10% 10%, rgba(255,255,255,0.08), transparent 40%)',
                    display:'flex',justifyContent:'center',alignItems:'center',padding:'48px'
                }}>
                    <div style={{
                        fontFamily:'Inter',fontWeight:700,fontSize:88,lineHeight:1.1,
                        color:'#fff',textAlign:'center',wordWrap:'break-word',overflow:'hidden'
                    }}>
                        {text}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
            fonts: [{ name: 'Inter', data: inter, weight: 700, style: 'normal' }],
        }
    );
}
