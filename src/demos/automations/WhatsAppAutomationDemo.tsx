'use client';

import { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  CheckCircle, 
  MessageSquare, 
  Server, 
  Database, 
  Send, 
  Cpu, 
  Code2,
  Terminal,
  ShieldAlert
} from 'lucide-react';
import { useLanguage } from '@/i18n';

interface StepDetail {
  number: number;
  titlePt: string;
  titleEn: string;
  descPt: string;
  descEn: string;
  icon: React.ComponentType<{ className?: string }>;
  payload?: Record<string, unknown>;
}

const STEPS: StepDetail[] = [
  {
    number: 1,
    titlePt: 'Cliente envia mensagem',
    titleEn: 'Customer sends message',
    descPt: 'Mensagem recebida via WhatsApp Business API.',
    descEn: 'Message received via WhatsApp Business API.',
    icon: MessageSquare,
    payload: {
      from: '5511988887777',
      type: 'text',
      message: 'Olá! Gostaria de consultar o status do meu pedido #8841',
      timestamp: '2026-11-02T20:20:00Z',
    },
  },
  {
    number: 2,
    titlePt: 'Webhook recebe evento',
    titleEn: 'Webhook receives event',
    descPt: 'Servidor FastAPI valida assinatura HMAC e aceita payload.',
    descEn: 'FastAPI server validates HMAC signature and accepts payload.',
    icon: Server,
    payload: {
      endpoint: 'POST /v1/webhooks/whatsapp',
      status: 200,
      verified: true,
      execution_time: '14ms',
    },
  },
  {
    number: 3,
    titlePt: 'Processamento & Extração',
    titleEn: 'Processing & Extraction',
    descPt: 'Regex & NLP identificam intenção: `order_status`, ID: `8841`.',
    descEn: 'Regex & NLP identify intent: `order_status`, entity: `8841`.',
    icon: Cpu,
    payload: {
      intent: 'CHECK_ORDER_STATUS',
      confidence: 0.98,
      entities: {
        order_id: 8841,
        customer_phone: '5511988887777',
      },
    },
  },
  {
    number: 4,
    titlePt: 'Consulta SQL ao Banco',
    titleEn: 'SQL Database Query',
    descPt: 'FastAPI consulta MySQL com SQLAlchemy (query indexada).',
    descEn: 'FastAPI queries MySQL via SQLAlchemy with index lookup.',
    icon: Database,
    payload: {
      query: 'SELECT * FROM orders WHERE id = 8841 AND customer_id = 412;',
      result: {
        id: 8841,
        status: 'EM_TRANSPORTE',
        carrier: 'Jadlog Express',
        tracking_code: 'JD8841009BR',
        eta: '04/11/2026',
      },
    },
  },
  {
    number: 5,
    titlePt: 'Composição da Resposta',
    titleEn: 'Response Composition',
    descPt: 'Montagem do template dinâmico com link de rastreio.',
    descEn: 'Dynamic template rendering with tracking link and ETA.',
    icon: Code2,
    payload: {
      template: 'order_status_success',
      language: 'pt_BR',
      rendered_chars: 184,
    },
  },
  {
    number: 6,
    titlePt: 'Disparo da Mensagem',
    titleEn: 'Message Dispatched',
    descPt: 'Envio assíncrono finalizado para o cliente no WhatsApp.',
    descEn: 'Asynchronous message delivered to customer on WhatsApp.',
    icon: Send,
    payload: {
      status: 'delivered',
      message_id: 'wamid.HBgLNTUxMTk4...',
      latency_total: '185ms',
    },
  },
];

export default function WhatsAppAutomationDemo() {
  const { locale } = useLanguage();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('visual');

  // Step runner effect
  useEffect(() => {
    if (!isRunning || currentStep >= 6) return;

    const timer = setTimeout(() => {
      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= 6) {
          setIsRunning(false);
        }
        return next;
      });
    }, 1600);

    return () => clearTimeout(timer);
  }, [isRunning, currentStep]);

  const handleStart = () => {
    setCurrentStep(1);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStep(0);
  };

  return (
    <div className="w-full rounded-2xl border border-[#27272A] bg-[#0E0E11] text-[#FAFAFA] shadow-2xl overflow-hidden font-sans">
      {/* Simulation Header */}
      <div className="flex items-center justify-between border-b border-[#27272A] bg-[#141418] px-4 py-2.5 text-xs text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono font-semibold text-[#FAFAFA]">
            WhatsApp Workflow Simulator
          </span>
          <span className="hidden sm:inline text-[#27272A]">|</span>
          <span className="hidden sm:inline font-mono">FastAPI Event-Driven Engine</span>
        </div>
        <div className="flex items-center gap-2 font-mono">
          <span className="rounded bg-[#27272A] px-2 py-0.5 text-[11px] text-[#A1A1AA]">
            {locale === 'pt' ? 'Simulação Segura' : 'Isolated Simulator'}
          </span>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 rounded bg-[#18181B] border border-[#27272A] px-2 py-0.5 text-[11px] hover:text-[#FAFAFA] hover:border-emerald-500/50 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-[#27272A] bg-[#141418] p-4">
          <div>
            <h3 className="text-sm font-bold text-[#FAFAFA]">
              {locale === 'pt'
                ? 'Fluxo Automatizado de Consulta de Pedido'
                : 'Automated Order Status Query Flow'}
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-0.5 font-mono">
              {currentStep === 0 && (locale === 'pt' ? 'Clique em "Iniciar Simulação" para rodar o pipeline' : 'Click "Start Simulation" to run pipeline')}
              {isRunning && (locale === 'pt' ? `Executando etapa ${currentStep} de 6...` : `Running step ${currentStep} of 6...`)}
              {currentStep === 6 && (locale === 'pt' ? '✓ Pipeline concluído com sucesso em 185ms!' : '✓ Pipeline finished successfully in 185ms!')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {currentStep === 0 || currentStep === 6 ? (
              <button
                onClick={handleStart}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-500 transition-all active:scale-95"
              >
                <Play className="h-3.5 w-3.5 fill-white" />
                <span>
                  {currentStep === 6
                    ? locale === 'pt' ? 'Executar Novamente' : 'Run Again'
                    : locale === 'pt' ? 'Iniciar Simulação' : 'Start Simulation'}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#27272A] bg-[#18181B] px-4 py-2 text-xs font-semibold text-[#FAFAFA] hover:border-emerald-500/50"
              >
                <span>{isRunning ? 'Pausar' : 'Continuar'}</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab(activeTab === 'visual' ? 'code' : 'visual')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#27272A] bg-[#18181B] px-3 py-2 text-xs font-mono text-[#A1A1AA] hover:text-[#FAFAFA]"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>{activeTab === 'visual' ? 'Payload JSON' : 'Visual Mockup'}</span>
            </button>
          </div>
        </div>

        {/* Pipeline Steps Tracker */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {STEPS.map((s) => {
            const Icon = s.icon;
            const isCompleted = currentStep > s.number;
            const isCurrent = currentStep === s.number;

            return (
              <div
                key={s.number}
                className={`rounded-xl border p-3 transition-all duration-300 ${
                  isCurrent
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10 scale-102'
                    : isCompleted
                    ? 'border-emerald-500/40 bg-[#141418] opacity-90'
                    : 'border-[#27272A] bg-[#111114] opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-[#A1A1AA]">
                    0{s.number}
                  </span>
                  {isCompleted ? (
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  ) : (
                    <Icon className={`h-3.5 w-3.5 ${isCurrent ? 'text-emerald-400' : 'text-[#A1A1AA]'}`} />
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#FAFAFA] line-clamp-1">
                  {locale === 'pt' ? s.titlePt : s.titleEn}
                </h4>
                <p className="text-[10px] text-[#A1A1AA] mt-1 line-clamp-2">
                  {locale === 'pt' ? s.descPt : s.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Main Interactive Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: WhatsApp Phone Mockup (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#27272A] bg-[#111114] overflow-hidden shadow-2xl">
              {/* WhatsApp Mockup Header */}
              <div className="flex items-center justify-between bg-[#1F2C34] px-4 py-3 text-white border-b border-[#27272A]">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                    BOT
                  </div>
                  <div>
                    <p className="text-xs font-bold">Atendimento Automático</p>
                    <p className="text-[10px] text-emerald-400 font-mono">
                      online • verificado
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#A1A1AA] font-mono">
                  <span>API v19.0</span>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="h-80 sm:h-96 bg-[#0B141A] p-4 flex flex-col justify-end space-y-3 overflow-y-auto">
                {currentStep === 0 && (
                  <div className="m-auto text-center text-xs text-[#A1A1AA] font-mono max-w-xs">
                    <p>Inicie a simulação para ver a mensagem do cliente entrar no sistema.</p>
                  </div>
                )}

                {/* Customer incoming message (visible from step 1+) */}
                {currentStep >= 1 && (
                  <div className="self-end max-w-[85%] rounded-2xl rounded-tr-none bg-[#005C4B] p-3 text-xs text-white shadow-md animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <p>Olá! Gostaria de consultar o status do meu pedido #8841</p>
                    <span className="mt-1 block text-right text-[10px] text-emerald-200/70 font-mono">
                      20:20 ✓✓
                    </span>
                  </div>
                )}

                {/* Processing indicator in chat */}
                {currentStep >= 2 && currentStep < 6 && (
                  <div className="self-start max-w-[80%] rounded-2xl rounded-tl-none bg-[#202C33] p-3 text-xs text-[#A1A1AA] shadow-md flex items-center gap-2 animate-pulse">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                    <span className="font-mono text-[11px]">
                      {currentStep === 2 && 'Webhook recebendo payload...'}
                      {currentStep === 3 && 'Processando intenção NLP...'}
                      {currentStep === 4 && 'Consultando MySQL orders...'}
                      {currentStep === 5 && 'Formatando resposta...'}
                    </span>
                  </div>
                )}

                {/* Bot Answer (visible at step 6) */}
                {currentStep >= 6 && (
                  <div className="self-start max-w-[88%] rounded-2xl rounded-tl-none bg-[#202C33] p-3.5 text-xs text-white shadow-md animate-in fade-in slide-in-from-bottom-3 duration-300 border border-emerald-500/20">
                    <p className="font-semibold text-emerald-400 mb-1">
                      📦 Status do Pedido #8841:
                    </p>
                    <p className="leading-relaxed">
                      Olá! Seu pedido já está com a transportadora{' '}
                      <strong>Jadlog Express</strong> em trânsito para o seu endereço.
                    </p>
                    <div className="mt-2.5 rounded-lg bg-[#111B21] p-2 border border-[#27272A] font-mono text-[11px] space-y-1">
                      <p className="text-[#A1A1AA]">
                        Código de rastreio:{' '}
                        <span className="text-[#FAFAFA] font-bold">JD8841009BR</span>
                      </p>
                      <p className="text-emerald-400">
                        Previsão de entrega: 04/11/2026
                      </p>
                    </div>
                    <span className="mt-1.5 block text-right text-[10px] text-[#A1A1AA] font-mono">
                      20:20
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Technical Inspector / Event Telemetry (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-[#27272A] bg-[#111114] p-5 shadow-2xl h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-[#27272A] pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4 text-emerald-400" />
                  <h4 className="text-xs font-mono font-bold text-[#FAFAFA] uppercase">
                    Backend Telemetry & Inspector
                  </h4>
                </div>
                <span className="font-mono text-[11px] text-emerald-400">
                  {currentStep > 0 ? `Step 0${currentStep}/06` : 'IDLE'}
                </span>
              </div>

              {/* JSON Inspector */}
              <div className="rounded-xl border border-[#27272A] bg-[#0E0E11] p-3.5 font-mono text-[11px] text-[#A1A1AA] overflow-x-auto">
                <div className="text-[10px] text-[#A1A1AA]/60 uppercase mb-2">
                  {`// Event payload inspection`}
                </div>
                <pre className="text-emerald-400/90 whitespace-pre-wrap leading-relaxed">
                  {currentStep === 0
                    ? '// Aguardando disparo do evento...'
                    : JSON.stringify(STEPS[currentStep - 1]?.payload, null, 2)}
                </pre>
              </div>

              {/* Security & Architecture note */}
              <div className="mt-4 rounded-xl border border-[#27272A] bg-[#18181B] p-3.5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#FAFAFA]">
                  <ShieldAlert className="h-3.5 w-3.5 text-[#3B82F6]" />
                  <span>Arquitetura de Segurança</span>
                </div>
                <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                  Autenticação por token HMAC SHA-256 no webhook. Dados protegidos contra injeção SQL com parâmetros preparados via ORM. Nenhuma mensagem real é enviada nesta demonstração.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#27272A] flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
              <span>FastAPI + Uvicorn</span>
              <span className="text-emerald-400">Response time: ~185ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

