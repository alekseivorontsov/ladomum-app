import React, {useState} from "react";
import moment from "moment";
import "./CustomDateRangePicker.scss";
import {HiMapPin} from "react-icons/hi2";
import {useLocation, useNavigate} from "react-router-dom";

const Heading = ({date, changeMonth, resetDate}) => (
    <nav className="calendar--nav">
        <a onClick={() => changeMonth(date.month() - 1)}>&#8249;</a>
        <h1 onClick={() => resetDate()}>
            {date.format("MMMM")} <small>{date.format("YYYY")}</small>
        </h1>
        <a onClick={() => changeMonth(date.month() + 1)}>&#8250;</a>
    </nav>
);

const Day = ({currentDate, date, startDate, endDate, onClick}) => {
    let className = [];

    const now = moment().startOf('day');
    if (date.isBefore(now)) {
        className.push("muted");
    }

    if (now.isSame(date, "day")) {
        className.push("active");
    }

    if (startDate && date.isSame(startDate, "day")) {
        className.push("start");
    }

    if (date.isBetween(startDate, endDate, "day")) {
        className.push("between");
    }

    if (endDate && date.isSame(endDate, "day")) {
        className.push("end");
    }

    if (!date.isSame(currentDate, "month")) {
        className.push("muted");
    }

    if (date.disabled) {
        className.push('between-disabled');
    }

    return (
        <span
            onClick={() => onClick(date)}
            className={className.join(" ")}
        >
      {date.date()}
    </span>
    );
};

const isDisabledDate = (date, disabledDates) => {
    for (let disabledDate of disabledDates) {
        if (date.isSame(disabledDate, "day")) {
            return true;
        }
    }

    return false;
};

const Days = ({date, startDate, endDate, onClick, disabledDates}) => {
    const thisDate = moment(date);
    const daysInMonth = moment(date).daysInMonth();
    const firstDayDate = moment(date).startOf("month");
    const previousMonth = moment(date).subtract(1, "month");
    const previousMonthDays = previousMonth.daysInMonth();
    const nextMonth = moment(date).add(1, "month");
    let days = [];
    let labels = [];

    for (let i = 1; i <= 7; i++) {
        labels.push(
            <span key={i} className="label">
        {moment().day(i).format("ddd")}
      </span>
        );
    }

    for (let i = firstDayDate.day(); i > 1; i--) {
        previousMonth.date(previousMonthDays - i + 2);
        const toDisplay = moment(previousMonth);
        toDisplay.disabled = isDisabledDate(toDisplay, disabledDates);

        days.push(
            <Day
                key={toDisplay.format("DD MM YYYY")}
                onClick={(date) => onClick(date)}
                currentDate={date}
                date={toDisplay}
                startDate={startDate}
                endDate={endDate}
                // disabledDates={disabledDates}
            />
        );
    }

    for (let i = 1; i <= daysInMonth; i++) {
        thisDate.date(i);
        const toDisplay = moment(thisDate);
        toDisplay.disabled = isDisabledDate(toDisplay, disabledDates);

        days.push(
            <Day
                key={toDisplay.format("DD MM YYYY")}
                onClick={(date) => onClick(date)}
                currentDate={date}
                date={toDisplay}
                startDate={startDate}
                endDate={endDate}
                // disabledDates={disabledDates}
            />
        );
    }

    const daysCount = days.length;
    for (let i = 1; i <= 42 - daysCount; i++) {
        nextMonth.date(i);
        const toDisplay = moment(nextMonth);
        toDisplay.disabled = isDisabledDate(toDisplay, disabledDates);

        days.push(
            <Day
                key={toDisplay.format("DD MM YYYY")}
                onClick={(date) => onClick(date)}
                currentDate={date}
                date={toDisplay}
                startDate={startDate}
                endDate={endDate}
                // disabledDates={disabledDates}
            />
        );
    }

    return (
        <nav className="calendar--days">
            {labels}
            {days}
        </nav>
    );
};

const CustomDateRangePicker = () => {
    const [date, setDate] = useState(moment());
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [canBook, setCanBook] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const disabledDates = [
        moment().add(4, 'day'),
        moment().add(5, 'day'),
        moment().add(6, 'day'),
        moment().add(7, 'day'),
        moment().add(8, 'day'),
        moment().add(9, 'day'),
        moment().add(10, 'day'),
    ];

    const resetDate = () => {
        setDate(moment());
    };

    const changeMonth = (month) => {
        const newDate = moment(date);
        newDate.month(month);
        setDate(newDate);
    };

    const rangeContainsDisabledDates = (startDate, endDate) => {
        for (let disabledDate of disabledDates) {
            if (disabledDate.startOf('day') >= startDate.startOf('day')
                && disabledDate.startOf('day') <= endDate.startOf('day')) {
                return true;
            }
        }
        return false;
    };

    const changeDate = (date) => {
        const now = moment().endOf('day');
        if (date.isBefore(now) || date.disabled) {
            return;
        }

        let newStartDate = startDate;
        let newEndDate = endDate;

        if (
            !startDate ||
            date.isBefore(startDate, "day") ||
            !startDate.isSame(endDate, "day") ||
            rangeContainsDisabledDates(startDate, date)
        ) {
            newStartDate = moment(date);
            newEndDate = moment(date);
        } else if (date.isSame(startDate, "day") && date.isSame(endDate, "day")) {
            newStartDate = null;
            newEndDate = null;
        } else if (date.isAfter(startDate, "day")) {
            newEndDate = moment(date);
        }

        setStartDate(newStartDate);
        setEndDate(newEndDate);
        if (newStartDate && newEndDate && newEndDate.isAfter(newStartDate)) {
            setCanBook(true);
        } else {
            setCanBook(false);
        }
    };

    const getPropertyName = () => {
        const lastUrlPart = location.pathname.split('/');
        const propertyId = lastUrlPart[lastUrlPart.length - 1];
        return propertyId.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    const propertyName = getPropertyName();
    return (
        <React.Fragment>
            <div className="w-full mx-auto max-w-lg mt-2 md:mt-4">
                <h1 className="text-2xl mb-2 md:mb-4"><b>{propertyName}</b> - book your stay</h1>
                <div className="flex">
                    <HiMapPin size={20}/><p className="text-gray-600 md:mb-2 ml-2">3400 Ne 25th St
                    Fort Lauderdale, FL 33305 USA</p>
                </div>
                <div className="calendar mx-auto mt-2 md:mt-4 bg-white rounded-lg">
                    <Heading
                        date={date}
                        changeMonth={changeMonth}
                        resetDate={resetDate}
                    />

                    <Days
                        onClick={changeDate}
                        date={date}
                        startDate={startDate}
                        endDate={endDate}
                        disabledDates={disabledDates}
                    />
                    <button
                        className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded ${canBook ? 'hover:bg-blue-600' : 'opacity-50 cursor-not-allowed'} `}
                        onClick={() => canBook && setModalActive(true)}
                    >
                        Book
                    </button>
                </div>
            </div>
            <br/>
            <div className="modal-overlay"
                 style={modalActive || bookingConfirmed ? {display: 'block'} : {display: 'none'}}
            >
            </div>
            <div className={`fixed inset-0 ${modalActive ? 'flex' : 'hidden'} items-center justify-center z-50`}>
                <div className="bg-white rounded-lg p-8 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">Confirmation</h2>
                    <p className="mb-4">Are you sure you want to make a booking?</p>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                                onClick={() => {
                                    setModalActive(false);
                                    setBookingConfirmed(true);
                                }}>
                            Confirm
                        </button>
                        <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                onClick={() => setModalActive(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className={`fixed inset-0 ${bookingConfirmed ? 'flex' : 'hidden'} items-center justify-center z-50`}>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Booking confirmed!</h2>
                    <p className="text-gray-700 mb-6">Have a great stay!</p>
                    <div className="flex justify-end">
                        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded"
                                onClick={() => {
                                    setBookingConfirmed(false);
                                    navigate('/');
                                }}
                        >
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default CustomDateRangePicker;
