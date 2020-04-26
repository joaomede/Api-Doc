(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{328:function(t,a,s){"use strict";s.r(a);var n=s(33),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"docker"}},[t._v("Docker")]),t._v(" "),s("p",[t._v("Want to start fast? use the official image of the docker")]),t._v(" "),s("h2",{attrs:{id:"docker-compose"}},[t._v("Docker Compose")]),t._v(" "),s("div",{staticClass:"language-yml extra-class"},[s("pre",{pre:!0,attrs:{class:"language-yml"}},[s("code",[s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3.3"')]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("services")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("pg")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" postgres"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("11.5"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("alpine\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" pg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("database\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("POSTGRES_USER")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" admin\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("POSTGRES_PASSWORD")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" admin\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("POSTGRES_DB")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" databaseName\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./postgres"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/var/lib/postgresql/data\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/etc/localtime:/etc/localtime:ro"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("networks")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" apidoc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("network\n\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("server")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" joaomede/apidoc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("v1.4.1\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("container_name")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"server-api-doc"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("depends_on")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" pg\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("links")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" pg\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("HOSTDB")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" pg\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("POSTGRES_USER")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" admin\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("POSTGRES_PASSWORD")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" admin\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("POSTGRES_DB")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" databaseName\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("NODE_ENV")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" dev\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("EMAIL")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" a@gmail.com\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("PASSWORDSMTP")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("123")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("SECRET")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" teste\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 8080"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"/etc/localtime:/etc/localtime:ro"')]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("networks")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" apidoc"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("network\n\n"),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("networks")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("apidoc-network")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("driver")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" bridge\n")])])]),s("p",[t._v('Check the repository for the latest version of the docker image and replace it in the "image" field')]),t._v(" "),s("h2",{attrs:{id:"start"}},[t._v("Start!")]),t._v(" "),s("p",[t._v("To start, just type the standard command "),s("strong",[s("code",[t._v("docker-compose up -d")])]),t._v(', and the service will start in the background, along with it, a folder called "postgres" will be generated, it will contain the database data, be careful with this folder.')])])}),[],!1,null,null,null);a.default=e.exports}}]);