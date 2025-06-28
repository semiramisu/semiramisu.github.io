import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';
import { ImageResponse } from '@vercel/og';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: `posts/${post.slug}` },
    props: { post },
  }));
}

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: any };
  
  // フォントファイルを読み込む（日本語対応）
  // Note: プロダクション環境では、実際のフォントファイルのパスを指定する必要があります
  // const fontData = await fetch(
  //   new URL('../../../public/fonts/NotoSansJP-Regular.ttf', import.meta.url)
  // ).then((res) => res.arrayBuffer());

  const html = {
    type: 'div',
    props: {
      style: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
        fontFamily: 'Noto Sans JP, sans-serif',
      },
      children: [
        {
          type: 'div',
          props: {
            style: {
              background: 'white',
              borderRadius: '20px',
              padding: '60px',
              width: '100%',
              maxWidth: '1000px',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
            },
            children: [
              // タイトル
              {
                type: 'h1',
                props: {
                  style: {
                    fontSize: '56px',
                    fontWeight: 'bold',
                    color: '#1a202c',
                    lineHeight: '1.3',
                    margin: '0',
                    display: '-webkit-box',
                    WebkitLineClamp: '3',
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  },
                  children: post.data.title,
                },
              },
              // タグとカテゴリ
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    gap: '12px',
                    flexWrap: 'wrap',
                  },
                  children: [
                    ...(post.data.category ? [{
                      type: 'span',
                      props: {
                        style: {
                          background: '#667eea',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: '999px',
                          fontSize: '18px',
                          fontWeight: '500',
                        },
                        children: post.data.category,
                      },
                    }] : []),
                    ...(post.data.tags?.slice(0, 3).map((tag: string) => ({
                      type: 'span',
                      props: {
                        style: {
                          background: '#e2e8f0',
                          color: '#4a5568',
                          padding: '8px 16px',
                          borderRadius: '999px',
                          fontSize: '18px',
                        },
                        children: `#${tag}`,
                      },
                    })) || []),
                  ],
                },
              },
              // 投稿日と著者情報
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto',
                  },
                  children: [
                    {
                      type: 'div',
                      props: {
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          color: '#718096',
                          fontSize: '20px',
                        },
                        children: [
                          {
                            type: 'span',
                            props: {
                              children: new Date(post.data.published).toLocaleDateString('ja-JP', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }),
                            },
                          },
                        ],
                      },
                    },
                    {
                      type: 'div',
                      props: {
                        style: {
                          fontSize: '24px',
                          fontWeight: 'bold',
                          color: '#667eea',
                        },
                        children: 'semiramisu.com',
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    },
  };

  return new ImageResponse(html, {
    width: 1200,
    height: 630,
    // fonts: [
    //   {
    //     name: 'Noto Sans JP',
    //     data: fontData,
    //     style: 'normal',
    //     weight: 400,
    //   },
    // ],
  });
};