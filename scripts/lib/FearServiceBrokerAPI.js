define([
    'jquery'
], function ($) {

    var MNS = {
            ServiceBroker: null
        },
        oDoc = window.oDoc = {
            parentWindow: {}
        };

    try {
        var legacyHub = $.connection.legacyHub;
        var shoppingBasketHub = $.connection.shoppingBasketHub;
        var browseAndOrderHub = $.connection.browseAndOrderHub;
        var utilitiesHub = $.connection.utilitiesHub;
        var lightsHub = $.connection.lightsHub;
        var navigationHub = $.connection.navigationHub;
    } catch (e) {
        console.log(e);
    }

    var eventType;

    if (window.navigator.pointerEnabled) {
        // IE11
        eventType = "pointerdown";
    } else if (window.navigator.msPointerEnabled) {
        //IE10
        eventType = "MSPointerDown";
    }

    $(document.body).on(eventType, function (e) {
        try {
            navigationHub.server.webAppActive();
        } catch (e) {}
    });

    MNS.establishConnection = function () {
        $.connection.hub.logging = true;
        $.connection.hub.qs = {
            'client': window.location.host
        };
        $.connection.hub.url = 'http://localhost:9100/signalr';

        var promise;

        try {
            promise = $.connection.hub.start({
                transport: 'longPolling',
                jsonp: true,
                waitForPageLoad: false
            });
        } catch (e) {
            var deferred = $.Deferred();

            deferred.rejectWith(this, [e]);

            promise = deferred.promise();
        }

        return promise;
    };

    MNS.ServiceBroker = function () {

        //#region Helpers

        var failResponse = function (response, callback) {
            var formatted = {};
            formatted.error = response;
            callback(formatted);
        };

        var methodResponse = function (func, callback) {
            func.done(function (response) {
                if (response === undefined) {
                    // method was void return type - so return 'true' as an ack
                    response = true;
                }
                callback(response);
            })
                .fail(function (response) {
                    failResponse(response, callback);
                });
        };

        //#endregion

        //#region BrowseAndOrder

        this.BrowseAndOrder = function () {

            function getConfiguration(request, callback) {
                //var request = ["mnsStoreId","mnsStoreName", "mnsTerminalID" … ] etc

                //MNS.ServiceBroker.BrowseAndOrder.GetConfiguration(request, function(response){
                //    console.log(response.mnsStoreId);
                //    console.log(response.mnsStoreName);
                //})

                //// returns requested parameters from Service Broker
                //methodResponse(browseAndOrderHub.server.getConfig(request), callback);
                return browseAndOrderHub.server.getConfig(request);
            }

            function isPEDReady(callback) {
                //MNS.ServiceBroker.BrowseAndOrder.IsPEDReady(function (response) {
                //    console.log(response);
                //});

                //true | false (true = yes PED is ready)
                methodResponse(browseAndOrderHub.server.isPEDReady(), callback);
            }

            function isPrinterReady(callback) {
                //MNS.ServiceBroker.BrowseAndOrder.IsPrinterReady(function (response) {
                //    console.log(response);
                //});

                ////true | false (true = yes printer is ready)
                methodResponse(browseAndOrderHub.server.isPrinterReady(), callback);
            }

            function getPrinterErrorStatus(callback) {
                //MNS.ServiceBroker.BrowseAndOrder.GetPrinterErrorStatus(function (response) {
                //    console.log(response);
                //});

                //// returns concatenated error statuses or "" if not in error state
                //// Possible outputs:

                //"HasPaperProblem",
                //"IsDoorOpened",
                //"IsInError",
                //"IsManualFeedRequired",
                //"IsNotAvailable",
                //"IsOffline",
                //"IsOutOfMemory",
                //"IsOutOfPaper",
                //"IsPaperJammed",
                //"IsPaused",
                //"IsPendingDeletion",
                //"IsPowerSaveOn",
                //"IsServerUnknown",
                //"PrintingIsCancelled"
                methodResponse(browseAndOrderHub.server.getPrinterErrorStatus(), callback);
            }

            // This method will be depricated once UN start sending wcs order id
            function orderCreated(orderId, customerId, customerEmail, type, callback) {
                methodResponse(browseAndOrderHub.server.orderCreated(orderId, customerId, customerEmail, type), callback);
            }

            function orderCreatedV2(orderId, customerId, customerEmail, type, wcsOrderId, callback) {
                methodResponse(browseAndOrderHub.server.orderCreatedV2(orderId, customerId, customerEmail, type, wcsOrderId), callback);
            }

            function takePayment(orderId, customerId, amount, callback) {
                //MNS.ServiceBroker.BrowseAndOrder.TakePayment(orderId, customerId, customerEmail, amount, function (response) {
                //    console.log(response.transactionResult) // 1 is success
                //    console.log(response.pgtr)
                //    console.log(response.authCode)
                //    console.log(response.receipt) // parsed receipt object
                //    console.log(response.yesPayResponse) // raw response from YESPay
                //});
                methodResponse(browseAndOrderHub.server.takePayment(orderId, customerId, amount), callback);
            }

            function print(templateFilename, request, callback) {
                //request = {} //add all the properties that you want to print
                ////includes stuff like email etc - basically everything that you want to print

                //MNS.ServiceBroker.BrowseAndOrder.Print("chipnpin_accepted_template.html" request, function(response){
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                return browseAndOrderHub.server.printReceipt(templateFilename, request);
            }

            function enableScanner() {
                browseAndOrderHub.server.enableScanner();
            }

            function disableScanner() {
                browseAndOrderHub.server.disableScanner();
            }

            function emailProductDetails(details) {
                browseAndOrderHub.server.emailProductDetails(details);
            }

            return {
                GetConfiguration: getConfiguration,
                IsPEDReady: isPEDReady,
                GetPrinterErrorStatus: getPrinterErrorStatus,
                IsPrinterReady: isPrinterReady,
                OrderCreated: orderCreated,
                OrderCreatedV2: orderCreatedV2,
                TakePayment: takePayment,
                Print: print,
                EnableScanner: enableScanner,
                DisableScanner: disableScanner,
                EmailProductDetails: emailProductDetails
            };
        }();

        //#endregion

        //#region Utilities

        this.Utilities = function () {
            function logDump() {
                utilitiesHub.server.logDump();
            }

            function logError(appSource, objectInstance, methodCall, msg) {
                // Logs errors in Provisio
                //MNS.ServiceBroker.LogError(appsource, objectInstance, methodCall, 'Some error');
                utilitiesHub.server.logError(appSource, objectInstance, methodCall, msg);
            }

            function logWarning(appSource, objectInstance, methodCall, msg) {
                // Logs warnings in Provisio
                //MNS.ServiceBroker.LogError(appsource, objectInstance, methodCall, 'Some warning');
                utilitiesHub.server.logWarning(appSource, objectInstance, methodCall, msg);
            }

            function logNotification(appSource, objectInstance, methodCall, msg) {
                // Logs information in Provisio
                //MNS.ServiceBroker.LogError(appsource, objectInstance, methodCall, 'Some info');
                utilitiesHub.server.logNotification(appSource, objectInstance, methodCall, msg);
            }

            function getMachineName(callback) {
                methodResponse(utilitiesHub.server.getMachineName(), callback);
            }

            function getVersionNumber(callback) {
                // Returns Service Broker's version number
                methodResponse(utilitiesHub.server.getVersionNumber(), callback);
            }

            return {
                LogDump: logDump,
                LogError: logError,
                LogWarning: logWarning,
                LogNotification: logNotification,
                GetMachineName: getMachineName,
                GetVersionNumber: getVersionNumber
            };
        }();

        //#endregion

        //#region LEDLights

        this.LEDLights = function () {

            return {
                AllLightsOn: function () {
                    lightsHub.server.allLightsOn();
                },
                AllLightsOff: function () {
                    lightsHub.server.allLightsOff();
                },
                AllLightsColour: function (red, green, blue) {
                    lightsHub.server.allLightsColour(red, green, blue);
                },

                SideLightsOn: function () {
                    lightsHub.server.sideLightsOn();
                },
                SideLightsOff: function () {
                    lightsHub.server.sideLightsOff();
                },
                SideLightsColour: function (red, green, blue) {
                    lightsHub.server.sideLightsColour(red, green, blue);
                },

                PrintLightOn: function () {
                    lightsHub.server.printLightOn();
                },
                PrintLightOff: function () {
                    lightsHub.server.printLightOff();
                },
                PrintLightColour: function (red, green, blue) {
                    lightsHub.server.printLightColour(red, green, blue);
                },

                ScanLightOn: function () {
                    lightsHub.server.scanLightOn();
                },
                ScanLightOff: function () {
                    lightsHub.server.scanLightOff();
                },
                ScanLightColour: function (red, green, blue) {
                    lightsHub.server.scanLightColour(red, green, blue);
                },

                PayHereLightOn: function () {
                    lightsHub.server.payHereLightOn();
                },
                PayHereLightOff: function () {
                    lightsHub.server.payHereLightOff();
                },
                PayHereLightColour: function (red, green, blue) {
                    lightsHub.server.payHereLightColour(red, green, blue);
                },

                RunningLightOn: function () {
                    lightsHub.server.runningLightOn();
                },
                RunningLightOff: function () {
                    lightsHub.server.runningLightOff();
                },
                RunningLightColour: function (red, green, blue) {
                    lightsHub.server.runningLightColour(red, green, blue);
                },
                RunningLightBackgroundColour: function (red, green, blue) {
                    lightsHub.server.runningLightBackgroundColour(red, green, blue);
                }
            };
        }();

        //#endregion

        //#region Navigation

        this.Navigation = function () {

            function startApplications(callback) {
                methodResponse(navigationHub.server.startApplications(), callback);
            }

            function switchToApplication(name, callback) {
                methodResponse(navigationHub.server.switchToApplication(name), callback);
            }

            function attractLoop() {
                //MNS.ServiceBroker.Navigation.AttractLoop(function (response) {
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                //// Navigates to attract loop. Ends the current session
                //// Events fired:
                //// shoppingBasketHub.client.updateBasketCount
                //// navigationHub.client.navigateToHome
                return navigationHub.server.attractLoop();
                //methodResponse(navigationHub.server.attractLoop(), callback);
                // #10
                // logout and clear basket
            }

            function home(clearBasket, callback) {
                //// clearBasket - bool whether or not to clear the basket
                //MNS.ServiceBroker.Navigation.Home(clearBasket, function (response) {
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                //// Events fired:
                //// shoppingBasketHub.client.updateBasketCount (if clearBasket = true)
                //// navigationHub.client.navigateToHome
                methodResponse(navigationHub.server.home(clearBasket), callback);
                // #3 clearBasket = false
                // #9 clearBasket = true
                // switch to B&O
                // send navigate to home message to caller
            }



            function openBasket(appName, fullscreen, callback) {
                //MNS.ServiceBroker.Navigation.OpenBasket(appName, fullscreen, function (response) {
                //    console.log(response) // basket url
                //});
                //// Returns the basket url, if fullscreen = true SB will switch apps
                methodResponse(navigationHub.server.openBasket(appName, fullscreen), callback);
                // #1 & #2
                // if fullscreen, app switch to basket window
                // send basket url in callback
            }

            function closeBasket(callback) {
                //MNS.ServiceBroker.Navigation.CloseBasket(function (response) {
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                //// Events fired:
                //// shoppingBasketHub.client.updateBasketCount
                //// navigationHub.client.navigateFromBasket
                methodResponse(navigationHub.server.closeBasket(), callback);
                // #4 & #5
                // app switch to appName from openBasket()
                // send close basket message to caller
            }

            function viewBasketItem(skuId, callback) {
                //MNS.ServiceBroker.Navigation.ViewBasketItem(skuId, function (response) {
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                //// Events fired:
                //// navigationHub.client.navigateToProduct
                methodResponse(navigationHub.server.viewBasketItem(skuId), callback);
                // #6
                // switch to B&O
                // send navigate to item message
            }

            function getSessionId() {
                //MNS.ServiceBroker.Navigation.GetSessionId(function (response) {
                //    console.log(response) // the session id e.g. da8aa9ce-d116-4282-834a-851595ea7a7d
                //});
                return navigationHub.server.getSessionId();
                //methodResponse(navigationHub.server.getSessionId(), callback);
            }

            return {
                StartApplications: startApplications,
                SwitchToApplication: switchToApplication,
                AttractLoop: attractLoop,
                Home: home,
                OpenBasket: openBasket,
                CloseBasket: closeBasket,
                ViewBasketItem: viewBasketItem,
                GetSessionId: getSessionId
            };

        }();

        //#endregion

        //#region Basket

        this.ShoppingBasket = function () {


            function addItem(skuId, quantity, personalisationName, personalisationValue, callback) {
                //MNS.ServiceBroker.ShoppingBasket.AddItem(skuId, quantity, personalisationName, personalisationValue, function (response) {
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                methodResponse(shoppingBasketHub.server.addItem(skuId, quantity, personalisationName, personalisationValue), callback);
            }

            function addItems(request, callback) {
                methodResponse(shoppingBasketHub.server.addItems(request), callback);
            }

            function getBasketItems(callback) {
                ////sample response: [{"Quantity":"1.0","SkuId":"22230092004"}]
                //
                //MNS.ServiceBroker.ShoppingBasket.GetBasketItems(function (response) {
                //    console.log(response[0].Quantity)
                //});
                methodResponse(shoppingBasketHub.server.getBasketItems(), callback);
            }

            function getItemsCount(callback) {
                //MNS.ServiceBroker.ShoppingBasket.GetItemsCount(function (response) {
                //    console.log(response) // items in basket count e.g. 5
                //});
                methodResponse(shoppingBasketHub.server.getItemsCount(), callback);
            }

            function getSkuCount(skuId, callback) {
                //MNS.ServiceBroker.ShoppingBasket.GetSkuCount(skuId, function (response) {
                //    console.log(response) // sku quantity in basket e.g. 1
                //});
                methodResponse(shoppingBasketHub.server.getSkuCount(skuId), callback);
            }

            function clearSession(callback) {
                //MNS.ServiceBroker.ShoppingBasket.ClearSession(function (response) {
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                //// Ends the basket session
                methodResponse(shoppingBasketHub.server.clearSession(), callback);
            }

            function getViewBasketUrl(callback) {
                //MNS.ServiceBroker.ShoppingBasket.GetViewBasketUrl(function (response) {
                //    console.log(response) // the url
                //});
                methodResponse(shoppingBasketHub.server.getViewBasketUrl(), callback);
            }

            function basketCountUpdated(callback) {
                //MNS.ServiceBroker.ShoppingBasket.BasketCountUpdated(function (response) {
                //    console.log(response) // true | reponse.error (true = acknowledgement)
                //});
                //// Events fired:
                //// shoppingBasketHub.client.updateBasketCount
                methodResponse(shoppingBasketHub.server.basketCountUpdated(), callback);
            }


            return {
                AddItem: addItem,
                AddItems: addItems,
                GetBasketItems: getBasketItems,
                GetItemsCount: getItemsCount,
                GetSkuCount: getSkuCount,
                ClearSession: clearSession,
                GetViewBasketUrl: getViewBasketUrl,
                BasketCountUpdated: basketCountUpdated
            };

        }();

        //#endregion

        //#region Legacy

        this.Legacy = function () {

            function printTAAZ(taazJsonObject) {
                legacyHub.server.printTAAZ(taazJsonObject);
            }

            function printOrder(orderId, emailAddress, orderStoreName) {
                legacyHub.server.printLegacyReceipt(orderId, emailAddress, orderStoreName);
            }

            function printList(printObject) {
                legacyHub.server.printLegacyReceipt(printObject);
            }

            return {
                PrintTAAZ: printTAAZ,
                PrintOrder: printOrder,
                PrintList: printList
            };
        }();

        //#endregion

        return {

            BrowseAndOrder: this.BrowseAndOrder,
            Utilities: this.Utilities,
            LEDLights: this.LEDLights,
            Navigation: this.Navigation,
            ShoppingBasket: this.ShoppingBasket,
            Legacy: this.Legacy
        };

    }();

    oDoc.parentWindow.CloseBasket = function () {
        shoppingBasketHub.server.closeBasket();
    };
    oDoc.parentWindow.GetViewBasketUrl = function (f) {
        MNS.ServiceBroker.ShoppingBasket.GetViewBasketUrl(f);
    };
    oDoc.parentWindow.NavigateToAttractLoop = function (f) {
        MNS.ServiceBroker.Navigation.AttractLoop(function (resp) {});
    };

    return MNS;
});