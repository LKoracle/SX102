import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  // Module 1: 每月初，提醒代理人盘点客户
  {
    id: 'monthly-review',
    name: '每月初，提醒代理人盘点客户',
    icon: '📋',
    description: '每月初',
    steps: [
      // Step 0: AI 主动播报 + 展示盘点经过与经营计划
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '张经理，新的一个月开始了，我结合季度目标客户名单对您的客户进行了盘点，增补了两位重点高温客户并生成了经营计划，请您看看是否合适。',
            speechText:
              '张经理，新的一个月开始了，我结合季度目标客户名单对您的客户进行了盘点，增补了两位重点高温客户并生成了经营计划，请您看看是否合适。',
          },
          {
            type: 'monthly-plan',
            content: '',
            data: {
              plans: [
                { label: '触客计划', icon: '📱', target: 50, completed: 0, unit: '次', color: '#667eea' },
                { label: '面访计划', icon: '🤝', target: 15, completed: 0, unit: '次', color: '#764ba2' },
                { label: '邀约计划', icon: '📩', target: 8, completed: 0, unit: '次', color: '#6366f1' },
              ],
              upgradeTarget: '5位中温客户提升至高温',
            },
            delay: 500,
          },
          {
            type: 'customer-grid',
            content: '',
            data: {
              grid: [
                [
                  { label: '高温高价值', count: 3 },
                  { label: '高温中价值', count: 2 },
                  { label: '高温低价值', count: 1 },
                ],
                [
                  { label: '中温高价值', count: 5 },
                  { label: '中温中价值', count: 4 },
                  { label: '中温低价值', count: 2 },
                ],
                [
                  { label: '低温高价值', count: 8 },
                  { label: '低温中价值', count: 6 },
                  { label: '低温低价值', count: 3 },
                ],
              ],
              tip: '建议优先经营中温高价值客户，提升成交概率',
            },
            delay: 400,
          },
          {
            type: 'customer-list',
            content: '',
            data: {
              totalCount: 6,
              customers: [
                {
                  name: '赵高',
                  temperature: '高温',
                  value: '高价值',
                  action: '面访沟通养老规划方案',
                  actionIcon: '🤝',
                  tags: ['高净值', '保养老'],
                  lastContact: '本月',
                },
                {
                  name: '王建国',
                  temperature: '高温',
                  value: '高价值',
                  action: '面访讲解子女教育金',
                  actionIcon: '🤝',
                  tags: ['加保意向', '子女教育'],
                  lastContact: '本月',
                },
                {
                  name: '李美琳',
                  temperature: '高温',
                  value: '中价值',
                  action: '电话沟通重疾保障方案',
                  actionIcon: '📱',
                  tags: ['保障意识强', '重疾缺口'],
                  lastContact: '本月',
                },
                {
                  name: '张伟',
                  temperature: '中温',
                  value: '高价值',
                  action: '发送保障科普素材',
                  actionIcon: '📩',
                  tags: ['首次接触', '高收入'],
                  lastContact: '本月',
                },
                {
                  name: '陈晓雯',
                  temperature: '中温',
                  value: '中价值',
                  action: '推送养老年金产品资料',
                  actionIcon: '📩',
                  tags: ['理财需求', '养老规划'],
                  lastContact: '本月',
                },
                {
                  name: '刘大明',
                  temperature: '低温',
                  value: '高价值',
                  action: '节日问候维护关系',
                  actionIcon: '📱',
                  tags: ['老客户', '传承需求'],
                  lastContact: '本月',
                },
              ],
              summary: '已为您圈选出6位重点经营客户，建议优先推进高温高价值与中温高价值客群。',
            },
            delay: 400,
          },
        ],
        // 不再给快捷回复，引导代理人通过语音/输入自然说出“Ok，我约了下周一下午两点……”这类话
        quickReplies: [],
      },
      // Step 1: 代理人反馈后，直接确认并展示拜访计划
      {
        aiMessages: [
          {
            type: 'text',
            content: '好的，已添加拜访计划。',
            speechText: '好的，已添加拜访计划。',
          },
          {
            type: 'schedule-card',
            content: '',
            data: {
              title: '李平安经营计划',
              days: [
                {
                  day: '下周一',
                  items: [{ time: '14:00', task: '面访李平安 - 沟通养老规划方案', type: 'visit' }],
                },
              ],
            },
            delay: 400,
          },
        ],
        quickReplies: [],
      },
    ],
  },

  // Module 2: 每周初，提醒本周经营计划
  {
    id: 'weekly-plan',
    name: '每周初，提醒本周经营计划',
    icon: '📅',
    description: '每周初',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '本周共有7个经营计划需要完成，请查收。后续我会持续提醒您，帮您按时推进。同时，为您推送本周行事历。',
            speechText: '张经理，本周有7个计划，行事历已推送给您。',
          },
          {
            type: 'schedule-card',
            content: '',
            data: {
              title: '本周行事历',
              days: [
                {
                  day: '周一',
                  items: [{ time: '14:00', task: '拜访李平安', type: 'visit' }],
                },
                {
                  day: '周二',
                  items: [{ time: '15:00', task: '拜访张伟', type: 'visit' }],
                },
                {
                  day: '周三',
                  items: [{ time: '15:00', task: '拜访王萍', type: 'visit' }],
                },
                {
                  day: '周四',
                  items: [{ time: '16:00', task: '拜访赵高', type: 'visit' }],
                },
                {
                  day: '周五',
                  items: [{ time: '17:00', task: '拜访崔丽', type: 'visit' }],
                },
                {
                  day: '周六',
                  items: [
                    { time: '14:00', task: '拜访李霞', type: 'visit' },
                    { time: '16:00', task: '拜访王明', type: 'visit' },
                  ],
                },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '好的，收到', value: 'back-to-menu' },
          { label: '调整计划', value: 'adjust-plan' },
        ],
      },
    ],
  },

  // Module 3: 某天，客户拜访前
  {
    id: 'pre-visit',
    name: '某天，客户拜访前',
    icon: '💼',
    description: '拜访前',
    steps: [
      // Step 0: 提醒拜访
      {
        aiMessages: [
          {
            type: 'text',
            content: '今日14点要去拜访客户李平安。',
            speechText: '今天下午两点要拜访李平安，需要帮您准备方案吗？',
          },
          {
            type: 'text',
            content: '提前分析客户需求、准备产品方案，有助于提高促成概率。需要帮您定制一份产品方案吗？',
            delay: 400,
          },
        ],
        quickReplies: [
          { label: '好的，帮我给客户李平安定制一份产品方案', value: 'analyze' },
          { label: '稍后再说', value: 'back-to-menu' },
        ],
      },
      // Step 1: 自动化分析流程（需求分析 → 保障检视 → 方案推荐，自动折叠）
      {
        aiMessages: [
          // 需求分析（逐项展示 → 自动折叠）
          {
            type: 'collapsible-step',
            content: '',
            speechText: '正在根据客户宫格分析客户李平安的痛点及需求。45岁，社会中坚客群，重点需求：保财富、保养老。',
            data: {
              title: '需求分析',
              stepIcon: '🔍',
              autoCollapse: true,
              collapseDelay: 3000,
              itemRevealDelay: 1500,
              firstItemDelay: 800,
              summary: '李平安，45岁，社会中坚客群 | 重点需求：保财富、保养老',
              items: [
                {
                  type: 'customer-card',
                  data: { customerId: 'c1', detailed: true },
                },
                {
                  type: 'customer-profile-grid',
                  data: {
                    customerName: '李平安',
                    highlightRow: 3,
                    highlightCol: 2,
                    segment: '社会中坚客群',
                    painPoints: ['子女优质教育费用高', '父母健康养老焦虑'],
                    description: '处于社会中坚客群，子女教育占家庭收入35%',
                  },
                },
                {
                  type: 'text',
                  content:
                    '📊 李平安，45岁，属于社会中坚客群，面临资产贬值、养老储备不足的风险，重点需求是保财富、保养老',
                },
              ],
            },
            delay: 7500,
          },

          // 保障检视（逐项展示 → 自动折叠）
          {
            type: 'collapsible-step',
            content: '',
            speechText: '接下来进行保障检视，结合李平安在平安内外部的保单情况，分析保障缺口。',
            data: {
              title: '保障检视',
              stepIcon: '📊',
              autoCollapse: true,
              collapseDelay: 3000,
              itemRevealDelay: 1500,
              firstItemDelay: 800,
              summary: '财富缺口80万，养老缺口180万（含中银保信同业数据）',
              items: [
                {
                  type: 'coverage-analysis',
                  data: { customerName: '李平安' },
                },
                {
                  type: 'text',
                  content:
                    '📈 结合客户内外部保险数据分析，李平安存在财富缺口80万，养老缺口180万',
                },
              ],
            },
            delay: 6000,
          },

          // 方案推荐（保持展开）
          {
            type: 'product-plans',
            content: '',
            speechText: '根据需求分析和保障缺口，已为李平安智能匹配专属产品+服务方案平安添盈-臻享家医和销售攻略，您可以查看详情。',
            data: {
              needsSummary:
                '根据客户需求及保险缺口，智能匹配以下产品方案：',
            },
            delay: 500,
          },
          {
            type: 'visit-strategy',
            content: '',
            data: {
              customerName: '李平安',
              sections: [
                {
                  title: '历史案例参考',
                  icon: '📖',
                  items: [
                    '张先生，46岁企业高管，同属社会中坚客群，保障缺口与李平安相似，最终选择"年金险+增额终身寿"组合方案，年缴保费4万元，兼顾教育金储备与养老规划',
                    '赵女士，43岁，也面临财富缺口和养老缺口双重需求，通过分阶段投保策略，首年年缴2.5万元，次年追加至4万元，客户接受度更高',
                  ],
                },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看方案详情', value: 'sales-benefit' },
          { label: '查看销售攻略', value: 'sales-strategy' },
        ],
        quickReplyDelay: 2500,
      },
      // Step 2: 测算销售利益
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '促成以上方案后，您可获得收入7500元（含首佣FYC6000元，销售津贴1500元）还差4500C即可满足晋级P4的累计FYC标准，还差4000C可达标金钻，加油！',
            speechText: '促成后收入7500元，离晋级和达标都不远了，加油！',
          },
        ],
        quickReplies: [
          { label: '查看销售攻略', value: 'sales-strategy' },
          { label: '准备出发拜访', value: 'back-to-menu' },
        ],
      },
      // Step 3: 匹配销售攻略
      {
        aiMessages: [
          {
            type: 'text',
            content: '为了帮您促成销售，已根据客户画像为您生成适合李平安的个性化经营建议，助您高效沟通、顺利出单。',
            speechText: '销售攻略已生成，祝您拜访顺利！',
          },
          {
            type: 'visit-strategy',
            content: '',
            data: {
              customerName: '李平安',
              sections: [
                {
                  title: '沟通技巧建议',
                  icon: '💬',
                  items: [
                    '以教育金规划为切入点，结合客户子女年龄引发共鸣',
                    '运用数据对比法，展示保障缺口的紧迫性',
                    '适时提出方案，把握客户决策窗口期',
                  ],
                },
                {
                  title: '异议处理要点',
                  icon: '⚠️',
                  items: [
                    '若客户担心资金流动性，强调万能账户灵活支取功能',
                    '若客户犹豫不决，引导关注教育金时间窗口的紧迫性',
                  ],
                },
                {
                  title: '历史案例参考',
                  icon: '📖',
                  items: [
                    '陈先生，42岁企业高管，同属社会中坚客群，通过"教育金+养老规划"组合方案切入，最终促成年缴保费3万元',
                    '刘女士，48岁，与李平安需求相似，初次面谈时同样对流动性有顾虑，经万能账户灵活性讲解后第二次面谈成功签约',
                  ],
                },
                {
                  title: '注意事项',
                  icon: '📌',
                  items: [
                    '客户对资金灵活性较敏感，避免过度强调长期锁定',
                    '上次沟通已建立初步信任，本次可适当推进促成动作',
                  ],
                },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '好的，准备出发', value: 'back-to-menu' },
        ],
      },
    ],
  },

  // Module 4: 某天，客户拜访后
  {
    id: 'post-visit',
    name: '某天，客户拜访后',
    icon: '📝',
    description: '拜访后',
    steps: [
      // Step 0: 开始记录
      {
        aiMessages: [
          {
            type: 'text',
            content: '下午好！看到您刚完成对客户李平安的拜访，沟通情况如何？告诉我，我可以帮您记录',
            speechText: '下午好！拜访结束了，可以告诉我具体的拜访情况吗？我来帮您记录',
          },
        ],
        quickReplies: [{ label: '开始智能记录', value: 'start-record' }],
      },
      // Step 1: 模拟语音记录 + 生成总结
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '🎙️ 已识别您的语音记录：\n\n「刚刚拜访完客户李平安，聊得还挺顺利。一开始我们先寒暄了一下，客户说最近在考虑孩子的教育金问题，但又担心年金险太死板，钱放进去就拿不出来，不太灵活。我跟他说年金可以搭配万能账户，灵活性会好一些，他也点了几下头，但还是有点犹豫。后来我进一步介绍了【平安添盈·臻享家医】方案，并结合客户孩子的成长路径做了演示，客户最终决定投保。」\n\n「聊的过程中还了解到，客户目前在香蜜湖有一套房，名下有两辆车，一辆宝马，一辆特斯拉，家庭经济状况比较稳健，年收入120万左右。客户本人是公司合伙人，生日是9月12号，太太主要负责家庭理财和孩子教育支出。」',
            speechText: '语音已识别。',
          },
          {
            type: 'text',
            content: '已为您记录拜访内容，正在为您生成拜访总结。',
            delay: 800,
          },
          {
            type: 'visit-summary',
            content: '',
            data: {
              customerName: '李平安',
              date: '2025年2月14日',
              duration: '45分钟',
              location: '深圳福田区香蜜湖',
              attendees: '李平安（客户）',
              keyPoints: [
                '客户关注子女教育金储备，同时对养老规划有一定兴趣',
                '介绍【平安添盈·臻享家医】方案，结合孩子成长路径做演示',
                '客户最终决定投保，成功促成',
                '年收入约120万，名下房产（香蜜湖）、两辆车（宝马、特斯拉）',
                '客户为公司合伙人，太太主理家庭理财，生日9月12日',
              ],
              nextActions: [
                '跟进保单进度，确保顺利承保',
                '9月12日生日节点开展客户关怀',
                '后续探索养老规划加保机会',
              ],
              sentiment: '积极正面',
              closeProbability: 90,
            },
            speechText: '好的。',
            delay: 500,
          },
          {
            type: 'text',
            content: '本次拜访信息及客户情况已整理完毕，请确认是否正确？',
            speechText: '本次拜访信息已整理完毕，请确认是否正确？',
            delay: 800,
          },
        ],
        quickReplies: [
          { label: '确认', value: 'confirm-update' },
        ],
      },
      // Step 2: 确认更新 + 推荐附近客户
      {
        aiMessages: [
          {
            type: 'text',
            content: '已同步更新本次拜访信息及客户情况到李平安的客户档案',
            speechText: '好的，已完成李平安客户档案更新。另外这附近还有两位客户，建议您可以顺路拜访。',
          },
          {
            type: 'text',
            content: '您当前在福田区香蜜湖街道，附近还有两位客户，建议您安排拜访',
            delay: 500,
          },
          {
            type: 'nearby-customers',
            content: '',
            data: {
              customers: [
                {
                  name: '李四',
                  distance: '500m',
                  address: '同小区',
                  tag: '中温客户·关注子女教育金',
                  lastContact: '2周前',
                  note: '中温客户，关注子女教育金',
                },
                {
                  name: '王五',
                  distance: '1.2km',
                  address: '同商圈',
                  tag: '高意向客户',
                  lastContact: '1周前',
                  note: '高意向客户，已预约下次面谈',
                },
              ],
            },
            delay: 400,
          },
        ],
        quickReplies: [
          { label: '拜访王五', value: 'visit-wangwu' },
        ],
      },
      // Step 3: 准备拜访王五
      {
        aiMessages: [
          {
            type: 'text',
            content: '好的，我先帮你分析王五的客户画像和沟通重点，方便您高效推进拜访。',
            speechText: '好的',
          },
          {
            type: 'customer-card',
            content: '',
            data: { customerId: 'c7', detailed: true },
            delay: 800,
          },
          {
            type: 'visit-strategy',
            content: '',
            data: {
              customerName: '王五',
              sections: [
                {
                  title: '客户核心需求',
                  icon: '🎯',
                  items: [
                    '子女教育金储备（长子12岁，3年后面临高中及留学规划）',
                    '家庭财富稳健增值，抵御通胀风险',
                  ],
                },
                {
                  title: '切入话题建议',
                  icon: '💬',
                  items: [
                    '从孩子教育规划入手，了解留学意向和费用预期',
                    '结合企业经营现金流，探讨资产配置方案',
                  ],
                },
                {
                  title: '推荐产品方向',
                  icon: '📦',
                  items: [
                    '教育年金险：锁定未来教育费用',
                    '增额终身寿：兼顾财富增值与灵活支取',
                  ],
                },
                {
                  title: '历史案例参考',
                  icon: '📖',
                  items: [
                    '周先生，40岁企业主，长子10岁，通过教育年金+增额终身寿组合方案，年缴保费5万元，成功锁定子女留学费用并兼顾家庭财富增值',
                    '吴女士，38岁，同样关注子女教育规划，首次面谈从孩子兴趣班支出切入，第二次面谈促成教育年金险签约，年缴2.5万元',
                  ],
                },
                {
                  title: '注意事项',
                  icon: '⚠️',
                  items: [
                    '客户已有医疗险，切勿重复推荐同类产品',
                    '上次面谈已建立信任，本次可适当推进促成动作',
                  ],
                },
              ],
            },
            speechText: '王五的客户画像和沟通策略已准备好，建议从孩子教育规划切入。',
            delay: 600,
          },
        ],
        quickReplies: [
          { label: '帮我定制产品方案', value: 'back-to-menu' },
          { label: '准备出发拜访', value: 'back-to-menu' },
        ],
      },
    ],
  },

  // Module 5: 某天晚上：辅导下属
  {
    id: 'team-coaching',
    name: '某天晚上：辅导下属',
    icon: '👥',
    description: '晚上',
    steps: [
      // Step 0: 全组分析
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '当前团队整体经营计划完成率50%，其中面访完成率30%，低于预期。有两位组员的面访偏少，建议重点关注。本月团队累计承保FYC2.1万，营业部排第4名。其中，已连钻2个月的李明本月尚未达钻，是否需要为您分析他的具体情况，看看问题出在哪里？',
            speechText: '张经理，团队完成率50%，李明本月还没达钻，需要看看情况吗？',
          },
          {
            type: 'team-dashboard',
            content: '',
            data: { members: 'all' },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '需要，分析李明情况', value: 'analyze-liming' },
          { label: '查看全组数据', value: 'view-data' },
        ],
      },
      // Step 1: 辅助面谈
      {
        aiMessages: [
          {
            type: 'text',
            content: '李明本月面访完成率低于20%，建议加强面访技巧训练。',
            speechText: '李明面访完成率偏低，面谈方案已为您生成。',
          },
          {
            type: 'member-card',
            content: '',
            data: { memberId: 't1' },
            delay: 400,
          },
          {
            type: 'ability-analysis',
            content: '',
            data: {
              memberName: '李明',
              metrics: [
                { label: '触客完成率', value: '80%', status: 'good' },
                { label: '面访完成率', value: '20%', status: 'danger' },
                { label: '邀约转化率', value: '偏低', status: 'warning' },
              ],
              skills: [
                { label: '需求挖掘', level: 'strong' },
                { label: '方案呈现', level: 'strong' },
                { label: '异议处理', level: 'weak' },
                { label: '促成动作', level: 'weak' },
              ],
            },
            delay: 600,
          },
          {
            type: 'text',
            content:
              '为更好地帮助李明达钻，建议您组织一次面谈，进行针对性辅导。已为您生成面谈方案：',
            delay: 400,
          },
          {
            type: 'coaching-plan',
            content: '',
            data: {
              memberName: '李明',
              target: '达钻',
              targetDetail: '初佣≥3500元 且 寿险长险≥2件',
              suggestion: '建议加强面访技巧训练，重点突破异议处理和促成动作短板',
              trainings: [
                { type: '课程', title: '《如何高效完成客户面访》' },
                { type: '课程', title: '《年金险沟通实战技巧》' },
                { type: '演练', title: '《实战演练：年金险方案客户促成及异议处理》' },
              ],
            },
            delay: 600,
          },
        ],
        quickReplies: [],
      },
    ],
  },

  // Module 6: 每周末，形成周工作总结
  {
    id: 'weekly-summary',
    name: '每周末，形成周工作总结',
    icon: '📊',
    description: '周末',
    steps: [
      // Step 0: 提醒做周工作总结
      {
        aiMessages: [
          {
            type: 'text',
            content: '本周即将结束，已为您生成本周工作总结，请查收。',
            speechText: '张经理，已为您生成本周工作总结。是否让我进一步为您分析薄弱环节？',
          },
          {
            type: 'work-summary',
            content: '',
            data: {
              period: '本周（2025年2月10日 - 2月14日）',
              metrics: {
                contact: { label: '触客次数', actual: 20, target: 30 },
                faceVisit: { label: '面访次数', actual: 6, target: 10 },
                invitation: { label: '邀约转化率', actual: 30, target: 50 },
              },
              highlights: ['本周整体经营节奏稳定，按计划推进客户跟进'],
              improvements: [
                '邀约转化率仅30%，低于团队平均水平（45%）',
                '促成动作和异议处理两个环节相对薄弱',
              ],
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '查看薄弱环节分析', value: 'weak-areas' }],
      },
      // Step 1: 提示薄弱环节
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '在本周的客户沟通中，您在"促成动作"和"异议处理"两个环节表现相对薄弱。\n\n例如：在与客户赵高的沟通中，客户表达了对资金流动性的担忧，但您未能有效引导客户理解"年金+万能账户"的灵活性，导致客户仍未明确下单。',
            speechText: '本周促成动作和异议处理是短板，为帮助您提升薄弱环节，建议看看我为您推荐的学习内容与实战演练工具',
          },
          {
            type: 'ability-analysis',
            content: '',
            data: {
              memberName: '张经理（本周表现）',
              metrics: [
                { label: '触客完成率', value: '67%', status: 'warning' },
                { label: '面访完成率', value: '60%', status: 'warning' },
                { label: '邀约转化率', value: '30%', status: 'danger' },
              ],
              skills: [
                { label: '需求挖掘', level: 'strong' },
                { label: '方案呈现', level: 'strong' },
                { label: '异议处理', level: 'weak' },
                { label: '促成动作', level: 'weak' },
              ],
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '查看学习建议', value: 'learning' }],
      },
      // Step 2: 推送学习内容
      {
        aiMessages: [
          {
            type: 'text',
            content: '为帮助您提升薄弱环节，我为您推荐以下学习内容与实战演练工具：',
            speechText: '已为您推荐针对性学习内容，建议本周内完成。另外为快速填补业绩差额，我为你准备了经营攻略',
          },
          {
            type: 'learning-plan',
            content: '',
            data: {
              title: '本周提升学习计划',
              items: [
                { type: '课程', title: '《如何高效完成客户面访》' },
                { type: '课程', title: '《年金险沟通实战技巧》' },
                { type: '演练', title: '《实战演练：年金险方案客户促成及异议处理》' },
              ],
              tip: '点击进入实战演练，系统将根据您本周沟通的客户类型生成个性化实战场景',
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '业绩差额经营攻略', value: 'income' }],
      },
      // Step 3: 个人收入考核津贴提醒 + 推荐客户
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '您本月距离销售津贴提档还差 **2000元 FYC**。\n\n若本月新增FYC 2000元，即可多获得销售津贴 **1100元**。建议销售1件保费2万的「金越年金红26」即可达成。\n\n以下3位客户意向较高，建议您下周重点拜访：',
            speechText: '已为您筛选3位高潜力客户，建议下周重点拜访。',
          },
          {
            type: 'customer-list',
            content: '',
            data: {
              totalCount: 3,
              customers: [
                {
                  name: '张三',
                  temperature: '高温',
                  value: '高价值',
                  action: '推荐金越年金红26 - 教育金方案',
                  actionIcon: '🤝',
                  tags: ['鸡娃精英', '子女教育'],
                  lastContact: '本周',
                },
                {
                  name: '李四',
                  temperature: '中温',
                  value: '高价值',
                  action: '推荐金越年金红26 - 养老储备方案',
                  actionIcon: '🤝',
                  tags: ['焦虑中年', '财务安全'],
                  lastContact: '本周',
                },
                {
                  name: '王五',
                  temperature: '高温',
                  value: '中价值',
                  action: '推荐金越年金红26 - 稳定现金流方案',
                  actionIcon: '🤝',
                  tags: ['养老规划', '稳定现金流'],
                  lastContact: '本周',
                },
              ],
              summary: '是否帮您将这3位客户加入下周的拜访计划？',
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '好的，加入计划', value: 'confirm' }],
      },
      // Step 4: 确认添加计划
      {
        aiMessages: [
          {
            type: 'text',
            content: '已将张三、李四、王五加入您下周的拜访计划，祝拜访顺利！',
            speechText: '下周拜访计划已更新，加油！',
          },
          {
            type: 'schedule-card',
            content: '',
            data: {
              title: '下周拜访计划',
              days: [
                {
                  day: '下周一',
                  items: [{ time: '10:00', task: '拜访张三 - 教育金方案', type: 'visit' }],
                },
                {
                  day: '下周三',
                  items: [{ time: '14:00', task: '拜访李四 - 养老储备方案', type: 'visit' }],
                },
                {
                  day: '下周五',
                  items: [{ time: '15:00', task: '拜访王五 - 稳定现金流方案', type: 'visit' }],
                },
              ],
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '好的，收到', value: 'back-to-menu' }],
      },
    ],
  },

  // Module 7: 每月末，形成月度工作复盘
  {
    id: 'monthly-retrospective',
    name: '每月末，形成月度工作复盘',
    icon: '📈',
    description: '月末',
    steps: [
      // Step 0: 月度复盘提醒 + 月度总结数据
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '本月即将结束，已为您生成月度工作复盘报告，请查收。\n\n本月累计FYC **20000元**，超额完成目标，表现优秀！整体超过了营业部80%的代理人。',
            speechText: '张经理，月度复盘报告出炉，本月超额完成目标，表现优秀！是否看看您还有哪些技能可以进一步提升？',
          },
          {
            type: 'work-summary',
            content: '',
            data: {
              period: '本月（2025年2月）',
              metrics: {
                contact: { label: '触客次数', actual: 50, target: 40 },
                faceVisit: { label: '面访次数', actual: 25, target: 20 },
                invitation: { label: '邀约次数', actual: 12, target: 10 },
                fyc: { label: '保费收入', actual: 200000, target: 150000 },
              },
              highlights: [
                '成功签约3位高净值客户，客户画像匹配度高',
                '面访转化率从上月20%提升至40%',
                '完成3门推荐课程，参与2次实战演练',
              ],
              improvements: [
                '异议处理：流动性、收益性问题回应不够精准',
                '促成动作偏弱：客户意向明确时未及时推动决策',
                '客户升温节奏把握不足，部分客户跟进间隔较长',
              ],
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '查看需提升技能', value: 'skills' }],
      },
      // Step 1: 识别需提升的技能
      {
        aiMessages: [
          {
            type: 'text',
            content: '根据本月数据分析，您在以下技能方面仍有提升空间：',
            speechText: '根据本月数据，以下技能仍有提升空间。另外，已为您准备好下月计划',
          },
          {
            type: 'ability-analysis',
            content: '',
            data: {
              memberName: '张经理（本月综合评估）',
              metrics: [
                { label: '触客完成率', value: '125%', status: 'good' },
                { label: '面访完成率', value: '125%', status: 'good' },
                { label: '邀约转化率', value: '48%', status: 'warning' },
              ],
              skills: [
                { label: '客户开拓', level: 'strong' },
                { label: '需求挖掘', level: 'strong' },
                { label: '方案呈现', level: 'strong' },
                { label: '异议处理', level: 'weak' },
                { label: '促成动作', level: 'weak' },
                { label: '客户升温', level: 'weak' },
              ],
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '查看下月提升计划', value: 'next-plan' }],
      },
      // Step 2: 推送下月提升计划
      {
        aiMessages: [
          {
            type: 'text',
            content: '为帮助您在下月进一步提升，已为您生成个性化学习计划：',
            speechText: '下月计划已生成，建议您借助公司的客户活动邀请更多客户参加。',
          },
          {
            type: 'learning-plan',
            content: '',
            data: {
              title: '下月提升学习计划',
              items: [
                { type: '课程', title: '《客户异议处理：流动性与收益性问题应对》' },
                { type: '课程', title: '《高效促成：把握成交信号与推动决策》' },
                { type: '课程', title: '《客户升温节奏管理：从中温到高温的经营策略》' },
                { type: '演练', title: '《实战演练：年金险促成及异议处理全流程》' },
                { type: '工具', title: '《客户升温追踪表：定期跟进提醒工具》' },
              ],
              tip: '系统将根据您本月实际客户沟通记录，生成针对性演练场景，帮助快速突破短板',
            },
            delay: 0,
          },
        ],
        quickReplies: [{ label: '好的，收到', value: 'back-to-menu' }],
      },
    ],
  },
  // 主管场景1: 月初面谈名单推荐
  {
    id: 'manager-monthly-coaching-list',
    name: '月初，推荐本月面谈计划',
    icon: '📋',
    description: '每月初',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '尊敬的您，新的一个月开始了。我已经为您分析了团队成员的本月业绩达成情况。以下是建议您重点面谈的成员名单，按优先级排序。',
            speechText: '尊敬的您，新的一个月开始了。我已经为您分析了团队成员的本月业绩达成情况。以下是建议您重点面谈的成员名单，按优先级排序。',
          },
          {
            type: 'monthly-coaching-list',
            content: '',
            data: {
              members: ['t1', 't3', 't6'],
              month: '2025年3月',
              tips: ['保证面谈完成率在100%以上', '优先级由高到低，建议按序进行', '充分准备面谈指引，提升面谈效率'],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看李明详细计划', value: 't1' },
          { label: '查看小周详细计划', value: 't3' },
          { label: '查看小杨详细计划', value: 't6' },
          { label: '查看整月日程', value: 'schedule' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '李明本月业绩完成率仅为43%，是团队中最需要关注的成员。他存在面访完成率低、邀约转化率偏低等问题。我为您准备了详细的面谈计划。',
            speechText: '李明本月业绩完成率仅为43%，是团队中最需要关注的成员。他存在面访完成率低、邀约转化率偏低等问题。我为您准备了详细的面谈计划。',
          },
          {
            type: 'member-coaching-plan',
            content: '',
            data: {
              memberId: 't1',
              topics: ['收入分析', '客户盘点'],
              suggestedDate: '2025-03-05',
              duration: '40分钟',
            },
            delay: 400,
          },
        ],
        quickReplies: [
          { label: '确认安排该日期', value: 'confirm' },
          { label: '选择其他日期', value: 'change-date' },
          { label: '查看其他成员', value: 'back' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '这是根据您的日程和成员的可用时间自动生成的合理安排，涵盖了所有需要重点面谈的成员。',
            speechText: '这是根据您的日程和成员的可用时间自动生成的合理安排，涵盖了所有需要重点面谈的成员。',
          },
          {
            type: 'coaching-schedule',
            content: '',
            data: {
              schedule: [
                { date: '2025-03-05', member: 't1', topic: '收入分析' },
                { date: '2025-03-08', member: 't3', topic: '拜访计划' },
                { date: '2025-03-12', member: 't6', topic: '新人培训' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '全部确认', value: 'confirm-all' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 主管场景2: 面谈前指引
  {
    id: 'manager-pre-coaching-guidance',
    name: '面谈前，推荐面谈指引',
    icon: '💡',
    description: '面谈前',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '尊敬的您，面谈前的充分准备是提高面谈效果的关键。请选择本次面谈的主题，我将为您推荐针对性的分析和话术建议。',
            speechText: '尊敬的您，面谈前的充分准备是提高面谈效果的关键。请选择本次面谈的主题，我将为您推荐针对性的分析和话术建议。',
          },
          {
            type: 'coaching-topic',
            content: '',
            data: {
              topics: [
                { id: 'income', label: '📊 收入分析', desc: '帮助成员找到收入突破口' },
                { id: 'customer', label: '👥 客户盘点', desc: '优化客户结构和拜访策略' },
                { id: 'recruitment', label: '🎯 准增员盘点', desc: '规划团队发展和新兵培养' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '收入分析', value: 'income' },
          { label: '客户盘点', value: 'customer' },
          { label: '准增员盘点', value: 'recruitment' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '李明的收入差距主要来自于面访机会不足和成交效率偏低。以下是基于他的数据生成的收入分析：',
            speechText: '李明的收入差距主要来自于面访机会不足和成交效率偏低。以下是基于他的数据生成的收入分析：',
          },
          {
            type: 'income-analysis-coaching',
            content: '',
            data: {
              memberId: 't1',
              currentIncome: 150000,
              targetIncome: 350000,
              gap: 200000,
              sources: [
                { source: '新单保费', current: 80000, gap: 100000 },
                { source: '续期保费', current: 70000, gap: 50000 },
              ],
              improvements: ['每周触客不低于50人', '面访成功率提升至25%以上', '客户单案保费提升至5000元'],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看达成路径', value: 'path' },
          { label: '查看面谈话术', value: 'speaking' },
          { label: '重新选择主题', value: 'back' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '根据分析，李明要达成收入目标，需要在以下三个方面取得进展。我已经为您分解了具体的行动步骤：',
            speechText: '根据分析，李明要达成收入目标，需要在以下三个方面取得进展。我已经为您分解了具体的行动步骤：',
          },
          {
            type: 'coaching-path',
            content: '',
            data: {
              goal: '月收入累计突破35万，与目标缩小差距',
              strategies: [
                { step: 1, action: '每周触客50+人，通过电话、拜访等多渠道', target: '提升面访机会' },
                { step: 2, action: '面访成功率不低于25%，通过话术演练提升', target: '提升成交概率' },
                { step: 3, action: '单案保费5000+元，推荐更优质产品组合', target: '提升客单价' },
              ],
              estimatedTimeline: '30天内可见初步成效',
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看面谈话术', value: 'speaking' },
          { label: '返回分析详情', value: 'back' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '以下是针对李明本次面谈精心准备的话术指引。参考这些话术可以帮助您更有效地进行对话：',
            speechText: '以下是针对李明本次面谈精心准备的话术指引。参考这些话术可以帮助您更有效地进行对话：',
          },
          {
            type: 'coaching-speaking-point',
            content: '',
            data: {
              topic: '收入分析',
              openingLine: '"李明，我们来看看你3月的业绩，相比2月有不少亮点，但也有需要关注的地方。让我们一起分析一下。"',
              keyPoints: [
                {
                  point: '肯定成绩',
                  example: '"你这月新单保费突破8万，这是个不错的进步。周期业务也保持稳定。这体现了你在产品销售上的实力。"',
                },
                {
                  point: '分析问题',
                  example: '"但我们看到，面访完成率还有不少提升空间，目标是15次，实际只完成了3次。这是拉低收入的主要原因。"',
                },
                {
                  point: '制定计划',
                  example: '"接下来，我们可以这样调整：每周固定安排50个触客机会，其中20个重点客户进行上门拜访，预计面访完成率能提升到10次以上。"',
                },
              ],
              objectionHandling: [
                {
                  objection: '"35万的目标太高了，我觉得不太可能。"',
                  response: '"我理解你的想法，但让我们看看数据。你11月的新单保费就突破了8万，再加上续期7万，其实离35万不远。关键是稳定这个水平，并逐步提升。"',
                },
                {
                  objection: '"我没有那么多客户可以拜访啊。"',
                  response: '"这个想法我也常听到。实际上，增加触客的方法有很多。比如，电话回访、老客户转介绍、到社区进行讲座等。我这里有一份触客渠道清单，我们一起看看哪些渠道对你最可行。"',
                },
              ],
            },
            delay: 600,
          },
        ],
        quickReplies: [
          { label: '面谈准备完毕', value: 'done' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 主管场景3: 面谈中实时记录
  {
    id: 'manager-during-coaching-record',
    name: '面谈中，实时记录并生成总结',
    icon: '📱',
    description: '面谈中',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '尊敬的您，面谈已经开始。系统已准备好为您实时记录面谈的关键信息。您每说出重要要点，系统都会帮您整理整合。',
            speechText: '尊敬的您，面谈已经开始。系统已准备好为您实时记录面谈的关键信息。您每说出重要要点，系统都会帮您整理整合。',
          },
          {
            type: 'coaching-record',
            content: '',
            data: {
              memberName: '李明',
              topics: ['业绩分析', '改进建议', '行动计划'],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '面谈记录完毕，查看总结', value: 'summary' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '基于本次面谈的内容，系统已自动生成总结和改进建议，供您参考和进一步分析。',
            speechText: '基于本次面谈的内容，系统已自动生成总结和改进建议，供您参考和进一步分析。',
          },
          {
            type: 'coaching-record',
            content: '',
            data: {
              memberName: '李明',
              topics: ['业绩分析', '改进建议', '行动计划'],
            },
            delay: 400,
          },
        ],
        quickReplies: [
          { label: '保存总结，开始追踪', value: 'tracking' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 主管场景4: 面谈后追踪
  {
    id: 'manager-post-coaching-tracking',
    name: '面谈后，追踪执行过程',
    icon: '📊',
    description: '面谈后',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '尊敬的您，面谈已结束。现在系统为您展示李明的执行追踪看板。包括目标达成进度、行动项执行状态，以及针对性的辅导建议。',
            speechText: '尊敬的您，面谈已结束。现在系统为您展示李明的执行追踪看板。包括目标达成进度、行动项执行状态，以及针对性的辅导建议。',
          },
          {
            type: 'coaching-tracking',
            content: '',
            data: {
              memberName: '李明',
              executions: [
                {
                  action: '每周触客50+人，记录所有客户沟通',
                  deadline: '2025-03-12',
                  status: 'in-progress',
                },
                { action: '完成3次客户深度面访，准备方案', deadline: '2025-03-15', status: 'pending' },
                { action: '参加异议处理话术培训，提交学习笔记', deadline: '2025-03-10', status: 'completed' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看更新进度', value: 'update' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '这是李明从面谈至今的执行更新详情。您可以看到每项行动的进展，以及距离截止日期的时间窗口。系统建议对"完成3次客户深度面访"进行加强跟进，确保按期完成。',
            speechText: '这是李明从面谈至今的执行更新详情。您可以看到每项行动的进展，以及距离截止日期的时间窗口。系统建议对深度面访进行加强跟进。',
          },
          {
            type: 'coaching-tracking',
            content: '',
            data: {
              memberName: '李明',
              executions: [
                {
                  action: '每周触客50+人，记录所有客户沟通',
                  deadline: '2025-03-12',
                  status: 'in-progress',
                  progress: 65,
                },
                { action: '完成3次客户深度面访，准备方案', deadline: '2025-03-15', status: 'pending', progress: 0 },
                { action: '参加异议处理话术培训，提交学习笔记', deadline: '2025-03-10', status: 'completed', progress: 100 },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看辅导建议', value: 'coaching-advice' },
          { label: '返回查看面板', value: 'back' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '针对李明的执行情况，系统建议的辅导重点：1. 加强客户深度开拓，建议每周指导2次面访准备；2. 强化异议处理应用，在实际面访中运用所学；3. 每周进行一次执行检查，及时调整策略。预计通过这些措施，李明可以在3月15日前完成所有行动目标。',
            speechText: '系统针对李明的执行情况，给出了三点辅导建议。加强客户深度开拓、强化异议处理应用、以及每周执行检查。预计可以在3月15日前完成所有行动目标。',
          },
          {
            type: 'text',
            content: '💡 核心建议：\n• 加强客户深度开拓 - 每周指导2次面访准备\n• 强化异议处理应用 - 在实际面访中运用所学\n• 每周执行检查 - 及时调整策略和方向\n\n预期成果：3月15日前完成所有行动目标，收入累计达成率超过75%',
            speechText: '已为您生成辅导建议',
          },
        ],
        quickReplies: [
          { label: '确认辅导计划', value: 'confirm' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
    ],
  },
  // 主管场景5: 主管工作总结
  {
    id: 'manager-work-summary',
    name: '主管工作总结，分析团队业绩',
    icon: '📈',
    description: '每天/周/月',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content: '尊敬的您，这是本周的团队工作总结。系统已汇总了团队业绩、成员表现、存在的问题，以及建议的改进方向。让我们一起来看看。',
            speechText: '尊敬的您，这是本周的团队工作总结。系统已汇总了团队业绩、成员表现、存在的问题，以及建议的改进方向。让我们一起来看看。',
          },
          {
            type: 'manager-summary',
            content: '',
            data: {
              period: '本周',
              members: [
                { name: '李明', incomeRate: 43, visitCount: 5, status: 'needs-attention' },
                { name: '小林', incomeRate: 80, visitCount: 12, status: 'good' },
                { name: '小周', incomeRate: 45, visitCount: 6, status: 'needs-attention' },
                { name: '小吴', incomeRate: 110, visitCount: 18, status: 'excellent' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看详细分析', value: 'details' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '以下是本周团队成员的详细分析。您可以看到三个关键指标：收入达成率、客户拜访数、以及整体状态评分。系统重点关注了需要帮扶的成员（李明和小周），以及表现优异的成员（小吴）。',
            speechText: '以下是本周团队成员的详细分析。关键指标包括收入达成率、客户拜访数和整体状态评分。重点关注需要帮扶的李明和小周，以及表现优异的小吴。',
          },
          {
            type: 'manager-summary',
            content: '',
            data: {
              period: '本周',
              totalIncome: 680000,
              targetIncome: 800000,
              achieveRate: 85,
              visitCount: 41,
              conversionRate: 32,
              members: [
                { name: '李明', incomeRate: 43, visitCount: 5, status: 'needs-attention', performance: '需要加强面访和产品转化' },
                { name: '小林', incomeRate: 80, visitCount: 12, status: 'good', performance: '表现稳定，维持状态' },
                { name: '小周', incomeRate: 45, visitCount: 6, status: 'needs-attention', performance: '需要增加拜访频率' },
                { name: '小吴', incomeRate: 110, visitCount: 18, status: 'excellent', performance: '业绩突出，可作为示范' },
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看改进建议', value: 'improvements' },
          { label: '返回概览', value: 'back' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '基于本周的团队分析，系统生成了以下改进建议：',
            speechText: '基于本周的团队分析，系统生成了改进建议。',
          },
          {
            type: 'text',
            content: '🎯 团队层面：\n• 整体收入达成率85%，距目标还有15%的提升空间\n• 平均面访转化率32%，建议提升到35%以上\n• 小吴的销售话术可作为团队标杆进行分享\n\n👥 个人层面：\n• 李明：需要在面访准备和异议处理上加强辅导（面谈后追踪中已有计划）\n• 小周：建议增加拜访频率，目标调整至每周10+次客户接触\n• 小林：保持目前的稳健发展，预计可在月底突破目标\n• 小吴：给予更多新客户资源，充分发挥其优秀能力\n\n📊 下周重点：\n1. 执行李明的面谈辅导计划，确保行动项按期完成\n2. 对小周进行一次深度辅导，制定个性化提升方案\n3. 邀请小吴分享销售成功经验，进行团队培训',
            speechText: '已为您生成改进建议。包括团队层面的整体目标、个人层面的具体辅导计划，以及下周的重点工作安排。',
          },
        ],
        quickReplies: [
          { label: '确认计划', value: 'confirm' },
          { label: '返回菜单', value: 'back-to-menu' },
        ],
      },
    ],
  },
];

// 只导出主管场景
export const managerScenarios = scenarios.filter(
  (s) =>
    s.id === 'manager-monthly-coaching-list' ||
    s.id === 'manager-pre-coaching-guidance' ||
    s.id === 'manager-during-coaching-record' ||
    s.id === 'manager-post-coaching-tracking' ||
    s.id === 'manager-work-summary'
);
