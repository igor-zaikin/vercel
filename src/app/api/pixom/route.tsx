/* src/app/api/og/route.tsx */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const interExtraBold = fetch(
    new URL('../../fonts/Inter-ExtraBold.ttf', import.meta.url)
).then(res => res.arrayBuffer());

export async function GET(req: Request) {
    const url = new URL(req.url);
    const { searchParams } = url;

    const text = (searchParams.get('text') ?? '').replace(/\s+/g, ' ').trim();

    const beforeSrc = searchParams.get('imageBefore') || `${url.origin}/placeholder-before.png`;
    const afterSrc  = searchParams.get('imageAfter')  || `${url.origin}/placeholder-after.png`;
    const arrowSrc  = `${url.origin}/arrow-pixom.png`;
    const bgSrc = `${url.origin}/placeholder-pixom.png`;

    const inter = await interExtraBold;

    const W = 1200;
    const H = 630;

    const P = 64;
    const CONTENT_W = W - P * 2;
    const HEADER_H = 210;
    const ROW_H = H - P * 2 - HEADER_H;

    const BASE_SIZE = 72;
    const MIN_SIZE = 28;
    const AVG_CHAR_WIDTH = 0.5;
    const SAFETY = 0.95;

    const norm = text.replace(/\s+/g, ' ').trim();
    const charCount = Array.from(norm).length;

    function estimatedLines(fontSize: number) {
        const totalWidth = charCount * AVG_CHAR_WIDTH * fontSize;
        return Math.ceil(totalWidth / 644);
    }

    let fontSize = BASE_SIZE;
    if (estimatedLines(BASE_SIZE) > 2) {
        const targetCharsPerLine = Math.max(Math.ceil(charCount / 2), 1);
        const fitSize = Math.floor(
            (644 / (AVG_CHAR_WIDTH * targetCharsPerLine)) * SAFETY
        );
        fontSize = Math.max(MIN_SIZE, Math.min(BASE_SIZE, fitSize));
    }

    const lineHeight = Math.round(fontSize * .96);

    return new ImageResponse(
        (
            <div
                style={{
                    width: W,
                    height: H,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${bgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        padding: P,
                        gap: 28,
                    }}
                >
                    <div
                        style={{
                            width: '644px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            marginTop: '60px'
                        }}
                    >
                        <span
                            style={{
                                fontFamily: 'Inter',
                                fontWeight: 800,
                                fontSize,
                                lineHeight: `${lineHeight}px`,
                                color: '#0C110C',
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                            }}
                        >
                          {text}
                        </span>
                    </div>

                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: '-16px',
                            width: '100%',
                            height: ROW_H,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 24,
                        }}
                    >

                        <div
                            style={{
                                position: 'relative',
                                width: 339,
                                height: 339,
                                display: 'flex',
                                borderRadius: 15,
                                overflow: 'hidden',
                                transform: 'rotate(-7deg)',
                            }}
                        >
                            <img
                                src={beforeSrc}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                }}
                            />
                        </div>

                        <div
                            style={{
                                position: 'relative',
                                width: 339,
                                height: 339,
                                display: 'flex',
                                borderRadius: 15,
                                overflow: 'hidden',
                                transform: 'rotate(7deg)',
                                left: '130px'
                            }}
                        >
                            <img
                                src={afterSrc}
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    display: 'block',
                                }}
                            />
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                position: 'absolute',
                                left: '488px',
                                bottom: '140px'
                            }}
                        >
                            <img
                                src={arrowSrc}
                                style={{
                                    width: 223,
                                    height: 154,
                                }}
                            />
                        </div>

                    </div>
                </div>
            </div>
        ),
        {
            width: W,
            height: H,
            headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
            fonts: [{ name: 'Inter', data: inter, weight: 800, style: 'normal' }],
        }
    );
}
