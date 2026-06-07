import React, { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ClipboardCheck,
  CreditCard,
  Download,
  Eye,
  FileDown,
  FileSpreadsheet,
  FileText,
  Filter,
  HelpCircle,
  Home,
  Info,
  Landmark,
  Layers,
  Lock,
  LogOut,
  Menu,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Save,
  Search,
  Send,
  Shield,
  Trash2,
  UploadCloud,
  User,
  X,
} from 'lucide-react';

// =======================================================================================
// CORETAX PRAKTIKUM SIMULATOR
// Versi ini dibuat supaya kamu tinggal COPAS seluruh isi file ini ke App.jsx.
// Tidak perlu nyari bagian mana yang diganti.
// =======================================================================================

// ================= DATABASE AWAL: BANK SOAL PENGAJAR =================
const DEFAULT_CASES = {
  '3174082406050001': {
    nik: '3174082406050001',
    npwp: '3174082406050001',
    namaWP: 'Ahmad Subarjo',
    shortName: 'AHMAD SUBARJO',
    noId: '3174082406050001',
    email: 'ahmad.subarjo@mail.com',
    telepon: '081293503701',
    statusPerkawinan: 'TK/0',
    namaKasus: 'Kasus: Salah PTKP',
    deskripsiSoal:
      'Ahmad adalah seorang bujangan lapang (TK/0). Namun, di dalam sistem e-Bupot, perusahaan salah memasukkan statusnya menjadi K/3. Mahasiswa harus mengaudit dan membetulkan PTKP-nya ke TK/0 agar hasil perhitungan pajaknya akurat.',
    ebupotGaji: 120000000,
    ebupotSampingan: 0,
    ebupotPtkpBase: 54000000,
    ebupotTanggungan: 3,
    ebupotKreditPajak: 3300000,
    hartaKas: 1500000,
    hartaInvestasi: 0,
    hartaBergerak: 0,
    hartaTidakBergerak: 0,
    utang: 0,
    kunciTanggungan: 0,
    kunciSampingan: 0,
    kunciStatusSPT: 'KURANG BAYAR',
  },
  '3174082406050002': {
    nik: '3174082406050002',
    npwp: '3174082406050002',
    namaWP: 'Siti Rahma',
    shortName: 'SITI RAHMA',
    noId: '3174082406050002',
    email: 'siti.rahma@mail.com',
    telepon: '081293503702',
    statusPerkawinan: 'TK/0',
    namaKasus: 'Kasus: Penghasilan Sampingan Ghoib',
    deskripsiSoal:
      'Siti bekerja sebagai Staff Akuntansi (TK/0). Di e-Bupot tertera gajinya Rp80 juta, namun dia punya penghasilan sampingan dari luar usaha sebesar Rp40 juta yang belum dimasukkan ke SPT. Mahasiswa wajib menambahkan penghasilan neto dalam negeri lainnya tersebut.',
    ebupotGaji: 80000000,
    ebupotSampingan: 0,
    ebupotPtkpBase: 54000000,
    ebupotTanggungan: 0,
    ebupotKreditPajak: 1300000,
    hartaKas: 2500000,
    hartaInvestasi: 0,
    hartaBergerak: 0,
    hartaTidakBergerak: 0,
    utang: 0,
    kunciTanggungan: 0,
    kunciSampingan: 40000000,
    kunciStatusSPT: 'KURANG BAYAR',
  },
  '3174082406050003': {
    nik: '3174082406050003',
    npwp: '3174082406050003',
    namaWP: 'Syihab Rifqi Hadzami',
    shortName: 'SYIHAB RIFQI HADZAMI',
    noId: '3174082406050003',
    email: 'syihabrifqi2406@gmail.com',
    telepon: '081293503755',
    statusPerkawinan: 'TK/0',
    namaKasus: 'Kasus: Nihil SPT Karyawan',
    deskripsiSoal:
      'Syihab adalah karyawan yang hanya memiliki penghasilan dari pekerjaan dan tidak memiliki harta, utang, tanggungan, maupun bukti potong tambahan. Simulasi ini mengikuti screenshot Coretax dengan status akhir Nihil.',
    ebupotGaji: 0,
    ebupotSampingan: 0,
    ebupotPtkpBase: 54000000,
    ebupotTanggungan: 0,
    ebupotKreditPajak: 0,
    hartaKas: 0,
    hartaInvestasi: 0,
    hartaBergerak: 0,
    hartaTidakBergerak: 0,
    utang: 0,
    kunciTanggungan: 0,
    kunciSampingan: 0,
    kunciStatusSPT: 'NIHIL',
  },
};

// ================= DATABASE AWAL: BANK SOAL SPT BADAN =================
const DEFAULT_COMPANY_CASES = {
  '012345678901000': {
    npwp: '012345678901000',
    namaBadan: 'PT Maju Jaya Abadi',
    shortName: 'PT MAJU JAYA ABADI',
    email: 'tax@majujaya.co.id',
    telepon: '021-555-0101',
    alamat: 'Jl. Simulasi Coretax No. 10, Jakarta',
    klu: '46900 - Perdagangan Besar Berbagai Macam Barang',
    jenisUsaha: 'Perdagangan',
    namaKasus: 'Kasus: Kurang Bayar karena kredit pajak kecil',
    deskripsiSoal: 'PT Maju Jaya Abadi memiliki laba fiskal lebih besar dari kredit pajak yang sudah dibayar. Mahasiswa perlu memposting data, mengecek koreksi fiskal, lalu menyelesaikan status kurang bayar.',
    pendapatan: 1200000000,
    hpp: 700000000,
    bebanUsaha: 300000000,
    pendapatanLain: 15000000,
    bebanLain: 15000000,
    koreksiPositif: 50000000,
    koreksiNegatif: 10000000,
    kompensasiRugi: 0,
    kreditPPh22: 5000000,
    kreditPPh23: 10000000,
    kreditPPh25: 15000000,
    asetHarga: 250000000,
    asetAkumulasi: 80000000,
    pemegangSaham: 'Andi Pratama',
    sahamPersen: 60,
    kunciKoreksiPositif: 50000000,
    kunciStatusSPT: 'KURANG BAYAR',
  },
  '098765432109000': {
    npwp: '098765432109000',
    namaBadan: 'PT Sinar Abadi Sentosa',
    shortName: 'PT SINAR ABADI SENTOSA',
    email: 'finance@sinarabadi.co.id',
    telepon: '021-555-0202',
    alamat: 'Jl. Pendidikan Pajak No. 20, Bandung',
    klu: '62090 - Aktivitas Teknologi Informasi Lainnya',
    jenisUsaha: 'Jasa Teknologi',
    namaKasus: 'Kasus: Koreksi fiskal positif belum dimasukkan',
    deskripsiSoal: 'PT Sinar Abadi memiliki biaya yang tidak dapat dikurangkan secara fiskal. Mahasiswa harus memasukkan koreksi fiskal positif agar PPh Badan terutang menjadi benar.',
    pendapatan: 950000000,
    hpp: 360000000,
    bebanUsaha: 430000000,
    pendapatanLain: 5000000,
    bebanLain: 15000000,
    koreksiPositif: 0,
    koreksiNegatif: 5000000,
    kompensasiRugi: 0,
    kreditPPh22: 0,
    kreditPPh23: 18000000,
    kreditPPh25: 12000000,
    asetHarga: 180000000,
    asetAkumulasi: 45000000,
    pemegangSaham: 'Dewi Lestari',
    sahamPersen: 75,
    kunciKoreksiPositif: 40000000,
    kunciStatusSPT: 'KURANG BAYAR',
  },
  '001122334455000': {
    npwp: '001122334455000',
    namaBadan: 'PT Nihil Sejahtera',
    shortName: 'PT NIHIL SEJAHTERA',
    email: 'admin@nihilsejahtera.co.id',
    telepon: '021-555-0303',
    alamat: 'Jl. Rekonsiliasi Fiskal No. 30, Surabaya',
    klu: '70209 - Aktivitas Konsultasi Manajemen Lainnya',
    jenisUsaha: 'Jasa Konsultansi',
    namaKasus: 'Kasus: SPT Badan Nihil',
    deskripsiSoal: 'PT Nihil Sejahtera belum beroperasi secara komersial pada tahun pajak 2025. Mahasiswa memposting data dan melaporkan SPT Badan dengan status nihil.',
    pendapatan: 0,
    hpp: 0,
    bebanUsaha: 0,
    pendapatanLain: 0,
    bebanLain: 0,
    koreksiPositif: 0,
    koreksiNegatif: 0,
    kompensasiRugi: 0,
    kreditPPh22: 0,
    kreditPPh23: 0,
    kreditPPh25: 0,
    asetHarga: 0,
    asetAkumulasi: 0,
    pemegangSaham: 'Yayasan Sejahtera',
    sahamPersen: 100,
    kunciKoreksiPositif: 0,
    kunciStatusSPT: 'NIHIL',
  },
};

// ================= HELPER FORMAT =================
const NAVY = '#17245c';
const YELLOW = '#ffd542';
const BORDER = '#e7ebf3';

function formatRupiah(value) {
  const numberValue = Number(value || 0);
  return `Rp ${numberValue.toLocaleString('id-ID')}`;
}

function onlyNumber(value) {
  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? 0 : numberValue;
}

function clampTanggungan(value) {
  return Math.max(0, Math.min(3, onlyNumber(value)));
}

function makeBpeCode() {
  return `BPE-CT-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
}

function FieldInput({
  label,
  value,
  onChange,
  readOnly = false,
  type = 'text',
  placeholder = '',
  className = '',
  rightText = '',
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-[11px] font-semibold text-slate-500">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          readOnly={readOnly}
          onChange={(e) => onChange?.(type === 'number' ? onlyNumber(e.target.value) : e.target.value)}
          className={`w-full h-9 rounded border px-3 text-[12px] outline-none ${
            readOnly
              ? 'bg-[#eef1f6] text-slate-500 cursor-not-allowed'
              : 'bg-white text-slate-700 focus:ring-1 focus:ring-blue-900'
          }`}
        />
        {rightText && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
            {rightText}
          </span>
        )}
      </div>
    </div>
  );
}

function SelectBox({
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Silakan Pilih',
  disabled = false,
  className = '',
}) {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-[11px] font-semibold text-slate-500">
          {label}
        </label>
      )}
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full h-9 rounded border px-3 text-[12px] outline-none ${
          disabled
            ? 'bg-[#eef1f6] text-slate-400 cursor-not-allowed'
            : 'bg-white text-slate-700 focus:ring-1 focus:ring-blue-900'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function CoretaxLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#0f2c59] to-[#233a84] text-white flex items-center justify-center font-black text-[10px]">
        DJP
      </div>
      <div className="h-7 w-px bg-slate-300" />
      <div className="leading-none">
        <div className="font-black tracking-tight text-[18px] text-[#1e3172]">
          CO<span className="text-[#f2b705]">RE</span>TAX
        </div>
        <div className="text-[8px] tracking-widest text-slate-400">TAX CORE SYSTEM</div>
      </div>
    </div>
  );
}

function IconMiniButton({ icon: Icon, tone = 'slate', title = '', onClick }) {
  const tones = {
    slate: 'bg-[#eef2f7] text-slate-600 hover:bg-slate-200',
    dark: 'bg-slate-600 text-white hover:bg-slate-700',
    green: 'bg-emerald-600 text-white hover:bg-emerald-700',
    red: 'bg-rose-600 text-white hover:bg-rose-700',
    blue: 'bg-blue-600 text-white hover:bg-blue-700',
    yellow: 'bg-amber-400 text-slate-900 hover:bg-amber-500',
  };

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`h-9 w-9 rounded-md flex items-center justify-center transition ${tones[tone]}`}
    >
      <Icon size={15} />
    </button>
  );
}

function PaginationCoretax() {
  return (
    <div className="flex items-center justify-center gap-2 py-4 text-[11px] text-slate-400">
      <span className="mr-2">Menampilkan 0 sampai 0 dari 0 entri</span>
      <button className="h-8 w-8 bg-[#eef1f6] rounded border flex items-center justify-center">
        <ChevronsLeft size={14} />
      </button>
      <button className="h-8 w-8 bg-[#eef1f6] rounded border flex items-center justify-center">
        <ChevronLeft size={14} />
      </button>
      <button className="h-8 w-8 bg-[#eef1f6] rounded border flex items-center justify-center">
        <ChevronRight size={14} />
      </button>
      <button className="h-8 w-8 bg-[#eef1f6] rounded border flex items-center justify-center">
        <ChevronsRight size={14} />
      </button>
      <select className="h-8 rounded border bg-[#eef1f6] px-2 text-slate-500">
        <option>10</option>
        <option>25</option>
      </select>
    </div>
  );
}

function EmptyTableBody({ colSpan = 6, text = 'Tidak ada data yang ditemukan.' }) {
  return (
    <tr>
      <td colSpan={colSpan} className="bg-white text-slate-500 text-[11px] p-3 border-b">
        {text}
      </td>
    </tr>
  );
}

function TableToolbar({ onAdd, showImport = true }) {
  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white">
      <button
        type="button"
        onClick={onAdd}
        className="h-9 px-4 rounded bg-[#17245c] text-white font-semibold text-[12px] flex items-center gap-2 hover:bg-[#0f1a45]"
      >
        <Plus size={15} />
        Tambah
      </button>
      <button
        type="button"
        className="h-9 px-4 rounded bg-[#dc1f1f] text-white font-semibold text-[12px] flex items-center gap-2 hover:bg-[#b91616]"
      >
        <Trash2 size={15} />
        Hapus
      </button>
      <button
        type="button"
        className="h-9 px-4 rounded bg-[#dc1f1f] text-white font-semibold text-[12px] flex items-center gap-2 hover:bg-[#b91616]"
      >
        <Trash2 size={15} />
        Hapus Semua
      </button>
      {showImport && (
        <button
          type="button"
          className="h-9 px-4 rounded bg-[#17245c] text-white font-semibold text-[12px] flex items-center gap-2 hover:bg-[#0f1a45]"
        >
          Import data
          <ChevronDown size={14} />
        </button>
      )}
    </div>
  );
}

function DataGridCard({
  title,
  children,
  toolbar = false,
  onAdd,
  footerText = '',
}) {
  return (
    <div className="bg-white border border-[#dfe5ee] rounded-sm overflow-hidden">
      <div className="bg-[#17245c] text-white px-4 py-3 text-[12px] font-bold flex items-center gap-2">
        <ChevronDown size={16} />
        {title}
      </div>
      {toolbar && <TableToolbar onAdd={onAdd} />}
      <div className="px-3 pb-3">
        <div className="flex gap-2 mb-2">
          <IconMiniButton icon={RefreshCw} title="Refresh" />
          <IconMiniButton icon={FileText} tone="dark" title="Copy" />
          <IconMiniButton icon={FileSpreadsheet} tone="green" title="Excel" />
          <IconMiniButton icon={FileDown} tone="red" title="PDF" />
          <IconMiniButton icon={Filter} title="Filter" />
        </div>
        <div className="overflow-x-auto border border-[#eef1f5]">
          {children}
        </div>
        {footerText && (
          <div className="text-right px-4 py-2 text-[11px] font-semibold text-slate-600 bg-[#f6f7f9] border-x border-b">
            {footerText}
          </div>
        )}
        <PaginationCoretax />
      </div>
    </div>
  );
}

function YellowTable({ columns, children }) {
  return (
    <table className="w-full min-w-[960px] border-collapse text-[11px]">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th
              key={`${col}-${index}`}
              className="bg-[#ffd542] text-slate-800 border-r border-[#fff3a6] px-3 py-3 text-center font-bold whitespace-nowrap"
            >
              <span>{col}</span>
              <span className="ml-1 text-slate-600">↕</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}

function FilterRow({ columns }) {
  return (
    <tr>
      {columns.map((col, index) => (
        <td key={`${col}-filter-${index}`} className="bg-[#f7f8fa] border-r px-2 py-2 text-center">
          {index === 0 ? (
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
          ) : col.toLowerCase().includes('deskripsi') || col.toLowerCase().includes('jenis') || col.toLowerCase().includes('hubungan') || col.toLowerCase().includes('kepemilikan') || col.toLowerCase().includes('lokasi') ? (
            <select className="h-8 w-full rounded border bg-white px-2 text-[11px] text-slate-400">
              <option>Silakan Pilih</option>
            </select>
          ) : (
            <div className="flex items-center justify-center gap-2">
              <input className="h-8 w-full max-w-[115px] rounded border bg-white px-2 text-[11px]" />
              <Filter size={14} className="text-slate-500" />
            </div>
          )}
        </td>
      ))}
    </tr>
  );
}

function RadioPair({ value, onChange, disabled = false }) {
  return (
    <div className="flex items-center gap-3 justify-end">
      <label className="flex items-center gap-1 text-[11px] text-slate-500">
        <input
          type="radio"
          checked={value === 'Ya'}
          disabled={disabled}
          onChange={() => onChange?.('Ya')}
          className="accent-blue-600"
        />
        Ya
      </label>
      <label className="flex items-center gap-1 text-[11px] text-slate-500">
        <input
          type="radio"
          checked={value === 'Tidak'}
          disabled={disabled}
          onChange={() => onChange?.('Tidak')}
          className="accent-blue-600"
        />
        Tidak
      </label>
    </div>
  );
}

function QuestionRow({
  number,
  text,
  value,
  onChange,
  inputValue,
  readOnlyInput = true,
}) {
  return (
    <div className="grid grid-cols-[60px_1fr_240px] items-center min-h-[38px] border-b border-white bg-[#e5e5e5] text-[11px]">
      <div className="px-3 text-slate-600">{number}</div>
      <div className="px-3 text-slate-600">{text}</div>
      <div className="px-3 flex items-center justify-end gap-4">
        {inputValue !== undefined ? (
          <input
            value={inputValue}
            readOnly={readOnlyInput}
            className="h-8 w-44 rounded border bg-[#eef1f6] text-right px-3"
          />
        ) : (
          <RadioPair value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

function SectionHeader({ children }) {
  return (
    <div className="bg-[#17245c] text-white px-4 py-3 text-[12px] font-bold flex items-center gap-2">
      <ChevronDown size={15} />
      {children}
    </div>
  );
}

function Stepper({ activeStep }) {
  const steps = [
    'Pilih Jenis Pajak',
    'Pilih periode pelaporan SPT',
    'Pilih Jenis SPT',
  ];

  return (
    <div className="flex justify-center items-start gap-0 w-full max-w-[560px] mx-auto py-2">
      {steps.map((step, index) => {
        const no = index + 1;
        const active = activeStep === no;
        const done = activeStep > no;

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center min-w-[120px]">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-[13px] font-semibold ${
                  active
                    ? 'bg-[#ffd542] text-slate-700'
                    : done
                      ? 'bg-[#17245c] text-white'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                {done ? <Check size={16} /> : no}
              </div>
              <div className={`mt-2 text-[12px] text-center ${active ? 'font-semibold text-slate-600' : 'text-slate-400'}`}>
                {step}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`h-[5px] w-24 mt-[13px] ${activeStep > no ? 'bg-[#ffd542]' : 'bg-[#ffeaa3]'}`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

function WizardShell({ step, children }) {
  return (
    <div className="bg-white rounded-md border border-[#e6ebf3] shadow-sm overflow-hidden">
      <div className="bg-[#f4f4f4] px-5 py-3 font-semibold text-slate-700 text-[16px]">
        Buat Konsep SPT
      </div>
      <div className="p-6">
        <Stepper activeStep={step} />
        {children}
      </div>
    </div>
  );
}

// =======================================================================================
// MAIN APP
// =======================================================================================
function App() {
  // ================= STATE CONFIG MANAGEMENT =================
  const [bankSoal, setBankSoal] = useState(DEFAULT_CASES);
  const [bankSoalBadan] = useState(DEFAULT_COMPANY_CASES);
  const [loginRole, setLoginRole] = useState('mahasiswa');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeNik, setActiveNik] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // ================= STATE FORM INPUT DOSEN =================
  const [newNik, setNewNik] = useState('');
  const [newNama, setNewNama] = useState('');
  const [newDeskripsi, setNewDeskripsi] = useState('');
  const [newGaji, setNewGaji] = useState(0);
  const [newSampingan, setNewSampingan] = useState(0);
  const [newTanggungan, setNewTanggungan] = useState(0);
  const [newKredit, setNewKredit] = useState(0);
  const [newKunciTanggungan, setNewKunciTanggungan] = useState(0);
  const [newKunciSampingan, setNewKunciSampingan] = useState(0);

  // ================= STATE NAVIGATION SISWA =================
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [wizardStep, setWizardStep] = useState(1);
  const [selectedJenisPajak, setSelectedJenisPajak] = useState('');
  const [selectedPeriode, setSelectedPeriode] = useState('');
  const [selectedModelSpt, setSelectedModelSpt] = useState('');
  const [activeTab, setActiveTab] = useState('Induk');
  const [notifSistem, setNotifSistem] = useState('');
  const [showResiModal, setShowResiModal] = useState(false);
  const [showBayarModal, setShowBayarModal] = useState(false);
  const [showRejectedModal, setShowRejectedModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [showXmlModal, setShowXmlModal] = useState(false);
  const [showValidationPanel, setShowValidationPanel] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [postingStep, setPostingStep] = useState('');
  const [returnLifecycle, setReturnLifecycle] = useState('DRAFT');
  const [sptFolder, setSptFolder] = useState('Konsep SPT');
  const [bpeCode, setBpeCode] = useState('');

  // ================= STATE FORM SPT MAHASISWA =================
  const [formGaji, setFormGaji] = useState(0);
  const [formSampingan, setFormSampingan] = useState(0);
  const [formPtkpBase, setFormPtkpBase] = useState(54000000);
  const [formTanggungan, setFormTanggungan] = useState(0);
  const [formKreditPajak, setFormKreditPajak] = useState(0);
  const [formHartaKas, setFormHartaKas] = useState(0);
  const [formHartaInvestasi, setFormHartaInvestasi] = useState(0);
  const [formHartaBergerak, setFormHartaBergerak] = useState(0);
  const [formHartaTidakBergerak, setFormHartaTidakBergerak] = useState(0);
  const [formUtang, setFormUtang] = useState(0);
  const [formStatusPerkawinan, setFormStatusPerkawinan] = useState('');
  const [answerPekerjaan, setAnswerPekerjaan] = useState('Tidak');
  const [answerUsaha, setAnswerUsaha] = useState('Tidak');
  const [answerDN, setAnswerDN] = useState('Tidak');
  const [answerLN, setAnswerLN] = useState('Tidak');
  const [answerPotongPihakLain, setAnswerPotongPihakLain] = useState('Tidak');
  const [answerUtang, setAnswerUtang] = useState('Tidak');
  const [answerPPhFinal, setAnswerPPhFinal] = useState('Tidak');
  const [answerNonObjek, setAnswerNonObjek] = useState('Tidak');

  // ================= STATE FORM SPT BADAN =================
  const [activeBadanNpwp, setActiveBadanNpwp] = useState('012345678901000');
  const [badanPendapatan, setBadanPendapatan] = useState(0);
  const [badanHpp, setBadanHpp] = useState(0);
  const [badanBebanUsaha, setBadanBebanUsaha] = useState(0);
  const [badanPendapatanLain, setBadanPendapatanLain] = useState(0);
  const [badanBebanLain, setBadanBebanLain] = useState(0);
  const [badanKoreksiPositif, setBadanKoreksiPositif] = useState(0);
  const [badanKoreksiNegatif, setBadanKoreksiNegatif] = useState(0);
  const [badanKompensasiRugi, setBadanKompensasiRugi] = useState(0);
  const [badanPPh22, setBadanPPh22] = useState(0);
  const [badanPPh23, setBadanPPh23] = useState(0);
  const [badanPPh25, setBadanPPh25] = useState(0);
  const [badanAsetHarga, setBadanAsetHarga] = useState(0);
  const [badanAsetAkumulasi, setBadanAsetAkumulasi] = useState(0);

  const activeCase = bankSoal[activeNik];
  const activeBadanCase = bankSoalBadan[activeBadanNpwp];
  const isBadanSpt = selectedJenisPajak === 'SPT Tahunan PPh Wajib Pajak Badan';
  const displayTaxpayer = isBadanSpt ? activeBadanCase : activeCase;

  // ================= HASIL HITUNG OTOMATIS =================
  const hasilPajak = useMemo(() => {
    const totalNetto = onlyNumber(formGaji) + onlyNumber(formSampingan);
    const totalPtkp = onlyNumber(formPtkpBase) + clampTanggungan(formTanggungan) * 4500000;
    const pkpRaw = totalNetto - totalPtkp;
    const pkp = Math.max(0, Math.floor(pkpRaw / 1000) * 1000);

    let pajak = 0;
    if (pkp <= 0) {
      pajak = 0;
    } else if (pkp <= 60000000) {
      pajak = pkp * 0.05;
    } else if (pkp <= 250000000) {
      pajak = 60000000 * 0.05 + (pkp - 60000000) * 0.15;
    } else if (pkp <= 500000000) {
      pajak = 60000000 * 0.05 + 190000000 * 0.15 + (pkp - 250000000) * 0.25;
    } else if (pkp <= 5000000000) {
      pajak = 60000000 * 0.05 + 190000000 * 0.15 + 250000000 * 0.25 + (pkp - 500000000) * 0.3;
    } else {
      pajak =
        60000000 * 0.05 +
        190000000 * 0.15 +
        250000000 * 0.25 +
        4500000000 * 0.3 +
        (pkp - 5000000000) * 0.35;
    }

    const pajakTerutang = Math.round(pajak);
    const selisih = pajakTerutang - onlyNumber(formKreditPajak);

    let status = 'NIHIL';
    let nominal = 0;

    if (selisih > 0) {
      status = 'KURANG BAYAR';
      nominal = selisih;
    } else if (selisih < 0) {
      status = 'LEBIH BAYAR';
      nominal = Math.abs(selisih);
    }

    return {
      totalNetto,
      totalPtkp,
      pkp,
      pajakTerutang,
      selisih,
      status,
      nominal,
    };
  }, [formGaji, formSampingan, formPtkpBase, formTanggungan, formKreditPajak]);

  const hasilBadan = useMemo(() => {
    const labaKotor = onlyNumber(badanPendapatan) - onlyNumber(badanHpp);
    const labaKomersial = labaKotor - onlyNumber(badanBebanUsaha) + onlyNumber(badanPendapatanLain) - onlyNumber(badanBebanLain);
    const labaFiskalSebelumKompensasi = labaKomersial + onlyNumber(badanKoreksiPositif) - onlyNumber(badanKoreksiNegatif);
    const pkp = Math.max(0, Math.floor((labaFiskalSebelumKompensasi - onlyNumber(badanKompensasiRugi)) / 1000) * 1000);
    const pphTerutang = Math.round(pkp * 0.22);
    const totalKredit = onlyNumber(badanPPh22) + onlyNumber(badanPPh23) + onlyNumber(badanPPh25);
    const selisih = pphTerutang - totalKredit;
    let status = 'NIHIL';
    let nominal = 0;
    if (selisih > 0) {
      status = 'KURANG BAYAR';
      nominal = selisih;
    } else if (selisih < 0) {
      status = 'LEBIH BAYAR';
      nominal = Math.abs(selisih);
    }
    return {
      labaKotor,
      labaKomersial,
      labaFiskalSebelumKompensasi,
      pkp,
      pphTerutang,
      totalKredit,
      selisih,
      status,
      nominal,
    };
  }, [badanPendapatan, badanHpp, badanBebanUsaha, badanPendapatanLain, badanBebanLain, badanKoreksiPositif, badanKoreksiNegatif, badanKompensasiRugi, badanPPh22, badanPPh23, badanPPh25]);

  const currentTaxResult = isBadanSpt ? hasilBadan : hasilPajak;

  const totalHarta = useMemo(() => {
    return onlyNumber(formHartaKas) + onlyNumber(formHartaInvestasi) + onlyNumber(formHartaBergerak) + onlyNumber(formHartaTidakBergerak);
  }, [formHartaKas, formHartaInvestasi, formHartaBergerak, formHartaTidakBergerak]);

  const lifecycleMeta = useMemo(() => {
    const meta = {
      DRAFT: {
        folder: 'Konsep SPT',
        label: 'Konsep',
        badge: 'bg-slate-100 text-slate-700',
        description: 'Konsep baru dibuat. Data belum diposting dari e-Bupot.',
      },
      POSTED: {
        folder: 'Konsep SPT',
        label: 'Sudah Posting',
        badge: 'bg-blue-100 text-blue-700',
        description: 'Data prepopulated sudah berhasil ditarik. Silakan review dan koreksi.',
      },
      SAVED: {
        folder: 'Konsep SPT',
        label: 'Konsep Tersimpan',
        badge: 'bg-amber-100 text-amber-800',
        description: 'Konsep disimpan sementara dan belum disampaikan.',
      },
      WAITING_PAYMENT: {
        folder: 'SPT Menunggu Pembayaran',
        label: 'Menunggu Pembayaran',
        badge: 'bg-orange-100 text-orange-800',
        description: 'SPT kurang bayar. Selesaikan pembayaran simulasi untuk menerbitkan BPE.',
      },
      REPORTED: {
        folder: 'SPT Dilaporkan',
        label: 'Dilaporkan',
        badge: 'bg-emerald-100 text-emerald-700',
        description: 'SPT sudah disampaikan dan memiliki Bukti Penerimaan Elektronik.',
      },
      REJECTED: {
        folder: 'SPT Ditolak',
        label: 'Ditolak',
        badge: 'bg-rose-100 text-rose-700',
        description: 'Validasi sistem menolak SPT karena masih ada data yang tidak sesuai.',
      },
      CANCELED: {
        folder: 'SPT Dibatalkan',
        label: 'Dibatalkan',
        badge: 'bg-slate-200 text-slate-600',
        description: 'Konsep SPT dibatalkan.',
      },
    };

    return meta[returnLifecycle] || meta.DRAFT;
  }, [returnLifecycle]);

  const folderList = useMemo(() => {
    const activeFolder = lifecycleMeta.folder;
    return [
      'Konsep SPT',
      'SPT Menunggu Pembayaran',
      'SPT Dilaporkan',
      'SPT Ditolak',
      'SPT Dibatalkan',
    ].map((name) => ({
      name,
      count: name === activeFolder ? 1 : 0,
    }));
  }, [lifecycleMeta]);

  const shouldShowSptInFolder = sptFolder === lifecycleMeta.folder;

  const statusChecklist = useMemo(() => {
    const posted = returnLifecycle !== 'DRAFT';
    return [
      { label: 'Konsep SPT dibuat', done: true },
      { label: 'Posting data e-Bupot', done: posted },
      { label: 'Review Induk dan Lampiran', done: posted && (returnLifecycle === 'SAVED' || returnLifecycle === 'WAITING_PAYMENT' || returnLifecycle === 'REPORTED') },
      { label: 'Tanda tangan digital', done: returnLifecycle === 'WAITING_PAYMENT' || returnLifecycle === 'REPORTED' },
      { label: currentTaxResult.status === 'KURANG BAYAR' ? 'Pembayaran diselesaikan' : 'SPT disampaikan', done: returnLifecycle === 'REPORTED' },
    ];
  }, [returnLifecycle, currentTaxResult.status]);

  // ================= ACTION HANDLERS =================
  const resetStudentForm = () => {
    setFormGaji(0);
    setFormSampingan(0);
    setFormPtkpBase(54000000);
    setFormTanggungan(0);
    setFormKreditPajak(0);
    setFormHartaKas(0);
    setFormHartaInvestasi(0);
    setFormHartaBergerak(0);
    setFormHartaTidakBergerak(0);
    setFormUtang(0);
    setFormStatusPerkawinan('');
    setBadanPendapatan(0);
    setBadanHpp(0);
    setBadanBebanUsaha(0);
    setBadanPendapatanLain(0);
    setBadanBebanLain(0);
    setBadanKoreksiPositif(0);
    setBadanKoreksiNegatif(0);
    setBadanKompensasiRugi(0);
    setBadanPPh22(0);
    setBadanPPh23(0);
    setBadanPPh25(0);
    setBadanAsetHarga(0);
    setBadanAsetAkumulasi(0);
    setAnswerPekerjaan('Tidak');
    setAnswerUsaha('Tidak');
    setAnswerDN('Tidak');
    setAnswerLN('Tidak');
    setAnswerPotongPihakLain('Tidak');
    setAnswerUtang('Tidak');
    setAnswerPPhFinal('Tidak');
    setAnswerNonObjek('Tidak');
    setSelectedJenisPajak('');
    setSelectedPeriode('');
    setSelectedModelSpt('');
    setWizardStep(1);
    setActiveTab('Induk');
    setNotifSistem('');
    setShowResiModal(false);
    setShowBayarModal(false);
    setShowRejectedModal(false);
    setShowReviewModal(false);
    setShowSignatureModal(false);
    setShowXmlModal(false);
    setShowValidationPanel(false);
    setIsPosting(false);
    setPostingStep('');
    setReturnLifecycle('DRAFT');
    setSptFolder('Konsep SPT');
    setBpeCode('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (loginRole === 'pengajar') {
      if (teacherPassword === 'adminpajak') {
        setIsLoggedIn(true);
      } else {
        setErrorMsg('Sandi pengajar salah. Password default: adminpajak');
      }
      return;
    }

    if (!activeNik || !bankSoal[activeNik]) {
      setErrorMsg('Nomor NIK Soal tidak terdaftar di sistem Coretax Pengajar.');
      return;
    }

    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
    resetStudentForm();
  };

  const goWizard = () => {
    setCurrentScreen('wizard');
    setSptFolder('Konsep SPT');
    setWizardStep(1);
  };

  const openFormFromWizard = () => {
    setCurrentScreen('form-spt');
    setActiveTab('Induk');
    setReturnLifecycle('DRAFT');
    setSptFolder('Konsep SPT');
    setShowValidationPanel(false);
    setNotifSistem('Konsep SPT berhasil dibuat. Klik Posting SPT untuk menarik data pajak dari e-Bupot.');
    setTimeout(() => setNotifSistem(''), 5500);
  };

  const handlePostingSPT = () => {
    const dataKasus = bankSoal[activeNik];

    if (!dataKasus && !isBadanSpt) return;

    setIsPosting(true);
    setPostingStep(isBadanSpt ? 'Menghubungkan ke profil WP Badan dan laporan keuangan...' : 'Menghubungkan ke data e-Bupot dan profil wajib pajak...');

    setTimeout(() => {
      setPostingStep(isBadanSpt ? 'Mengambil data komersial, koreksi fiskal, kredit pajak, penyusutan, dan pemegang saham...' : 'Mengambil harta, utang, keluarga, dan bukti potong...');
    }, 650);

    setTimeout(() => {
      if (isBadanSpt) {
        const badan = activeBadanCase;
        setBadanPendapatan(badan.pendapatan);
        setBadanHpp(badan.hpp);
        setBadanBebanUsaha(badan.bebanUsaha);
        setBadanPendapatanLain(badan.pendapatanLain);
        setBadanBebanLain(badan.bebanLain);
        setBadanKoreksiPositif(badan.koreksiPositif);
        setBadanKoreksiNegatif(badan.koreksiNegatif);
        setBadanKompensasiRugi(badan.kompensasiRugi);
        setBadanPPh22(badan.kreditPPh22);
        setBadanPPh23(badan.kreditPPh23);
        setBadanPPh25(badan.kreditPPh25);
        setBadanAsetHarga(badan.asetHarga);
        setBadanAsetAkumulasi(badan.asetAkumulasi);
        setReturnLifecycle('POSTED');
        setSptFolder('Konsep SPT');
        setActiveTab('L-1');
        setShowValidationPanel(true);
        setIsPosting(false);
        setPostingStep('');
        setNotifSistem('Posting SPT Badan berhasil. Data laporan keuangan, koreksi fiskal, kredit pajak, penyusutan, dan pemegang saham berhasil ditarik.');
        setTimeout(() => setNotifSistem(''), 6500);
        return;
      }

      setFormGaji(dataKasus.ebupotGaji);
      setFormSampingan(dataKasus.ebupotSampingan);
      setFormPtkpBase(dataKasus.ebupotPtkpBase);
      setFormTanggungan(dataKasus.ebupotTanggungan);
      setFormKreditPajak(dataKasus.ebupotKreditPajak);
      setFormHartaKas(dataKasus.hartaKas || 0);
      setFormHartaInvestasi(dataKasus.hartaInvestasi || 0);
      setFormHartaBergerak(dataKasus.hartaBergerak || 0);
      setFormHartaTidakBergerak(dataKasus.hartaTidakBergerak || 0);
      setFormUtang(dataKasus.utang || 0);
      setFormStatusPerkawinan(dataKasus.statusPerkawinan || 'TK/0');

      setAnswerPekerjaan(dataKasus.ebupotGaji > 0 ? 'Ya' : 'Tidak');
      setAnswerDN(dataKasus.ebupotSampingan > 0 ? 'Ya' : 'Tidak');
      setAnswerPotongPihakLain(dataKasus.ebupotKreditPajak > 0 ? 'Ya' : 'Tidak');
      setAnswerUtang(dataKasus.utang > 0 ? 'Ya' : 'Tidak');

      setReturnLifecycle('POSTED');
      setSptFolder('Konsep SPT');
      setActiveTab('L-1');
      setShowValidationPanel(true);
      setIsPosting(false);
      setPostingStep('');
      setNotifSistem('Posting SPT berhasil. Data prepopulated berhasil ditarik. Silakan review Induk dan Lampiran L-1 sebelum Bayar dan Lapor.');
      setTimeout(() => setNotifSistem(''), 6500);
    }, 1400);
  };

  const handleSimpanKonsep = () => {
    setReturnLifecycle(returnLifecycle === 'DRAFT' ? 'DRAFT' : 'SAVED');
    setSptFolder('Konsep SPT');
    setNotifSistem('Konsep SPT berhasil disimpan sementara. Status dokumen tetap berada di folder Konsep SPT.');
    setTimeout(() => setNotifSistem(''), 5000);
  };

  const handleCreateCase = (e) => {
    e.preventDefault();

    if (!newNik || !newNama) {
      alert('NIK dan nama wajib pajak harus diisi.');
      return;
    }

    const customCase = {
      nik: newNik,
      npwp: newNik,
      namaWP: newNama,
      shortName: newNama.toUpperCase(),
      noId: newNik,
      email: 'dummy.case@mail.com',
      telepon: '081200000000',
      statusPerkawinan: Number(newKunciTanggungan) > 0 ? `K/${newKunciTanggungan}` : 'TK/0',
      namaKasus: 'Kasus Custom Pengajar',
      deskripsiSoal: newDeskripsi || 'Kasus custom dari pengajar.',
      ebupotGaji: Number(newGaji),
      ebupotSampingan: Number(newSampingan),
      ebupotPtkpBase: 54000000,
      ebupotTanggungan: Number(newTanggungan),
      ebupotKreditPajak: Number(newKredit),
      hartaKas: 0,
      hartaInvestasi: 0,
      hartaBergerak: 0,
      hartaTidakBergerak: 0,
      utang: 0,
      kunciTanggungan: Number(newKunciTanggungan),
      kunciSampingan: Number(newKunciSampingan),
      kunciStatusSPT: 'KURANG BAYAR',
    };

    setBankSoal({
      ...bankSoal,
      [newNik]: customCase,
    });

    setNewNik('');
    setNewNama('');
    setNewDeskripsi('');
    setNewGaji(0);
    setNewSampingan(0);
    setNewTanggungan(0);
    setNewKredit(0);
    setNewKunciTanggungan(0);
    setNewKunciSampingan(0);

    alert('Soal praktikum baru berhasil disimpan ke bank sistem Coretax.');
  };

  const handleDeleteCase = (id) => {
    const updated = { ...bankSoal };
    delete updated[id];
    setBankSoal(updated);
  };

  const validateBeforeSubmit = () => {
    const target = bankSoal[activeNik];

    if (isBadanSpt) {
      const targetBadan = activeBadanCase;
      if (!targetBadan) return false;
      const checkKoreksi = onlyNumber(badanKoreksiPositif) === onlyNumber(targetBadan.kunciKoreksiPositif || 0);
      const checkStatusBadan = hasilBadan.status === targetBadan.kunciStatusSPT || targetBadan.kunciStatusSPT === undefined;
      return checkKoreksi && checkStatusBadan;
    }

    if (!target) return false;

    const checkTanggungan = clampTanggungan(formTanggungan) === clampTanggungan(target.kunciTanggungan);
    const checkSampingan = onlyNumber(formSampingan) === onlyNumber(target.kunciSampingan || 0);
    const checkStatus = currentTaxResult.status === target.kunciStatusSPT || target.kunciStatusSPT === undefined;

    return checkTanggungan && checkSampingan && checkStatus;
  };

  const handleBayarDanLapor = () => {
    if (returnLifecycle === 'DRAFT') {
      setNotifSistem('Posting SPT terlebih dahulu sebelum melakukan Bayar dan Lapor.');
      setTimeout(() => setNotifSistem(''), 4500);
      return;
    }

    const valid = validateBeforeSubmit();

    if (!valid) {
      setReturnLifecycle('REJECTED');
      setSptFolder('SPT Ditolak');
      setShowRejectedModal(true);
      return;
    }

    setShowReviewModal(true);
  };

  const handleReviewLanjut = () => {
    setShowReviewModal(false);
    setShowSignatureModal(true);
  };

  const handleTandaTanganDigital = () => {
    setShowSignatureModal(false);

    if (currentTaxResult.status === 'KURANG BAYAR' && currentTaxResult.nominal > 0) {
      setReturnLifecycle('WAITING_PAYMENT');
      setSptFolder('SPT Menunggu Pembayaran');
      setShowBayarModal(true);
      return;
    }

    setReturnLifecycle('REPORTED');
    setSptFolder('SPT Dilaporkan');
    setBpeCode(makeBpeCode());
    setShowResiModal(true);
  };

  const handleBayarLaluLapor = () => {
    setShowBayarModal(false);
    setReturnLifecycle('REPORTED');
    setSptFolder('SPT Dilaporkan');
    setBpeCode(makeBpeCode());
    setShowResiModal(true);
  };

  const handleBatalKonsep = () => {
    setReturnLifecycle('CANCELED');
    setSptFolder('SPT Dibatalkan');
    setCurrentScreen('dashboard');
    setNotifSistem('Konsep SPT berhasil dibatalkan dan dipindahkan ke folder SPT Dibatalkan.');
    setTimeout(() => setNotifSistem(''), 5000);
  };

  // =======================================================================================
  // LOGIN SCREEN
  // =======================================================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#eef2f8] flex items-center justify-center p-5 font-sans">
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8eef8] via-white to-[#f7f4e7]" />
        <div className="relative w-full max-w-[980px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]">
          <div className="bg-[#17245c] p-8 text-white relative overflow-hidden">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10" />
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-[#ffd542]/20" />

            <CoretaxLogo />

            <div className="mt-14 relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] mb-4">
                <Shield size={14} />
                Portal Simulasi Praktikum Pajak
              </div>
              <h1 className="text-3xl font-black leading-tight">
                SPT Tahunan PPh OP & Badan
              </h1>
              <p className="mt-4 text-sm text-slate-200 leading-relaxed max-w-md">
                Masuk sebagai mahasiswa untuk mengerjakan studi kasus SPT Orang Pribadi dan SPT Badan, atau masuk sebagai pengajar untuk membuat bank soal e-Bupot dan kunci validasi.
              </p>
            </div>

            <div className="relative mt-12 grid grid-cols-3 gap-3 text-[11px]">
              <div className="bg-white/10 rounded-xl p-3">
                <FileText size={17} className="mb-2 text-[#ffd542]" />
                SPT OP
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <Landmark size={17} className="mb-2 text-[#ffd542]" />
                e-Bupot
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <ClipboardCheck size={17} className="mb-2 text-[#ffd542]" />
                Validasi
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex rounded-xl bg-slate-100 p-1 text-[12px] font-bold">
              <button
                type="button"
                onClick={() => {
                  setLoginRole('mahasiswa');
                  setErrorMsg('');
                }}
                className={`flex-1 rounded-lg py-2 transition ${
                  loginRole === 'mahasiswa'
                    ? 'bg-white text-[#17245c] shadow-sm'
                    : 'text-slate-400'
                }`}
              >
                Kelas Mahasiswa
              </button>
              <button
                type="button"
                onClick={() => {
                  setLoginRole('pengajar');
                  setErrorMsg('');
                }}
                className={`flex-1 rounded-lg py-2 transition ${
                  loginRole === 'pengajar'
                    ? 'bg-white text-[#17245c] shadow-sm'
                    : 'text-slate-400'
                }`}
              >
                Panel Pengajar
              </button>
            </div>

            <form onSubmit={handleLogin} className="mt-7 space-y-5">
              {errorMsg && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-[12px] text-rose-700 flex gap-2">
                  <AlertTriangle size={16} />
                  {errorMsg}
                </div>
              )}

              {loginRole === 'mahasiswa' ? (
                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-2">
                    Masukkan NIK Kasus
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: 3174082406050003"
                      className="w-full h-11 rounded-xl border bg-white pl-10 pr-3 text-sm font-mono outline-none focus:ring-2 focus:ring-[#17245c]"
                      value={activeNik}
                      onChange={(e) => setActiveNik(e.target.value)}
                    />
                  </div>
                  <div className="mt-3 rounded-xl bg-slate-50 border p-3 text-[11px] text-slate-500 leading-relaxed">
                    NIK contoh yang bisa dicoba:
                    <div className="mt-1 font-mono text-slate-700">
                      3174082406050001, 3174082406050002, 3174082406050003
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[12px] font-bold text-slate-600 mb-2">
                    Kata Sandi Pengajar
                  </label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="Password: adminpajak"
                      className="w-full h-11 rounded-xl border bg-white pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-[#17245c]"
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#17245c] text-white font-black text-[12px] tracking-widest hover:bg-[#0f1a45]"
              >
                MASUK KE PORTAL
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================================================
  // PANEL PENGAJAR
  // =======================================================================================
  if (loginRole === 'pengajar') {
    return (
      <div className="min-h-screen bg-[#f3f6fb] font-sans">
        <header className="bg-white border-b shadow-sm sticky top-0 z-30">
          <div className="px-6 py-3 flex items-center justify-between">
            <CoretaxLogo />
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#ffd542] px-3 py-1 text-[11px] font-black text-[#17245c]">
                CASE STUDIO EDITOR
              </span>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setTeacherPassword('');
                }}
                className="h-9 rounded-lg bg-rose-600 px-4 text-white text-[12px] font-bold hover:bg-rose-700 flex items-center gap-2"
              >
                <LogOut size={14} />
                Keluar
              </button>
            </div>
          </div>
        </header>

        <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6">
          <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <SectionHeader>
              <Layers size={16} />
              Kustomisasi e-Bupot & Kunci Jawaban
            </SectionHeader>

            <form onSubmit={handleCreateCase} className="p-5 space-y-4">
              <FieldInput
                label="1. NIK Dummy Target"
                value={newNik}
                onChange={setNewNik}
                placeholder="Masukkan 16 digit NIK"
              />
              <FieldInput
                label="2. Nama Wajib Pajak"
                value={newNama}
                onChange={setNewNama}
                placeholder="Misal: Andi Wijaya"
              />

              <div className="space-y-1">
                <label className="block text-[11px] font-semibold text-slate-500">
                  3. Narasi Deskripsi Masalah / Soal
                </label>
                <textarea
                  rows={4}
                  value={newDeskripsi}
                  onChange={(e) => setNewDeskripsi(e.target.value)}
                  placeholder="Tulis instruksi pengerjaan untuk mahasiswa..."
                  className="w-full rounded border px-3 py-2 text-[12px] outline-none focus:ring-1 focus:ring-blue-900"
                />
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3">
                <div className="font-black text-amber-900 text-[12px]">
                  Data e-Bupot Bawaan
                </div>
                <FieldInput label="Gaji Bersih Setahun" type="number" value={newGaji} onChange={setNewGaji} />
                <FieldInput label="Tanggungan Bawaan e-Bupot" type="number" value={newTanggungan} onChange={setNewTanggungan} />
                <FieldInput label="Penghasilan Sampingan Awal" type="number" value={newSampingan} onChange={setNewSampingan} />
                <FieldInput label="Kredit PPh 21 Terpotong" type="number" value={newKredit} onChange={setNewKredit} />
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
                <div className="font-black text-emerald-900 text-[12px]">
                  Kunci Jawaban Validasi
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldInput label="Kunci Tanggungan" type="number" value={newKunciTanggungan} onChange={setNewKunciTanggungan} />
                  <FieldInput label="Kunci Sampingan" type="number" value={newKunciSampingan} onChange={setNewKunciSampingan} />
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-10 rounded-lg bg-[#17245c] text-white text-[12px] font-black hover:bg-[#0f1a45]"
              >
                PUBLISH SOAL KE LAB
              </button>
            </form>
          </section>

          <section className="bg-white rounded-xl border shadow-sm overflow-hidden">
            <SectionHeader>
              <BookOpen size={16} />
              Daftar Bank Soal Praktikum Aktif
            </SectionHeader>

            <div className="p-5 space-y-3">
              {Object.values(bankSoal).map((item) => (
                <div
                  key={item.nik}
                  className="rounded-xl border bg-slate-50 p-4 flex flex-col xl:flex-row xl:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[12px] font-bold rounded bg-blue-50 border border-blue-100 px-2 py-1 text-blue-800">
                        {item.nik}
                      </span>
                      <span className="font-bold text-slate-800 text-[13px]">
                        {item.namaWP} - {item.namaKasus}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-500 leading-relaxed max-w-3xl">
                      {item.deskripsiSoal}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 text-[11px] font-mono">
                      <div className="rounded bg-white border p-2">
                        Gaji: <b>{formatRupiah(item.ebupotGaji)}</b>
                      </div>
                      <div className="rounded bg-white border p-2">
                        Sampingan awal: <b>{formatRupiah(item.ebupotSampingan)}</b>
                      </div>
                      <div className="rounded bg-white border p-2">
                        Tanggungan e-Bupot: <b className="text-rose-600">{item.ebupotTanggungan}</b>
                      </div>
                      <div className="rounded bg-white border p-2">
                        Kunci: <b className="text-emerald-700">{item.kunciTanggungan}</b> / <b className="text-emerald-700">{formatRupiah(item.kunciSampingan || 0)}</b>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteCase(item.nik)}
                    className="h-9 w-9 rounded-lg border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 flex items-center justify-center"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    );
  }

  // =======================================================================================
  // STUDENT CORE FRAME
  // =======================================================================================
  return (
    <div className="min-h-screen bg-[#eef2f7] font-sans text-slate-700 text-[12px]">
      {/* TOP NAVBAR MIRIP CORETAX */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <CoretaxLogo />
            <div className="hidden lg:flex items-center gap-2 w-[330px] h-10 rounded-xl bg-[#f4f6fa] border px-3">
              <Search size={16} className="text-slate-400" />
              <input
                readOnly
                placeholder="Cari layanan..."
                className="flex-1 bg-transparent outline-none text-[12px]"
              />
              <span className="rounded bg-slate-200 px-1 text-[10px] text-slate-500">Ctrl</span>
              <span className="rounded bg-slate-200 px-1 text-[10px] text-slate-500">K</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <HelpCircle size={18} className="text-[#17245c]" />
            <FileText size={18} className="text-[#17245c]" />
            <Bell size={18} className="text-[#17245c]" />
            <div className="hidden md:flex items-center gap-2 border rounded-xl px-3 py-1.5 bg-white">
              <span className="h-4 w-4 rounded-full bg-red-500 inline-block border border-white shadow" />
              <span className="font-bold text-[12px]">ID</span>
              <ChevronDown size={14} />
            </div>
            <div className="hidden md:flex items-center gap-2 border rounded-xl px-3 py-1.5 bg-white min-w-[210px]">
              <Shield size={16} className="text-[#17245c]" />
              <div className="leading-tight">
                <div className="font-mono text-[10px] text-slate-400">
                  {activeCase?.npwp}
                </div>
                <div className="font-bold text-[12px] text-[#17245c] truncate max-w-[150px]">
                  {activeCase?.shortName}
                </div>
              </div>
              <ChevronDown size={14} />
            </div>
            <button
              onClick={() => {
                setIsLoggedIn(false);
                resetStudentForm();
              }}
              className="h-9 w-9 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>

        <nav className="px-6 py-2 flex items-center gap-2 overflow-x-auto text-[#17245c] font-semibold">
          {[
            'Portal Saya',
            'e-Faktur',
            'eBUPOT',
            'SPT',
            'Pembayaran',
            'Buku Besar',
            'Layanan WP',
            'Manajemen Akses',
            'Pertukaran Informasi',
          ].map((item) => (
            <button
              key={item}
              className={`h-10 px-4 rounded-xl whitespace-nowrap flex items-center gap-2 ${
                item === 'SPT'
                  ? 'bg-[#ffd542]/30 border border-[#ffd542] text-[#17245c]'
                  : 'hover:bg-slate-50'
              }`}
            >
              {item === 'SPT' ? <FileText size={16} /> : <Shield size={14} className="text-[#f2b705]" />}
              {item}
              <ChevronDown size={13} />
            </button>
          ))}
          <button className="ml-auto h-9 w-9 rounded-full hover:bg-slate-100 flex items-center justify-center">
            <Home size={17} />
          </button>
        </nav>
      </header>

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="hidden lg:block w-[280px] bg-white border-r min-h-[calc(100vh-118px)] sticky top-[118px]">
          <div className="p-4">
            <div className="flex items-center justify-between rounded-xl border bg-slate-50 p-3 mb-4">
              <div className="flex items-center gap-2 font-bold text-[#17245c]">
                <FileText size={18} />
                Surat Pemberitahuan (SPT)
              </div>
              <button className="h-7 w-7 rounded-lg bg-white border flex items-center justify-center">
                <ChevronLeft size={15} />
              </button>
            </div>

            <div className="rounded-xl bg-[#17245c] text-white p-4 mb-4">
              <div className="font-mono font-bold text-[17px] break-all leading-tight">
                {activeCase?.npwp}
              </div>
              <div className="mt-2 font-semibold uppercase">{activeCase?.shortName}</div>
              <div className="mt-4 bg-white text-[#17245c] rounded-lg px-3 py-2 font-bold">
                Surat Pemberitahuan (SPT)
              </div>
            </div>

            <div className="border rounded-xl overflow-hidden text-[13px]">
              {folderList.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setSptFolder(item.name);
                    setCurrentScreen('dashboard');
                  }}
                  className={`w-full text-left px-4 py-3 border-b last:border-b-0 flex items-center justify-between ${
                    sptFolder === item.name ? 'bg-slate-50 font-semibold text-[#17245c]' : 'hover:bg-slate-50'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${item.count ? 'bg-[#ffd542] text-[#17245c]' : 'bg-slate-100 text-slate-400'}`}>
                    {item.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4">
              <div className="font-black text-amber-900 text-[11px] flex items-center gap-2 uppercase">
                <Info size={14} />
                Lembar Soal
              </div>
              <div className="mt-2 text-[11px] leading-relaxed text-slate-700">
                {activeCase?.deskripsiSoal}
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 p-5 xl:p-6 overflow-x-hidden">
          {notifSistem && (
            <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 flex items-center gap-2 text-emerald-800">
              <CheckCircle size={16} />
              {notifSistem}
            </div>
          )}

          {/* DASHBOARD */}
          {currentScreen === 'dashboard' && (
            <div className="max-w-6xl mx-auto space-y-5">
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <Home size={14} />
                Beranda
                <ChevronRight size={14} />
                Surat Pemberitahuan (SPT)
              </div>

              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 flex flex-col md:flex-row justify-between gap-4">
                  <div>
                    <h1 className="text-[28px] text-[#17245c] font-normal">
                      Surat Pemberitahuan (SPT)
                    </h1>
                    <p className="mt-2 text-slate-500">
                      Folder aktif: <b>{sptFolder}</b>. Daftar SPT yang dapat dibuat, diposting, dibayar, dan dilaporkan.
                    </p>
                  </div>
                  <button
                    onClick={goWizard}
                    className="h-11 px-5 rounded-lg bg-[#17245c] text-white font-bold flex items-center gap-2 justify-center hover:bg-[#0f1a45]"
                  >
                    <Plus size={16} />
                    Buat Konsep SPT
                  </button>
                </div>

                <div className="px-6 pb-6">
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
                    <AlertTriangle size={18} className="text-amber-700 mt-0.5" />
                    <div>
                      <div className="font-bold text-amber-900">SPT Belum Disampaikan</div>
                      <div className="text-[12px] text-amber-800">
                        Anda memiliki draf pelaporan SPT Wajib Pajak Orang Pribadi/Badan Tahun Pajak 2025 yang belum dikirim.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 overflow-x-auto">
                  <table className="w-full min-w-[900px] text-[12px] border-collapse">
                    <thead>
                      <tr className="bg-[#ffd542] text-slate-800">
                        <th className="p-3 border text-left">Jenis Pajak</th>
                        <th className="p-3 border text-left">Jenis Surat Pemberitahuan Pajak</th>
                        <th className="p-3 border text-left">Masa / Tahun Pajak</th>
                        <th className="p-3 border text-left">Status</th>
                        <th className="p-3 border text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {shouldShowSptInFolder ? (
                        <tr className="hover:bg-slate-50">
                          <td className="p-3 border font-bold">{isBadanSpt ? 'PPh Badan' : 'PPh Orang Pribadi'}</td>
                          <td className="p-3 border">{isBadanSpt ? 'SPT Tahunan PPh Wajib Pajak Badan' : 'SPT Tahunan PPh Wajib Pajak Orang Pribadi'}</td>
                          <td className="p-3 border">Januari - Desember 2025</td>
                          <td className="p-3 border">
                            <span className={`rounded-full px-3 py-1 font-bold text-[11px] ${lifecycleMeta.badge}`}>
                              {lifecycleMeta.label}
                            </span>
                            <div className="text-[10px] text-slate-400 mt-1">{lifecycleMeta.description}</div>
                          </td>
                          <td className="p-3 border text-center">
                            {returnLifecycle === 'WAITING_PAYMENT' ? (
                              <button
                                onClick={() => setShowBayarModal(true)}
                                className="h-8 px-3 rounded bg-[#17245c] text-white font-bold hover:bg-[#0f1a45]"
                              >
                                Bayar
                              </button>
                            ) : returnLifecycle === 'REPORTED' ? (
                              <button
                                onClick={() => setShowResiModal(true)}
                                className="h-8 px-3 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-700"
                              >
                                Lihat BPE
                              </button>
                            ) : returnLifecycle === 'CANCELED' ? (
                              <button
                                onClick={goWizard}
                                className="h-8 px-3 rounded bg-[#ffd542] text-slate-900 font-bold hover:bg-amber-400"
                              >
                                Buat Baru
                              </button>
                            ) : (
                              <button
                                onClick={() => setCurrentScreen(returnLifecycle === 'DRAFT' ? 'wizard' : 'form-spt')}
                                className="h-8 px-3 rounded bg-[#ffd542] text-slate-900 font-bold hover:bg-amber-400"
                              >
                                {returnLifecycle === 'DRAFT' ? 'Lanjutkan' : 'Buka'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan={5} className="p-8 border text-center text-slate-400 bg-slate-50">
                            Tidak ada SPT pada folder {sptFolder}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* WIZARD */}
          {currentScreen === 'wizard' && (
            <div className="max-w-6xl mx-auto space-y-5">
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <Home size={14} />
                Beranda
                <ChevronRight size={14} />
                Surat Pemberitahuan (SPT)
                <ChevronRight size={14} />
                Create Returnsheets
              </div>

              {wizardStep === 1 && (
                <WizardShell step={1}>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
                    <div className="hidden md:flex h-48 rounded-xl bg-[#eef2f7] items-center justify-center">
                      <FileText size={80} className="text-[#17245c]" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-700 mb-4">Langkah 1. Pilih Jenis Pajak</div>
                      <label className="block text-[13px] font-semibold text-slate-600 mb-2">
                        Jenis Surat Pemberitahuan Pajak <span className="text-rose-500">*</span>
                      </label>
                      <SelectBox
                        value={selectedJenisPajak}
                        onChange={setSelectedJenisPajak}
                        placeholder="Pilih Jenis Pajak"
                        options={[
                          { value: 'SPT Tahunan PPh Wajib Pajak Orang Pribadi', label: 'SPT Tahunan PPh Wajib Pajak Orang Pribadi' },
                          { value: 'SPT Tahunan PPh Wajib Pajak Badan', label: 'SPT Tahunan PPh Wajib Pajak Badan' },
                          { value: 'SPT Masa PPh Pasal 21/26', label: 'SPT Masa PPh Pasal 21/26' },
                          { value: 'SPT Masa PPh Unifikasi', label: 'SPT Masa PPh Unifikasi' },
                        ]}
                      />
                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={() => {
                            if (!selectedJenisPajak) {
                              alert('Pilih jenis pajak terlebih dahulu.');
                              return;
                            }
                            setWizardStep(2);
                          }}
                          className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"
                        >
                          Berikutnya
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </WizardShell>
              )}

              {wizardStep === 2 && (
                <WizardShell step={2}>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
                    <div className="hidden md:flex h-48 rounded-xl bg-[#eef2f7] items-center justify-center">
                      <Calendar size={80} className="text-[#17245c]" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-700 mb-5">Langkah 2. Pilih periode pelaporan SPT</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          <div className="font-bold text-slate-600 mb-3">Jenis Periode SPT <span className="text-rose-500">*</span></div>
                          <label className="flex items-center gap-2 mb-3">
                            <input type="radio" checked className="accent-blue-600" readOnly />
                            SPT Tahunan
                          </label>
                          <label className="flex items-center gap-2 text-slate-400">
                            <input type="radio" disabled />
                            SPT Bagian Tahun Pajak
                          </label>
                        </div>
                        <div>
                          <SelectBox
                            label="Periode dan Tahun Pajak *"
                            value={selectedPeriode}
                            onChange={setSelectedPeriode}
                            placeholder="Pilih Periode dan Tahun Pajak"
                            options={[
                              { value: 'Januari - Desember 2025', label: 'Januari - Desember 2025' },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="mt-8 flex justify-between">
                        <button
                          onClick={() => setWizardStep(1)}
                          className="h-10 px-5 rounded bg-[#e8f1f4] text-[#17245c] font-bold"
                        >
                          Kembali
                        </button>
                        <button
                          onClick={() => {
                            if (!selectedPeriode) {
                              alert('Pilih periode dan tahun pajak terlebih dahulu.');
                              return;
                            }
                            setWizardStep(3);
                          }}
                          className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"
                        >
                          Berikutnya
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </WizardShell>
              )}

              {wizardStep === 3 && (
                <WizardShell step={3}>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-center">
                    <div className="hidden md:flex h-48 rounded-xl bg-[#eef2f7] items-center justify-center">
                      <ClipboardCheck size={80} className="text-[#17245c]" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-700 mb-5">Langkah 3. Pilih Jenis SPT</div>
                      <div className="grid grid-cols-[210px_1fr] gap-y-3 text-[13px] mb-6">
                        <div>Jenis Surat Pemberitahuan Pajak</div>
                        <div className="font-bold">: {selectedJenisPajak}</div>
                        <div>Jenis Periode SPT</div>
                        <div className="font-bold">: SPT Tahunan</div>
                        <div>Periode dan Tahun Pajak</div>
                        <div className="font-bold">: {selectedPeriode}</div>
                      </div>

                      <SelectBox
                        label="Model SPT *"
                        value={selectedModelSpt}
                        onChange={setSelectedModelSpt}
                        placeholder="Pilih Jenis SPT"
                        options={[
                          { value: 'Normal', label: 'Normal' },
                          { value: 'Pembetulan', label: 'Pembetulan' },
                        ]}
                      />

                      <div className="mt-8 flex justify-between">
                        <button
                          onClick={() => setWizardStep(2)}
                          className="h-10 px-5 rounded bg-[#e8f1f4] text-[#17245c] font-bold"
                        >
                          Kembali
                        </button>
                        <button
                          onClick={() => {
                            if (!selectedModelSpt) {
                              alert('Pilih model SPT terlebih dahulu.');
                              return;
                            }
                            openFormFromWizard();
                          }}
                          className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"
                        >
                          <Save size={15} />
                          Buat Konsep SPT
                        </button>
                      </div>
                    </div>
                  </div>
                </WizardShell>
              )}
            </div>
          )}

          {/* FORM SPT */}
          {currentScreen === 'form-spt' && (
            <div className="max-w-[1280px] mx-auto space-y-5">
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <Home size={14} />
                Beranda
                <ChevronRight size={14} />
                Surat Pemberitahuan (SPT)
                <ChevronRight size={14} />
                {isBadanSpt ? 'Corporate Income Tax Return' : 'Personal Income Tax Return'}
              </div>

              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="px-6 pt-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-[26px] md:text-[30px] text-[#17245c] font-normal leading-tight">
                      {isBadanSpt ? 'SPT TAHUNAN PAJAK PENGHASILAN (PPh) WAJIB PAJAK BADAN' : 'SPT TAHUNAN PAJAK PENGHASILAN (PPh) WAJIB PAJAK ORANG PRIBADI'}
                    </h1>
                  </div>
                  <button onClick={() => setShowXmlModal(true)} className="h-10 px-4 rounded bg-slate-500 text-white font-bold text-[12px] flex items-center gap-2">
                    <Eye size={15} />
                    XML Monitoring
                  </button>
                </div>

                <div className="px-6 pt-7">
                  <div className="flex border-b">
                    {(isBadanSpt ? ['Induk', 'L-1', 'L-2', 'L-3', 'L-4', 'L-5', 'Ringkasan'] : ['Induk', 'L-1']).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`h-10 px-4 text-[14px] font-semibold border-b-2 ${
                          activeTab === tab
                            ? 'border-blue-400 text-blue-500 bg-blue-50'
                            : 'border-transparent text-slate-500'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="px-6 pt-4">
                  <div className="rounded-xl border bg-[#f8fafc] p-4 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 items-start">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`rounded-full px-3 py-1 text-[11px] font-black ${lifecycleMeta.badge}`}>
                          {lifecycleMeta.label}
                        </span>
                        <span className="text-[12px] text-slate-500">{lifecycleMeta.description}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2 text-[11px]">
                        <div className="rounded-lg bg-white border p-2"><div className="text-slate-400">Status Pajak</div><div className="font-black text-[#17245c]">{currentTaxResult.status}</div></div>
                        <div className="rounded-lg bg-white border p-2"><div className="text-slate-400">Kurang/Lebih Bayar</div><div className="font-black">{formatRupiah(currentTaxResult.nominal)}</div></div>
                        <div className="rounded-lg bg-white border p-2"><div className="text-slate-400">PKP</div><div className="font-black">{formatRupiah(currentTaxResult.pkp)}</div></div>
                        <div className="rounded-lg bg-white border p-2"><div className="text-slate-400">Folder</div><div className="font-black">{lifecycleMeta.folder}</div></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {statusChecklist.map((item) => (
                        <div key={item.label} className="flex items-center gap-2 text-[11px]">
                          <span className={`h-5 w-5 rounded-full flex items-center justify-center ${item.done ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                            {item.done ? <Check size={13} /> : <MoreHorizontal size={13} />}
                          </span>
                          <span className={item.done ? 'text-slate-700 font-semibold' : 'text-slate-400'}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {isBadanSpt && activeTab === 'Induk' && (
                  <div className="p-6 space-y-4">
                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>HEADER SPT BADAN</SectionHeader>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FieldInput label="Tahun Pajak/Bagian Tahun Pajak" value="2025" readOnly />
                        <SelectBox label="Status" value={selectedModelSpt} onChange={setSelectedModelSpt} options={[{ value: 'Normal', label: 'Normal' }, { value: 'Pembetulan', label: 'Pembetulan' }]} />
                        <SelectBox label="Metode Pembukuan/Pencatatan" value="Pembukuan" onChange={() => {}} options={[{ value: 'Pembukuan', label: 'Pembukuan' }, { value: 'Pencatatan', label: 'Pencatatan' }]} />
                        <SelectBox
                          label="Pilih Kasus WP Badan"
                          value={activeBadanNpwp}
                          onChange={setActiveBadanNpwp}
                          options={Object.values(bankSoalBadan).map((item) => ({ value: item.npwp, label: `${item.npwp} - ${item.namaBadan}` }))}
                        />
                        <FieldInput label="Periode Pembukuan" value="1" readOnly />
                        <FieldInput label="Sampai" value="12" readOnly />
                        <div className="md:col-span-3">
                          <button onClick={handlePostingSPT} disabled={isPosting} className="h-9 px-5 bg-[#17245c] text-white rounded font-bold text-[12px] flex items-center gap-2 disabled:opacity-60">
                            {isPosting ? <RefreshCw size={15} className="animate-spin" /> : <UploadCloud size={15} />}
                            {isPosting ? 'Memproses Posting...' : returnLifecycle === 'DRAFT' ? 'Posting SPT Badan' : 'Posting Ulang SPT Badan'}
                          </button>
                          <p className="mt-3 text-[12px] text-slate-500 leading-relaxed max-w-3xl">
                            Klik "Posting SPT Badan" untuk menarik data laporan keuangan komersial, rekonsiliasi fiskal, kredit pajak, daftar penyusutan, dan pemegang saham.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>A. IDENTITAS WAJIB PAJAK BADAN</SectionHeader>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FieldInput label="1. NPWP Badan *" value={activeBadanCase?.npwp || ''} readOnly />
                        <FieldInput label="2. Nama Wajib Pajak Badan *" value={activeBadanCase?.shortName || ''} readOnly />
                        <FieldInput label="3. KLU" value={activeBadanCase?.klu || ''} readOnly />
                        <FieldInput label="4. Jenis Usaha" value={activeBadanCase?.jenisUsaha || ''} readOnly />
                        <FieldInput label="5. Nomor Telepon" value={activeBadanCase?.telepon || ''} readOnly />
                        <FieldInput label="6. Email" value={activeBadanCase?.email || ''} readOnly />
                        <FieldInput label="7. Alamat" value={activeBadanCase?.alamat || ''} readOnly className="md:col-span-2" />
                      </div>
                    </div>

                    {showValidationPanel && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-[12px] text-blue-900 flex gap-3">
                        <Info size={18} className="mt-0.5" />
                        <div>
                          <div className="font-black">Data SPT Badan berhasil diposting.</div>
                          <div className="mt-1">Untuk praktikum, beberapa data koreksi fiskal sengaja dibuat belum lengkap. Cek L-2 Rekonsiliasi Fiskal sebelum Bayar dan Lapor.</div>
                        </div>
                      </div>
                    )}

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>B. RINGKASAN UTAMA SPT BADAN</SectionHeader>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3 text-[12px]">
                        <div className="rounded-lg border bg-slate-50 p-3"><div className="text-slate-400">Laba Komersial</div><div className="font-black text-[#17245c]">{formatRupiah(hasilBadan.labaKomersial)}</div></div>
                        <div className="rounded-lg border bg-slate-50 p-3"><div className="text-slate-400">PKP Badan</div><div className="font-black text-[#17245c]">{formatRupiah(hasilBadan.pkp)}</div></div>
                        <div className="rounded-lg border bg-slate-50 p-3"><div className="text-slate-400">PPh Badan Terutang</div><div className="font-black text-[#17245c]">{formatRupiah(hasilBadan.pphTerutang)}</div></div>
                        <div className="rounded-lg border bg-slate-50 p-3"><div className="text-slate-400">Status SPT</div><div className="font-black text-[#17245c]">{hasilBadan.status}</div></div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={() => setActiveTab('L-1')} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"><ArrowRight size={15} /> Lanjut ke L-1 Data Komersial</button>
                      <button onClick={handleSimpanKonsep} className="h-10 px-5 rounded bg-white border text-[#17245c] font-bold flex items-center gap-2"><Save size={15} /> Simpan Konsep</button>
                    </div>
                  </div>
                )}

                {isBadanSpt && activeTab === 'L-1' && (
                  <div className="p-6 space-y-4">
                    <DataGridCard title="L-1 DATA KOMERSIAL / LAPORAN LABA RUGI" footerText={`LABA SEBELUM PAJAK KOMERSIAL ${hasilBadan.labaKomersial.toLocaleString('id-ID')}`}>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 border-b bg-white">
                        <FieldInput label="Penjualan / Pendapatan Usaha" type="number" value={badanPendapatan} onChange={setBadanPendapatan} />
                        <FieldInput label="Harga Pokok Penjualan" type="number" value={badanHpp} onChange={setBadanHpp} />
                        <FieldInput label="Beban Usaha" type="number" value={badanBebanUsaha} onChange={setBadanBebanUsaha} />
                        <FieldInput label="Pendapatan Lain-lain" type="number" value={badanPendapatanLain} onChange={setBadanPendapatanLain} />
                        <FieldInput label="Beban Lain-lain" type="number" value={badanBebanLain} onChange={setBadanBebanLain} />
                      </div>
                      <YellowTable columns={['URAIAN', 'NILAI KOMERSIAL']}>
                        {[
                          ['Penjualan / Pendapatan Usaha', badanPendapatan],
                          ['Harga Pokok Penjualan', badanHpp],
                          ['Laba Bruto', hasilBadan.labaKotor],
                          ['Beban Usaha', badanBebanUsaha],
                          ['Pendapatan Lain-lain', badanPendapatanLain],
                          ['Beban Lain-lain', badanBebanLain],
                          ['Laba Sebelum Pajak Komersial', hasilBadan.labaKomersial],
                        ].map(([label, value]) => (
                          <tr key={label}><td className="border p-3 font-semibold">{label}</td><td className="border p-3 text-right">{formatRupiah(value)}</td></tr>
                        ))}
                      </YellowTable>
                    </DataGridCard>
                    <div className="flex justify-between"><button onClick={() => setActiveTab('Induk')} className="h-10 px-5 rounded bg-white border font-bold">Kembali</button><button onClick={() => setActiveTab('L-2')} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold">Lanjut L-2</button></div>
                  </div>
                )}

                {isBadanSpt && activeTab === 'L-2' && (
                  <div className="p-6 space-y-4">
                    <DataGridCard title="L-2 REKONSILIASI FISKAL" footerText={`PENGHASILAN KENA PAJAK ${hasilBadan.pkp.toLocaleString('id-ID')}`}>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-b bg-white">
                        <FieldInput label="Koreksi Fiskal Positif" type="number" value={badanKoreksiPositif} onChange={setBadanKoreksiPositif} />
                        <FieldInput label="Koreksi Fiskal Negatif" type="number" value={badanKoreksiNegatif} onChange={setBadanKoreksiNegatif} />
                        <FieldInput label="Kompensasi Kerugian Fiskal" type="number" value={badanKompensasiRugi} onChange={setBadanKompensasiRugi} />
                      </div>
                      <YellowTable columns={['URAIAN', 'NILAI']}>
                        {[
                          ['Laba Sebelum Pajak Komersial', hasilBadan.labaKomersial],
                          ['Koreksi Fiskal Positif', badanKoreksiPositif],
                          ['Koreksi Fiskal Negatif', badanKoreksiNegatif],
                          ['Laba Fiskal Sebelum Kompensasi', hasilBadan.labaFiskalSebelumKompensasi],
                          ['Kompensasi Kerugian Fiskal', badanKompensasiRugi],
                          ['Penghasilan Kena Pajak', hasilBadan.pkp],
                          ['PPh Badan Terutang 22%', hasilBadan.pphTerutang],
                        ].map(([label, value]) => (
                          <tr key={label}><td className="border p-3 font-semibold">{label}</td><td className="border p-3 text-right">{formatRupiah(value)}</td></tr>
                        ))}
                      </YellowTable>
                    </DataGridCard>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-[12px] text-amber-900">
                      Catatan praktikum: untuk kasus PT Sinar Abadi, koreksi fiskal positif harus diubah sesuai narasi soal agar validasi sistem diterima.
                    </div>
                    <div className="flex justify-between"><button onClick={() => setActiveTab('L-1')} className="h-10 px-5 rounded bg-white border font-bold">Kembali</button><button onClick={() => setActiveTab('L-3')} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold">Lanjut L-3</button></div>
                  </div>
                )}

                {isBadanSpt && activeTab === 'L-3' && (
                  <div className="p-6 space-y-4">
                    <DataGridCard title="L-3 KREDIT PAJAK" footerText={`TOTAL KREDIT PAJAK ${hasilBadan.totalKredit.toLocaleString('id-ID')}`}>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 border-b bg-white">
                        <FieldInput label="PPh Pasal 22" type="number" value={badanPPh22} onChange={setBadanPPh22} />
                        <FieldInput label="PPh Pasal 23" type="number" value={badanPPh23} onChange={setBadanPPh23} />
                        <FieldInput label="PPh Pasal 25" type="number" value={badanPPh25} onChange={setBadanPPh25} />
                      </div>
                      <YellowTable columns={['JENIS KREDIT PAJAK', 'NILAI']}>
                        {[
                          ['PPh Pasal 22', badanPPh22],
                          ['PPh Pasal 23', badanPPh23],
                          ['PPh Pasal 25', badanPPh25],
                          ['Total Kredit Pajak', hasilBadan.totalKredit],
                          ['PPh Badan Terutang', hasilBadan.pphTerutang],
                          [hasilBadan.status, hasilBadan.nominal],
                        ].map(([label, value]) => (
                          <tr key={label}><td className="border p-3 font-semibold">{label}</td><td className="border p-3 text-right">{formatRupiah(value)}</td></tr>
                        ))}
                      </YellowTable>
                    </DataGridCard>
                    <div className="flex justify-between"><button onClick={() => setActiveTab('L-2')} className="h-10 px-5 rounded bg-white border font-bold">Kembali</button><button onClick={() => setActiveTab('L-4')} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold">Lanjut L-4</button></div>
                  </div>
                )}

                {isBadanSpt && activeTab === 'L-4' && (
                  <div className="p-6 space-y-4">
                    <DataGridCard title="L-4 DAFTAR PENYUSUTAN DAN AMORTISASI" toolbar footerText={`NILAI BUKU ${Math.max(0, badanAsetHarga - badanAsetAkumulasi).toLocaleString('id-ID')}`}>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 border-b bg-white">
                        <FieldInput label="Harga Perolehan Aset" type="number" value={badanAsetHarga} onChange={setBadanAsetHarga} />
                        <FieldInput label="Akumulasi Penyusutan Fiskal" type="number" value={badanAsetAkumulasi} onChange={setBadanAsetAkumulasi} />
                      </div>
                      <YellowTable columns={['TINDAKAN', 'NO.', 'NAMA ASET', 'KELOMPOK', 'TAHUN PEROLEHAN', 'HARGA PEROLEHAN', 'AKUMULASI PENYUSUTAN', 'NILAI BUKU']}>
                        <tr>
                          <td className="border p-2 text-center"><input type="checkbox" /></td><td className="border p-2 text-center">1</td><td className="border p-2">Peralatan Operasional</td><td className="border p-2">Kelompok 1</td><td className="border p-2 text-center">2022</td><td className="border p-2 text-right">{formatRupiah(badanAsetHarga)}</td><td className="border p-2 text-right">{formatRupiah(badanAsetAkumulasi)}</td><td className="border p-2 text-right">{formatRupiah(Math.max(0, badanAsetHarga - badanAsetAkumulasi))}</td>
                        </tr>
                      </YellowTable>
                    </DataGridCard>
                    <div className="flex justify-between"><button onClick={() => setActiveTab('L-3')} className="h-10 px-5 rounded bg-white border font-bold">Kembali</button><button onClick={() => setActiveTab('L-5')} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold">Lanjut L-5</button></div>
                  </div>
                )}

                {isBadanSpt && activeTab === 'L-5' && (
                  <div className="p-6 space-y-4">
                    <DataGridCard title="L-5 DAFTAR PEMEGANG SAHAM / PENGURUS" toolbar>
                      <YellowTable columns={['TINDAKAN', 'NO.', 'NAMA PEMEGANG SAHAM', 'NPWP/NIK', 'JUMLAH SAHAM', 'PERSENTASE KEPEMILIKAN', 'DIVIDEN']}>
                        <tr>
                          <td className="border p-2 text-center"><input type="checkbox" /></td><td className="border p-2 text-center">1</td><td className="border p-2">{activeBadanCase?.pemegangSaham}</td><td className="border p-2">-</td><td className="border p-2 text-right">1.000</td><td className="border p-2 text-right">{activeBadanCase?.sahamPersen}%</td><td className="border p-2 text-right">0</td>
                        </tr>
                      </YellowTable>
                    </DataGridCard>
                    <div className="flex justify-between"><button onClick={() => setActiveTab('L-4')} className="h-10 px-5 rounded bg-white border font-bold">Kembali</button><button onClick={() => setActiveTab('Ringkasan')} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold">Lanjut Ringkasan</button></div>
                  </div>
                )}

                {isBadanSpt && activeTab === 'Ringkasan' && (
                  <div className="p-6 space-y-4">
                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>RINGKASAN SPT BADAN</SectionHeader>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="rounded-xl border bg-slate-50 p-4"><div className="text-slate-400">Pendapatan Usaha</div><div className="font-black text-xl text-[#17245c]">{formatRupiah(badanPendapatan)}</div></div>
                        <div className="rounded-xl border bg-slate-50 p-4"><div className="text-slate-400">Laba Komersial</div><div className="font-black text-xl text-[#17245c]">{formatRupiah(hasilBadan.labaKomersial)}</div></div>
                        <div className="rounded-xl border bg-slate-50 p-4"><div className="text-slate-400">Penghasilan Kena Pajak</div><div className="font-black text-xl text-[#17245c]">{formatRupiah(hasilBadan.pkp)}</div></div>
                        <div className="rounded-xl border bg-slate-50 p-4"><div className="text-slate-400">PPh Badan Terutang</div><div className="font-black text-xl text-[#17245c]">{formatRupiah(hasilBadan.pphTerutang)}</div></div>
                        <div className="rounded-xl border bg-slate-50 p-4"><div className="text-slate-400">Total Kredit Pajak</div><div className="font-black text-xl text-[#17245c]">{formatRupiah(hasilBadan.totalKredit)}</div></div>
                        <div className={`rounded-xl border p-4 ${hasilBadan.status === 'KURANG BAYAR' ? 'bg-amber-50 border-amber-200' : hasilBadan.status === 'LEBIH BAYAR' ? 'bg-rose-50 border-rose-200' : 'bg-emerald-50 border-emerald-200'}`}><div className="text-slate-500">Status SPT</div><div className="font-black text-xl">{hasilBadan.status} - {formatRupiah(hasilBadan.nominal)}</div></div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button onClick={handleSimpanKonsep} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"><Save size={15} /> Simpan Konsep</button>
                      <button onClick={handleBatalKonsep} className="h-10 px-5 rounded bg-white border border-rose-200 text-rose-600 font-bold flex items-center gap-2"><X size={15} /> Batalkan</button>
                      <button onClick={handleBayarDanLapor} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"><CreditCard size={15} /> Bayar dan Lapor</button>
                      <button onClick={() => setCurrentScreen('dashboard')} className="h-10 px-5 rounded bg-white border text-[#17245c] font-bold flex items-center gap-2"><ArrowLeft size={15} /> Pergi ke pencarian</button>
                    </div>
                  </div>
                )}

                {!isBadanSpt && activeTab === 'Induk' && (
                  <div className="p-6 space-y-4">
                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>HEADER</SectionHeader>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FieldInput label="Tahun Pajak/Bagian Tahun Pajak" value="2025" readOnly />
                        <SelectBox
                          label="Status"
                          value={selectedModelSpt}
                          onChange={setSelectedModelSpt}
                          options={[
                            { value: 'Normal', label: 'Normal' },
                            { value: 'Pembetulan', label: 'Pembetulan' },
                          ]}
                        />
                        <SelectBox
                          label="Metode Pembukuan/Pencatatan"
                          value="Pencatatan"
                          onChange={() => {}}
                          options={[
                            { value: 'Pencatatan', label: 'Pencatatan' },
                            { value: 'Pembukuan', label: 'Pembukuan' },
                          ]}
                        />
                        <FieldInput label="Periode Pembukuan" value="1" readOnly />
                        <FieldInput label="Sampai" value="12" readOnly />
                        <SelectBox
                          label="Sumber Penghasilan *"
                          value={answerPekerjaan === 'Ya' ? 'Pekerjaan' : ''}
                          onChange={(val) => setAnswerPekerjaan(val ? 'Ya' : 'Tidak')}
                          options={[
                            { value: 'Pekerjaan', label: 'Pekerjaan' },
                            { value: 'Usaha/Pekerjaan Bebas', label: 'Usaha/Pekerjaan Bebas' },
                          ]}
                        />
                        <div className="md:col-span-3">
                          <button
                            onClick={handlePostingSPT}
                            disabled={isPosting}
                            className="h-9 px-5 bg-[#17245c] text-white rounded font-bold text-[12px] flex items-center gap-2 disabled:opacity-60"
                          >
                            {isPosting ? <RefreshCw size={15} className="animate-spin" /> : <UploadCloud size={15} />}
                            {isPosting ? 'Memproses Posting...' : returnLifecycle === 'DRAFT' ? 'Posting SPT' : 'Posting Ulang SPT'}
                          </button>
                          <p className="mt-3 text-[12px] text-slate-500 leading-relaxed max-w-3xl">
                            Klik tombol "Posting SPT" untuk menampilkan data perpajakan Anda (Harta, Utang, Daftar Anggota Keluarga, Bukti Potong PPh, Pembayaran, dan lainnya).
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>A. IDENTITAS WAJIB PAJAK</SectionHeader>
                      <div className="p-4 space-y-3">
                        <FieldInput label="1. NIK/NPWP *" value={activeCase?.npwp || ''} readOnly />
                        <FieldInput label="2. NAMA *" value={activeCase?.shortName || ''} readOnly />
                        <FieldInput label="3. JENIS ID *" value="KTP" readOnly />
                        <FieldInput label="4. NO. ID *" value={activeCase?.noId || ''} readOnly />
                        <FieldInput label="5. NO. TELEPON *" value={activeCase?.telepon || ''} readOnly />
                        <FieldInput label="6. EMAIL *" value={activeCase?.email || ''} readOnly />
                        <SelectBox
                          label="7. STATUS KEWAJIBAN PERPAJAKAN SUAMI DAN ISTRI"
                          value={formStatusPerkawinan}
                          onChange={setFormStatusPerkawinan}
                          placeholder="Silakan Pilih"
                          options={[
                            { value: 'TK/0', label: 'TK/0' },
                            { value: 'K/0', label: 'K/0' },
                            { value: 'K/1', label: 'K/1' },
                            { value: 'K/2', label: 'K/2' },
                            { value: 'K/3', label: 'K/3' },
                          ]}
                        />
                        <FieldInput label="8. NIK/NPWP SUAMI/ISTRI" value="" readOnly />
                      </div>
                    </div>

                    {showValidationPanel && (
                      <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 text-[12px] text-blue-900 flex gap-3">
                        <Info size={18} className="mt-0.5" />
                        <div>
                          <div className="font-black">Data berhasil diposting dari e-Bupot.</div>
                          <div className="mt-1">Untuk praktikum, beberapa data sengaja dibuat tidak sesuai. Periksa PTKP/tanggungan dan penghasilan sampingan sebelum melakukan Bayar dan Lapor.</div>
                        </div>
                      </div>
                    )}

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>B. IKHTISAR PENGHASILAN NETO</SectionHeader>
                      <QuestionRow
                        number="1.a."
                        text="Apakah Anda menerima penghasilan dalam negeri dari pekerjaan? *"
                        value={answerPekerjaan}
                        onChange={setAnswerPekerjaan}
                      />
                      <QuestionRow
                        number="1.b.1"
                        text="Apakah Anda menerima penghasilan dalam negeri dari usaha dan/atau pekerjaan bebas? *"
                        value={answerUsaha}
                        onChange={setAnswerUsaha}
                      />
                      <QuestionRow
                        number="1.c."
                        text="Apakah Anda menerima penghasilan dalam negeri lainnya? *"
                        value={answerDN}
                        onChange={setAnswerDN}
                      />
                      <QuestionRow
                        number="1.d."
                        text="Apakah Anda menerima penghasilan luar negeri? *"
                        value={answerLN}
                        onChange={setAnswerLN}
                      />

                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
                        <FieldInput
                          label="Penghasilan neto dari pekerjaan"
                          type="number"
                          value={formGaji}
                          onChange={setFormGaji}
                        />
                        <FieldInput
                          label="Penghasilan neto dalam negeri lainnya / sampingan"
                          type="number"
                          value={formSampingan}
                          onChange={(val) => {
                            setFormSampingan(val);
                            setAnswerDN(val > 0 ? 'Ya' : 'Tidak');
                          }}
                        />
                      </div>
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>C. PENGHITUNGAN PAJAK TERUTANG</SectionHeader>
                      <QuestionRow
                        number="2"
                        text="Penghasilan neto setahun (1a+1b+1c+1d)"
                        inputValue={hasilPajak.totalNetto.toLocaleString('id-ID')}
                      />
                      <QuestionRow
                        number="3"
                        text="Apakah terdapat pengurang penghasilan neto seperti kompensasi kerugian atau zakat/sumbangan keagamaan?"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="4"
                        text="Penghasilan neto setelah pengurang penghasilan neto (2-3)"
                        inputValue={hasilPajak.totalNetto.toLocaleString('id-ID')}
                      />

                      <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4 bg-white">
                        <SelectBox
                          label="5. Penghasilan Tidak Kena Pajak"
                          value={String(formPtkpBase)}
                          onChange={(val) => setFormPtkpBase(onlyNumber(val))}
                          options={[
                            { value: '54000000', label: 'TK/0 - Rp 54.000.000' },
                            { value: '58500000', label: 'K/0 - Rp 58.500.000' },
                          ]}
                        />
                        <FieldInput
                          label="Jumlah Tanggungan PTKP"
                          type="number"
                          value={formTanggungan}
                          onChange={(val) => setFormTanggungan(clampTanggungan(val))}
                        />
                        <FieldInput
                          label="Total PTKP"
                          value={hasilPajak.totalPtkp.toLocaleString('id-ID')}
                          readOnly
                        />
                      </div>

                      <QuestionRow
                        number="6"
                        text="Penghasilan Kena Pajak (4-5)"
                        inputValue={currentTaxResult.pkp.toLocaleString('id-ID')}
                      />
                      <QuestionRow
                        number="7"
                        text="PPh Terutang"
                        inputValue={hasilPajak.pajakTerutang.toLocaleString('id-ID')}
                      />
                      <QuestionRow
                        number="8"
                        text="Apakah terdapat pengurang PPh Terutang? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="9"
                        text="PPh Terutang setelah pengurang PPh Terutang (7-8)"
                        inputValue={hasilPajak.pajakTerutang.toLocaleString('id-ID')}
                      />
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>D. KREDIT PAJAK</SectionHeader>
                      <QuestionRow
                        number="10a"
                        text="Apakah terdapat PPh yang telah dipotong/dipungut oleh pihak lain? *"
                        value={answerPotongPihakLain}
                        onChange={setAnswerPotongPihakLain}
                      />
                      <QuestionRow
                        number="10b"
                        text="Angsuran PPh Pasal 25"
                        inputValue="0"
                      />
                      <QuestionRow
                        number="10c"
                        text="STP PPh Pasal 25 (Hanya pokok pajak)"
                        inputValue="0"
                      />
                      <QuestionRow
                        number="10d"
                        text="Apakah Anda menerima pengembalian/pengurangan kredit PPh luar negeri yang telah dikreditkan? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <div className="p-4 bg-white">
                        <FieldInput
                          label="Kredit Pajak PPh Pasal 21 yang sudah dipotong"
                          type="number"
                          value={formKreditPajak}
                          onChange={(val) => {
                            setFormKreditPajak(val);
                            setAnswerPotongPihakLain(val > 0 ? 'Ya' : 'Tidak');
                          }}
                          className="max-w-md"
                        />
                      </div>
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>E. PPh KURANG/LEBIH BAYAR</SectionHeader>
                      <QuestionRow
                        number="11a"
                        text="PPh kurang/lebih bayar (9-10a-10b-10c+10d)"
                        inputValue={hasilPajak.selisih.toLocaleString('id-ID')}
                      />
                      <QuestionRow
                        number="11b"
                        text="Apakah terdapat Surat Keputusan Persetujuan Pengangsuran atau Penundaan Pembayaran Pajak?"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="11c"
                        text="PPh yang masih harus dibayar (11a-11b)"
                        inputValue={currentTaxResult.nominal.toLocaleString('id-ID')}
                      />
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>F. PEMBETULAN (DIISI JIKA STATUS SPT ADALAH PEMBETULAN)</SectionHeader>
                      <QuestionRow
                        number="12a"
                        text="PPh kurang/lebih bayar pada SPT yang dibetulkan"
                        inputValue="0"
                      />
                      <QuestionRow
                        number="12b"
                        text="PPh kurang/lebih bayar karena pembetulan (11a-12a)"
                        inputValue={selectedModelSpt === 'Pembetulan' ? currentTaxResult.nominal.toLocaleString('id-ID') : '0'}
                      />
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>G. PERMOHONAN PENGEMBALIAN PPh LEBIH BAYAR</SectionHeader>
                      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <SelectBox
                          label="PPh lebih bayar pada 11a atau 12b mohon:"
                          value=""
                          onChange={() => {}}
                          placeholder="Silakan Pilih"
                          disabled={currentTaxResult.status !== 'LEBIH BAYAR'}
                          options={[
                            { value: 'Restitusi', label: 'Restitusi' },
                            { value: 'Kompensasi', label: 'Kompensasi' },
                          ]}
                        />
                        <div className="grid grid-cols-1 gap-3">
                          <FieldInput label="Nomor Rekening" value="" readOnly />
                          <FieldInput label="Nama Bank" value="" readOnly />
                          <FieldInput label="Nama Pemilik Rekening" value="" readOnly />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>H. ANGSURAN PPh PASAL 25 TAHUN PAJAK BERIKUTNYA</SectionHeader>
                      <QuestionRow
                        number="13a"
                        text="Apakah Anda hanya menerima penghasilan teratur dan berkewajiban membayar angsuran PPh Pasal 25 Tahun Pajak berikutnya? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="13b"
                        text="Apakah Anda menyusun perhitungan tersendiri angsuran PPh Pasal 25 Tahun Pajak berikutnya? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="13c"
                        text="Apakah Anda membayar angsuran PPh Pasal 25 OPPT Tahun Pajak berikutnya? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>I. PERNYATAAN TRANSAKSI LAINNYA</SectionHeader>
                      <QuestionRow
                        number="14a"
                        text="Harta pada akhir Tahun Pajak * (Isi Lampiran 1 Bagian A, lalu ke pertanyaan selanjutnya)"
                        inputValue={totalHarta.toLocaleString('id-ID')}
                      />
                      <QuestionRow
                        number="14b"
                        text="Apakah Anda memiliki utang pada akhir tahun pajak? *"
                        value={answerUtang}
                        onChange={setAnswerUtang}
                      />
                      <QuestionRow
                        number="14c"
                        text="Apakah Anda menerima penghasilan yang dikenakan pajak penghasilan bersifat final? *"
                        value={answerPPhFinal}
                        onChange={setAnswerPPhFinal}
                      />
                      <QuestionRow
                        number="14d"
                        text="Apakah Anda menerima penghasilan yang tidak termasuk objek pajak? *"
                        value={answerNonObjek}
                        onChange={setAnswerNonObjek}
                      />
                      <QuestionRow
                        number="14e"
                        text="Apakah Anda melaporkan biaya penyusutan dan/atau amortisasi fiskal? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="14f"
                        text="Apakah Anda melaporkan biaya entertainment, promosi, natura/kenikmatan, dan piutang yang nyata-nyata tidak dapat ditagih? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="14g"
                        text="Apakah Anda menerima dividen dan/atau penghasilan lain dari luar negeri dan melaporkannya sebagai penghasilan tidak termasuk objek pajak? *"
                        value="Tidak"
                        onChange={() => {}}
                      />
                      <QuestionRow
                        number="14h"
                        text="Kelebihan PPh Final atas penghasilan dari usaha dengan peredaran bruto tertentu yang dapat dimintakan pengembalian."
                        inputValue="0"
                      />
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>J. LAMPIRAN TAMBAHAN</SectionHeader>
                      <div className="p-4 space-y-4">
                        {[
                          ['a. Laporan Keuangan/Laporan Keuangan yang telah diaudit', 'Tidak, jenis pembukuan adalah Pembukuan Sederhana.'],
                          ['b. Bukti pembayaran zakat/sumbangan keagamaan', 'Tidak ada berkas yang perlu dilampirkan'],
                          ['c. Bukti pemotongan/pemungutan sehubungan dengan kredit pajak luar negeri', 'Tidak ada berkas yang perlu dilampirkan'],
                          ['d. Surat kuasa khusus', ''],
                          ['e. Dokumen lainnya', ''],
                        ].map(([label, message]) => (
                          <div key={label} className="grid grid-cols-1 md:grid-cols-[320px_180px_1fr] gap-4 items-center">
                            <div className="text-[12px] text-slate-600">{label}</div>
                            <RadioPair value="Tidak" onChange={() => {}} />
                            {message ? (
                              <div className="rounded bg-cyan-100 text-cyan-800 px-3 py-2 inline-flex items-center gap-2">
                                <Info size={14} />
                                {message}
                              </div>
                            ) : (
                              <div />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-[#dfe5ee]">
                      <SectionHeader>K. PERNYATAAN</SectionHeader>
                      <div className="p-4 space-y-4">
                        <div
                          className={`inline-flex items-center gap-2 rounded px-3 py-2 ${
                            currentTaxResult.status === 'NIHIL'
                              ? 'bg-cyan-100 text-cyan-800'
                              : currentTaxResult.status === 'KURANG BAYAR'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          <Info size={15} />
                          Status SPT : {currentTaxResult.status}
                        </div>

                        <label className="flex items-start gap-2 text-[12px] text-slate-700 italic font-semibold">
                          <input type="checkbox" defaultChecked className="mt-1 accent-blue-600" />
                          Dengan menyadari sepenuhnya akan segala akibatnya termasuk sanksi-sanksi sesuai dengan ketentuan perundang-undangan yang berlaku, saya menyatakan bahwa apa yang telah saya beritahukan di atas beserta lampirannya adalah benar, lengkap, dan jelas.
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3">
                          <div>Penandatangan</div>
                          <div className="flex gap-6">
                            <label className="flex items-center gap-2">
                              <input type="radio" checked readOnly className="accent-blue-600" />
                              Wajib Pajak
                            </label>
                            <label className="flex items-center gap-2 text-slate-400">
                              <input type="radio" disabled />
                              Kuasa Wajib Pajak
                            </label>
                          </div>
                          <div>NPWP</div>
                          <FieldInput value={activeCase?.npwp || ''} readOnly />
                          <div>Nama Lengkap</div>
                          <FieldInput value={activeCase?.shortName || ''} readOnly />
                          <div>Tanda Tangan</div>
                          <FieldInput value="" readOnly />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={handleSimpanKonsep}
                        className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"
                      >
                        <Save size={15} />
                        Simpan Konsep
                      </button>
                      <button
                        onClick={handleBatalKonsep}
                        className="h-10 px-5 rounded bg-white border border-rose-200 text-rose-600 font-bold flex items-center gap-2"
                      >
                        <X size={15} />
                        Batalkan
                      </button>
                      <button
                        onClick={handleBayarDanLapor}
                        className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"
                      >
                        <CreditCard size={15} />
                        Bayar dan Lapor
                      </button>
                      <button
                        onClick={() => setCurrentScreen('dashboard')}
                        className="h-10 px-5 rounded bg-white border text-[#17245c] font-bold flex items-center gap-2"
                      >
                        <ArrowLeft size={15} />
                        Pergi ke pencarian
                      </button>
                    </div>
                  </div>
                )}

                {!isBadanSpt && activeTab === 'L-1' && (
                  <div className="p-6 space-y-4">
                    <ul className="list-disc pl-8 text-[14px] text-slate-600 mb-3">
                      <li>A. HARTA PADA AKHIR TAHUN PAJAK</li>
                      <li>B. UTANG PADA AKHIR TAHUN PAJAK</li>
                      <li>C. DAFTAR ANGGOTA KELUARGA YANG MENJADI TANGGUNGAN</li>
                      <li>D. PENGHASILAN NETO DALAM NEGERI DARI PEKERJAAN</li>
                      <li>E. DAFTAR BUKTI PEMOTONGAN/PEMUNGUTAN PPh</li>
                    </ul>

                    <DataGridCard title="A. HARTA PADA AKHIR TAHUN PAJAK" footerText={`JUMLAH HARTA PADA AKHIR TAHUN PAJAK ${totalHarta.toLocaleString('id-ID')}`}>
                      <div className="p-3 bg-white grid grid-cols-1 md:grid-cols-4 gap-3 border-b">
                        <FieldInput label="Kas dan Setara Kas" type="number" value={formHartaKas} onChange={setFormHartaKas} />
                        <FieldInput label="Investasi/Sekuritas" type="number" value={formHartaInvestasi} onChange={setFormHartaInvestasi} />
                        <FieldInput label="Harta Bergerak" type="number" value={formHartaBergerak} onChange={setFormHartaBergerak} />
                        <FieldInput label="Harta Tidak Bergerak" type="number" value={formHartaTidakBergerak} onChange={setFormHartaTidakBergerak} />
                      </div>
                      <YellowTable columns={['DESKRIPSI', 'HARGA PEROLEHAN', 'NILAI SAAT INI']}>
                        <tr>
                          <td className="border p-3 font-bold text-right">JUMLAH HARTA PADA AKHIR TAHUN PAJAK</td>
                          <td className="border p-3 text-right">{totalHarta.toLocaleString('id-ID')}</td>
                          <td className="border p-3 text-right">{totalHarta.toLocaleString('id-ID')}</td>
                        </tr>
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="1. KAS DAN SETARA KAS" toolbar footerText={`JUMLAH TABEL 1 ${formHartaKas.toLocaleString('id-ID')}`}>
                      <YellowTable columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'NOMOR AKUN', 'ATAS NAMA', 'NAMA BANK/INSTITUSI', 'LOKASI HARTA', 'NILAI']}>
                        <FilterRow columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'NOMOR AKUN', 'ATAS NAMA', 'NAMA BANK/INSTITUSI', 'LOKASI HARTA', 'NILAI']} />
                        {formHartaKas > 0 ? (
                          <tr>
                            <td className="border p-2 text-center"><input type="checkbox" /></td>
                            <td className="border p-2 text-center">1</td>
                            <td className="border p-2 text-center">011</td>
                            <td className="border p-2">Tabungan</td>
                            <td className="border p-2">-</td>
                            <td className="border p-2">{activeCase?.shortName}</td>
                            <td className="border p-2">Bank Simulasi</td>
                            <td className="border p-2">Indonesia</td>
                            <td className="border p-2 text-right">{formHartaKas.toLocaleString('id-ID')}</td>
                          </tr>
                        ) : (
                          <EmptyTableBody colSpan={9} />
                        )}
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="2. PIUTANG" toolbar footerText="JUMLAH TABEL 2 0">
                      <YellowTable columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'LOKASI PENERIMA PINJAMAN', 'NIK/NPWP PENERIMA PINJAMAN', 'NAMA PENERIMA PINJAMAN', 'TAHUN DIBERIKAN', 'SALDO']}>
                        <FilterRow columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'LOKASI PENERIMA PINJAMAN', 'NIK/NPWP PENERIMA PINJAMAN', 'NAMA PENERIMA PINJAMAN', 'TAHUN DIBERIKAN', 'SALDO']} />
                        <EmptyTableBody colSpan={9} />
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="3. INVESTASI/SEKURITAS" toolbar footerText={`JUMLAH TABEL 3 ${formHartaInvestasi.toLocaleString('id-ID')}`}>
                      <YellowTable columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'LOKASI HARTA', 'NPWP BANK/INSTITUSI/PENERIMA INVESTASI', 'NAMA BANK/INSTITUSI/PENERIMA INVESTASI', 'NOMOR AKUN', 'NILAI']}>
                        <FilterRow columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'LOKASI HARTA', 'NPWP BANK/INSTITUSI/PENERIMA INVESTASI', 'NAMA BANK/INSTITUSI/PENERIMA INVESTASI', 'NOMOR AKUN', 'NILAI']} />
                        <EmptyTableBody colSpan={9} />
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="4. HARTA BERGERAK" toolbar footerText={`JUMLAH TABEL 4 ${formHartaBergerak.toLocaleString('id-ID')}`}>
                      <YellowTable columns={['TINDAKAN', 'NO.', 'KODE', 'TIPE', 'MERK/MODEL', 'NOMOR POLISI/REGISTRASI', 'KEPEMILIKAN', 'NIK/NPWP PEMILIK', 'NILAI']}>
                        <FilterRow columns={['TINDAKAN', 'NO.', 'KODE', 'TIPE', 'MERK/MODEL', 'NOMOR POLISI/REGISTRASI', 'KEPEMILIKAN', 'NIK/NPWP PEMILIK', 'NILAI']} />
                        <EmptyTableBody colSpan={9} />
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="5. HARTA TIDAK BERGERAK (TERMASUK TANAH BANGUNAN)" toolbar footerText={`JUMLAH TABEL 5 ${formHartaTidakBergerak.toLocaleString('id-ID')}`}>
                      <YellowTable columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'LOKASI HARTA', 'UKURAN PROPERTI - TANAH', 'UKURAN PROPERTI - BANGUNAN', 'SUMBER KEPEMILIKAN', 'NILAI']}>
                        <FilterRow columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'LOKASI HARTA', 'UKURAN PROPERTI - TANAH', 'UKURAN PROPERTI - BANGUNAN', 'SUMBER KEPEMILIKAN', 'NILAI']} />
                        <EmptyTableBody colSpan={9} />
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="6. HARTA LAINNYA" toolbar footerText="JUMLAH TABEL 6 0">
                      <YellowTable columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'TAHUN PEROLEHAN', 'BUKTI KEPEMILIKAN/NOMOR AKUN', 'INFORMASI TAMBAHAN', 'HARGA PEROLEHAN', 'NILAI']}>
                        <FilterRow columns={['TINDAKAN', 'NO.', 'KODE', 'DESKRIPSI', 'TAHUN PEROLEHAN', 'BUKTI KEPEMILIKAN/NOMOR AKUN', 'INFORMASI TAMBAHAN', 'HARGA PEROLEHAN', 'NILAI']} />
                        <EmptyTableBody colSpan={9} />
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="7. IKHTISAR HARTA">
                      <YellowTable columns={['DESKRIPSI', 'HARGA PEROLEHAN', 'NILAI SAAT INI']}>
                        <tr>
                          <td className="border p-3 font-bold text-right">JUMLAH HARTA PADA AKHIR TAHUN PAJAK</td>
                          <td className="border p-3 text-right">{totalHarta.toLocaleString('id-ID')}</td>
                          <td className="border p-3 text-right">{totalHarta.toLocaleString('id-ID')}</td>
                        </tr>
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="B. UTANG PADA AKHIR TAHUN PAJAK" footerText={`JUMLAH BAGIAN B ${formUtang.toLocaleString('id-ID')}`}>
                      <div className="p-3 bg-white max-w-md">
                        <FieldInput
                          label="Saldo Utang Akhir Tahun Pajak"
                          type="number"
                          value={formUtang}
                          onChange={(val) => {
                            setFormUtang(val);
                            setAnswerUtang(val > 0 ? 'Ya' : 'Tidak');
                          }}
                        />
                      </div>
                      <YellowTable columns={['NO.', 'KODE', 'DESKRIPSI', 'KREDITUR NOMOR IDENTITAS WP', 'KREDITUR NAMA', 'NEGARA KREDITUR', 'TAHUN PINJAMAN', 'SALDO', 'KETERANGAN']}>
                        <FilterRow columns={['NO.', 'KODE', 'DESKRIPSI', 'KREDITUR NOMOR IDENTITAS WP', 'KREDITUR NAMA', 'NEGARA KREDITUR', 'TAHUN PINJAMAN', 'SALDO', 'KETERANGAN']} />
                        {formUtang > 0 ? (
                          <tr>
                            <td className="border p-2 text-center">1</td>
                            <td className="border p-2 text-center">101</td>
                            <td className="border p-2">Utang Lainnya</td>
                            <td className="border p-2">-</td>
                            <td className="border p-2">Kreditur Simulasi</td>
                            <td className="border p-2">Indonesia</td>
                            <td className="border p-2 text-center">2025</td>
                            <td className="border p-2 text-right">{formUtang.toLocaleString('id-ID')}</td>
                            <td className="border p-2">Dilaporkan</td>
                          </tr>
                        ) : (
                          <EmptyTableBody colSpan={9} text="Tidak ada data untuk ditampilkan." />
                        )}
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="C. DAFTAR ANGGOTA KELUARGA YANG MENJADI TANGGUNGAN">
                      <YellowTable columns={['NO.', 'NAMA', 'NIK', 'TANGGAL LAHIR', 'HUBUNGAN DENGAN WAJIB PAJAK', 'PEKERJAAN']}>
                        <FilterRow columns={['NO.', 'NAMA', 'NIK', 'TANGGAL LAHIR', 'HUBUNGAN DENGAN WAJIB PAJAK', 'PEKERJAAN']} />
                        {formTanggungan > 0 ? (
                          Array.from({ length: clampTanggungan(formTanggungan) }).map((_, index) => (
                            <tr key={index}>
                              <td className="border p-2 text-center">{index + 1}</td>
                              <td className="border p-2">Tanggungan {index + 1}</td>
                              <td className="border p-2">-</td>
                              <td className="border p-2">-</td>
                              <td className="border p-2">Anak</td>
                              <td className="border p-2">Pelajar</td>
                            </tr>
                          ))
                        ) : (
                          <EmptyTableBody colSpan={6} text="Tidak ada data untuk ditampilkan." />
                        )}
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="D. PENGHASILAN NETO DALAM NEGERI DARI PEKERJAAN" footerText={`JUMLAH BAGIAN D ${formGaji.toLocaleString('id-ID')}`}>
                      <YellowTable columns={['TINDAKAN', 'NO.', 'NAMA PEMBERI KERJA', 'NOMOR IDENTITAS PEMBERI KERJA', 'PENGHASILAN BRUTO', 'PENGURANG PENGHASILAN BRUTO/BIAYA', 'PENGHASILAN NETO']}>
                        <FilterRow columns={['TINDAKAN', 'NO.', 'NAMA PEMBERI KERJA', 'NOMOR IDENTITAS PEMBERI KERJA', 'PENGHASILAN BRUTO', 'PENGURANG PENGHASILAN BRUTO/BIAYA', 'PENGHASILAN NETO']} />
                        {formGaji > 0 ? (
                          <tr>
                            <td className="border p-2 text-center"><input type="checkbox" /></td>
                            <td className="border p-2 text-center">1</td>
                            <td className="border p-2">PT Pemberi Kerja Simulasi</td>
                            <td className="border p-2">01.234.567.8-999.000</td>
                            <td className="border p-2 text-right">{formGaji.toLocaleString('id-ID')}</td>
                            <td className="border p-2 text-right">0</td>
                            <td className="border p-2 text-right">{formGaji.toLocaleString('id-ID')}</td>
                          </tr>
                        ) : (
                          <EmptyTableBody colSpan={7} />
                        )}
                      </YellowTable>
                    </DataGridCard>

                    <DataGridCard title="E. DAFTAR BUKTI PEMOTONGAN/PEMUNGUTAN PPh" footerText="JUMLAH BAGIAN E 0">
                      <YellowTable columns={['NO.', 'NAMA PEMOTONG/PEMUNGUT PPh', 'NPWP PEMOTONG/PEMUNGUT PPh', 'NOMOR BUKTI POTONGAN/PEMUNGUTAN', 'TANGGAL BUKTI PEMOTONGAN/PEMUNGUTAN', 'JENIS PAJAK', 'PENGHASILAN BRUTO', 'PPh YANG DIPOTONG']}>
                        <FilterRow columns={['NO.', 'NAMA PEMOTONG/PEMUNGUT PPh', 'NPWP PEMOTONG/PEMUNGUT PPh', 'NOMOR BUKTI POTONGAN/PEMUNGUTAN', 'TANGGAL BUKTI PEMOTONGAN/PEMUNGUTAN', 'JENIS PAJAK', 'PENGHASILAN BRUTO', 'PPh YANG DIPOTONG']} />
                        {formKreditPajak > 0 ? (
                          <tr>
                            <td className="border p-2 text-center">1</td>
                            <td className="border p-2">PT Pemberi Kerja Simulasi</td>
                            <td className="border p-2">01.234.567.8-999.000</td>
                            <td className="border p-2">BP-2025-0001</td>
                            <td className="border p-2">31-12-2025</td>
                            <td className="border p-2">PPh 21</td>
                            <td className="border p-2 text-right">{formGaji.toLocaleString('id-ID')}</td>
                            <td className="border p-2 text-right">{formKreditPajak.toLocaleString('id-ID')}</td>
                          </tr>
                        ) : (
                          <EmptyTableBody colSpan={8} />
                        )}
                      </YellowTable>
                    </DataGridCard>

                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => setActiveTab('Induk')}
                        className="h-10 px-5 rounded bg-white border text-[#17245c] font-bold flex items-center gap-2"
                      >
                        <ArrowLeft size={15} />
                        Kembali ke Induk
                      </button>
                      <button
                        onClick={handleSimpanKonsep}
                        className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"
                      >
                        <Save size={15} />
                        Simpan Konsep
                      </button>
                      <button
                        onClick={handleBatalKonsep}
                        className="h-10 px-5 rounded bg-white border border-rose-200 text-rose-600 font-bold flex items-center gap-2"
                      >
                        <X size={15} />
                        Batalkan
                      </button>
                      <button
                        onClick={handleBayarDanLapor}
                        className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"
                      >
                        <CreditCard size={15} />
                        Bayar dan Lapor
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL LOADING POSTING */}
      {isPosting && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#17245c] text-white p-4 font-bold">Posting SPT</div>
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto h-14 w-14 rounded-full bg-blue-50 text-[#17245c] flex items-center justify-center">
                <RefreshCw size={28} className="animate-spin" />
              </div>
              <div>
                <div className="font-black text-slate-900">Mohon tunggu</div>
                <p className="text-[12px] text-slate-500 mt-1">{postingStep || 'Coretax sedang memproses data SPT Anda.'}</p>
              </div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full w-2/3 bg-[#ffd542] animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL XML MONITORING */}
      {showXmlModal && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-slate-600 text-white p-4 font-bold flex justify-between items-center">
              XML Monitoring
              <button onClick={() => setShowXmlModal(false)}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4 text-[12px]">
              <div className="rounded-xl border bg-slate-50 p-4">
                <div className="font-black text-slate-900">Status Payload SPT</div>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <div className="rounded bg-white border p-3"><div className="text-slate-400">Form</div><div className="font-mono font-bold">1770S-OP-2025</div></div>
                  <div className="rounded bg-white border p-3"><div className="text-slate-400">Status XML</div><div className="font-bold text-blue-700">{returnLifecycle === 'DRAFT' ? 'Belum diposting' : 'Generated'}</div></div>
                  <div className="rounded bg-white border p-3"><div className="text-slate-400">NPWP/NIK</div><div className="font-mono font-bold">{activeCase?.npwp}</div></div>
                  <div className="rounded bg-white border p-3"><div className="text-slate-400">Timestamp</div><div className="font-mono font-bold">2026-06-07 20:38:21</div></div>
                </div>
              </div>
              <pre className="max-h-56 overflow-auto rounded-xl bg-slate-950 text-emerald-300 p-4 text-[11px]">{`<ReturnSheet type="SPT_OP" year="2025">
  <Taxpayer>${activeCase?.shortName || '-'}</Taxpayer>
  <Status>${lifecycleMeta.label}</Status>
  <TaxDue>${hasilPajak.pajakTerutang}</TaxDue>
  <Final>${currentTaxResult.status}</Final>
</ReturnSheet>`}</pre>
            </div>
          </div>
        </div>
      )}

      {/* MODAL REVIEW SPT */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-[#17245c] text-white p-4 font-bold flex justify-between items-center">
              Review Ringkasan SPT
              <button onClick={() => setShowReviewModal(false)}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4 text-[12px]">
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900">
                Pastikan seluruh data pada Induk dan L-1 sudah benar. Setelah lanjut, sistem akan meminta tanda tangan digital.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded-xl border p-3"><div className="text-slate-400">Total Penghasilan Neto</div><div className="font-black text-lg">{formatRupiah(hasilPajak.totalNetto)}</div></div>
                <div className="rounded-xl border p-3"><div className="text-slate-400">PTKP</div><div className="font-black text-lg">{formatRupiah(hasilPajak.totalPtkp)}</div></div>
                <div className="rounded-xl border p-3"><div className="text-slate-400">Pajak Terutang</div><div className="font-black text-lg">{formatRupiah(hasilPajak.pajakTerutang)}</div></div>
                <div className="rounded-xl border p-3"><div className="text-slate-400">Status Akhir</div><div className="font-black text-lg text-[#17245c]">{currentTaxResult.status} - {formatRupiah(currentTaxResult.nominal)}</div></div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setShowReviewModal(false)} className="h-10 px-5 rounded border font-bold">Kembali</button>
                <button onClick={handleReviewLanjut} className="h-10 px-5 rounded bg-[#17245c] text-white font-bold flex items-center gap-2"><Shield size={15} /> Lanjut Tanda Tangan</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL TANDA TANGAN DIGITAL */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#17245c] text-white p-4 font-bold flex justify-between items-center">
              Tanda Tangan Digital
              <button onClick={() => setShowSignatureModal(false)}><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4 text-[12px]">
              <div className="rounded-xl bg-slate-50 border p-4">
                <div className="font-black text-slate-900">Kode Verifikasi</div>
                <p className="mt-1 text-slate-500">Masukkan passphrase simulasi untuk menyampaikan SPT.</p>
                <input type="password" value="123456" readOnly className="mt-3 w-full h-10 rounded border px-3 font-mono bg-white" />
              </div>
              <label className="flex gap-2 items-start text-slate-600">
                <input type="checkbox" checked readOnly className="mt-0.5" />
                Saya menyatakan data SPT sudah benar, lengkap, dan jelas sesuai skenario praktikum.
              </label>
              <button onClick={handleTandaTanganDigital} className="w-full h-10 rounded bg-[#17245c] text-white font-bold flex items-center justify-center gap-2">
                <Send size={15} /> Kirim SPT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL BAYAR */}
      {showBayarModal && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-[#17245c] text-white p-4 font-bold flex justify-between items-center">
              SPT Menunggu Pembayaran
              <button onClick={() => setShowBayarModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <div className="text-[12px] text-amber-800">Status SPT Anda</div>
                <div className="text-xl font-black text-amber-900">{currentTaxResult.status}</div>
                <div className="mt-2 text-2xl font-black text-slate-900">{formatRupiah(currentTaxResult.nominal)}</div>
              </div>
              <div className="space-y-2 text-[12px]">
                <div className="flex justify-between border-b pb-2">
                  <span>Kode Billing</span>
                  <span className="font-mono font-bold">411125-100-2025</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Masa Pajak</span>
                  <span>Januari - Desember 2025</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Nama WP</span>
                  <span className="font-bold">{activeCase?.shortName}</span>
                </div>
              </div>
              <button
                onClick={handleBayarLaluLapor}
                className="w-full h-10 rounded bg-emerald-600 text-white font-bold hover:bg-emerald-700"
              >
                Bayar Simulasi dan Terbitkan BPE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DITOLAK */}
      {showRejectedModal && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-rose-600 text-white p-4 font-bold flex justify-between items-center">
              SPT Ditolak Sistem
              <button onClick={() => setShowRejectedModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="p-5 space-y-4 text-center">
              <div className="mx-auto h-14 w-14 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center">
                <AlertTriangle size={30} />
              </div>
              <div>
                <div className="font-black text-slate-900 text-lg">Data belum sesuai kunci kasus</div>
                <p className="text-[12px] text-slate-500 mt-2 leading-relaxed">
                  Periksa lagi PTKP/tanggungan, penghasilan sampingan, kredit pajak, dan status SPT. Untuk kasus tertentu, data e-Bupot memang sengaja dibuat salah agar mahasiswa melakukan koreksi.
                </p>
              </div>
              <button
                onClick={() => setShowRejectedModal(false)}
                className="w-full h-10 rounded bg-[#17245c] text-white font-bold"
              >
                Kembali Perbaiki SPT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL RESI */}
      {showResiModal && (
        <div className="fixed inset-0 bg-slate-950/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-emerald-600 text-white p-4 font-bold flex justify-between items-center">
              Bukti Penerimaan Elektronik
              <button onClick={() => setShowResiModal(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="p-6 text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <CheckCircle size={34} />
              </div>
              <div>
                <div className="font-black text-slate-900 text-lg">SPT Berhasil Dilaporkan</div>
                <p className="text-[12px] text-slate-500 mt-1">
                  Jawaban fiskal Anda sudah sesuai dengan kunci validasi pengajar.
                </p>
              </div>
              <div className="rounded-xl border bg-slate-50 p-4 text-left text-[12px] space-y-2">
                <div className="flex justify-between border-b pb-2">
                  <span>Kode BPE</span>
                  <span className="font-mono font-bold text-[#17245c]">{bpeCode || 'BPE-CT-2026-000000'}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Nama WP</span>
                  <span className="font-bold">{activeCase?.shortName}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span>Status SPT</span>
                  <span className="font-bold text-emerald-700">{currentTaxResult.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nominal</span>
                  <span className="font-bold">{formatRupiah(currentTaxResult.nominal)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowResiModal(false);
                  setCurrentScreen('dashboard');
                  setSptFolder('SPT Dilaporkan');
                }}
                className="w-full h-10 rounded bg-[#17245c] text-white font-bold"
              >
                Selesai Praktikum
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
