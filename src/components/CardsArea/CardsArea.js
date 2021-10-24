import React from 'react'
import './CardsArea.css'
import Card from '../Card/Card'

const CardsArea = React.memo(({ listForRender, message, formData }) => {

  const [cardToRender, setCardToRender] = React.useState([])
  const [buttonVisible, setButtonVisible] = React.useState(true)
  const [numbers, setNumbers] = React.useState(2)


  // сортировка по цене и длительности перелета 
  React.useEffect(() => {
    if (formData.sort) {
      switch (formData.sort) {
        case "priceUp":
          (listForRender.sort(function (cardLeft, cardRight) {
            if (Number(cardLeft.flight.price.total.amount) > Number(cardRight.flight.price.total.amount)) {
              return 1
            }
            if (Number(cardLeft.flight.price.total.amount) < Number(cardRight.flight.price.total.amount)) {
              return -1
            }
            // cardLeft === cardRight
            return 0
          }))
          break

        case "priceDown":
          (listForRender.sort(function (cardLeft, cardRight) {
            if (Number(cardLeft.flight.price.total.amount) < Number(cardRight.flight.price.total.amount)) {
              return 1
            }
            if (Number(cardLeft.flight.price.total.amount) > Number(cardRight.flight.price.total.amount)) {
              return -1
            }
            return 0
          }))
          break

        case "duration":
          (listForRender.sort(function (cardLeft, cardRight) {
            if (Number(cardLeft.flight.legs[0].duration) > Number(cardRight.flight.legs[0].duration)) {
              return 1
            }
            if (Number(cardLeft.flight.legs[0].duration) < Number(cardRight.flight.legs[0].duration)) {
              return -1
            }
            return 0
          }))
          break

        default:
          console.log('Блок поиска "Сортировать" не использовался')
      }
    }
  }, [formData.sort, listForRender])


  React.useEffect(() => {
    setButtonVisible(true)
    setCardToRender(
      listForRender.slice(0, numbers).map(card =>
        <Card
          key={card.flightToken}
          card={card}
        />
      )
    )
    listForRender.length <= numbers && setButtonVisible(false)
  }, [listForRender, numbers, formData.sort])


  const addCardsToScreen = () => {
    setNumbers(numbers + 2)
  }


  return (
    <section className="cards-area">
      {
        message ?
          <p className="cards-area__message">{message}</p>
          :
          <div className='cards-area__flex'>{cardToRender}</div>
      }
      {
        buttonVisible &&
        !message &&
        <button className='cards-area__button' onClick={addCardsToScreen}>Показать ещё</button>
      }
    </section>
  )
})

export default CardsArea
