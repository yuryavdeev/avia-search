import React from 'react'
import './App.css'
import SearchArea from '../SearchArea/SearchArea'
import CardsArea from '../CardsArea/CardsArea'
import flightsList from '../../utils/flights.json'


const App = () => {

  const mainList = flightsList.result.flights
  const [listForRender, setListForRender] = React.useState([])
  const [filteredList, setFilteredList] = React.useState([])
  const [formData, setFormData] = React.useState({})
  const [message, setMessage] = React.useState('')
  const [airlinesList, setAirlinesList] = React.useState({})
  const [airlinesChecked, setAirlinesChecked] = React.useState([])



  // фильтр по цене
  React.useEffect(() => {
    if (formData.priceFrom || formData.priceBefore) {
      const temporaryList = mainList.filter(card =>
        formData.priceFrom && formData.priceBefore ?
          card.flight.price.total.amount < Number(formData.priceBefore) && card.flight.price.total.amount > Number(formData.priceFrom)
          :
          formData.priceFrom && !formData.priceBefore ?
            card.flight.price.total.amount > Number(formData.priceFrom)
            :
            !formData.priceFrom && formData.priceBefore &&
            card.flight.price.total.amount < Number(formData.priceBefore)
      )
      if (temporaryList.length) {
        setListForRender(temporaryList)
      } else {
        setListForRender([])
        setMessage("Ничего не найдено")
      }
    }
    else {
      setListForRender(mainList)
    }
  }, [formData.priceBefore, formData.priceFrom, mainList])


  // // фильтр по сегментам (<= пересадки - есть/нет)
  React.useEffect(() => {
    formData.hasTransfer && !formData.directFlight ?
      setFilteredList(
        listForRender.filter(card =>
          card.flight.legs[0].segments.length > 1
        )
      )
      :
      !formData.hasTransfer && formData.directFlight ?
        setFilteredList(
          listForRender.filter(card =>
            card.flight.legs[0].segments.length === 1
          )
        )
        :
        setFilteredList([])
  }, [formData.hasTransfer, formData.directFlight, listForRender])


  // фильтр по сегментам (<= пересадки - есть/нет)
  // React.useEffect(() => {
  //   formData.hasTransfer && !formData.directFlight ?
  //     console.log('formData.hasTransfer')
  //     :
  //     !formData.hasTransfer && formData.directFlight ?
  //       console.log('formData.directFlight')
  //       :
  //       console.log('[empty]')
  // }, [formData.hasTransfer, formData.directFlight, listForRender])


  // получение списка перевозчиков с ценами
  React.useEffect(() => {
    let temporaryObj = {}
    let sortedList = []

    filteredList.length ?
      sortedList = filteredList.sort(function (cardLeft, cardRight) {
        if (Number(cardLeft.flight.price.total.amount) < Number(cardRight.flight.price.total.amount)) {
          return 1
        } if (Number(cardLeft.flight.price.total.amount) > Number(cardRight.flight.price.total.amount)) {
          return -1
        }
        return 0
      })
      :
      sortedList = listForRender.sort(function (cardLeft, cardRight) {
        if (Number(cardLeft.flight.price.total.amount) < Number(cardRight.flight.price.total.amount)) {
          return 1
        } if (Number(cardLeft.flight.price.total.amount) > Number(cardRight.flight.price.total.amount)) {
          return -1
        }
        return 0
      })

    if (sortedList.length) {
      sortedList.map(card =>
        temporaryObj = { ...temporaryObj, [card.flight.carrier.caption]: card.flight.price.total.amount }
      )
      setAirlinesList(temporaryObj)
    } else {
      setAirlinesList({})
    }
  }, [filteredList, listForRender])


  // console.log(airlinesList)


  // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  // React.useEffect(() => {
  //   airlinesList.length ?
  //     setUniqueAirlinesList([...new Set(airlinesList)])
  //     :
  //     setUniqueAirlinesList([])
  // }, [airlinesList])


  const handleSearchForm = (values, airlinesArr) => {
    setMessage('')
    if (Object.keys(values).length) {
      setFormData(values)
      setAirlinesChecked(airlinesArr)
    }
  }


  console.log(airlinesChecked)
  console.log(formData) // <<<<<<<<<<<<<<<<<<<<<<<<<<
  // console.log(filteredList) // <<<<<<<<<<<<<<<<<<<<<<<<
  // console.log(airlinesList) // <<<<<<<<<<<<<<<<<<<<<<<


  return (
    <div className="app">
      <SearchArea
        handleSearchForm={handleSearchForm}
        airlinesList={airlinesList}
      />
      {
        <CardsArea
          listForRender={
            filteredList.length ?
              filteredList
              :
              listForRender
          }
          message={message}
          formData={formData}
        />
      }
    </div>
  )
}

export default App
