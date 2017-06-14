import("execution");
import("etherpad.log");
import("netutils.urlRequest");


function onStartup() {
  execution.initTaskThreadPool("async-pad-indexer", 1);
}

function scheduleAsyncSearchUpdate(body) {
  execution.scheduleTask('async-pad-indexer', 'performAsyncUpdate', 0, [body]);
}

serverhandlers.tasks.performAsyncUpdate = function(body) {
  try {
    urlRequest('PUT', appjet.config.elasticURL + "/etherpad/" + encodeURIComponent(body.id), JSON.stringify(body));
  } catch (ex) {
    log.logException(ex);
  }
  appjet.cache.padsReindexedTimeElapsed = +(new Date() - appjet.cache.padsReindexedStart);
}

