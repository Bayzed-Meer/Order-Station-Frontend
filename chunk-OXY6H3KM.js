import{a as T,c as z}from"./chunk-VTXQOHN6.js";import{a as Q}from"./chunk-73G7AXVQ.js";import{a as k}from"./chunk-QXHIHSTA.js";import{A as L,Oa as H,Ta as J,Ua as K,Va as W,Wa as X,Xa as Y,Za as ee,ab as te,bb as oe,cb as ne,db as ie,j as I,l as f,o as q,p as D,pa as U,qa as Z,ra as $,t as V,v as A,w as N,x as B,y as G,z as j}from"./chunk-JKOZUD4R.js";import{$b as E,Bb as i,Cb as a,D as S,Db as w,Eb as p,Fb as u,Fc as R,Kb as C,Mb as h,Ub as s,Vb as P,W as y,Wa as m,a as b,b as M,da as g,ha as F,p as v,pb as d,rb as _,wb as c,za as O}from"./chunk-EBQJBUXN.js";function re(e,n){e&1&&(p(0),s(1,"Email is required."),u())}function ae(e,n){e&1&&(p(0),s(1," Please enter a valid email address. "),u())}function se(e,n){if(e&1&&(i(0,"mat-error"),d(1,re,2,0,"ng-container")(2,ae,2,0,"ng-container"),a()),e&2){let r,t=h();m(),c((r=t.resetPasswordForm.get("email").errors)!=null&&r.required?1:(r=t.resetPasswordForm.get("email").errors)!=null&&r.email?2:-1)}}function me(e,n){e&1&&(p(0),s(1," Password is required. "),u())}function le(e,n){e&1&&(p(0),s(1,"Password must be at least 8 characters long."),u())}function de(e,n){e&1&&(p(0),s(1,"Password cannot exceed 32 characters."),u())}function ce(e,n){e&1&&(p(0),s(1,"Password must include A-Z, a-z, 0-9, and special character."),u())}function pe(e,n){if(e&1&&(i(0,"mat-error"),d(1,me,2,0,"ng-container")(2,le,2,0,"ng-container")(3,de,2,0,"ng-container")(4,ce,2,0,"ng-container"),a()),e&2){let r,t=h();m(),c((r=t.resetPasswordForm.get("password").errors)!=null&&r.required?1:(r=t.resetPasswordForm.get("password").errors)!=null&&r.minlength?2:(r=t.resetPasswordForm.get("password").errors)!=null&&r.maxlength?3:(r=t.resetPasswordForm.get("password").errors)!=null&&r.pattern?4:-1)}}function ue(e,n){e&1&&(p(0),s(1,"Confirm password is required"),u())}function fe(e,n){if(e&1&&(i(0,"mat-error"),d(1,ue,2,0,"ng-container"),a()),e&2){let r,t=h();m(),c((r=t.resetPasswordForm.get("confirmPassword").errors)!=null&&r.required?1:-1)}}function ge(e,n){e&1&&w(0,"app-spinner")}function we(e,n){e&1&&(i(0,"span"),s(1,"Reset"),a())}var Ae=(()=>{let n=class n{constructor(){this.authService=g(k),this.destroyRef=g(O),this.formBuilder=g(B),this.dialog=g(H),this.router=g(z),this.route=g(T),this.loading=!1,this.token="",this.hidePassword=!0,this.hideConfirmPassword=!0}ngOnInit(){this.initializeForm(),this.extractTokenFromUrl()}initializeForm(){this.resetPasswordForm=this.formBuilder.group({email:["",[f.required,f.email]],password:["",[f.required,f.minLength(8),f.maxLength(32),f.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)]],confirmPassword:["",f.required]},{validators:this.passwordMatchValidator()})}passwordMatchValidator(){return t=>{let l=t.get("password")?.value,o=t.get("confirmPassword")?.value;return l&&o&&l!==o?{passwordMismatch:!0}:null}}extractTokenFromUrl(){this.route.queryParams.subscribe(t=>{this.token=t.token})}onSubmit(){if(this.resetPasswordForm.markAllAsTouched(),this.resetPasswordForm.valid){this.loading=!0;let t=M(b({},this.resetPasswordForm.value),{token:this.token});delete t.confirmPassword,this.authService.resetPassword(t).pipe(y(()=>{this.loading=!1,this.router.navigate(["/signin"])}),S(l=>(this.loading=!1,Q(this.dialog,l.error.message,"close"),console.log(l),v(l))),L(this.destroyRef)).subscribe()}}togglePasswordVisibility(){this.hidePassword=!this.hidePassword}toggleConfirmPasswordVisibility(){this.hideConfirmPassword=!this.hideConfirmPassword}};n.\u0275fac=function(l){return new(l||n)},n.\u0275cmp=F({type:n,selectors:[["app-reset-password"]],standalone:!0,features:[E],decls:33,vars:10,consts:[[1,"container"],[1,"form-wrapper"],[1,"logo-wrapper"],["src","/assets/brand-logo.png","alt","logo",1,"logo"],[1,"logo-text"],[1,"welcome-text"],[3,"ngSubmit","formGroup"],[1,"full-width"],["matInput","","id","email","type","email","formControlName","email","placeholder","example@gmail.com"],["matInput","","id","password","formControlName","password","placeholder","\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",3,"type"],["mat-icon-button","","matIconSuffix","","type","button",1,"hideIcon",3,"click"],["matInput","","id","confirmPassword","formControlName","confirmPassword","placeholder","\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",3,"type"],["mat-flat-button","","type","submit",1,"submit-button",3,"disabled"]],template:function(l,o){l&1&&(i(0,"div",0)(1,"div",1)(2,"div",2),w(3,"img",3),i(4,"div",4),s(5,"Order Station"),a()(),i(6,"div",5),s(7,"Reset Password"),a(),i(8,"form",6),C("ngSubmit",function(){return o.onSubmit()}),i(9,"mat-form-field",7)(10,"mat-label"),s(11,"Email"),a(),w(12,"input",8),d(13,se,3,1,"mat-error"),a(),i(14,"mat-form-field",7)(15,"mat-label"),s(16,"Password"),a(),w(17,"input",9),i(18,"button",10),C("click",function(){return o.togglePasswordVisibility()}),i(19,"mat-icon"),s(20),a()(),d(21,pe,5,1,"mat-error"),a(),i(22,"mat-form-field",7)(23,"mat-label"),s(24,"Confirm Password"),a(),w(25,"input",11),i(26,"button",10),C("click",function(){return o.toggleConfirmPasswordVisibility()}),i(27,"mat-icon"),s(28),a()(),d(29,fe,2,1,"mat-error"),a(),i(30,"button",12),d(31,ge,1,0,"app-spinner")(32,we,2,0,"span"),a()()()()),l&2&&(m(8),_("formGroup",o.resetPasswordForm),m(5),c(o.resetPasswordForm.get("email").invalid&&o.resetPasswordForm.get("email").touched?13:-1),m(4),_("type",o.hidePassword?"password":"text"),m(3),P(o.hidePassword?"visibility_off":"visibility"),m(),c(o.resetPasswordForm.get("password").invalid&&o.resetPasswordForm.get("password").touched?21:-1),m(4),_("type",o.hideConfirmPassword?"password":"text"),m(3),P(o.hideConfirmPassword?"visibility_off":"visibility"),m(),c(o.resetPasswordForm.get("confirmPassword").invalid&&o.resetPasswordForm.get("confirmPassword").touched?29:-1),m(),_("disabled",o.loading),m(),c(o.loading?31:32))},dependencies:[R,G,V,I,q,D,j,A,N,W,oe,te,X,Y,ee,$,U,Z,ie,ne,K,J],styles:[".container[_ngcontent-%COMP%]{min-height:100vh;display:flex;justify-content:center;align-items:center;background-color:#f5f7f8}.form-wrapper[_ngcontent-%COMP%]{padding:2rem;width:30%;background-color:#fff;box-shadow:0 .5rem 1rem #0000001a}.form[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;gap:2rem}.logo-wrapper[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;margin-bottom:1.25rem}.logo[_ngcontent-%COMP%]{height:2.75rem;width:2.75rem}.logo-text[_ngcontent-%COMP%]{font-size:1.5rem;color:#025dad;font-weight:600}.welcome-text[_ngcontent-%COMP%]{font-size:1.25rem;color:#025dad;font-weight:500;margin-bottom:.75rem}.full-width[_ngcontent-%COMP%]{width:100%}.hideIcon[_ngcontent-%COMP%]{margin-right:1rem}.submit-button[_ngcontent-%COMP%]{text-wrap:nowrap;font-size:.875rem}@media (max-width: 480px){.form-wrapper[_ngcontent-%COMP%]{width:60%;padding:1.5rem}.logo-wrapper[_ngcontent-%COMP%]{gap:.5rem;margin-bottom:.75rem}.form[_ngcontent-%COMP%]{gap:1rem}.logo[_ngcontent-%COMP%]{height:2rem;width:2rem}.logo-text[_ngcontent-%COMP%]{font-size:1.25rem}.welcome-text[_ngcontent-%COMP%]{font-size:1rem;margin-bottom:.25rem}.submit-button[_ngcontent-%COMP%]{font-size:.75rem}}@media (min-width: 481px) and (max-width: 768px){.form-wrapper[_ngcontent-%COMP%]{width:40%}.logo-wrapper[_ngcontent-%COMP%]{gap:.75rem;margin-bottom:1rem}.form[_ngcontent-%COMP%]{gap:1.5rem}.logo[_ngcontent-%COMP%]{height:2.5rem;width:2.5rem}.logo-text[_ngcontent-%COMP%]{font-size:1.5rem}.welcome-text[_ngcontent-%COMP%]{font-size:1rem;margin-bottom:.25rem}.submit-button[_ngcontent-%COMP%]{font-size:.875rem}}@media (min-width: 769px) and (max-width: 1024px){.form-wrapper[_ngcontent-%COMP%]{width:40%}.logo-wrapper[_ngcontent-%COMP%]{gap:.75rem;margin-bottom:1rem}.logo[_ngcontent-%COMP%]{height:2.5rem;width:2.5rem}.logo-text[_ngcontent-%COMP%]{font-size:1.5rem}.welcome-text[_ngcontent-%COMP%]{font-size:1rem;margin-bottom:.25rem}.submit-button[_ngcontent-%COMP%]{font-size:.875rem}}"]});let e=n;return e})();export{Ae as ResetPasswordComponent};
