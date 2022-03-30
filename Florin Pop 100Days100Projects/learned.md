# Florin Pop 100Days100Projects

[Florin Pop 100Days100Projects](https://codepen.io/FlorinPop17/full/VwYWMOa)에 있는 프로젝트를 따라 만들면서 얻은 지식, 실수등을 기록하는 곳입니다.

# 001 - Random Meal Generator

## 템플릿 문자열 중첩해서 쓰기

템플릿 문자열안에 템플릿 문자열을 쓰는 것이 가능하다. 이걸로 복잡한 조건안에 템플릿 문자열을 계속해서 사용해나가면서 결과를 만들어낼 수 있겠다.

```js
// meal.strCategory가 true면 `<p><strong>Category</strong>: ${meal.strCategory}</p>`으로, false면 빈 문자열로 평가된다.
${meal.strCategory ? `<p><strong>Category</strong>: ${meal.strCategory}</p>` : ""}
```

# 002 - 2022 Mood Calendar

## fontawesome 아이콘을 적용한 버튼에 border-radius: 50%을 적용해도 둥글게 되지 않는 현상

아마 fontawesome 아이콘이 원형이 아니기 때문에, 버튼의 사이즈에 영향을 미치는 것으로 생각된다. 이럴땐 버튼의 사이즈를 명시적으로 정사각형으로 만들어 해결할 수 있다.

```css
.some-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
```

## 선택자 우선순위

적용한 background-color가 적용되지 않아, 이유를 찾아보니, 위에서 선언한 background-color에 덮어 씌어지고 있었던 것이다. 항상 아래에 쓴 선택자가 우선순위를 갖는 게 아니란 것을 항상 주의하자. 앞으로 똑같이 속성이 적용되지 않는 경우가 생긴다면, 개발자 도구로 element에 적용되는 선택자의 순위를 찾아볼
수 있으니, 활용하면 되겠다.

## currentColor

background-color을 color와 같은 값으로 설정하고 싶었다. 동적으로 변하는 값이었기 때문에, 비슷한 코드를 중복으로 작성해야 하나 고민했는데, 예제 코드를 보니 currentColor라는 값이 있었다. currnetColor는 상속받은 color값이라고 한다.

## 자식으로 다른 요소를 갖고있는 버튼들의 이벤트를 이벤트 위임으로 처리하기

내 경우엔, 버튼안에 아이콘(i 태그)을 넣어두었는데, 이벤트 위임을 이용한 코드에서, 버튼이 아니라 i가 잡혀서, 버튼의 패딩부분을 클릭하지 않으면 재대로 작동하지 않았다. 이때, i가 클릭되었을 때를 처리하기 위해서, Element.closest()를 이용해볼 수 있겠다. 전달한 선택자에 잡히는 가장 가까운 element를 받을 수 있으므로, 버튼이 선택되는 선택자를 전달해주면 되겠다.

## flex-wrap

flex-wrap: wrap;으로 설정하면, 넘치는 아이템을 줄바꿈 해준다.

## 컨테이너의 일정한 비율만큼 차지하게 사이즈 설정하기

```css
width: calc(100% / 7);
```

## tagName 주의

element.tagName으로 받은 태그 이름은 전부 대문자다.

## 나중에 렌더링되는 태그를 시작할때 선택

나중에 렌더링되는 태그를, 코드가 시작되자마자 선택하면, 선택되지 않으므로, 나중에 렌더링되었을 때 선택하던지, 필요할 때 선택하도록 만들어야 한다.

# 003 - Flow Field

## class에서 this

class에서, 필드와 메서드에 접근할 때 this를 빼먹지 않도록 주의하자.

## flow field?

https://editor.p5js.org/ada10086/sketches/r1gmVaE07  
위의 링크가 동작하는 것을 보고, p5.js라이브러리를 쓰지 않고 최대한 비슷한 효과를 내려 노력했으나, 한계점이 있었다.

1. 필드가 자연스러운 형태로 생성되지 않아, Particle이 자연스럽게 움직이지 않는다. => perlin noise가 해답이 될 수 있겠다.
2. Particle뒤에 잔상 효과를 주고싶어서 공이 움직일때마다 잔상을 나타내는 object를 생성했더니, Particle의 갯수를 늘릴때마다 프레임이 크게 감소한다. => 잘 모르겠다.. 라이브러리가 어떻게 잔상을 생성하는지 공부해봐야 할까?

그래도 재밌었다.

# 004 - Aim Trainer

## this 바인딩

여러 클래스와 모듈을 이용해봤는데, this를 이용하는 부분에서 this가 undefined라는 오류가 나왔다. 콜백함수를 전달하는 부분이었는데, this바인딩을 이용해서 문제를 해결할 수 있었다(화살표 함수와 bind()를 이용했다). this가 undefined라면, this바인딩을 잊은 걸로 생각하면 될 것 같다.

## 이벤트리스너 제거

게임이 끝났을 때, 게임에 등록했던 이벤트리스너들을 제거해야 했다. 아래는 이벤트리스너를 제거하기 위한 코드이다.

```js
removeEventListener("click", myDivEventHandler);
```

그런데, 내 경우엔 분명 인자를 똑같이 전달했는데도 이벤트 해제가 되지 않았다. 찾아보니, eventListener를 등록할때 bind()를 이용했다면, 새로운 레퍼런스가 생성된다고 한다. bind()를 이용하는 경우에는 bind()를 이용한 함수를 따로 저장해두고, 저장해둔 것으로 이벤트리스너를 해제하도록 하자.  
출처: https://stackoverflow.com/questions/11565471/removing-event-listener-which-was-added-with-bind

# 005 - User Profile Design

## css 함수속 콤마

css에서, 값을 나열할 때 어떨땐 콤마를 쓰고 어떨땐 쓰지않아서, 헷갈릴 때가 있었다. 오늘도 실수를 했는데, 찾아보니 font, margin처럼 한 속성에 여러 값을 나열할 때는 콤마를 안쓰고, rgba()같은 함수속 여러개의 값을 나열할 때는 콤마를 쓰는 것 같다.

## 박스 겹치기

여러 태그를 겹치게 하기 위해서, 다양한 방법을 시도해봤다. absolute를 쓰면, 원래 공간을 차지하지 않고, relative를 쓰면, 원래 공간을 차지하면서 이동시킬 수 있다. position을 따로 선언하기 싫다면, 마진에 음수를 주어 이동시킬 수도 있다(패딩은 안되는듯).

# 006 - Pokedex

## img태그에 after, before삽입이 안됨

img태그는 닫는 태그가 없기 때문에, 다른 요소를 자식으로 가질 수가 없어서 after, before사용이 불가하다.

## 비동기처리 순서

1번부터 해당하는 id의 포켓몬 카드를 만들고 컨테이너에 추가하는 코드를 작성했다. 문제는 분명히 for문으로 1번부터 순서대로 함수를 호출했는데, 카드가 순서대로 생성되지 않는 경우가 있었다. 생각해보니 api호출은 순서대로 했더라도, 그것이 데이터가 도착하는 순서를 보장하진 않는다. 앞으로 비동기 처리할 때, 순서가 중요하다면, 처음부터 구조를 잘 짜던가, 추가적인 처리가 필요하단 것을 기억해야겠다.

# 007 - James Bond Tribute Page

## absolute인 요소 가운데 정렬하기

absolute인 요소를 가운데 정렬해야 할때, absolute는 flex를 이용한 가운데 정렬이 불가능했다. 그래서 다른 방법을 찾았다. 컨테이너 크기의 절반만큼을 top과 left로 설정해준 후, translate(-50%, -50%)를 해주면 가운데로 온다. 문제는 컨테이너 크기가 동적으로 변할때 작동하지 않는다.. 컨테이너 크기가 동적으로 변하는 상황에선 요소를 감싸는 wrapper를 이용해야 할 것 같다.

# 013 - Password Generator

## 클립보드 api

생성한 비밀번호를 클립보드에 복사하는 버튼을 구현하기 위해, 클립보드 api를 사용했다. 클립보드 api는 클립보드 명령에 응답하거나, 시스템 클립보드에 쓰기 기능을 제공한다. 출처: [MDN문서](https://developer.mozilla.org/ko/docs/Web/API/Clipboard_API)

# 014 - Contact Page Design

## textarea

input type="text"를 이용하니, height가 높을 때 입력이 세로기준 가운데로 정렬이 되었다. 이러한 형태를 기대한게 아니라, 왼쪽 위부터 입력이 시작되기를 원했다. 그럴땐 textarea를 사용하자. input type="text"와 상당히 유사하게 작동하나, 왼쪽 위부터 입력이 시작된다는 차이점이 있다. 또 오른쪽 아래에 textarea의 크기를 바꿀 수 있는 집게? 같은 것이 생기는데, 이를 막고싶다면 아래의 css를 사용하자.

```css
textarea {
  resize: none;
}
```

## border-radius가 적용된 border에 그라데이션 넣기

기존의 border-image와 border-image-slice를 이용한 방법은, border-radius와 호환되지 않는다. 그래서 background를 이용한 우회적인 방법을 사용해야 한다. 아래는 내가 사용했던 코드이다.

```css
.somediv {
  /* border색을 투명하게 해야함. */
  border: 1px solid transparent;
  border-radius: 10px;
  /* 안쪽(content-box 혹은 padding-box)에 적용될 gradient, border에 적용될 gradient */
  background-image: linear-gradient(#fff, #fff), linear-gradient(to right, #ed73c8, #ff6b96);
  /* background-image가 border부터 시작하게. */
  background-origin: border-box;
  /* padding-box에 background-image 1번, border-box에 background-image 2번 */
  background-clip: padding-box, border-box;
}
```

출처: [dltjsgho.log](https://velog.io/@dltjsgho/css-border%EC%97%90-%EA%B7%B8%EB%9D%BC%EB%8D%B0%EC%9D%B4%EC%85%98-%EB%84%A3%EA%B8%B0)

## form validation

폼에서 특정 요소는 무조건 있어야하고, 이메일은 형식을 갖춰야해서, 사용자가 잘못된 입력을 했으면 사용자에게 피드백을 주는 요소를 자바스크립트로 구현하지 않아도 사용할 수 있다. HTML에서 기본적으로 제공하는 built-in form validation이라는 것이 있다. 폼 요소에 required를 추가하면, 사용자가 해당 폼 요소를 비웠을 때 피드백이 제공된다. 이외에도 길이나 특정 형식, 특정 패턴으로 입력을 강제할 수 있으므로, 유용하게 사용할 수 있다. 다만 커스터마이징이 필요하다면, css와 js로 추가적인 처리가 필요하겠다. 출처: [MDN문서](https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)

## 016 - Clock

## 다크모드 구현하기

html 어트리뷰트와, css 변수를 이용하면 다크모드를 큰 어려움 없이 구현할 수 있다.

```css
/* light 모드 */
:root[color-theme="light"] {
  --color-background: #fff;
  --color-text: #000;
}
/* dark 모드 */
:root[color-theme="dark"] {
  --color-background: #111;
  --color-text: #fff;
}
/* root의 현재 프로퍼티 상태에 따라 변수의 값이 바뀌며, 이는 해당 변수를 참조하는 모든 엘리먼트의 변화를 일으킨다. */
```

이후 자바스크립트를 이용해 root(html)의 어트리뷰트를 토글링하면, 다크모드를 구현할 수 있다. 더 자세한 것은 다음 블로그 글을 참고해보자. [yijaee.log 다크모드 구현하기](https://velog.io/@yijaee/%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0)

## 임시 border의 함정

시계 초침을 픽셀 단위로 맞춘 후, 완성되었다고 생각하여 시계의 border를 제거했는데, 다시 레이아웃이 맞지 않게되었다. border가 차지했던 1px이 레이아웃에 영향을 주었던 것이다. 픽셀단위의 정교한 레이아웃을 구성할 때, 임시 border을 사용하지 말자.

## Internationalization API

날짜를 숫자가 아닌 영어(혹은 다른 언어)로 표현해야 할 때, 기존의 방식은 이랬다.

```js
const month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
```

변수에 이름들을 저장해놓고, 날짜 값을 이용한 인덱싱으로 이름을 가져오는 방식이었다. 하지만 Internationalization API(Intl 객체)를 사용한다면, 이렇게 번거롭게 할 필요가 없다. Intl 객체는 각 언어에 맞는 문자비교, 숫자, 시간, 날짜비교를 제공하는, ECMAScript Internationalization API를 위한 이름공간이다.

```js
// 언어 설정도 가능하다!
const formatter = new Intl.DateTimeFormat("en-us", { month: "short", weekday: "long" });
const str = formatter.format(new Date(2022, 5, 12));
console.log(str); // Jun Saturday
```

더 자세한 설명은 [MDN 문서](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl)를 참고하자.

# 017 - Testimonial Design

## box-shadow 4번째 음수 값

box-shadow에서 4번째 값은 spread-radius라는 이름이 붙여져 있다. 즉 그림자의 확산 거리를 나타내며, 음수를 준다면 그림자가 작아진다고 생각하면 좋을 것 같다.

## 객체 구조 분해 할당 중첩

객체 구조 분해 할당을 활용하여 중첩된 객체의 프로퍼티를 변수로 빼내는 게 가능하다.

```js
const {
  color: { r, g, b },
  text,
  name,
} = selectedTestimonial;
```

아마 구조 분해 할당 안에서 또 구조 분해 할당을 이용한 것 같다.

# 018 - Typing Speed Test

## childNodes vs children

childNodes를 사용해 span의 색과 배경색을 바꾸는 로직을 처리했는데, 오류가 발생했다. word를 계속해서 올바르게 입력해도, 마치 두 로직의 속도가 다른 듯이, 현재 입력중인 word에 이펙트가 표시되지 않고, 이전에 진작 입력이 끝난 word에 이펙트가 표시되고 있었다. 확인해보니, childNodes가 span과 그 사이에 공백까지 제공해주고 있었기 때문에 발생한 오류였다. childNodes를 children으로 변경하니 해결되었다. 왜 이런 현상이 발생했을까?  
childNodes는 자식 node들을 가져오는데, 이 node에는 text node도 포함된다. children은, 자식 element들을 가져온다. 여기엔 text node가 포함되지 않으므로, 대부분의 경우에는 children을 사용하고, text node의 변경이 필요하면, textContent를 같이 사용하는 것이 좋아보인다. childNodes를 사용하면, 의도치 않은 text node를 같이 얻게될 수 있기 때문에, 오류의 원인이 될 수 있겠다.

## 리팩토링

1. 이벤트리스너 해제하는 깔끔한 방법(특히 bind를 사용했을때)을 고민해보자.
2. 개발자도구에서 등록되어있는 이벤트 리스너를 볼 수 있다.
3. 앞으로 클래스의 중복되는 것들을 상속을 이용해 처리해보자.

# 019 - Send Love Button

## 새로 추가한 element에 애니메이션 효과 주기

버튼을 누르면, 랜덤한 위치, 크기, 속도를 가진 하트들이 나타나 하늘로 날아가는 효과를 구현해야 했다. 다른건 다 쉽게 할 수 있었으나, 정작 제일 중요한 애니메이션 효과가 작동하지 않았다. 처음에 내가 시도했던 방법은, css에 미리 클래스 선택자와 함께 transform을 써두고, Element를 container에 추가한 후, Element에 해당 클래스를 추가해주는 방식이었다. 구글링해본 결과, 클래스를 추가하는 동작에 setTimeout을 이용해 딜레이를 줘야 작동한다는 사실을 알게되었다.  
문제를 해결했으나, 왜 이렇게 동작하는지 궁금했다. 이유는 style change event가 정확히 언제 동작하는지 명확하지 않기 때문에, 값에 영향을 주는 동시에 작동되고 있는 다른 요소들과의 순서가 명확하지 않기 때문인 것 같다. 그래서 setTimeout을 이용해, style change event를 제일 마지막에 발생시키도록 해야하는 것 같다. 출처: [dev.jinyongp](https://velog.io/@jinyongp/%EC%83%88%EB%A1%9C-%EC%83%9D%EC%84%B1%ED%95%9C-element%EB%A5%BC-appendChild%ED%95%9C-%ED%9B%84-%EC%95%A0%EB%8B%88%EB%A9%94%EC%9D%B4%EC%85%98-%EC%B6%94%EA%B0%80%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95%EC%9D%80)

# 022 - Tricky Cookie

## flex 아이템들의 순서

원래 flex 아이템들의 순서를 바꾸기 위해 order를 설정했었다. 하지만 모든 아이템들의 순서를 역순으로 바꾸고 싶다면, 무리해서 order를 이용하지 말고, 플렉스 컨테이너의 flex-direction속성의 row-reverse, column-reverse를 이용해보자. 말그대로 row, column에서 아이템을 나열하는 순서를 반대로 바꿔준다. 다만 order을 이용해서 바꾸는 것처럼, DOM 요소의 순서가 바뀌진 않는다.

# 023 - Background Animations

## object-fit 안먹힐 때

object-fit은 크기가 설정되어 있을 때만 작동한다! [스택오버플로우 글](https://stackoverflow.com/questions/34247337/object-fit-not-affecting-images)에서 더 알아보자.

## 리팩토링 회고

리팩토링 목표는, 성능이 안좋은 top, left를 변경하는 부분을 제거하고, transform: translate를 이용하고, 코드의 중복을 제거하는 것이었다. 우선, 단지 엘리먼트를 움직이기 위한 것이므로, top, left보단 transform: transition을 이용하는게 좋아보였다. 기존의 코드는, 애니메이션의 시작 좌표와 끝 좌표를 둘다 top, left를 이용해서 변경해주었다. 하지만, top, left는 블록들이 원래 있어야 할 위치(애니메이션의 끝) 를 설정할 때 사용하고, transform: translate를 이용하여 블록들을 애니메이션의 시작 위치로 이동시킨 다음, transform을 해제해주면, 원래 위치로 돌아가면서 자연스럽게 애니메이션이 동작하게 될 것이다.

```js
function setStartPositionsOfBlock(block, top, left) {
  const distanceY = top - block.style.top.replace("px", "");
  const distanceX = left - block.style.left.replace("px", "");
  // 처음 위치를 세팅할땐, 애니메이션 없이 바로 이동해야 하므로, duration과 delay를 0ms로 설정해준다.
  block.style.transitionDuration = "0ms";
  block.style.transitionDelay = "0ms";
  block.style.transform = `translate(${distanceX}px, ${distanceY}px)`;
}

function returnBlocksToOriginalPosition(block, duration, delay) {
  block.style.transitionDuration = `${duration}ms`;
  block.style.transitionDelay = `${delay}ms`;
  // translate를 원래 위치로 돌려놓기만 해도, 자연스러운 애니메이션이 만들어진다.
  block.style.transform = `translate(0px, 0px)`;
}
```

다음으로, 여러가지의 애니메이션을 함수로 표현하는데 있어서 공통적으로 들어가는 코드가 엄청 많았다.

```js
// 애니메이션을 나타내는 함수들이다.
function random() {
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      const top = panelHeight * r;
      const left = panelWidth * c;
      panel.style.top = `${Math.random() * windowHeight}px`;
      panel.style.left = `${Math.random() * windowWidth}px`;
      panel.style.backgroundPosition = `${-left}px ${-top}px`;
      panel.style.transitionDelay = `${Math.random() * 1000}ms`;
      container.appendChild(panel);
      setTimeout(() => {
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
      }, 1000);
    }
  }
}

function fall() {
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.style.width = `${panelWidth}px`;
      panel.style.height = `${panelHeight}px`;
      const top = panelHeight * r;
      const left = panelWidth * c;
      panel.style.top = `${-panelHeight}px`;
      panel.style.left = `${left}px`;
      panel.style.backgroundPosition = `${-left}px ${-top}px`;
      panel.style.transitionDelay = `${Math.random() * 1000}ms`;
      container.appendChild(panel);
      setTimeout(() => {
        panel.style.top = `${top}px`;
        panel.style.left = `${left}px`;
      }, 500);
    }
  }
}
```

반복문, 블록을 생성하는 부분, 시작 위치를 설정, 끝 위치 설정, 딜레이 설정 전부 중복이 발생하고 있다. 값을 생성하는 부분만 다르기 때문에, 값을 생성하는 부분만 함수에 남겨두고, 다른 부분은 전부 다른 함수로 빼줄 수 있었다.

```js
const blocks = [];
// 블록들을 생성하고, 초기위치등을 설정해주는 함수
function createBlocks() {
  for (let r = 0; r < rowCount; r++) {
    const row = [];
    for (let c = 0; c < columnCount; c++) {
      const block = document.createElement("div");
      block.className = "block";
      block.style.width = `${blockWidth}px`;
      block.style.height = `${blockHeight}px`;
      const top = blockHeight * r;
      const left = blockWidth * c;
      block.style.backgroundPosition = `${-left}px ${-top}px`;
      block.style.top = `${top}px`;
      block.style.left = `${left}px`;
      container.appendChild(block);
      row.push(block);
    }
    blocks.push(row);
  }
}

function random() {
  // 블록들을 순회하면서, 값을 설정해줌
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      const block = blocks[r][c];
      // block의 시작위치 설정
      // setTimeout으로 애니메이션 처리
    }
  }
}

function fall() {
  // 블록들을 순회하면서, 값을 설정해줌
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      const block = blocks[r][c];
      // block의 시작위치 설정
      // setTimeout으로 애니메이션 처리
    }
  }
}
```

문제는, 코드의 중복이 줄긴 했으나, 여전히 random, fall등의 애니메이션을 나타내는 함수들을 유지해야 했고, 새로운 애니메이션을 작성하려먼, 애니메이션을 나타내는 시작 위치, 딜레이들을 생성하는 로직만 작성하는게 아니라, 위의 함수 구조를 복사해서 다시 작성해줘야 한다는 것이었다. 그래서 애니메이션을 나타내는 함수들을 제거하고, 하나의 애니메이션 함수로 만들고 싶었는데, 블록들의 값을 지정해주는데 있어서 r과 c의 정보가 필요했고, 또 랜덤을 사용하고 있었기 때문에, 외부에서 값을 생성해서 함수에 전달하는 식의 방법이 불가능했다. 곰곰이 생각해보니 콜백함수를 이용하면 될 것 같았다. r과 c를 받아서, top, left, delay를 생성하는 함수들을 객체에 저장해두고, animation함수를 호출할 때, 콜백 함수로 전달해주면 되는 것이었다.

```js
const animationTypes = {
  // 각 애니메이션에 해당하는 top, left, delay를 생성하는 함수들을 작성해둔다.
  random: {
    topGenerator: () => {
      return Math.random() * windowHeight;
    },
    leftGenerator: () => {
      return Math.random() * windowWidth;
    },
    delayGenerator: () => {
      return Math.random() * 1000;
    },
  },
  // 다른 애니메이션들
};

function animation({ topGenerator, leftGenerator, delayGenerator }) {
  // top, left, delay를 생성하는 콜백 함수들을 객체 구조 분해 할당으로 받아온다.
  for (let r = 0; r < rowCount; r++) {
    for (let c = 0; c < columnCount; c++) {
      const block = blocks[r][c];
      setStartPositionsOfBlock(block, topGenerator(r, c), leftGenerator(r, c));
      setTimeout(() => {
        returnBlocksToOriginalPosition(block, 1000, delayGenerator(r, c));
      }, 0);
    }
  }
}
// 호출!
animation(animationTypes.random);
```

이제 새로운 애니메이션을 만들때, top, left, delay를 생성하는 3개의 함수와, html의 select에 이름을 추가해주면 끝난다. 코드의 양과 중복이 줄고, 읽기 좋아졌고, 유지보수에 용이한 구조가 되었다.  
즐거운 리팩토링이었다.

# 024 - Hover Board

## css hover 와 mouseover의 순서

css hover가 먼저 일어난다. 이를 이용해 hover상태에서 transition-delay를 0으로 만들면 mouseover했을때 색이 즉시 변경되고, mouseleave를 했을땐 hover상태가 아니므로 원래의 transition-delay를 적용받아 색이 천천히 사라지게 된다.

## 025 - Review Design

## hover시 border생성

hover상태일 때 1px의 border가 생성되는 css를 작성했다. 문제는 해당 요소의 크기가 그만큼 커져서, 전체 레이아웃에 영향을 주게 되었다. 이를 막기위해 padding을 원래 값에서 1px적은 값으로 설정하는 방식으로 해결했으나, padding의 값을 수정할 때마다 hover상태의 padding값도 수정해야 해서 유지보수에 좋지 않았다. 이럴땐 border의 색을 transparent로 한 다음, 색만 바꿔주는 방식으로 작성하는게 좋겠다.

```css
div {
  border: 1px solid transparent;
}

div:hover {
  border-color: #cdcdcd;
}
```

# 027 - Line Through Effect

## vw, vh

vw는 width에만 쓸 수 있는게 아니다. vh도 마찬가지고, 단순히 1vw는 화면 width의 100분의 1px로 변환된다고 생각하면 헷갈리지 않을 것 같다. 기존에 px이나 %등을 쓰던 모든 곳에 사용할 수 있다.

## z-index가 안먹힐 때

z-index가 안먹힐 땐 position이 static이 아닌 것으로 설정되어 있는지 확인해보자. 예전에도 이런 실수를 했던 것 같은데, 어떻게 하면 안잊을 수 있을까?..

# 029 - Event KeyCodes And KPS

## 객체 구조 분해 할당에서 변수 이름 바꾸기

객체 구조 분해 할당을 이용할 때, 꼭 키 값만 변수명으로 이용할 수 있는게 아니다.

```js
function f({ elapsedTime: time, keyPressedCount: count, key, keyCode, code }) {
  //...
}
```

# 030 - Animation Navigation

## 해결해야할 것

엘리먼트의 width를 바꿀때 transition을 적용시켜 부드럽게 커졌다 작아지는 애니메이션을 구현하려 하였다. 하지만 width: auto에서 width: 0 사이를 토글링할 때는 애니메이션이 적용되지 않았다. auto를 고정적인 값으로 변경해주니 잘 되었지만, 앞으로 유지보수하는데 있어서 문제가 생길 수 있다고 생각해 다른 방법들을 찾아보았다. max-width나 scale을 이용한 방법등 다양한 방법이 있었지만, 하나씩 문제가 있었다. 애니메이션에 딜레이가 생긴다던지, 내부 요소들까지 scale에 영향을 받는 등의 문제가 있어서, 결국 고정 크기를 사용할 수밖에 없었다.

# 031 - New Year Countdown

## 빌더 패턴

snowflakeGenerator를 작성할 때, 눈의 크기, 투명도 범위등 다양한 인자를 설정해주고 싶었다. 근데 이 모든 것을 생성자에서 인자로 받도록 작성했더니, 인자들의 순서를 외우기도 힘들고, 너무 전달할게 많아 복잡했다. 이를 해결하기 위해서 이것저것 찾아보다, 빌더 패턴이 떠올랐다. constructor의 인자가 많으면, 빌더 패턴을 이용해보자. 내가 사용한 방법은 클래스 폴더에, 클래스와 클래스 빌더 2개를 작성하고, 클래스 빌더만 export하고, 클래스 빌더에서 값을 설정할 수 있는 메서드와 build 메서드를 제공하고, build 메서드에선 리턴할 클래스를 인스턴스화하고 빌더 자신을 전달, 클래스의 constructor에서 builder내부의 설정된 값들을 이용해 자신을 초기화하는 방식으로 작성했다.

# 032 - Text to Life

## 구현 방법

배경 이미지를 배경에 깔아주는 게 아니라, 텍스트에 입혀지도록 하면 된다. 다음은 이를 구현하는 css 코드이다.

```css
.text {
  color: transparent;
  -webkit-background-clip: text;
}
```

텍스트의 색을 투명하게 설정한 후, -webkit-background-clip: text를 이용해 배경 이미지가 텍스트에 입혀지도록 하는 것이다.

## -webkit

css 코드를 보다보면, 가끔식 -webkit이나 -moz같은 접두사를 볼 수 있다. 크로스 브라우징을 위한 것이라고 생각하면 되겠다.

### 브라우저 별 접두어

- -webkit- : 구글, 사파리 브라우저에 적용.
- -moz- : 파이어폭스 브라우저에 적용.
- -ms- : 익스플로러에 적용. (생략 가능)
- -o- : 오페라 브라우저에 적용.

## form 요소들을 받아오기

form.elements를 하면 받아올 수 있고, form내부의 버튼이나, 인풋등 폼에 종속된 컨트롤들을 일괄적으로 받아올 수 있다.

## setTimeout(handler, 0)의 뜻?

새로고침을 했을 때 조금씩 스크롤이 되는 문제가 생겨서, 문서가 load된 후 문서의 최상단으로 scroll하는 함수를 다음과 같이 작성했다.

```js
window.addEventListener("load", () => {
  window.scrollTo(0, 0);
});
```

근데 동작하지 않았다. 다음과 같이 작성하니 동작했다.

```js
window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 0);
});
```

아마 스크립트에서 무언가 처리를 하면서 스크롤이 된 것 같다. setTimeout(handler, 0)으로 handler를 실행해주면, main에 작성했던 코드를 실행하는 전역 실행 컨텍스트가 종료된 이후에 handler가 실행되게된다. 결론은 setTimeout에 0을 전달해도, 바로 실행되는 게 아니라, 콜 스택이 비고 태스크 큐에서 자신의 차례가 왔을 때 실행이 되게 되므로, 바로 실행되지 않는다(0으로 전달해도 최소 4ms로 딜레이가 설정된다고 한다). 다음의 [블로그 글](https://velog.io/@edie_ko/javascript-eventloop)과 [유튜브 영상](https://www.youtube.com/watch?v=8aGhZQkoFbQ&ab_channel=JSConf)을 참고했다. 헷갈릴 때 이 자료들을 참고하면 좋겠다.

## 사용자에게 URL 입력받을때 보안에 문제가 생길 수 있을까?

프로젝트에서 사용자에게 배경 이미지를 URL로 입력하도록 했는데, 생각해보니 보안 문제가 발생할 수도 있겠다는 생각을 했다(물론 개인정보같은 것을 다루진 않지만). 올바른 URL인지 검사후 사용하도록 했는데, 이걸로 충분한진 모르겠다. 사용자 입력을 받을때 보안에 대해 항상 생각하고 있자.

# 035 - Image Reflection

## linear-gradient에서 색상을 여러개 전달할 수 있다. (커스터마이징)

```css
background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%);
```

## 고민해볼 것 - 이미지 미리 로딩?

버튼을 클릭했을 때 이미지를 로딩하기 때문에, 로딩하는 과정이 보이거나, 잠깐 멈추는등의 현상이 일어난다. 이미지를 미리 로딩하는 코드를 적용해보았는데, css의 background-image속성은 url을 사용해서 이미지를 로딩해서, 별 소용이 없는 것 같다. 어떻게하면 개선시킬 수 있을지 고민해보자.

색깔과, 시작위치(%)를 여러개 써주는 것으로 완성도 높은 그래디언트를 만들어낼 수 있다.

# 037 - Panda Eye Follow

## Math.atan vs Math.atan2

눈동자와 마우스 사이의 각도를 계산하기 위해 atan2를 사용했다. 처음에 atan을 사용했었는데, 잘 되지 않았다. atan과 atan2은 어떤 차이가 있을까? atan은 -90, 90도의 범위만 계산이 가능하다. 예를 들어 atan(dy / dx)를 실행했을 때, dy와 dx가 둘다 음수라면 둘다 양수인 경우와 구분이 불가능해진다. 원래의 부호 정보가 사라지기 때문이다. 그래서 atan2(dy, dx)처럼 dy와 dx를 따로 전달하여, 원래의 부호 정보를 가지고 처리하기 때문에, 모든 사분면의 범위를 처리해낼 수 있다.

# 038 - 3D Background Boxes

## 분리되는 효과 구현하기

flex wrap: wrap과 justify-content: space-between을 이용하면 쉽게 만들 수 있다. 아이템들이 컨테이너 내에서 서로 거리두기를 하기 때문에, 컨테이너의 크기를 조절하면 거기에 맞춰 아이템들이 이동하게 된다. 처음에 16개의 박스에 각각 background-image가 들어갔음에도 짝이 맞아보이는 이유는, background-position을 이용해 image의 시작 위치를 각각 조절해주었기 때문이다.

# 042 - Verify Account UI

## 고민해볼 점

1. 컴포넌트 단위로 개발하고 싶다.
2. 컴포넌트에서 이벤트 위임을 통해 이벤트를 처리할 때 target에 등록하는 게 좋을까?
3. input 이벤트와 keydown, keyup 이벤트를 어떻게 구별해 사용해야할지 생각해보자.

# 043 - Rotated Nav Animation

## 구현 방법

transform: rotate()를 사용하면 되는데, 문제는 스크롤을 했을 때 회전된 영역에서 스크롤이 자연스럽게 일어나는 게 아니라, 문서 전체에서 스크롤이 되기 때문에, 회전된 방향으로 스크롤하는 느낌이 안난다는 것이었다. 그래서 article구역에 스크롤을 할 수 있게 하고싶었는데, 이때 article의 높이를 고정하고, overflow: scroll을 주면 된다. 기본 문서의 스크롤을 hidden 처리하면 완벽하게 구현된다.

## 살짝 튀어나왔다 들어가는 느낌의 애니메이션

transition timing function을 이해하고 있으면 쉽게 만들 수 있다. 평상시에 사용하면 ease, ease-in같은 것들은 최솟값, 최댓값 사이에서만 움직이기 때문에, 범위 밖의 값을 가지는 순간이 필요하다면, 따로 커스텀한 timing function을 사용하여야 한다. 이때 개발자도구에 가서 element에 적용되어있는 timing function을 누르면, 이를 수정할 수 있는 툴을 제공해준다. 이를 잘 사용해 멋진 애니메이션을 만들어보자.

# 046 - Image Password Strength

## inset

inset 속성은 top, right, bottom, left의 축약형이다. 다른 padding이나 margin처럼 각각 사이즈를 써주면 된다. 모달의 오버레이 영역을 화면 가득 채우기 위해 position: fixed와 inset: 0을 사용했다. inset: 0은 top, right, bottom, left가 모두 0이 되는 것이므로 화면을 가득 채우게 된다.

## backdrop-filter

요소에 그래픽 효과를 주는 filter라는 속성을 알고 있었는데, 배경에 이 filter를 사용하고 싶었다. 찾아보니 backdrop-filter 속성을 찾았다. backdrop-filter는 배경에 filter를 적용할 수 있게 해준다. 배경에 blur, opacity등의 그래픽 효과를 주고싶다면 backdrop-filter를 사용하자.

## 모달창은 html 문서의 어디에 생겨야 하는가

모달은 화면 최상단에 떠서 다른 요소들을 가리고, 사용자의 상호작용을 기다리는 창이기 때문에, 문서 최상단에 생겨야 논리적으로 맞는 것 같다. body바로 아래에 생성하면 될 것 같고, 컴포넌트 방식으로 개발할 땐 body바로 밑에 modal이 생길 div를 하나 잡아놓으면 편할 것 같다. body를 target으로 해버리면 innerHTML때문에 다른 요소들이 다 지워져버린다.

# 047 - Expanding Cards

## Blob

Blob 객체는 파일류의 불변하는 미가공 데이터를 나타낸다. 이미지, 소리, 비디오등의 데이터를 Blob객체로 나타낼 수 있다. FileReader, Response, Blob.prototype.text()를 이용해 데이터를 추출해 낼 수 있다. 특히, Blob을 객체 URL로 변환하면, (이미지의 경우) img요소의 src로 사용하거나, background-image속성에 사용하는 식의 다양한 활용이 가능하다.

## 이미지 캐싱

Blob을 찾아보게된 이유는 이미지 캐싱에 사용될 수 있기 때문이다. unsplash.com에서 5개의 랜덤한 이미지를 불러와 카드들의 배경 이미지로 적용시켰다. 문제는 카드를 눌러 active시킬 때, 아까 랜덤한 이미지를 불러오는 url을 그대로 사용했고, 그 결과 새로운 이미지로 교체가 되었다. 이를 해결하기 위해, 처음 실행시에 불러온 이미지들을 저장해둘 필요가 있었다. 불러온 이미지를 Blob으로 변환 후, URL로 변환해두면 unsplash.com에 다시 요청하지 않고 이미지를 계속 쓸 수 있다.

## Promise.all

이미지가 모두 로딩된 후 컴포넌트를 렌더링 하고 싶었다. 여러 비동기 호출이 전부 완료된 후 추가적인 작업을 하기 위해 Promise.all을 사용해보자. Promise.all은 순회 가능한 객체에 주어진 모든 프로미스가 이행한 후 이행하는 Promise를 반환한다. 하나라도 거절되면 다른 프로미스들은 무시하고 거부된다.

## 생각해볼 점

### Promise.all이후에 컴포넌트 생성?

모든 이미지를 로딩한 후 컴포넌트를 생성하니 깔끔하고 좋긴 한데, 너무 느리다. 컴포넌트의 생성이 여러개의 사진중에 제일 늦게 로딩되는 이미지의 타이밍에 달려있기 때문에 발생하는 문제이다. 미리 컴포넌트를 생성한 후, 공간을 차지하는 더미 이미지를 채워놓고, 이미지가 하나씩 로딩되는 족족 렌더링을 해서 해결해볼 수 있을 것 같다.

### innerHTML을 이용하니 transition이 적용되지 않는다.

html 요소의 클래스를 바꿔가며 애니메이션 효과를 주도록 코드를 짰다. 문제는 classList.add등을 이용했을 때와 달리 innerHTML을 이용해 클래스를 변경하니 transition이 적용되지 않았다. transition에 대해 정확히 알아봐야겠고, 또 Virtual DOM을 이용하는 방식처럼(사실 Virtual DOM이 정확히 뭔지도 모르겠다.), innerHTML을 직접적으로 이용하지 않고, 노드들을 순회하면서 변경된 부분만 바꾸는 코드를 만들 수 있다면 가능할 것 같다. 예를들어 class가 바뀌었다면, setAttribute나 classList등을 이용해 변경하면, 안될 이유가 없어보인다.

# 048 - Content Placeholder

## 로딩 시각화

컴포넌트를 렌더링할 때, 아직 로딩되지 않은 컨텐츠는 로딩 이미지나, 애니메이션을 가진 html요소를 넣어줌으로써 사용자에게 컨텐츠를 로딩중이라는 피드백을 줄 수 있다. 이후 비동기처리로 받아온 데이터를 이용해 setState를 하면 된다.

## img vs background-image

어느 순간부터 이미지를 처리할 때 css의 background-image만 이용해왔다. 이미지가 문서의 중요한 요소로서, 컨텐츠 이해에 도움을 준다면, img태그를 이용하는게 바람직하다. background의 여러 속성들을 이용해야 하거나, 단순한 장식으로 이미지가 이용된다면, background-image를 쓰고, 아니면 img태그를 써서 SEO나 성능등 여러 장점이 있는 img태그를 이용하자. 출처:[클로리셔 작은 공간](https://chlolisher.tistory.com/77)

## 생각해볼 점

### 데이터 요청에 실패했다면?

정해진 횟수만큼 요청을 여러번 해보고, 일정 시간이 지나거나, 요청에 전부 실패하면 가망이 없는 것으로 판단하고 해당 컨텐츠의 디폴트 값으로 정해주면 좋을 것 같다.

# 049 - Theme Toggler

## 다크모드

예전에 Clock 예제를 진행하면서 했던 기억이 있어 쉽게 할 수 있었다. 핵심은 html의 attribute를 변화시켜, 적용되는 css 변수를 바꿔서 해당 변수를 참조하고있던 엘리먼트들의 변화를 일으키는 것이었다. 이 컨셉으로 다크모드말고 다른 재밌는 것을 만들어볼 수 있을까? 생각해봐야겠다.

## 실수

### 사이즈를 가지지 않는(0 x 0) 엘리먼트도 레이아웃에 영향을 준다.

버튼에 달, 해, 그리고 가리개를 자식으로 주었다. 달과 해는 flexbox의 justify-content로 적당히 서로 멀어지게 조정했는데, 문제는 레이아웃이 달과 해가 약간 왼쪽으로 쏠린 느낌으로 레이아웃이 구성되었다. 처음에 약간 당황했는데, 생각해보니 가리개에 아직 position: absolute을 주지 않아서 생긴 문제였다. 당연한 소리지만, 사이즈가 0 x 0이어도 position의 기본값은 static이므로, flex나 grid같은 레이아웃에서 하나의 자리를 차지한다. 인지해두자.

## 느낀 점

1. 1일 1프로젝트를 계속 하다보니, 간단한 디자인이나 기능은 순식간에 구현할 수 있게 되었다. 시맨틱한 html 문서 작성이나, 효율적으로 css를 작성하는 방법같은 기본적인 것들을 잘 지키지 못했던 것 같기도 하다. 기본으로 돌아가는 공부가 조금 필요하겠다.
2. 애니메이션을 위해 엘리먼트의 class를 직접 조작했는데, 상태를 기반으로 렌더링한다는 기존의 컨셉에서 멀어진 것 같다. Diff 알고리즘에 대한 [좋은 블로그 글](https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Virtual-DOM/)을 찾았는데, 빨리 배워서 적용해보고싶다. 기대된다.

# 050 - Infinite Scrolling

## fetch의 경로

App.js에서 로컬 json 파일을 읽어들이기 위해 "../data/posts.JSON"이라는 경로를 사용했다. 그런데 404 not found에러를 내며 불러오지 못했다. 당시 폴더 구조는 다음과 같았다.

```
.
├── index.html
├── src
│   └── App.js
└── data
    └── posts.JSON
```

경로를 "data/posts.JSON"으로 바꾸니 해결되었는데, 아마 fetch에서 상대경로를 이용할 때 js파일이 기준이 아니고, js파일을 사용하는 html파일 기준이 되는 것 같다.

# 054 - Rotation Slideshow

## 중복 등록

렌더링 이후 setInterval을 이용해 2초마다 새 슬라이드로 바뀌도록 작성했는데, 문제는 업데이트전에 기존에 등록했던 interval을 해제하지 않아 렌더링할 때마다 interval이 늘어나는 오류가 발생했다. 이벤트, setTimeout, setInterval등은 등록한 클래스가 사라진다고 해서 같이 사라지는게 아니므로 항상 이를 해제하는 코드를 같이 작성해야 한다.

# 056 - Digital Block Clock

## flat함수

데이터를 2차원 배열로 표현했는데, 이를 html요소들로 변환하고 싶었다. 그런데 2차원 배열이라 for문을 중첩해서 써야되서 코드가 복잡해졌다. 이럴 때 Array.prototype.flat함수를 이용해보자. 배열을 평탄화해주는 함수인데, 2차원 배열을 1차원 배열로 바꿔 사용할 수 있게 해준다.

## setInterval vs setTimeout 재귀호출

setInterval은 항상 일정한 간격으로 함수를 호출한다. 극단적인 경우에 함수실행시간이 간격보다 크면, 다음 함수는 즉시 실행된다. 이와 달리 setTimeout 재귀호출로 구현하면, 함수실행이 끝난 후부터 시간을 재기 시작한다. 또 간격을 계속해서 업데이트하는 등 유연하게 사용할 수 있다.

## 생각해볼점

1. setInterval로 1000ms에 한번씩 함수를 호출한다 해도, 정확히 1000ms에 한번씩 업데이트되는 것을 보장하지 않는다. 현재 시각을 정확히 알려면 Date객체를 사용할 수밖에 없나?
