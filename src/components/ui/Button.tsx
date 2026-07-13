import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '@/utils/cn';

// `transition-all` here used to mean every hover state (background, border,
// shadow, transform) recomputed together on every one of the many buttons
// on the page (nav, hero CTAs, form submit, resume links). Naming the exact
// properties that actually change lets the browser skip work for whatever
// isn't animating on a given variant, and keeps `transform`/`opacity`-style
// changes cheap regardless of how expensive the color/shadow transition is.
const baseStyles =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variantStyles = {
  primary:
    'bg-gradient-to-r from-accent to-accent-purple text-white shadow-glow hover:shadow-[0_0_55px_-8px_rgba(79,141,255,0.65)] hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'border border-border-strong bg-white/[0.03] text-text-main hover:bg-white/[0.08] hover:border-accent/50 hover:-translate-y-0.5 active:translate-y-0',
  ghost: 'text-text-muted hover:text-text-main hover:bg-white/[0.05]',
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm sm:text-base',
  lg: 'px-8 py-4 text-base sm:text-lg',
};

interface CommonProps {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  children: ReactNode;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as?: 'button' };
type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as: 'a'; href: string };

type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = cn(baseStyles, variantStyles[variant], sizeStyles[size], className);

    if (props.as === 'a') {
      const { as: _as, ...anchorProps } = props;
      return (
        <a
          ref={ref as Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    const { as: _as, type: buttonType, ...buttonProps } = props as ButtonAsButton;
    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        className={classes}
        {...buttonProps}
        type={buttonType ?? 'button'}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
