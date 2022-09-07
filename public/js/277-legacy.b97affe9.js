"use strict";(self["webpackChunkbooking_client"]=self["webpackChunkbooking_client"]||[]).push([[277],{50277:function(e,t,a){a.r(t),a.d(t,{default:function(){return h}});var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("h3",[e._v("Companies")]),a("b-alert",{attrs:{variant:"success",show:""}},[e._v(" Create and modify companies ")]),a("b-row",[a("b-col",{attrs:{md:"2"}},[a("b-form-input",{attrs:{type:"text",placeholder:"Company Name"},model:{value:e.searchForm.name,callback:function(t){e.$set(e.searchForm,"name",t)},expression:"searchForm.name"}})],1),a("b-col",{attrs:{md:"2"}},[a("b-button",{attrs:{variant:"primary"},on:{click:e.fetch}},[e._v(" Search ")])],1),a("b-col",{staticClass:"text-right",attrs:{md:"8"}},[a("b-button",{attrs:{variant:"success"},on:{click:e.add}},[a("b-icon",{attrs:{icon:"plus",scale:"1.5"}}),e._v(" Add ")],1)],1)],1),a("b-table",{staticClass:"mt-3",attrs:{fields:e.fields,items:e.list,busy:e.loading,outlined:"",responsive:""},scopedSlots:e._u([{key:"cell(index)",fn:function(t){return[a("p",[e._v(e._s((e.searchForm.page-1)*e.searchForm.perPage+t.index+1))])]}},{key:"cell(name)",fn:function(t){return[a("p",[e._v(e._s(t.value))])]}},{key:"cell(edit)",fn:function(t){return[a("b-button",{staticClass:"mr-2",attrs:{variant:"success",size:"sm"},on:{click:function(a){return e.edit(t.index)}}},[a("b-icon",{attrs:{icon:"pencil"}}),e._v(" Edit ")],1),a("b-button",{attrs:{variant:"danger",size:"sm"},on:{click:function(a){return e.deleteById(t.index)}}},[a("b-icon",{attrs:{icon:"trash"}}),e._v(" Delete ")],1)]}}])}),a("b-pagination",{attrs:{"total-rows":e.total,"per-page":e.searchForm.perPage,align:"right"},model:{value:e.searchForm.page,callback:function(t){e.$set(e.searchForm,"page",t)},expression:"searchForm.page"}}),a("b-modal",{attrs:{title:"Add Company","hide-header-close":""},on:{ok:e.doAdd,cancel:function(t){e.addModalShow=!1}},model:{value:e.addModalShow,callback:function(t){e.addModalShow=t},expression:"addModalShow"}},[a("b-row",[a("b-col",{attrs:{md:"4"}},[e._v("Company Name")]),a("b-col",{attrs:{md:"8"}},[a("b-form-input",{attrs:{type:"text",state:!!e.$v.company.name.required&&null},model:{value:e.company.name,callback:function(t){e.$set(e.company,"name",t)},expression:"company.name"}}),e.$v.company.name.required?e._e():a("b-form-invalid-feedback",[e._v(" Name is required. ")])],1)],1)],1),a("b-modal",{attrs:{title:"Edit Company","hide-header-close":""},on:{ok:e.doEdit},model:{value:e.editModalShow,callback:function(t){e.editModalShow=t},expression:"editModalShow"}},[a("b-row",[a("b-col",{attrs:{md:"4"}},[e._v("Company Name")]),a("b-col",{attrs:{md:"8"}},[a("b-form-input",{attrs:{type:"text",state:!!e.$v.company.name.required&&null},model:{value:e.company.name,callback:function(t){e.$set(e.company,"name",t)},expression:"company.name"}}),e.$v.company.name.required?e._e():a("b-form-invalid-feedback",[e._v(" Name is required. ")])],1)],1)],1),a("b-modal",{attrs:{title:"Delete Company","hide-header-close":""},on:{ok:e.doDelete},model:{value:e.deleteModalShow,callback:function(t){e.deleteModalShow=t},expression:"deleteModalShow"}},[e._v(" Are you sure you want to delete? ")])],1)},n=[],i=a(93019),s=(a(41539),a(54747),a(47941),a(34665)),c=a(6409),d={name:"CompanyView",mounted:function(){this.fetch()},data:function(){return{fields:[{key:"index",label:"No"},{key:"name",label:"Company Name"},{key:"edit",label:"-"}],loading:!1,searchForm:{page:1,perPage:10,name:""},addModalShow:!1,editModalShow:!1,deleteModalShow:!1,company:{_id:"",name:""}}},computed:(0,i.Z)({},(0,s.rn)({list:function(e){return e.company.list},total:function(e){return e.company.total}})),validations:{company:{name:{required:c.C1}}},methods:{fetch:function(){var e=this;this.loading=!0,this.$store.dispatch("company/fetch",this.searchForm).then((function(){e.loading=!1}))},add:function(){this.company={_id:"",name:""},this.addModalShow=!0},doAdd:function(e){var t=this;e.preventDefault(),this.$v.company.$touch(),this.$v.company.$error||(this.addModalShow=!1,this.$store.dispatch("company/add",this.company).then((function(){t.$toasted.success("Add Success"),t.fetch()})))},edit:function(e){var t=this;Object.keys(this.list[e]).forEach((function(a){t.company[a]=t.list[e][a]})),this.editModalShow=!0},doEdit:function(e){var t=this;e.preventDefault(),this.$v.company.$touch(),this.$v.company.$error||(this.editModalShow=!1,this.$store.dispatch("company/edit",this.company).then((function(){t.$toasted.success("Edit Success"),t.fetch()})))},deleteById:function(e){this.company._id=this.list[e]._id,this.deleteModalShow=!0},doDelete:function(){var e=this;this.$store.dispatch("company/deleteById",this.company._id).then((function(){e.$toasted.success("Delete Success"),e.fetch()}))}},watch:{"searchForm.page":function(){this.fetch()}}},r=d,l=a(1001),m=(0,l.Z)(r,o,n,!1,null,null,null),h=m.exports}}]);
//# sourceMappingURL=277-legacy.b97affe9.js.map