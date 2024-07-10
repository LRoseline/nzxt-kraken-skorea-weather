import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [cpus, setCpus] = useState(null);
    const [gpus, setGpus] = useState(null);
    const [ram, setRam] = useState(null);
    const [kraken, setKraken] = useState(null);

    const [liquid, setLiquid] = useState(null);
    const [weather, setWeather] = useState("01d");
    const [outTemp, setOutTemp] = useState("23");

    const weatherAxi = () => {
        axios.get("https://api.tsukimorifriends.xyz/api/weather/current/온천동?authkey="+process.env.REACT_APP_PRODUCT_KEY).then(r => {
            setWeather(r.data.body.weather.current.weather[0].icon);
            setOutTemp(Math.floor(r.data.body.weather.current.temp));
        }).catch(e => {
            setWeather("Error Data");
        });
    }

    useEffect(() => {
        window.nzxt = {
            v1: {
                onMonitoringDataUpdate: (data) => {
                    const { cpus, gpus, ram, kraken } = data;

                    setCpus(Math.floor(cpus[0].temperature));
                    setGpus(gpus);
                    setRam(ram);
                    setKraken(kraken);

                    setLiquid(kraken.liquidTemperature);
                }
            }
        };
    }, []);


    const [clock, setClock] = useState("00:00");

    const timeFormatZ = (ints) => {
        if (ints < 10) {
            return ints = "0"+ints;
        }

        return ints;
    }

    useEffect(() => {
        const Timer = setInterval(() => {
            let time = new Date();

            setClock(timeFormatZ(time.getHours())+":"+timeFormatZ(time.getMinutes()));
        }, 1000);

        weatherAxi();

        const weatherTimer = setInterval(() => {
            weatherAxi();
        }, 1000*60*60);

        return () => {
            clearInterval(Timer);
            clearInterval(weatherTimer);
        }
    });

    return (
        <div>
            <div className="elias" style={{backgroundImage: `radial-gradient(#0000, #000F), url(${+process.env.PUBLIC_URL+"/weather/"+weather+".png"})`}}>
                <div className="circle">
                    <div className="clock">{clock}</div>
                    <div className="cpu">
                        <div>
                            <div className="tabo">CPU</div>
                            <div className="tabo-value">{cpus}</div>
                        </div>
                        <div>
                            <div className="tabo">WATER</div>
                            <div className="tabo-value">{liquid}</div>
                        </div>
                    </div>
                </div>
                <div className="bottom">
                    <div>OUTSIDE</div>
                    <div style={{fontSize: "1cm"}}>{outTemp}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
