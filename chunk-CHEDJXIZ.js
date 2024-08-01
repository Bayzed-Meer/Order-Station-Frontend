import{a as T}from"./chunk-PYYQ2PMV.js";import{a as v}from"./chunk-XQBHGYW6.js";import{A as h,Oa as Z,Ta as $,Ua as j,Va as U,Wa as H,Xa as J,ab as K,bb as Q,cb as W,db as X,j as z,l as f,o as N,p as q,pa as L,ra as V,t as D,v as I,w as A,x as k,y as B,z as G}from"./chunk-GDU7S5Q3.js";import{$b as R,Bb as m,Cb as o,D as b,Db as C,Eb as p,Ec as O,Fb as u,Kb as E,Mb as _,Ub as r,W as P,Wa as s,a as x,da as g,ha as F,p as M,pb as l,rb as w,wb as c,za as S,zc as y}from"./chunk-MQN73C4F.js";function Y(e,t){e&1&&(p(0),r(1,"Email is required."),u())}function ee(e,t){e&1&&(p(0),r(1," Please enter a valid email address. "),u())}function te(e,t){if(e&1&&(m(0,"mat-error"),l(1,Y,2,0,"ng-container")(2,ee,2,0,"ng-container"),o()),e&2){let n,i=_();s(),c((n=i.resetPasswordForm.get("email").errors)!=null&&n.required?1:(n=i.resetPasswordForm.get("email").errors)!=null&&n.email?2:-1)}}function ne(e,t){e&1&&(p(0),r(1,"Current Password is required"),u())}function ie(e,t){if(e&1&&(m(0,"mat-error"),l(1,ne,2,0,"ng-container"),o()),e&2){let n,i=_();s(),c((n=i.resetPasswordForm.get("currentPassword").errors)!=null&&n.required?1:-1)}}function oe(e,t){e&1&&(p(0),r(1," Password is required. "),u())}function re(e,t){e&1&&(p(0),r(1,"Password must be at least 8 characters long."),u())}function ae(e,t){e&1&&(p(0),r(1,"Password cannot exceed 32 characters."),u())}function se(e,t){e&1&&(p(0),r(1,"Password must include A-Z, a-z, 0-9, and special character."),u())}function me(e,t){if(e&1&&(m(0,"mat-error"),l(1,oe,2,0,"ng-container")(2,re,2,0,"ng-container")(3,ae,2,0,"ng-container")(4,se,2,0,"ng-container"),o()),e&2){let n,i=_();s(),c((n=i.resetPasswordForm.get("newPassword").errors)!=null&&n.required?1:(n=i.resetPasswordForm.get("newPassword").errors)!=null&&n.minlength?2:(n=i.resetPasswordForm.get("newPassword").errors)!=null&&n.maxlength?3:(n=i.resetPasswordForm.get("newPassword").errors)!=null&&n.pattern?4:-1)}}function de(e,t){e&1&&C(0,"app-spinner")}function le(e,t){e&1&&(m(0,"span"),r(1,"Reset"),o())}var Ne=(()=>{let t=class t{constructor(){this.authService=g(T),this.destroyRef=g(S),this.formBuilder=g(k),this.dialog=g(Z),this.loading=!1,this.role=""}ngOnInit(){this.checkRole(),this.initializeForm()}checkRole(){this.authService.getRole().pipe(P(i=>this.role=i),h(this.destroyRef)).subscribe()}initializeForm(){this.resetPasswordForm=this.formBuilder.group({email:["",[f.required,f.email]],currentPassword:["",f.required],newPassword:["",[f.required,f.minLength(8),f.maxLength(32),f.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/)]]})}onSubmit(){if(this.resetPasswordForm.markAllAsTouched(),this.resetPasswordForm.valid){this.loading=!0;let i=x({},this.resetPasswordForm.value);this.authService.resetPassword(i).pipe(P(d=>{this.loading=!1,v(this.dialog,d.message,"close"),this.resetPasswordForm.reset()}),b(d=>(this.loading=!1,v(this.dialog,d.error.message,"close"),console.log(d),M(d))),h(this.destroyRef)).subscribe()}}};t.\u0275fac=function(d){return new(d||t)},t.\u0275cmp=F({type:t,selectors:[["app-reset-password"]],standalone:!0,features:[R],decls:25,vars:8,consts:[[3,"ngClass"],[1,"reset-password-title"],[3,"ngSubmit","formGroup"],[1,"full-width"],["matInput","","id","email","type","email","formControlName","email","placeholder","example@gmail.com"],["matInput","","id","currentPassword","type","password","formControlName","currentPassword","placeholder","\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"],["matInput","","id","password","type","password","formControlName","newPassword","placeholder","\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"],["mat-flat-button","","type","submit",1,"submit-button",3,"disabled"]],template:function(d,a){d&1&&(m(0,"div",0)(1,"div",0)(2,"p",1)(3,"mat-icon"),r(4,"security"),o(),r(5," Reset Password "),o(),m(6,"form",2),E("ngSubmit",function(){return a.onSubmit()}),m(7,"mat-form-field",3)(8,"mat-label"),r(9,"Email"),o(),C(10,"input",4),l(11,te,3,1,"mat-error"),o(),m(12,"mat-form-field",3)(13,"mat-label"),r(14,"Current Password"),o(),C(15,"input",5),l(16,ie,2,1,"mat-error"),o(),m(17,"mat-form-field",3)(18,"mat-label"),r(19,"New Password"),o(),C(20,"input",6),l(21,me,5,1,"mat-error"),o(),m(22,"button",7),l(23,de,1,0,"app-spinner")(24,le,2,0,"span"),o()()()()),d&2&&(w("ngClass",a.role==="admin"?"admin-container-div":"container-div"),s(),w("ngClass",a.role==="admin"?"content-div":""),s(5),w("formGroup",a.resetPasswordForm),s(5),c(a.resetPasswordForm.get("email").invalid&&a.resetPasswordForm.get("email").touched?11:-1),s(5),c(a.resetPasswordForm.get("currentPassword").invalid&&a.resetPasswordForm.get("currentPassword").touched?16:-1),s(5),c(a.resetPasswordForm.get("newPassword").invalid&&a.resetPasswordForm.get("newPassword").touched?21:-1),s(),w("disabled",a.loading),s(),c(a.loading?23:24))},dependencies:[O,y,B,D,z,N,q,G,I,A,U,Q,K,H,J,V,L,X,W,j,$],styles:[".container-div[_ngcontent-%COMP%]{padding:2rem;background-color:#fff;box-shadow:0 .5rem 1rem #0000001a}.admin-container-div[_ngcontent-%COMP%]{min-height:90vh;display:flex;justify-content:center;align-items:center}.content-div[_ngcontent-%COMP%]{padding:2rem;width:30%;box-shadow:0 .5rem 1rem #0000001a;background-color:#fff}.reset-password-title[_ngcontent-%COMP%]{font-size:1.25rem;font-weight:500;display:flex;align-items:center;gap:.5rem;color:#025dad}.full-width[_ngcontent-%COMP%]{width:100%}.submit-button[_ngcontent-%COMP%]{text-wrap:nowrap;font-size:.875rem}@media (max-width: 480px){.container-div[_ngcontent-%COMP%]{padding:1.5rem}.content-div[_ngcontent-%COMP%]{padding:1.5rem;width:50%}.reset-password-title[_ngcontent-%COMP%]{font-size:.875rem;gap:.5rem;margin-bottom:.75rem}.submit-button[_ngcontent-%COMP%]{font-size:.75rem}}@media (min-width: 481px) and (max-width: 768px){.container-div[_ngcontent-%COMP%]{padding:1.5rem}.content-div[_ngcontent-%COMP%]{padding:1.5rem;width:40%}.reset-password-title[_ngcontent-%COMP%]{font-size:1rem;gap:.5rem;margin-bottom:.75rem}.submit-button[_ngcontent-%COMP%]{font-size:.75rem}}@media (min-width: 769px) and (max-width: 1024px){.container-div[_ngcontent-%COMP%]{padding:1.5rem}.content-div[_ngcontent-%COMP%]{padding:1.5rem;width:40%}.reset-password-title[_ngcontent-%COMP%]{font-size:1rem;gap:.5rem;margin-bottom:1rem}.submit-button[_ngcontent-%COMP%]{font-size:.875rem}}"]});let e=t;return e})();export{Ne as a};
