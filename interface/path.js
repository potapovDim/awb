const urlPathes = {
  status:                       () =>                                 `status`,
  getSessions:                  () =>                                 `sessions`,
  getSession:                   () =>                                 `session`,
  killSession:                  (sessionId) =>                        `session/${sessionId}`,
 
  availableMachineList:         (sessionId) =>                        `session/${sessionId}/ime/available_engines`,
  activeEngine:                 (sessionId) =>                        `session/${sessionId}/ime/active_engine`,
  activatedIME:                 (sessionId) =>                        `session/${sessionId}/ime/activated`, 
  deactivateIME:                (sessionId) =>                        `session/${sessionId}/ime/deactivate`,
  log:                          (sessionId) =>                        `session/${sessionId}/log`, 
  logTypes:                     (sessionId) =>                        `session/${sessionId}/log/types`, 
  applicationCache:             (sessionId) =>                        `session/${sessionId}/application_cache/status`, 
  cookie:                       (sessionId) =>                        `session/${sessionId}/cookie`, 
  cookieOne:                    (sessionId, name) =>                  `session/${sessionId}/cookie/${name}`, 
  activateIME:                  (sessionId) =>                        `session/${sessionId}/ime/activate`, 
  // executeAsync:                 (sessionId) =>                        `session/${sessionId}/execute/async`,
  executeAsync:                 (sessionId) =>                        `session/${sessionId}/execute_async`,
  // executeSync:                  (sessionId) =>                        `session/${sessionId}/execute/sync`,
  executeSync:                  (sessionId) =>                        `session/${sessionId}/execute`,
  windowHandle:                 (sessionId) =>                        `session/${sessionId}/window_handle`,
  windowHandles:                (sessionId) =>                        `session/${sessionId}/window_handles`,
  screenshot:                   (sessionId) =>                        `session/${sessionId}/screenshot`,
  forward:                      (sessionId) =>                        `session/${sessionId}/forward`,
  back:                         (sessionId) =>                        `session/${sessionId}/back`,
  refresh:                      (sessionId) =>                        `session/${sessionId}/refresh`,
  windowSource:                 (sessionId) =>                        `session/${sessionId}/source`,
  title:                        (sessionId) =>                        `session/${sessionId}/title`,
  
  currentSize:                  (sessionId) =>                        `session/${sessionId}/window/current/size`,
  maximize:                     (sessionId) =>                        `session/${sessionId}/window/current/maximize`,
  currentWindowRect:            (sessionId) =>                        `session/${sessionId}/window/rect`,
  minimize:                     (sessionId) =>                        `session/${sessionId}/window/minimize`,
  windowPosition:               (sessionId, windowId) =>              `session/${sessionId}/window/${windowId}/position`,
  windowMaximize:               (sessionId, windowId) =>              `session/${sessionId}/window/${windowId}/maximize`,
  windowSize:                   (sessionId, windowId) =>              `session/${sessionId}/window/${windowId}/size`,
 

  element:                      (sessionId) =>                        `session/${sessionId}/element`,
  elementFromElement:           (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/element`,
  elementsFromElement:          (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/elements`,
  click:                        (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/click`,
  submit:                       (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/submit`,
  clear:                        (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/clear`,
  text:                         (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/text`,
  elementLocation:              (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/location`,
  elementLocationInView:        (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/location_in_view`,
  elementActive:                (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/active`,
  elementSize:                  (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/size`,
  present:                      (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/enabled`,
  displayed:                    (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/displayed`,
  elementTag:                   (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/name`,
  selected:                     (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/selected`,
  sendKeys:                     (sessionId, elementId) =>             `session/${sessionId}/element/${elementId}/value`,
  attribute:                    (sessionId, elementId, attribute) =>  `session/${sessionId}/element/${elementId}/attribute/${attribute}`,
  css:                          (sessionId, elementId, css) =>        `session/${sessionId}/element/${elementId}/css/${css}`,
  elements:                     (sessionId) =>                        `session/${sessionId}/elements`,

  moveto:                       (sessionId) =>                        `session/${sessionId}/moveto`,   
  doubleclick:                  (sessionId) =>                        `session/${sessionId}/doubleclick`,   
  buttonDown:                   (sessionId) =>                        `session/${sessionId}/buttondown`,
  buttonUp:                     (sessionId) =>                        `session/${sessionId}/buttonup`,
  pressKeys:                    (sessionId) =>                        `session/${sessionId}/keys`,
  url:                          (sessionId) =>                        `session/${sessionId}/url`,

  window:                       (sessionId) =>                        `session/${sessionId}/window`,
  timeouts:                     (sessionId) =>                        `session/${sessionId}/timeouts`,
  frame:                        (sessionId) =>                        `session/${sessionId}/frame`,
  orientation:                  (sessionId) =>                        `session/${sessionId}/orientation`,
  allert:                       (sessionId) =>                        `session/${sessionId}/alert_text`,
  acceptAllert:                 (sessionId) =>                        `session/${sessionId}/accept_alert`,
  dismissAllert:                (sessionId) =>                        `session/${sessionId}/dismiss_alert`,

  touchClick:                   (sessionId) =>                        `session/${sessionId}/touch/click`,
  touchFlick:                   (sessionId) =>                        `session/${sessionId}/touch/flick`,
  touchDown:                    (sessionId) =>                        `session/${sessionId}/touch/down`,
  touchMove:                    (sessionId) =>                        `session/${sessionId}/touch/move`,
  touchUp:                      (sessionId) =>                        `session/${sessionId}/touch/up`,
  touchScroll:                  (sessionId) =>                        `session/${sessionId}/touch/scroll`,
  touchPerform:                 (sessionId) =>                        `session/${sessionId}/touch/perform`,
  touchMultiPerform:            (sessionId) =>                        `session/${sessionId}/touch/multi/perform`,
  touchDoubleClick:             (sessionId) =>                        `session/${sessionId}/touch/doubleclick`,
  touchLongClick:               (sessionId) =>                        `session/${sessionId}/touch/longclick`,

  //appium
  context:                      (sessionId) =>                        `session/${sessionId}/context`,
  contexts:                     (sessionId) =>                        `session/${sessionId}/contexts`,
}

module.exports = {
  urlPathes
}
