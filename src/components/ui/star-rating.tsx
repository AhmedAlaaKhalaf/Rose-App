"use client";

import * as React from "react";
import { Star, LucideProps } from "lucide-react";

import { cn } from "@/lib/utils/tailwind-merge";

const ratingVariants = {
  default: {
    full: "fill-current text-foreground",
    empty: "fill-transparent text-muted-foreground",
  },
  destructive: {
    full: "fill-current text-red-500",
    empty: "fill-transparent text-red-200",
  },
  yellow: {
    full: "fill-current text-yellow-500",
    empty: "fill-current text-white",
  },
};

const DEFAULT_PRECISION = 0.5;
const DEFAULT_MAX_STARS = 5;
const DEFAULT_STAR_SIZE = 25;
const DEFAULT_ICON = <Star className="px-0.5" strokeWidth={1.5} stroke="#FFA508" />;

const checkPrecision = (precision: number) => {
  if (precision <= 0 || precision > 1) {
    console.error("Precision must be greater than 0 and less than 1");
    return false;
  }
  return true;
};

interface RatingItemProps extends React.HTMLAttributes<HTMLLabelElement> {
  variant?: keyof typeof ratingVariants;
  size: number;
  value: number;
  hoveredValue: number | null;
  point: number;
  name: string;
  readOnly?: boolean;
  disabled?: boolean;
  precision: number;
  dir?: "ltr" | "rtl";
  Icon: React.ReactElement<LucideProps>;
  onMouseLeave: React.MouseEventHandler<HTMLLabelElement>;
  onValueHover: (value: number) => void;
  onValueChange?: (value: number) => void;
}

const RatingItem = ({
  size,
  variant = "default",
  value,
  point,
  hoveredValue,
  name,
  readOnly = false,
  disabled = false,
  precision,
  dir = "ltr",
  Icon,
  onMouseLeave,
  onValueChange,
  onValueHover,
}: RatingItemProps) => {
  const Comp = readOnly ? "span" : "label";
  const ref = React.useRef<HTMLLabelElement>(null);
  const isFirstRender = React.useRef(true);
  const id = React.useId();
  const ratingIconId = `rating-icon-${id}`;
  const isInteractive = !readOnly && !disabled;
  const partialPoint = point % 1;
  const isPartialPoint = partialPoint !== 0;
  const shouldShowFilled = (hoveredValue || value) >= point;
  const partialPointWidth =
    isPartialPoint && shouldShowFilled ? `${partialPoint * 100}%` : undefined;

  const icons = React.useMemo(() => {
    const emptyIcon = React.cloneElement(Icon, {
      size,
      className: cn(ratingVariants[variant].empty, Icon.props.className),
      "aria-hidden": "true",
    });
    const fullIcon = React.cloneElement(Icon, {
      size,
      className: cn(ratingVariants[variant].full, Icon.props.className),
      "aria-hidden": "true",
    });
    return { emptyIcon, fullIcon };
  }, [Icon, size, variant]);

  const getRatingPoint = React.useCallback(
    (event: React.MouseEvent<HTMLLabelElement>) => {
      const { left, width } = event.currentTarget.getBoundingClientRect();
      if (width === 0 || !checkPrecision(precision)) return 0;
      const x = dir === "rtl" ? left + width - event.clientX : event.clientX - left;
      const fillRatio = x / width;
      const base = Math.ceil(point) - 1;
      return base + Math.ceil(fillRatio / precision) * precision;
    },
    [precision, point, dir]
  );

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLLabelElement>) => {
      if (!isInteractive) return;
      onValueHover(getRatingPoint(event));
    },
    [isInteractive, onValueHover, getRatingPoint]
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLLabelElement>) => {
      if (!isInteractive) return;
      const newPoint = getRatingPoint(event);
      onValueHover(0);
      onValueChange?.(newPoint === value ? 0 : newPoint);
    },
    [isInteractive, value, onValueChange, getRatingPoint, onValueHover]
  );

  React.useEffect(() => {
    if (!ref.current) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (value === point) {
      ref.current.focus();
    } else if (value === 0 && ref.current.parentElement?.parentElement) {
      ref.current.parentElement?.parentElement?.focus();
    }
  }, [value, point, ref]);

  return (
    <>
      <Comp
        ref={ref}
        htmlFor={`${ratingIconId}-${point}`}
        aria-label={`${point} Stars`}
        onClick={!readOnly ? handleClick : undefined}
        onMouseMove={!readOnly ? handleMouseMove : undefined}
        onMouseLeave={!readOnly ? onMouseLeave : undefined}
        className={cn(
          "[&_svg]:pointer-events-none",
          isPartialPoint && "absolute top-0 overflow-hidden pointer-events-none",
          isPartialPoint && dir === "ltr" && "left-0",
          isPartialPoint && dir === "rtl" && "right-0",
          isInteractive && "cursor-pointer"
        )}
        style={{ width: partialPointWidth }}
      >
        {!isPartialPoint && !shouldShowFilled && icons.emptyIcon}
        {shouldShowFilled && icons.fullIcon}
      </Comp>
      {!readOnly && (
        <input
          type="radio"
          id={`${ratingIconId}-${point}`}
          name={name}
          value={point}
          className="sr-only"
          tabIndex={-1}
        />
      )}
    </>
  );
};

interface RatingProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  value: number;
  name?: string;
  max?: number;
  size?: number;
  Icon?: React.ReactElement<LucideProps>;
  variant?: keyof typeof ratingVariants;
  readOnly?: boolean;
  disabled?: boolean;
  precision?: number;
  /** Layout direction: "ltr" | "rtl" | "auto" (uses document dir) */
  dir?: "ltr" | "rtl" | "auto";
  onValueChange?: (value: number) => void;
  onValueHover?: (value: number) => void;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      name,
      max = DEFAULT_MAX_STARS,
      size = DEFAULT_STAR_SIZE,
      Icon = DEFAULT_ICON,
      variant = "default",
      className,
      readOnly = false,
      disabled = false,
      precision = DEFAULT_PRECISION,
      dir: dirProp = "auto",
      onValueChange,
      onValueHover,
      ...props
    },
    ref
  ) => {
    const id = React.useId();
    const ratingName = name ?? `rating-${id}`;
    const [hoveredValue, setHoveredValue] = React.useState<number>(0);
    const isInteractive = !readOnly && !disabled;

    const resolvedDir =
      dirProp === "auto" && typeof document !== "undefined"
        ? document.documentElement.dir
        : dirProp;
    const dir = resolvedDir === "rtl" ? "rtl" : "ltr";

    const handleValueHover = React.useCallback<(value: number) => void>(
      (point) => {
        setHoveredValue(point);
        onValueHover?.(point);
      },
      [onValueHover]
    );

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (!isInteractive) return;
        const increase =
          dir === "rtl"
            ? event.key === "ArrowLeft" || event.key === "ArrowDown"
            : event.key === "ArrowRight" || event.key === "ArrowUp";
        const decrease =
          dir === "rtl"
            ? event.key === "ArrowRight" || event.key === "ArrowUp"
            : event.key === "ArrowLeft" || event.key === "ArrowDown";
        if (increase) {
          event.preventDefault();
          if (value + precision > max) {
            onValueChange?.(0);
          } else {
            onValueChange?.(value + precision);
          }
        } else if (decrease) {
          event.preventDefault();
          if (value - precision < 0) {
            onValueChange?.(max);
          } else {
            onValueChange?.(value - precision);
          }
        }
      },
      [isInteractive, value, max, precision, onValueChange, dir]
    );

    const stars = React.useMemo(() => {
      if (!checkPrecision(precision)) return [];
      return Array.from({ length: max }, (_, index) => ({
        key: index,
        points: Array.from({ length: Math.floor(1 / precision) }).map(
          (__, i) => index + precision * (i + 1)
        ),
      }));
    }, [max, precision]);

    return (
      <div
        ref={ref}
        role={!readOnly ? "radiogroup" : "img"}
        dir={dir}
        onKeyDown={!readOnly ? handleKeyDown : undefined}
        tabIndex={!readOnly && value === 0 ? 0 : undefined}
        className={cn("flex", className)}
        aria-label={readOnly ? `${value} stars` : "Rating"}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} of ${max} stars`}
        {...props}
      >
        {stars.map(({ key, points }) => (
          <span
            key={key}
            className={cn(
              "relative",
              isInteractive && "transition-transform hover:scale-110",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            aria-disabled={disabled}
            aria-hidden={readOnly}
          >
            {points.map((point) => (
              <RatingItem
                key={point}
                name={ratingName}
                dir={dir}
                disabled={disabled}
                hoveredValue={hoveredValue}
                point={point}
                precision={precision}
                readOnly={readOnly}
                size={size}
                value={value}
                variant={variant}
                Icon={Icon}
                onMouseLeave={() => setHoveredValue(0)}
                onValueHover={handleValueHover}
                onValueChange={onValueChange}
              />
            ))}
          </span>
        ))}
      </div>
    );
  }
);
Rating.displayName = "Rating";

export { Rating };
