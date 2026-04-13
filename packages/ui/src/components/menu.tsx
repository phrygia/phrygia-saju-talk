"use client";

import * as React from "react";
import { Check, ChevronRight, MoreHorizontal, Settings2 } from "lucide-react";
import { cn } from "../lib/utils";
import styles from "./menu.module.scss";

type MenuPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end";

interface MenuDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
}

function MenuDropdown({
  header,
  className,
  children,
  style,
  ...props
}: MenuDropdownProps) {
  return (
    <div
      className={cn(
        "min-w-52 rounded-2xl p-1.5 text-foreground",
        styles.dropdown,
        className,
      )}
      style={{ minWidth: 200, ...style }}
      {...props}
    >
      {header ? <div className="px-3 pb-1 pt-1.5">{header}</div> : null}
      <div className="flex flex-col gap-px">{children}</div>
    </div>
  );
}

interface MenuHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

function MenuHeader({ className, ...props }: MenuHeaderProps) {
  return <div className={cn(styles.header, className)} {...props} />;
}

interface MenuSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {}

function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn(styles.separator, className)}
      {...props}
    />
  );
}

type MenuContextValue = {
  closeMenu: () => void;
};

const MenuContext = React.createContext<MenuContextValue | null>(null);

interface MenuDropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  left?: React.ReactNode;
  right?: React.ReactNode;
  danger?: boolean;
}

function MenuDropdownItem({
  left,
  right,
  danger = false,
  className,
  children,
  disabled,
  onClick,
  ...props
}: MenuDropdownItemProps) {
  const menuContext = React.useContext(MenuContext);

  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-40",
        danger ? styles.dangerItem : styles.item,
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          menuContext?.closeMenu();
        }
      }}
      {...props}
    >
      {left ? <span className={styles.itemIcon}>{left}</span> : null}
      <span className="flex-1 whitespace-nowrap break-keep">{children}</span>
      {right ? (
        <span className="flex h-5 w-5 items-center justify-center opacity-50">
          {right}
        </span>
      ) : null}
    </button>
  );
}

interface MenuDropdownCheckItemProps extends Omit<
  MenuDropdownItemProps,
  "left"
> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  showCheckIcon?: boolean;
}

function MenuDropdownCheckItem({
  checked = false,
  onCheckedChange,
  showCheckIcon = true,
  onClick,
  children,
  ...props
}: MenuDropdownCheckItemProps) {
  const left = showCheckIcon ? (
    <Check size={13} className={cn(checked ? "opacity-100" : "opacity-0")} />
  ) : undefined;

  return (
    <MenuDropdownItem
      left={left}
      onClick={(event) => {
        onCheckedChange?.(!checked);
        onClick?.(event);
      }}
      aria-checked={checked}
      role="menuitemcheckbox"
      {...props}
    >
      {children}
    </MenuDropdownItem>
  );
}

interface MenuDropdownIconProps {
  name?: string;
}

function MenuDropdownIcon({ name }: MenuDropdownIconProps) {
  if (name?.includes("setting")) return <Settings2 size={14} />;
  if (name?.includes("more")) return <MoreHorizontal size={14} />;
  return <ChevronRight size={14} />;
}

interface MenuTriggerProps {
  children: React.ReactElement<{
    onClick?: (event: React.MouseEvent) => void;
    [key: string]: unknown;
  }>;
  dropdown: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  placement?: MenuPlacement;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
}

function MenuTrigger({
  children,
  dropdown,
  open,
  defaultOpen = false,
  placement = "bottom-start",
  onOpen,
  onClose,
  className,
}: MenuTriggerProps) {
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isOpen = isControlled ? open : uncontrolledOpen;
  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolledOpen(next);
      if (next) onOpen?.();
      else onClose?.();
    },
    [isControlled, onOpen, onClose],
  );

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [setOpen]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [setOpen]);

  return (
    <MenuContext.Provider value={{ closeMenu: () => setOpen(false) }}>
      <div ref={rootRef} className={cn("relative flex", className)}>
        {React.cloneElement(children, {
          onClick: (event: React.MouseEvent) => {
            children.props.onClick?.(event);
            setOpen(!isOpen);
          },
          "aria-expanded": isOpen,
          "aria-haspopup": "menu",
        })}
        {isOpen ? (
          <div className="absolute z-40" style={getPlacementStyle(placement)}>
            {dropdown}
          </div>
        ) : null}
      </div>
    </MenuContext.Provider>
  );
}

function getPlacementStyle(placement: MenuPlacement): React.CSSProperties {
  const gap = 8;
  const placements: Record<MenuPlacement, React.CSSProperties> = {
    top: {
      bottom: `calc(100% + ${gap}px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    "top-start": { bottom: `calc(100% + ${gap}px)`, left: 0 },
    "top-end": { bottom: `calc(100% + ${gap}px)`, right: 0 },
    bottom: {
      top: `calc(100% + ${gap}px)`,
      left: "50%",
      transform: "translateX(-50%)",
    },
    "bottom-start": { top: `calc(100% + ${gap}px)`, left: 0 },
    "bottom-end": { top: `calc(100% + ${gap}px)`, right: 0 },
    left: {
      right: `calc(100% + ${gap}px)`,
      top: "50%",
      transform: "translateY(-50%)",
    },
    "left-start": { right: `calc(100% + ${gap}px)`, top: 0 },
    "left-end": { right: `calc(100% + ${gap}px)`, bottom: 0 },
    right: {
      left: `calc(100% + ${gap}px)`,
      top: "50%",
      transform: "translateY(-50%)",
    },
    "right-start": { left: `calc(100% + ${gap}px)`, top: 0 },
    "right-end": { left: `calc(100% + ${gap}px)`, bottom: 0 },
  };
  return placements[placement];
}

const Menu = {
  Dropdown: MenuDropdown,
  Header: MenuHeader,
  Separator: MenuSeparator,
  DropdownItem: MenuDropdownItem,
  DropdownCheckItem: MenuDropdownCheckItem,
  DropdownIcon: MenuDropdownIcon,
  Trigger: MenuTrigger,
};

export {
  Menu,
  MenuDropdown,
  MenuHeader,
  MenuSeparator,
  MenuDropdownItem,
  MenuDropdownCheckItem,
  MenuDropdownIcon,
  MenuTrigger,
};
export type {
  MenuPlacement,
  MenuDropdownProps,
  MenuDropdownItemProps,
  MenuDropdownCheckItemProps,
  MenuTriggerProps,
};
