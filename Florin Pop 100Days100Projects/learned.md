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

# 005 - User Prifile Design

## css 함수속 콤마

css에서, 값을 나열할 때 어떨땐 콤마를 쓰고 어떨땐 쓰지않아서, 헷갈릴 때가 있었다. 오늘도 실수를 했는데, 찾아보니 font, margin처럼 한 속성에 여러 값을 나열할 때는 콤마를 안쓰고, rgba()같은 함수속 여러개의 값을 나열할 때는 콤마를 쓰는 것 같다.

## 박스 겹치기

여러 태그를 겹치게 하기 위해서, 다양한 방법을 시도해봤다. absolute를 쓰면, 원래 공간을 차지하지 않고, relative를 쓰면, 원래 공간을 차지하면서 이동시킬 수 있다. position을 따로 선언하기 싫다면, 마진에 음수를 주어 이동시킬 수도 있다(패딩은 안되는듯).
