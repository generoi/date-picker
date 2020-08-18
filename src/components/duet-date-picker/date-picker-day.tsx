import { h, FunctionalComponent } from "@stencil/core"
import { isEqual } from "./date-utils"
import { DuetDateFormatter } from "./types"

export type DatePickerDayProps = {
  selectedDay: Date
  focusedDay: Date
  today: Date
  day: Date
  inRange: boolean
  onDaySelect: (event: MouseEvent, day: Date) => void
  dateFormatter: DuetDateFormatter
  onKeyboardNavigation: (event: KeyboardEvent) => void
  focusedDayRef?: (element: HTMLButtonElement) => void
}

export const DatePickerDay: FunctionalComponent<DatePickerDayProps> = ({
  selectedDay,
  focusedDay,
  today,
  day,
  onDaySelect,
  onKeyboardNavigation,
  focusedDayRef,
  inRange,
  dateFormatter,
}) => {
  const isToday = isEqual(day, today)
  const isFocused = isEqual(day, focusedDay)
  const isSelected = isEqual(day, selectedDay)
  const isDisabled = day.getMonth() !== focusedDay.getMonth()
  const isOutsideRange = !inRange
  const dateLabel = dateFormatter(day)

  function handleClick(e) {
    onDaySelect(e, day)
  }

  return (
    <button
      class={{
        "duet-date__day": true,
        "is-outside": isOutsideRange,
        "is-disabled": isDisabled,
        "is-today": isToday,
      }}
      tabIndex={isFocused ? 0 : -1}
      onClick={handleClick}
      onKeyDown={onKeyboardNavigation}
      aria-selected={isSelected ? "true" : undefined}
      data-label={dateLabel}
      disabled={isOutsideRange || isDisabled}
      type="button"
      ref={el => {
        if (isFocused && el && focusedDayRef) {
          focusedDayRef(el)
        }
      }}
    >
      <span aria-hidden="true">{day.getDate()}</span>
      <span class="duet-date__vhidden">{dateLabel}</span>
    </button>
  )
}
