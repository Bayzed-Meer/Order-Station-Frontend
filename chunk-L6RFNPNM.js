import{a as z}from"./chunk-SWOLHGBV.js";import{a as Y,b as Z,c as ee,d as te,e as ne,f as ie,g as ae,h as oe,i as re,j as le,k as me,l as se,m as de,n as D,o as ce,p as L,q as pe,r as ue}from"./chunk-64TEYA7P.js";import{Aa as E,Fa as T,Ga as y,Ha as X,ea as W,g as K,ga as U}from"./chunk-YPECUWCB.js";import{$b as x,Ab as A,Ba as P,Bb as i,Bc as G,Cb as a,Db as C,Eb as p,Fb as u,Hb as V,Kb as q,Mb as f,Qb as N,Rb as B,Sb as R,Ta as F,Ub as o,Vb as c,Wa as l,Wb as _,Yb as S,Zb as J,_b as h,da as b,ha as v,pb as d,qa as O,qb as H,ra as j,rb as g,sa as k,wb as I,xb as $,zb as Q,zc as w}from"./chunk-6L47HEBJ.js";var Ce=()=>[5,10,25];function _e(e,t){e&1&&(i(0,"th",16),o(1,"Username"),a())}function he(e,t){if(e&1&&(i(0,"td",17),o(1),a()),e&2){let n=t.$implicit;l(),c(n.username||"No username available")}}function xe(e,t){e&1&&(i(0,"th",16),o(1,"ID"),a())}function Me(e,t){if(e&1&&(i(0,"td",17),o(1),a()),e&2){let n=t.$implicit;l(),c(n.id||"No ID available")}}function be(e,t){e&1&&(i(0,"th",16),o(1,"Email"),a())}function ve(e,t){if(e&1&&(i(0,"td",17),o(1),a()),e&2){let n=t.$implicit;l(),c(n.email||"No email available")}}function Oe(e,t){e&1&&(i(0,"th",18),o(1,"Contact Number"),a())}function Pe(e,t){if(e&1&&(i(0,"td",17),o(1),a()),e&2){let n=t.$implicit;l(),_(" ",n.contactNumber||"No contact number available"," ")}}function Se(e,t){e&1&&(i(0,"th",16),o(1,"SBU"),a())}function we(e,t){if(e&1&&(i(0,"td",17),o(1),h(2,"titlecase"),a()),e&2){let n=t.$implicit;l(),_(" ",n.SBU?x(2,1,n.SBU):"No SBU available"," ")}}function Ue(e,t){e&1&&(i(0,"th",16),o(1,"Job Title"),a())}function Ee(e,t){if(e&1&&(i(0,"td",17),o(1),h(2,"titlecase"),a()),e&2){let n=t.$implicit;l(),_(" ",n.jobTitle?x(2,1,n.jobTitle):"No job title available"," ")}}function Te(e,t){e&1&&(i(0,"th",18),o(1,"Actions"),a())}function ye(e,t){if(e&1){let n=V();i(0,"td",17)(1,"button",19),q("click",function(){let m=j(n).$implicit,s=f();return k(s.deleteUser(m))}),i(2,"mat-icon"),o(3,"delete"),a(),i(4,"span",20),o(5,"Delete"),a()()()}}function De(e,t){if(e&1&&(i(0,"tr",21)(1,"td"),o(2),a()()),e&2){let n=f();l(),H("colspan",n.displayedColumns.length),l(),_(' No data matching for the filter "',n.filter,'" ')}}function Le(e,t){e&1&&C(0,"tr",22)}function ze(e,t){e&1&&C(0,"tr",23)}var nt=(()=>{let t=class t{constructor(){this.dialog=b(E),this.displayedColumns=["username","id","email","contactNumber","SBU","jobTitle","actions"],this.dataSource=new de,this.users=[],this.filter="",this.deleteUserEvent=new P}ngOnChanges(r){r.users&&(this.dataSource.data=this.users),r.filter&&this.applyFilter()}ngAfterViewInit(){this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}applyFilter(){this.dataSource.filter=this.filter,this.dataSource.paginator&&this.dataSource.paginator.firstPage()}deleteUser(r){this.dialog.open(z,{width:"300px",data:{message:"Are you sure you want to delete this user?",confirmButtonLabel:"Delete",cancelButtonLabel:"Cancel"}}).afterClosed().subscribe(s=>{s==="confirm"&&this.deleteUserEvent.emit(r)})}};t.\u0275fac=function(m){return new(m||t)},t.\u0275cmp=v({type:t,selectors:[["app-users-list"]],viewQuery:function(m,s){if(m&1&&(N(D,5),N(L,5)),m&2){let M;B(M=R())&&(s.paginator=M.first),B(M=R())&&(s.sort=M.first)}},inputs:{users:"users",filter:"filter"},outputs:{deleteUserEvent:"deleteUserEvent"},standalone:!0,features:[O,S],decls:27,vars:5,consts:[[1,"table-container"],["mat-table","","matSort","",3,"dataSource"],["matColumnDef","username"],["mat-header-cell","","mat-sort-header","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","id"],["matColumnDef","email"],["matColumnDef","contactNumber"],["mat-header-cell","",4,"matHeaderCellDef"],["matColumnDef","SBU"],["matColumnDef","jobTitle"],["matColumnDef","actions"],["class","no-data-row",4,"matNoDataRow"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["aria-label","Select page of users",3,"pageSizeOptions"],["mat-header-cell","","mat-sort-header",""],["mat-cell",""],["mat-header-cell",""],["mat-flat-button","","color","warn",3,"click"],[1,"button-text"],[1,"no-data-row"],["mat-header-row",""],["mat-row",""]],template:function(m,s){m&1&&(i(0,"div",0)(1,"table",1),p(2,2),d(3,_e,2,0,"th",3)(4,he,2,1,"td",4),u(),p(5,5),d(6,xe,2,0,"th",3)(7,Me,2,1,"td",4),u(),p(8,6),d(9,be,2,0,"th",3)(10,ve,2,1,"td",4),u(),p(11,7),d(12,Oe,2,0,"th",8)(13,Pe,2,1,"td",4),u(),p(14,9),d(15,Se,2,0,"th",3)(16,we,3,3,"td",4),u(),p(17,10),d(18,Ue,2,0,"th",3)(19,Ee,3,3,"td",4),u(),p(20,11),d(21,Te,2,0,"th",8)(22,ye,6,0,"td",4),u(),d(23,De,3,2,"tr",12)(24,Le,1,0,"tr",13)(25,ze,1,0,"tr",14),a(),C(26,"mat-paginator",15),a()),m&2&&(l(),g("dataSource",s.dataSource),l(23),g("matHeaderRowDef",s.displayedColumns),l(),g("matRowDefColumns",s.displayedColumns),l(),g("pageSizeOptions",J(4,Ce)))},dependencies:[se,Y,ee,ae,te,Z,oe,ne,ie,re,le,me,ue,L,pe,ce,D,y,T,U,W,w],styles:[".table-container[_ngcontent-%COMP%]{box-shadow:0 .5rem 1rem #0000001a;padding:1rem;background-color:#fff}.table-container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#024988;color:#fff}.table-container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:1rem}.table-container[_ngcontent-%COMP%]   mat-paginator[_ngcontent-%COMP%]{color:#000}.no-data-row[_ngcontent-%COMP%]{color:#024988;font-weight:500}@media (max-width: 480px){.container[_ngcontent-%COMP%]{padding:1rem 1.75rem}.title[_ngcontent-%COMP%]{margin-bottom:.5rem;font-size:.875rem;padding:.25rem;gap:.25rem}.table-container[_ngcontent-%COMP%]{padding:.5rem;overflow-x:auto}.table-container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:.75rem;padding:.5rem}.table-container[_ngcontent-%COMP%]   mat-paginator[_ngcontent-%COMP%]{font-size:.625rem}.button-text[_ngcontent-%COMP%]{font-size:.75rem}}@media (min-width: 481px) and (max-width: 768px){.container[_ngcontent-%COMP%]{padding:1.5rem}.title[_ngcontent-%COMP%]{margin-bottom:.75rem;font-size:1rem;padding:.25rem;gap:.5rem}.table-container[_ngcontent-%COMP%]{padding:.75rem;overflow-x:auto}.table-container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:.75rem;padding:.5rem}.table-container[_ngcontent-%COMP%]   mat-paginator[_ngcontent-%COMP%]{font-size:.625rem}.button-text[_ngcontent-%COMP%]{font-size:.75rem}}@media (min-width: 769px) and (max-width: 1024px){.container[_ngcontent-%COMP%]{padding:1.5rem}.title[_ngcontent-%COMP%]{margin-bottom:.75rem;font-size:1rem;padding:.25rem;gap:.5rem}.table-container[_ngcontent-%COMP%]{padding:.75rem;overflow-x:auto}.table-container[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-container[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:.75rem;padding:.5rem}.table-container[_ngcontent-%COMP%]   mat-paginator[_ngcontent-%COMP%]{font-size:.75rem}.button-text[_ngcontent-%COMP%]{font-size:.75rem}}"]});let e=t;return e})();function Ie(e,t){e&1&&(i(0,"div",0),C(1,"app-spinner"),a())}function Ne(e,t){if(e&1&&(i(0,"div",3)(1,"div",4),C(2,"img",5),i(3,"div",6)(4,"span",7),o(5),a(),i(6,"span",8),o(7),a()()(),i(8,"div",9)(9,"div",10)(10,"mat-icon"),o(11,"badge"),a(),i(12,"span"),o(13),a()(),i(14,"div",10)(15,"mat-icon"),o(16,"phone"),a(),i(17,"span"),o(18),a()(),i(19,"div",10)(20,"mat-icon"),o(21,"business"),a(),i(22,"span"),o(23),h(24,"titlecase"),a()(),i(25,"div",10)(26,"mat-icon"),o(27,"work"),a(),i(28,"span"),o(29),h(30,"titlecase"),a()()()()),e&2){let n=t.$implicit,r=f(3);l(2),g("src",r.apiUrl+"/"+n.profilePicture,F),l(3),c(n.username),l(2),c(n.email),l(6),c(n.id?n.id:"No ID available"),l(5),c(n.contactNumber?n.contactNumber:"No contact number available"),l(5),c(n.SBU?x(24,7,n.SBU):"No SBU available"),l(6),c(n.jobTitle?x(30,9,n.jobTitle):"No job title available")}}function Be(e,t){if(e&1&&Q(0,Ne,31,11,"div",3,$),e&2){let n=f(2);A(n.filteredUsers)}}function Re(e,t){if(e&1&&(i(0,"div",2),o(1),a()),e&2){let n=f(2);l(),_('No data matching for the filter "',n.filter,'"')}}function je(e,t){if(e&1&&(i(0,"div",1),d(1,Be,2,0)(2,Re,2,1,"div",2),a()),e&2){let n=f();l(),I(n.filteredUsers.length>0?1:2)}}var Ct=(()=>{let t=class t{constructor(){this.dialog=b(E),this.users=[],this.filter="",this.deleteUserEvent=new P,this.apiUrl=K.apiUrl,this.loading=!0}ngOnChanges(r){r.users&&(this.loading=!this.users||this.users.length===0)}get filteredUsers(){return this.users.filter(r=>r.username.toLowerCase().includes(this.filter)||r.email.toLowerCase().includes(this.filter)||r.id.toLowerCase().includes(this.filter)||r.contactNumber.toLowerCase().includes(this.filter)||r.SBU.toLowerCase().includes(this.filter)||r.jobTitle.toLowerCase().includes(this.filter))}deleteUser(r){this.dialog.open(z,{width:"300px",data:{message:"Are you sure you want to delete this user?",confirmButtonLabel:"Delete",cancelButtonLabel:"Cancel"}}).afterClosed().subscribe(s=>{s==="confirm"&&this.deleteUserEvent.emit(r)})}};t.\u0275fac=function(m){return new(m||t)},t.\u0275cmp=v({type:t,selectors:[["app-users-card"]],inputs:{users:"users",filter:"filter"},outputs:{deleteUserEvent:"deleteUserEvent"},standalone:!0,features:[O,S],decls:2,vars:1,consts:[[1,"spinner"],[1,"user-grid"],[1,"no-data"],[1,"user-card"],[1,"user-card-header"],["alt","Avatar",1,"user-avatar",3,"src"],[1,"user-info"],[1,"user-username"],[1,"user-email"],[1,"user-details"],[1,"user-detail"]],template:function(m,s){m&1&&d(0,Ie,2,0,"div",0)(1,je,3,1,"div",1),m&2&&I(s.loading?0:1)},dependencies:[y,T,U,G,w,X],styles:[".user-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1rem}.user-card[_ngcontent-%COMP%]{background-color:#fff;box-shadow:0 .5rem 1rem #0000001a;padding:1.25rem}.user-card-header[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.user-avatar[_ngcontent-%COMP%]{width:6rem;height:6rem;object-fit:cover}.user-info[_ngcontent-%COMP%]{display:flex;flex-direction:column;flex:1}.user-username[_ngcontent-%COMP%]{color:#025dad;font-size:1.125rem;font-weight:600}.user-email[_ngcontent-%COMP%]{color:#024988;word-break:break-all;font-size:.875rem;font-weight:500}.user-details[_ngcontent-%COMP%]{padding:.5rem 0}.user-detail[_ngcontent-%COMP%]{display:flex;gap:.5rem}.no-data[_ngcontent-%COMP%]{color:#024988;padding:1rem;font-weight:500}mat-icon[_ngcontent-%COMP%]{color:#024988}.spinner[_ngcontent-%COMP%]{display:flex;justify-content:center}@media (max-width: 480px){.user-grid[_ngcontent-%COMP%]{grid-template-columns:1fr;gap:1rem}.user-card[_ngcontent-%COMP%]{padding:.75rem}.user-avatar[_ngcontent-%COMP%]{width:4.5rem;height:4.5rem}.user-username[_ngcontent-%COMP%]{font-size:1rem}.user-email[_ngcontent-%COMP%]{font-size:.875rem}.user-detail[_ngcontent-%COMP%]{gap:.25rem;font-size:.875rem}.no-data[_ngcontent-%COMP%]{padding:.5rem}mat-icon[_ngcontent-%COMP%]{font-size:1.25rem}}@media (min-width: 481px) and (max-width: 768px){.user-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:.75rem}.user-card[_ngcontent-%COMP%]{padding:.875rem}.user-avatar[_ngcontent-%COMP%]{width:5rem;height:5rem}.user-username[_ngcontent-%COMP%]{font-size:1rem}.user-email[_ngcontent-%COMP%]{font-size:.875rem}.user-detail[_ngcontent-%COMP%]{gap:.25rem;font-size:.875rem}.no-data[_ngcontent-%COMP%]{padding:.5rem}mat-icon[_ngcontent-%COMP%]{font-size:1.25rem}}@media (min-width: 769px) and (max-width: 1024px){.user-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:.75rem}.user-card[_ngcontent-%COMP%]{padding:1rem}.user-detail[_ngcontent-%COMP%]{gap:.5rem;font-size:1rem}.no-data[_ngcontent-%COMP%]{padding:.5rem}}"]});let e=t;return e})();export{nt as a,Ct as b};
