# Florin Pop 100Days100Projects

[Florin Pop 100Days100Projects](https://codepen.io/FlorinPop17/full/VwYWMOa)에 있는 프로젝트를 따라 만들면서 얻은 지식, 실수등을 기록하는 곳입니다.

# 001 - Random Meal Generator

## 템플릿 문자열 중첩해서 쓰기

템플릿 문자열안에 템플릿 문자열을 쓰는 것이 가능하다. 이걸로 복잡한 조건안에 템플릿 문자열을 계속해서 사용해나가면서 결과를 만들어낼 수 있겠다.

```js
// meal.strCategory가 true면 `<p><strong>Category</strong>: ${meal.strCategory}</p>`으로, false면 빈 문자열로 평가된다.
${meal.strCategory ? `<p><strong>Category</strong>: ${meal.strCategory}</p>` : ""}
```
