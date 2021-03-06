import React from 'react';
import axios from "axios";
import instance from "../source/mock";

const BASE_URL = "http://84.252.134.34:7000/api/v1";

function checkResponse(res) {
  if (res) {
    return res;
  }
  return Promise.reject(new Error(`Произошла непредвиденная ошибка.`));
}

const jwt = localStorage.getItem("jwt");

const headers = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${jwt}`,
  },
};


function auth(username, password) {
  return axios
    .post(
      `${BASE_URL}/token/`,
      { username, password },
      { headers: { "Content-Type": "application/json" } }
    )
    .then((res) => checkResponse(res));
}

function getCitiesList() {
  return instance.get("/cities", headers).then((res) => checkResponse(res));
}

function getUserProfile() {
  return axios.get(`${BASE_URL}/profile/`, {headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${jwt}`,
  }}).then((res) => {
    console.log(jwt)
    checkResponse(res)});
}

function getMainPage() {
  return instance.get("/main", headers).then((res) => checkResponse(res));
}

function getEvents() {
  return instance
    .get("/afisha/events", headers)
    .then((res) => checkResponse(res));
}

function takePartInEvent(event) {
  return instance
    .post("/afisha/event-participants/", event, headers)
    .then((res) => checkResponse(res));
}

function changeCity(cityId) {
  return instance
    .patch("/profile", { city: cityId }, headers)
    .then((res) => checkResponse(res));
}

function getPlace() {
  return instance.get(`place/`);
}

function getPlaces() {
  return instance.get(`places/`);
}

function getQuestions() {
  return instance.get("/questions", headers).then((res) => checkResponse(res));
}

export default {
  auth,
  getCitiesList,
  getUserProfile,
  getMainPage,
  getEvents,
  takePartInEvent,
  changeCity,
  getPlace,
  getPlaces,
  getQuestions,
};
