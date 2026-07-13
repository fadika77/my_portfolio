import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Terminal, X } from 'lucide-react';
import { parseCommand } from '@/utils/consoleCommands';
import { siteConfig } from '@/data/config';

interface HistoryLine {
  type: 'input' | 'output';
  text: string;
}

const WELCOME: HistoryLine[] = [
  { type: 'output', text: "Developer console ready. Type 'help' to get started." },
];

export function DeveloperConsole() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<HistoryLine[]>(WELCOME);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [history]);

  // Global keyboard shortcuts: P / A / C / R navigate, Esc closes.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if (event.key === 'Escape') {
        if (open) setOpen(false);
        return;
      }

      if (isTyping || event.metaKey || event.ctrlKey || event.altKey) return;

      switch (event.key.toLowerCase()) {
        case 'p':
          navigate('/projects');
          break;
        case 'a':
          navigate('/about');
          break;
        case 'c':
          navigate('/contact');
          break;
        case 'r':
          window.open(siteConfig.resumePath, '_blank');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, open]);

  const runCommand = (raw: string) => {
    const result = parseCommand(raw);
    setHistory((prev) => {
      const next: HistoryLine[] = [...prev, { type: 'input', text: raw }];
      if (result.action === 'clear') return [];
      return [...next, ...result.output.map((line) => ({ type: 'output' as const, text: line }))];
    });

    if (result.action === 'navigate' && result.payload) {
      if (result.payload === 'resume') {
        window.open(siteConfig.resumePath, '_blank');
      } else if (result.payload.startsWith('/#')) {
        const id = result.payload.slice(2);
        if (location.pathname === '/') {
          window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
        } else {
          navigate(result.payload);
        }
      } else {
        navigate(result.payload);
      }
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    runCommand(value);
    setValue('');
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-bg-secondary/90 text-accent-cyan shadow-card backdrop-blur-md transition-colors hover:border-accent-cyan/60 sm:bottom-8 sm:left-8"
        aria-label="Open developer console"
      >
        <Terminal className="h-5 w-5" aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Developer console"
            className="fixed inset-0 z-[80] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel glass-panel-overlay flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border-border-strong bg-bg-secondary/95 sm:h-[520px] sm:rounded-2xl"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                  <span className="h-3 w-3 rounded-full bg-danger/70" />
                  <span className="h-3 w-3 rounded-full bg-[#f5c451]/70" />
                  <span className="h-3 w-3 rounded-full bg-success/70" />
                  <span className="ml-3">fadi@portfolio: ~</span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close developer console"
                  className="text-text-muted hover:text-text-main"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 font-mono text-sm">
                {history.map((line, index) => (
                  <p
                    key={index}
                    className={
                      line.type === 'input'
                        ? 'mt-2 text-text-main'
                        : 'whitespace-pre-wrap text-text-muted'
                    }
                  >
                    {line.type === 'input' ? (
                      <>
                        <span className="text-accent-cyan">{'>'}</span> {line.text}
                      </>
                    ) : (
                      line.text
                    )}
                  </p>
                ))}
                <div ref={endRef} />
              </div>

              <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-border px-4 py-3">
                <span className="font-mono text-accent-cyan">{'>'}</span>
                <label htmlFor="console-input" className="sr-only">
                  Console command
                </label>
                <input
                  id="console-input"
                  ref={inputRef}
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  type="text"
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Type 'help' to get started"
                  className="flex-1 bg-transparent font-mono text-sm text-text-main placeholder:text-text-muted/60 focus:outline-none"
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
