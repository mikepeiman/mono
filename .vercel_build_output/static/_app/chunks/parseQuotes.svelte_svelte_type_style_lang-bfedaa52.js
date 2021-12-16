import{C as p}from"./vendor-a50b8347.js";const o=p({}),x=p({}),d=p([]);o.subscribe;const H={subscribe:x.subscribe,set:e=>{x.set(e),localStorage.setItem("fileContent",JSON.stringify(e))}},R={subscribe:d.subscribe,set:e=>{d.set(e),localStorage.setItem("quotesArray",JSON.stringify(e))}},c=e=>(e.quoteBody||(e=T(e)),e.author||(e=C(e)),e.parsingComplete||(e=S(e),c(e)),e);function T(e){let{originalText:n,remainingText:r}=e,t,a,s,i;t=e.quoteBody=n,a=t.split('"'),s=a[1],i=a[2];let l=t.length,m=i.indexOf("-");return m=m>-1?m:0,i=Array.from(i).splice(m,l).join(String()).trim(),e.remainingText=i,e.quoteBody=s,e}function y(e){return e.includes("-")?e.split("-")[1].trim():e.trim()}function C(e){let{author:n,remainingText:r}=e;e.author=r,console.log(r);let t=r.length,a=f(r);return a>-1&&a?(n=y(n),n=Array.from(r).splice(0,a).join(String()),r=Array.from(r).splice(a,t).join(String()).trim(),e.remainingText=r):(n=y(e.remainingText),e.author=n,e.remainingText=!1,e.parsingComplete=!0),e.author=n,e}function S(e){let{remainingText:n,nextPart:r}=e;if(!n)return e.parsingComplete=!0,e;let t=f(n);return r=u(n,t),e=F(e,r,t),e}function A(e,n){var i,l;let r,t,a;t=e.remainingText.trim(),t.split(",");let s=t.length;return t=Array.from(t).splice(n+1,s).join(String()),n=f(t),a=u(t,n),e.nextPart=a,a?(r=Array.from(t).splice(1,n-1).join(String()).trim(),e.remainingText=t=Array.from(t).splice(n,s).join(String())):(r=t,t=!1),(i=e.authorTitle)==null||i.push(r.trim()),(l=e.details)==null||l.push({type:"Author title",value:r}),e.remainingText=t,e}function v(e,n){let r,t,a;t=e.remainingText.trim();let s=t.length;return t=Array.from(t).splice(n+1,s).join(String()),n=f(t),a=u(t,n),e.nextPart=a,a?(r=Array.from(t).splice(1,n-1).join(String()).trim(),t=Array.from(t).splice(n,s).join(String())):(r=t,t=!1),e.authorTitle=r.trim(),e.details.push({type:"Author title",value:r}),e.remainingText=t,e}function N(e,n){let{remainingText:r}=e;r.trim();let t=r.length,a=Array.from(r).splice(n+1,t-n-2).join(String());return e.date=a,t-a.length,console.log("\u{1F680} ~ file: parse.js ~ line 193 ~ parseQuoteDate ~ date",a),r=Array.from(r).splice(n,t).join(String()),console.log("\u{1F680} ~ file: parse.js ~ line 195 ~ parseQuoteDate ~ remainingText",r),e.parsingComplete=!0,e}function q(e,n){var l;let{remainingText:r}=e,t=e.remainingText.trim();t.length,n=f(t);let a=n+1,s=g(t,"]")-a,i=Array.from(t).splice(a,s).join(String()).trim();return a=i.length,s=t.length-1,r=Array.from(t).splice(a,s).join(String()).trim(),console.log("\u{1F680} ~ file: parse.js ~ line 284 ~ parseQuoteSource ~ remainingText",r),e.remainingText=r,e.source=i,(l=e==null?void 0:e.details)==null||l.push({type:"source",value:i}),console.log("\u{1F680} ~ file: parse.js ~ line 287 ~ parseQuoteSource ~ workingQuoteObject",e),e}function I(e,n){var l;let{remainingText:r}=e,t=r.trim();f(t),g(t,")");let a=t.split("(")[1]?t.split("(")[1]:t,s=a.split(")")[0]?a.split(")")[0]:a,i=a.split(")")[1]?a.split(")")[1].trim():!1;return i||(e.parsingComplete=!0),e.remainingText=i,e.context=s,(l=e==null?void 0:e.details)==null||l.push({type:"context",value:s}),console.log("\u{1F680} ~ file: parse.js ~ line 287 ~ parseQuoteContext ~ workingQuoteObject",e),e}function P(e,n){var l,m;let{remainingText:r}=e,t=r.trim();console.log("\u{1F680} ~ file: parse.js ~ line 281 ~ parseQuoteTags ~ text",t),n=f(t),console.log("\u{1F680} ~ file: parse.js ~ line 255 ~ parseQuoteTags ~ separatorValue",n);let a=n+1,s=J(t,"#",a)-1,i;return s>-1?i=Array.from(t).splice(a,s).join(String()).trim():i=Array.from(t).splice(a,t.length).join(String()).trim(),a=i.length+1,s=t.length-1,r=Array.from(t).splice(a,s).join(String()).trim(),e.remainingText=r,(l=e.tags)==null||l.push(i),(m=e==null?void 0:e.details)==null||m.push({type:"tags",value:i}),e}function f(e){let n=[{name:"author",openingChar:"-",closingChar:"",value:!1},{name:"title",openingChar:",",closingChar:",",value:!1},{name:"source",openingChar:"[",closingChar:"]",value:!1},{name:"axiom",openingChar:":",closingChar:"",value:!1},{name:"year",openingChar:"(",closingChar:")",value:!1},{name:"context",openingChar:"@",closingChar:")",value:!1},{name:"tags",openingChar:"#",closingChar:"",value:!1}];return n.forEach(r=>{r.value=e.indexOf(r.openingChar)}),_(n)}function E(e){return e.toLowerCase()!=e.toUpperCase()}function D(e,n){return e.charAt(n+1)}function u(e,n){let r=e.charAt(n);if(r=="("){let t=D(e,n);if(E(t))return"authorTitle"}switch(r){case"-":return"authorName";case",":return"authorTitle";case":":return"axiom";case"(":return"date";case"[":return"source";case"@":return"context";case"#":return"tags";default:return!1}}function F(e,n,r){switch(n){case"authorName":return parseQuoteAuthor(e,r);case"authorTitle":return A(e,r);case"axiom":return v(e,r);case"date":return N(e,r);case"source":return q(e,r);case"context":return I(e);case"tags":return P(e,r);default:e.parsingComplete=!0;break}return e}function g(e,n){return e.indexOf(n)}function J(e,n,r){return e.indexOf(n,r+1)}function _(e){const n=e.filter(t=>t.value>-1);return n.length?n.reduce((t,a)=>t>a.value?a.value:t,n[0].value):!1}let h={},B=`"The medical profession is being bought by the pharmaceutical industry, not only in terms of the practice of
medicine, but also in terms of teaching and research. The academic institutions of this country are allowing
themselves to be the paid agents of the pharmaceutical industry. I think it\u2019s disgraceful." - Arnold Seymour Relman,
Harvard professor, former Editor-In-Chief of the NEJM (New England Journal of Medicine) #pharma #medical-industry #corruption #science`,M=`"Antifa: because nothing says &ldquo;I hate fascism&rdquo; like attacking anyone who has an independent
thought." -
@yeebingeebin [YouTube]`;h.originalText=h.remainingText=M;h.originalText=h.remainingText=B;c(h);export{R as a,c as p,H as s};
