export interface BackofficeGroup {
  id: string;
  name: string;
  leader: string;
  headcount: number;
  activeHeadcount: number;
  monthlyFYC: number;
  monthlyTarget: number;
  lastMonthFYC: number;
  activityRate: number;
  visitCount: number;
  visitTarget: number;
  policyCount: number;
  policyTarget: number;
  status: 'excellent' | 'normal' | 'warning' | 'danger';
  anomalyReasons?: string[];
}

export interface AgentMilestoneItem {
  id: string;
  name: string;
  group: string;
  avatar: string;
  milestoneType: '达钻' | '新人津贴' | '激励方案';
  current: number;
  target: number;
  gap: number;
  gapUnit: string;
  difficulty: 'easy' | 'moderate' | 'hard';
  suggestion: string;
}

export interface QuarterlyPerformanceMetric {
  metric: string;
  q3Current: number;
  q3Target: number;
  ytdCurrent: number;
  ytdTarget: number;
  trend: 'up' | 'equal' | 'down';
}

export interface AnnualTargetGapAgent {
  id: string;
  name: string;
  group: string;
  avatar: string;
  examType: '综合排名' | '个险件数' | '新人留存' | '客户满意度';
  current: number;
  target: number;
  gap: number;
  gapUnit: string;
  trackingPlan: string;
}

export const backofficeGroups: BackofficeGroup[] = [
  {
    id: 'g1',
    name: '第一组',
    leader: '王主任',
    headcount: 12,
    activeHeadcount: 10,
    monthlyFYC: 280000,
    monthlyTarget: 350000,
    lastMonthFYC: 310000,
    activityRate: 78,
    visitCount: 85,
    visitTarget: 120,
    policyCount: 18,
    policyTarget: 25,
    status: 'normal',
  },
  {
    id: 'g2',
    name: '第二组',
    leader: '张主任',
    headcount: 10,
    activeHeadcount: 6,
    monthlyFYC: 120000,
    monthlyTarget: 300000,
    lastMonthFYC: 250000,
    activityRate: 45,
    visitCount: 35,
    visitTarget: 100,
    policyCount: 8,
    policyTarget: 20,
    status: 'danger',
    anomalyReasons: ['主力人员2人请假', '新人出单进度滞后', '整组活动量持续低迷'],
  },
  {
    id: 'g3',
    name: '第三组',
    leader: '李主任',
    headcount: 15,
    activeHeadcount: 14,
    monthlyFYC: 420000,
    monthlyTarget: 400000,
    lastMonthFYC: 380000,
    activityRate: 92,
    visitCount: 140,
    visitTarget: 150,
    policyCount: 28,
    policyTarget: 30,
    status: 'excellent',
  },
  {
    id: 'g4',
    name: '第四组',
    leader: '陈主任',
    headcount: 8,
    activeHeadcount: 7,
    monthlyFYC: 150000,
    monthlyTarget: 250000,
    lastMonthFYC: 200000,
    activityRate: 55,
    visitCount: 50,
    visitTarget: 80,
    policyCount: 10,
    policyTarget: 16,
    status: 'warning',
    anomalyReasons: ['活动量达成率偏低', '面访转化率下降'],
  },
];

export const agentMilestones: AgentMilestoneItem[] = [
  {
    id: 'am1',
    name: '刘强',
    group: '第二组',
    avatar: '刘',
    milestoneType: '达钻',
    current: 3000,
    target: 3500,
    gap: 500,
    gapUnit: '元FYC',
    difficulty: 'easy',
    suggestion: '促成1件年金险即可达标',
  },
  {
    id: 'am2',
    name: '赵敏',
    group: '第四组',
    avatar: '赵',
    milestoneType: '达钻',
    current: 2800,
    target: 3500,
    gap: 700,
    gapUnit: '元FYC',
    difficulty: 'moderate',
    suggestion: '需促成1-2单，建议加强面访频率',
  },
  {
    id: 'am3',
    name: '周婷',
    group: '第一组',
    avatar: '周',
    milestoneType: '新人津贴',
    current: 5000,
    target: 8000,
    gap: 3000,
    gapUnit: '元FYC',
    difficulty: 'hard',
    suggestion: '差距较大，建议主管陪访辅导',
  },
  {
    id: 'am4',
    name: '孙浩',
    group: '第三组',
    avatar: '孙',
    milestoneType: '激励方案',
    current: 12000,
    target: 15000,
    gap: 3000,
    gapUnit: '元FYC',
    difficulty: 'moderate',
    suggestion: '推动大单客户签约即可达标',
  },
];

export const quarterlyPerformanceMetrics: QuarterlyPerformanceMetric[] = [
  {
    metric: 'FYC（万元）',
    q3Current: 880,
    q3Target: 1000,
    ytdCurrent: 2600,
    ytdTarget: 2960,
    trend: 'down',
  },
  {
    metric: '政策件数',
    q3Current: 230,
    q3Target: 280,
    ytdCurrent: 720,
    ytdTarget: 850,
    trend: 'down',
  },
  {
    metric: '新增代理人',
    q3Current: 4,
    q3Target: 6,
    ytdCurrent: 14,
    ytdTarget: 18,
    trend: 'down',
  },
  {
    metric: '人均生产率（万元）',
    q3Current: 23.7,
    q3Target: 26,
    ytdCurrent: 73.4,
    ytdTarget: 78,
    trend: 'equal',
  },
];

export const annualTargetGapAgents: AnnualTargetGapAgent[] = [
  {
    id: 'atg1',
    name: '刘强',
    group: '第二组',
    avatar: '刘',
    examType: '综合排名',
    current: 2800,
    target: 3500,
    gap: 700,
    gapUnit: '元FYC',
    trackingPlan: '推进大单客户签约，预计12月底可达成',
  },
  {
    id: 'atg2',
    name: '赵敏',
    group: '第四组',
    avatar: '赵',
    examType: '个险件数',
    current: 45,
    target: 55,
    gap: 10,
    gapUnit: '件',
    trackingPlan: '激励政策倾斜，周追踪机制',
  },
  {
    id: 'atg3',
    name: '周婷',
    group: '第一组',
    avatar: '周',
    examType: '新人留存',
    current: 12,
    target: 15,
    gap: 3,
    gapUnit: '人',
    trackingPlan: '加强新人培养与陪访',
  },
  {
    id: 'atg4',
    name: '孙浩',
    group: '第三组',
    avatar: '孙',
    examType: '客户满意度',
    current: 78,
    target: 85,
    gap: 7,
    gapUnit: '%',
    trackingPlan: '加强回访服务，提升客户体验',
  },
];
