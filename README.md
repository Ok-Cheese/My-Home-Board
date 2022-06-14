# My-Home-Board 

[✔️ 배포주소](https://main--dulcet-kitten-ac0451.netlify.app/)<br />
[📖 사용설명서](https://metal-lantern-ee6.notion.site/My-Home-Board-Manual-625814f7ce2f4dd7810cad7c2c1239fb)<br />

<br />

## 📅 **개발 기간**

- 2022년 6월 1일 ~ 2022년 6월 12일

<br />

## 🛠 **기술스택**

- React, Recoil, TypeScript <br />

<br />

## 🧾 **구현사항**
 
### 레이아웃 편집

![1](https://user-images.githubusercontent.com/90900744/173632718-826ca302-27cc-40b0-bcdf-ddb24c370549.gif)

- 첫 화면 우측 상단 플러그인의 첫번째 버튼을 클릭하면, 레이아웃 편집 모드로 변경
  - 플러그인 추가 / 이동 / 크기 변경 / 삭제 가능
- 플러그인 추가 시 새 플러그인이 적절한 위치에 들어가도록 구현
  - 새 플러그인을 추가할 적절한 공간이 없는 경우 알림창 표시
- 드래그&드롭으로 플러그인 이동, 좌상단, 또는 좌우 하단을 드래그해서 크기 변경
- 플러그인은 정해진 영역 밖으로 벗어날 수 없음
- 편집 모드가 활성화 되어 있는동안 각 플러그인에 클릭 등의 상호작용 불가
- 플러그인에서 변경된 사항은 다시 톱니바퀴 버튼을 눌러 **편집 모드를 종료해야 변경사항이 저장됨.**
 
 ### 설정
 
 ![2](https://user-images.githubusercontent.com/90900744/173632773-95e868c8-97f2-4f2b-b4f0-8d5e78ee001a.gif)
 
 - `setting` 플러그인의 톱니바퀴 버튼을 눌러 설정 가능
 - General 탭에서 배경색 및 플러그인 색 변경 가능
 - Time 탭에서 Time 플러그인의 형식 변경 가능

<br />

## ** 플러그인 **

### 검색창

- 왼쪽 로고를 클릭해서 구글 또는 유튜브 검색으로 변경

### todo list

### time

### BOJ (백준 온라인 저지)

### bookmark

### clock

### weather

### dday

### github

<br />

## ❗ 이슈

- 레이아웃 편집 모드에서 플러그인을 빠르게 이동할 경우, 플러그인이 화면 밖으로 나갔는데도 변경사항이 그대로 적용되는 문제

<br/>
