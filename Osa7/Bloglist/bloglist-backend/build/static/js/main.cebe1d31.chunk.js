(this["webpackJsonpbloglist-frontend"]=this["webpackJsonpbloglist-frontend"]||[]).push([[0],{38:function(t,n,e){"use strict";e.r(n);var r=e(2),c=e(12),o=e.n(c),i=e(14),s=e(1),u=function(t){var n=t.blog;return Object(s.jsxs)("div",{children:[n.title," ",n.author]})},b=e(13),a=e.n(b),j=function(){return a.a.get("/api/blogs").then((function(t){return t.data}))},l=function(){var t=Object(r.useState)([]),n=Object(i.a)(t,2),e=n[0],c=n[1];return Object(r.useEffect)((function(){j().then((function(t){return c(t)}))}),[]),Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"blogs"}),e.map((function(t){return Object(s.jsx)(u,{blog:t},t.id)}))]})};o.a.render(Object(s.jsx)(l,{}),document.getElementById("root"))}},[[38,1,2]]]);
//# sourceMappingURL=main.cebe1d31.chunk.js.map