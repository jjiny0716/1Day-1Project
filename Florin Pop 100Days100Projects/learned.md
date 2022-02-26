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
