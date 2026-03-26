'use client'
import { useState, useMemo } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel,
  LabelList, ReferenceLine
} from 'recharts'
import {
  CLIENT_NAME, REPORT_DATE, REPORT_PERIOD, KPI_SUMMARY,
  FUNNEL, CONVERSION_RATES, JOB_STATUS, PIPELINE_STAGES,
  RECRUITERS, DAILY_TREND, DAILY_RECRUITER_TREND, JOBS
} from '../lib/data'

const TABS = [
  { id: 'insights', label: '💡 Insights' },
  { id: 'overview', label: '📊 Overview' },
  { id: 'trends', label: '📈 Daily Trends' },
  { id: 'recruiters', label: '👥 Recruiters' },
  { id: 'jobs', label: '💼 Job Pipeline' },
]

const CHART_COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#f97316', '#84cc16', '#ec4899', '#6366f1']

function StatCard({ label, value, sub, color = 'blue', icon }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    green: 'bg-green-50 text-green-700 border-green-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    red: 'bg-red-50 text-red-700 border-red-100',
    purple: 'bg-purple-50 text-purple-700 border-purple-100',
    slate: 'bg-slate-50 text-slate-700 border-slate-100',
  }
  return (
    <div className={`rounded-xl border p-4 ${colorMap[color]}`}>
      <div className="text-xs font-medium opacity-70 mb-1">{icon} {label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {sub && <div className="text-xs opacity-60 mt-1">{sub}</div>}
    </div>
  )
}

function SectionTitle({ children, sub }) {
  return (
    <div className="mb-3">
      <h2 className="text-sm font-semibold text-slate-800">{children}</h2>
      {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
    </div>
  )
}

function Badge({ status }) {
  const map = {
    Open: 'bg-green-100 text-green-700',
    Paused: 'bg-amber-100 text-amber-700',
    Closed: 'bg-slate-100 text-slate-500',
  }
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${map[status] || map.Closed}`}>{status}</span>
}

function InsightsTab() {
  const k = KPI_SUMMARY
  return (
    <div className="space-y-6">
      {/* Funnel KPIs */}
      <div>
        <SectionTitle sub="KPI metrics — recruiter daily metrics & job details">Overall funnel efficiency</SectionTitle>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {CONVERSION_RATES.map((r, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-xl p-4 text-center">
              <div className="text-xs text-slate-500 mb-1">{r.stage}</div>
              <div className={`text-2xl font-bold ${r.rate < 15 ? 'text-amber-500' : 'text-emerald-500'}`}>{r.rate}%</div>
              <div className="text-xs text-slate-400 mt-1">{r.from.toLocaleString()} → {r.to.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottleneck callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
        <span className="text-amber-500 text-lg">📌</span>
        <p className="text-sm text-amber-800">
          <strong>Key bottleneck:</strong> Only <strong>10.5%</strong> of qualified candidates
          (strong + potential fit = <strong>11,047</strong>) have been set up for a Tracy interview.
          Closing this gap is the highest-leverage action available.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* What's going well */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-500">✅</span>
            <h3 className="text-sm font-semibold text-slate-700">What's going well</h3>
          </div>
          <div className="space-y-3">
            <InsightCard
              title="Strong applicant volume"
              color="green"
              text={`${k.totalApplicants.toLocaleString()} total applicants across ${k.totalJobs} jobs since Jan 2026. ${k.newApplicants15d.toLocaleString()} new applicants in the last 15 days alone, peaking at ${k.peakApplicantsCount.toLocaleString()} on ${k.peakApplicantsDate}. Pipeline is actively growing.`}
            />
            <InsightCard
              title="Tracy recommendation quality"
              color="green"
              text={`45.3% of Tracy-interviewed candidates are recommended — a strong quality signal with ${k.tracyRecommended} recommendations out of ${k.tracyInterviewed} interviews completed.`}
            />
            <InsightCard
              title="Top Tracy & offer performers"
              color="green"
              text={`🤖 recruiter.alpha leads Tracy set up (103 scheduled) with 3 joins. 🎙️ recruiter.beta close behind with 77 Tracy set ups. 📨 recruiter.alpha and recruiter.gamma lead on offers sent (4 each).`}
            />
            <InsightCard
              title="Active pipeline strength"
              color="green"
              text={`${k.activeJobs} jobs actively open. ${k.tracyInterviewed} Tracy interviews completed with ${k.tracyRecommended} recommendations ready for next-stage progression.`}
            />
          </div>
        </div>

        {/* Needs attention */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-500">⚠️</span>
            <h3 className="text-sm font-semibold text-slate-700">Needs attention</h3>
          </div>
          <div className="space-y-3">
            <InsightCard
              title="Low Tracy coverage — 10.5%"
              color="amber"
              text={`Only ${k.tracySetUp.toLocaleString()} of ${k.fitPool.toLocaleString()} qualified candidates have been set up for Tracy. This is the primary pipeline bottleneck — accelerating Tracy scheduling would unlock significantly more recommendations.`}
            />
            <InsightCard
              title={`Tracy completion backlog — ${k.tracyUpcoming} upcoming`}
              color="amber"
              text={`${k.tracyUpcoming} Tracy interviews are scheduled but not yet completed (20.6% completion rate so far). Prioritise completing these to push candidates forward.`}
            />
            <InsightCard
              title={`${((k.pausedJobs / k.totalJobs) * 100).toFixed(1)}% jobs paused (${k.pausedJobs} of ${k.totalJobs})`}
              color="amber"
              text="A large share of the portfolio is paused. Paused jobs still carry active candidate pipelines — review them to either resume or close to free up bandwidth."
            />
            <InsightCard
              title={`${k.jobsZeroStrongFit} jobs with zero strong fit`}
              color="amber"
              text={`${k.jobsZeroStrongFit} of ${k.totalJobs} jobs have no strong-fit candidates identified yet. Review job descriptions or sourcing strategy for these roles to improve qualification rates.`}
            />
          </div>
        </div>
      </div>

      {/* Recruiter efficiency snapshot table */}
      <div>
        <SectionTitle sub="Recruiter efficiency snapshot">Top recruiters at a glance</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                {['Recruiter', 'Jobs', 'Applicants', 'Strong Fit', 'Fit Rate', 'Tracy Set Up', 'Tracy Coverage', 'Tracy Int.', 'Completion', 'Offers', 'Joined', 'Signal'].map(h => (
                  <th key={h} className="text-left py-2 px-2 text-slate-500 font-medium whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECRUITERS.slice(0, 5).map((r, i) => {
                const fitRate = ((r.strongFit / r.applicants) * 100).toFixed(1)
                const coverage = (((r.tracySetUp) / (r.strongFit + r.potentialFit)) * 100).toFixed(1)
                const completion = ((r.tracyInt / r.tracySetUp) * 100).toFixed(1)
                const signal = r.joined > 0 ? '🟢 High' : r.offers > 0 ? '🟡 Med' : '⚪ Low'
                return (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-2 font-mono text-slate-700">{r.name}</td>
                    <td className="py-2 px-2">{r.jobs}</td>
                    <td className="py-2 px-2">{r.applicants.toLocaleString()}</td>
                    <td className="py-2 px-2">{r.strongFit}</td>
                    <td className="py-2 px-2">{fitRate}%</td>
                    <td className="py-2 px-2 font-semibold text-blue-600">{r.tracySetUp}</td>
                    <td className="py-2 px-2">{coverage}%</td>
                    <td className="py-2 px-2">{r.tracyInt}</td>
                    <td className="py-2 px-2">{completion}%</td>
                    <td className="py-2 px-2">{r.offers}</td>
                    <td className="py-2 px-2 font-semibold text-green-600">{r.joined}</td>
                    <td className="py-2 px-2">{signal}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function InsightCard({ title, color, text }) {
  const border = color === 'green' ? 'border-l-green-400 bg-green-50' : 'border-l-amber-400 bg-amber-50'
  const titleColor = color === 'green' ? 'text-green-800' : 'text-amber-800'
  return (
    <div className={`border-l-4 rounded-r-lg pl-3 pr-3 py-3 ${border}`}>
      <p className={`text-xs font-semibold mb-1 ${titleColor}`}>{title}</p>
      <p className="text-xs text-slate-600 leading-relaxed">{text}</p>
    </div>
  )
}

function OverviewTab() {
  const k = KPI_SUMMARY
  return (
    <div className="space-y-6">
      {/* Big stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard label="Total jobs" value={k.totalJobs} sub={`${k.activeJobs} open · ${k.pausedJobs} paused`} icon="💼" color="blue" />
        <StatCard label="Total applicants" value={k.totalApplicants.toLocaleString()} sub={`+${k.newApplicants15d.toLocaleString()} last 15 days`} icon="👤" color="purple" />
        <StatCard label="Strong fit" value={k.strongFit.toLocaleString()} sub={`${((k.strongFit / k.totalApplicants) * 100).toFixed(1)}% of applicants`} icon="⭐" color="green" />
        <StatCard label="Potential fit" value={k.potentialFit.toLocaleString()} sub={`${((k.potentialFit / k.totalApplicants) * 100).toFixed(1)}% of applicants`} icon="🔮" color="slate" />
        <StatCard label="Tracy set up" value={k.tracySetUp.toLocaleString()} sub={`${((k.tracySetUp / k.fitPool) * 100).toFixed(1)}% of fit pool`} icon="🤖" color="amber" />
        <StatCard label="Tracy interviewed" value={k.tracyInterviewed} sub={`${((k.tracyInterviewed / k.tracySetUp) * 100).toFixed(1)}% of set up`} icon="🎙️" color="blue" />
        <StatCard label="Recommended" value={k.tracyRecommended} sub={`${((k.tracyRecommended / k.tracyInterviewed) * 100).toFixed(1)}% of interviewed`} icon="✅" color="green" />
        <StatCard label="Joined" value={k.joined} sub={`${((k.joined / k.offersSent) * 100).toFixed(1)}% acceptance rate`} icon="🎉" color="green" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Hiring funnel bar */}
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <SectionTitle sub="End-to-end conversion from applicants to joins">Hiring funnel (all time)</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={FUNNEL} layout="vertical" margin={{ left: 40, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickFormatter={v => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v} tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="label" tick={{ fontSize: 10 }} width={150} />
              <Tooltip formatter={(v) => v.toLocaleString()} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {FUNNEL.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Job status pie */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <SectionTitle sub="Current job portfolio breakdown">Job status distribution</SectionTitle>
            <div className="flex items-center gap-4">
              <ResponsiveContainer width="50%" height={160}>
                <PieChart>
                  <Pie data={JOB_STATUS} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={70} innerRadius={40}>
                    {JOB_STATUS.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {JOB_STATUS.map((j, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ background: j.color }} />
                    <span className="text-slate-700">{j.status}</span>
                    <span className="font-semibold ml-auto">{j.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pipeline stage summary */}
          <div className="bg-white border border-slate-100 rounded-xl p-4">
            <SectionTitle sub="Candidates across all active stages">Current pipeline stage summary</SectionTitle>
            <div className="space-y-2">
              {PIPELINE_STAGES.slice(3).map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-28 shrink-0">{s.stage}</span>
                  <div className="flex-1 bg-slate-100 rounded-full h-2">
                    <div className="h-2 rounded-full" style={{ width: `${Math.min((s.count / 1157) * 100, 100)}%`, background: s.color }} />
                  </div>
                  <span className="text-xs font-semibold text-slate-700 w-10 text-right">{s.count.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 recruiters Tracy */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <SectionTitle sub="Total Tracy interviews scheduled · all-time per recruiter">Top 10 recruiters — Tracy set up</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[...RECRUITERS].sort((a, b) => b.tracySetUp - a.tracySetUp)} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={110} />
              <Tooltip />
              <Bar dataKey="tracySetUp" name="Tracy Set Up" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-slate-100 rounded-xl p-4">
          <SectionTitle sub="Offers sent and rejected per recruiter · all-time">Top 10 recruiters — offers</SectionTitle>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={[...RECRUITERS].sort((a, b) => b.offers - a.offers)} layout="vertical" margin={{ left: 10, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={110} />
              <Tooltip />
              <Bar dataKey="offers" name="Offers Sent" fill="#f59e0b" radius={[0, 4, 4, 0]} />
              <Bar dataKey="rejected" name="Rejected" fill="#ef4444" radius={[0, 4, 4, 0]} />
              <Legend />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

function TrendsTab() {
  const recruiterKeys = [
    { key: 'alpha', name: 'recruiter.alpha', color: '#3b82f6' },
    { key: 'beta', name: 'recruiter.beta', color: '#8b5cf6' },
    { key: 'gamma', name: 'recruiter.gamma', color: '#10b981' },
    { key: 'delta', name: 'recruiter.delta', color: '#f59e0b' },
    { key: 'epsilon', name: 'recruiter.epsilon', color: '#ef4444' },
  ]
  return (
    <div className="space-y-6">
      {/* Daily activity trend */}
      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <SectionTitle sub="Key metrics over time (Mar 2026)">Daily activity trend</SectionTitle>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={DAILY_TREND} margin={{ right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="applicants" name="Applicants" stroke="#3b82f6" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="tracySetUp" name="Tracy Set Up" stroke="#f59e0b" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="tracyInt" name="Tracy Interviewed" stroke="#10b981" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="recommended" name="Recommended" stroke="#8b5cf6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Tracy by recruiter */}
      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <SectionTitle sub="Tracy interviews scheduled per day · Mar 10 onwards">Daily Tracy set up by recruiter (top 5)</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={DAILY_RECRUITER_TREND} margin={{ right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend formatter={(value) => {
              const r = recruiterKeys.find(k => k.key === value)
              return r ? r.name : value
            }} />
            {recruiterKeys.map(r => (
              <Line key={r.key} type="monotone" dataKey={r.key} stroke={r.color} strokeWidth={1.5} dot={false} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tracy coverage */}
      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <SectionTitle sub="Set up vs. interviewed per day">Tracy AI coverage</SectionTitle>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={DAILY_TREND} margin={{ right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="tracySetUp" name="Tracy Set Up" fill="#f59e0b" />
            <Bar dataKey="tracyInt" name="Tracy Interviewed" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function RecruitersTab() {
  const [sortKey, setSortKey] = useState('tracySetUp')
  const [sortDir, setSortDir] = useState('desc')

  const sorted = useMemo(() => {
    return [...RECRUITERS].sort((a, b) =>
      sortDir === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
    )
  }, [sortKey, sortDir])

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const cols = [
    { key: 'name', label: 'Recruiter', numeric: false },
    { key: 'jobs', label: 'Jobs' },
    { key: 'applicants', label: 'Applicants' },
    { key: 'strongFit', label: 'Strong fit' },
    { key: 'potentialFit', label: 'Potential fit' },
    { key: 'tracySetUp', label: 'Tracy set up' },
    { key: 'tracyInt', label: 'Tracy int.' },
    { key: 'recommended', label: 'Recommended' },
    { key: 'offers', label: 'Offers' },
    { key: 'joined', label: 'Joined' },
    { key: 'rejected', label: 'Rejected' },
  ]

  return (
    <div className="space-y-6">
      {/* Recruiter overview chart */}
      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <SectionTitle sub="All-time totals per recruiter">Recruiter performance overview</SectionTitle>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={RECRUITERS} margin={{ right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 9 }} angle={-20} textAnchor="end" height={50} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="applicants" name="Applicants" fill="#e2e8f0" />
            <Bar dataKey="strongFit" name="Strong Fit" fill="#6366f1" />
            <Bar dataKey="tracySetUp" name="Tracy Set Up" fill="#3b82f6" />
            <Bar dataKey="tracyInt" name="Tracy Int." fill="#10b981" />
            <Bar dataKey="recommended" name="Recommended" fill="#059669" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Leaderboard table */}
      <div className="bg-white border border-slate-100 rounded-xl p-4">
        <SectionTitle>Recruiter leaderboard</SectionTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                {cols.map(c => (
                  <th
                    key={c.key}
                    className="text-left py-2 px-2 text-slate-500 font-medium whitespace-nowrap cursor-pointer hover:text-slate-800 select-none"
                    onClick={() => c.numeric !== false && toggleSort(c.key)}
                  >
                    {c.label} {c.numeric !== false && (sortKey === c.key ? (sortDir === 'desc' ? '↓' : '↑') : '↕')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-2 font-mono text-slate-700">{r.name}</td>
                  <td className="py-2 px-2">{r.jobs}</td>
                  <td className="py-2 px-2">{r.applicants.toLocaleString()}</td>
                  <td className="py-2 px-2">{r.strongFit}</td>
                  <td className="py-2 px-2">{r.potentialFit}</td>
                  <td className="py-2 px-2 font-semibold text-blue-600">{r.tracySetUp}</td>
                  <td className="py-2 px-2">{r.tracyInt}</td>
                  <td className="py-2 px-2">{r.recommended}</td>
                  <td className="py-2 px-2">{r.offers}</td>
                  <td className="py-2 px-2 font-semibold text-green-600">{r.joined}</td>
                  <td className="py-2 px-2 text-red-500">{r.rejected}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function JobsTab() {
  const [statusFilter, setStatusFilter] = useState('All')
  const [recruiterFilter, setRecruiterFilter] = useState('All')
  const [sortKey, setSortKey] = useState('applicants')
  const [sortDir, setSortDir] = useState('desc')

  const recruiters = useMemo(() => ['All', ...new Set(JOBS.map(j => j.recruiter))], [])

  const filtered = useMemo(() => {
    let data = JOBS
    if (statusFilter !== 'All') data = data.filter(j => j.status === statusFilter)
    if (recruiterFilter !== 'All') data = data.filter(j => j.recruiter === recruiterFilter)
    return [...data].sort((a, b) =>
      sortDir === 'desc' ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
    )
  }, [statusFilter, recruiterFilter, sortKey, sortDir])

  const toggleSort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'desc' ? 'asc' : 'desc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const cols = [
    { key: 'title', label: 'Job title', numeric: false },
    { key: 'recruiter', label: 'Recruiter', numeric: false },
    { key: 'status', label: 'Status', numeric: false },
    { key: 'published', label: 'Published', numeric: false },
    { key: 'applicants', label: 'Applicants' },
    { key: 'strongFit', label: 'Strong fit' },
    { key: 'potentialFit', label: 'Potential fit' },
    { key: 'tracySetUp', label: 'Tracy set up' },
    { key: 'tracyInt', label: 'Tracy int.' },
    { key: 'recommended', label: 'Recommended' },
    { key: 'offersSent', label: 'Offers' },
    { key: 'offerRejected', label: 'Rejected' },
    { key: 'joined', label: 'Joined' },
  ]

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex gap-1">
          {['All', 'Open', 'Paused', 'Closed'].map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${statusFilter === s ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'}`}
            >
              {s}
            </button>
          ))}
        </div>
        <select
          value={recruiterFilter}
          onChange={e => setRecruiterFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 focus:outline-none"
        >
          {recruiters.map(r => <option key={r}>{r}</option>)}
        </select>
        <span className="text-xs text-slate-400 ml-auto">{filtered.length} jobs</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                {cols.map(c => (
                  <th
                    key={c.key}
                    className="text-left py-2 px-3 text-slate-500 font-medium whitespace-nowrap cursor-pointer hover:text-slate-800 select-none"
                    onClick={() => c.numeric !== false && toggleSort(c.key)}
                  >
                    {c.label} {c.numeric !== false && (sortKey === c.key ? (sortDir === 'desc' ? '↓' : '↑') : '↕')}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((j, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-3 font-medium text-slate-800 whitespace-nowrap max-w-[200px] truncate">{j.title}</td>
                  <td className="py-2 px-3 font-mono text-slate-500 whitespace-nowrap">{j.recruiter}</td>
                  <td className="py-2 px-3"><Badge status={j.status} /></td>
                  <td className="py-2 px-3 text-slate-500">{j.published}</td>
                  <td className="py-2 px-3">{j.applicants.toLocaleString()}</td>
                  <td className="py-2 px-3 text-indigo-600">{j.strongFit}</td>
                  <td className="py-2 px-3 text-purple-600">{j.potentialFit}</td>
                  <td className="py-2 px-3 font-semibold text-blue-600">{j.tracySetUp}</td>
                  <td className="py-2 px-3">{j.tracyInt}</td>
                  <td className="py-2 px-3 text-green-600">{j.recommended}</td>
                  <td className="py-2 px-3">{j.offersSent}</td>
                  <td className="py-2 px-3 text-red-500">{j.offerRejected}</td>
                  <td className="py-2 px-3 font-semibold text-green-600">{j.joined}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={13} className="py-8 text-center text-slate-400">No jobs match the current filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('insights')

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">Recruiter Intelligence Dashboard</h1>
              <p className="text-xs text-slate-400 mt-0.5">
                As of {REPORT_DATE} · {KPI_SUMMARY.activeJobs} active jobs · {KPI_SUMMARY.totalApplicants.toLocaleString()} total applicants · {REPORT_PERIOD}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 px-6">
        <div className="max-w-7xl mx-auto flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-sm px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 font-medium'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'insights' && <InsightsTab />}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'trends' && <TrendsTab />}
        {activeTab === 'recruiters' && <RecruitersTab />}
        {activeTab === 'jobs' && <JobsTab />}
      </div>
    </div>
  )
}
