import { useState, useEffect } from 'react';

function JsonEx() {

    return (
        <div>
            <div>
                <div>
                    <label for="openweathermap">Openweathermap</label>
                    <input id="openweathermap" type="text" />
                    <div>
                        <label for="lat">lat</label>
                        <input id="lat" type="number" />
                    </div>
                    <div>
                        <label for="lon">lon</label>
                        <input id="lon" type="number" />
                    </div>
                </div>
                <div>
                    <label for="datagokr">datagokr</label>
                    <input id="datagokr" type="text" />
                    <div>
                        <label for="station">측정소</label>
                        <input id="station" type="text" />
                    </div>
                </div>
                <button>출력</button>
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
                    <li>날씨 좌표는 꼭 입력해주세요.</li>
                    <li>미세먼지 측정소는 스마트폰 날씨 앱 기준으로 나오는 현재 측정소로 입력해주세요.</li>
                </ul>
            </div>
            <textarea id="result-json" readOnly>
                ㅁ?ㄹ
            </textarea>
        </div>
    );
}

export default JsonEx;