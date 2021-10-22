import React from 'react';
import './Card.css';
import logo from '../../utils/logo.svg'
import { config } from '../../utils/conf';
import { DateTime } from "luxon";


const Card = React.memo(({ card }) => {

  const segments = card.flight.legs[0].segments.length
  const segmentsBack = card.flight.legs[1].segments.length

  const airline = card.flight.legs[0].segments[0].airline.caption
  const airlineBack = card.flight.legs[1].segments[0].airline.caption

  const departureDate = card.flight.legs[0].segments[0].departureDate
  const arrivalDate = card.flight.legs[0].segments[segments - 1].arrivalDate
  const departureDateBack = card.flight.legs[1].segments[0].departureDate
  const arrivalDateBack = card.flight.legs[1].segments[segmentsBack - 1].arrivalDate

  const departureCity = card.flight.legs[0].segments[0].departureCity.caption
  const departureCityBack =
    card.flight.legs[1].segments[0].departureCity ?
      card.flight.legs[1].segments[0].departureCity.caption
      :
      ''
  const departureAirport = card.flight.legs[0].segments[0].departureAirport.caption
  const departureAirportBack = card.flight.legs[1].segments[0].departureAirport.caption
  const departureAirportId = card.flight.legs[0].segments[0].departureAirport.uid
  const departureAirportIdBack = card.flight.legs[1].segments[0].departureAirport.uid

  const arrivalCity =
    card.flight.legs[0].segments[segments - 1].arrivalCity ?
      card.flight.legs[0].segments[segments - 1].arrivalCity.caption
      :
      ''
  const arrivalCityBack = card.flight.legs[1].segments[segmentsBack - 1].arrivalCity.caption
  const arrivalAirport = card.flight.legs[0].segments[segments - 1].arrivalAirport.caption
  const arrivalAirportBack = card.flight.legs[1].segments[segmentsBack - 1].arrivalAirport.caption
  const arrivalAirportId = card.flight.legs[0].segments[segments - 1].arrivalAirport.uid
  const arrivalAirportIdBack = card.flight.legs[1].segments[segmentsBack - 1].arrivalAirport.uid

  const [durationForvard, setDurationForvard] = React.useState('')
  const [durationBack, setDurationBack] = React.useState('')

  const [dateOfStart, setDateOfStart] = React.useState('')
  const [dateOfFinish, setDateOfFinish] = React.useState('')
  const [dateOfStartBack, setDateOfStartBack] = React.useState('')
  const [dateOfFinishBack, setDateOfFinishBack] = React.useState('')

  const [timeOfStart, setTimeOfStart] = React.useState('')
  const [timeOfFinish, setTimeOfFinish] = React.useState('')
  const [timeOfStartBack, setTimeOfStartBack] = React.useState('')
  const [timeOfFinishBack, setTimeOfFinishBack] = React.useState('')

  // дата и время
  React.useEffect(() => {
    setDateOfStart((DateTime.fromISO(departureDate).setLocale('ru').toFormat('dd LLL ccc')))
    setDateOfFinish((DateTime.fromISO(arrivalDate).setLocale('ru').toFormat('dd LLL ccc')))
    setDateOfStartBack((DateTime.fromISO(departureDateBack).setLocale('ru').toFormat('dd LLL ccc')))
    setDateOfFinishBack((DateTime.fromISO(arrivalDateBack).setLocale('ru').toFormat('dd LLL ccc')))
    setTimeOfStart((DateTime.fromISO(departureDate).setLocale('ru').toFormat('T')))
    setTimeOfFinish((DateTime.fromISO(arrivalDate).setLocale('ru').toFormat('T')))
    setTimeOfStartBack((DateTime.fromISO(departureDateBack).setLocale('ru').toFormat('T')))
    setTimeOfFinishBack((DateTime.fromISO(arrivalDateBack).setLocale('ru').toFormat('T')))
  }, [arrivalDate, arrivalDateBack, departureDate, departureDateBack])


  // продолжительность полета
  React.useEffect(() => {
    const getReadableDuration = (minutes) => {
      const dur = Number(minutes)
      const h = Math.floor(dur / 60)
      const m = Math.floor(dur % 60)
      return (`${h} ч ${m} мин`)
    }
    setDurationForvard(getReadableDuration(card.flight.legs[0].duration))
    setDurationBack(getReadableDuration(card.flight.legs[1].duration))
  }, [card])

  const handleClickButtonOfCard = () => {
    // some handler and POST with cardData (query to API)
    console.log(card)
  }


  return (
    <div className="card">

      <div className="card__heading">
        <img className="card__logo" src={logo} alt="логотип авиакомпании" />
        <p className="card__cost">{card.flight.price.total.amount} &#8381;</p>
        <p className="card__cost-info">{config.costAdultPassenger}</p>
      </div>

      <ul className="card__list-info">
        <li className="card__list-item">
          <p className="card__list-flight">
            {departureCity + ', ' + departureAirport}
            <span className="card__airport-id">{departureAirportId} &#10230;</span>
            {arrivalCity ? (arrivalCity + ', ' + arrivalAirport) : arrivalAirport}
            <span className="card__airport-id">{arrivalAirportId}</span>
          </p>
          <div className="card__list-container">
            <p className="card__list-time">{timeOfStart}</p>
            <p className="card__list-date">{dateOfStart}</p>
            <p className="card__list-duration">&#8986; {durationForvard}</p>
            <p className="card__list-date">{dateOfFinish}</p>
            <p className="card__list-time">{timeOfFinish}</p>
          </div>
          <div className="card__list-transfer-container">
            <hr className="card__list-border-line"></hr>
            {
              segments > 1 &&
              <p className="card__list-transfer">
                {
                  segments === 2 ?
                    `${segments - 1} пересадка`
                    :
                    `${segments - 1} пересадки`
                }
              </p>
            }
            <hr className="card__list-border-line"></hr>
          </div>
          <p className="card__list-carrier">Рейс выполняет: {airline}</p>
        </li>

        <li className="card__list-item">
          <p className="card__list-flight">
            {departureCityBack ? (departureCityBack + ', ' + departureAirportBack) : departureAirportBack}
            <span className="card__airport-id">{departureAirportIdBack} &#10230;</span>
            {arrivalCityBack + ', ' + arrivalAirportBack}
            <span className="card__airport-id">{arrivalAirportIdBack}</span>
          </p>
          <div className="card__list-container">
            <p className="card__list-time">{timeOfStartBack}</p>
            <p className="card__list-date">{dateOfStartBack}</p>
            <p className="card__list-duration">&#8986; {durationBack}</p>
            <p className="card__list-date">{dateOfFinishBack}</p>
            <p className="card__list-time">{timeOfFinishBack}</p>
          </div>
          <div className="card__list-transfer-container">
            <hr className="card__list-border-line"></hr>
            {
              segmentsBack > 1 &&
              <p className="card__list-transfer">
                {
                  segmentsBack === 2 ?
                    `${segmentsBack - 1} пересадка`
                    :
                    `${segmentsBack - 1} пересадки`
                }
              </p>
            }
            <hr className="card__list-border-line"></hr>
          </div>
          <p className="card__list-carrier">Рейс выполняет: {airlineBack}</p>
        </li>
      </ul>

      <button className="card__button" onClick={handleClickButtonOfCard}>ВЫБРАТЬ</button>

    </div>
  );
})

export default Card;
