# freeCodeCamp 15 JS projects

[freeCodeCamp 15 JS projects](https://www.youtube.com/watch?v=3PHXvlpOkf4&t=4516s&ab_channel=freeCodeCamp.org)에 있는 프로젝트를 따라 만들면서 얻은 지식, 실수등을 기록하는 곳입니다.

# 01 - Color Flipper

## main에 height:100vh를 주었더니 스크롤이 생기는 문제

특별한게 있나 했는데.. 그냥 calc()를 이용해 header의 크기만큼 빼주는 것이었다.

```css
main {
  min-height: calc(100vh - 3em);
}
```

근데 이렇게 하면 유지보수에 안좋을 것 같다.. 다른 방법을 찾아봐야겠다.

## span내부와 주변의 space가 사라지는 문제

```html
<h2 class="color-desc">Background Color : <span class="color-value"></span></h2>
```

위처럼 html을 작성했는데, span왼쪽의 space가 사라졌다. margin이나 padding을 줘서 해결할 수도 있었지만, space를 넣는 방법으로 해보고 싶었다. &nbsp;를 넣으면 해결된다고 한다. 공백을 강제로 넣는 특수문자이다. 띄어쓰기를 여러번 할때도 사용할 수 있겠다(스페이스바 여러번하면 공백이 하나로 줄어든다..).

## background color를 바꾸니까 header의 shadow가 사라지는 문제

아마 header와 main이 같은 렌더링 레이어에 존재해서 일어나는 문제같다. shadow는 아래에 깔리는 것이니까.. 그래서 z-index를 설정해줬더니 해결되었다.

## z-index가 적용되지 않는 문제

내경우는 position이 static이라서 적용되지 않았던 것이다. position: static은 left, top, z-index같은 포지셔닝 요소를 전부 무시한다.

## box-shadow offset 순서

box-shadow의 offset은 x가 먼저온다!! 알고리즘 문제 풀때 y를 먼저 쓰는거나, margin에서 세로방향을 먼저 쓰는 것때문에 헷갈린다. 잘 알아둬야겠다.
