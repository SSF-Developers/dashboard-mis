import moment from "moment";
import { array } from "prop-types";
import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const InputDatePicker = forwardRef(
    (
        { name, label, placeholder, id, onSelect, value, maxDate, className, includedDates, ...props },
        ref
    ) => {
        return (
            <React.Fragment>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <i className="calendarDates"></i>
                    {label && (
                        <label className="animLabel" htmlFor={id}>
                            {label}
                        </label>
                    )}
                    <DatePicker
                        className={`${className}`}
                        name={name}
                        id={id}
                        selected={value ? new Date(value) : null}
                        onChange={(date) => {
                            onSelect(date);
                        }}
                        minDate={new Date("02-01-2020")}
                        maxDate={maxDate}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        placeholderText={placeholder}
                        includeDates={includedDates}
                        {...props}
                    />
                </div>
            </React.Fragment>
        );
    }
);
export default InputDatePicker;

function foo(array) {
    return Object.entries(
        array.reduce((obj, item, index) => {
            if (typeof item === "string") {
                obj[(obj[index] = item.toUpperCase())] = index;
            }

            return obj;
        }, {})
    );
}

const bar = foo(["a", "b", "c"]);
