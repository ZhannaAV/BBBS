import React from "react";
import Event from "./Event";
import CurrentUserContext from "../../context/CurrentUserContext";
import api from "../../utils/api";
import { sortingArrayOrderByDate } from "../../utils/formatTime";
import Loader from '../Loader/Loader';
import './Account.css';
import CityPopup from "../CityPopup/CityPopup";


function Account(props) {
  const userData = React.useContext(CurrentUserContext);
  const [events, setEvents] = React.useState([]);
  const [city, setCity] = React.useState('');
  const [citiesArray, setCitiesArray] = React.useState([]);
  const [isContentReady, setIsContentReady] = React.useState(false)

  React.useEffect(() => {
    api.getEvents().then((res) => {
      setEvents(res.data);
      setIsContentReady(true);
    });
  }, [])

  React.useEffect(() => { // попросить бек высылать имя города
    api
      .getCitiesList()
      .then((res) => {
        setCitiesArray(res.data)
        res.data.map((el) => el.id === userData.city && setCity(el.name))
      }
      );
  }, []);


if(isContentReady) {
  return (
    <>
      <section className="account">
        <div className="account__buttons">
          <button type="button" className="account__button" onClick={() => props.enroll.toggleCityPopup()}>
            {city}. Изменить ваш город
          </button>
          <button
            type="button"
            onClick={props.signOut}
            className="account__button"
          >
            Выйти
          </button>
        </div>
        <p className="account__events-text">
          {events.length !== 0
            ? "Вы записаны на мероприятия:"
            : "У вас нет записи на мероприятие"}
        </p>
        <div className="account__events">
          <div className="account__scroll">
            {events.length !== 0 &&
              sortingArrayOrderByDate(events).map(
                (event) =>
                  event.booked && (
                    <Event key={event.id} event={event} enroll={props.enroll} />
                  )
              )}
          </div>
        </div>
      </section>
      <CityPopup 
        enroll={props.enroll}
        onUserData={props.onUserData}
        cities={citiesArray}
      />
    </>
  );
}  return <Loader />
  
}

export default Account;
