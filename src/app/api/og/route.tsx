/* src/app/api/og/route.tsx */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const interExtraBold = fetch(
    new URL('../../fonts/Inter-ExtraBold.ttf', import.meta.url)
).then(res => res.arrayBuffer());

export async function GET(req: Request) {
    const url = new URL(req.url);
    const { searchParams } = url;

    const text = searchParams.get('text');

    const bg = `${url.origin}/placeholder.png`;

    const inter = await interExtraBold;

    const IMAGE_WIDTH = 800;
    const OUTER_PADDING_X = 71;
    const INNER_PADDING_X = 0;
    const SIDE_PADDING = OUTER_PADDING_X + INNER_PADDING_X;
    const CONTENT_WIDTH = IMAGE_WIDTH - SIDE_PADDING * 2;

    const BASE_SIZE = 76;
    const MIN_SIZE = 28;
    const AVG_CHAR_WIDTH = 0.56;
    const SAFETY = 0.95;

    const norm = text.replace(/\s+/g, ' ').trim();
    const charCount = Array.from(norm).length;

    function estimatedLines(fontSize: number) {
        const totalWidth = charCount * AVG_CHAR_WIDTH * fontSize;
        return Math.ceil(totalWidth / CONTENT_WIDTH);
    }

    let fontSize = BASE_SIZE;
    if (estimatedLines(BASE_SIZE) > 3) {
        const targetCharsPerLine = Math.max(Math.ceil(charCount / 3), 1);
        const fitSize = Math.floor(
            (CONTENT_WIDTH / (AVG_CHAR_WIDTH * targetCharsPerLine)) * SAFETY
        );
        fontSize = Math.max(MIN_SIZE, Math.min(BASE_SIZE, fitSize));
    }

    const lineHeightPx = Math.round(fontSize * 1.2);
    const maxHeightPx = lineHeightPx * 3;

    return new ImageResponse(
        (
            <div
                style={{
                    width: '1200px',
                    height: '630px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${bg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        padding: '71px'
                    }}
                >
                    <div
                        style={{
                            fontFamily: 'Inter',
                            fontWeight: 800,
                            fontSize,
                            lineHeight: `${lineHeightPx}px`,
                            color: '#0C110C',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            overflow: 'hidden',
                            maxWidth: '800px',
                            lineClamp: 3,
                            maxHeight: maxHeightPx,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {text}
                    </div>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
            headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
            fonts: [{ name: 'Inter', data: inter, weight: 800, style: 'normal' }],
        }
    );
}