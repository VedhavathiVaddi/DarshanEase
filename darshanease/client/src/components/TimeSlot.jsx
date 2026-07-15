import { TIME_SLOTS } from '../utils/constants';
import { classNames } from '../utils/helpers';

/**
 * Renders the available darshan time slots as a selectable grid.
 * @param {string} value - currently selected slot
 * @param {(slot: string) => void} onChange
 * @param {string[]} [disabledSlots] - slots to render but block (e.g. sold out)
 */
function TimeSlot({ value, onChange, disabledSlots = [] }) {
  return (
    <div className="slot-grid" role="radiogroup" aria-label="Darshan time slot">
      {TIME_SLOTS.map((slot) => {
        const isSelected = value === slot;
        const isDisabled = disabledSlots.includes(slot);
        return (
          <button
            key={slot}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={isDisabled}
            className={classNames('slot-btn', isSelected && 'selected')}
            onClick={() => onChange(slot)}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}

export default TimeSlot;
