import React from 'react';

import {Link} from 'react-router-dom';
import './Create.css';

function Create() {
    
    const TypeOK = () => {
        const result = document.querySelector("#url");

        const wkey = document.querySelector("#owm-key").value;
        const lat = document.querySelector("#lat").value;
        const lon = document.querySelector("#lon").value;
        
        const datakr = document.querySelector("#datagokr-key").value;
        const station = document.querySelector("#station").value;

        console.log(process.env.PUBLIC_URL);
        
        result.value =  process.env.PUBLIC_URL+
                        "/?wkey="+wkey+
                        "&lat="+lat+
                        "&lon="+lon+
                        "&dustkey="+datakr+
                        "&station="+station;
    };
    
    const CopyThis = async () => {
        const result = document.querySelector("#url");

        await navigator.clipboard.writeText(result.value);
        alert("URL 복사 완료!\nNZXT CAM에서 웹 인터그레이션에서 붙여 넣어주세요!");
    };

    return (
        <div className="body">
            <div className="header">
                <Link to="/" className="back">뒤로가기</Link>
            </div>
            <div className="body-main">
                <div className='group'>
                    <h3>Openweathermap - OpenWeathermap 제공 <Link to='https://openweathermap.org' target='_blank'>Link</Link></h3>
                    <hr />
                    <div className='box'>
                        <label htmlFor='owm-key'>API키</label>
                        <input required type='text' id='owm-key' placeholder='Openweathermap API키' />
                    </div>
                    <div className='box'>
                        <label htmlFor='lat'>lat</label>
                        <input required type='number' id='lat' />
                    </div>
                    <div className='box'>
                        <label htmlFor='lon'>lon</label>
                        <input required type='number' id='lon' />
                    </div>
                    <hr />
                    <Link to='https://openstreetmap.org' target='_blank'>OpenStreetMap 열기</Link><br />
                    좌표값은 [lat, lon] 방식입니다.
                </div>
                <div className='group'>
                    <h3>미세먼지 - 한국환경공단 제공 <Link to='https://www.airkorea.or.kr' target='_blank'>Link</Link></h3>
                    <hr />
                    <div className='box'>
                        <label htmlFor='datagokr-key'>API키</label>
                        <input required type='text' id='datagokr-key' placeholder='공공데이터포털 API키' />
                    </div>
                    <div className='box'>
                        <label htmlFor='station'>측정소 이름</label>
                        <input required type='text' id='station' />
                    </div>
                    <hr />
                    <div>
                        <h4>가까운 미세먼지 측정소 찾는 방법</h4>
                        휴대전화나 인터넷을 통해서 원하는 곳의 날씨를 검색한 다음 표시되는 측정소 이름을 찾으면 가능합니다.
                    </div>
                </div>
                <div>
                    <h3>출력창</h3>
                    <hr />
                    <input type='text' id='url' readOnly />
                    <button type='button' onClick={() => TypeOK()}>URL 만들기</button>
                    <button type='button' onClick={() => CopyThis()}>복사하기</button>
                </div>
            </div>
        </div>
    );
}

export default Create;