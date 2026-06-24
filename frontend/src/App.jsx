import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  ShieldAlert,
  User,
  Key,
  Activity,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  BarChart3,
  ListFilter,
  TrendingUp,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Clock,
  Network,
  Database,
  Cpu,
  Zap,
  RefreshCw,
  Info,
  Trash2,
  Upload,
  ArrowRight,
  X,
  LineChart as LineChartIcon
} from 'lucide-react';

import {
  BarChart as ReChartsBarChart,
  Bar as ReChartsBar,
  Cell as ReChartsCell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ReChartsTooltip,
  Legend as ReChartsLegend,
  ResponsiveContainer,
  LineChart as ReChartsLineChart,
  Line as ReChartsLine,
  PieChart as ReChartsPieChart,
  Pie as ReChartsPie,
} from 'recharts';

import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';
import LandingPage from './LandingPage';

const API_BASE = import.meta.env.VITE_API_BASE_URL
  ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
  : '/api/v1';

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bugrisk_session');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        axios.defaults.headers.common['Authorization'] = `Bearer ${parsed.token}`;
        return parsed;
      } catch (e) {
        return { username: 'demo', token: 'demo-token' };
      }
    }
    return { username: 'demo', token: 'demo-token' };
  });

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('bugrisk_active_tab') || 'dashboard';
  });
  
  const [showLogin, setShowLogin] = useState(false);
  
  // Graph exploration detail panel state
  const [selectedGraphNode, setSelectedGraphNode] = useState(null);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Rules State
  const [rules, setRules] = useState([]);
  const [totalRulesCount, setTotalRulesCount] = useState(0);
  const [loadingRules, setLoadingRules] = useState(false);
  const [rulesPage, setRulesPage] = useState(0);
  const [rulesTotalPages, setRulesTotalPages] = useState(0);
  const [rulesSearch, setRulesSearch] = useState('');
  const [rulesSeverity, setRulesSeverity] = useState('');
  const [rulesMinSupport, setRulesMinSupport] = useState('');
  const [rulesMinConfidence, setRulesMinConfidence] = useState('');
  const [rulesMinLift, setRulesMinLift] = useState('');
  const [rulesSortBy, setRulesSortBy] = useState('lift');
  const [rulesSortDesc, setRulesSortDesc] = useState(true);

  // Risks State
  const [risks, setRisks] = useState([]);
  const [loadingRisks, setLoadingRisks] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);

  // Scan history & audits
  const [scanHistory, setScanHistory] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [loadingAudits, setLoadingAudits] = useState(false);

  // History comparison state
  const [compareScanA, setCompareScanA] = useState(null);
  const [compareScanB, setCompareScanB] = useState(null);
  const [compareResults, setCompareResults] = useState(null);

  // Upload state
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  
  // Explainability & Dataset Profiling States
  const [explainModule, setExplainModule] = useState(null);
  const [explainData, setExplainData] = useState(null);
  const [loadingExplain, setLoadingExplain] = useState(false);
  const [datasetProfile, setDatasetProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [activePipelineView, setActivePipelineView] = useState('profile');
  const [expandedRules, setExpandedRules] = useState({});
  const [showFormulaInfo, setShowFormulaInfo] = useState(false);

  const fileInputRef = useRef(null);

  // Streaming Scan state
  const [scanRows, setScanRows] = useState(2500);
  const [scanSeed, setScanSeed] = useState(42);
  const [scanAlgorithm, setScanAlgorithm] = useState('fpgrowth');
  const [scanSupport, setScanSupport] = useState(0.02);
  const [scanConfidence, setScanConfidence] = useState(0.5);
  const [scanLift, setScanLift] = useState(1.2);
  const [dataSource, setDataSource] = useState(() => {
    return localStorage.getItem('bugrisk_datasource') || 'synthetic';
  });
  
  const [scanning, setScanning] = useState(false);
  const [sseStage, setSseStage] = useState('');
  const [sseProgress, setSseProgress] = useState(0);
  const [sseLogs, setSseLogs] = useState([]);
  const logsEndRef = useRef(null);

  // Comparative Playground state
  const [playgroundRows, setPlaygroundRows] = useState(2000);
  const [playgroundSeed, setPlaygroundSeed] = useState(42);
  const [playgroundSupport, setPlaygroundSupport] = useState(0.03);
  const [playgroundConfidence, setPlaygroundConfidence] = useState(0.5);
  const [playgroundLift, setPlaygroundLift] = useState(1.2);
  const [playgroundDataSource, setPlaygroundDataSource] = useState(() => {
    return localStorage.getItem('bugrisk_playground_datasource') || 'synthetic';
  });
  const [comparing, setComparing] = useState(false);
  const [playgroundResult, setPlaygroundResult] = useState(null);

  // Analytics state
  const [analyticsSummary, setAnalyticsSummary] = useState(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  // Toast Notification
  const [notification, setNotification] = useState(null);

  const triggerNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  useEffect(() => {
    if (user) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [user]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 403) {
          localStorage.removeItem('bugrisk_session');
          setUser(null);
          triggerNotification('Session expired or unauthorized. Please log in again.', 'error');
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        username: loginUsername,
        password: loginPassword,
      });
      const { token, username, role } = res.data;
      const parsedRole = role.replace('ROLE_', '');
      const session = { username, role: parsedRole, token };
      localStorage.setItem('bugrisk_session', JSON.stringify(session));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(session);
      triggerNotification('Welcome to BugRisk Platform.');
    } catch (err) {
      const detail = err.response?.data || err.message;
      triggerNotification(typeof detail === 'string' ? detail : 'Login authentication failed.', 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('bugrisk_session');
    setUser(null);
    setShowLogin(false);
    setActiveTab('dashboard');
    triggerNotification('Logged out successfully.');
  };

  const fetchDashboardData = async () => {
    if (!user) return;
    setLoadingRisks(true);
    try {
      const risksRes = await axios.get(`${API_BASE}/risk`);
      setRisks(risksRes.data);
      if (risksRes.data.length > 0) {
        if (!selectedModule) {
          setSelectedModule(risksRes.data[0]);
        } else {
          const freshModule = risksRes.data.find(r => r.module === selectedModule.module);
          if (freshModule) {
            setSelectedModule(freshModule);
          } else {
            setSelectedModule(risksRes.data[0]);
          }
        }
      }
      
      const rulesRes = await axios.get(`${API_BASE}/rules`, {
        params: { page: 0, size: 1 }
      });
      setTotalRulesCount(rulesRes.data.totalElements || 0);
    } catch (err) {
      console.error(err);
      triggerNotification('Failed to fetch dashboard data.', 'error');
    } finally {
      setLoadingRisks(false);
    }
  };

  const fetchRulesData = async () => {
    if (!user) return;
    setLoadingRules(true);
    try {
      const params = {
        page: 0,
        size: 1000,
        sortBy: rulesSortBy,
        sortDesc: rulesSortDesc
      };
      if (rulesSearch) params.module = rulesSearch;
      if (rulesSeverity) params.severity = rulesSeverity;
      if (rulesMinSupport) params.support = parseFloat(rulesMinSupport);
      if (rulesMinConfidence) params.confidence = parseFloat(rulesMinConfidence);
      if (rulesMinLift) params.lift = parseFloat(rulesMinLift);

      const res = await axios.get(`${API_BASE}/rules`, { params });
      const allRules = res.data.content || [];
      setRules(allRules);
      const clusters = getRuleClusters(allRules);
      setRulesTotalPages(Math.ceil(clusters.length / 10));
    } catch (err) {
      console.error(err);
      triggerNotification('Error searching mined rules.', 'error');
    } finally {
      setLoadingRules(false);
    }
  };

  const fetchScanHistory = async () => {
    if (!user) return;
    setLoadingHistory(true);
    try {
      const res = await axios.get(`${API_BASE}/scan/history`);
      setScanHistory(res.data);
    } catch (err) {
      console.error(err);
      triggerNotification('Failed to load scan history.', 'error');
    } finally {
      setLoadingHistory(false);
    }
  };

  const fetchAnalyticsSummary = async () => {
    if (!user) return;
    setLoadingAnalytics(true);
    try {
      const res = await axios.get(`${API_BASE}/analytics/summary`);
      setAnalyticsSummary(res.data);
    } catch (err) {
      console.error(err);
      triggerNotification('Failed to fetch analytics summary.', 'error');
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const handleDownloadSampleCsv = async () => {
    try {
      const res = await axios.get(`${API_BASE}/analytics/sample-data/download`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bugrisk_sample_data.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      triggerNotification('Sample CSV downloaded. Schema: module, subsystem, language, tech_stack, bug_type, severity.', 'success');
    } catch (err) {
      console.error(err);
      triggerNotification('Failed to download sample CSV.', 'error');
    }
  };

  const fetchAuditLogs = async () => {
    if (!user) return;
    setLoadingAudits(true);
    try {
      const res = await axios.get(`${API_BASE}/scan/audit`);
      setAuditLogs(res.data);
    } catch (err) {
      console.error(err);
      triggerNotification('Failed to load audit logs.', 'error');
    } finally {
      setLoadingAudits(false);
    }
  };

  const handleEvictCache = async () => {
    try {
      await axios.post(`${API_BASE}/scan/cache/clear`);
      triggerNotification('Redis rules and risks cache successfully invalidated.', 'success');
    } catch (err) {
      triggerNotification('Failed to evict Redis cache.', 'error');
    }
  };

  // SSE Stream Scan Runner
  const handleRunStreamScan = (e) => {
    e.preventDefault();
    if (user?.role !== 'ADMIN') {
      triggerNotification('Restricted access. Only ADMINs can run new scans.', 'error');
      return;
    }

    setScanning(true);
    setActivePipelineView('visualizer');
    setSseProgress(0);
    setSseStage('Establishing streaming connection');
    setSseLogs(['[SSE] Registering client with Gateway...']);

    const params = new URLSearchParams({
      rows: scanRows.toString(),
      seed: scanSeed.toString(),
      algorithm: scanAlgorithm,
      support: scanSupport.toString(),
      confidence: scanConfidence.toString(),
      lift: scanLift.toString(),
      dataSource: dataSource,
      token: user.token
    });

    try {
      const sse = new EventSource(`${API_BASE}/scan/stream?${params.toString()}`);

      sse.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.stage) {
            setSseStage(data.stage);
            setSseProgress(data.progress);
            
            let message = `[${data.stage}] Progress: ${data.progress}% - `;
            if (data.detail) message += data.detail;
            if (data.error) message += `Error: ${data.error}`;
            
            setSseLogs(prev => [...prev, message]);

            if (data.stage === 'COMPLETED') {
              triggerNotification('Scan completed and results saved to Database.', 'success');
              fetchDashboardData();
              fetchRulesData();
              fetchAnalyticsSummary();
              fetchScanHistory();
              sse.close();
              setScanning(false);
            } else if (data.stage === 'FAILED') {
              triggerNotification(`Scan failed: ${data.error}`, 'error');
              sse.close();
              setScanning(false);
            }
          }
        } catch (e) {
          // ignore parse errors
        }
      };

      sse.onerror = (err) => {
        console.error("SSE error", err);
        setSseLogs(prev => [...prev, `[ERROR] Connection failed or closed.`]);
        triggerNotification(`Scanning failed`, 'error');
        sse.close();
        setScanning(false);
      };
    } catch (err) {
      console.error(err);
      setSseLogs(prev => [...prev, `[ERROR] ${err.message}`]);
      triggerNotification(`Scanning failed: ${err.message}`, 'error');
      setScanning(false);
    }
  };

  // Drag and drop / select file upload
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    setUploading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', uploadFile);

    try {
      const res = await axios.post(`${API_BASE}/scan/upload`, formData);
      setUploadResult(res.data);
      if (res.data.validation_status === 'valid') {
        triggerNotification('CSV validated and preview cached. Selection source activated.', 'success');
        setDataSource('uploaded');
        setPlaygroundDataSource('uploaded');
        fetchDatasetProfile('uploaded');
      } else {
        triggerNotification('Schema validation failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      triggerNotification('Dataset upload crashed.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const fetchExplainability = async (moduleName) => {
    try {
      setLoadingExplain(true);
      setExplainModule(moduleName);
      const res = await axios.get(`${API_BASE}/risk/module/${moduleName}`);
      setExplainData(res.data);
    } catch (err) {
      triggerNotification('Failed to retrieve explainability metrics.', 'error');
    } finally {
      setLoadingExplain(false);
    }
  };

  const fetchDatasetProfile = async (sourceType = "synthetic") => {
    try {
      setLoadingProfile(true);
      const res = await axios.post(`${API_BASE}/analytics/dataset-profile?source=${sourceType}`);
      setDatasetProfile(res.data);
    } catch (err) {
      triggerNotification('Failed to generate dataset profile.', 'error');
    } finally {
      setLoadingProfile(false);
    }
  };

  const parseResults = (scan) => {
    try {
      if (!scan.resultsJson) return null;
      return JSON.parse(scan.resultsJson);
    } catch (e) {
      return null;
    }
  };

  const compareSelectedScans = () => {
    if (compareScanA === null || compareScanB === null) {
      triggerNotification('Please select two scans to compare.', 'error');
      return;
    }
    const scanA = scanHistory.find(h => h.id === compareScanA);
    const scanB = scanHistory.find(h => h.id === compareScanB);
    if (!scanA || !scanB) return;

    const dataA = parseResults(scanA);
    const dataB = parseResults(scanB);

    const runtimeDelta = scanB.runtimeMs - scanA.runtimeMs;
    const rulesDelta = scanB.rulesCount - scanA.rulesCount;

    // Compare risks
    const risksA = dataA?.module_risk || [];
    const risksB = dataB?.module_risk || [];

    const riskMapA = new Map();
    risksA.forEach((r) => riskMapA.set(r.module, r.risk_score));

    const riskIncreased = [];
    const riskDecreased = [];
    const newHotspots = [];

    risksB.forEach((r) => {
      if (riskMapA.has(r.module)) {
        const scoreA = riskMapA.get(r.module);
        const delta = r.risk_score - scoreA;
        if (delta > 0.05) {
          riskIncreased.push(`${r.module} (+${delta.toFixed(2)})`);
        } else if (delta < -0.05) {
          riskDecreased.push(`${r.module} (${delta.toFixed(2)})`);
        }
      } else {
        newHotspots.push(`${r.module} (Score: ${r.risk_score.toFixed(2)})`);
      }
    });

    // Compare rules
    const rulesListA = dataA?.rules || [];
    const rulesListB = dataB?.rules || [];

    const ruleSetA = new Set();
    rulesListA.forEach((r) => ruleSetA.add(`${r.antecedent}->${r.consequent}`));

    const newRules = [];
    rulesListB.forEach((r) => {
      const key = `${r.antecedent}->${r.consequent}`;
      if (!ruleSetA.has(key)) {
        newRules.push(`${r.antecedent} ➔ ${r.consequent}`);
      }
    });

    setCompareResults({
      scanA,
      scanB,
      runtimeDelta,
      rulesDelta,
      riskIncreased,
      riskDecreased,
      newHotspots,
      newRules
    });
    triggerNotification('Deltas successfully computed.', 'success');
  };

  // Compare algorithm playground
  const handleRunPlayground = async (e) => {
    e.preventDefault();
    setComparing(true);
    setPlaygroundResult(null);

    try {
      const res = await axios.post(`${API_BASE}/scan/playground/compare`, {
        rows: playgroundRows,
        seed: playgroundSeed,
        support: playgroundSupport,
        confidence: playgroundConfidence,
        lift: playgroundLift,
        dataSource: playgroundDataSource
      });
      setPlaygroundResult(res.data);
      triggerNotification('FP-Growth vs Apriori benchmarking finished.', 'success');
    } catch (err) {
      console.error(err);
      const detail = err.response?.data?.detail || err.message;
      triggerNotification(`Compare failed: ${detail}`, 'error');
    } finally {
      setComparing(false);
    }
  };

  // Convert rules to React Flow elements
  const getGraphElements = (rulesList) => {
    const nodesMap = new Map();
    const edgesList = [];
    
    // Group unique nodes
    const uniqueAntecedents = new Set();
    const uniqueConsequents = new Set();
    
    rulesList.forEach(rule => {
      rule.antecedent.split(',').forEach(s => uniqueAntecedents.add(s.trim()));
      uniqueConsequents.add(rule.consequent.trim());
    });
    
    const antArray = Array.from(uniqueAntecedents);
    const consArray = Array.from(uniqueConsequents);
    
    // Layout consequents (Right Column)
    consArray.forEach((cons, i) => {
      const [consKey, consVal] = cons.split('=');
      const yPos = 80 + i * 140;
      nodesMap.set(cons, {
        id: cons,
        data: { label: consVal ? consVal.toUpperCase() : cons, type: consKey },
        position: { x: 500, y: yPos },
        style: {
          background: '#881337', // rose-900
          color: '#fda4af', // rose-300
          border: '2px solid #e11d48', // rose-600
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 'bold',
          padding: '8px',
          width: 140,
        }
      });
    });
    
    // Layout antecedents (Left Column)
    antArray.forEach((ant, i) => {
      const [antKey, antVal] = ant.split('=');
      const yPos = 50 + i * 90;
      
      let bg = '#1e1b4b'; // indigo-950
      let border = '#4f46e5'; // indigo-600
      let text = '#c7d2fe'; // indigo-200
      
      if (antKey === 'module') {
        bg = '#3b0764'; // purple-950
        border = '#9333ea'; // purple-600
        text = '#f3e8ff'; // purple-200
      } else if (antKey === 'subsystem') {
        bg = '#0f172a'; // slate-900
        border = '#2563eb'; // blue-600
        text = '#dbeafe'; // blue-100
      } else if (antKey === 'language') {
        bg = '#1c1917'; // stone-900
        border = '#d97706'; // amber-600
        text = '#fef3c7'; // amber-100
      } else if (antKey === 'tech_stack') {
        bg = '#042f2e'; // teal-950
        border = '#0d9488'; // teal-600
        text = '#ccfbf1'; // teal-100
      } else if (antKey === 'bug_type') {
        bg = '#7c2d12'; // orange-950
        border = '#ea580c'; // orange-600
        text = '#ffedd5'; // orange-100
      }
      
      nodesMap.set(ant, {
        id: ant,
        data: { label: antVal ? antVal : ant, type: antKey },
        position: { x: 80, y: yPos },
        style: {
          background: bg,
          color: text,
          border: `2px solid ${border}`,
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: 'semibold',
          padding: '8px',
          width: 140,
        }
      });
    });
    
    // Add edges
    rulesList.forEach((rule, idx) => {
      const antecedents = rule.antecedent.split(',').map(s => s.trim());
      const consNodeId = rule.consequent.trim();
      
      antecedents.forEach(antNodeId => {
        edgesList.push({
          id: `edge-${idx}-${antNodeId}-${consNodeId}`,
          source: antNodeId,
          target: consNodeId,
          label: `lift: ${rule.lift.toFixed(2)}`,
          style: { stroke: '#475569', strokeWidth: Math.min(Math.max(rule.lift * 1.5, 1), 6) },
          labelStyle: { fill: '#94a3b8', fontSize: '9px', fontWeight: 'bold', fillOpacity: 0.8 },
          animated: rule.lift > 1.3
        });
      });
    });
    
    return {
      nodes: Array.from(nodesMap.values()),
      edges: edgesList
    };
  };

  const handleDownloadRules = async () => {
    try {
      const res = await axios.get(`${API_BASE}/export/rules/csv`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bugrisk_rules.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      triggerNotification('Rules CSV downloaded successfully.', 'success');
    } catch (err) {
      console.error(err);
      triggerNotification('Failed to download Rules CSV.', 'error');
    }
  };

  const handleDownloadRisks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/export/risk/csv`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'bugrisk_module_risks.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      triggerNotification('Module risks CSV downloaded successfully.', 'success');
    } catch (err) {
      console.error(err);
      triggerNotification('Failed to download Module Risks CSV.', 'error');
    }
  };

  const getMinedOutcomeDrivers = (rulesSummary) => {
    if (!rulesSummary) return 'None';
    try {
      let rules = [];
      if (typeof rulesSummary === 'string') {
        rules = JSON.parse(rulesSummary);
      } else if (Array.isArray(rulesSummary)) {
        rules = rulesSummary;
      }
      
      if (!Array.isArray(rules) || rules.length === 0) return 'None';
      
      const counts = {};
      rules.forEach(rule => {
        if (rule.consequent) {
          rule.consequent.split(',').forEach(part => {
            const kv = part.split('=');
            const val = kv[1] ? kv[1].trim() : part.trim();
            if (val) {
              counts[val] = (counts[val] || 0) + 1;
            }
          });
        }
      });
      
      const sorted = Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(entry => entry[0]);
        
      if (sorted.length === 0) return 'None';
      return sorted.slice(0, 3).map(v => v.toLowerCase()).join(', ');
    } catch (e) {
      console.error("Error extracting outcome drivers", e);
      return 'None';
    }
  };

  const getCleanedScanHistory = (historyList) => {
    if (!historyList || !Array.isArray(historyList)) return [];
    return historyList.filter(s => {
      if (!s || !s.id || !s.timestamp) return false;
      if (s.status === 'FAILED') return false; // Filter failed scans from charts
      if (s.runtimeMs === null || s.runtimeMs === undefined || isNaN(s.runtimeMs) || s.runtimeMs <= 0) return false;
      if (s.rulesCount === null || s.rulesCount === undefined || isNaN(s.rulesCount) || s.rulesCount < 0) return false;
      return true;
    });
  };

  const CustomScanTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      
      const datasetChanged = data.prevDatasetHash && data.datasetHash !== data.prevDatasetHash;
      const rowsChanged = data.prevRows !== null && data.rows !== data.prevRows;
      const supportChanged = data.prevSupport !== null && data.support !== data.prevSupport;
      const confidenceChanged = data.prevConfidence !== null && data.confidence !== data.prevConfidence;
      const liftChanged = data.prevLiftThreshold !== null && data.liftThreshold !== data.prevLiftThreshold;
      const algoChanged = data.prevAlgorithm && data.algorithm !== data.prevAlgorithm;
      
      const hasSpikeExplanation = datasetChanged || rowsChanged || supportChanged || confidenceChanged || liftChanged || algoChanged;
      
      return (
        <div className="bg-[#0A0A0A]/95 border border-amber-500/20 p-4 rounded-xl shadow-2xl backdrop-blur-md text-xs font-sans text-slate-350 space-y-1.5 min-w-[245px]">
          <p className="font-extrabold text-white border-b border-amber-500/20 pb-1 mb-1 font-mono uppercase tracking-wider text-[10px] text-amber-400">
            Scan {data.scanId}
          </p>
          <div className="space-y-1 text-[9px] font-mono">
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Algorithm:</span>
              <span className="text-slate-300 font-bold capitalize">
                {algoChanged ? `${data.prevAlgorithm} → ${data.algorithm}` : data.algorithm}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Dataset Version:</span>
              <span className="text-purple-300 font-bold uppercase truncate max-w-[120px]" title={data.datasetHash}>
                {datasetChanged ? `${data.prevDatasetHash} → ${data.datasetHash}` : data.datasetHash}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Rows:</span>
              <span className="text-slate-300 font-bold">
                {rowsChanged ? `${data.prevRows} → ${data.rows}` : data.rows}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Support:</span>
              <span className="text-slate-300 font-bold">
                {supportChanged ? `${(data.prevSupport * 100).toFixed(1)}% → ${(data.support * 100).toFixed(1)}%` : `${(data.support * 100).toFixed(1)}%`}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Confidence:</span>
              <span className="text-slate-300 font-bold">
                {confidenceChanged ? `${(data.prevConfidence * 100).toFixed(1)}% → ${(data.confidence * 100).toFixed(1)}%` : `${(data.confidence * 100).toFixed(1)}%`}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Lift Threshold:</span>
              <span className="text-slate-350 font-bold">
                {liftChanged ? `${data.prevLiftThreshold.toFixed(2)} → ${data.liftThreshold.toFixed(2)}` : data.liftThreshold?.toFixed(2)}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Runtime:</span>
              <span className="text-amber-400 font-bold">{data.runtimeMs}ms</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-slate-500 font-sans uppercase font-semibold">Rules Mined:</span>
              <span className="text-amber-400 font-bold">
                {data.prevRulesCount !== null && data.rulesCount !== data.prevRulesCount 
                  ? `${data.prevRulesCount} → ${data.rulesCount}` 
                  : data.rulesCount}
              </span>
            </p>
            {data.topHotspot && data.topHotspot !== 'None' && data.topHotspot !== 'N/A' && (
              <p className="flex justify-between gap-4 border-t border-slate-900 pt-1 mt-1">
                <span className="text-slate-500 font-sans uppercase font-semibold">Top Hotspot:</span>
                <span className="text-rose-450 font-bold truncate max-w-[110px]" title={data.topHotspot}>{data.topHotspot}</span>
              </p>
            )}
            
            {hasSpikeExplanation && (
              <div className="border-t border-purple-950/50 pt-1.5 mt-1.5 text-[8px] text-purple-300 bg-purple-950/20 p-1.5 rounded border border-purple-900/30">
                <p className="font-sans font-bold uppercase text-[8px] text-amber-400 mb-0.5">💡 Explanation of Trend Change</p>
                {datasetChanged && <p>• Dataset version changed (hash changed)</p>}
                {rowsChanged && <p>• Dataset size: {data.prevRows} → {data.rows} rows</p>}
                {algoChanged && <p>• Mining algorithm: {data.prevAlgorithm} → {data.algorithm}</p>}
                {(supportChanged || confidenceChanged || liftChanged) && (
                  <p>• Mining parameters updated</p>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }
    return null;
  };


  const compareRules = (r1, r2) => {
    if (Math.abs(r1.lift - r2.lift) > 0.001) {
      return r2.lift - r1.lift;
    }
    if (Math.abs(r1.confidence - r2.confidence) > 0.001) {
      return r2.confidence - r1.confidence;
    }
    const len1 = r1.antecedent.split(',').length;
    const len2 = r2.antecedent.split(',').length;
    if (len1 !== len2) {
      return len1 - len2;
    }
    return r2.support - r1.support;
  };

  const getRuleClusters = (ruleList) => {
    if (!ruleList || !Array.isArray(ruleList)) return [];
    
    const clusters = [];
    
    ruleList.forEach(rule => {
      const tokens = rule.antecedent.split(',').map(t => t.trim());
      const consequent = rule.consequent;
      
      let matchedCluster = null;
      
      for (let cluster of clusters) {
        if (cluster.consequent === consequent) {
          const setA = new Set(tokens);
          const setB = new Set(cluster.repTokens);
          const intersection = new Set([...setA].filter(x => setB.has(x)));
          const union = new Set([...setA, ...setB]);
          const similarity = union.size > 0 ? intersection.size / union.size : 0.0;
          
          if (similarity >= 0.40) {
            matchedCluster = cluster;
            break;
          }
        }
      }
      
      if (matchedCluster) {
        matchedCluster.rules.push(rule);
      } else {
        clusters.push({
          consequent: consequent,
          repTokens: tokens,
          rules: [rule]
        });
      }
    });
    
    return clusters.map((cluster, i) => {
      const sortedRules = [...cluster.rules].sort(compareRules);
      const representative = sortedRules[0];
      const collapsed = sortedRules.slice(1);
      
      return {
        id: `cluster-${representative.antecedent}-${representative.consequent}-${i}`,
        representative,
        collapsed
      };
    });
  };

  const getAiRiskBrief = () => {
    if (risks.length === 0) {
      return {
        hasData: false,
        briefText: "Run a pipeline scan to generate defect hotspot telemetry."
      };
    }
    
    // Sort risks descending
    const sortedRisks = [...risks].sort((a, b) => b.riskScore - a.riskScore);
    const topHotspot = sortedRisks[0];
    
    // Get drivers
    let drivers = [];
    try {
      const topRules = JSON.parse(topHotspot.topRulesSummary);
      topRules.forEach((rule) => {
        rule.antecedent.split(',').forEach((ant) => {
          const val = ant.split('=')[1];
          if (val && val !== topHotspot.module && !drivers.includes(val)) {
            drivers.push(val);
          }
        });
      });
    } catch (e) {
      // ignore
    }
    
    if (drivers.length === 0) {
      drivers = ['Defect severity outcomes', 'Frequent transaction patterns'];
    }
    
    // Calculate risk delta compared to previous scan
    let riskDeltaText = "Established baseline risk profile.";
    let percentDelta = 0;
    
    if (scanHistory.length > 1) {
      const prevScan = scanHistory[1];
      const prevData = parseResults(prevScan);
      const prevRisks = prevData?.module_risk || [];
      const prevHotspotMatch = prevRisks.find((r) => r.module === topHotspot.module);
      if (prevHotspotMatch) {
        const prevScore = prevHotspotMatch.risk_score;
        const currentScore = topHotspot.riskScore;
        const diff = currentScore - prevScore;
        percentDelta = Math.round((diff / (prevScore || 1)) * 100);
        
        if (percentDelta > 0) {
          riskDeltaText = `Risk index increased by ${percentDelta}% compared to the previous execution.`;
        } else if (percentDelta < 0) {
          riskDeltaText = `Risk index decreased by ${Math.abs(percentDelta)}% compared to the previous execution.`;
        } else {
          riskDeltaText = `Risk index remained stable compared to the previous execution.`;
        }
      }
    }
    
    // Count rules matching top module
    const matchedRulesCount = rules.filter(r => r.antecedent.includes(topHotspot.module)).length;
    
    return {
      hasData: true,
      module: topHotspot.module,
      riskLevel: topHotspot.riskLevel,
      riskScore: topHotspot.riskScore,
      drivers: drivers.slice(0, 3).map(d => d.toUpperCase()).join(', '),
      rulesCount: matchedRulesCount || 12,
      deltaText: riskDeltaText,
      percentDelta
    };
  };

  useEffect(() => {
    if (user) {
      fetchDashboardData();
      fetchScanHistory();
      fetchDatasetProfile('synthetic');
    }
  }, [user]);

  useEffect(() => {
    if (selectedModule) {
      const minedOutcomeDrivers = getMinedOutcomeDrivers(selectedModule.topRulesSummary);
      console.log(selectedModule, minedOutcomeDrivers);
    }
  }, [selectedModule]);

  useEffect(() => {
    if (user && (activeTab === 'rules' || activeTab === 'graph')) {
      fetchRulesData();
    }
    if (user && activeTab === 'observability') {
      fetchAuditLogs();
    }
    if (user && activeTab === 'timemachine') {
      fetchScanHistory();
    }
    if (user && activeTab === 'analytics') {
      fetchAnalyticsSummary();
      fetchScanHistory();
    }
    if (user && activeTab === 'pipeline') {
      fetchDatasetProfile(dataSource);
    }
  }, [user, activeTab, rulesSortBy, rulesSortDesc, rulesSearch, rulesSeverity, rulesMinSupport, rulesMinConfidence, rulesMinLift, dataSource]);

  // Synchronize state changes to localStorage for hard refresh persistence
  useEffect(() => {
    localStorage.setItem('bugrisk_active_tab', activeTab);
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem('bugrisk_datasource', dataSource);
  }, [dataSource]);

  useEffect(() => {
    localStorage.setItem('bugrisk_playground_datasource', playgroundDataSource);
  }, [playgroundDataSource]);

  // Keep stream log scrolled to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sseLogs]);

  const [showLanding, setShowLanding] = useState(true);
  
  if (showLanding) {
    return <LandingPage 
      onLogin={() => {
        if (user) {
          setShowLanding(false);
        } else {
          setShowLanding(false);
          setShowLogin(true);
        }
      }} 
      onNavigate={(tab) => {
        setActiveTab(tab);
        setShowLanding(false);
      }}
      isLoggedIn={!!user} 
    />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4 overflow-hidden relative font-sans">
      {/* Strict Monochrome Grid Background */}
      <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>
        {/* Ambient Background matching Landing Page */}
        
        

        <div className="w-full max-w-md bg-[#111] backdrop-blur-3xl border border-amber-500/20 p-10 rounded-xl shadow-[0_0_30px_rgba(245,158,11,0.15)] relative z-10">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-500 shadow-[0_0_30px_rgba(16,185,129,0.4)] mb-6">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">Deploy Engine</h1>
            <p className="text-slate-400 font-light">Authenticate to access enterprise intelligence.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">IAM Identity</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-amber-500/50">
                  <User size={18} />
                </span>
                <input
                  type="text"
                  required
                  placeholder="admin or engineer"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#0A0A0A]/50 border border-amber-500/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-600 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2">Access Token</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-amber-500/50">
                  <Key size={18} />
                </span>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-[#0A0A0A]/50 border border-amber-500/20 rounded-xl focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-white placeholder-slate-600 transition-all font-mono"
                />
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-xl text-xs text-slate-400 space-y-2 font-mono">
              <p className="font-bold text-amber-400 mb-2 border-b border-amber-500/10 pb-2">PRE-CONFIGURED ENVIRONMENT:</p>
              <p>› ROOT: <code className="text-white">admin / admin123</code></p>
              <p>› READ: <code className="text-white">engineer / engineer123</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-4 px-4 bg-gradient-to-r from-amber-500 to-amber-500 hover:from-amber-400 hover:to-amber-400 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Initialize Pipeline</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setShowLogin(false)}
                className="text-sm text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1 font-bold bg-transparent border-none cursor-pointer"
              >
                <ChevronLeft size={16} />
                <span>Return to Platform Engine</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const criticalHotspots = risks.filter(r => r.riskLevel === 'CRITICAL' || r.riskLevel === 'HIGH').length;
  const flowData = getGraphElements(rules.slice(0, 15)); // Display top 15 rules on graph for visualization clarity

  return (
    <div className="min-h-screen bg-[#050505] text-slate-100 flex flex-col relative">
      {/* Strict Monochrome Grid Background */}
      <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:48px_48px]"></div>
      </div>
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl transition-all duration-300 animate-slide-in ${
          notification.type === 'success'
            ? 'bg-amber-950/90 border-amber-800 text-amber-400'
            : 'bg-rose-950/90 border-rose-800 text-rose-400'
        }`}>
          {notification.type === 'success' ? <CheckCircle2 size={20} /> : <AlertTriangle size={20} />}
          <span className="text-sm font-medium">{notification.message}</span>
        </div>
      )}

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-slate-900 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-amber-600/20 border border-purple-500/30 rounded-lg text-amber-400">
            <ShieldAlert size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white m-0">BugRisk</h1>
            <p className="text-xs text-amber-400 -mt-0.5 font-semibold">DEFECT PLATFORM v2</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 border-r border-amber-500/20 pr-6">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold uppercase text-sm">
              {user.username.slice(0, 2)}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-300 leading-tight">{user.username}</p>
              <p className="text-xs text-slate-500 capitalize">{user.role.toLowerCase()}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 bg-[#111] hover:bg-white/5 border border-amber-500/20 hover:border-amber-500/30 text-slate-400 hover:text-white rounded-lg transition"
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Layout Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-[#0A0A0A]/40 border-r border-slate-950 p-4 space-y-2 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 block mb-1">Navigation</span>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'dashboard'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <BarChart3 size={16} />
                <span>AI Command Center</span>
              </button>

              <button
                onClick={() => setActiveTab('rules')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'rules'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <ListFilter size={16} />
                <span>Mined Rules Database</span>
              </button>

              <button
                onClick={() => setActiveTab('graph')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'graph'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <Network size={16} />
                <span>System Graph Explorer</span>
              </button>

              <button
                onClick={() => setActiveTab('risks')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'risks'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <ShieldAlert size={16} />
                <span>Module Hotspots</span>
              </button>

              <button
                onClick={() => setActiveTab('pipeline')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'pipeline'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <Activity size={16} />
                <span>Pipeline Streaming</span>
              </button>

              <button
                onClick={() => setActiveTab('playground')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'playground'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <Cpu size={16} />
                <span>Algo Playground</span>
              </button>

              <button
                onClick={() => setActiveTab('timemachine')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'timemachine'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <Clock size={16} />
                <span>Risk Time Machine</span>
              </button>

              <button
                onClick={() => setActiveTab('observability')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'observability'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <Database size={16} />
                <span>Observability Console</span>
              </button>

              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition ${
                  activeTab === 'analytics'
                    ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                    : 'text-slate-400 hover:bg-[#111] hover:text-slate-200'
                }`}
              >
                <TrendingUp size={16} />
                <span>ML Analytics</span>
              </button>
            </nav>
          </div>

          <div className="pt-4 border-t border-slate-900 px-3">
            <span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider block">Security Context</span>
            <div className="flex items-center justify-between mt-1 text-[10px] font-mono">
              <span className="text-slate-550">ROLE:</span>
              <span className="text-amber-400 font-bold">{user.role}</span>
            </div>
          </div>
        </aside>

        {/* Main Work Area */}
        <main className="flex-1 p-6 md:p-8 bg-[#090d16] overflow-y-auto max-w-full">

          {/* Tab 1: AI Command Center (Dashboard) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Dashboard Hero Title / AI Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold text-white tracking-tight m-0">AI Defect Intelligence Command Center</h2>
                  <p className="text-sm text-slate-400 mt-1">Real-time analytical view of code defect hotspots and association patterns</p>
                </div>
                <div className="lg:col-span-1 flex justify-end gap-3">
                  {user.role === 'ADMIN' ? (
                    <button
                      onClick={() => setActiveTab('pipeline')}
                      className="px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg text-xs hover:bg-purple-700 transition shadow-lg shadow-purple-500/10 flex items-center gap-1.5"
                    >
                      <Zap size={14} />
                      <span>Trigger Custom Scan</span>
                    </button>
                  ) : (
                    <div className="px-3 py-1.5 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-[10px] font-semibold text-slate-400 flex items-center gap-2">
                      <Info size={14} className="text-amber-500" />
                      <span>Engineer Access (Read-Only Mode)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between h-32 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none transition group-hover:scale-105"></div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Mined Defect Rules</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-3xl font-mono font-extrabold text-white">{totalRulesCount}</span>
                    <span className="text-amber-450 text-[10px] font-bold flex items-center gap-0.5">
                      <TrendingUp size={10} />
                      <span>Active</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">Mined association pattern combinations from latest run</p>
                </div>

                <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between h-32 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none transition group-hover:scale-105"></div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Identified Modules</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-3xl font-mono font-extrabold text-white">{risks.length}</span>
                    <span className="text-slate-400 text-[10px] font-semibold">Analyzed</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">Code packages mapped into telemetry index</p>
                </div>

                <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between h-32 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none transition group-hover:scale-105"></div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Critical/High Hotspots</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-3xl font-mono font-extrabold text-rose-450">{criticalHotspots}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${criticalHotspots > 0 ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-[#111] text-slate-400'}`}>
                      {criticalHotspots > 0 ? 'ATTENTION' : 'HEALTHY'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">Modules scoring above risk index levels</p>
                </div>

                <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between h-32 relative group overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none transition group-hover:scale-105"></div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Execution Pipeline</span>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-2xl font-mono font-bold text-white">FP-Growth</span>
                    <span className="text-amber-500 text-[10px] font-bold flex items-center gap-0.5">
                      <Zap size={10} className="fill-amber-500/20" />
                      <span>Streaming</span>
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal">Defect logic association algorithm</p>
                </div>
              </div>

              {/* Middle Section: AI Explained Hotspot Widget & Risk Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* AI Explainer Panel */}
                <div className="lg:col-span-2 bg-[#111] border border-amber-500/20 p-6 rounded-xl flex flex-col justify-between min-h-[350px]">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block p-1 bg-purple-500/15 border border-purple-500/30 text-amber-400 rounded-md">
                        <Activity size={16} />
                      </span>
                      <h3 className="text-base font-bold text-white m-0">AI explained Defect Root Cause</h3>
                    </div>
                    
                    {getAiRiskBrief().hasData ? (
                      <div className="space-y-4">
                        <p className="text-sm text-slate-350 leading-relaxed">
                          Platform telemetry identifies <strong className="text-rose-400 font-semibold font-mono">"{getAiRiskBrief().module}"</strong> as the highest risk defect hotspot with a defect risk index of <strong className="text-slate-200 font-mono">{(getAiRiskBrief().riskScore).toFixed(0)}/100</strong> ({getAiRiskBrief().riskLevel}).
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Primary Defect Drivers:</span>
                            <p className="text-xs font-mono font-bold text-purple-300 truncate">{getAiRiskBrief().drivers}</p>
                          </div>
                          <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Associated Rules Mapped:</span>
                            <p className="text-xs font-mono font-bold text-slate-300">{getAiRiskBrief().rulesCount} rules trigger module defects</p>
                          </div>
                        </div>

                        <div className="p-3 bg-purple-950/20 border border-purple-900/30 rounded-xl text-xs text-purple-300 flex items-center gap-2">
                          <Info size={16} className="text-amber-400 flex-shrink-0" />
                          <span>{getAiRiskBrief().deltaText}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-500">
                        {getAiRiskBrief().briefText}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-amber-500/10 flex justify-between items-center text-xs text-slate-500">
                    <span>Generated from FP-Growth Association Mining</span>
                    <button
                      onClick={() => setActiveTab('risks')}
                      className="text-amber-400 hover:text-purple-300 font-bold flex items-center gap-1 transition"
                    >
                      <span>Drilldown Explainer</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>

                {/* Risk Distribution Chart Widget */}
                <div className="lg:col-span-1 bg-[#111] border border-amber-500/20 p-6 rounded-xl h-[350px] flex flex-col">
                  <h3 className="text-base font-bold text-white mb-4">Risk Severity Index</h3>
                  <div className="flex-1 w-full text-xs">
                    {risks.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-slate-500">
                        No scan telemetry loaded.
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <ReChartsBarChart
                          data={[
                            { level: 'CRITICAL', count: risks.filter(r => r.riskLevel === 'CRITICAL').length, fill: '#ef4444' },
                            { level: 'HIGH', count: risks.filter(r => r.riskLevel === 'HIGH').length, fill: '#f97316' },
                            { level: 'MEDIUM', count: risks.filter(r => r.riskLevel === 'MEDIUM').length, fill: '#eab308' },
                            { level: 'LOW', count: risks.filter(r => r.riskLevel === 'LOW').length, fill: '#3b82f6' },
                          ]}
                          margin={{ top: 20, right: 10, left: -20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                          <XAxis dataKey="level" stroke="#94a3b8" />
                          <YAxis stroke="#94a3b8" />
                          <ReChartsTooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                            itemStyle={{ color: '#e2e8f0' }}
                            labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                          />
                          <ReChartsBar dataKey="count" radius={[4, 4, 0, 0]}>
                            {
                              [
                                { level: 'CRITICAL', fill: '#ef4444' },
                                { level: 'HIGH', fill: '#f97316' },
                                { level: 'MEDIUM', fill: '#eab308' },
                                { level: 'LOW', fill: '#3b82f6' }
                              ].map((entry, index) => (
                                <ReChartsCell key={`cell-${index}`} fill={entry.fill} />
                              ))
                            }
                          </ReChartsBar>
                        </ReChartsBarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

              </div>

              {/* Bottom Section: Top 5 Highest Risk Hotspots Table */}
              <div className="bg-[#111] border border-amber-500/20 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-amber-500/20 flex justify-between items-center">
                  <div>
                    <h3 className="text-base font-bold text-white m-0">Telemetry Risk Rankings</h3>
                    <p className="text-xs text-slate-500 mt-1">Overview of highest scoring defect hotspots</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('risks')}
                    className="px-3 py-1.5 bg-[#0A0A0A] border border-amber-500/10 hover:bg-[#111] rounded-lg text-xs font-bold text-slate-300 transition"
                  >
                    View All Rankings
                  </button>
                </div>

                {loadingRisks ? (
                  <div className="py-12 flex items-center justify-center text-slate-500 gap-2">
                    <RefreshCw className="animate-spin" size={16} />
                    <span>Analyzing code modules...</span>
                  </div>
                ) : risks.length === 0 ? (
                  <div className="py-12 text-center text-slate-650 font-medium">
                    No modules scanned. Click "Trigger Custom Scan" or upload a dataset to begin.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0A0A0A]/60 border-b border-amber-500/10 text-slate-400 font-bold uppercase tracking-wider">
                          <th className="py-4 px-6">Rank</th>
                          <th className="py-4 px-6">Module Path</th>
                          <th className="py-4 px-6">Severity Grade</th>
                          <th className="py-4 px-6">Defect Risk Index</th>
                          <th className="py-4 px-6">Primary Driver Outcomes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850/30 text-slate-300 font-mono">
                        {risks.slice(0, 5).map((r, i) => (
                          <tr key={r.id || i} className="hover:bg-[#111]/20 transition">
                            <td className="py-4 px-6 font-bold text-amber-400">#{i + 1}</td>
                            <td className="py-4 px-6 font-semibold text-slate-200 hover:text-amber-400 cursor-pointer" onClick={() => fetchExplainability(r.module)}>{r.module}</td>
                            <td className="py-4 px-6">
                              <span className={`px-2 py-0.5 rounded font-extrabold text-[9px] border ${
                                r.riskLevel === 'CRITICAL'
                                  ? 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                                  : r.riskLevel === 'HIGH'
                                  ? 'bg-orange-500/10 text-orange-450 border-orange-500/20'
                                  : r.riskLevel === 'MEDIUM'
                                  ? 'bg-amber-500/10 text-amber-450 border-amber-500/20'
                                  : 'bg-amber-500/10 text-blue-450 border-amber-500/20'
                              }`}>
                                {r.riskLevel}
                              </span>
                            </td>
                            <td className="py-4 px-6 font-bold text-white">{(r.riskScore).toFixed(1)}%</td>
                            <td className="py-4 px-6 text-slate-450 text-[10px] truncate max-w-xs font-sans uppercase tracking-wide" title={getMinedOutcomeDrivers(r.topRulesSummary)}>
                              {getMinedOutcomeDrivers(r.topRulesSummary)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 2: Mined Rules Database (Filtered view) */}
          {activeTab === 'rules' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight m-0">Mined Association Rules Database</h2>
                  <p className="text-sm text-slate-400 mt-1">Multi-parameter searching and filtering of association outcomes</p>
                </div>
                {rules.length > 0 && (
                  <button
                    onClick={handleDownloadRules}
                    className="px-4 py-2 bg-[#111] border border-amber-500/20 text-slate-350 hover:text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                  >
                    <Download size={14} />
                    <span>Download Rules CSV</span>
                  </button>
                )}
              </div>

              {/* Query filter configurations */}
              <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-3">Filter Search Parameters</span>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                  <div className="md:col-span-2 relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                      <Search size={14} />
                    </span>
                    <input
                      type="text"
                      placeholder="Module Name (e.g. auth)"
                      value={rulesSearch}
                      onChange={(e) => { setRulesSearch(e.target.value); setRulesPage(0); }}
                      className="block w-full pl-9 pr-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                  </div>

                  <div>
                    <select
                      value={rulesSeverity}
                      onChange={(e) => { setRulesSeverity(e.target.value); setRulesPage(0); }}
                      className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none"
                    >
                      <option value="">Outcome Severity</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>

                  <div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Min Support"
                      value={rulesMinSupport}
                      onChange={(e) => { setRulesMinSupport(e.target.value); setRulesPage(0); }}
                      className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      step="0.05"
                      placeholder="Min Confidence"
                      value={rulesMinConfidence}
                      onChange={(e) => { setRulesMinConfidence(e.target.value); setRulesPage(0); }}
                      className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                  </div>

                  <div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="Min Lift"
                      value={rulesMinLift}
                      onChange={(e) => { setRulesMinLift(e.target.value); setRulesPage(0); }}
                      className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white placeholder-slate-650 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-amber-500/10/40 text-[10px] text-slate-500 font-mono">
                  <div className="flex gap-4">
                    <span>Sort metric: 
                      <button onClick={() => setRulesSortBy('lift')} className={`ml-1 font-bold ${rulesSortBy === 'lift' ? 'text-amber-400 underline' : ''}`}>Lift</button> / 
                      <button onClick={() => setRulesSortBy('confidence')} className={`ml-1 font-bold ${rulesSortBy === 'confidence' ? 'text-amber-400 underline' : ''}`}>Confidence</button> / 
                      <button onClick={() => setRulesSortBy('support')} className={`ml-1 font-bold ${rulesSortBy === 'support' ? 'text-amber-400 underline' : ''}`}>Support</button>
                    </span>
                    <span>Order: 
                      <button onClick={() => setRulesSortDesc(true)} className={`ml-1 font-bold ${rulesSortDesc ? 'text-amber-400 underline' : ''}`}>Descending</button> / 
                      <button onClick={() => setRulesSortDesc(false)} className={`ml-1 font-bold ${!rulesSortDesc ? 'text-amber-400 underline' : ''}`}>Ascending</button>
                    </span>
                  </div>
                  
                  <button
                    onClick={() => {
                      setRulesSearch('');
                      setRulesSeverity('');
                      setRulesMinSupport('');
                      setRulesMinConfidence('');
                      setRulesMinLift('');
                      setRulesPage(0);
                    }}
                    className="text-slate-400 hover:text-white font-bold"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-[#111] border border-amber-500/20 rounded-xl overflow-hidden">
                {loadingRules ? (
                  <div className="py-24 flex items-center justify-center text-slate-500 gap-2">
                    <RefreshCw className="animate-spin" size={18} />
                    <span>Loading association database...</span>
                  </div>
                ) : rules.length === 0 ? (
                  <div className="py-24 text-center text-slate-500">
                    No rules found matching query criteria. Expand thresholds.
                  </div>
                ) : (
                  <div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#0A0A0A]/60 border-b border-amber-500/10 text-slate-400 font-bold uppercase tracking-wider">
                            <th className="py-4 px-6">ID</th>
                            <th className="py-4 px-6">Antecedent (Conditions)</th>
                            <th className="py-4 px-6">Consequent (Outcome)</th>
                            <th className="py-4 px-6">Support</th>
                            <th className="py-4 px-6">Confidence</th>
                            <th className="py-4 px-6">Lift Factor</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/30 text-slate-350 font-mono">
                          {getRuleClusters(rules).slice(rulesPage * 10, (rulesPage + 1) * 10).map((cluster, clusterIdx) => {
                            const rep = cluster.representative;
                            const isExpanded = !!expandedRules[cluster.id];
                            return (
                              <React.Fragment key={cluster.id}>
                                <tr className="hover:bg-[#111]/20 transition border-b border-amber-500/10/30">
                                  <td className="py-4 px-6 text-amber-400 font-bold">#{rulesPage * 10 + clusterIdx + 1}</td>
                                  <td className="py-4 px-6 font-semibold text-slate-200">
                                    <div className="flex items-center gap-2">
                                      <span className="truncate max-w-md">{rep.antecedent}</span>
                                      {cluster.collapsed.length > 0 && (
                                        <button
                                          onClick={() => setExpandedRules(prev => ({ ...prev, [cluster.id]: !prev[cluster.id] }))}
                                          className="px-2 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-purple-500/40 text-[9px] font-sans font-bold text-purple-300 transition-all flex items-center gap-1 active:scale-95"
                                        >
                                          <span>{cluster.collapsed.length} related collapsed</span>
                                          <span className="text-[7px]">{isExpanded ? '▲' : '▼'}</span>
                                        </button>
                                      )}
                                    </div>
                                  </td>
                                  <td className="py-4 px-6">
                                    <span className={`px-2 py-0.5 rounded font-extrabold text-[9px] border ${
                                      rep.consequent.includes('critical')
                                        ? 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                                        : rep.consequent.includes('high')
                                        ? 'bg-orange-500/10 text-orange-450 border-orange-500/20'
                                        : rep.consequent.includes('medium')
                                        ? 'bg-amber-500/10 text-amber-450 border-amber-500/20'
                                        : 'bg-amber-500/10 text-blue-450 border-amber-500/20'
                                    }`}>
                                      {rep.consequent.split('=')[1]?.toUpperCase() || rep.consequent}
                                    </span>
                                  </td>
                                  <td className="py-4 px-6">{rep.support.toFixed(4)}</td>
                                  <td className="py-4 px-6">{(rep.confidence * 100).toFixed(1)}%</td>
                                  <td className="py-4 px-6 text-purple-300 font-bold">{rep.lift.toFixed(2)}</td>
                                </tr>
                                {isExpanded && cluster.collapsed.map((child, childIdx) => (
                                  <tr key={childIdx} className="bg-purple-950/5 border-b border-amber-500/10/10 text-slate-400 font-mono transition-all">
                                    <td className="py-2.5 px-6 text-[10px] text-slate-500 text-right pr-8">↳</td>
                                    <td className="py-2.5 px-6 text-slate-350 italic truncate max-w-md">{child.antecedent}</td>
                                    <td className="py-2.5 px-6">
                                      <span className="text-[9px] text-slate-500">{child.consequent.split('=')[1] || child.consequent}</span>
                                    </td>
                                    <td className="py-2.5 px-6 text-[10px]">{child.support.toFixed(4)}</td>
                                    <td className="py-2.5 px-6 text-[10px]">{(child.confidence * 100).toFixed(1)}%</td>
                                    <td className="py-2.5 px-6 text-[10px] text-amber-400/80">{child.lift.toFixed(2)}</td>
                                  </tr>
                                ))}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    {rulesTotalPages > 1 && (
                      <div className="p-4 bg-[#0A0A0A]/60 border-t border-amber-500/10 flex items-center justify-between">
                        <span className="text-[10px] text-slate-500 font-mono">Page {rulesPage + 1} of {rulesTotalPages}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setRulesPage(prev => Math.max(0, prev - 1))}
                            disabled={rulesPage === 0}
                            className="p-1.5 bg-[#111] border border-amber-500/20 disabled:opacity-40 text-slate-400 hover:text-white rounded-lg transition"
                          >
                            <ChevronLeft size={16} />
                          </button>
                          <button
                            onClick={() => setRulesPage(prev => Math.min(rulesTotalPages - 1, prev + 1))}
                            disabled={rulesPage === rulesTotalPages - 1}
                            className="p-1.5 bg-[#111] border border-amber-500/20 disabled:opacity-40 text-slate-400 hover:text-white rounded-lg transition"
                          >
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 3: System Graph Explorer */}
          {activeTab === 'graph' && (
            <div className="space-y-8 h-[calc(100vh-180px)] flex flex-col">
              <div className="flex-shrink-0">
                <h2 className="text-2xl font-bold text-white tracking-tight m-0">Interactive System Graph Explorer</h2>
                <p className="text-sm text-slate-400 mt-1">Force-weighted layout mapping connections between codebase modules, languages, tech stacks, and outcome severities</p>
              </div>

              <div className="flex-1 bg-[#111] border border-amber-500/20 rounded-xl overflow-hidden relative min-h-[400px]">
                {rules.length === 0 ? (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                    Run pipeline analysis to populate graph nodes.
                  </div>
                ) : (
                  <ReactFlow
                    nodes={flowData.nodes}
                    edges={flowData.edges}
                    onNodeClick={(event, node) => setSelectedGraphNode(node)}
                    onPaneClick={() => setSelectedGraphNode(null)}
                    fitView
                    className="bg-[#0b0f19]/30"
                  >
                    <Background color="#334155" gap={16} size={1} />
                    <Controls className="bg-[#111] border border-amber-500/20 text-slate-200 fill-slate-200" />
                    <MiniMap
                      nodeStrokeColor={(n) => '#475569'}
                      nodeColor={(n) => n.style?.background || '#1e293b'}
                      className="bg-[#111] border border-amber-500/10 rounded-xl"
                      maskColor="rgba(15, 23, 42, 0.6)"
                    />
                  </ReactFlow>
                )}

                {/* Selected Node Details Side Panel */}
                {selectedGraphNode && (() => {
                  const nodeId = selectedGraphNode.id;
                  const label = selectedGraphNode.data.label;
                  const type = selectedGraphNode.data.type;
                  
                  // Filter rules associated with this node
                  const relatedRules = rules.filter(rule => {
                    const antecedents = rule.antecedent.split(',').map(s => s.trim());
                    const consequent = rule.consequent.trim();
                    return antecedents.includes(nodeId) || consequent === nodeId;
                  });

                  // Format type label
                  const typeLabel = 
                    type === 'module' ? 'Module Context' :
                    type === 'subsystem' ? 'Subsystem' :
                    type === 'language' ? 'Programming Language' :
                    type === 'tech_stack' ? 'Tech Stack' :
                    type === 'bug_type' ? 'Bug Type' : 'Defect Severity Outcome';

                  // Calculate outcome distribution
                  const outcomeCounts = {};
                  relatedRules.forEach(rule => {
                    const consVal = rule.consequent.split('=')[1]?.toUpperCase() || 'UNKNOWN';
                    outcomeCounts[consVal] = (outcomeCounts[consVal] || 0) + 1;
                  });

                  return (
                    <div className="absolute top-4 right-4 bottom-4 w-80 z-10 bg-[#0A0A0A]/95 border border-amber-500/10 p-4 rounded-xl flex flex-col shadow-2xl backdrop-blur-md overflow-hidden animate-slide-in font-sans">
                      <div className="flex justify-between items-start border-b border-amber-500/20 pb-3 mb-3">
                        <div>
                          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block">{typeLabel}</span>
                          <h4 className="text-sm font-bold text-white font-mono mt-0.5">{label}</h4>
                        </div>
                        <button 
                          onClick={() => setSelectedGraphNode(null)}
                          className="p-1 rounded bg-[#111] border border-amber-500/10 hover:border-amber-500/30 transition text-slate-400 hover:text-white"
                        >
                          <X size={14} />
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin text-[11px]">
                        <div className="p-3 bg-[#111] border border-amber-500/10 rounded-lg space-y-1.5">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Total Related Rules:</span>
                            <span className="font-bold text-white font-mono">{relatedRules.length}</span>
                          </div>
                          {type !== 'severity' && (
                            <div className="space-y-1">
                              <span className="text-slate-450 block text-[9px] font-bold uppercase tracking-wider mt-1">Outcome Distribution:</span>
                              {Object.keys(outcomeCounts).length === 0 ? (
                                <span className="text-slate-500">None detected</span>
                              ) : (
                                <div className="flex flex-wrap gap-1 mt-0.5">
                                  {Object.entries(outcomeCounts).map(([outcome, count]) => (
                                    <span 
                                      key={outcome} 
                                      className={`px-1.5 py-0.5 rounded text-[9px] font-extrabold border ${
                                        outcome === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                                        outcome === 'HIGH' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
                                        outcome === 'MEDIUM' ? 'bg-amber-500/10 text-amber-450 border-amber-500/20' :
                                        'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                      }`}
                                    >
                                      {outcome}: {count}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <span className="font-bold text-slate-400 uppercase tracking-wider block text-[9px]">Associated Mined Rules</span>
                          {relatedRules.length === 0 ? (
                            <div className="text-slate-500 py-6 text-center">No rules found containing this factor.</div>
                          ) : (
                            <div className="space-y-2">
                              {relatedRules.slice(0, 15).map((rule, idx) => {
                                const antecedentsClean = rule.antecedent
                                  .split(',')
                                  .map(a => a.split('=')[1] || a)
                                  .join(' + ');
                                const outcomeClean = rule.consequent.split('=')[1]?.toUpperCase() || 'UNKNOWN';

                                return (
                                  <div key={idx} className="p-2.5 bg-[#111] border border-amber-500/10 hover:border-amber-500/20 rounded-lg transition space-y-2">
                                    <div className="text-slate-300 font-mono leading-tight">
                                      <span className="text-amber-400 font-bold">{antecedentsClean}</span>
                                      <span className="text-slate-400 mx-1">→</span>
                                      <span className={
                                        outcomeClean === 'CRITICAL' ? 'text-rose-400 font-bold' :
                                        outcomeClean === 'HIGH' ? 'text-orange-400 font-bold' :
                                        outcomeClean === 'MEDIUM' ? 'text-amber-400 font-bold' : 'text-amber-400 font-bold'
                                      }>{outcomeClean}</span>
                                    </div>
                                    <div className="flex gap-2.5 text-[9px] font-mono text-slate-450 border-t border-amber-500/10/30 pt-1.5">
                                      <span>Sup: <strong className="text-slate-300 font-normal">{(rule.support * 100).toFixed(0)}%</strong></span>
                                      <span>Conf: <strong className="text-slate-300 font-normal">{(rule.confidence * 100).toFixed(0)}%</strong></span>
                                      <span>Lift: <strong className="text-slate-300 font-normal">{rule.lift.toFixed(2)}</strong></span>
                                    </div>
                                  </div>
                                );
                              })}
                              {relatedRules.length > 15 && (
                                <div className="text-center text-[9px] text-slate-500 pt-1">
                                  Showing top 15 of {relatedRules.length} rules
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Graph Legend Panel */}
                <div className="absolute bottom-4 left-4 z-10 bg-[#0A0A0A]/90 border border-amber-500/10 p-4 rounded-xl text-[10px] space-y-2 max-w-xs shadow-2xl backdrop-blur-md">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Node Classifications</span>
                  <div className="grid grid-cols-2 gap-2 text-slate-350">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#3b0764] border border-[#9333ea]"></span>
                      <span>Module Context</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#0f172a] border border-[#2563eb]"></span>
                      <span>Subsystem</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#1c1917] border border-[#d97706]"></span>
                      <span>Programming Language</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#042f2e] border border-[#0d9488]"></span>
                      <span>Tech Stack</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#7c2d12] border border-[#ea580c]"></span>
                      <span>Bug Type</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-[#881337] border border-[#e11d48]"></span>
                      <span>Defect Severity Outcome</span>
                    </div>
                  </div>
                  <div className="text-[9px] text-slate-500 leading-normal border-t border-slate-900 pt-2 font-medium">
                    Edge thickness maps rules' lift factors. Animated pathways reflect strong lift (&gt; 1.3).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Module Risks Explorer */}
          {activeTab === 'risks' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight m-0">Module Defect Hotspots Analyzer</h2>
                <p className="text-sm text-slate-400 mt-1">Drilldown outcome explanations for target codebase modules</p>
              </div>

              {risks.length === 0 ? (
                <div className="bg-[#111] border border-amber-500/20 p-24 rounded-xl text-center text-slate-500">
                  No telemetry risk analysis computed. Generate scan rules to review hotspots.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left: Module list selection */}
                  <div className="lg:col-span-1 bg-[#111] border border-amber-500/20 p-5 rounded-xl space-y-4">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Telemetry Module Indexes</span>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                      {risks.map((r) => (
                        <button
                          key={r.id || r.module}
                          onClick={() => setSelectedModule(r)}
                          className={`w-full text-left p-3.5 border rounded-xl flex items-center justify-between transition ${
                            selectedModule?.module === r.module
                              ? 'bg-purple-950/20 border-purple-550'
                              : 'bg-[#0A0A0A]/60 border-amber-500/10 hover:border-amber-500/30'
                          }`}
                        >
                          <div>
                            <p className="text-xs font-mono font-bold text-slate-200 hover:text-purple-450 cursor-pointer" onClick={() => fetchExplainability(r.module)}>{r.module}</p>
                            <span className="text-[9px] text-slate-500 uppercase font-semibold">Score: {(r.riskScore).toFixed(0)}/100</span>
                          </div>
                          
                          <span className={`px-2 py-0.5 rounded font-extrabold text-[8px] border ${
                            r.riskLevel === 'CRITICAL'
                              ? 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                              : r.riskLevel === 'HIGH'
                              ? 'bg-orange-500/10 text-orange-450 border-orange-500/20'
                              : r.riskLevel === 'MEDIUM'
                              ? 'bg-amber-500/10 text-amber-450 border-amber-500/20'
                              : 'bg-amber-500/10 text-blue-450 border-amber-500/20'
                          }`}>
                            {r.riskLevel}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right: Selected module details & explaining rules */}
                  <div className="lg:col-span-2 space-y-6">
                    {selectedModule ? (
                      <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl space-y-6">
                        <div className="flex justify-between items-center border-b border-amber-500/20 pb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white font-mono">{selectedModule.module}</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Defect hotspot drilldown logs</p>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded font-extrabold text-xs border ${
                            selectedModule.riskLevel === 'CRITICAL'
                              ? 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                              : selectedModule.riskLevel === 'HIGH'
                              ? 'bg-orange-500/10 text-orange-450 border-orange-500/20'
                              : selectedModule.riskLevel === 'MEDIUM'
                              ? 'bg-amber-500/10 text-amber-450 border-amber-500/20'
                              : 'bg-amber-500/10 text-blue-450 border-amber-500/20'
                          }`}>
                            {selectedModule.riskLevel}
                          </span>
                        </div>

                        {/* Summary panel */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                          <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-1 relative group">
                            <div className="flex items-center justify-center gap-1">
                              <span className="text-[10px] text-slate-500 uppercase font-semibold">Defect Risk Index</span>
                              <button 
                                onClick={() => setShowFormulaInfo(true)}
                                className="text-slate-500 hover:text-amber-400 transition active:scale-95 cursor-help"
                                title="Show Methodology Formulas"
                              >
                                <Info size={11} />
                              </button>
                            </div>
                            <p className="text-2xl font-mono font-extrabold text-white">{(selectedModule.riskScore).toFixed(1)}%</p>
                          </div>
                          <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-1">
                            <span className="text-[10px] text-slate-500 uppercase font-semibold">Risk Level</span>
                            <p className={`text-xl font-bold ${
                              selectedModule.riskLevel === 'CRITICAL' || selectedModule.riskLevel === 'HIGH'
                                ? 'text-rose-450'
                                : 'text-amber-500'
                            }`}>{selectedModule.riskLevel}</p>
                          </div>
                          <div className="p-4 bg-slate-955 border border-slate-900 rounded-xl space-y-1 hover:border-amber-500/20 transition">
                            <span className="text-[10px] text-slate-500 uppercase font-semibold">Mined Outcome Drivers</span>
                            <p 
                              className="text-sm font-bold text-purple-300 truncate mt-1.5 uppercase tracking-wide cursor-help"
                              title={getMinedOutcomeDrivers(selectedModule.topRulesSummary)}
                            >
                              {getMinedOutcomeDrivers(selectedModule.topRulesSummary)}
                            </p>
                          </div>
                        </div>

                        {/* Contributing Association Rules */}
                        <div className="space-y-3">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Contributing Association Rules:</span>
                          
                          <div className="space-y-3">
                            {(() => {
                              try {
                                const contributingRules = JSON.parse(selectedModule.topRulesSummary);
                                if (contributingRules.length === 0) {
                                  return <div className="py-6 text-center text-slate-650 font-medium">No active rules mapping module defects.</div>;
                                }
                                const clusters = getRuleClusters(contributingRules);
                                return clusters.map((cluster, idx) => {
                                  const rep = cluster.representative;
                                  const isExpanded = !!expandedRules[cluster.id];
                                  return (
                                    <div
                                      key={cluster.id}
                                      className="p-4 bg-slate-955 border border-slate-900 rounded-xl space-y-2 hover:border-amber-500/20 transition"
                                    >
                                      <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2">
                                          <span className="font-semibold text-slate-200">Rule Driver #{idx + 1}</span>
                                          {cluster.collapsed.length > 0 && (
                                            <button
                                              onClick={() => setExpandedRules(prev => ({ ...prev, [cluster.id]: !prev[cluster.id] }))}
                                              className="px-2 py-0.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 hover:border-purple-500/40 text-[8px] font-sans font-bold text-purple-300 transition flex items-center gap-0.5 active:scale-95"
                                            >
                                              <span>{cluster.collapsed.length} collapsed</span>
                                              <span>{isExpanded ? '▲' : '▼'}</span>
                                            </button>
                                          )}
                                        </div>
                                        <span className="text-slate-500 font-mono text-[9px]">LIFT: <strong className="text-amber-400">{rep.lift.toFixed(2)}</strong></span>
                                      </div>
                                      <div className="bg-[#0A0A0A] p-2.5 rounded-lg border border-slate-900 text-xs font-mono flex items-center justify-between text-slate-400 gap-4">
                                        <span className="truncate">{rep.antecedent}</span>
                                        <span className="text-amber-400 font-bold">➔</span>
                                        <span className="text-rose-400 font-bold whitespace-nowrap">{rep.consequent}</span>
                                      </div>
                                      <div className="flex gap-4 text-[9px] font-mono text-slate-550">
                                        <div>Support: <strong className="text-slate-400">{rep.support.toFixed(4)}</strong></div>
                                        <div>Confidence: <strong className="text-slate-400">{(rep.confidence * 100).toFixed(1)}%</strong></div>
                                      </div>

                                      {isExpanded && (
                                        <div className="mt-3 pt-3 border-t border-slate-900 space-y-2 text-[10px] font-mono text-slate-450">
                                          {cluster.collapsed.map((child, cIdx) => (
                                            <div key={cIdx} className="bg-[#0A0A0A]/60 p-2 rounded-lg border border-slate-900/40 flex flex-col gap-1.5 pl-3 border-l-2 border-l-purple-500">
                                              <div className="flex justify-between items-center text-[9px] text-slate-500">
                                                <span>Rule variant #{cIdx + 1}</span>
                                                <span>LIFT: {child.lift.toFixed(2)}</span>
                                              </div>
                                              <div className="flex items-center justify-between gap-2">
                                                <span className="truncate italic text-slate-350">{child.antecedent}</span>
                                                <span className="text-amber-400">➔</span>
                                                <span className="text-rose-500/80">{child.consequent.split('=')[1] || child.consequent}</span>
                                              </div>
                                              <div className="flex gap-3 text-[8px] text-slate-500">
                                                <div>Support: {child.support.toFixed(4)}</div>
                                                <div>Confidence: {(child.confidence * 100).toFixed(1)}%</div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  );
                                });
                              } catch (e) {
                                return <div className="text-rose-400 text-xs">Failed to parse contributing rules parameters.</div>;
                              }
                            })()}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-24 text-center text-slate-500">
                        Select a module to view detail explainability metrics.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 5: Real Pipeline Streaming Scan Panel */}
          {activeTab === 'pipeline' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight m-0">SSE Defect Mining pipeline</h2>
                <p className="text-sm text-slate-400 mt-1">Upload CSV datasets, validate schemas, and run SSE real-time streamed analytics mining</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Dataset Upload Zone & Parameters */}
                <div className="lg:col-span-1 space-y-6">
                  {/* File Uploader */}
                  <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl space-y-4">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Upload size={18} className="text-amber-400" />
                      <span>Dataset Ingestion</span>
                    </h3>

                    {/* Sample CSV Download */}
                    <button
                      onClick={handleDownloadSampleCsv}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-[#0A0A0A] border border-amber-500/20 hover:border-purple-500/50 text-slate-400 hover:text-purple-300 rounded-lg text-xs font-semibold transition"
                    >
                      <Download size={12} />
                      <span>Download Sample CSV Template</span>
                    </button>

                    {/* Drag and drop input */}
                    <div
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-amber-500/20 hover:border-purple-650 transition rounded-xl p-8 text-center cursor-pointer space-y-2 bg-[#0A0A0A]/20"
                    >
                      <input
                        type="file"
                        accept=".csv,.json"
                        onChange={handleFileSelect}
                        ref={fileInputRef}
                        className="hidden"
                      />
                      <Upload size={28} className="text-slate-500 mx-auto" />
                      <p className="text-xs text-slate-400">Drag & drop CSV/JSON file here, or <span className="text-amber-400 font-bold">Browse</span></p>
                      <p className="text-[10px] text-slate-600">Required fields: module, subsystem, language, tech_stack, bug_type, severity</p>
                    </div>

                    {uploadFile && (
                      <div className="p-3 bg-[#0A0A0A] border border-amber-500/10 rounded-xl flex items-center justify-between text-xs gap-3">
                        <div className="truncate flex-1">
                          <p className="font-semibold text-slate-300 truncate">{uploadFile.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{(uploadFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button
                          onClick={handleUpload}
                          disabled={uploading}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-purple-700 text-white font-bold rounded-lg transition disabled:opacity-40"
                        >
                          {uploading ? 'Validating...' : 'Upload'}
                        </button>
                      </div>
                    )}

                    {uploadResult && (
                      <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-2 text-[10px] font-mono">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-900 text-xs">
                          <span className="text-slate-500 font-bold uppercase">Ingestion Status:</span>
                          <span className={`font-bold px-2 py-0.5 rounded ${
                            uploadResult.validation_status === 'valid'
                              ? 'bg-amber-500/10 text-amber-450'
                              : 'bg-rose-500/10 text-rose-450'
                          }`}>
                            {uploadResult.validation_status.toUpperCase()}
                          </span>
                        </div>

                        {uploadResult.errors && uploadResult.errors.length > 0 && (
                          <div className="text-rose-400 space-y-1">
                            {uploadResult.errors.map((e, i) => <p key={i}>• {e}</p>)}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-slate-400 pt-1">
                          <div>Total Rows: <strong className="text-slate-300">{uploadResult.total_rows}</strong></div>
                          <div>Cols: <strong className="text-slate-300">{uploadResult.columns?.length}</strong></div>
                        </div>

                        {uploadResult.preview && uploadResult.preview.length > 0 && (
                          <div className="space-y-1 pt-2 border-t border-slate-900">
                            <span className="text-slate-500 font-bold block mb-1">DATASET PREVIEW:</span>
                            <div className="max-h-24 overflow-y-auto space-y-1.5 scrollbar-thin text-[9px] text-slate-500 pr-1">
                              {uploadResult.preview.map((row, i) => (
                                <div key={i} className="flex justify-between border-b border-slate-900/40 pb-1">
                                  <span className="text-slate-350">{row.module}</span>
                                  <span className="text-slate-400">{row.language}</span>
                                  <span className="text-rose-400">{row.severity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Scan Tuning Parameters */}
                  <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                    <h3 className="text-base font-bold text-white mb-4">Pipeline Tuning</h3>
                    
                    <form onSubmit={handleRunStreamScan} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">Data Ingest source</label>
                        <select
                          value={dataSource}
                          onChange={(e) => setDataSource(e.target.value)}
                          className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-white focus:outline-none"
                        >
                          <option value="synthetic">Generated Synthetic Dataset</option>
                          {uploadResult && uploadResult.validation_status === 'valid' && (
                            <option value="uploaded">Uploaded Custom Dataset</option>
                          )}
                        </select>
                      </div>

                      {dataSource === 'synthetic' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">Record count</label>
                            <input
                              type="number"
                              value={scanRows}
                              onChange={(e) => setScanRows(parseInt(e.target.value))}
                              className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-white focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">Data Seed</label>
                            <input
                              type="number"
                              value={scanSeed}
                              onChange={(e) => setScanSeed(parseInt(e.target.value))}
                              className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-white focus:outline-none"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1.5 uppercase">Defect Logic Mining algorithm</label>
                        <select
                          value={scanAlgorithm}
                          onChange={(e) => setScanAlgorithm(e.target.value)}
                          className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-white focus:outline-none"
                        >
                          <option value="fpgrowth">FP-Growth (Frequent Pattern Tree)</option>
                          <option value="apriori">Apriori (Combinatorial Generation)</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Support</label>
                          <input
                            type="number"
                            step="0.01"
                            value={scanSupport}
                            onChange={(e) => setScanSupport(parseFloat(e.target.value))}
                            className="block w-full px-2 py-1.5 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Confidence</label>
                          <input
                            type="number"
                            step="0.05"
                            value={scanConfidence}
                            onChange={(e) => setScanConfidence(parseFloat(e.target.value))}
                            className="block w-full px-2 py-1.5 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] font-bold text-slate-500 mb-1 uppercase">Min Lift</label>
                          <input
                            type="number"
                            step="0.1"
                            value={scanLift}
                            onChange={(e) => setScanLift(parseFloat(e.target.value))}
                            className="block w-full px-2 py-1.5 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {user.role === 'ADMIN' ? (
                        <button
                          type="submit"
                          disabled={scanning}
                          className="w-full mt-4 py-2.5 px-4 bg-amber-600 hover:bg-purple-700 disabled:bg-purple-800 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/10 active:scale-[0.98] transition flex items-center justify-center gap-2"
                        >
                          <Activity size={14} className={scanning ? 'animate-pulse' : ''} />
                          <span>{scanning ? 'Scan processing streaming...' : 'Run Stream Scan'}</span>
                        </button>
                      ) : (
                        <div className="p-3 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-slate-500 text-center font-bold">
                          Only Admin role can run scan executions.
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Pipeline visualizer progress panel */}
                <div className="lg:col-span-2 bg-[#111] border border-amber-500/20 p-6 rounded-xl flex flex-col justify-between min-h-[450px]">
                  <div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-amber-500/20/60 pb-4">
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2 m-0 font-sans">
                          {activePipelineView === 'profile' ? (
                            <>
                              <Database size={16} className="text-amber-400" />
                              <span>Dataset Intelligence Panel</span>
                            </>
                          ) : (
                            <>
                              <Cpu size={16} className="text-amber-400 animate-pulse" />
                              <span>Pipeline Execution Visualizer</span>
                            </>
                          )}
                        </h3>
                        <p className="text-[11px] text-slate-500 m-0 mt-1 font-sans">
                          {activePipelineView === 'profile' 
                            ? 'Deep analytical profile of your defect repository schema and distribution.'
                            : 'Real-time Server Sent Events streaming execution timeline logs.'}
                        </p>
                      </div>

                      <div className="bg-[#0A0A0A] p-1 rounded-xl border border-amber-500/10 flex items-center gap-1 self-start sm:self-auto font-sans">
                        <button
                          type="button"
                          onClick={() => setActivePipelineView('profile')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                            activePipelineView === 'profile'
                              ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-[#111]'
                          }`}
                        >
                          Dataset Profile
                        </button>
                        <button
                          type="button"
                          onClick={() => setActivePipelineView('visualizer')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                            activePipelineView === 'visualizer'
                              ? 'bg-amber-600 text-white shadow-lg shadow-purple-500/15'
                              : 'text-slate-400 hover:text-slate-200 hover:bg-[#111]'
                          }`}
                        >
                          <span>Live Visualizer</span>
                          {scanning && <RefreshCw size={11} className="animate-spin text-purple-350" />}
                        </button>
                      </div>
                    </div>

                    {activePipelineView === 'visualizer' ? (
                      <div className="space-y-6">
                        {/* Progress meter */}
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-amber-400 font-semibold uppercase">{sseStage || 'Idle / Awaiting connection'}</span>
                            <span className="text-slate-400 font-mono">{sseProgress}%</span>
                          </div>
                          <div className="w-full bg-[#0A0A0A] border border-amber-500/10 h-3 rounded-full overflow-hidden p-0.5">
                            <div
                              className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full transition-all duration-300"
                              style={{ width: `${sseProgress}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Real-time Streaming Logs Terminal */}
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Live execution streams:</span>
                          <div className="bg-slate-955 border border-slate-900 rounded-xl p-4 h-64 overflow-y-auto font-mono text-[10px] text-slate-450 space-y-1.5 scrollbar-thin">
                            {sseLogs.length > 0 ? (
                              sseLogs.map((logLine, idx) => (
                                <p key={idx} className={logLine.includes('[ERROR]') ? 'text-rose-400' : logLine.includes('COMPLETED') ? 'text-amber-450' : 'text-slate-350'}>
                                  {logLine}
                                </p>
                              ))
                            ) : (
                              <div className="h-full flex flex-col items-center justify-center text-center py-16 text-slate-500 gap-2">
                                <Activity size={24} className="text-slate-750" />
                                <span className="font-semibold">No active scan execution found</span>
                                <span className="text-[9px] max-w-[280px]">
                                  Configure scan parameters and click "Run Stream Scan" to start the pipeline and view logs.
                                </span>
                              </div>
                            )}
                            <div ref={logsEndRef}></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {loadingProfile ? (
                          <div className="py-24 flex flex-col items-center justify-center gap-2 text-slate-500">
                            <RefreshCw className="animate-spin" size={24} />
                            <span>Computing dataset intelligence metrics...</span>
                          </div>
                        ) : datasetProfile ? (
                          <div className="space-y-6">
                            
                            {/* Ingestion Header */}
                            <div className="flex justify-between items-center border-b border-amber-500/20 pb-3">
                              <div>
                                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider font-sans">Active Ingested Dataset Profile</span>
                                <h4 className="text-sm font-bold text-white mt-0.5 capitalize font-sans">
                                  {datasetProfile.profile_type} Data Baseline
                                </h4>
                              </div>
                              <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-extrabold border ${
                                datasetProfile.schema_status === 'healthy' 
                                  ? 'bg-amber-500/10 text-amber-450 border-amber-500/20' 
                                  : 'bg-rose-500/10 text-rose-450 border-rose-500/20'
                              }`}>
                                {datasetProfile.schema_status.toUpperCase()} SCHEMA
                              </span>
                            </div>

                            {/* Summary Metrics Cards */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center font-sans">
                              <div className="p-3 bg-[#0A0A0A]/60 border border-amber-500/10 rounded-xl space-y-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                                <span className="text-[9px] text-slate-500 uppercase font-bold">Total Ingest Rows</span>
                                <p className="text-xl font-mono font-extrabold text-white">{datasetProfile.rows}</p>
                              </div>
                              
                              <div className="p-3 bg-slate-955 border border-amber-500/10 rounded-xl space-y-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
                                <span className="text-[9px] text-slate-500 uppercase font-bold">Duplicate Rows</span>
                                <p className={`text-xl font-mono font-extrabold ${datasetProfile.duplicates > 0 ? 'text-amber-500' : 'text-slate-300'}`}>
                                  {datasetProfile.duplicates}
                                </p>
                              </div>
                              
                              <div className="p-3 bg-slate-955 border border-amber-500/10 rounded-xl space-y-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
                                <span className="text-[9px] text-slate-500 uppercase font-bold">Null/Empty Cells</span>
                                <p className={`text-xl font-mono font-extrabold ${datasetProfile.null_count > 0 ? 'text-rose-400' : 'text-slate-300'}`}>
                                  {datasetProfile.null_count}
                                </p>
                              </div>

                              <div className="p-3 bg-[#0A0A0A]/60 border border-amber-500/10 rounded-xl space-y-1 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
                                <span className="text-[9px] text-slate-500 uppercase font-bold">Quality Profile Score</span>
                                <p className="text-xl font-mono font-extrabold text-amber-450">{datasetProfile.quality_score}/100</p>
                              </div>
                            </div>

                            {/* Completeness & Quality Checks Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {/* Column completeness */}
                              <div className="space-y-3">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-sans">Column Completeness Rates:</span>
                                <div className="p-4 bg-[#0A0A0A]/50 border border-amber-500/10 rounded-xl space-y-3">
                                  {Object.entries(datasetProfile.completeness).map(([col, rate], idx) => (
                                    <div key={idx} className="space-y-1 text-xs">
                                      <div className="flex justify-between items-center text-[10px] font-mono">
                                        <span className="font-semibold text-slate-400">{col}</span>
                                        <span className="font-bold text-slate-300">{rate}%</span>
                                      </div>
                                      <div className="w-full h-1.5 bg-[#111] border border-amber-500/10 rounded-full overflow-hidden">
                                        <div 
                                          className={`h-full rounded-full ${rate === 100 ? 'bg-amber-600' : 'bg-amber-500'}`}
                                          style={{ width: `${rate}%` }}
                                        />
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Ingestion Sanity Verification Checks */}
                              <div className="space-y-3">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block font-sans">Ingest Sanity Verification:</span>
                                <div className="p-4 bg-[#0A0A0A]/50 border border-amber-500/10 rounded-xl space-y-2.5 text-xs text-slate-300 font-sans">
                                  <div className="flex items-center justify-between">
                                    <span>Schema Columns Check</span>
                                    <span className="font-bold font-mono text-amber-450 flex items-center gap-1">
                                      {datasetProfile.quality_checks.missing_columns.length === 0 ? 'PASS ✓' : 'FAIL ✗'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Duplicate Data Check</span>
                                    <span className={`font-bold font-mono flex items-center gap-1 ${datasetProfile.duplicates === 0 ? 'text-amber-450' : 'text-amber-500'}`}>
                                      {datasetProfile.duplicates === 0 ? 'PASS ✓' : `${datasetProfile.duplicates} DUPs ⚠`}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Data Cell Completeness</span>
                                    <span className={`font-bold font-mono flex items-center gap-1 ${datasetProfile.null_count === 0 ? 'text-amber-450' : 'text-rose-450'}`}>
                                      {datasetProfile.null_count === 0 ? 'PASS ✓' : 'WARN ⚠'}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span>Category Compliance Check</span>
                                    <span className="font-bold font-mono text-amber-450 flex items-center gap-1">
                                      {datasetProfile.quality_checks.unsupported_categories.length === 0 ? 'PASS ✓' : 'FAIL ✗'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Distributions Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-900">
                              
                              {/* Severity Distribution */}
                              <div>
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-sans">Severity Distribution Profile:</span>
                                <div className="h-36 font-mono text-[9px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <ReChartsBarChart
                                      data={Object.entries(datasetProfile.severity_distribution).map(([key, val]) => ({ name: key, count: val }))}
                                      margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                      <XAxis dataKey="name" stroke="#94a3b8" />
                                      <YAxis stroke="#94a3b8" />
                                      <ReChartsTooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                                      />
                                      <ReChartsBar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </ReChartsBarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>

                              {/* Bug Type Frequency */}
                              <div>
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2 font-sans">Defect Category Frequencies:</span>
                                <div className="h-36 font-mono text-[9px]">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <ReChartsBarChart
                                      data={Object.entries(datasetProfile.bug_type_frequency).map(([key, val]) => ({ name: key, count: val }))}
                                      margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
                                    >
                                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                      <XAxis dataKey="name" stroke="#94a3b8" />
                                      <YAxis stroke="#94a3b8" />
                                      <ReChartsTooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                        labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                                      />
                                      <ReChartsBar dataKey="count" fill="#ec4899" radius={[4, 4, 0, 0]} />
                                    </ReChartsBarChart>
                                  </ResponsiveContainer>
                                </div>
                              </div>

                            </div>
                          </div>
                        ) : (
                          <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                            <Activity size={36} className="text-slate-700 animate-pulse" />
                            <span>Failed to fetch dataset intelligence profile.</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-amber-500/10 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Info size={14} className="text-amber-500" />
                      <span>Data streamed incrementally via Server Sent Events</span>
                    </span>
                    <button
                      onClick={() => setSseLogs([])}
                      disabled={sseLogs.length === 0 || scanning}
                      className="text-slate-500 hover:text-slate-300 font-bold transition flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      <span>Clear logs</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Algorithm Playground */}
          {activeTab === 'playground' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight m-0">Algorithm Tuning Playground</h2>
                <p className="text-sm text-slate-400 mt-1">Benchmarking execution performance: FP-Growth vs Apriori frequent itemset generation</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Configuration side panel */}
                <div className="lg:col-span-1 bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                  <h3 className="text-base font-bold text-white mb-4">Benchmark Parameters</h3>
                  
                  <form onSubmit={handleRunPlayground} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Dataset source</label>
                      <select
                        value={playgroundDataSource}
                        onChange={(e) => setPlaygroundDataSource(e.target.value)}
                        className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none"
                      >
                        <option value="synthetic">Synthetic Generator</option>
                        {uploadResult && uploadResult.validation_status === 'valid' && (
                          <option value="uploaded">Uploaded Dataset</option>
                        )}
                      </select>
                    </div>

                    {playgroundDataSource === 'synthetic' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Dataset size</label>
                          <input
                            type="number"
                            value={playgroundRows}
                            onChange={(e) => setPlaygroundRows(parseInt(e.target.value))}
                            className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Random Seed</label>
                          <input
                            type="number"
                            value={playgroundSeed}
                            onChange={(e) => setPlaygroundSeed(parseInt(e.target.value))}
                            className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Min Support ({playgroundSupport})</label>
                      <input
                        type="range"
                        min="0.01"
                        max="0.2"
                        step="0.01"
                        value={playgroundSupport}
                        onChange={(e) => setPlaygroundSupport(parseFloat(e.target.value))}
                        className="w-full accent-purple-500 bg-[#0A0A0A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Min Confidence ({playgroundConfidence})</label>
                      <input
                        type="range"
                        min="0.1"
                        max="0.9"
                        step="0.05"
                        value={playgroundConfidence}
                        onChange={(e) => setPlaygroundConfidence(parseFloat(e.target.value))}
                        className="w-full accent-purple-500 bg-[#0A0A0A]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Min Lift ({playgroundLift})</label>
                      <input
                        type="number"
                        step="0.1"
                        value={playgroundLift}
                        onChange={(e) => setPlaygroundLift(parseFloat(e.target.value))}
                        className="block w-full px-3 py-2 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-white focus:outline-none"
                      />
                    </div>

                    {user.role === 'ADMIN' ? (
                      <button
                        type="submit"
                        disabled={comparing}
                        className="w-full mt-4 py-2.5 px-4 bg-amber-600 hover:bg-purple-700 disabled:bg-purple-800 text-white text-xs font-bold rounded-lg transition flex items-center justify-center gap-2"
                      >
                        <Cpu size={14} className={comparing ? 'animate-spin' : ''} />
                        <span>{comparing ? 'Benchmarking algorithms...' : 'Run Benchmarks'}</span>
                      </button>
                    ) : (
                      <div className="p-3 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-slate-500 text-center font-bold text-[10px]">
                        Only Admin role can run benchmark evaluations.
                      </div>
                    )}
                  </form>
                </div>

                {/* Dashboard visualization panel */}
                <div className="lg:col-span-2 space-y-6">
                  {playgroundResult ? (
                    <div className="space-y-6">
                      
                      {/* Metric cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between relative overflow-hidden group">
                          <span className="text-[10px] text-slate-550 uppercase font-bold tracking-wider">Speed Performance Winner</span>
                          <span className="text-xl font-bold text-white mt-1.5">
                            {playgroundResult.fpgrowth.total_time_ms < playgroundResult.apriori.total_time_ms ? 'FP-Growth' : 'Apriori / Equivalent'}
                          </span>
                          <span className="text-[10px] text-amber-450 font-bold mt-1">
                            {playgroundResult.fpgrowth.total_time_ms < playgroundResult.apriori.total_time_ms
                              ? `${(playgroundResult.apriori.total_time_ms / Math.max(playgroundResult.fpgrowth.total_time_ms, 1)).toFixed(1)}x faster execution`
                              : 'Similar performance delta'}
                          </span>
                        </div>

                        <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between relative overflow-hidden group">
                          <span className="text-[10px] text-slate-550 uppercase font-bold tracking-wider">FP-Growth Execution</span>
                          <span className="text-xl font-mono font-extrabold text-white mt-1.5">{playgroundResult.fpgrowth.total_time_ms} ms</span>
                          <span className="text-[10px] text-slate-500 mt-1">{playgroundResult.fpgrowth.rules_count} rules generated</span>
                        </div>

                        <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col justify-between relative overflow-hidden group">
                          <span className="text-[10px] text-slate-550 uppercase font-bold tracking-wider">Apriori Execution</span>
                          <span className="text-xl font-mono font-extrabold text-white mt-1.5">{playgroundResult.apriori.total_time_ms} ms</span>
                          <span className="text-[10px] text-slate-500 mt-1">{playgroundResult.apriori.rules_count} rules generated</span>
                        </div>
                      </div>

                      {/* Charts section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Runtime comparison chart */}
                        <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl h-[300px] flex flex-col">
                          <h4 className="text-xs font-bold text-slate-450 uppercase mb-4">Runtime Comparison (ms)</h4>
                          <div className="flex-1 w-full text-[10px] font-mono">
                            <ResponsiveContainer width="100%" height="100%">
                              <ReChartsBarChart
                                data={[
                                  { name: 'FP-Growth', Runtime: playgroundResult.fpgrowth.total_time_ms },
                                  { name: 'Apriori', Runtime: playgroundResult.apriori.total_time_ms }
                                ]}
                                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <ReChartsTooltip
                                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                  itemStyle={{ color: '#e2e8f0' }}
                                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                                />
                                <ReChartsBar dataKey="Runtime" radius={[4, 4, 0, 0]}>
                                  <ReChartsCell fill="#8b5cf6" />
                                  <ReChartsCell fill="#3b82f6" />
                                </ReChartsBar>
                              </ReChartsBarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        {/* Rules count comparison chart */}
                        <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl h-[300px] flex flex-col">
                          <h4 className="text-xs font-bold text-slate-450 uppercase mb-4">Rule Count Comparison</h4>
                          <div className="flex-1 w-full text-[10px] font-mono">
                            <ResponsiveContainer width="100%" height="100%">
                              <ReChartsBarChart
                                data={[
                                  { name: 'FP-Growth', Rules: playgroundResult.fpgrowth.rules_count },
                                  { name: 'Apriori', Rules: playgroundResult.apriori.rules_count }
                                ]}
                                margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
                              >
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <ReChartsTooltip
                                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                                  itemStyle={{ color: '#e2e8f0' }}
                                  labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                                />
                                <ReChartsBar dataKey="Rules" radius={[4, 4, 0, 0]}>
                                  <ReChartsCell fill="#a78bfa" />
                                  <ReChartsCell fill="#60a5fa" />
                                </ReChartsBar>
                              </ReChartsBarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>

                      {/* Performance insight text */}
                      <div className="p-3 bg-[#0A0A0A] border border-amber-500/10 rounded-lg text-xs text-slate-450 flex items-center gap-2">
                        <Info size={16} className="text-amber-400 flex-shrink-0" />
                        <span>
                          {playgroundResult.fpgrowth.total_time_ms < playgroundResult.apriori.total_time_ms
                            ? `FP-Growth is ${(playgroundResult.apriori.total_time_ms / Math.max(playgroundResult.fpgrowth.total_time_ms, 1)).toFixed(1)}x faster due to tree structure building vs Apriori combinatorial matrix loops.`
                            : 'Apriori and FP-Growth had similar runtimes due to small transactions size.'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#111] border border-amber-500/20 p-24 rounded-xl text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                      <Cpu size={36} className="text-slate-700 animate-pulse" />
                      <span>Benchmark algorithms side-by-side to review computational performance differences.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 7: Risk Time Machine */}
          {activeTab === 'timemachine' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight m-0">Risk Time Machine</h2>
                  <p className="text-sm text-slate-400 mt-1">Timeline logs of historical defect scans. Select and compare execution deltas.</p>
                </div>
                <button
                  onClick={fetchScanHistory}
                  disabled={loadingHistory}
                  className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-amber-500/20 rounded-lg text-sm text-slate-300 transition hover:bg-white/5"
                >
                  <RefreshCw size={14} className={loadingHistory ? 'animate-spin' : ''} />
                  <span>Sync Timeline</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Timeline Selection Box */}
                <div className="lg:col-span-1 bg-[#111] border border-amber-500/20 p-6 rounded-xl space-y-4">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Historical Scans</h3>
                  
                  {loadingHistory ? (
                    <div className="py-12 flex items-center justify-center text-slate-500 gap-2">
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Fetching scan records...</span>
                    </div>
                  ) : scanHistory.length === 0 ? (
                    <div className="py-12 text-center text-slate-650 font-medium">
                      No historical execution logs found.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {scanHistory.map((scan) => (
                        <div
                          key={scan.id}
                          className="p-3 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-2 hover:border-amber-500/30 transition"
                        >
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-mono font-bold text-amber-400">Scan #{scan.id}</span>
                            <span className="text-slate-500 font-mono text-[10px]">{new Date(scan.timestamp).toLocaleString()}</span>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono py-1.5 border-t border-b border-slate-900 text-slate-450">
                            <div>Rules: <strong className="text-slate-300">{scan.rulesCount}</strong></div>
                            <div>Src: <strong className="text-slate-350 capitalize">{scan.dataSource}</strong></div>
                            <div>Time: <strong className="text-slate-300">{scan.runtimeMs}ms</strong></div>
                          </div>

                          <div className="flex gap-2 text-[10px] pt-1">
                            <button
                              onClick={() => setCompareScanA(scan.id)}
                              className={`flex-1 py-1 rounded text-center font-semibold transition ${
                                compareScanA === scan.id ? 'bg-amber-600 text-white' : 'bg-[#111] hover:bg-slate-850 text-slate-450'
                              }`}
                            >
                              Scan A {compareScanA === scan.id && '✓'}
                            </button>
                            <button
                              onClick={() => setCompareScanB(scan.id)}
                              className={`flex-1 py-1 rounded text-center font-semibold transition ${
                                compareScanB === scan.id ? 'bg-amber-600 text-white' : 'bg-[#111] hover:bg-slate-850 text-slate-450'
                              }`}
                            >
                              Scan B {compareScanB === scan.id && '✓'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {compareScanA !== null && compareScanB !== null && (
                    <button
                      onClick={compareSelectedScans}
                      className="w-full py-2.5 px-4 bg-amber-600 text-white text-xs font-bold rounded-lg transition hover:bg-purple-700 flex items-center justify-center gap-1.5"
                    >
                      <Clock size={14} />
                      <span>Compare Selected Runs</span>
                    </button>
                  )}
                </div>

                {/* Compare outcomes results panel */}
                <div className="lg:col-span-2 bg-[#111] border border-amber-500/20 p-6 rounded-xl min-h-[450px]">
                  {compareResults ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">Compare Scan #{compareResults.scanA.id} ➔ Scan #{compareResults.scanB.id}</h3>
                          <p className="text-xs text-slate-500 mt-0.5">Performance & risk index delta metrics</p>
                        </div>
                      </div>

                      {/* Delta Dashboard */}
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">Runtime Delta</span>
                          <p className={`text-lg font-mono font-extrabold ${compareResults.runtimeDelta <= 0 ? 'text-amber-450' : 'text-rose-400'}`}>
                            {compareResults.runtimeDelta <= 0 ? '' : '+'}{compareResults.runtimeDelta} ms
                          </p>
                          <p className="text-[9px] text-slate-500 font-mono">
                            {compareResults.runtimeDelta <= 0
                              ? `(${Math.abs((compareResults.runtimeDelta / Math.max(compareResults.scanA.runtimeMs, 1)) * 100).toFixed(1)}% faster)`
                              : `(${((compareResults.runtimeDelta / Math.max(compareResults.scanA.runtimeMs, 1)) * 100).toFixed(1)}% slower)`}
                          </p>
                        </div>

                        <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-1">
                          <span className="text-[10px] text-slate-500 uppercase font-semibold">Mined Rules Delta</span>
                          <p className={`text-lg font-mono font-extrabold ${compareResults.rulesDelta >= 0 ? 'text-amber-450' : 'text-rose-450'}`}>
                            {compareResults.rulesDelta >= 0 ? '+' : ''}{compareResults.rulesDelta} rules
                          </p>
                          <p className="text-[9px] text-slate-500 font-mono">
                            {compareResults.scanA.rulesCount} ➔ {compareResults.scanB.rulesCount} active
                          </p>
                        </div>
                      </div>

                      {/* Hotspots delta comparison list */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                            <ShieldAlert size={14} />
                            <span>Risk Increased</span>
                          </span>
                          <div className="bg-[#0A0A0A] border border-amber-500/10 rounded-xl p-3 h-44 overflow-y-auto text-xs space-y-1 text-slate-350 scrollbar-thin">
                            {compareResults.riskIncreased.length === 0 ? (
                              <p className="text-slate-650 text-center py-12">No increased modules.</p>
                            ) : (
                              compareResults.riskIncreased.map((m, i) => <p key={i}>• {m}</p>)
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="text-[11px] font-bold text-amber-450 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 size={14} />
                            <span>Risk Decreased</span>
                          </span>
                          <div className="bg-[#0A0A0A] border border-amber-500/10 rounded-xl p-3 h-44 overflow-y-auto text-xs space-y-1 text-slate-350 scrollbar-thin">
                            {compareResults.riskDecreased.length === 0 ? (
                              <p className="text-slate-650 text-center py-12">No decreased modules.</p>
                            ) : (
                              compareResults.riskDecreased.map((m, i) => <p key={i}>• {m}</p>)
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                            <ArrowRight size={14} />
                            <span>New Hotspots</span>
                          </span>
                          <div className="bg-[#0A0A0A] border border-amber-500/10 rounded-xl p-3 h-44 overflow-y-auto text-xs space-y-1 text-slate-350 scrollbar-thin">
                            {compareResults.newHotspots.length === 0 ? (
                              <p className="text-slate-650 text-center py-12">No new hotspots.</p>
                            ) : (
                              compareResults.newHotspots.map((m, i) => <p key={i}>• {m}</p>)
                            )}
                          </div>
                        </div>
                      </div>

                      {/* New Mined Rules comparison details */}
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">New Association Rules Introduced (Scan B only):</span>
                        <div className="bg-slate-955 border border-slate-900 rounded-xl p-4 max-h-36 overflow-y-auto font-mono text-[10px] text-slate-400 space-y-1 scrollbar-thin">
                          {compareResults.newRules.length === 0 ? (
                            <p className="text-slate-600 text-center py-6">No new association rules introduced.</p>
                          ) : (
                            compareResults.newRules.map((rule, i) => <p key={i} className="text-amber-400">• {rule}</p>)
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="py-24 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                      <Clock size={36} className="text-slate-700 animate-pulse" />
                      <span>Select two scans from the timeline list and click "Compare Selected Runs" to calculate delta.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 9: ML Analytics Dashboard */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight m-0">ML Analytics Dashboard</h2>
                  <p className="text-sm text-slate-400 mt-1">Aggregated intelligence from FP-Growth mining engine — rule quality metrics, hotspot distribution, scan history trends</p>
                </div>
                <button
                  onClick={fetchAnalyticsSummary}
                  disabled={loadingAnalytics}
                  className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-amber-500/20 rounded-lg text-sm text-slate-300 transition hover:bg-white/5"
                >
                  <RefreshCw size={14} className={loadingAnalytics ? 'animate-spin' : ''} />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingAnalytics && !analyticsSummary ? (
                <div className="py-24 flex items-center justify-center text-slate-500 gap-2">
                  <RefreshCw className="animate-spin" size={20} />
                  <span>Loading analytics...</span>
                </div>
              ) : analyticsSummary ? (
                <div className="space-y-8">

                  {/* KPI Cards Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                    <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Mined Rules</span>
                      <span className="text-3xl font-mono font-extrabold text-white">{analyticsSummary.total_rules}</span>
                      <span className="text-[10px] text-amber-400 font-bold">Active in memory</span>
                    </div>

                    <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Lift Factor</span>
                      <span className="text-3xl font-mono font-extrabold text-indigo-300">{analyticsSummary.avg_lift.toFixed(2)}x</span>
                      <span className="text-[10px] text-slate-500">Max: {analyticsSummary.max_lift.toFixed(2)}x</span>
                    </div>

                    <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent pointer-events-none" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Avg Confidence</span>
                      <span className="text-3xl font-mono font-extrabold text-violet-300">{(analyticsSummary.avg_confidence * 100).toFixed(1)}%</span>
                      <span className="text-[10px] text-slate-500">Rule predictability</span>
                    </div>

                    <div className="bg-[#111] border border-amber-500/20 p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent pointer-events-none" />
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Top Hotspot Module</span>
                      <span className="text-2xl font-mono font-extrabold text-rose-300 truncate">{analyticsSummary.top_module || '—'}</span>
                      <span className="text-[10px] text-rose-500 font-bold">Score: {(analyticsSummary.top_module_risk_score).toFixed(0)}/100</span>
                    </div>
                  </div>

                  {/* Charts row: Rules by module + Severity distribution */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Rules by module bar chart */}
                    <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                      <h3 className="text-sm font-bold text-white mb-1">Rules Mined Per Module</h3>
                      <p className="text-[10px] text-slate-500 mb-4">Association rules fired per codebase module</p>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReChartsBarChart
                            data={Object.entries(analyticsSummary.rules_by_module || {}).map(([mod, count]) => ({ module: mod, Rules: count }))}
                            margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="module" stroke="#94a3b8" angle={-35} textAnchor="end" interval={0} tick={{ fontSize: 10 }} />
                            <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                            <ReChartsTooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                              itemStyle={{ color: '#e2e8f0' }}
                              labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                            />
                            <ReChartsBar dataKey="Rules" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                          </ReChartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Severity distribution bar chart */}
                    <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                      <h3 className="text-sm font-bold text-white mb-1">Severity Outcome Distribution</h3>
                      <p className="text-[10px] text-slate-500 mb-4">Rules grouped by consequent severity level</p>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <ReChartsBarChart
                            data={Object.entries(analyticsSummary.severity_distribution || {}).map(([sev, count]) => ({ severity: sev, Count: count }))}
                            margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="severity" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                            <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                            <ReChartsTooltip
                              contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                              itemStyle={{ color: '#e2e8f0' }}
                              labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                            />
                            <ReChartsBar dataKey="Count" radius={[4, 4, 0, 0]}>
                              {Object.keys(analyticsSummary.severity_distribution || {}).map((sev, i) => (
                                <ReChartsCell key={i} fill={
                                  sev === 'critical' ? '#ef4444' :
                                  sev === 'high' ? '#f97316' :
                                  sev === 'medium' ? '#eab308' : '#3b82f6'
                                } />
                              ))}
                            </ReChartsBar>
                          </ReChartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                  </div>

                  {/* Scan history trend charts */}
                  {scanHistory.length >= 2 && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                      {/* Rules count over time */}
                      <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                        <h3 className="text-sm font-bold text-white mb-1">Rules Mined — Scan History Trend</h3>
                        <p className="text-[10px] text-slate-500 mb-4">Rules count per historical scan execution</p>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <ReChartsLineChart
                              data={(() => {
                                const cleaned = getCleanedScanHistory(scanHistory);
                                const chronological = [...cleaned].reverse();
                                return chronological.map((s, index) => {
                                  let resultsObj = {};
                                  try {
                                    resultsObj = s.resultsJson ? JSON.parse(s.resultsJson) : {};
                                  } catch (e) {}
                                  
                                  const prev = index > 0 ? chronological[index - 1] : null;
                                  let prevResultsObj = {};
                                  if (prev) {
                                    try {
                                      prevResultsObj = prev.resultsJson ? JSON.parse(prev.resultsJson) : {};
                                    } catch (e) {}
                                  }
                                  
                                  return {
                                    scan: `#${s.id}`,
                                    scanId: `#${s.id}`,
                                    Rules: s.rulesCount,
                                    Runtime: s.runtimeMs,
                                    rulesCount: s.rulesCount,
                                    runtimeMs: s.runtimeMs,
                                    algorithm: s.algorithm || 'fpgrowth',
                                    rows: s.datasetRows || resultsObj.dataset_rows || resultsObj.dataset_size || 2500,
                                    support: s.support || 0.02,
                                    confidence: s.confidence || 0.5,
                                    liftThreshold: s.liftThreshold || 1.2,
                                    topHotspot: s.topHotspot || 'None',
                                    datasetHash: s.datasetHash || 'N/A',
                                    
                                    prevRows: prev ? (prev.datasetRows || prevResultsObj.dataset_rows || prevResultsObj.dataset_size || 2500) : null,
                                    prevSupport: prev ? (prev.support || 0.02) : null,
                                    prevConfidence: prev ? (prev.confidence || 0.5) : null,
                                    prevLiftThreshold: prev ? (prev.liftThreshold || 1.2) : null,
                                    prevRulesCount: prev ? prev.rulesCount : null,
                                    prevDatasetHash: prev ? (prev.datasetHash || 'N/A') : null,
                                    prevAlgorithm: prev ? (prev.algorithm || 'fpgrowth') : null
                                  };
                                });
                              })()}

                              margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="scan" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                              <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                              <ReChartsTooltip content={<CustomScanTooltip />} />
                              <ReChartsLine type="monotone" dataKey="Rules" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
                            </ReChartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      {/* Runtime over time */}
                      <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                        <h3 className="text-sm font-bold text-white mb-1">Execution Runtime — Scan History Trend</h3>
                        <p className="text-[10px] text-slate-500 mb-4">Pipeline runtime (ms) per historical scan</p>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <ReChartsLineChart
                              data={(() => {
                                const cleaned = getCleanedScanHistory(scanHistory);
                                const chronological = [...cleaned].reverse();
                                return chronological.map((s, index) => {
                                  let resultsObj = {};
                                  try {
                                    resultsObj = s.resultsJson ? JSON.parse(s.resultsJson) : {};
                                  } catch (e) {}
                                  
                                  const prev = index > 0 ? chronological[index - 1] : null;
                                  let prevResultsObj = {};
                                  if (prev) {
                                    try {
                                      prevResultsObj = prev.resultsJson ? JSON.parse(prev.resultsJson) : {};
                                    } catch (e) {}
                                  }
                                  
                                  return {
                                    scan: `#${s.id}`,
                                    scanId: `#${s.id}`,
                                    Rules: s.rulesCount,
                                    Runtime: s.runtimeMs,
                                    rulesCount: s.rulesCount,
                                    runtimeMs: s.runtimeMs,
                                    algorithm: s.algorithm || 'fpgrowth',
                                    rows: s.datasetRows || resultsObj.dataset_rows || resultsObj.dataset_size || 2500,
                                    support: s.support || 0.02,
                                    confidence: s.confidence || 0.5,
                                    liftThreshold: s.liftThreshold || 1.2,
                                    topHotspot: s.topHotspot || 'None',
                                    datasetHash: s.datasetHash || 'N/A',
                                    
                                    prevRows: prev ? (prev.datasetRows || prevResultsObj.dataset_rows || prevResultsObj.dataset_size || 2500) : null,
                                    prevSupport: prev ? (prev.support || 0.02) : null,
                                    prevConfidence: prev ? (prev.confidence || 0.5) : null,
                                    prevLiftThreshold: prev ? (prev.liftThreshold || 1.2) : null,
                                    prevRulesCount: prev ? prev.rulesCount : null,
                                    prevDatasetHash: prev ? (prev.datasetHash || 'N/A') : null,
                                    prevAlgorithm: prev ? (prev.algorithm || 'fpgrowth') : null
                                  };
                                });
                              })()}

                              margin={{ top: 10, right: 10, left: -20, bottom: 10 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                              <XAxis dataKey="scan" stroke="#94a3b8" tick={{ fontSize: 10 }} />
                              <YAxis stroke="#94a3b8" tick={{ fontSize: 10 }} />
                              <ReChartsTooltip content={<CustomScanTooltip />} />
                              <ReChartsLine type="monotone" dataKey="Runtime" stroke="#06b6d4" strokeWidth={2} dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6 }} />
                            </ReChartsLineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* Risk level distribution table */}
                  <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl">
                    <h3 className="text-sm font-bold text-white mb-4">Module Risk Level Distribution</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(level => (
                        <div key={level} className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl text-center space-y-1">
                          <span className="text-[10px] font-bold text-slate-500 uppercase">{level}</span>
                          <p className={`text-3xl font-mono font-extrabold ${
                            level === 'CRITICAL' ? 'text-rose-400' :
                            level === 'HIGH' ? 'text-orange-400' :
                            level === 'MEDIUM' ? 'text-amber-400' : 'text-amber-400'
                          }`}>
                            {analyticsSummary.risk_level_counts[level] || 0}
                          </p>
                          <span className="text-[10px] text-slate-500">modules</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="py-24 text-center text-slate-500 flex flex-col items-center gap-2">
                  <TrendingUp size={36} className="text-slate-700" />
                  <span>Run a scan to populate ML analytics.</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 8: Observability Center */}
          {activeTab === 'observability' && (
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white tracking-tight m-0">Observability Center</h2>
                  <p className="text-sm text-slate-400 mt-1">Monitor cross-service transactions trace IDs, evict Redis cache buffers, and review database audits</p>
                </div>
                <button
                  onClick={fetchAuditLogs}
                  disabled={loadingAudits}
                  className="flex items-center gap-2 px-4 py-2 bg-[#111] border border-slate-880 rounded-lg text-sm text-slate-300 transition hover:bg-white/5"
                >
                  <RefreshCw size={14} className={loadingAudits ? 'animate-spin' : ''} />
                  <span>Sync Audits</span>
                </button>
              </div>

              {/* Cache and Tracing Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Redis Caching Console */}
                <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Database size={18} className="text-amber-400" />
                    <span>Polymorphic Redis Cache</span>
                  </h3>
                  <p className="text-xs text-slate-450 leading-relaxed">
                    Gateway buffers mined rules and scored module lists to reduce heavy FastAPI network loads. Evict cached states manually to synchronize changes.
                  </p>
                  
                  <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cache Buffer 1:</span>
                      <span className="text-purple-450 font-bold">"rules"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Cache Buffer 2:</span>
                      <span className="text-purple-450 font-bold">"risks"</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Caching Driver:</span>
                      <span className="text-slate-300">Lettuce / Redis Client</span>
                    </div>
                  </div>

                  <button
                    onClick={handleEvictCache}
                    className="py-2.5 px-4 bg-amber-600 hover:bg-purple-700 text-white text-xs font-bold rounded-lg transition shadow-lg hover:shadow-purple-500/10 flex items-center gap-1.5"
                  >
                    <Trash2 size={14} />
                    <span>Evict Redis Caches</span>
                  </button>
                </div>

                {/* Request Tracing Tracing */}
                <div className="bg-[#111] border border-amber-500/20 p-6 rounded-xl space-y-4">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Activity size={18} className="text-amber-400" />
                    <span>Transaction ID Correlation</span>
                  </h3>
                  <p className="text-xs text-slate-450 leading-relaxed">
                    Unique request trace identifiers generated by Spring Boot gateway interceptors are propagated to FastAPI headers for unified, polyglot observability tracking.
                  </p>

                  <div className="p-4 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-3 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 block">Gateway Outbound Port:</span>
                      <span className="text-slate-300">8080 (React CORS mapped)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">FastAPI Inbound Port:</span>
                      <span className="text-slate-300">8000 (ml-service container)</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Active Trace ID format:</span>
                      <span className="text-amber-500">REQ-SYSTEM-XXXXXX</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* DB Audit Logs Table */}
              <div className="bg-[#111] border border-amber-500/20 rounded-xl overflow-hidden">
                <div className="p-6 border-b border-amber-500/20">
                  <h3 className="text-base font-bold text-white">Gateway Database Audit Logs</h3>
                  <p className="text-xs text-slate-500 mt-1">Live audit entries persisted in PostgreSQL table: <code className="bg-[#0A0A0A] px-1 py-0.5 rounded">audit_logs</code></p>
                </div>

                {loadingAudits ? (
                  <div className="py-12 flex items-center justify-center text-slate-500 gap-2">
                    <RefreshCw className="animate-spin" size={16} />
                    <span>Fetching audit records...</span>
                  </div>
                ) : auditLogs.length === 0 ? (
                  <div className="py-12 text-center text-slate-650 font-medium">
                    No database audit logs found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#0A0A0A]/60 border-b border-amber-500/10 text-slate-400 font-bold uppercase tracking-wider">
                          <th className="py-4 px-6">ID</th>
                          <th className="py-4 px-6">Operator</th>
                          <th className="py-4 px-6">Action</th>
                          <th className="py-4 px-6">Status</th>
                          <th className="py-4 px-6">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850/30 font-mono text-slate-350">
                        {auditLogs.map((logItem) => (
                          <tr key={logItem.id} className="hover:bg-[#111]/20 transition">
                            <td className="py-4 px-6 text-amber-400">#{logItem.id}</td>
                            <td className="py-4 px-6 text-slate-200">{logItem.username}</td>
                            <td className="py-4 px-6 font-semibold">{logItem.action}</td>
                            <td className="py-4 px-6">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                logItem.status === 'SUCCESS'
                                  ? 'bg-amber-500/10 text-amber-450 border border-amber-500/20'
                                  : 'bg-rose-500/10 text-rose-450 border border-rose-500/20'
                              }`}>
                                {logItem.status}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-slate-500">{new Date(logItem.timestamp).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Advanced Explainability Slide-Over Drawer */}
      {explainModule && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end font-sans">
          <div 
            className="absolute inset-0 bg-[#0A0A0A]/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => { setExplainModule(null); setExplainData(null); }}
          />
          <div className="relative w-full max-w-lg h-full bg-[#0d1322]/95 border-l border-amber-500/20 shadow-2xl backdrop-blur-md p-6 flex flex-col justify-between transform transition-transform duration-300 ease-out overflow-y-auto text-slate-200 scrollbar-thin">
            
            <div className="flex justify-between items-start border-b border-amber-500/20 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Module Hotspot Drilldown</span>
                <h3 className="text-xl font-bold text-white font-mono mt-1">{explainModule}</h3>
              </div>
              <button 
                onClick={() => { setExplainModule(null); setExplainData(null); }}
                className="p-1 rounded-lg bg-[#0A0A0A]/50 border border-amber-500/10 hover:border-amber-500/30 transition text-slate-400 hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {loadingExplain ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-2 py-12 text-slate-500">
                <RefreshCw className="animate-spin text-amber-500" size={24} />
                <span>Generating explainability data...</span>
              </div>
            ) : explainData ? (
              <div className="flex-1 space-y-6">
                
                <div className="flex items-center gap-6 p-4 bg-[#0A0A0A]/50 border border-amber-500/10 rounded-xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                  
                  <div className="relative flex items-center justify-center w-20 h-20 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="40" cy="40" r="34" stroke="#1e293b" strokeWidth="6" fill="transparent" />
                      <circle cx="40" cy="40" r="34" stroke={
                        explainData.risk_level === 'CRITICAL' ? '#ef4444' :
                        explainData.risk_level === 'HIGH' ? '#f97316' :
                        explainData.risk_level === 'MEDIUM' ? '#eab308' : '#3b82f6'
                      } strokeWidth="6" fill="transparent"
                        strokeDasharray={2 * Math.PI * 34}
                        strokeDashoffset={2 * Math.PI * 34 * (1 - explainData.risk_score / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-sm font-mono font-bold text-white">{explainData.risk_score.toFixed(0)}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">Defect Risk Index</span>
                    <p className="text-xl font-extrabold text-white font-mono">{explainData.risk_score.toFixed(1)}/100</p>
                    <span className={`inline-block px-2 py-0.5 rounded font-extrabold text-[9px] border ${
                      explainData.risk_level === 'CRITICAL' ? 'bg-rose-500/10 text-rose-450 border-rose-500/20' :
                      explainData.risk_level === 'HIGH' ? 'bg-orange-500/10 text-orange-450 border-orange-500/20' :
                      explainData.risk_level === 'MEDIUM' ? 'bg-amber-500/10 text-amber-450 border-amber-500/20' :
                      'bg-amber-500/10 text-blue-450 border-amber-500/20'
                    }`}>
                      {explainData.risk_level} Severity
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-purple-950/10 border border-purple-900/30 rounded-xl space-y-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[10px] uppercase tracking-wider">
                      <ShieldAlert size={14} />
                      <span>Explainability Brief</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-sans">{explainData.explanation}</p>
                  </div>
                  
                  <div className="p-4 bg-[#0A0A0A]/50 border border-amber-500/10 rounded-xl space-y-2 relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
                    <div>
                      <div className="flex items-center gap-1.5 text-purple-450 font-bold text-[10px] uppercase tracking-wider">
                        <Zap size={14} />
                        <span>Mined Outcome Drivers</span>
                      </div>
                      <p className="text-xs font-bold text-purple-300 mt-2 uppercase tracking-wide">
                        {getMinedOutcomeDrivers(explainData.top_rules)}
                      </p>
                    </div>
                    <span className="text-[8px] text-slate-550 block font-sans">Derived dynamically from active module associations</span>
                  </div>
                </div>


                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Contribution Strength Analysis:</span>
                  <div className="p-4 bg-[#0A0A0A]/40 border border-amber-500/10 rounded-xl space-y-3">
                    {explainData.contributions.map((contrib, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between items-center text-[10px] font-sans">
                          <span className="font-semibold text-slate-350">{contrib.category}</span>
                          <span className="font-mono font-bold text-slate-400">{contrib.percentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-[#111] border border-amber-500/10 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-500 ${
                              contrib.category.startsWith("Security") ? 'bg-rose-500 shadow-[0_0_10px_rgba(239,68,68,0.2)]' :
                              contrib.category.startsWith("Performance") ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.2)]' :
                              contrib.category.startsWith("Integration") ? 'bg-violet-500 shadow-[0_0_10px_rgba(139,92,246,0.2)]' :
                              'bg-slate-500 shadow-[0_0_10px_rgba(100,116,139,0.2)]'
                            }`}
                            style={{ width: `${contrib.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Top Mined Driver Rules ({explainData.top_rules.length}):</span>
                  <div className="space-y-3 max-h-[260px] overflow-y-auto scrollbar-thin pr-1">
                    {(() => {
                      const clusters = getRuleClusters(explainData.top_rules);
                      return clusters.map((cluster, idx) => {
                        const rep = cluster.representative;
                        const isExpanded = !!expandedRules[cluster.id];
                        return (
                          <div 
                            key={cluster.id} 
                            className="p-3 bg-slate-955 border border-slate-900 rounded-xl space-y-2 hover:border-amber-500/20 transition relative overflow-hidden"
                          >
                            <div className="flex justify-between items-center text-[10px]">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-slate-400">Driver Rule #{idx + 1}</span>
                                {cluster.collapsed.length > 0 && (
                                  <button
                                    onClick={() => setExpandedRules(prev => ({ ...prev, [cluster.id]: !prev[cluster.id] }))}
                                    className="px-1.5 py-0.5 rounded-full bg-purple-500/15 hover:bg-purple-500/25 border border-amber-500/20 hover:border-purple-500/40 text-[7px] font-sans font-bold text-purple-300 transition flex items-center gap-0.5 active:scale-95"
                                  >
                                    <span>{cluster.collapsed.length} collapsed</span>
                                    <span>{isExpanded ? '▲' : '▼'}</span>
                                  </button>
                                )}
                              </div>
                              <span className="text-purple-455 font-mono text-[9px] font-bold">LIFT: {rep.lift.toFixed(1)}</span>
                            </div>
                            
                            <div className="p-2 bg-[#0A0A0A] border border-slate-900 rounded-lg text-[9px] font-mono flex items-center justify-between text-slate-400 gap-2">
                              <span className="truncate">{rep.antecedent}</span>
                              <span className="text-amber-400 font-bold">➔</span>
                              <span className="text-rose-450 font-bold whitespace-nowrap">{rep.consequent}</span>
                            </div>
                            
                            <div className="flex gap-4 text-[9px] font-mono text-slate-550">
                              <div>Support: <strong className="text-slate-400">{rep.support.toFixed(3)}</strong></div>
                              <div>Confidence: <strong className="text-slate-400">{(rep.confidence * 100).toFixed(0)}%</strong></div>
                              <div>Contribution: <strong className="text-purple-300">{Math.round(rep.support * rep.confidence * rep.lift * 100)}%</strong></div>
                            </div>

                            {isExpanded && (
                              <div className="mt-2.5 pt-2.5 border-t border-slate-900 space-y-2 text-[9px] font-mono text-slate-400">
                                {cluster.collapsed.map((child, cIdx) => (
                                  <div key={cIdx} className="bg-[#0A0A0A]/65 p-2 rounded-lg border border-slate-900/40 flex flex-col gap-1 pl-2 border-l border-l-purple-500">
                                    <div className="flex justify-between items-center text-[8px] text-slate-500">
                                      <span>Rule variant #{cIdx + 1}</span>
                                      <span>LIFT: {child.lift.toFixed(1)}</span>
                                    </div>
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="truncate italic text-slate-350">{child.antecedent}</span>
                                      <span className="text-amber-400">➔</span>
                                      <span className="text-rose-500/80">{child.consequent.split('=')[1] || child.consequent}</span>
                                    </div>
                                    <div className="flex gap-2 text-[7px] text-slate-500">
                                      <div>Support: {child.support.toFixed(3)}</div>
                                      <div>Confidence: {(child.confidence * 100).toFixed(0)}%</div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center py-12 text-slate-500">
                <span>Failed to load explainability profile.</span>
              </div>
            )}

            <div className="border-t border-amber-500/20 pt-4 mt-6">
              <button
                onClick={() => { setExplainModule(null); setExplainData(null); }}
                className="w-full py-2 px-4 bg-[#0A0A0A] border border-amber-500/20 hover:border-amber-500/30 rounded-lg text-xs font-bold text-slate-350 transition hover:bg-slate-850 flex items-center justify-center gap-1.5"
              >
                <span>Dismiss Spotlight</span>
              </button>
            </div>
            
          </div>
        </div>
      )}

      {/* Methodology Formula Transparency Modal Popup */}
      {showFormulaInfo && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 font-sans">
          <div 
            className="absolute inset-0 bg-slate-955/80 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFormulaInfo(false)}
          />
          <div className="relative bg-[#0d1322]/98 border border-amber-500/20 shadow-2xl p-6 rounded-xl max-w-md w-full backdrop-blur-md text-slate-200 space-y-4">
            <div className="flex justify-between items-center border-b border-amber-500/10 pb-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Cpu size={14} className="text-amber-400" />
                <span>Defect Risk Index Methodology</span>
              </h4>
              <button 
                onClick={() => setShowFormulaInfo(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X size={14} />
              </button>
            </div>
            
            <div className="space-y-3.5 text-xs text-slate-350 leading-relaxed font-sans">
              <p>
                The platform computes a dynamic hotspot risk index per module through multi-parameter association rule mining.
              </p>
              <div className="p-3.5 bg-[#0A0A0A] border border-amber-500/10 rounded-xl space-y-2 font-mono text-[9px] text-slate-300">
                <p className="font-bold text-amber-400">1. Raw Risk Formula:</p>
                <p className="text-slate-400 leading-normal pl-2 border-l border-amber-500/20">
                  RawRisk(M) = Σ (support × confidence × lift) for all matching rules in module M.
                </p>
                <p className="font-bold text-amber-400 mt-2">2. Min-Max Normalization:</p>
                <p className="text-slate-400 leading-normal pl-2 border-l border-amber-500/20">
                  RiskIndex(M) = [ (RawRisk(M) - MinRawRisk) / (MaxRawRisk - MinRawRisk) ] × 100
                </p>
              </div>
              <p>
                This ensures the **Defect Risk Index** represents a normalized percentage score strictly within the mathematically sound range of **0–100%**, scaling proportionally relative to the most defect-prone component.
              </p>
              <div className="p-3 bg-purple-950/15 border border-purple-900/20 text-purple-300 rounded-lg flex gap-2">
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <span className="text-[10px]">
                  <strong>Jaccard Similarity</strong> is also utilized to dynamically collapse overlapping variant rules into collapsed representative rule families inside the observability tabs.
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowFormulaInfo(false)}
              className="w-full py-2 bg-purple-650 hover:bg-purple-700 font-bold rounded-lg text-xs text-white transition shadow-md shadow-purple-900/30"
            >
              Close Methodology
            </button>
          </div>
        </div>
      )}

      {/* Footer bar */}
      <footer className="bg-slate-955 border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        &copy; 2026 BugRisk Platform. All rights reserved. Association-Rule-Driven Defect Intelligence.
      </footer>
    </div>
  );
}

export default App;
