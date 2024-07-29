import{a as p,g as d}from"./chunk-VPTYPPTQ.js";import{W as a,Z as h,da as l,l as c}from"./chunk-BTNHTO55.js";var n=class extends Error{};n.prototype.name="InvalidTokenError";function u(s){return decodeURIComponent(atob(s).replace(/(.)/g,(t,o)=>{let e=o.charCodeAt(0).toString(16).toUpperCase();return e.length<2&&(e="0"+e),"%"+e}))}function f(s){let t=s.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw new Error("base64 string is not of the correct length")}try{return u(t)}catch{return atob(t)}}function g(s,t){if(typeof s!="string")throw new n("Invalid token specified: must be a string");t||(t={});let o=t.header===!0?0:1,e=s.split(".")[o];if(typeof e!="string")throw new n(`Invalid token specified: missing part #${o+1}`);let r;try{r=f(e)}catch(i){throw new n(`Invalid token specified: invalid base64 for part #${o+1} (${i.message})`)}try{return JSON.parse(r)}catch(i){throw new n(`Invalid token specified: invalid json for part #${o+1} (${i.message})`)}}var x=(()=>{let t=class t{constructor(){this.http=l(p),this.API=d.apiUrl,this.isLoggedIn$=new c(!1),this.role$=new c("")}signup(e){return this.http.post(`${this.API}/auth/signup`,e)}signin(e){return this.http.post(`${this.API}/auth/signin`,e,{withCredentials:!0}).pipe(a(r=>{localStorage.setItem("accessToken",r.accessToken),this.isLoggedIn$.next(!0),this.setRole(r.accessToken)}))}signOut(){return this.http.post(`${this.API}/auth/signout`,{},{withCredentials:!0}).pipe(a(()=>{this.clearUserInfo()}))}resetPassword(e){return this.http.post(`${this.API}/auth/reset-password`,e)}refreshToken(){return this.http.post(`${this.API}/auth/refresh-token`,{},{withCredentials:!0}).pipe(a(e=>{localStorage.setItem("accessToken",e.accessToken),this.setRole(e.accessToken)}))}isLoggedIn(){return localStorage.getItem("accessToken")&&this.isLoggedIn$.next(!0),this.isLoggedIn$.asObservable()}clearUserInfo(){localStorage.removeItem("accessToken"),this.isLoggedIn$.next(!1),this.role$.next("")}getRole(){let e=localStorage.getItem("accessToken");return e&&this.setRole(e),this.role$.asObservable()}setRole(e){let i=g(e).role;this.role$.next(i)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=h({token:t,factory:t.\u0275fac,providedIn:"root"});let s=t;return s})();export{x as a};