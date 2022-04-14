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

# 02 - Simple Counter

## currentTarget vs target 복습

- currentTarget : 이벤트 생성 위치 (this)
- target : 이벤트 발생 위치

이벤트 위임을 이용한 코드를 작성하면, target이 자식들이 되고, 위에서 받는 요소가 currentTarget.

# 03 - Reviews

## border-style

예제에서 버튼이 약간 나와있는 것처럼 표현이 되어서, 어떻게 한것인지 코드를 살펴봤는데, border-style: outset이라는 속성이 있었다. border-style은 습관적으로 solid만 썼었는데, 여러가지 스타일이 있다는 것을 알아두자.

## document.querySelector가 안먹을때

script로드하는 태그에 defer가 빠졌는지 확인하자. 문서가 로드되지 않았는데 script가 불러져서 생긴 오류이다.

## object-fit

이미지의 크기를 150 x 150픽셀로 지정했는데, 원본 이미지의 비율이 1:1이 아니면, 찌그러지는 현상이 발생한다. 이를 방지하기 위해서 이미지 컨테이너와 object-fit: cover를 이용하자. 가로세로비가 맞지 않으면, 이미지의 일부가 잘려나가지만, 이미지에 변화를 주지 않고 컨테이너를 가득 채운다.

# 04 - Navbar

## background-color: transparent;

평소에 배경색을 투명하게 하기 위해 rgba(255, 255, 255, 0)을 사용했는데, 그럴 필요 없이 transparent라는 값을 사용하면 된다.

## height 변경에 애니메이션 넣기

height: auto로 설정하면, 애니메이션이 일어나지 않는 것 같다. 그래서, 고정된 높이로 변화를 주면, 애니메이션이 일어나게 되는데, 문제가 있다. 처음에 auto로 설정하려 했던 이유는, 내용물의 높이만큼 자연스럽게 높이가 늘어나기를 원했기 때문이다. 근데 고정된 높이를 설정하면 정확한 높이를 설정해주기 힘들고, 나중에 유지보수하기도 쉽지 않을 것이다. 그래서 찾아보니, max-height를 이용한 방법을 찾았다.

```css
.links {
  max-height: 500px;
  transition: max-height 300ms;
}

.links.hide {
  max-height: 0;
}
```

max-height를 내용물의 높이보다 크게 설정한다면, active상태일때 내용물에 높이에 맞춘 높이로 설정된다.  
출처: https://stackoverflow.com/questions/3508605/how-can-i-transition-height-0-to-height-auto-using-css

## 프로젝트 중단

몇일 하면서 느낀점이, 프로젝트들이 자바스크립트가 차지하는 비율이 적고, 그마저도 너무 쉽다고 느꼈다... 조금더 도전적인 내용으로 프로젝트를 하는게 좋을 것 같다. 새로운 프로젝트 아이디어들을 찾아보자.
