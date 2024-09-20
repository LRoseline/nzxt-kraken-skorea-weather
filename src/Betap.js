import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

function Betap() {
    const [cpus, setCpus] = useState(null);
    const [gpus, setGpus] = useState(null);
    const [ram, setRam] = useState(null);
    const [kraken, setKraken] = useState(null);

    const [cpuT, setCpuT] = useState(40);
    const [gpuT, setGpuT] = useState(60);

    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get('lat');
    const lon = urlParams.get('lon');
    const wkey = urlParams.get('wkey');
    const dustkey = urlParams.get('dustkey');
    const station = urlParams.get('station');
    
    const [liquid, setLiquid] = useState(30);
    const [weather, setWeather] = useState("01d");
    const [outTemp, setOutTemp] = useState("-20");

    const [pm10v, setPm10v] = useState("000");
    const [pm25v, setPm25v] = useState("000");

    const [pm10g, setPm10g] = useState(null);
    const [pm25g, setPm25g] = useState(null);
    
    const [clock, setClock] = useState("00:00");

    const [datas, setDatas] = useState(null);

    useEffect(() => {
        window.nzxt = {
            v1: {
                onMonitoringDataUpdate: (data) => {
                    const { cpus, gpus, ram, kraken } = data;

                    setDatas(data);

                    setCpus(cpus);
                    setGpus(gpus);
                    setRam(ram);
                    setKraken(kraken);

                    setCpuT(Math.floor(cpus[0].temperature));
                    setLiquid(kraken.liquidTemperature);

                    setGpuT(gpus[0].temperature);
                }
            }
        };
    }, []);

    const timeFormatZ = (ints) => {
        return ints < 10 ? "0" + ints : ints;
    };

    const weatherAxi = () => {
        const dustGrade = (value) => {
            switch (value) {
                case "1":
                    return "#66e0ff";
                case "2":
                    return "#66ff66";
                case "3":
                    return "#ff9933";
                case "4":
                    return "#ff3333";
                default:
                    return "#ffffff";
            }
        };

        axios.get('https://api.openweathermap.org/data/2.5/onecall?units=metric&lat='+lat+'&lon='+lon+'&appid='+wkey).then(r=> {
            const result = r.data;
            const weatherbody = result.current;

            setWeather(weatherbody.weather[0].icon);
            setOutTemp(Math.floor(weatherbody.temp));
        });

        axios.get('https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey='+encodeURIComponent(dustkey)+'&returnType=json&numOfRows=1&pageNo=1&stationName='+encodeURIComponent(station)+'&dataTerm=DAILY&ver=1.0').then(r=> {
            const body = r.data.response.body.items[0];

            setPm10v(body.pm10Value);
            setPm25v(body.pm25Value);

            setPm10g(dustGrade(body.pm10Grade));
            setPm25g(dustGrade(body.pm25Grade));

            console.log(pm10g);
        });
    };

    useEffect(() => {
        console.log("Anti-SLEEP-WORKING");

        const noSleep = setInterval(() => {
            console.log("Anti-SLEEP-WORKING");
        }, 1000*60*10);

        return () => {
            clearInterval(noSleep);
        }
    }, []);

    useEffect(() => {
        weatherAxi();
        
        const calculateInitialDelay = () => {
            const now = new Date();
            const currentMinutes = now.getMinutes();
            const currentSeconds = now.getSeconds();
            const next6thMinute = currentMinutes < 6 ? 6 : 60 + 6;
            const delayMinutes = next6thMinute - currentMinutes;
            return ((delayMinutes * 60) - currentSeconds) * 1000;
        };

        const initialDelay = calculateInitialDelay();
        
        const initialTimeout = setTimeout(() => {
            weatherAxi();

            const weatherTimer = setInterval(() => {
                weatherAxi();
            }, 1000 * 60 * 60);

            return () => {
                clearInterval(weatherTimer);
            };
        }, initialDelay);

        return () => {
            clearTimeout(initialTimeout);
        };
    }, []);

    useEffect(() => {
        const Timer = setInterval(() => {
            let time = new Date();
            let hours = time.getHours();
            let minutes = time.getMinutes();

            hours = hours % 12;
            hours = hours ? hours : 12;

            setClock(timeFormatZ(hours) + ":" + timeFormatZ(minutes));
        }, 1000);

        return () => {
            clearInterval(Timer);
        };
    }, []);
    
    return (
        <div>
            <div className="circle-test" />
            <div className="elias" style={{ backgroundImage: `radial-gradient(#0000, #000F), url(${"https://lroseline.github.io/nzxt-kraken-skorea-weather/weather/" + weather + ".png"})` }}>
                <div className="circle">
                    <div className="clock">{clock}</div>
                {
                    datas != null ?
                        (
                            <div className="cpu">
                                <div>
                                    <div className="tabo">CPU</div>
                                    <div className="tabo-value">{cpuT}</div>
                                </div>
                                <div>
                                    <div className="tabo">GPU</div>
                                    <div className="tabo-value">{gpuT}</div>
                                </div>
                                <div>
                                    <div className="tabo">AIO</div>
                                    <div className="tabo-value">{liquid}</div>
                                </div>
                            </div>
                        ) :
                        (
                            <div style={{padding: "0 10%", fontFamily: "맑은 고딕", WebkitTextStroke: "0"}}>
                                <h2>안내사항</h2>
                                <div>
                                    크라켄 쿨러의 LCD로 로드할 경우, 수치가 정상적으로 나옵니다.<br />
                                    URL을 만들어 원하는 위치의 날씨와 미세먼지 위치를 받아올 수 있습니다.<br />
                                    <Link to="/create">만들러 가기</Link>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="bottom">
                    <div className="pm10">
                        <div>
                            <span style={{ boxShadow: '0 3px 0 ' + pm10g }}>PM10</span>
                        </div>
                        <div className="bottom-value-small">{pm10v}</div>
                    </div>
                    <div className="outside">
                        <div>OUTSIDE</div>
                        <div className="bottom-value">{outTemp}</div>
                    </div>
                    <div className="pm25">
                        <div>
                            <span style={{ boxShadow: '0 3px 0 ' + pm25g }}>PM25</span>
                        </div>
                        <div className="bottom-value-small">{pm25v}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Betap;