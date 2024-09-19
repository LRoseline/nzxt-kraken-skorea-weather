### 사용하는 방법
* 이 리포지토리를 웹으로 올린 사이트를 NZXT LCD에 적용하기 전 다음 URI는 필수이다.
* * OpenStreetMap 기준으로 했을 때의 원하는 곳의 좌표 - lat, lon
  * OpenWeathermap API키 - wkey
  * 공공데이터포털 API키 (**한국환경공단_에어코리아_대기오염정보**를 신청할 것) - dustkey
  * 해당 장소에 있는 측정소 명칭 - station
* 해당 github.io 뒤에 ?lat=[lat]&lon=[lon]&wkey=[wkey]&dustkey=[dustkey]&station=[station] 을 붙여서 테스트로 열어본다.
* 만약 정상적으로 정보가 나왔다면 잘한 것이다. 해당 URL을 전체 복사한 다음 NZXT CAM의 LCD설정에서 웹페이지 주소를 붙여 넣는다.
