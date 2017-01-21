'use strict';
/***********************************************************************
 * 描述：框架核心引擎<br>
 * -----------------------------------------------------------------<br>
 * 变更序号：<br>
 * 修改日期：<br>
 * 修改人员：<br>
 * 修改原因：<br>
 * **********************************************************************
 */

function AngularContainer() {}

AngularContainer.extend(Container);

AngularContainer.startup = function() {
    if (appConfig) {
        var modules = appConfig.modules;
        if (modules) {
            // 初始化模块信息
            for (var i in modules) {
                var moduleName = modules[i].name;
                var moduleRequires = modules[i].requires;
                // 实例化模块
                angular.module(moduleName, moduleRequires);
            }

            // 跨域安全设置
            var security = modules[i].security;
            if (security) {
                var credentials = security.credentials;
                // 白名单列表
                var urlWhites = security.urlWhites[appConfig.environment] || [];
                urlWhites.push('self');
                // 设置白名单
                angular.module(moduleName).config(['$sceDelegateProvider', '$httpProvider', function($sceDelegateProvider, $httpProvider) {
                    $sceDelegateProvider.resourceUrlWhitelist(urlWhites);
                    $httpProvider.defaults.withCredentials = credentials;
                }]);
            }

            // 获取模块路由设置
            var router = appConfig.router;
            if (router) {
                var moduleName = router.moduleName;
                // 配置路由信息
                angular.module(moduleName).config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
                    var otherwise = router.otherwise;
                    // 设置默认状态
                    if (otherwise) {
                        $urlRouterProvider.otherwise(otherwise);
                    }
                    var states = router.states;
                    // 设置路由状态
                    if (states && 0 < states.length) {
                        for (var i in states) {
                            if (states[i].views) {
                                $stateProvider.state(states[i].name, {
                                    url: states[i].url,
                                    templateUrl: states[i].templateUrl,
                                    views: states[i].views,
                                    params:{data:null}
                                });
                            } else {
                                $stateProvider.state(states[i].name, {
                                    url: states[i].url,
                                    templateUrl: states[i].templateUrl,
                                    params:{data:null}
                                });
                            }
                        }
                    }
                }]);
            }
        }
    }

    if (beanConfig) {
        var beans = beanConfig.beans;
        for (var i in beans) {
            var moduleName = beans[i].moduleName;
            var beanName = beans[i].name;
            var beanClassName = beans[i].clazz;
            var bean = WebContext.createBean(beanClassName, []);
            angular.module(moduleName).value(beanName, bean);
        }
    }

    if (serviceConfig) {
        var services = serviceConfig.services;
        for (var i in services) {
            var moduleName = services[i].moduleName;
            var requires = services[i].requires || [];
            var serviceName = services[i].name;
            var serviceClassName = services[i].clazz;
            var fnBody = 'return WebContext.createService(' + serviceClassName + ', arguments);';
            // 动态创建service
            var service = new Function(requires.join(','), fnBody);
            requires.push(service);
            angular.module(moduleName).factory(serviceName, requires);
        }
    }

    if (filterConfig) {
        var filters = filterConfig.filters;
        for (var i in filters) {
            var moduleName = filters[i].moduleName;
            var filterName = filters[i].name;
            var filterClassName = filters[i].clazz;
            var requires = filters[i].requires || [];
            var fnBody = 'return WebContext.createFilter(' + filterClassName + ', arguments).doFilter;';
            var filter =  new Function(requires.join(','), fnBody);
            requires.push(filter);
            angular.module(moduleName).factory(filterName, requires);
        }
    }

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    if (contextConfig) {
        // 场景对象实例化
        var contexts = contextConfig.contexts;
        if (contexts && 0 < contexts.length) {
            for (var i in contexts) {
                var moduleName = contexts[i].moduleName;
                var controllerName = contexts[i].controllerName;
                var requires = contexts[i].requires || [];
                var contextClassName = contexts[i].clazz;
                // 构造场景对象并注入到controller
                if (controllerName && contextClassName) {
                    var fnBody = 'var ctx = WebContext.createContext($scope, ' + contextClassName + ', Array.prototype.slice.call(arguments, 2));'
                        + 'var element = angular.element(document.querySelector("[ng-controller*=' + controllerName + ']"));'
                        + 'var findParentScope;'
                        + '(findParentScope = function(prentElement) {'
                        + '	if (prentElement.attr("ng-controller")) {'
                        + '		ctx.parentContext = prentElement.scope();'
                        + '	} else {'
                        + '		if (prentElement.parent()[0]) {'
                        + '			findParentScope(prentElement.parent());'
                        + '		}'
                        + '	}'
                        + '})(element.parent());'
                        + 'var manager = ManagerFactory.newInstance();'
                        + 'var filter = manager.getFilter();'
                        + 'ctx.parseDate = function(ngModelExpression, format) {'
                        + '	this.$watch(ngModelExpression, function(newVal, oldVal) {'
                        + '		if (newVal) {'
                        + '			var date = filter("date")(newVal, format || "yyyy-MM-dd");'
                        + '			$parse(ngModelExpression).assign(this, date);'
                        + '		}'
                        + '	}.bind(this));'
                        + '};'
                        + 'ctx.clearUploader = function(uploader, fileSelector) {'
                        + '	UploaderUtil.clear(uploader, fileSelector);'
                        + '};'
                        + 'ctx.execute();'
                        + 'ctx.colseNgNotify();'
                    // 动态创建场景类
                    var controller = new Function('$scope,$parse,' + requires.join(',').replace(/\$scope,/g, '').replace(/,\$scope/g, ''), fnBody);
                    requires.push(controller);
                    // 实例化controller
                    angular.module(moduleName).controller(controllerName, ['$scope', '$parse'].concat(requires));
                }
            }
        }
    }

    //--------------------------------------------------------------------------------------------------------------------------------------------------------
    if (componentConfig) {
        // 实例化指令对象
        var components = componentConfig.components;
        if (components && 0 < components.length) {
            for (var i in components) {
                var componentName = components[i].name || 'component';
                var componentClassName = components[i].clazz;
                var directiveName = components[i].name;
                var directiveMode = components[i].mode;
                var directiveScope = components[i].scope || {};
                var directiveShare = undefined == components[i].share ? false : components[i].share;
                var directiveRestrict = components[i].restrict || 'E';
                var directivePriority = components[i].priority || '0';
                var directiveReplace = undefined == components[i].replace ? false : components[i].replace;
                var directiveTransclude = undefined == components[i].transclude ? false : components[i].transclude;
                var directiveTemplate = components[i].template;
                var directiveTemplateUrl = components[i].templateUrl;
                var directiveRequire = components[i].require;
                var requires = components[i].requires || [];
                if (directiveName && componentClassName && directiveMode) {
                    var fnBody = '';
                    if ('link' == directiveMode) {
                        fnBody += 'var ' + componentName + ' = WebContext.createComponent(' + componentClassName + ', arguments);';
                    } else if ('compile' == directiveMode) {
                        fnBody += 'var ' + componentName + ' = WebContext.createComponent(' + componentClassName + ', arguments);';
                    }

                    fnBody += 'return {'
                    +  'restrict: \'' + directiveRestrict + '\','
                    +  'priority: \'' + directivePriority + '\','
                    +  'scope: ' + directiveScope + ','
                    +  'replace: ' + directiveReplace + ','
                    +  'transclude:' + directiveTransclude + ',';

                    if (directiveRequire) {
                        fnBody += 'require: \'' + directiveRequire + '\',';
                    }

                    if (directiveTemplate) {
                        fnBody += 'template: \'' + directiveTemplate + '\',';
                    } else if (directiveTemplateUrl) {
                        fnBody += 'templateUrl: \'' + directiveTemplateUrl + '\',';
                    }

                    if (directiveShare) {
                        fnBody += 'controller: function($scope, $element, $attrs, $transclude) {'
                        +  componentName + '.context($scope, $element, $attrs, $transclude);'
                        +  '},';
                    }

                    if ('link' == directiveMode) {
                        fnBody += 'link: function(scope, element, attrs, controller) {'
                        +  componentName + '.link(scope, element, attrs, controller);'
                        +  '}';
                    } else if ('compile' == directiveMode) {
                        fnBody += 'compile: function(element, attrs, transclude) {'
                        +  componentName + '.compile(element, attrs, transclude);'
                        +  '}';
                    }
                    fnBody += '};'
                    var directive = new Function(requires.join(','), fnBody);
                    requires.push(directive);
                    angular.module(moduleName).directive(directiveName, requires);
                }
            }
        }
    }
};

