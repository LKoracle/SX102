import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  // Module 1: 每月初，提醒代理人盘点客户
  {
    id: 'monthly-review',
    name: '每月初，提醒代理人盘点客户',
    icon: '📋',
    description: '每月初',
    steps: [
      // Step 0: 提醒盘点客户
      {
        aiMessages: [
          {
            type: 'text',
            content: '新的一个月开始啦，记得完成客户盘点哦。同时，我已自动为您推荐了精选客户名单，并附上清晰的推荐理由。',
            speechText: '张经理，新的一月开始啦！我帮您挑了几位重点客户，一起看看吧。',
          },
          {
            type: 'customer-card',
            content: '',
            data: { customerId: 'c1' },
            delay: 400,
          },
          {
            type: 'customer-card',
            content: '',
            data: { customerId: 'c2' },
            delay: 300,
          },
          {
            type: 'customer-card',
            content: '',
            data: { customerId: 'c4' },
            delay: 300,
          },
        ],
        quickReplies: [
          { label: '帮我盘点全部推荐客户', value: 'review-all' },
          { label: '查看精选客户名单', value: 'view-list' },
        ],
      },
      // Step 1: 完成盘点 + 生成经营计划
      {
        aiMessages: [
          {
            type: 'text',
            content: '已为您完成全部推荐客户的盘点。根据您盘点的客户，为您生成当月经营计划，请查收。',
            speechText: '盘点完成了，经营计划也生成好了，请过目。',
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
        ],
        quickReplies: [
          { label: '查看要经营的客户', value: 'view-customers' },
        ],
      },
      // Step 2: 查看经营客户列表
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '已为您整理好本月客户经营清单，并根据每位客户的特点推荐了经营动作，您可以一键转发经营素材和参考话术，高效完成客户经营。',
            speechText: '清单整理好了，每位客户都有推荐动作，您可以直接操作。',
          },
          {
            type: 'customer-list',
            content: '',
            data: {
              customers: [
                {
                  name: '李平安',
                  temperature: '高温',
                  value: '高价值',
                  action: '面访沟通养老规划方案',
                  actionIcon: '🤝',
                  tags: ['高净值', '保养老'],
                  lastContact: '上周',
                },
                {
                  name: '王建国',
                  temperature: '高温',
                  value: '高价值',
                  action: '面访讲解子女教育金',
                  actionIcon: '🤝',
                  tags: ['加保意向', '子女教育'],
                  lastContact: '2周前',
                },
                {
                  name: '李美琳',
                  temperature: '高温',
                  value: '中价值',
                  action: '电话沟通重疾保障方案',
                  actionIcon: '📱',
                  tags: ['保障意识强', '重疾缺口'],
                  lastContact: '1个月前',
                },
                {
                  name: '张伟',
                  temperature: '中温',
                  value: '高价值',
                  action: '发送保障科普素材',
                  actionIcon: '📩',
                  tags: ['首次接触', '高收入'],
                  lastContact: '3天前',
                },
                {
                  name: '陈晓雯',
                  temperature: '中温',
                  value: '中价值',
                  action: '推送养老年金产品资料',
                  actionIcon: '📩',
                  tags: ['理财需求', '养老规划'],
                  lastContact: '1周前',
                },
                {
                  name: '刘大明',
                  temperature: '低温',
                  value: '高价值',
                  action: '节日问候维护关系',
                  actionIcon: '📱',
                  tags: ['老客户', '传承需求'],
                  lastContact: '5天前',
                },
              ],
              summary: '建议优先跟进高温高价值客户李平安、王建国，本月面访目标15次，当前已完成0次',
            },
            delay: 500,
          },
        ],
        quickReplies: [],
      },
      // Step 3: 添加计划
      {
        aiMessages: [
          {
            type: 'text',
            content: '已帮您添加下周一14点拜访李平安的计划',
            speechText: '好的，已添加拜访计划。',
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
            speechText: '张经理，今天下午两点要拜访李平安，需要帮您准备方案吗？',
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
      // Step 1: 分析客户需求
      {
        aiMessages: [
          {
            type: 'customer-card',
            content: '',
            data: { customerId: 'c1', detailed: true },
          },
          {
            type: 'text',
            content: '李平安，45岁，属于社会中坚客群，面临资产贬值、养老储备不足的风险，重点需求是保财富、保养老',
            speechText: '李平安45岁，重点需求是保财富和保养老，我来帮您分析。',
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '测算保障缺口', value: 'gap-analysis' },
          { label: '推荐产品方案', value: 'product-recommend' },
        ],
      },
      // Step 2: 测算保障缺口
      {
        aiMessages: [
          {
            type: 'text',
            content: '结合客户内外部保险数据分析，李平安存在财富缺口80万，养老缺口180万',
            speechText: '分析结果显示，财富缺口80万，养老缺口180万。',
          },
        ],
        quickReplies: [
          { label: '推荐产品方案及权益讲解内容', value: 'product-recommend' },
          { label: '返回', value: 'back-to-menu' },
        ],
      },
      // Step 3: 推荐产品方案
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '根据客户需求及保险缺口，建议三套方案，优先推荐【平安添盈·臻享家医】产品方案，年交保费10万，3年交。预估客户60岁时财富保障可达80万。同时可享臻享家医服务，守护家人身体健康\n\n点击方案详情可查看产品亮点介绍和服务权益讲解内容哦~',
            speechText: '推荐平安添盈臻享家医方案，年交10万，3年交，您看看详情。',
          },
        ],
        quickReplies: [
          { label: '促成这个方案我的销售利益有多少？', value: 'sales-benefit' },
          { label: '查看销售攻略', value: 'sales-strategy' },
        ],
      },
      // Step 4: 测算销售利益
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
      // Step 5: 匹配销售攻略
      {
        aiMessages: [
          {
            type: 'text',
            content: '为了帮您促成销售，已根据客户画像为您生成适合李平安的个性化经营建议，助您高效沟通、顺利出单。',
            speechText: '销售攻略已生成，祝您拜访顺利！',
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
            content: '下午好！看到您刚完成对客户李平安的拜访，需要帮您记录拜访信息并生成总结吗？',
            speechText: '下午好！拜访结束了，需要帮您记录和总结吗？',
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
            speechText: '语音已识别，正在生成拜访总结。',
          },
          {
            type: 'text',
            content: '已为您记录拜访内容，正在为您生成拜访总结。',
            delay: 800,
          },
          {
            type: 'text',
            content:
              '📋 **拜访总结报告**\n\n本次拜访重点沟通保财富和保养老的产品+服务方案。客户关注子女教育金储备，同时对养老规划有一定兴趣。\n\n**【客户关键信息】**\n• 居住地：深圳香蜜湖\n• 年收入：约120万，家庭经济稳健\n• 资产情况：名下一套房产（香蜜湖）、两辆车（宝马、特斯拉）\n• 家庭结构：太太主理家庭理财，客户本人为公司合伙人\n• 关注点：子女教育、养老规划\n• 客户生日：9月12日（建议作为客户关怀节点）\n\n通过方案介绍，成功促成客户投保【平安添盈·臻享家医】方案，建议后续跟进保单进度，并结合生日节点开展客户关怀，增强客户粘性。',
            speechText: '总结已生成，客户成功投保，建议后续跟进保单进度。',
            delay: 1000,
          },
        ],
        quickReplies: [
          { label: '查看异议处理建议', value: 'objection' },
          { label: '更新客户档案', value: 'update-file' },
        ],
      },
      // Step 2: 异议处理建议
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '了解到李平安关注资金流动性问题，我为您准备了异议处理建议。\n\n**常见疑虑点：**\n担心年金产品资金锁定时间太长\n\n**对应话术：**\n可以强调"年金类产品可以灵活设置领取年龄、领取期间、领取方式，可以根据孩子成长路径调整领取计划，孩子不用还可以用于自己的养老退休生活，按需灵活选择与变更，因需赋型，以变应变"\n\n**案例参考：**\n已有类似客户通过该方式实现教育金和养老金的双金储备与灵活使用',
            speechText: '异议处理建议已准备好，重点强调灵活领取。',
          },
        ],
        quickReplies: [
          { label: '更新客户档案', value: 'update-file' },
          { label: '推荐拜访附近客户', value: 'nearby' },
        ],
      },
      // Step 3: 更新档案提示
      {
        aiMessages: [
          {
            type: 'text',
            content: '本次拜访信息及客户情况已整理完毕，是否更新到客户档案？',
            speechText: '信息整理好了，要更新到档案吗？',
          },
        ],
        quickReplies: [
          { label: '更新', value: 'confirm-update' },
          { label: '稍后再说', value: 'back-to-menu' },
        ],
      },
      // Step 4: 确认更新 + 推荐附近客户
      {
        aiMessages: [
          {
            type: 'text',
            content: '已同步更新本次拜访信息及客户情况到李平安的客户档案',
            speechText: '档案已更新。附近还有两位客户，建议顺路拜访。',
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
      // Step 5: 准备拜访王五
      {
        aiMessages: [
          {
            type: 'text',
            content: '好的，我先帮你分析王五的客户画像和沟通重点，方便您高效推进拜访。',
            speechText: '好的，正在为您准备王五的资料。',
          },
        ],
        quickReplies: [],
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
            type: 'text',
            content:
              '**【李明的详细画像与能力分析】**\n\n**目标完成情况：**\n• 触客完成率：80%\n• 面访完成率：仅20%\n• 邀约转化率：偏低\n\n**沟通表现分析：**\n在"需求挖掘"和"方案呈现"环节表现较好，但在"异议处理"和"促成动作"上存在短板',
            delay: 600,
          },
          {
            type: 'text',
            content:
              '为更好地帮助李明达钻，建议您组织一次面谈，进行针对性辅导。已为您生成李明的面谈方案，请您查收',
            delay: 400,
          },
          {
            type: 'text',
            content:
              '📋 **【面谈方案】**\n\n**(1) 当月目标：**\n达钻（初佣≥3500元且寿险长险≥2件）\n\n**(2) 提升建议：**\n建议加强面访技巧训练\n\n**(3) 提升训练：**\n• 学习课程：《如何高效完成客户面访》+《年金险沟通实战技巧》\n• 实战演练：《实战演练：年金险方案客户促成及异议处理》',
            delay: 600,
          },
        ],
        quickReplies: [],
      },
    ],
  },
];
