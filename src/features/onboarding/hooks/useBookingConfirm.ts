import { useCallback, useRef } from 'react';

import { useAppDispatch } from '@/store/hooks';
import { bookCallThunk } from '@/store/thunks/bookingThunks';

import type { CalendlyEvent } from '@/types/calendly.types';

export const useBookingConfirm = (): {
  handleEventScheduled: (data: CalendlyEvent) => void;
} => {
  const dispatch = useAppDispatch();
  const eventTriggered = useRef<boolean>(false);

  const handleEventScheduled = useCallback(
    (data: CalendlyEvent): void => {
      if (eventTriggered.current) {
        return;
      }

      eventTriggered.current = true;
      setTimeout((): void => {
        void dispatch(bookCallThunk(data));
      }, 3000);
    },
    [dispatch],
  );

  return {
    handleEventScheduled,
  };
};
