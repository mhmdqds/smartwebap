angular.module("smart_web", ["ngCordova","ionic","ionMdInput","ionic-material","ion-datetime-picker","ionic.rating","utf8-base64","angular-md5","smart_web.controllers", "smart_web.services"])
	.run(function($ionicPlatform,$window,$interval,$timeout,$ionicHistory,$ionicPopup,$state,$rootScope){

		$rootScope.appName = "smart web" ;
		$rootScope.appLogo = "data/images/avatar/pic0.jpg" ;
		$rootScope.appVersion = "1.0" ;

		$ionicPlatform.ready(function() {
			//required: cordova plugin add ionic-plugin-keyboard --save
			if(window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}

			//required: cordova plugin add cordova-plugin-statusbar --save
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}

			localforage.config({
				driver : [localforage.WEBSQL,localforage.INDEXEDDB,localforage.LOCALSTORAGE],
				name : "smart_web",
				storeName : "smart_web",
				description : "The offline datastore for smart web app"
			});


			//required: cordova plugin add cordova-plugin-network-information --save
			$interval(function(){
				if ( typeof navigator == "object" && typeof navigator.connection != "undefined"){
					var networkState = navigator.connection.type;
					if (networkState == "none") {
						$window.location = "retry.html";
					}
				}
			}, 5000);

		});
		$ionicPlatform.registerBackButtonAction(function (e){
			if($ionicHistory.backView()){
				$ionicHistory.goBack();
			}else{
				$state.go("smart_web.dashboard");
			}
			e.preventDefault();
			return false;
		},101);
	})


	.filter("to_trusted", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])

	.filter("trustUrl", function($sce) {
		return function(url) {
			return $sce.trustAsResourceUrl(url);
		};
	})

	.filter("trustJs", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsJs(text);
		};
	}])

	.filter("strExplode", function() {
		return function($string,$delimiter) {
			if(!$string.length ) return;
			var $_delimiter = $delimiter || "|";
			return $string.split($_delimiter);
		};
	})

	.filter("strDate", function(){
		return function (input) {
			return new Date(input);
		}
	})
	.filter("strHTML", ["$sce", function($sce){
		return function(text) {
			return $sce.trustAsHtml(text);
		};
	}])
	.filter("strEscape",function(){
		return window.encodeURIComponent;
	})
	.filter("strUnscape", ["$sce", function($sce) {
		var div = document.createElement("div");
		return function(text) {
			div.innerHTML = text;
			return $sce.trustAsHtml(div.textContent);
		};
	}])





.config(function($stateProvider, $urlRouterProvider,$sceDelegateProvider,$httpProvider,$ionicConfigProvider){
	try{
		// Domain Whitelist
		$sceDelegateProvider.resourceUrlWhitelist([
			"self",
			new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$'),
			new RegExp('^(http[s]?):\/\/(w{3}.)?w3schools\.com/.+$'),
		]);
	}catch(err){
		console.log("%cerror: %cdomain whitelist","color:blue;font-size:16px;","color:red;font-size:16px;");
	}
	$stateProvider
	.state("smart_web",{
		url: "/smart_web",
			abstract: true,
			templateUrl: "templates/smart_web-side_menus.html",
			controller: "side_menusCtrl",
	})

	.state("smart_web.about_us", {
		url: "/about_us",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-about_us.html",
						controller: "about_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.categorie_singles", {
		url: "/categorie_singles/:id",
		cache:false,
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-categorie_singles.html",
						controller: "categorie_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.categories", {
		url: "/categories",
		cache:false,
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-categories.html",
						controller: "categoriesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.dashboard", {
		url: "/dashboard",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-dashboard.html",
						controller: "dashboardCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.faqs", {
		url: "/faqs",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-faqs.html",
						controller: "faqsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.form_contact_us", {
		url: "/form_contact_us",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-form_contact_us.html",
						controller: "form_contact_usCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.hosting", {
		url: "/hosting",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-hosting.html",
						controller: "hostingCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.news", {
		url: "/news",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-news.html",
						controller: "newsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.post_bookmark", {
		url: "/post_bookmark",
		cache:false,
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-post_bookmark.html",
						controller: "post_bookmarkCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.post_singles", {
		url: "/post_singles/:id",
		cache:false,
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-post_singles.html",
						controller: "post_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("smart_web.posts", {
		url: "/posts/:categories",
		cache:false,
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-posts.html",
						controller: "postsCtrl"
					},
			"fabButtonUp" : {
						template: '<button id="fab-up-button" ng-click="scrollTop()" class="button button-fab button-fab-bottom-right button-energized-900 spin"><i class="icon ion-arrow-up-a"></i></button>',
						controller: function ($timeout) {
							$timeout(function () {
								document.getElementById("fab-up-button").classList.toggle("on");
							}, 900);
						}
					},
		}
	})

	.state("smart_web.school", {
		url: "/school",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-school.html",
						controller: "schoolCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.school_mangement_sysytem", {
		url: "/school_mangement_sysytem",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-school_mangement_sysytem.html",
						controller: "school_mangement_sysytemCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.slide_tab_menu", {
		url: "/slide_tab_menu",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-slide_tab_menu.html",
						controller: "slide_tab_menuCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.social_media_marketing", {
		url: "/social_media_marketing",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-social_media_marketing.html",
						controller: "social_media_marketingCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.tech_news", {
		url: "/tech_news",
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-tech_news.html",
						controller: "tech_newsCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.user_singles", {
		url: "/user_singles/:id",
		cache:false,
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-user_singles.html",
						controller: "user_singlesCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	.state("smart_web.users", {
		url: "/users",
		cache:false,
		views: {
			"smart_web-side_menus" : {
						templateUrl:"templates/smart_web-users.html",
						controller: "usersCtrl"
					},
			"fabButtonUp" : {
						template: '',
					},
		}
	})

	$urlRouterProvider.otherwise("/smart_web/dashboard");
});
