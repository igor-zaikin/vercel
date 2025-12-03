/* src/app/api/pixom-pint-portrait/route.tsx */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const dmSerifText = fetch(
    new URL('../../fonts/DMSerifText-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer());

export async function GET(req: Request) {
    const url = new URL(req.url);
    const { searchParams } = url;

    const text = searchParams.get('text');
    const imageOneSrc = searchParams.get('image1');
    const imageTwoSrc = searchParams.get('image2');

    const bgSrc = `${url.origin}/pixom-portrait-bg.png`;
    const overlaySrc = `${url.origin}/pixom-portrait-overlay.png`;
    const glassSrc = `${url.origin}/pixom-portrait-glass.png`;

    const dmSerifTextFont = await dmSerifText;

    const BASE_SIZE = 90;
    const MIN_SIZE = 28;
    const AVG_CHAR_WIDTH = 0.3;
    const SAFETY = 0.95;

    const norm = text.replace(/\s+/g, ' ').trim();
    const charCount = Array.from(norm).length;

    function estimatedLines(fontSize: number) {
        const totalWidth = charCount * AVG_CHAR_WIDTH * fontSize;
        return Math.ceil(totalWidth / 750);
    }

    let fontSize = BASE_SIZE;
    if (estimatedLines(BASE_SIZE) > 2) {
        const targetCharsPerLine = Math.max(Math.ceil(charCount / 2), 1);
        const fitSize = Math.floor(
            (750 / (AVG_CHAR_WIDTH * targetCharsPerLine)) * SAFETY
        );
        fontSize = Math.max(MIN_SIZE, Math.min(BASE_SIZE, fitSize));
    }

    const lineHeight = Math.round(fontSize * 1.1);

    return new ImageResponse(
        (
            <div
                style={{
                    width: 1080,
                    height: 1920,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url(${bgSrc})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        width: '750px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'absolute',
                        top: '262px',
                        left: '165px'
                    }}
                >
                        <span
                            style={{
                                fontFamily: 'DM Serif Text',
                                fontSize,
                                lineHeight: `${lineHeight}px`,
                                color: '#000',
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
                        width: 1080,
                        height: 1686,
                        display: 'flex',
                        left: '0',
                        top: '440px',
                    }}
                >
                    <img
                        src={overlaySrc}
                        style={{
                            position: 'absolute',
                            top: 142,
                            left: 22,
                            width: 1058,
                            display: 'block',
                        }}
                    />
                    <img
                        src={imageOneSrc}
                        style={{
                            position: 'absolute',
                            top: '162px',
                            left: '62px',
                            width: '1034px',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            borderRadius: 116,
                            transform: 'rotate(-2.5deg)',
                        }}
                    />
                    <img
                        src={glassSrc}
                        style={{
                            position: 'absolute',
                            top: 150,
                            left: 40,
                            width: 1000,
                            display: 'block',
                        }}
                    />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        width: 501,
                        height: 376,
                        display: 'flex',
                        borderRadius: 54,
                        overflow: 'hidden',
                        left: '17px',
                        bottom: '31px',
                    }}
                >
                    <img
                        src={imageTwoSrc}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            display: 'block',
                            borderRadius: 54,
                            border: '12px solid #fff'
                        }}
                    />
                </div>
            </div>
        ),
        {
            width: 1080,
            height: 1920,
            headers: { 'Content-Type': 'image/png', 'Cache-Control': 'no-store' },
            fonts: [{ name: 'DM Serif Text', data: dmSerifTextFont, weight: 400, style: 'normal' }],
        }
    );
}
