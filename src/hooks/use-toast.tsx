import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

// Create a React context for the toast state
const ToastContext = React.createContext<{
  state: State;
  toast: (props: Omit<ToasterToast, "id">) => { id: string; dismiss: () => void; update: (props: ToasterToast) => void };
  dismiss: (toastId?: string) => void;
} | undefined>(undefined);

// Initial state
const initialState: State = { toasts: [] };

// Provider component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, setStateInternal] = React.useState<State>(initialState);
  
  const setState = (nextState: State | ((prevState: State) => State)) => {
    if (typeof nextState === 'function') {
      setStateInternal((prevState) => nextState(prevState));
    } else {
      setStateInternal(nextState);
    }
  };
  
  const toast = React.useCallback((props: Omit<ToasterToast, "id">) => {
    const id = genId();
    
    const update = (props: ToasterToast) => {
      setState((prevState) => reducer(prevState, {
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      }));
    };
    
    const dismiss = () => {
      setState((prevState) => reducer(prevState, {
        type: "DISMISS_TOAST",
        toastId: id,
      }));
    };
    
    setState((prevState) => reducer(prevState, {
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss();
        },
      },
    }));
    
    return {
      id,
      dismiss,
      update,
    };
  }, []);
  
  const dismiss = React.useCallback((toastId?: string) => {
    setState((prevState) => reducer(prevState, {
      type: "DISMISS_TOAST",
      toastId,
    }));
  }, []);

  const contextValue = React.useMemo(() => ({
    state,
    toast,
    dismiss
  }), [state, toast, dismiss]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
}

// Hook to use toast
export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (context === undefined) {
    // Provide a fallback implementation that works outside of the context
    // This ensures the hook doesn't throw errors when used in places where the context isn't available
    return {
      toasts: [],
      toast: (props: Omit<ToasterToast, "id">) => {
        console.warn("useToast() called outside of ToastProvider context");
        const id = genId();
        return {
          id,
          dismiss: () => {},
          update: () => {},
        };
      },
      dismiss: () => {
        console.warn("toast.dismiss() called outside of ToastProvider context");
      },
    };
  }
  
  return {
    toasts: context.state.toasts,
    toast: context.toast,
    dismiss: context.dismiss,
  };
}

// Export a singleton toast function for use outside of React components
export const toast = (props: Omit<ToasterToast, "id">) => {
  const id = genId();
  return {
    id,
    dismiss: () => {},
    update: () => {},
  };
};
