import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Weather() {
  const [data, setData] = useState({
    location: {},
    current: { condition: {} },
  });
  const [inp, setInp] = useState("Baku");
  const [show, setShow] = useState(false);
  function getData() {
    setShow(true);
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=7b1eaf6efd804a44b87101529222212&q=${inp}&aqi=no`
      )
      .then((res) => {
        setData(res.data);
        setShow(false);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    getData();
  }

  return (
    <div>
      <div className="container">
        <div className="card">
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className="inp"
              value={inp}
              onChange={(e) => setInp(e.target.value)}
            />
            <button className="btn">Get ForceCast</button>
          </form>
          {show ? (
            <span className="loader"></span>
          ) : (
            <>
              <h1>{data.location.region}</h1>
              <img src={data.current.condition.icon} alt="" />
              <p>{data.current.condition.text}</p>
              <span>{data.current.temp_c}</span>
              <span>{data.current.temp_f}</span>
              <div className="parag">
                <p>{data.location.tz_id}</p>
                <p>{data.localtime}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
