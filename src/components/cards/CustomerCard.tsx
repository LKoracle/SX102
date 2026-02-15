/* CustomerCard.tsx */
import React from 'react';

// 定义接口（根据你现有的数据结构调整）
interface CustomerProps {
  name: string;
  age: number;
  job: string;
  tag: string; // 例如 "高优先"
  tagType: 'hot' | 'warm' | 'normal'; // 用来控制标签颜色
  reason: string; // 推荐理由
}

const CustomerCard: React.FC<CustomerProps> = ({ name, age, job, tag, tagType, reason }) => {
  
  // 1. 定义颜色映射（模仿图2的配色）
  const styles = {
    hot: {
      avatarBg: 'bg-red-100',
      avatarIcon: 'text-red-500',
      tagBg: 'bg-red-400', // 红色标签背景
      tagText: 'text-white',
    },
    warm: {
      avatarBg: 'bg-orange-100',
      avatarIcon: 'text-orange-500',
      tagBg: 'bg-orange-400', // 橙色标签背景
      tagText: 'text-white',
    },
    normal: {
      avatarBg: 'bg-blue-100',
      avatarIcon: 'text-blue-500',
      tagBg: 'bg-blue-400', // 蓝色标签背景
      tagText: 'text-white',
    }
  };

  const currentStyle = styles[tagType] || styles.normal;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 mb-4 hover:shadow-md transition-shadow cursor-pointer">
      
      {/* 头部：头像 + 姓名 + 标签 */}
      <div className="flex items-center gap-4 mb-3">
        {/* 头像区域 - 使用柔和的浅色背景 */}
        <div className={`w-12 h-12 rounded-full ${currentStyle.avatarBg} flex items-center justify-center flex-shrink-0`}>
          {/* 这里可以用图标，也可以用名字的首字 */}
           <span className={`font-bold text-lg ${currentStyle.avatarIcon}`}>
             {name[0]}
           </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-800 text-lg">{name}</h3>
            {/* 标签 - 药丸形状 */}
            <span className={`text-[10px] px-2 py-0.5 rounded-full ${currentStyle.tagBg} ${currentStyle.tagText} font-medium`}>
              {tag}
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-0.5">
            {age}岁 · {job}
          </p>
        </div>
      </div>

      {/* 核心差异点：推荐理由的黄色盒子 */}
      {/* bg-orange-50: 极淡的橙/黄色背景 */}
      {/* border-l-4: 左侧加粗边框 */}
      <div className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-300 flex items-start gap-2">
        <span className="text-orange-400 text-sm mt-0.5">💡</span>
        <p className="text-sm text-gray-600 leading-relaxed text-justify">
          {reason}
        </p>
      </div>

    </div>
  );
};

export default CustomerCard;
