import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import sendArrowImg from "../assets/images/icon-arrow.svg";

function AgeCalculator() {
  const [birthDetails, setBirthDetails] = useState({day:"",month:"",year:""});

  const [displayOutput, setDisplayOutput] = useState({
    day: "--",
    month: "--",
    year: "--",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function validates(birthDetails) {
    const errors = {};

    if (birthDetails.day === "") {
      errors.day = "this field is required";
    }
    if (birthDetails.month === "") {
      errors.month = "this field is required";
    }
    if (birthDetails.year === "") {
      errors.year = "this field is required";
    }

    return errors;
  }

  

  const handleInputs = useCallback((e) => {
    const target = e.target;

    const { name, value } = target;

    if (isNaN(value)) return;

    if (name === "month" && value > 12) {
      return;
    }

    setBirthDetails((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  }, []);

  useEffect(() => {
    // Return a cleanup function that resets the date state when the component unmounts

    return () => {
      setBirthDetails({
        year: "",
        month: "",
        day: "",
      });
    };
  }, [handleInputs]);

  function AgeCalculator() {
    const recentDate = new Date();

    const daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const integerBirthDay = Number(birthDetails.day);
    const integerBirthMonth = Number(birthDetails.month);
    const integerBirthYear = Number(birthDetails.year);
    let recentDay = recentDate.getDate();
    let recentMonth = recentDate.getMonth() + 1;
    let recentYear = recentDate.getFullYear();

    if (integerBirthYear > recentYear || (integerBirthMonth > recentMonth && integerBirthYear == recentYear) || (integerBirthDay > recentDay && integerBirthMonth == recentMonth)) {
      setErrors({ notBorn: "invalid date" });
      return;
    }
    const numberOfDaysInSpecificMonth = daysInMonths[integerBirthMonth - 1];

    if (integerBirthDay > numberOfDaysInSpecificMonth) {
      setErrors({ notBorn: "invalid date" });
      return;
    }

    leapYearChecker(recentYear, daysInMonths);
    // if (integerBirthDay > recentDay) {
    //   recentDay += daysInMonths[recentMonth - 1];
    //   recentMonth -= 1;
    // }

    // if (integerBirthMonth > recentMonth) {
    //   recentMonth += 12;
    //   recentYear -= 1;
    // }

    // daysOld = recentDay - integerBirthDay;
    // monthssOld = recentMonth - integerBirthMonth;
    // yearsOld = recentYear - integerBirthYear;

    let yearsOld;
    let monthssOld;
    let daysOld;

    yearsOld = recentYear - integerBirthYear;

    if (recentMonth >= integerBirthMonth) {
      monthssOld = recentMonth - integerBirthMonth;
    } else {
      yearsOld--;

      monthssOld = 12 + (recentMonth - integerBirthMonth);
    }

    if (recentDay >= integerBirthDay) {
      daysOld = recentDay - integerBirthDay;
    } else {
      //   monthssOld--;
      let days = daysInMonths[recentMonth - 2];
      daysOld = days + recentDay - integerBirthDay;
      if (recentMonth < 0) {
        recentMonth = 11;
        yearsOld--;
      }
    }

    

    setDisplayOutput({
      day: daysOld,
      month: monthssOld,
      year: yearsOld,
    });
  }

  function leapYearChecker(year, month) {
    if (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)) {
      month[1] = 29;
    } else {
      month[1] = 28;
    }

    // console.log(year, month[1]);
  }

  function submitForm() {
    AgeCalculator();

    setBirthDetails({
      year: "",
      month: "",
      day: "",
    });
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submitting) {
      submitForm();
    }
  }, [errors]);

  function handleSubmit(e) {
    e.preventDefault();

    setErrors(validates(birthDetails));

    setSubmitting(true);
  }

  return (
    <div className="calculator__wrapper">
      <form onSubmit={handleSubmit}>
        <label htmlFor="day" className="label-input">
          <input
            placeholder=""
            type="text"
            name="day"
            id="day"
            className={`input day ${errors.day || errors.notBorn ? "active-error" : ""}
            `}
            onChange={handleInputs}
            value={birthDetails.day}
            maxLength="2"
            minLength="2"
          />
          <span className={`error1 ${errors.day || errors.notBorn ? "active-error" : ""}`}>day</span>
          {errors.day && <span className="error2">{errors.day}</span>}
          {errors.notBorn && <span className="error2">{errors.notBorn}</span>}
        </label>

        <label htmlFor="month" className="label-input">
          <input
            placeholder=""
            type="text"
            name="month"
            id="month"
            className={`input month ${errors.month || errors.notBorn ? "active-error" : ""}
            `}
            onChange={handleInputs}
            value={birthDetails.month}
            maxLength="2"
            minLength="2"
            max="12"
          />
          <span className={`error1 ${errors.month || errors.notBorn ? "active-error" : ""}`}>month</span>

          {errors.month && <span className="error2">{errors.month}</span>}
        </label>

        <label htmlFor="year" className="label-input">
          <input
            placeholder=""
            type="text"
            name="year"
            id="year"
            className={`input year ${errors.year || errors.notBorn ? "active-error" : ""}
            
            `}
            onChange={handleInputs}
            value={birthDetails.year}
            maxLength="4"
            minLength="4"
          />
          <span className={`error1 ${errors.year || errors.notBorn ? "active-error" : ""}`}>year</span>
          {errors.year && <span className="error2">{errors.year}</span>}
        </label>

        <button className="send-btn">
          <img src={sendArrowImg} alt="" />
        </button>
      </form>

      <section className="form__output">
        <p className="years">
          <span>{displayOutput.year}</span> years
        </p>
        <p className="months">
          <span>{displayOutput.month}</span> months
        </p>
        <p className="days">
          <span>{displayOutput.day}</span> days
        </p>
      </section>
    </div>
  );
}

export default AgeCalculator;