/* src/app/api/pixom-pint-masonry/route.tsx */
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

const dmSerifText = fetch(
    new URL('../../fonts/DMSerifText-Regular.ttf', import.meta.url)
).then(res => res.arrayBuffer());

export async function GET(req: Request) {
    const url = new URL(req.url);
    const { searchParams } = url;

    const text = searchParams.get('text') ?? '';
    const imageOneSrc = searchParams.get('image1') ?? '';
    const imageTwoSrc = searchParams.get('image2') ?? '';
    const imageThreeSrc = searchParams.get('image3') ?? '';
    const imageFourSrc = searchParams.get('image4') ?? '';
    const imageFiveSrc = searchParams.get('image5') ?? '';
    const imageSixSrc = searchParams.get('image6') ?? '';
    const imageSevenSrc = searchParams.get('image7') ?? '';

    const bgSrc = `${url.origin}/pixom-masonry-bg.png`;

    const dmSerifTextFont = await dmSerifText;

    const BASE_SIZE = 80;
    const MIN_SIZE = 28;
    const AVG_CHAR_WIDTH = 0.5;
    const SAFETY = 0.95;

    const norm = text.replace(/\s+/g, ' ').trim();
    const charCount = Array.from(norm).length;

    function estimatedLines(fontSize: number) {
        const totalWidth = charCount * AVG_CHAR_WIDTH * fontSize;
        return Math.ceil(totalWidth / 956);
    }

    let fontSize = BASE_SIZE;
    if (estimatedLines(BASE_SIZE) > 3) {
        const targetCharsPerLine = Math.max(Math.ceil(charCount / 3), 1);
        const fitSize = Math.floor(
            (956 / (AVG_CHAR_WIDTH * targetCharsPerLine)) * SAFETY
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
                        width: '956px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        position: 'absolute',
                        top: '422px',
                        left: '74px'
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
                        width: 287,
                        height: 432,
                        display: 'flex',
                        borderRadius: 24,
                        overflow: 'hidden',
                        left: '74px',
                        top: '1044px',
                        boxShadow: '12px 12px 60px rgba(0,0,0,.25)'
                    }}
                >
                    <img
                        src={imageOneSrc}
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
                        position: 'absolute',
                        width: 287,
                        height: 432,
                        display: 'flex',
                        borderRadius: 24,
                        overflow: 'hidden',
                        left: '74px',
                        top: '1508px',
                        boxShadow: '12px 12px 60px rgba(0,0,0,.25)'
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
                        }}
                    />
                </div>
                <div
                    style={{
                        position: 'absolute',
                        width: 287,
                        height: 432,
                        display: 'flex',
                        borderRadius: 24,
                        overflow: 'hidden',
                        left: '396px',
                        top: '812px',
                        boxShadow: '12px 12px 60px rgba(0,0,0,.25)'
                    }}
                >
                    <img
                        src={imageThreeSrc}
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
                        position: 'absolute',
                        width: 287,
                        height: 432,
                        display: 'flex',
                        borderRadius: 24,
                        overflow: 'hidden',
                        left: '396px',
                        top: '1276px',
                        boxShadow: '12px 12px 60px rgba(0,0,0,.25)'
                    }}
                >
                    <img
                        src={imageFourSrc}
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
                        position: 'absolute',
                        width: 287,
                        height: 432,
                        display: 'flex',
                        borderRadius: 24,
                        overflow: 'hidden',
                        left: '396px',
                        top: '1740px',
                        boxShadow: '12px 12px 60px rgba(0,0,0,.25)'
                    }}
                >
                    <img
                        src={imageFiveSrc}
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
                        position: 'absolute',
                        width: 287,
                        height: 432,
                        display: 'flex',
                        borderRadius: 24,
                        overflow: 'hidden',
                        left: '718px',
                        top: '1044px',
                        boxShadow: '12px 12px 60px rgba(0,0,0,.25)'
                    }}
                >
                    <img
                        src={imageSixSrc}
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
                        position: 'absolute',
                        width: 287,
                        height: 432,
                        display: 'flex',
                        borderRadius: 24,
                        overflow: 'hidden',
                        left: '718px',
                        top: '1508px',
                        boxShadow: '12px 12px 60px rgba(0,0,0,.25)'
                    }}
                >
                    <img
                        src={imageSevenSrc}
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
