import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'monthly-planning',
    name: '制定经营计划及指引',
    icon: '📋',
    description: '每月初/每周初',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '早上好！新的一个月开始了，我帮您梳理了本月的经营情况：\n\n📊 **本月目标**：保费收入 30万元\n📋 **存量客户**：68位\n🔥 **高意向客户**：5位\n📅 **待跟进客户**：12位\n⏰ **保单即将到期**：3位\n\n我已经为您分析了客户优先级，要查看本月重点客户列表吗？',
          },
        ],
        quickReplies: [
          { label: '查看重点客户', value: 'view-priority-customers' },
          { label: '生成月度计划', value: 'generate-monthly-plan' },
          { label: '查看到期保单', value: 'view-expiring' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '根据客户价值评估和跟进紧迫度，我为您筛选出本月 **TOP 5** 重点客户：',
          },
          {
            type: 'customer-card',
            content: '',
            data: { customerId: 'c1' },
            delay: 500,
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
            data: { customerId: 'c3' },
            delay: 300,
          },
          {
            type: 'text',
            content:
              '💡 **AI建议**：\n\n1. **王建国**（高净值）- 上次提到子女教育金需求，建议本周优先拜访，推荐御享金瑞年金\n2. **李美琳**（医生）- 重疾保障缺口大，作为医生更理解风险，推荐平安福加保\n3. **张伟**（新客户）- 朋友转介绍，趁热打铁，本周内安排首次深度沟通',
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '生成本月计划', value: 'generate-monthly-plan' },
          { label: '安排本周拜访', value: 'arrange-weekly' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'plan-card',
            content: '',
            data: {
              title: '2月月度经营计划',
              items: [
                {
                  week: '第1周',
                  tasks: [
                    '拜访王建国 - 子女教育金方案沟通',
                    '电话跟进李美琳 - 预约面谈时间',
                    '拜访张伟 - 首次需求分析',
                    '3位到期客户续保提醒',
                  ],
                },
                {
                  week: '第2周',
                  tasks: [
                    '王建国促成签单',
                    '李美琳面谈 - 重疾保障方案',
                    '陈晓雯 - 养老年金方案',
                    '开拓2位新客户',
                  ],
                },
                {
                  week: '第3周',
                  tasks: [
                    '李美琳促成签单',
                    '刘大明 - 财富传承方案沟通',
                    '回访本月新签客户',
                    '团队活动：产品培训',
                  ],
                },
                {
                  week: '第4周',
                  tasks: [
                    '月度收尾冲刺',
                    '跟进所有待签单客户',
                    '月度总结复盘',
                    '下月计划初步制定',
                  ],
                },
              ],
            },
          },
          {
            type: 'text',
            content:
              '以上是我为您制定的本月经营计划，涵盖了客户拜访、促成签单和团队活动。您可以根据实际情况调整。\n\n需要我安排本周的每日拜访日程吗？',
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '安排每日日程', value: 'daily-schedule' },
          { label: '调整计划', value: 'adjust-plan' },
          { label: '返回主菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'schedule-card',
            content: '',
            data: {
              title: '本周拜访日程',
              days: [
                {
                  day: '周一',
                  items: [
                    { time: '10:00', task: '电话联系李美琳，预约本周面谈', type: 'call' },
                    { time: '14:00', task: '准备王建国教育金方案', type: 'prepare' },
                  ],
                },
                {
                  day: '周二',
                  items: [
                    { time: '10:00', task: '拜访王建国 - 御享金瑞方案演示', type: 'visit' },
                    { time: '15:00', task: '联系3位到期客户', type: 'call' },
                  ],
                },
                {
                  day: '周三',
                  items: [
                    { time: '09:30', task: '张伟首次面谈 - 需求分析', type: 'visit' },
                    { time: '14:00', task: '团队周例会', type: 'meeting' },
                  ],
                },
                {
                  day: '周四',
                  items: [
                    { time: '10:00', task: '李美琳面谈 - 平安福方案', type: 'visit' },
                    { time: '15:30', task: '陈晓雯电话沟通', type: 'call' },
                  ],
                },
                {
                  day: '周五',
                  items: [
                    { time: '10:00', task: '回访本周面谈客户', type: 'call' },
                    { time: '14:00', task: '本周总结，准备下周计划', type: 'prepare' },
                  ],
                },
              ],
            },
          },
          {
            type: 'text',
            content: '日程已生成！我会在每天早上提醒您当天的安排。开始今天的工作吧！',
            delay: 400,
          },
        ],
        quickReplies: [
          { label: '好的，开始工作', value: 'back-to-menu' },
          { label: '调整日程', value: 'adjust-schedule' },
        ],
      },
    ],
  },
  {
    id: 'sales-conversion',
    name: '销售转化促成',
    icon: '💰',
    description: '每天·拜访前',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '您即将拜访哪位客户？我可以帮您做售前准备，包括：\n\n🔍 客户画像分析\n📊 保障缺口测算\n📦 产品智能匹配\n💬 销售话术推荐\n💰 利益演示计算\n\n请选择客户或告诉我客户姓名：',
          },
        ],
        quickReplies: [
          { label: '王建国', value: 'customer-wang' },
          { label: '李美琳', value: 'customer-li' },
          { label: '张伟', value: 'customer-zhang' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '好的，我来为您分析**王建国**的详细情况：',
          },
          {
            type: 'customer-card',
            content: '',
            data: { customerId: 'c1', detailed: true },
            delay: 400,
          },
          {
            type: 'coverage-gap',
            content: '',
            data: {
              customerName: '王建国',
              analysis: [
                { category: '重疾保障', current: 30, recommended: 100, unit: '万', status: 'gap' },
                { category: '医疗保障', current: 0, recommended: 400, unit: '万', status: 'missing' },
                { category: '意外保障', current: 0, recommended: 200, unit: '万', status: 'missing' },
                { category: '寿险保障', current: 0, recommended: 300, unit: '万', status: 'missing' },
                { category: '子女教育金', current: 0, recommended: 100, unit: '万', status: 'missing' },
                { category: '养老储备', current: 0, recommended: 200, unit: '万', status: 'gap' },
              ],
              summary: '作为家庭主要经济支柱，年收入80-100万，当前仅有30万重疾保障，整体保障严重不足。',
            },
            delay: 600,
          },
        ],
        quickReplies: [
          { label: '查看产品推荐', value: 'product-recommendation' },
          { label: '生成销售话术', value: 'sales-script' },
          { label: '计算利益演示', value: 'benefit-calc' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '基于王建国的需求分析，我推荐以下组合方案：',
          },
          {
            type: 'product-card',
            content: '',
            data: { productId: 'p3', reason: '满足子女教育金需求，第5年起可领取，恰好对应孩子大学阶段' },
            delay: 400,
          },
          {
            type: 'product-card',
            content: '',
            data: { productId: 'p1', reason: '高净值客户标配，有效保额递增，实现家庭财富安全传承' },
            delay: 300,
          },
          {
            type: 'product-card',
            content: '',
            data: { productId: 'p4', reason: '补充医疗保障空白，保证续保20年，价格亲民' },
            delay: 300,
          },
          {
            type: 'text',
            content:
              '💡 **方案总览**：\n- 御享金瑞年金：年缴5万 × 10年 → 解决子女教育\n- 盛世金越终身寿：年缴10万 × 10年 → 财富传承\n- e生保医疗险：年缴1,200元 → 医疗保障\n\n**年总保费约 15.12万**，占年收入15%左右，合理范围内。',
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '生成话术', value: 'sales-script' },
          { label: '异议处理话术', value: 'objection-handling' },
          { label: '返回主菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '针对王建国的情况，为您准备以下沟通话术：\n\n---\n\n**开场白** 🎯\n\n"王总您好！上次您提到想为孩子准备教育金的事，我专门做了一个详细的规划方案。您看今天聊聊？"\n\n---\n\n**需求唤醒** 💡\n\n"王总，您大儿子今年15岁了，3年后就要上大学。现在好的大学，四年本科加上研究生，没有80-100万打不住。如果去海外留学，可能需要200万以上。这笔钱，我们现在开始准备刚好来得及。"\n\n---\n\n**产品切入** 📦\n\n"我给您设计了一个方案 —— 平安御享金瑞年金险，每年存5万，存10年。第5年开始就能领取，刚好覆盖孩子的大学和研究生阶段。而且万能账户还在持续增值，利率比银行存款有优势。"\n\n---\n\n**促成** ✅\n\n"王总，早一天开始，就多一天的收益积累。今天先把小儿子的教育金落实了，回头我们再一起看看大儿子的。您看身份证带了吗？"',
          },
        ],
        quickReplies: [
          { label: '常见异议处理', value: 'objection-handling' },
          { label: '好的，准备出发', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '以下是针对王建国可能提出的常见异议，及应对话术：\n\n---\n\n❓ **"年金收益率不高，还不如自己投资"**\n\n✅ "王总，您说得对，单看收益率确实不算最高。但年金险的核心价值是**确定性**。股市有涨有跌，但孩子上学的时间是确定的。这笔钱需要的是到时候**一定在**，而不是可能翻倍也可能腰斩。"\n\n---\n\n❓ **"我再考虑考虑"**\n\n✅ "理解，这确实需要慎重考虑。不过王总，有个时间因素需要注意——您大儿子15岁了，我们现在开始，到他18岁上大学还有3年的积累期。如果再晚一年，准备时间就更紧了。"\n\n---\n\n❓ **"保费太高了，15万一年"**\n\n✅ "王总，15万其实可以拆开看。年金5万是给孩子存的教育基金，终身寿10万是给全家的资产配置。这15万占您年收入不到15%，而且终身寿相当于是另一种形式的储蓄，账户里的钱还是您的。如果急用，还可以保单贷款。"',
          },
        ],
        quickReplies: [
          { label: '准备出发拜访', value: 'back-to-menu' },
          { label: '更多异议处理', value: 'more-objections' },
        ],
      },
    ],
  },
  {
    id: 'customer-visit',
    name: '1V1拜访客户',
    icon: '🤝',
    description: '每天·拜访后',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '您好！我是您的拜访助手。在您与客户交谈时，我可以：\n\n🎙️ **智能录音** - 实时记录对话要点\n📝 **生成摘要** - 自动总结拜访内容\n💡 **异议助手** - 实时提供异议处理建议\n📋 **更新档案** - 自动更新客户信息\n📍 **附近客户** - 推荐附近可拜访的客户\n\n您现在是要开始拜访记录，还是查看之前的拜访总结？',
          },
        ],
        quickReplies: [
          { label: '开始拜访记录', value: 'start-recording' },
          { label: '模拟拜访演示', value: 'demo-visit' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '🎙️ 拜访记录已开始...\n\n正在模拟与**王建国**的拜访对话记录...\n\n*(模拟录音中...)*',
          },
          {
            type: 'text',
            content:
              '📝 **实时要点捕捉：**\n\n1. ✅ 客户对子女教育金方案感兴趣\n2. ✅ 大儿子明年准备出国读研\n3. ⚠️ 客户表示年缴15万压力较大\n4. ✅ 客户妻子也在场，对保障类产品有兴趣\n5. 💡 客户提到最近在考虑换房\n6. ✅ 客户同意先做教育金方案，终身寿暂缓',
            delay: 2000,
          },
        ],
        quickReplies: [
          { label: '生成拜访总结', value: 'generate-summary' },
          { label: '异议处理建议', value: 'objection-help' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'visit-summary',
            content: '',
            data: {
              customerName: '王建国',
              date: '2025年2月14日 10:30',
              duration: '45分钟',
              location: '客户办公室（南山区科技园）',
              attendees: '王建国、王太太',
              keyPoints: [
                '客户对御享金瑞年金险（教育金）方案整体认可',
                '大儿子明年计划出国读研，教育金需求紧迫',
                '年缴15万预算偏高，客户希望先做教育金（5万/年）',
                '终身寿险方案暂缓，后续再议',
                '王太太对重疾险感兴趣，可以作为下次切入点',
                '客户近期考虑换房，资金流动性需关注',
              ],
              nextActions: [
                '3天内发送御享金瑞年金正式计划书',
                '准备王太太的重疾保障方案（平安福）',
                '下周三前预约第二次面谈',
                '关注客户购房进展，适时调整方案',
              ],
              sentiment: '积极',
              closeProbability: 75,
            },
          },
          {
            type: 'text',
            content:
              '拜访总结已生成并更新到客户档案中。\n\n📋 **关键跟进事项已添加到待办：**\n1. 3天内发送教育金计划书\n2. 准备王太太重疾方案\n3. 下周三前约第二次面谈\n\n要查看附近是否有其他可拜访的客户吗？',
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '附近客户推荐', value: 'nearby' },
          { label: '返回主菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '📍 检测到您当前在**南山区科技园**附近，为您推荐以下客户：',
          },
          {
            type: 'nearby-customers',
            content: '',
            data: {
              customers: [
                {
                  name: '赵明辉',
                  distance: '800m',
                  address: '科兴科学园A栋',
                  tag: '高净值·企业主',
                  lastContact: '2周前',
                  note: '曾咨询企业团险',
                },
                {
                  name: '陈晓雯',
                  distance: '1.2km',
                  address: '后海天际大厦',
                  tag: '年轻白领·理财需求',
                  lastContact: '1周前',
                  note: '对养老年金感兴趣',
                },
              ],
            },
            delay: 400,
          },
          {
            type: 'text',
            content:
              '建议顺路拜访**赵明辉**，距离最近且有明确的保险需求。需要我帮您准备他的客户资料和推荐方案吗？',
            delay: 300,
          },
        ],
        quickReplies: [
          { label: '准备赵明辉资料', value: 'prepare-zhao' },
          { label: '今天就到这里', value: 'back-to-menu' },
        ],
      },
    ],
  },
  {
    id: 'team-management',
    name: '团队经营分析辅导',
    icon: '👥',
    description: '每天·晚上',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '您好主管！以下是团队本月经营数据概览：\n\n👥 **团队规模**：5人\n🎯 **团队目标**：55万\n💰 **已达成**：43.3万（78.7%）\n📈 **达成进度**：月中，进度正常\n\n⚠️ **需关注成员**：2人（小周、小杨）\n🌟 **优秀成员**：1人（小吴，已超额完成）',
          },
          {
            type: 'team-dashboard',
            content: '',
            data: { members: 'all' },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '查看需关注成员', value: 'attention-members' },
          { label: '团队活动量分析', value: 'activity-analysis' },
          { label: '辅导建议', value: 'coaching' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content: '以下两位成员需要重点关注：',
          },
          {
            type: 'member-card',
            content: '',
            data: { memberId: 't2' },
            delay: 400,
          },
          {
            type: 'member-card',
            content: '',
            data: { memberId: 't5' },
            delay: 300,
          },
          {
            type: 'text',
            content:
              '📊 **问题分析**：\n\n**小周**（业务经理）：\n- 拜访量仅完成目标的50%，是业绩落后主因\n- 客户跟进不及时，多个意向客户流失\n- 建议：加强拜访管理，陪同拜访2次\n\n**小杨**（见习业务员）：\n- 新人阶段，信心不足\n- 话术不熟练，转化率仅8%\n- 建议：安排老带新，每天模拟演练30分钟',
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '生成面谈提纲', value: 'interview-outline' },
          { label: '查看团队活动量', value: 'activity-analysis' },
          { label: '返回主菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '为您生成与**小周**的一对一面谈提纲：\n\n---\n\n📋 **面谈提纲 - 小周（业务经理）**\n\n**一、开场（肯定+关怀）**\n- "小周，你入司两年了，一直很努力，上个月也签了几单。最近工作状态怎么样？有什么困难吗？"\n\n**二、数据复盘**\n- 本月目标10万，目前完成4.5万\n- 周拜访量6次，目标12次\n- "你觉得拜访量不够的原因是什么？"\n\n**三、问题诊断**\n- 是客户资源不足？→ 帮助梳理存量客户\n- 是不知道拜访谁？→ 一起制定客户优先级\n- 是约不到客户？→ 分享邀约话术\n- 是信心不足？→ 陪同拜访，现场示范\n\n**四、行动计划**\n- 本周目标：完成8次拜访\n- 我陪你拜访2位重点客户\n- 每天晚上汇报当天拜访情况\n- 周五复盘本周成果\n\n**五、激励收尾**\n- "小周，你的专业能力是有的，关键是把活动量提上来。这周我陪你一起冲，有任何问题随时找我。"\n\n---\n\n需要我也生成小杨的面谈提纲吗？',
          },
        ],
        quickReplies: [
          { label: '生成小杨面谈提纲', value: 'yang-interview' },
          { label: '返回主菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '📋 **面谈提纲 - 小杨（见习业务员）**\n\n**一、开场（鼓励+了解）**\n- "小杨，来公司两个月了，感觉怎么样？我看你每天都很认真在学习，这个态度非常好。"\n\n**二、新人成长评估**\n- 产品知识掌握情况\n- 客户沟通能力\n- 目前遇到的最大困难\n\n**三、针对性辅导**\n- 📚 **知识补强**：本周重点学习平安福和e生保两款产品\n- 🎯 **客户来源**：\n  - 梳理缘故客户100人名单\n  - 协助开拓3位转介绍客户\n- 💬 **话术训练**：\n  - 每天早会30分钟模拟演练\n  - 重点练习开场白和需求分析\n- 🤝 **陪同实战**：\n  - 安排小吴（TOP）带教2天\n  - 本周我亲自陪同拜访1次\n\n**四、短期目标**\n- 本周完成6次拜访（含陪同）\n- 本月至少独立签1单\n- 产品考核达到85分以上\n\n**五、收尾**\n- "小杨，每个优秀的业务员都是从新人走过来的。小吴刚来的时候也是这样，现在已经是团队TOP了。跟着做，一步一步来，一定没问题的。"',
          },
        ],
        quickReplies: [
          { label: '返回主菜单', value: 'back-to-menu' },
          { label: '查看团队周报', value: 'team-weekly' },
        ],
      },
    ],
  },
  {
    id: 'personal-summary',
    name: '个人活动量管理和工作总结',
    icon: '📊',
    description: '每周末/每月末',
    steps: [
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '为您生成本周工作总结：',
          },
          {
            type: 'work-summary',
            content: '',
            data: {
              period: '本周（2月10日 - 2月14日）',
              metrics: {
                visits: { actual: 8, target: 10, label: '客户拜访' },
                calls: { actual: 15, target: 20, label: '电话联系' },
                proposals: { actual: 3, target: 4, label: '方案制作' },
                signedPolicies: { actual: 1, target: 2, label: '签单' },
                premium: { actual: 52000, target: 75000, label: '保费收入' },
              },
              highlights: [
                '成功签约陈晓雯养老年金险，保费5.2万',
                '王建国教育金方案获得认可，下周有望促成',
                '新开发客户赵明辉，首次面谈效果良好',
              ],
              improvements: [
                '拜访量未达标（8/10），周三因团队会议影响',
                '电话联系完成率75%，需要提高邀约效率',
                '张伟跟进不够及时，需加快节奏',
              ],
            },
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '能力提升建议', value: 'skill-improvement' },
          { label: '查看收入明细', value: 'income-detail' },
          { label: '返回主菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'text',
            content:
              '基于您近一个月的工作数据，AI为您分析了能力画像：\n\n📊 **能力雷达分析**\n\n| 能力维度 | 得分 | 评级 |\n|---------|------|------|\n| 客户开拓 | 85分 | ⭐优秀 |\n| 需求分析 | 90分 | ⭐优秀 |\n| 产品讲解 | 78分 | 👍良好 |\n| 异议处理 | 65分 | ⚠️待提升 |\n| 促成签单 | 72分 | 👍良好 |\n| 客户服务 | 88分 | ⭐优秀 |\n\n---\n\n⚠️ **重点提升方向：异议处理能力**\n\n分析发现，您在客户提出价格异议时，转化率较低。建议：\n\n1. 📚 学习课程：《高端客户异议处理技巧》（30分钟）\n2. 🎯 每日练习：与AI模拟异议处理对话\n3. 📖 案例学习：查看TOP业务员小吴的成功案例\n\n要开始AI模拟训练吗？',
          },
        ],
        quickReplies: [
          { label: '开始模拟训练', value: 'start-training' },
          { label: '查看收入明细', value: 'income-detail' },
          { label: '返回主菜单', value: 'back-to-menu' },
        ],
      },
      {
        aiMessages: [
          {
            type: 'income-card',
            content: '',
            data: {
              period: '2025年2月（截至14日）',
              basicSalary: 8000,
              commission: 15600,
              bonus: 5000,
              teamOverride: 12000,
              total: 40600,
              comparison: '+12%',
              yearlyTotal: 485000,
              yearlyTarget: 600000,
              ranking: '部门第3名',
              bonusAlert: '距离季度优秀奖还差8万保费，加油冲刺！',
            },
          },
          {
            type: 'text',
            content:
              '💪 **收入提升建议**：\n\n1. 本月再签2单（预计王建国+李美琳），可额外获得佣金约2.8万\n2. 团队整体达标后，管理津贴将增加3,000元\n3. 冲刺季度优秀奖（奖金5,000元），还需8万保费\n\n继续保持，您离目标越来越近了！',
            delay: 500,
          },
        ],
        quickReplies: [
          { label: '返回主菜单', value: 'back-to-menu' },
          { label: '制定下月计划', value: 'next-month-plan' },
        ],
      },
    ],
  },
];
