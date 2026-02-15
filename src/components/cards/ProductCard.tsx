import { products } from '../../data/products';

interface ProductCardProps {
  data: Record<string, unknown>;
}

export function ProductCard({ data }: ProductCardProps) {
  const product = products.find((p) => p.id === data.productId);
  if (!product) return null;

  const reason = data.reason as string | undefined;

  const typeColors: Record<string, string> = {
    '终身寿险': 'from-blue-500 to-indigo-600',
    '重疾险': 'from-violet-500 to-purple-600',
    '年金险': 'from-indigo-500 to-blue-600',
    '医疗险': 'from-blue-400 to-indigo-500',
    '万能险': 'from-purple-500 to-violet-600',
  };

  return (
    <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
      <div className={`bg-gradient-to-r ${typeColors[product.type] || 'from-gray-500 to-gray-600'} px-4 py-2`}>
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold text-sm">{product.name}</h3>
          <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">{product.type}</span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex flex-wrap gap-1.5 mb-2">
          {product.features.map((f) => (
            <span key={f} className="text-xs bg-gray-100 text-text-secondary px-2 py-0.5 rounded-full">
              {f}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs mb-2">
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-text-secondary">保费</span>
            <p className="font-medium text-text mt-0.5">{product.premium}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <span className="text-text-secondary">保额</span>
            <p className="font-medium text-text mt-0.5">{product.coverage}</p>
          </div>
        </div>

        {reason && (
          <div className="p-2 bg-primary-50 rounded-lg text-xs text-primary-dark">
            💡 推荐理由：{reason}
          </div>
        )}
      </div>
    </div>
  );
}
