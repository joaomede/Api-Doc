(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{333:function(t,e,s){"use strict";s.r(e);var a=s(33),n=Object(a.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"setup-installation"}},[t._v("Setup / Installation")]),t._v(" "),s("h2",{attrs:{id:"configuration"}},[t._v("Configuration")]),t._v(" "),s("p",[t._v('For the application to work correctly, it is necessary to first configure the environment variables, in the project, there are 2 environment files, 1 for the frontend and one for the backend, the backend is located in the Root folder, the frontend is located in "view" folder')]),t._v(" "),s("h2",{attrs:{id:"the-environment"}},[t._v("The Environment")]),t._v(" "),s("h4",{attrs:{id:"the-env-file-for-backend"}},[t._v("The .env file for backend")]),t._v(" "),s("h1",{attrs:{id:"database-settings"}},[t._v("Database Settings")]),t._v(" "),s("p",[s("strong",[t._v("POSTGRES_USER")]),t._v(": User database, default is admin or postgres"),s("br"),t._v(" "),s("strong",[t._v("POSTGRES_PASSWORD")]),t._v(": Database password"),s("br"),t._v(" "),s("strong",[t._v("POSTGRES_DB")]),t._v(": Database name")]),t._v(" "),s("h1",{attrs:{id:"mode"}},[t._v("MODE")]),t._v(" "),s("p",[s("strong",[t._v("NODE_ENV")]),t._v(": Mode system: dev or prod")]),t._v(" "),s("h1",{attrs:{id:"smtp-settings"}},[t._v("SMTP Settings")]),t._v(" "),s("p",[s("strong",[t._v("EMAIL")]),t._v(": @gmail.com"),s("br"),t._v(" "),s("strong",[t._v("PASSWORDSMTP")]),t._v(": 123")]),t._v(" "),s("h1",{attrs:{id:"secrete-key-api-key"}},[t._v("Secrete KEY (API KEY)")]),t._v(" "),s("p",[s("strong",[t._v("SECRET")]),t._v(": The key for your api")]),t._v(" "),s("h4",{attrs:{id:"the-env-file-for-frontend"}},[t._v("The .env file for frontend")]),t._v(" "),s("p",[s("strong",[t._v("APIURL")]),t._v(': "FOR DEV", default http://localhost:8081'),s("br"),t._v(" "),s("strong",[t._v("VERSION")]),t._v(": For Show Version in Footer and Header frontend")]),t._v(" "),s("h2",{attrs:{id:"how-to-install"}},[t._v("How to Install")]),t._v(" "),s("p",[t._v('The use of the docker in production is highly recommended,\nOBS: All scripts are in the "scripts" folder')]),t._v(" "),s("h2",{attrs:{id:"install"}},[t._v("Install")]),t._v(" "),s("p",[t._v("It is highly recommended to use the docker image that already brings the environment ready for production")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("777")]),t._v(" scripts/install.sh\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ./scripts/install.sh\n")])])]),s("h2",{attrs:{id:"development"}},[t._v("Development")]),t._v(" "),s("p",[t._v("first make a .env file, and...")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" docker-compose up\n")])])]),s("h2",{attrs:{id:"build-needed-only-if-you-are-not-going-to-create-a-build-docker"}},[t._v("Build (needed only if you are not going to create a build docker)")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("777")]),t._v(" /scripts/build.sh\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ./scripts/build.sh\n")])])]),s("h2",{attrs:{id:"serve"}},[t._v("Serve")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" .docker "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" docker-compose up -d\n")])])]),s("h2",{attrs:{id:"migrate"}},[t._v("Migrate")]),t._v(" "),s("p",[t._v("when executing the development container the migrate command will be executed automatically, however, if you need to perform the migration for any other reason, follow the instruction:")]),t._v(" "),s("div",{staticClass:"language-shell extra-class"},[s("pre",{pre:!0,attrs:{class:"language-shell"}},[s("code",[t._v("$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("chmod")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("777")]),t._v(" /scripts/migrate.sh\n$ "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("sudo")]),t._v(" ./scripts/migrate.sh\n")])])])])}),[],!1,null,null,null);e.default=n.exports}}]);