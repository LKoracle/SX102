interface FieldMomentsPostCardProps {
  data: Record<string, unknown>;
}

interface PostData {
  author: string;
  avatar?: string;
  postContent: string;
  images?: string[];
  imageUrls?: string[];
  highlights?: string[];
}

export function FieldMomentsPostCard({ data }: FieldMomentsPostCardProps) {
  const post = (data as unknown as PostData) || {
    author: '小李',
    postContent: '',
    images: [],
    imageUrls: [],
    highlights: [],
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-[#3B82F6] to-[#6366F1] px-4 py-2.5">
        <h3 className="text-white font-semibold text-[15px]">✍️ 朋友圈内容定制</h3>
      </div>
      <div className="p-3 space-y-2.5 max-h-[450px] overflow-y-auto">
        {/* Author header - like WeChat moments style */}
        <div className="flex items-center gap-2.5 pb-2 border-b border-gray-100">
          <div className="w-9 h-9 rounded-[8px] bg-gradient-to-br from-[#3B82F6] to-[#6366F1] flex items-center justify-center text-[16px] shadow-sm">
            {post.avatar || '🏃'}
          </div>
          <div>
            <div className="text-[12px] font-semibold text-[#576B95]">{post.author}</div>
            <div className="text-[9px] text-[#999]">刚刚 · 朋友圈</div>
          </div>
        </div>

        {/* Post content */}
        <div className="bg-gray-50 rounded-[14px] p-3">
          <p className="text-[10.5px] text-[#333] leading-[1.8] whitespace-pre-wrap">{post.postContent}</p>
        </div>

        {/* Real images */}
        {post.imageUrls && post.imageUrls.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.imageUrls.map((url, i) => (
              <div key={i} className="relative rounded-[10px] overflow-hidden border border-gray-100 shadow-sm" style={{ width: '48%' }}>
                <img
                  src={url}
                  alt={post.images?.[i] || `图片${i + 1}`}
                  className="w-full h-[90px] object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-2 py-1">
                  <span className="text-[8px] text-white font-medium">{post.images?.[i] || ''}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fallback: text-only image placeholders if no imageUrls */}
        {(!post.imageUrls || post.imageUrls.length === 0) && post.images && post.images.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {post.images.map((img, i) => (
              <div key={i} className="w-[70px] h-[70px] rounded-[10px] bg-blue-50 flex items-center justify-center text-[9px] text-blue-400 border border-blue-100 text-center px-1">
                📷 {img}
              </div>
            ))}
          </div>
        )}

        {/* Highlights */}
        {post.highlights && post.highlights.length > 0 && (
          <div className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE] rounded-[14px] p-2.5">
            <div className="text-[10px] font-semibold text-[#1D4ED8] mb-1.5">💡 内容亮点</div>
            {post.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-1.5 mb-1">
                <span className="w-3.5 h-3.5 rounded-full bg-blue-200 text-[8px] text-blue-700 flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                <span className="text-[9px] text-[#1D4ED8] leading-[1.5]">{h}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
