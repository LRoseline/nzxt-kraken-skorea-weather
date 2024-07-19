import { useState, useEffect } from 'react';
import './setting.css';

function JsonEx() {
    const [defaultMemo, setDefaultMemo] = useState(null);

    const exportJson = () => {
        console.log("JUDGE");
        const resultJson = new Object();

        const weathers = new Object();
        weathers.key = document.querySelector("#api-weather").value;
        weathers.lat = document.querySelector("#lat").value;
        weathers.lon = document.querySelector("#lon").value;
        resultJson.weather = weathers;

        const gokr = new Object();
        gokr.key = document.querySelector("#api-datagokr").value;
        gokr.station = document.querySelector("#station").value;
        resultJson.datagokr = gokr;

        setDefaultMemo(JSON.stringify(resultJson));
    }

    return (
        <main>
            <div>
                <div className="object">
                    <h2>Openweathermap</h2>
                    <hr />
                    <div className="table">
                        <input id="api-weather" required placeholder="API키" type="text" />
                        <input id="lat" required placeholder="lat" type="number" />
                        <input id="lon" required placeholder="lon" type="number" />
                    </div>
                </div>
                <div className="object">
                    <h2>공공데이터포털 - 미세먼지 정보</h2>
                    <hr />
                    <div className="table">
                        <input id="api-datagokr" required placeholder="API키" type="text" />
                        <input id="station" required placeholder="측정소 이름" type="text" />
                    </div>
                </div>
                <button onClick={exportJson}>출력</button>
            </div>
            <div>
                <h3>사용방법</h3>
                <ol>
                    <li>Openweathermap, 공공데이터포털에서 인증키를 준비해주세요.</li>
                    <li>두 인증키를 입력칸에 모두 붙여 넣어주세요.</li>
                    <li>출력 버튼을 누르고 해당 값을 모두 복사해주세요.</li>
                    <li>메모장에서 복사한 내용을 붙여넣은 후, C:\kraken.json 으로 저장해주세요.</li>
                    <li>다시 해당 페이지를 로드하면 날씨 정보를 가져올 수 있습니다.</li>
                </ol>
                <ul>
                    <li>여러분이 가진 인증키는 일절 수집하지 않습니다.</li>
                    <li>날씨 좌표는 꼭 입력해주세요. 좌표값은 Openweathermap에서 현재 위치를 찾은 다음 해당 값으로 입력해주세요.</li>
                    <li>미세먼지 측정소는 스마트폰 날씨 앱 기준으로 나오는 현재 측정소로 입력해주세요.</li>
                </ul>
            </div>
            <textarea id="result-json" readOnly defaultValue={defaultMemo}></textarea>
        </main>
    );
}

export default JsonEx;