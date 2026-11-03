'use client';

import { useState, useMemo } from 'react';
import { 
  Car, 
  Users, 
  Wrench, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RotateCcw,
  Clock,
  FileText
} from 'lucide-react';
import { useLanguage } from '@/i18n';

// ============================================================================
// Types
// ============================================================================

interface Vehicle {
  id: string;
  plate: string;
  model: string;
  category: 'Caminhão' | 'Van' | 'Utilitário' | 'Passeio';
  categoryEn: 'Truck' | 'Van' | 'Utility' | 'Sedan';
  year: number;
  driver: string;
  driverPhone: string;
  status: 'active' | 'maintenance' | 'inactive';
  mileage: number;
  lastService: string;
  nextService: string;
}

interface Driver {
  id: string;
  name: string;
  cnh: string;
  cnhCategory: string;
  phone: string;
  assignedVehicle: string;
  status: 'active' | 'on_trip' | 'off_duty';
  experienceYears: number;
  tripsCompleted: number;
}

interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  plate: string;
  model: string;
  serviceType: string;
  serviceTypeEn: string;
  date: string;
  cost: string;
  workshop: string;
  status: 'completed' | 'in_progress' | 'scheduled';
  notes: string;
  notesEn: string;
}

// ============================================================================
// Initial Mock Datasets
// ============================================================================

const INITIAL_VEHICLES: Vehicle[] = [
  {
    id: 'V-101',
    plate: 'BRA-2E19',
    model: 'Volvo FH 540 Globetrotter',
    category: 'Caminhão',
    categoryEn: 'Truck',
    year: 2023,
    driver: 'Carlos Eduardo Silva',
    driverPhone: '(11) 98765-4321',
    status: 'active',
    mileage: 78420,
    lastService: '15/09/2026',
    nextService: '15/12/2026',
  },
  {
    id: 'V-102',
    plate: 'RQN-4F82',
    model: 'Mercedes-Benz Sprinter 416',
    category: 'Van',
    categoryEn: 'Van',
    year: 2024,
    driver: 'Marcos Vinicius Santos',
    driverPhone: '(11) 97654-3210',
    status: 'active',
    mileage: 32150,
    lastService: '02/10/2026',
    nextService: '02/01/2027',
  },
  {
    id: 'V-103',
    plate: 'GHJ-8H11',
    model: 'Scania R 450 Highline',
    category: 'Caminhão',
    categoryEn: 'Truck',
    year: 2022,
    driver: 'Roberto Almeida',
    driverPhone: '(19) 99123-4567',
    status: 'maintenance',
    mileage: 142800,
    lastService: '20/07/2026',
    nextService: '25/10/2026',
  },
  {
    id: 'V-104',
    plate: 'FTY-9J44',
    model: 'Toyota Hilux 4x4 D-4D',
    category: 'Utilitário',
    categoryEn: 'Utility',
    year: 2023,
    driver: 'Fernando Guimarães',
    driverPhone: '(11) 98234-5678',
    status: 'active',
    mileage: 49200,
    lastService: '12/08/2026',
    nextService: '12/11/2026',
  },
  {
    id: 'V-105',
    plate: 'KLP-3M22',
    model: 'Volkswagen Constellation 24.280',
    category: 'Caminhão',
    categoryEn: 'Truck',
    year: 2021,
    driver: 'André Luiz Souza',
    driverPhone: '(11) 99876-5432',
    status: 'active',
    mileage: 189400,
    lastService: '05/09/2026',
    nextService: '05/12/2026',
  },
  {
    id: 'V-106',
    plate: 'BVC-7K90',
    model: 'Ford Transit 350L',
    category: 'Van',
    categoryEn: 'Van',
    year: 2020,
    driver: 'Aguardando Atribuição',
    driverPhone: '—',
    status: 'inactive',
    mileage: 112000,
    lastService: '10/05/2026',
    nextService: '10/08/2026',
  },
];

const INITIAL_DRIVERS: Driver[] = [
  {
    id: 'MOT-01',
    name: 'Carlos Eduardo Silva',
    cnh: '054819283-E',
    cnhCategory: 'E (Pesados)',
    phone: '(11) 98765-4321',
    assignedVehicle: 'BRA-2E19 • Volvo FH 540',
    status: 'on_trip',
    experienceYears: 14,
    tripsCompleted: 432,
  },
  {
    id: 'MOT-02',
    name: 'Marcos Vinicius Santos',
    cnh: '038291048-D',
    cnhCategory: 'D (Passageiros/Van)',
    phone: '(11) 97654-3210',
    assignedVehicle: 'RQN-4F82 • MB Sprinter 416',
    status: 'active',
    experienceYears: 8,
    tripsCompleted: 260,
  },
  {
    id: 'MOT-03',
    name: 'Roberto Almeida',
    cnh: '029104829-E',
    cnhCategory: 'E (Pesados)',
    phone: '(19) 99123-4567',
    assignedVehicle: 'GHJ-8H11 • Scania R 450',
    status: 'off_duty',
    experienceYears: 18,
    tripsCompleted: 610,
  },
  {
    id: 'MOT-04',
    name: 'Fernando Guimarães',
    cnh: '049182741-B',
    cnhCategory: 'B (Utilitários)',
    phone: '(11) 98234-5678',
    assignedVehicle: 'FTY-9J44 • Toyota Hilux',
    status: 'on_trip',
    experienceYears: 6,
    tripsCompleted: 185,
  },
  {
    id: 'MOT-05',
    name: 'André Luiz Souza',
    cnh: '018472910-E',
    cnhCategory: 'E (Pesados)',
    phone: '(11) 99876-5432',
    assignedVehicle: 'KLP-3M22 • VW Constellation',
    status: 'on_trip',
    experienceYears: 11,
    tripsCompleted: 340,
  },
];

const INITIAL_MAINTENANCE: MaintenanceRecord[] = [
  {
    id: 'MNT-401',
    vehicleId: 'V-103',
    plate: 'GHJ-8H11',
    model: 'Scania R 450 Highline',
    serviceType: 'Revisão do Sistema de Freios e ABS',
    serviceTypeEn: 'Braking System & ABS Overhaul',
    date: '28/10/2026',
    cost: 'R$ 4.250,00',
    workshop: 'Scania AutoTech Campinas',
    status: 'in_progress',
    notes: 'Substituição das pastilhas, sangria de fluido e calibração dos sensores de pressão.',
    notesEn: 'Pads replacement, fluid flushing, and pressure sensor recalibration.',
  },
  {
    id: 'MNT-400',
    vehicleId: 'V-101',
    plate: 'BRA-2E19',
    model: 'Volvo FH 540',
    serviceType: 'Troca de Óleo e Filtros dos Motores',
    serviceTypeEn: 'Synthetic Oil & Filters Replacement',
    date: '15/09/2026',
    cost: 'R$ 2.180,00',
    workshop: 'Volvo Dibran SP',
    status: 'completed',
    notes: 'Óleo sintético 10W40, filtro separador de água e filtro de cabine substituídos.',
    notesEn: 'Synthetic oil 10W40, fuel water separator and cabin filter replaced.',
  },
  {
    id: 'MNT-399',
    vehicleId: 'V-102',
    plate: 'RQN-4F82',
    model: 'MB Sprinter 416',
    serviceType: 'Alinhamento e Geometria 3D',
    serviceTypeEn: '3D Wheel Alignment & Balancing',
    date: '02/10/2026',
    cost: 'R$ 680,00',
    workshop: 'Centro Automotivo Dpaschoal',
    status: 'completed',
    notes: 'Alinhamento a laser dos dois eixos e rodízio preventivo de pneus.',
    notesEn: 'Dual-axle laser alignment and preventative tire rotation.',
  },
  {
    id: 'MNT-402',
    vehicleId: 'V-105',
    plate: 'KLP-3M22',
    model: 'VW Constellation 24.280',
    serviceType: 'Revisão Periódica dos 190.000 km',
    serviceTypeEn: '190,000 km Scheduled Inspection',
    date: '05/12/2026',
    cost: 'R$ 3.400,00',
    workshop: 'VW Caminhões Tietê',
    status: 'scheduled',
    notes: 'Inspeção completa de suspensão pneumática, transmissão e arrefecimento.',
    notesEn: 'Full inspection of air suspension, transmission, and cooling circuits.',
  },
];

// ============================================================================
// Fleet Management Component
// ============================================================================

export default function FleetManagementDemo() {
  const { locale } = useLanguage();

  const [activeTab, setActiveTab] = useState<'vehicles' | 'drivers' | 'maintenance'>('vehicles');
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(INITIAL_MAINTENANCE);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceRecord | null>(null);

  // Reset simulator
  const handleReset = () => {
    setVehicles(INITIAL_VEHICLES);
    setDrivers(INITIAL_DRIVERS);
    setMaintenance(INITIAL_MAINTENANCE);
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedVehicle(null);
    setSelectedDriver(null);
    setSelectedMaintenance(null);
  };

  // Switch tab helper
  const handleTabChange = (tab: 'vehicles' | 'drivers' | 'maintenance') => {
    setActiveTab(tab);
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedVehicle(null);
    setSelectedDriver(null);
    setSelectedMaintenance(null);
  };

  // Filtered vehicles
  const filteredVehicles = useMemo(() => {
    return vehicles.filter((v) => {
      const matchesSearch =
        v.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.driver.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [vehicles, searchQuery, statusFilter]);

  // Filtered drivers
  const filteredDrivers = useMemo(() => {
    return drivers.filter((d) => {
      const matchesSearch =
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.cnh.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.assignedVehicle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [drivers, searchQuery, statusFilter]);

  // Filtered maintenance
  const filteredMaintenance = useMemo(() => {
    return maintenance.filter((m) => {
      const matchesSearch =
        m.plate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.workshop.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [maintenance, searchQuery, statusFilter]);

  // Vehicle KPI stats
  const vehicleStats = useMemo(() => {
    const total = vehicles.length;
    const active = vehicles.filter((v) => v.status === 'active').length;
    const maint = vehicles.filter((v) => v.status === 'maintenance').length;
    const inactive = vehicles.filter((v) => v.status === 'inactive').length;
    return { total, active, maint, inactive };
  }, [vehicles]);

  // Driver KPI stats
  const driverStats = useMemo(() => {
    const total = drivers.length;
    const onTrip = drivers.filter((d) => d.status === 'on_trip').length;
    const ready = drivers.filter((d) => d.status === 'active').length;
    const offDuty = drivers.filter((d) => d.status === 'off_duty').length;
    return { total, onTrip, ready, offDuty };
  }, [drivers]);

  // Maintenance KPI stats
  const maintenanceStats = useMemo(() => {
    const total = maintenance.length;
    const inProgress = maintenance.filter((m) => m.status === 'in_progress').length;
    const scheduled = maintenance.filter((m) => m.status === 'scheduled').length;
    const completed = maintenance.filter((m) => m.status === 'completed').length;
    return { total, inProgress, scheduled, completed };
  }, [maintenance]);

  return (
    <div className="w-full rounded-2xl border border-[#27272A] bg-[#111114] text-[#FAFAFA] shadow-2xl overflow-hidden">
      {/* Top Bar Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#27272A] bg-[#0E0E11] px-4 py-3 text-xs sm:px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6]">
            <Car className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold tracking-wide text-[#FAFAFA]">
            FleetTrack Enterprise OS
          </span>
          <span className="hidden sm:inline text-[#27272A]">|</span>
          <span className="hidden sm:inline font-mono text-[#A1A1AA]">Backend Mock API</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="rounded bg-[#27272A] px-2 py-0.5 text-[11px] text-[#A1A1AA]">
            {locale === 'pt' ? 'Dados Simulados' : 'Simulated Data'}
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 rounded bg-[#18181B] border border-[#27272A] px-2 py-0.5 text-[11px] text-[#A1A1AA] hover:text-[#FAFAFA] hover:border-[#3B82F6]/50 transition-colors"
            title="Reset dataset"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* KPI Metrics */}
        {activeTab === 'vehicles' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-[#3B82F6]/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Total Frota' : 'Total Fleet'}
                </span>
                <Car className="h-4 w-4 text-[#3B82F6]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-[#FAFAFA]">
                {vehicleStats.total}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Veículos registrados' : 'Registered vehicles'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Em Operação' : 'Operational'}
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-emerald-400">
                {vehicleStats.active}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Prontos para rota' : 'Ready for dispatch'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-amber-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Em Manutenção' : 'Maintenance'}
                </span>
                <Wrench className="h-4 w-4 text-amber-400" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-amber-400">
                {vehicleStats.maint}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Revisão periódica' : 'Under repair'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-rose-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Inativos' : 'Inactive'}
                </span>
                <XCircle className="h-4 w-4 text-rose-400" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-rose-400">
                {vehicleStats.inactive}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Aguardando doc' : 'Awaiting clearance'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-[#3B82F6]/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Motoristas' : 'Drivers'}
                </span>
                <Users className="h-4 w-4 text-[#3B82F6]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-[#FAFAFA]">
                {driverStats.total}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Quadro de condutores' : 'Registered staff'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Em Viagem' : 'En Route'}
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-emerald-400">
                {driverStats.onTrip}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Em rota ativa' : 'On active delivery'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-blue-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Disponíveis' : 'Standby'}
                </span>
                <Clock className="h-4 w-4 text-[#3B82F6]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-[#3B82F6]">
                {driverStats.ready}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Prontos para escala' : 'Awaiting dispatch'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-amber-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Folga / Descanso' : 'Off Duty'}
                </span>
                <XCircle className="h-4 w-4 text-amber-400" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-amber-400">
                {driverStats.offDuty}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Intervalo regulamentar' : 'Mandatory rest'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-[#3B82F6]/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Ordens de Serviço' : 'Work Orders'}
                </span>
                <FileText className="h-4 w-4 text-[#3B82F6]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-[#FAFAFA]">
                {maintenanceStats.total}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Histórico de registros' : 'Total logged records'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-amber-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Em Oficina' : 'In Progress'}
                </span>
                <AlertTriangle className="h-4 w-4 text-amber-400" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-amber-400">
                {maintenanceStats.inProgress}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Em execução agora' : 'Currently being repaired'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-blue-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Agendadas' : 'Scheduled'}
                </span>
                <Clock className="h-4 w-4 text-[#3B82F6]" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-[#3B82F6]">
                {maintenanceStats.scheduled}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Próximas datas' : 'Upcoming bookings'}
              </p>
            </div>

            <div className="rounded-xl border border-[#27272A] bg-[#141418] p-4 transition-all hover:border-emerald-500/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase text-[#A1A1AA]">
                  {locale === 'pt' ? 'Concluídas' : 'Completed'}
                </span>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-2xl font-bold font-mono text-emerald-400">
                {maintenanceStats.completed}
              </p>
              <p className="mt-1 text-[11px] text-[#A1A1AA]">
                {locale === 'pt' ? 'Aprovadas pelo gestor' : 'Approved & released'}
              </p>
            </div>
          </div>
        )}

        {/* Navigation Tabs & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#27272A] pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTabChange('vehicles')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'vehicles'
                  ? 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20'
                  : 'bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              {locale === 'pt' ? 'Veículos' : 'Vehicles'}
            </button>
            <button
              onClick={() => handleTabChange('drivers')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'drivers'
                  ? 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20'
                  : 'bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              {locale === 'pt' ? 'Motoristas' : 'Drivers'}
            </button>
            <button
              onClick={() => handleTabChange('maintenance')}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-medium transition-all ${
                activeTab === 'maintenance'
                  ? 'bg-[#3B82F6] text-white shadow-md shadow-[#3B82F6]/20'
                  : 'bg-[#18181B] text-[#A1A1AA] hover:text-[#FAFAFA]'
              }`}
            >
              {locale === 'pt' ? 'Manutenções' : 'Maintenance'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-[#A1A1AA]">
              {locale === 'pt' ? 'Visualização somente-leitura' : 'Read-only showcase'}
            </span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#A1A1AA]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'vehicles'
                  ? locale === 'pt'
                    ? 'Buscar placa, modelo ou motorista...'
                    : 'Search plate, model or driver...'
                  : activeTab === 'drivers'
                  ? locale === 'pt'
                    ? 'Buscar nome, CNH ou veículo...'
                    : 'Search name, license or vehicle...'
                  : locale === 'pt'
                  ? 'Buscar placa, serviço ou oficina...'
                  : 'Search plate, service or workshop...'
              }
              className="w-full rounded-lg border border-[#27272A] bg-[#141418] py-2 pl-9 pr-3 text-xs text-[#FAFAFA] placeholder-[#A1A1AA]/60 focus:border-[#3B82F6] focus:outline-none"
            />
          </div>

          {/* Status filter pill buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {activeTab === 'vehicles' && (
              (['all', 'active', 'maintenance', 'inactive'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                    statusFilter === s
                      ? 'border border-[#3B82F6] bg-[#3B82F6]/20 text-[#FAFAFA]'
                      : 'border border-[#27272A] bg-[#141418] text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {s === 'all'
                    ? locale === 'pt' ? 'Todos' : 'All'
                    : s === 'active'
                    ? locale === 'pt' ? 'Ativos' : 'Active'
                    : s === 'maintenance'
                    ? locale === 'pt' ? 'Manutenção' : 'Maint.'
                    : locale === 'pt' ? 'Inativos' : 'Inactive'}
                </button>
              ))
            )}

            {activeTab === 'drivers' && (
              (['all', 'active', 'on_trip', 'off_duty'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                    statusFilter === s
                      ? 'border border-[#3B82F6] bg-[#3B82F6]/20 text-[#FAFAFA]'
                      : 'border border-[#27272A] bg-[#141418] text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {s === 'all'
                    ? locale === 'pt' ? 'Todos' : 'All'
                    : s === 'active'
                    ? locale === 'pt' ? 'Disponíveis' : 'Standby'
                    : s === 'on_trip'
                    ? locale === 'pt' ? 'Em Viagem' : 'En Route'
                    : locale === 'pt' ? 'Em Folga' : 'Off Duty'}
                </button>
              ))
            )}

            {activeTab === 'maintenance' && (
              (['all', 'in_progress', 'scheduled', 'completed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-mono transition-all ${
                    statusFilter === s
                      ? 'border border-[#3B82F6] bg-[#3B82F6]/20 text-[#FAFAFA]'
                      : 'border border-[#27272A] bg-[#141418] text-[#A1A1AA] hover:text-[#FAFAFA]'
                  }`}
                >
                  {s === 'all'
                    ? locale === 'pt' ? 'Todas' : 'All'
                    : s === 'in_progress'
                    ? locale === 'pt' ? 'Em Execução' : 'In Progress'
                    : s === 'scheduled'
                    ? locale === 'pt' ? 'Agendadas' : 'Scheduled'
                    : locale === 'pt' ? 'Concluídas' : 'Completed'}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Dynamic Table Content based on activeTab */}
        <div className="rounded-xl border border-[#27272A] bg-[#141418] overflow-hidden">
          <div className="overflow-x-auto">
            {/* TAB 1: VEHICLES TABLE */}
            {activeTab === 'vehicles' && (
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#27272A] bg-[#18181B] font-mono text-[#A1A1AA] uppercase">
                  <tr>
                    <th className="px-4 py-3">Placa / ID</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Modelo' : 'Model'}</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Motorista Alocado' : 'Assigned Driver'}</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Km Atual' : 'Mileage'}</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">{locale === 'pt' ? 'Ação' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A] text-[#FAFAFA]">
                  {filteredVehicles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[#A1A1AA] font-mono">
                        {locale === 'pt'
                          ? 'Nenhum veículo encontrado com os filtros atuais.'
                          : 'No vehicles match current query filters.'}
                      </td>
                    </tr>
                  ) : (
                    filteredVehicles.map((v) => (
                      <tr
                        key={v.id}
                        onClick={() => setSelectedVehicle(v)}
                        className="cursor-pointer transition-colors hover:bg-[#18181B]"
                      >
                        <td className="px-4 py-3 font-mono font-medium text-[#FAFAFA]">
                          <div>{v.plate}</div>
                          <span className="text-[10px] text-[#A1A1AA]">{v.id}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-[#FAFAFA]">{v.model}</div>
                          <span className="text-[10px] font-mono text-[#A1A1AA]">
                            {locale === 'pt' ? v.category : v.categoryEn} • {v.year}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[#FAFAFA]">{v.driver}</div>
                          <span className="text-[10px] font-mono text-[#A1A1AA]">
                            {v.driverPhone}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[#A1A1AA]">
                          {v.mileage.toLocaleString()} km
                        </td>
                        <td className="px-4 py-3">
                          {v.status === 'active' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              {locale === 'pt' ? 'Ativo' : 'Active'}
                            </span>
                          )}
                          {v.status === 'maintenance' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono text-amber-400 border border-amber-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                              {locale === 'pt' ? 'Revisão' : 'Maint.'}
                            </span>
                          )}
                          {v.status === 'inactive' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 px-2 py-0.5 text-[11px] font-mono text-rose-400 border border-rose-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                              {locale === 'pt' ? 'Inativo' : 'Inactive'}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedVehicle(v);
                            }}
                            className="text-[#3B82F6] hover:text-blue-400 text-xs font-mono"
                          >
                            {locale === 'pt' ? 'Ver Ficha' : 'Details'} →
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* TAB 2: DRIVERS TABLE */}
            {activeTab === 'drivers' && (
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#27272A] bg-[#18181B] font-mono text-[#A1A1AA] uppercase">
                  <tr>
                    <th className="px-4 py-3">ID / Nome</th>
                    <th className="px-4 py-3">CNH & Categoria</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Contato' : 'Phone'}</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Veículo Vinculado' : 'Assigned Vehicle'}</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">{locale === 'pt' ? 'Ação' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A] text-[#FAFAFA]">
                  {filteredDrivers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-[#A1A1AA] font-mono">
                        {locale === 'pt'
                          ? 'Nenhum motorista encontrado com os filtros atuais.'
                          : 'No drivers match current query filters.'}
                      </td>
                    </tr>
                  ) : (
                    filteredDrivers.map((d) => (
                      <tr
                        key={d.id}
                        onClick={() => setSelectedDriver(d)}
                        className="cursor-pointer transition-colors hover:bg-[#18181B]"
                      >
                        <td className="px-4 py-3 font-medium text-[#FAFAFA]">
                          <div>{d.name}</div>
                          <span className="font-mono text-[10px] text-[#A1A1AA]">{d.id}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-mono text-[#FAFAFA]">{d.cnh}</div>
                          <span className="text-[10px] text-[#3B82F6] font-mono">
                            Cat. {d.cnhCategory}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-[#A1A1AA]">
                          {d.phone}
                        </td>
                        <td className="px-4 py-3 text-xs text-[#FAFAFA]">
                          {d.assignedVehicle}
                        </td>
                        <td className="px-4 py-3">
                          {d.status === 'on_trip' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              {locale === 'pt' ? 'Em Viagem' : 'En Route'}
                            </span>
                          )}
                          {d.status === 'active' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-mono text-blue-400 border border-blue-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                              {locale === 'pt' ? 'Disponível' : 'Standby'}
                            </span>
                          )}
                          {d.status === 'off_duty' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono text-amber-400 border border-amber-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                              {locale === 'pt' ? 'Folga' : 'Off Duty'}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDriver(d);
                            }}
                            className="text-[#3B82F6] hover:text-blue-400 text-xs font-mono"
                          >
                            {locale === 'pt' ? 'Ver Ficha' : 'Profile'} →
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}

            {/* TAB 3: MAINTENANCE TABLE */}
            {activeTab === 'maintenance' && (
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#27272A] bg-[#18181B] font-mono text-[#A1A1AA] uppercase">
                  <tr>
                    <th className="px-4 py-3">O.S. / Data</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Veículo' : 'Vehicle'}</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Tipo de Serviço' : 'Service Description'}</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Oficina' : 'Workshop'}</th>
                    <th className="px-4 py-3">{locale === 'pt' ? 'Custo' : 'Cost'}</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">{locale === 'pt' ? 'Ação' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#27272A] text-[#FAFAFA]">
                  {filteredMaintenance.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-[#A1A1AA] font-mono">
                        {locale === 'pt'
                          ? 'Nenhuma ordem de manutenção encontrada com os filtros atuais.'
                          : 'No maintenance records match current query filters.'}
                      </td>
                    </tr>
                  ) : (
                    filteredMaintenance.map((m) => (
                      <tr
                        key={m.id}
                        onClick={() => setSelectedMaintenance(m)}
                        className="cursor-pointer transition-colors hover:bg-[#18181B]"
                      >
                        <td className="px-4 py-3 font-mono font-medium text-[#FAFAFA]">
                          <div>{m.id}</div>
                          <span className="text-[10px] text-[#A1A1AA]">{m.date}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-[#FAFAFA]">{m.plate}</div>
                          <span className="text-[10px] font-mono text-[#A1A1AA]">
                            {m.model}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-[#FAFAFA]">
                            {locale === 'pt' ? m.serviceType : m.serviceTypeEn}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[#A1A1AA]">
                          {m.workshop}
                        </td>
                        <td className="px-4 py-3 font-mono text-[#FAFAFA]">
                          {m.cost}
                        </td>
                        <td className="px-4 py-3">
                          {m.status === 'completed' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-mono text-emerald-400 border border-emerald-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                              {locale === 'pt' ? 'Concluída' : 'Completed'}
                            </span>
                          )}
                          {m.status === 'in_progress' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] font-mono text-amber-400 border border-amber-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                              {locale === 'pt' ? 'Em Oficina' : 'In Progress'}
                            </span>
                          )}
                          {m.status === 'scheduled' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[11px] font-mono text-blue-400 border border-blue-500/20">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                              {locale === 'pt' ? 'Agendada' : 'Scheduled'}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedMaintenance(m);
                            }}
                            className="text-[#3B82F6] hover:text-blue-400 text-xs font-mono"
                          >
                            {locale === 'pt' ? 'Detalhes' : 'Details'} →
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Selected Vehicle Details Flyout */}
        {selectedVehicle && (
          <div className="rounded-xl border border-[#3B82F6]/40 bg-[#141418] p-5 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-[#27272A] pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6]">
                  <Car className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAFAFA]">
                    {selectedVehicle.model} ({selectedVehicle.plate})
                  </h4>
                  <p className="text-xs font-mono text-[#A1A1AA]">
                    ID: {selectedVehicle.id} • {selectedVehicle.driver}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-xs text-[#A1A1AA] hover:text-[#FAFAFA]"
              >
                ✕ {locale === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Última Revisão' : 'Last Service'}
                </span>
                <span className="text-[#FAFAFA] font-semibold mt-1 block">
                  {selectedVehicle.lastService}
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Próxima Revisão' : 'Next Service'}
                </span>
                <span className="text-amber-400 font-semibold mt-1 block">
                  {selectedVehicle.nextService}
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Hodômetro' : 'Odometer'}
                </span>
                <span className="text-[#FAFAFA] font-semibold mt-1 block">
                  {selectedVehicle.mileage.toLocaleString()} km
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Telefone Motorista' : 'Driver Contact'}
                </span>
                <span className="text-[#3B82F6] font-semibold mt-1 block">
                  {selectedVehicle.driverPhone}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Selected Driver Details Flyout */}
        {selectedDriver && (
          <div className="rounded-xl border border-[#3B82F6]/40 bg-[#141418] p-5 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-[#27272A] pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAFAFA]">
                    {selectedDriver.name}
                  </h4>
                  <p className="text-xs font-mono text-[#A1A1AA]">
                    {selectedDriver.id} • {selectedDriver.phone}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDriver(null)}
                className="text-xs text-[#A1A1AA] hover:text-[#FAFAFA]"
              >
                ✕ {locale === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  CNH
                </span>
                <span className="text-[#FAFAFA] font-semibold mt-1 block">
                  {selectedDriver.cnh} ({selectedDriver.cnhCategory})
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Veículo Vinculado' : 'Assigned Vehicle'}
                </span>
                <span className="text-[#3B82F6] font-semibold mt-1 block">
                  {selectedDriver.assignedVehicle}
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Experiência' : 'Experience'}
                </span>
                <span className="text-[#FAFAFA] font-semibold mt-1 block">
                  {selectedDriver.experienceYears} {locale === 'pt' ? 'anos de estrada' : 'years'}
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Viagens Realizadas' : 'Completed Trips'}
                </span>
                <span className="text-emerald-400 font-semibold mt-1 block">
                  {selectedDriver.tripsCompleted}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Selected Maintenance Details Flyout */}
        {selectedMaintenance && (
          <div className="rounded-xl border border-[#3B82F6]/40 bg-[#141418] p-5 shadow-xl animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-[#27272A] pb-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Wrench className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#FAFAFA]">
                    {selectedMaintenance.id} — {selectedMaintenance.plate} ({selectedMaintenance.model})
                  </h4>
                  <p className="text-xs text-[#A1A1AA]">
                    {locale === 'pt' ? selectedMaintenance.serviceType : selectedMaintenance.serviceTypeEn}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMaintenance(null)}
                className="text-xs text-[#A1A1AA] hover:text-[#FAFAFA]"
              >
                ✕ {locale === 'pt' ? 'Fechar' : 'Close'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono mb-3">
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Oficina Autorizada' : 'Authorized Workshop'}
                </span>
                <span className="text-[#FAFAFA] font-semibold mt-1 block">
                  {selectedMaintenance.workshop}
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  {locale === 'pt' ? 'Data / Custo' : 'Date / Total Cost'}
                </span>
                <span className="text-emerald-400 font-semibold mt-1 block">
                  {selectedMaintenance.date} • {selectedMaintenance.cost}
                </span>
              </div>
              <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A]">
                <span className="text-[#A1A1AA] block text-[10px] uppercase">
                  Status
                </span>
                <span className="text-amber-400 font-semibold mt-1 block uppercase">
                  {selectedMaintenance.status}
                </span>
              </div>
            </div>

            <div className="rounded-lg bg-[#18181B] p-3 border border-[#27272A] text-xs">
              <span className="text-[#A1A1AA] font-mono block text-[10px] uppercase mb-1">
                {locale === 'pt' ? 'Laudo / Itens Executados' : 'Service Notes'}
              </span>
              <p className="text-[#FAFAFA] leading-relaxed">
                {locale === 'pt' ? selectedMaintenance.notes : selectedMaintenance.notesEn}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
