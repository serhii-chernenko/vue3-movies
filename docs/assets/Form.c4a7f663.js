import{b as q,d as M,i as o,o as p,c as b,a as e,w as d,v,u as l,e as u,f as k,F as w,g as U,t as x,h as V,j as F,k as c}from"./index.5386a293.js";const I=["onSubmit"],S={class:"flex flex-col w-96 p-4"},j={class:"flex flex-col mb-4"},A=e("label",{for:"name",class:"mb-1 cursor-pointer"},[c(" Name "),e("span",{class:"text-red-500 required-label"},"*")],-1),B={class:"flex flex-col mb-4"},C=e("label",{for:"image",class:"mb-1 cursor-pointer"},[c(" Image "),e("span",{class:"text-red-500 required-label"},"*")],-1),D={class:"flex flex-col mb-4"},E=e("label",{for:"description",class:"mb-1 cursor-pointer"},[c(" Description "),e("span",{class:"text-red-500 required-label"},"*")],-1),G={class:"flex flex-col mb-4"},N=e("label",{for:"genres",class:"mb-1 cursor-pointer"},[c(" Genres "),e("span",{class:"text-red-500 required-label"},"*")],-1),T=["value"],z=e("div",{class:"flex flex-col mb-4"},[e("label",{for:"rating",class:"flex items-center mb-1 cursor-pointer"},[e("input",{type:"checkbox",id:"rating",name:"rating",class:"border border-gray-300 rounded px-2 py-1"}),e("span",{class:"ml-2"},"In Theater")])],-1),$={class:"flex justify-end"},H=["title"],J={__name:"Form",emits:["submitForm"],setup(L,{emit:_}){const f=q(null);M(()=>f.value.focus());const m=o("isMovieEditing"),r=o("name"),a=o("image"),n=o("description"),i=o("selectedGenres"),g=()=>r.value&&a.value&&n.value&&i.value.length,y=()=>g()?_(m.value?"movieUpdate":"movieAdd"):!1;return(h,t)=>(p(),b("form",{onSubmit:F(y,["prevent"]),class:"relative z-20 hide-scrollbar overflow-y-auto max-h-[80vh] rounded bg-white shadow-xl"},[e("div",S,[e("div",j,[A,d(e("input",{type:"text",id:"name",name:"name","onUpdate:modelValue":t[0]||(t[0]=s=>u(r)?r.value=s:null),ref_key:"nameInput",ref:f,required:"",class:"border border-gray-300 rounded px-2 py-1"},null,512),[[v,l(r)]])]),e("div",B,[C,d(e("input",{type:"text",id:"image",name:"image","onUpdate:modelValue":t[1]||(t[1]=s=>u(a)?a.value=s:null),required:"",class:"border border-gray-300 rounded px-2 py-1"},null,512),[[v,l(a)]])]),e("div",D,[E,d(e("textarea",{id:"description",name:"description","onUpdate:modelValue":t[2]||(t[2]=s=>u(n)?n.value=s:null),required:"",class:"border border-gray-300 rounded px-2 py-1"},null,512),[[v,l(n)]])]),e("div",G,[N,d(e("select",{id:"genres",name:"genres",class:"h-36 max-h-72 min-h-[100px] border border-gray-300 rounded px-2 py-1 resize-y",multiple:"",required:"","onUpdate:modelValue":t[3]||(t[3]=s=>u(i)?i.value=s:null)},[(p(!0),b(w,null,U(l(V),s=>(p(),b("option",{key:s,value:s},x(s),9,T))),128))],512),[[k,l(i)]])]),z,e("div",$,[e("button",{type:"button",onClick:t[4]||(t[4]=s=>h.$emit("closeModal")),title:"Close",class:"btn-cancel mr-2"}," Cancel "),e("button",{type:"submit",title:l(m)?"Update movie":"Add movie",class:"btn-primary"},x(l(m)?"Update":"Add"),9,H)])])],40,I))}};export{J as default};