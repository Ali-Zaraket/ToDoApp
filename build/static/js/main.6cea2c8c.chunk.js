(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(2),s=n.n(a),i=n(10),c=n.n(i),l=n(4),d=n(5),r=n(7),o=n(6),h=n(9),u=n(3),b=n(1),p=n(0),j="https://day-list.herokuapp.com/api/",k=function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).state={list:[],task:{id:null,description:"",done:!1}},a.handleAddButtonClick=a.handleAddButtonClick.bind(Object(b.a)(a)),a.fetchTasks=a.fetchTasks.bind(Object(b.a)(a)),a.renderTask=a.renderTask.bind(Object(b.a)(a)),a.handleInputChange=a.handleInputChange.bind(Object(b.a)(a)),a.handleDeleteButton=a.handleDeleteButton.bind(Object(b.a)(a)),a.handleCheckBoxChange=a.handleCheckBoxChange.bind(Object(b.a)(a)),a.renderDeleteAll=a.renderDeleteAll.bind(Object(b.a)(a)),a.getCompleted=a.getCompleted.bind(Object(b.a)(a)),a}return Object(d.a)(n,[{key:"componentDidMount",value:function(){this.fetchTasks()}},{key:"getCompleted",value:function(e){var t=0;return e.map((function(e){e.done&&t++})),t}},{key:"fetchTasks",value:function(){var e=this;fetch("https://day-list.herokuapp.com/api/tasks").then((function(e){return e.json()})).then((function(t){e.setState({list:t})}))}},{key:"handleAddButtonClick",value:function(){var e=this,t={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({description:this.state.task.description})};fetch("https://day-list.herokuapp.com/api/create-task",t).then((function(e){return e.json()})).then((function(){e.fetchTasks(),e.setState({task:{id:null,description:"",done:!1}})}))}},{key:"handleCheckBoxChange",value:function(e,t){var n=this,a=e.target.checked,s={method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({pk:t.id,done:a})};fetch("https://day-list.herokuapp.com/api/done-task",s).then((function(e){return e.json()})).then((function(){n.fetchTasks()}))}},{key:"renderTask",value:function(e,t){var n,a=this,s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(s)return Object(p.jsxs)("div",{className:"task-wrapper flex-wrapper",id:"slide",children:[Object(p.jsx)("div",{className:"checkbox",children:Object(p.jsx)("input",(n={className:"form-check-input",value:"",checked:e.done,onChange:function(t){return a.handleCheckBoxChange(t,e)},type:"checkbox",id:"checkboxNoLabel"},Object(u.a)(n,"value",""),Object(u.a)(n,"aria-label","..."),n))}),Object(p.jsx)("div",{style:{flex:7},children:Object(p.jsx)("span",{children:e.description})}),Object(p.jsx)("div",{style:{flex:1},children:Object(p.jsx)("button",{className:"btn btn-danger",onClick:function(){return a.handleDeleteButton(e)},children:"delete"})})]},t)}},{key:"handleInputChange",value:function(e){var t=e.target.value;this.setState({task:Object(h.a)(Object(h.a)({},this.state.task),{},{description:t})})}},{key:"handleDeleteButton",value:function(e){var t=this,n=j+"delete-task?pk="+e.id,a={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({pk:e.id})};fetch(n,a).then((function(e){return e.json()})).then((function(){return t.fetchTasks()}))}},{key:"renderDeleteAll",value:function(){var e=this;return Object(p.jsx)("div",{className:"pt-5 pb-4 row",id:"slide",children:Object(p.jsx)("button",{type:"submit",className:"btn btn-outline-danger",onClick:function(){e.state.list.map((function(t){return e.handleDeleteButton(t)}))},children:"Delete All List"})})}},{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{className:"container",children:[Object(p.jsx)("div",{className:"pt-5",children:Object(p.jsx)("legend",{className:"display-1 text-info",align:"center",children:"TO DO"})}),Object(p.jsxs)("div",{className:"row pt-4",children:[Object(p.jsx)("div",{className:"col-9",children:Object(p.jsx)("input",{type:"text",onChange:this.handleInputChange,value:this.state.task.description,className:"form-control",placeholder:"Add a task..",required:!0})}),Object(p.jsx)("div",{className:"col-1",children:Object(p.jsx)("button",{type:"submit",className:"btn btn-info",onClick:this.handleAddButtonClick,children:"Add"})})]}),Object(p.jsx)("div",{className:"list-box border-bottom border-secondary border-2 pb-5",children:this.state.list.map((function(t,n,a){return e.renderTask(t,n,!t.done)}))}),this.state.list.length>0?Object(p.jsxs)("legend",{className:"text-secondary display-6",align:"center",children:["DONE (",this.getCompleted(this.state.list),")"]}):null,Object(p.jsx)("div",{className:"list-box",children:this.state.list.map((function(t,n,a){return e.renderTask(t,n,t.done)}))}),this.state.list.length>1?this.renderDeleteAll():null]})}}]),n}(a.Component),f=(n(16),function(e){Object(r.a)(n,e);var t=Object(o.a)(n);function n(){return Object(l.a)(this,n),t.apply(this,arguments)}return Object(d.a)(n,[{key:"render",value:function(){return Object(p.jsx)("div",{className:"App-header",children:Object(p.jsx)(k,{})})}}]),n}(a.Component));c.a.render(Object(p.jsx)(s.a.StrictMode,{children:Object(p.jsx)(f,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.6cea2c8c.chunk.js.map